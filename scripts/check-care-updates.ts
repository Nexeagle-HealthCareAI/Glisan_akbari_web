import './load-build-env';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { ALLOW_INDEXING, PRERENDER_ROUTES, SITEMAP_ROUTES, getSeoForPath } from '../src/data/seo';
import { HOSPITAL_PROFILE, UROLOGY_SERVICES } from '../src/data/config';
import { SERVICE_MARKETING } from '../src/data/serviceMarketing';
import viteConfig from '../vite.config';

const read = (file: string) => fs.readFileSync(file, 'utf8');
const htmlFor = (route: string) => read(route === '/404' ? 'dist/404.html' : `dist${route === '/' ? '' : route}/index.html`);
const escape = (text: string) => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const overview = htmlFor('/services/urologist-in-purnia');
const sitemapPage = htmlFor('/sitemap');

assert.equal(HOSPITAL_PROFILE.phone, '9234606330');
for (const route of PRERENDER_ROUTES) {
  const html = htmlFor(route);
  assert.ok(!/079037\s*81377|7903781377/.test(html), `${route}: old phone number`);
  assert.ok(html.includes('href="tel:+919234606330"'), `${route}: callable hospital number`);
  assert.ok(html.includes('href="https://youtube.com/@drmdtaquedisnooriurology?si=MuSIyTSW64yfLc7a"'), `${route}: YouTube footer`);
  assert.ok(html.includes('href="/sitemap"'), `${route}: HTML sitemap discovery`);
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(([, id]) => id);
  assert.equal(new Set(ids).size, ids.length, `${route}: duplicate IDs`);
  for (const [, href] of html.matchAll(/href="#([^"\s]+)"/g)) {
    assert.ok(ids.includes(decodeURIComponent(href)), `${route}: missing anchor ${href}`);
  }
}
for (const route of SITEMAP_ROUTES) assert.ok(sitemapPage.includes(`href="${route}"`), `${route}: missing from HTML sitemap`);
assert.ok(sitemapPage.includes('href="/sitemap.xml"'));
assert.ok(htmlFor('/').includes('class="mm-hero-experience">10+ years of experience</p>'));
assert.ok(htmlFor('/doctors').includes('10+ years of experience'));

for (const service of UROLOGY_SERVICES) {
  const route = '/services/' + service.slug;
  const html = htmlFor(route);
  const marketing = SERVICE_MARKETING[service.id];
  assert.ok(marketing, `${route}: patient decision copy`);
  assert.ok(html.includes(escape(marketing.heading)), `${route}: patient concern heading`);
  assert.ok(html.includes(escape(marketing.concern)), `${route}: patient concern`);
  assert.ok(html.includes(escape(marketing.consultation)), `${route}: consultation expectations`);
  assert.ok(overview.includes(`href="${route}"`), `${route}: linked from parent in initial HTML`);
  const breadcrumb = html.match(/<nav class="site-breadcrumb"[\s\S]*?<\/nav>/)![0];
  assert.ok(breadcrumb.includes('href="/services/urologist-in-purnia"'), `${route}: visible parent breadcrumb`);
  const schema = JSON.parse(html.match(/<script[^>]*id="page-jsonld"[^>]*>([\s\S]*?)<\/script>/)![1]);
  const hierarchy = schema['@graph'].find((node: any) => node['@type'] === 'BreadcrumbList');
  assert.ok(hierarchy.itemListElement[1].item.endsWith('/services/urologist-in-purnia'));
  assert.ok(marketing.related.length >= 2);
  for (const id of marketing.related) {
    const related = UROLOGY_SERVICES.find((item) => item.id === id);
    assert.ok(related && related.id !== service.id, `${route}: related service must exist`);
    assert.ok(html.includes(`href="/services/${related.slug}"`), `${route}: relevant sibling link`);
  }
}

const care = htmlFor('/explore-care');
for (const id of ['choose-care', 'emergency', 'icu', 'hdu', 'private-rooms']) {
  assert.ok(care.includes(`id="${id}"`) && care.includes(`href="#${id}"`), `Care guide target: ${id}`);
}
for (const text of ['Which service do I need?', '24×7 Emergency Services', 'Come straight in for', 'What happens when you arrive', 'Never delay coming in to find them.']) {
  assert.ok(care.includes(text), `Care guide content: ${text}`);
}
const unknown = getSeoForPath('/services/not-a-real-service');
assert.equal(unknown.noindex, true);
assert.equal(unknown.canonical, '');
assert.equal(getSeoForPath('/404').noindex, true);
assert.ok(htmlFor('/404').includes(`name="robots" content="noindex, ${ALLOW_INDEXING ? 'follow' : 'nofollow'}"`));
assert.ok(!read('dist/sitemap.xml').includes('/404'));

const config = typeof viteConfig === 'function' ? await viteConfig({ command: 'serve', mode: 'production' }) : viteConfig;
const plugin: any = config.plugins?.find((item: any) => item?.name === 'prerendered-preview-routes');
let middleware: any;
plugin.configurePreviewServer({ middlewares: { use: (handler: any) => { middleware = handler; } } });
for (const url of ['/missing-page', '/services/missing', '/missing.html', '/404', '/404.html']) {
  const request = { url };
  const response = { statusCode: 200, end() {}, writeHead(code: number) { this.statusCode = code; } };
  middleware(request, response, () => {});
  assert.equal(response.statusCode, 404, `${url}: real 404 status`);
  assert.equal(request.url, '/404.html', `${url}: custom 404 content`);
}
for (const url of ['/sitemap', '/sitemap.xml', '/robots.txt']) {
  const request = { url };
  const response = { statusCode: 200 };
  middleware(request, response, () => {});
  assert.equal(response.statusCode, 200, `${url}: sitemap/robots must remain accessible`);
}
console.log(`Passed: ${PRERENDER_ROUTES.length} rendered pages; phone, YouTube, experience, anchors; ${UROLOGY_SERVICES.length} service decisions and SILO links; HTML sitemap, care guide and 404 handling.`);
