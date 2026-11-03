import './load-build-env';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { NEUROLOGY_PATH, NEUROLOGY_SEO, NEUROLOGY_TOPICS, neurologyTopicImage, neurologyTopicPath } from '../src/data/neurology';
import { ROUTES_SEO, getFullUrl } from '../src/data/seo';
import { DR_ASIF_IQBAL_BOOKING_URL } from '../src/data/config';

const read = (route: string) => fs.readFileSync(`dist${route}/index.html`, 'utf8');
const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const overview = read(NEUROLOGY_PATH);
const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8');
const directory = read('/sitemap');
const targets = [
  { route: NEUROLOGY_PATH, keywords: NEUROLOGY_SEO.keywords, heading: NEUROLOGY_SEO.heading, image: NEUROLOGY_SEO.image },
  ...NEUROLOGY_TOPICS.map((topic) => ({ route: neurologyTopicPath(topic), keywords: topic.keywords, heading: topic.heading, image: neurologyTopicImage(topic) })),
];
for (const { route, keywords, heading, image } of targets) {
  const html = read(route);
  const seo = ROUTES_SEO[route];
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${route}: one visible main heading`);
  assert.ok(html.includes(escape(heading)), `${route}: actual heading`);
  assert.ok(seo.title.toLowerCase().includes(keywords[0].toLowerCase()), `${route}: title target`);
  assert.ok(seo.description.toLowerCase().includes(keywords[0].toLowerCase()), `${route}: description target`);
  assert.ok(seo.title.length >= 30 && seo.title.length <= 60, `${route}: editorial title length (${seo.title.length})`);
  assert.ok(seo.description.length >= 130 && seo.description.length <= 160, `${route}: editorial description length (${seo.description.length})`);
  assert.ok(html.includes(`<title>${escape(seo.title)}</title>`), `${route}: server-rendered title`);
  assert.ok(html.includes(`name="description" content="${escape(seo.description)}"`), `${route}: server-rendered description`);
  assert.ok(html.includes(`rel="canonical" href="${getFullUrl(route)}"`), `${route}: self canonical`);
  assert.ok(html.includes(`alt="${escape(image.alt)}"`), `${route}: descriptive image alternative`);
  for (const imagePath of [image.src, image.social]) assert.ok(fs.existsSync('public' + imagePath), `${route}: image exists`);
  assert.ok(html.includes(`property="og:image" content="${getFullUrl(image.social)}"`), `${route}: page-specific social image`);
  assert.ok(html.includes(`href="${DR_ASIF_IQBAL_BOOKING_URL}"`), `${route}: relevant appointment options`);
  assert.ok(sitemap.includes(`<loc>${getFullUrl(route)}</loc>`), `${route}: XML sitemap`);
  assert.ok(directory.includes(`href="${route}"`), `${route}: HTML sitemap`);
  const schema = JSON.parse(html.match(/<script[^>]*id="page-jsonld"[^>]*>([\s\S]*?)<\/script>/)![1]);
  assert.ok(schema['@graph'].some((node: any) => node['@type'] === 'MedicalWebPage'), `${route}: medical information schema`);
  assert.ok(!JSON.stringify(schema).includes('Urology') && !JSON.stringify(schema).includes('Taquedis'), `${route}: no urology attribution`);
  assert.ok(!/reviewedBy|aggregateRating|InStock|MedicalProcedure/.test(JSON.stringify(schema)), `${route}: no unsupported review, rating or procedure claims`);
  assert.ok(html.includes('Consultant Neurosurgeon'), `${route}: transparent listed specialty`);
}
for (const topic of NEUROLOGY_TOPICS) {
  const route = neurologyTopicPath(topic);
  const html = read(route);
  assert.ok(overview.includes(`href="${route}"`), `${route}: discoverable directly from parent HTML`);
  assert.ok(overview.includes(escape(topic.summary)), `${route}: summary present without selecting a tab`);
  assert.ok(html.includes(escape(topic.introduction)), `${route}: initial explanatory content`);
  assert.ok(html.includes(escape(topic.emergency)), `${route}: emergency guidance`);
  const breadcrumb = html.match(/<nav class="site-breadcrumb"[\s\S]*?<\/nav>/)![0];
  assert.ok(breadcrumb.includes(`href="${NEUROLOGY_PATH}"`), `${route}: visible parent breadcrumb`);
  for (const reference of topic.references) assert.ok(html.includes(`href="${reference.url}"`), `${route}: medical source`);
  for (const id of topic.related) {
    const related = NEUROLOGY_TOPICS.find((item) => item.id === id)!;
    assert.ok(related && related.id !== topic.id && html.includes(`href="${neurologyTopicPath(related)}"`), `${route}: valid related topic`);
  }
}
console.log('Passed: six neurology pages; rendered metadata, content, images, appointment destinations, crawlable hierarchy, sources and accurate schema.');
