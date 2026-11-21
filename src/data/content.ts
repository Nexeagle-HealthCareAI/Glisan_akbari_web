/**
 * Content that people edit without touching code: hospital details, questions and answers, blog articles,
 * doctors, health camps, notices, patient stories, changes to service pages, and redirects for moved pages.
 * The files are in /content at the top of the repository. The CRM's Website page writes them when something is
 * published; they can also be edited by hand. Everything is checked here, so a mistake stops the build with a
 * plain message instead of reaching the live site.
 */
import siteJson from '../../content/site.json';
import faqsJson from '../../content/faqs.json';
import blogJson from '../../content/blog.json';
import doctorsJson from '../../content/doctors.json';
import campsJson from '../../content/camps.json';
import noticesJson from '../../content/notices.json';
import testimonialsJson from '../../content/testimonials.json';
import servicesJson from '../../content/services.json';
import redirectsJson from '../../content/redirects.json';

export type SiteContent = {
  phone: string;
  whatsappNumber: string;
  email: string;
  website: string;
  consultationTimings: string;
  emergencyInfo: string;
  description: string;
  medicalDisclaimer: string;
};

export type FaqContent = {
  id: string;
  question: string;
  answer: string;
  category: 'appointment' | 'consultation' | 'hospital' | 'medical';
};

export type BlogContent = {
  slug: string;
  title: string;
  excerpt: string;
  departmentId: string;
  status: 'draft' | 'published';
  publishedAt: string;
  author: string;
  reviewedBy?: string;
  image?: { src: string; alt: string };
  sections: { heading: string; paragraphs: string[]; points?: string[] }[];
  references?: { label: string; url: string }[];
};

export type DoctorContent = {
  id: string;
  slug?: string;
  name: string;
  label?: string;
  specialty: string;
  department: string;
  qualifications: string;
  medicalRegistration: string;
  yearsOfExperience: string;
  profileImagePlaceholder: string;
  profileImage?: string;
  consultationTimings: string;
  languages: string;
  isClickable: boolean;
  bookingUrl?: string;
  rating?: number;
  reviewCount?: number;
  isVerified?: boolean;
  focusAreas?: string[];
  practicesAtAddress?: string;
  initials?: string;
  avatarGradient?: string;
  biography?: string;
};

export type CampContent = {
  slug: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  place: string;
  address?: string;
  description: string;
  services: string[];
  doctors: string[];
  free: boolean;
  contactPhone?: string;
};

export type NoticeContent = {
  id: string;
  text: string;
  tone: 'info' | 'urgent';
  link?: { label: string; href: string };
  startDate?: string;
  endDate?: string;
};

export type TestimonialContent = {
  id: string;
  quote: string;
  name: string;
  place?: string;
  departmentId?: string;
  /** Set only when the patient's written consent is on record at the hospital. */
  consentRecorded: true;
};

/** Text of a service page that can be changed from the CRM, by the service's id. Missing fields keep the page's own text. */
export type ServiceOverride = Partial<{
  title: string;
  tagline: string;
  description: string;
  overview: string[];
  symptoms: string[];
  procedures: { name: string; description: string }[];
  benefits: string[];
  preparation: string[];
  faqs: { question: string; answer: string }[];
  risks: string;
  references: { label: string; url: string }[];
  seoTitle: string;
  seoDescription: string;
}>;

export type RedirectContent = { from: string; to: string };

export const FAQ_CATEGORIES = ['appointment', 'consultation', 'hospital', 'medical'] as const;
export const BLOG_DEPARTMENT_IDS = ['urology', 'ent', 'general-medicine', 'anesthesiology', 'neurology'] as const;

const fail = (file: string, what: string): never => {
  throw new Error(`content/${file}: ${what}`);
};
const text = (v: unknown) => typeof v === 'string' && v.trim().length > 0;
const list = (v: unknown): v is unknown[] => Array.isArray(v);

function checkSite(raw: unknown): SiteContent {
  const s = (raw ?? {}) as Record<string, unknown>;
  const keys: (keyof SiteContent)[] = ['phone', 'whatsappNumber', 'email', 'website', 'consultationTimings', 'emergencyInfo', 'description', 'medicalDisclaimer'];
  keys.forEach((k) => { if (!text(s[k])) fail('site.json', `"${k}" is missing or empty.`); });
  if (!/^\d{10}$/.test(String(s.phone))) fail('site.json', '"phone" must be the 10-digit number, without +91, spaces or dashes.');
  return s as unknown as SiteContent;
}

function checkFaqs(raw: unknown): FaqContent[] {
  if (!list(raw)) return fail('faqs.json', 'must be a list of questions.');
  const seen = new Set<string>();
  raw.forEach((item, i) => {
    const f = (item ?? {}) as Record<string, unknown>;
    const where = `question ${i + 1}`;
    if (!text(f.id)) fail('faqs.json', `${where} has no "id".`);
    if (seen.has(String(f.id))) fail('faqs.json', `two questions share the id "${f.id}".`);
    seen.add(String(f.id));
    if (!text(f.question)) fail('faqs.json', `${where} has no "question".`);
    if (!text(f.answer)) fail('faqs.json', `${where} ("${f.question}") has no "answer".`);
    if (!(FAQ_CATEGORIES as readonly string[]).includes(String(f.category))) fail('faqs.json', `${where} ("${f.question}") needs "category" to be one of: ${FAQ_CATEGORIES.join(', ')}.`);
  });
  return raw as FaqContent[];
}

function checkBlog(raw: unknown): BlogContent[] {
  if (!list(raw)) return fail('blog.json', 'must be a list of articles.');
  const seen = new Set<string>();
  raw.forEach((item, i) => {
    const p = (item ?? {}) as Record<string, unknown>;
    const where = text(p.slug) ? `article "${p.slug}"` : `article ${i + 1}`;
    if (!text(p.slug) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(p.slug))) fail('blog.json', `${where} needs a "slug" in lowercase letters, numbers and hyphens only.`);
    if (seen.has(String(p.slug))) fail('blog.json', `two articles share the slug "${p.slug}".`);
    seen.add(String(p.slug));
    (['title', 'excerpt', 'author'] as const).forEach((k) => { if (!text(p[k])) fail('blog.json', `${where} has no "${k}".`); });
    if (!(BLOG_DEPARTMENT_IDS as readonly string[]).includes(String(p.departmentId))) fail('blog.json', `${where} needs "departmentId" to be one of: ${BLOG_DEPARTMENT_IDS.join(', ')}.`);
    if (p.status !== 'draft' && p.status !== 'published') fail('blog.json', `${where} needs "status" to be "draft" or "published".`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(p.publishedAt)) || Number.isNaN(Date.parse(`${p.publishedAt}T00:00:00Z`))) fail('blog.json', `${where} needs "publishedAt" as a real date, YYYY-MM-DD.`);
    if (p.reviewedBy !== undefined && !text(p.reviewedBy)) fail('blog.json', `${where} has an empty "reviewedBy"; remove it or name the reviewer.`);
    if (p.image !== undefined) {
      const img = (p.image ?? {}) as Record<string, unknown>;
      if (!text(img.src) || !String(img.src).startsWith('/')) fail('blog.json', `${where}: the image "src" must be a path on this site starting with "/".`);
      if (!text(img.alt)) fail('blog.json', `${where}: the image needs a description ("alt").`);
    }
    if (!list(p.sections) || p.sections.length === 0) fail('blog.json', `${where} needs at least one section.`);
    (p.sections as unknown[]).forEach((sec, n) => {
      const s = (sec ?? {}) as Record<string, unknown>;
      if (!text(s.heading)) fail('blog.json', `${where}: section ${n + 1} has no heading.`);
      if (!list(s.paragraphs) || !s.paragraphs.every(text)) fail('blog.json', `${where}: section ${n + 1} ("${s.heading}") needs "paragraphs" as a list of text (it can be empty).`);
      if (s.points !== undefined && (!list(s.points) || !s.points.every(text))) fail('blog.json', `${where}: section ${n + 1} ("${s.heading}") has "points" that are not a list of text.`);
      if ((s.paragraphs as unknown[]).length === 0 && !(list(s.points) && s.points.length > 0)) fail('blog.json', `${where}: section ${n + 1} ("${s.heading}") is empty.`);
    });
    if (p.references !== undefined) {
      if (!list(p.references)) fail('blog.json', `${where}: "references" must be a list.`);
      (p.references as unknown[]).forEach((ref, n) => {
        const r = (ref ?? {}) as Record<string, unknown>;
        if (!text(r.label) || !/^https:\/\/\S+$/.test(String(r.url))) fail('blog.json', `${where}: reference ${n + 1} needs a "label" and an https "url".`);
      });
    }
  });
  return raw as BlogContent[];
}

const isDate = (v: unknown) => /^\d{4}-\d{2}-\d{2}$/.test(String(v)) && !Number.isNaN(Date.parse(`${v}T00:00:00Z`));
const texts = (v: unknown) => list(v) && v.every(text);
const sitePath = (v: unknown) => typeof v === 'string' && /^\/[a-z0-9\-/]*$/.test(v) && !v.includes('//');

function checkDoctors(raw: unknown): DoctorContent[] {
  if (!list(raw) || raw.length === 0) return fail('doctors.json', 'must be a list with at least one doctor.');
  const seen = new Set<string>();
  raw.forEach((item, i) => {
    const d = (item ?? {}) as Record<string, unknown>;
    const where = text(d.name) ? `doctor "${d.name}"` : `doctor ${i + 1}`;
    if (!text(d.id)) fail('doctors.json', `${where} has no "id".`);
    if (seen.has(String(d.id))) fail('doctors.json', `two doctors share the id "${d.id}".`);
    seen.add(String(d.id));
    (['name', 'specialty', 'department', 'qualifications', 'medicalRegistration', 'yearsOfExperience', 'profileImagePlaceholder', 'consultationTimings', 'languages'] as const)
      .forEach((k) => { if (!text(d[k])) fail('doctors.json', `${where} has no "${k}".`); });
    if (typeof d.isClickable !== 'boolean') fail('doctors.json', `${where} needs "isClickable" as true or false.`);
    if (d.isClickable && !text(d.slug)) fail('doctors.json', `${where} has a profile page, so it needs a "slug".`);
    if (d.profileImage !== undefined && !(typeof d.profileImage === 'string' && d.profileImage.startsWith('/'))) fail('doctors.json', `${where}: "profileImage" must be a path on this site starting with "/".`);
    if (d.bookingUrl !== undefined && !/^https:\/\/\S+$/.test(String(d.bookingUrl))) fail('doctors.json', `${where}: "bookingUrl" must start with https://.`);
    if (d.focusAreas !== undefined && !texts(d.focusAreas)) fail('doctors.json', `${where}: "focusAreas" must be a list of text.`);
    if (d.biography !== undefined && !text(d.biography)) fail('doctors.json', `${where} has an empty "biography"; remove it or write one.`);
  });
  return raw as DoctorContent[];
}

function checkCamps(raw: unknown): CampContent[] {
  if (!list(raw)) return fail('camps.json', 'must be a list of camps.');
  const seen = new Set<string>();
  raw.forEach((item, i) => {
    const c = (item ?? {}) as Record<string, unknown>;
    const where = text(c.title) ? `camp "${c.title}"` : `camp ${i + 1}`;
    if (!text(c.slug) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(c.slug))) fail('camps.json', `${where} needs a "slug" in lowercase letters, numbers and hyphens.`);
    if (seen.has(String(c.slug))) fail('camps.json', `two camps share the slug "${c.slug}".`);
    seen.add(String(c.slug));
    (['title', 'place', 'description'] as const).forEach((k) => { if (!text(c[k])) fail('camps.json', `${where} has no "${k}".`); });
    if (!isDate(c.date)) fail('camps.json', `${where} needs "date" as a real date, YYYY-MM-DD.`);
    if (!/^\d{2}:\d{2}$/.test(String(c.startTime)) || !/^\d{2}:\d{2}$/.test(String(c.endTime))) fail('camps.json', `${where} needs "startTime" and "endTime" as HH:MM.`);
    if (!list(c.services) || !c.services.every(text)) fail('camps.json', `${where}: "services" must be a list of text (it can be empty).`);
    if (!list(c.doctors) || !c.doctors.every(text)) fail('camps.json', `${where}: "doctors" must be a list of text (it can be empty).`);
    if (typeof c.free !== 'boolean') fail('camps.json', `${where} needs "free" as true or false.`);
    if (c.contactPhone !== undefined && !/^\d{10}$/.test(String(c.contactPhone))) fail('camps.json', `${where}: "contactPhone" must be the 10 digits only.`);
  });
  return raw as CampContent[];
}

function checkNotices(raw: unknown): NoticeContent[] {
  if (!list(raw)) return fail('notices.json', 'must be a list of notices.');
  const seen = new Set<string>();
  raw.forEach((item, i) => {
    const n = (item ?? {}) as Record<string, unknown>;
    const where = `notice ${text(n.id) ? `"${n.id}"` : i + 1}`;
    if (!text(n.id)) fail('notices.json', `${where} has no "id".`);
    if (seen.has(String(n.id))) fail('notices.json', `two notices share the id "${n.id}".`);
    seen.add(String(n.id));
    if (!text(n.text) || String(n.text).length > 220) fail('notices.json', `${where} needs "text" of up to 220 characters.`);
    if (n.tone !== 'info' && n.tone !== 'urgent') fail('notices.json', `${where} needs "tone" to be "info" or "urgent".`);
    if (n.link !== undefined) {
      const l = (n.link ?? {}) as Record<string, unknown>;
      if (!text(l.label) || !(sitePath(l.href) || /^https:\/\/\S+$/.test(String(l.href)))) fail('notices.json', `${where}: the link needs a "label" and an "href" (a path on this site or an https address).`);
    }
    if (n.startDate !== undefined && !isDate(n.startDate)) fail('notices.json', `${where}: "startDate" must be YYYY-MM-DD.`);
    if (n.endDate !== undefined && !isDate(n.endDate)) fail('notices.json', `${where}: "endDate" must be YYYY-MM-DD.`);
    if (n.startDate && n.endDate && String(n.endDate) < String(n.startDate)) fail('notices.json', `${where} ends before it starts.`);
  });
  return raw as NoticeContent[];
}

function checkTestimonials(raw: unknown): TestimonialContent[] {
  if (!list(raw)) return fail('testimonials.json', 'must be a list of patient stories.');
  const seen = new Set<string>();
  raw.forEach((item, i) => {
    const t = (item ?? {}) as Record<string, unknown>;
    const where = `story ${text(t.id) ? `"${t.id}"` : i + 1}`;
    if (!text(t.id)) fail('testimonials.json', `${where} has no "id".`);
    if (seen.has(String(t.id))) fail('testimonials.json', `two stories share the id "${t.id}".`);
    seen.add(String(t.id));
    if (!text(t.quote) || String(t.quote).length > 600) fail('testimonials.json', `${where} needs a "quote" of up to 600 characters.`);
    if (!text(t.name)) fail('testimonials.json', `${where} has no "name" (a first name and initial is enough).`);
    if (t.consentRecorded !== true) fail('testimonials.json', `${where}: a patient story can only be shown when the patient's consent is on record ("consentRecorded": true).`);
  });
  return raw as TestimonialContent[];
}

const SERVICE_TEXT = ['title', 'tagline', 'description', 'risks', 'seoTitle', 'seoDescription'];
const SERVICE_LISTS = ['overview', 'symptoms', 'benefits', 'preparation'];
function checkServices(raw: unknown): Record<string, ServiceOverride> {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return fail('services.json', 'must be an object keyed by service id.');
  Object.entries(raw as Record<string, unknown>).forEach(([id, value]) => {
    const o = (value ?? {}) as Record<string, unknown>;
    const where = `service "${id}"`;
    Object.keys(o).forEach((k) => {
      if (![...SERVICE_TEXT, ...SERVICE_LISTS, 'procedures', 'faqs', 'references'].includes(k)) fail('services.json', `${where} has an unknown field "${k}".`);
    });
    SERVICE_TEXT.forEach((k) => { if (o[k] !== undefined && !text(o[k])) fail('services.json', `${where}: "${k}" is empty.`); });
    SERVICE_LISTS.forEach((k) => { if (o[k] !== undefined && !texts(o[k])) fail('services.json', `${where}: "${k}" must be a list of text.`); });
    if (o.procedures !== undefined && !(list(o.procedures) && o.procedures.every((p) => text((p as Record<string, unknown>)?.name) && text((p as Record<string, unknown>)?.description)))) fail('services.json', `${where}: each procedure needs a "name" and a "description".`);
    if (o.faqs !== undefined && !(list(o.faqs) && o.faqs.every((p) => text((p as Record<string, unknown>)?.question) && text((p as Record<string, unknown>)?.answer)))) fail('services.json', `${where}: each question needs a "question" and an "answer".`);
    if (o.references !== undefined && !(list(o.references) && o.references.every((r) => text((r as Record<string, unknown>)?.label) && /^https:\/\/\S+$/.test(String((r as Record<string, unknown>)?.url))))) fail('services.json', `${where}: each reference needs a "label" and an https "url".`);
  });
  return raw as Record<string, ServiceOverride>;
}

function checkRedirects(raw: unknown): RedirectContent[] {
  if (!list(raw)) return fail('redirects.json', 'must be a list of { "from", "to" }.');
  const seen = new Set<string>();
  raw.forEach((item, i) => {
    const r = (item ?? {}) as Record<string, unknown>;
    if (!sitePath(r.from) || !sitePath(r.to) || r.from === '/') fail('redirects.json', `redirect ${i + 1} needs "from" and "to" as paths on this site, like "/blogs/old-name".`);
    if (r.from === r.to) fail('redirects.json', `redirect ${i + 1} points to itself.`);
    if (seen.has(String(r.from))) fail('redirects.json', `"${r.from}" is redirected twice.`);
    seen.add(String(r.from));
  });
  return raw as RedirectContent[];
}

export const SITE_CONTENT = checkSite(siteJson);
export const FAQ_CONTENT = checkFaqs(faqsJson);
export const BLOG_CONTENT = checkBlog(blogJson);
export const DOCTOR_CONTENT = checkDoctors(doctorsJson);
export const CAMP_CONTENT = checkCamps(campsJson);
export const NOTICE_CONTENT = checkNotices(noticesJson);
export const TESTIMONIAL_CONTENT = checkTestimonials(testimonialsJson);
export const SERVICE_OVERRIDES = checkServices(servicesJson);
export const REDIRECT_CONTENT = checkRedirects(redirectsJson);

/** The site is built ahead of time, so "today" is the day of the build (India time); pages also re-check in the browser. */
export const BUILD_DAY = new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10);
export const isCurrent = (n: { startDate?: string; endDate?: string }, day: string) => (!n.startDate || n.startDate <= day) && (!n.endDate || n.endDate >= day);
export const UPCOMING_CAMPS = CAMP_CONTENT.filter((c) => c.date >= BUILD_DAY).sort((a, b) => (a.date + a.startTime).localeCompare(b.date + b.startTime));
export const CURRENT_NOTICES = NOTICE_CONTENT.filter((n) => isCurrent(n, BUILD_DAY));
