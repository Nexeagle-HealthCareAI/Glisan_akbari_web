/**
 * Content that people edit without touching code: hospital details, questions and answers, and blog articles.
 * The files are in /content at the top of the repository. The CRM's Website page writes them when something is
 * published; they can also be edited by hand. Everything is checked here, so a mistake stops the build with a
 * plain message instead of reaching the live site.
 */
import siteJson from '../../content/site.json';
import faqsJson from '../../content/faqs.json';
import blogJson from '../../content/blog.json';

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

export const SITE_CONTENT = checkSite(siteJson);
export const FAQ_CONTENT = checkFaqs(faqsJson);
export const BLOG_CONTENT = checkBlog(blogJson);
