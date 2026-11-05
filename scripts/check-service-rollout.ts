import './load-build-env';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import sharp from 'sharp';
import { UROLOGY_SERVICES, DR_NOORI_BOOKING_URL, HOSPITAL_PHONE_HREF, DR_ANWAR_KABIR_BOOKING_URL, DR_AZIZ_AHMED_BOOKING_URL, DR_ASIF_IQBAL_BOOKING_URL } from '../src/data/config';
import { NEUROLOGY_TOPICS, neurologyTopicPath } from '../src/data/neurology';
import { ADDITIONAL_CARE_TOPICS, additionalTopicPath } from '../src/data/additionalCareTopics';
import { CARE_DEPARTMENTS, careDepartmentPath } from '../src/data/careDepartments';
import { getServicePage } from '../src/data/servicePageContent';
import { DEPARTMENT_HERO_IMAGES, DOCTORS_HERO_IMAGE, FACILITY_IMAGES } from '../src/data/pageImages';
import { getFullUrl } from '../src/data/seo';

const read = (route: string) => fs.readFileSync(`dist${route}/index.html`, 'utf8');
const escape = (s: string) => s.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const paths = [...UROLOGY_SERVICES.map(item => '/services/' + item.slug), ...NEUROLOGY_TOPICS.map(neurologyTopicPath), ...ADDITIONAL_CARE_TOPICS.map(additionalTopicPath)];
assert.equal(paths.length, 33);
assert.equal(new Set(paths).size, 33);
const booking: Record<string, string> = {urology: DR_NOORI_BOOKING_URL, neurology: DR_ASIF_IQBAL_BOOKING_URL, ent: DR_ANWAR_KABIR_BOOKING_URL, anesthesiology: DR_AZIZ_AHMED_BOOKING_URL, 'general-medicine': HOSPITAL_PHONE_HREF};
for (const path of paths) {
  const content = getServicePage(path)!;
  const html = read(path);
  assert.ok(html.includes(`data-service-id="${content.id}"`), `${path}: shared care layout`);
  assert.ok(html.includes(`<h1 id="kidney-title">${escape(content.title)}</h1>`), `${path}: service-specific main heading`);
  assert.equal(content.actionHref, booking[content.departmentId], `${path}: correct specialist`);
  assert.ok(html.includes(`class="site-mobile-book" href="${content.actionHref}"`), `${path}: mobile appointment destination`);
  assert.ok(html.includes(`href="${content.departmentPath}"`), `${path}: parent department`);
  for (const section of ['overview', 'symptoms', 'assessment', 'options', 'risks', 'prepare', 'questions', 'book', 'sources']) assert.ok(html.includes(`id="${section}"`), `${path}: missing ${section}`);
  for (const question of content.faqs) assert.ok(html.includes(escape(question.question)) && html.includes(escape(question.answer)), `${path}: complete FAQ content`);
  assert.ok(content.image.alt && html.includes(`alt="${escape(content.image.alt)}"`), `${path}: relevant image alternative`);
  assert.ok(fs.existsSync('public' + content.image.src), `${path}: real image asset`);
  const imageTag = [...html.matchAll(/<img\b[^>]*>/g)].map(match => match[0]).find(tag => tag.includes(`alt="${escape(content.image.alt)}"`))!;
  assert.ok(imageTag.includes('fetchPriority="high"') && imageTag.includes('loading="eager"'), `${path}: hero delivery priority`);
  for (const reference of content.references) assert.ok(html.includes(`href="${reference.url}"`), `${path}: reference available`);
  if (content.urgent) assert.ok(html.includes(escape(content.notice)), `${path}: urgent symptoms retained`);
  if (content.departmentId !== 'urology') {
    const schema = JSON.parse(html.match(/<script[^>]*id="page-jsonld"[^>]*>([\s\S]*?)<\/script>/)![1]);
    assert.ok(!/Taquedis|reviewedBy|aggregateRating|InStock/.test(JSON.stringify(schema)), `${path}: no unrelated physician or unsupported review claims`);
  }
  if (content.video) {
    const videoTag = html.match(/<video\b[^>]*>/)![0];
    assert.ok(videoTag.includes('preload="none"') && !/autoPlay|autoplay/.test(videoTag), `${path}: explainer loads on request`);
  }
}
for (const department of CARE_DEPARTMENTS) {
  const html = read(careDepartmentPath(department.id));
  assert.ok(html.includes('class="concern-tabs" role="tablist"'), `${department.id}: accessible concern tabs`);
  assert.ok(html.includes('role="tabpanel"'), `${department.id}: matching panel`);
  const hero = DEPARTMENT_HERO_IMAGES[department.id];
  assert.ok(html.includes(hero.src), `${department.id}: hero image`);
  for (const service of department.services) assert.ok(html.includes(`href="/services/${service.slug}"`), `${department.id}: all services discoverable`);
}
assert.ok(read('/doctors').includes(DOCTORS_HERO_IMAGE.src));
const explore = read('/explore-care');
for (const id of ['icu', 'hdu', 'private-rooms']) assert.ok(explore.includes(FACILITY_IMAGES[id].src), `${id}: facility artwork`);
assert.ok(explore.includes('facility-illustration-label'));
for (const name of ['icu', 'hdu', 'private-room', 'doctors-consultation']) {
  for (const width of [480, 800, 1200]) {
    const file = `public/media/care-spaces/${name}${width === 1200 ? '' : '-' + width}.webp`;
    assert.ok(fs.statSync(file).size < 60 * 1024, `${file}: image delivery budget`);
    const metadata = await sharp(file).metadata();
    assert.equal(metadata.width, width); assert.equal(metadata.height, Math.round(width * 2 / 3));
  }
}
console.log('Passed: 33 care pages, 5 department selectors and heroes, specialist/mobile booking, full content, facility illustrations and responsive asset budgets.');
