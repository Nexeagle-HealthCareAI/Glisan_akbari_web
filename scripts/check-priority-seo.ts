import './load-build-env';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { PRIORITY_UROLOGY } from '../src/data/priorityUrology';
import { ROUTES_SEO, getFullUrl } from '../src/data/seo';
import { ROUTE_REDIRECTS, getRouteRedirect } from '../src/data/routes';
const escape = (s: string) => s.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const read = (path: string) => fs.readFileSync(path, 'utf8');
const sitemap = read('dist/sitemap.xml');
const nginx = read('nginx.conf');
const netlify = read('public/_redirects');
const overview = '/services/urologist-in-purnia';
const overviewHtml = read(`dist${overview}/index.html`);
assert.ok(overviewHtml.toLowerCase().includes('urologist in purnia'));
for (const service of Object.values(PRIORITY_UROLOGY)) {
  const route = '/services/' + service.slug;
  const html = read(`dist${route}/index.html`);
  const seo = ROUTES_SEO[route];
  assert.equal(service.keywords?.length, 3, `${route}: three editorial targets`);
  const primary = service.keywords![0];
  for (const value of [seo.title, seo.description, service.title, service.tagline, service.featuredImage!.alt]) {
    assert.ok(value.toLowerCase().includes(primary.toLowerCase()), `${route}: primary placement`);
  }
  assert.ok(seo.title.length >= 30 && seo.title.length <= 60, `${route}: title length`);
  assert.ok(seo.description.length >= 130 && seo.description.length <= 160, `${route}: description length`);
  assert.ok(html.includes(`<title>${escape(seo.title)}</title>`));
  assert.ok(html.includes(`name="description" content="${escape(seo.description)}"`));
  assert.ok(html.includes(`rel="canonical" href="${getFullUrl(route)}"`));
  assert.ok(sitemap.includes(`<loc>${getFullUrl(route)}</loc>`));
  assert.ok(overviewHtml.includes(`href="${route}"`), `${route}: discoverable without clicking tabs`);
  assert.ok(html.includes(`alt="${escape(service.featuredImage!.alt)}"`));
  for (const field of ['src', 'social'] as const) assert.ok(fs.existsSync('public' + service.featuredImage![field]));
  for (const id of ['overview', 'assessment', 'symptoms', 'options', 'risks', 'prepare', 'questions', 'sources', 'book']) {
    assert.ok(html.includes(`id="${id}"`), `${route}: missing ${id}`);
  }
  const schema = JSON.parse(html.match(/<script[^>]*id="page-jsonld"[^>]*>([\s\S]*?)<\/script>/)![1]);
  assert.ok(schema['@graph'].some((node: any) => node['@type'] === 'MedicalWebPage'));
  assert.ok(!JSON.stringify(schema).includes('InStock'));
  assert.ok(!JSON.stringify(schema).includes('reviewedBy'));
}
let legacyChecks = 0;
for (const [from, to] of Object.entries(ROUTE_REDIRECTS)) {
  const fallback = read(`dist${from}/index.html`);
  assert.ok(!sitemap.includes(`<loc>${getFullUrl(from)}</loc>`));
  for (const suffix of ['', '/', '/index.html']) {
    assert.equal(getRouteRedirect(from + suffix, '?utm_source=seo'), to + '?utm_source=seo');
    if (from.startsWith('/services')) {
      assert.ok(netlify.includes(`${from}${suffix} ${to} 301!`));
      assert.ok(nginx.includes(`~^${from}(?:/index\\.html|/)?$ ${to};`));
    }
    legacyChecks++;
  }
  let redirected: string | undefined;
  vm.runInNewContext(fallback.match(/<script>([\s\S]*?)<\/script>/)![1], { URLSearchParams, window: { location: {
    search: '?utm_source=seo', hash: '#questions', replace: (target: string) => { redirected = target; },
  } } });
  assert.equal(redirected, to + '?utm_source=seo#questions');
}
console.log(`Passed: six priority pages, metadata, keyword placement, illustrations, discovery, schema and ${legacyChecks} legacy URL variants.`);
