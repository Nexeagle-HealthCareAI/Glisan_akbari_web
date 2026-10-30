import './load-build-env';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { CARE_DEPARTMENTS, careDepartmentPath } from '../src/data/careDepartments';
import { getRouteRedirect, ROUTE_REDIRECTS } from '../src/data/routes';
import { ROUTES_SEO, SITEMAP_ROUTES, getFullUrl } from '../src/data/seo';
import viteConfig from '../vite.config';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file: string) => fs.readFileSync(path.join(root, file), 'utf8');
const htmlFor = (route: string) => read(`dist${route === '/' ? '' : route}/index.html`);
const sitemap = read('dist/sitemap.xml');
const links = new Set<string>();
const pageLinks = new Map<string, Set<string>>();

assert.equal(new Set(SITEMAP_ROUTES).size, SITEMAP_ROUTES.length);
assert.equal((sitemap.match(/<loc>/g) || []).length, SITEMAP_ROUTES.length);
for (const route of SITEMAP_ROUTES) {
  assert.match(route, /^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*)?$/, route);
  assert.ok(!ROUTE_REDIRECTS[route], `Retired route in sitemap: ${route}`);
  const html = htmlFor(route);
  pageLinks.set(route, new Set());
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${route}: one H1`);
  assert.ok(html.includes('<title>'), `${route}: title`);
  assert.ok(!html.includes('?department='), `${route}: no filter links`);
  if (ROUTES_SEO[route].canonical) {
    assert.ok(html.includes(`rel="canonical" href="${ROUTES_SEO[route].canonical}"`), `${route}: canonical`);
  }
  assert.ok(sitemap.includes(`<loc>${getFullUrl(route)}</loc>`), `${route}: sitemap`);
  for (const [, href] of html.matchAll(/href="(\/[^"\s]*)"/g)) {
    const pathname = href.split(/[?#]/, 1)[0];
    links.add(pathname);
    if (SITEMAP_ROUTES.includes(pathname)) pageLinks.get(route)!.add(pathname);
    assert.ok(SITEMAP_ROUTES.includes(pathname) || fs.existsSync(path.join(root, 'dist', pathname)),
      `${route}: broken internal link ${href}`);
  }
}
for (const route of SITEMAP_ROUTES) assert.ok(links.has(route), `${route}: discoverable internal link`);
const reachable = new Set(['/']);
for (const route of reachable) for (const link of pageLinks.get(route) || []) reachable.add(link);
assert.equal(reachable.size, SITEMAP_ROUTES.length, 'Every page must be reachable by crawling from the homepage');

const config = typeof viteConfig === 'function'
  ? await viteConfig({ command: 'serve', mode: 'production' }) : viteConfig;
const plugin: any = config.plugins?.find((item: any) => item?.name === 'prerendered-preview-routes');
let middleware: any;
plugin.configurePreviewServer({ middlewares: { use: (handler: any) => { middleware = handler; } } });
const preview = (url: string) => {
  const request = { url };
  const response = {
    statusCode: 200,
    location: undefined as string | undefined,
    writeHead(code: number, headers: { Location: string }) { this.statusCode = code; this.location = headers.Location; },
    end() {},
  };
  middleware(request, response, () => {});
  return { ...response, url: request.url };
};
for (const route of SITEMAP_ROUTES) {
  const result = preview(route);
  assert.equal(result.statusCode, 200, route);
  assert.equal(result.url, route === '/' ? '/' : `${route}/index.html`, route);
}
assert.equal(preview('/services/unknown-topic').statusCode, 404);
assert.equal(preview('/404').statusCode, 404);

const nginx = read('nginx.conf');
const departmentMap = nginx.match(/map "\$uri\?\$args" \$legacy_care_redirect \{([\s\S]*?)\n\}/)![1];
const nginxRules = [...departmentMap.matchAll(/^\s+~(\S+) (\S+);$/gm)]
  .map(([, regex, target]) => ({ regex: new RegExp(regex), target }));
const queryMap = nginx.match(/map \$args \$care_remaining_query \{([\s\S]*?)\n\}/)![1];
const nginxQueryRules = [...queryMap.matchAll(/^\s+~(\S+) (\S+);$/gm)]
  .map(([, regex, replacement]) => ({ regex: new RegExp(regex), replacement }));
const nginxRemainingQuery = (query: string) => {
  for (const rule of nginxQueryRules) {
    const match = query.match(rule.regex);
    if (match) return rule.replacement.replace(/\$(\w+)/g, (_, name) => match.groups?.[name] || '');
  }
  return '';
};
const netlify = read('public/_redirects');
let redirectsChecked = 0;

for (const department of CARE_DEPARTMENTS) {
  const target = careDepartmentPath(department.id);
  const html = htmlFor(target);
  // The initial HTML must already contain the selected department and topic.
  assert.ok(html.includes(department.services[0].title.replaceAll('&', '&amp;')), `${target}: initial topic`);
  assert.ok(html.includes(`aria-label="${department.label.replaceAll('&', '&amp;')} care topics"`), target);
  assert.equal(getRouteRedirect(target), undefined, `${target}: no redirect loop`);
  for (const from of ['/services', '/conditions', '/treatments']) {
    assert.ok(netlify.includes(`${from} department=${department.id} ${target} 301!`));
    for (const suffix of ['', '/', '/index.html']) {
      for (const query of [`?department=${department.id}`, `?utm_source=instagram&department=${department.id}`,
        `?department=${department.id}&utm_source=instagram`]) {
        const remaining = query.includes('utm_source') ? '?utm_source=instagram' : '';
        const input = from + suffix + query;
        assert.equal(getRouteRedirect(from + suffix, query), target + remaining, input);
        assert.equal(preview(input).location, target + remaining, input);
        assert.equal(preview(input).statusCode, 301, input);
        assert.equal(nginxRules.find((rule) => rule.regex.test(input))?.target, target, input);
        assert.equal(nginxRemainingQuery(query.slice(1)), remaining.replace(/^\?/, ''), input);
        redirectsChecked++;
      }
    }
    if (from === '/services') continue;
    const script = read(`dist${from}/index.html`).match(/<script>([\s\S]*?)<\/script>/)![1];
    let redirected: string | undefined;
    vm.runInNewContext(script, { URLSearchParams, window: { location: {
      search: `?department=${department.id}&utm_source=instagram`, hash: '#care-topics',
      replace: (url: string) => { redirected = url; },
    } } });
    assert.equal(redirected, target + '?utm_source=instagram#care-topics');
  }
}
assert.equal(getRouteRedirect('/services', '?department=unknown'), '/services/urologist-in-purnia');
assert.equal(nginxRemainingQuery('utm_source=instagram&department=ent&utm_campaign=hospital'),
  'utm_source=instagram&utm_campaign=hospital');
assert.equal(getRouteRedirect('/services/ent/'), '/services/ent');
assert.equal(getRouteRedirect('/index.html'), '/');
assert.equal(getRouteRedirect('/doctors/index.html', '?utm_source=instagram'), '/doctors?utm_source=instagram');
assert.equal(getRouteRedirect('/book-appointment', '?utm_source=instagram'), '/doctors?utm_source=instagram');
assert.equal(getFullUrl('/services/ent/?utm_source=instagram#care-topics'), ROUTES_SEO['/services/ent'].canonical);

console.log(`Passed: ${SITEMAP_ROUTES.length} static pages, internal links, department HTML, canonicals, sitemap, ${redirectsChecked} redirect cases, preview routing and portable redirect fallbacks.`);
