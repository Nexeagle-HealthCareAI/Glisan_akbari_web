import { CARE_DEPARTMENTS } from './careDepartments';

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  departmentId: string;
  status: 'draft' | 'published';
  publishedAt: string; // YYYY-MM-DD; shown as the actual publication date.
  author: string;
  reviewedBy?: string;
  image?: { src: string; alt: string };
  sections: { heading: string; paragraphs: string[]; points?: string[] }[];
  references?: { label: string; url: string }[];
};

export const BLOG_CATEGORIES = CARE_DEPARTMENTS.map(({ id, label }) => ({
  id,
  label: id === 'ent' ? 'ENT' : label,
}));

// Add hospital-approved articles here. Drafts have no public page or sitemap entry.
// See BLOG_PUBLISHING.md for the complete publishing example.
export const BLOG_POSTS: BlogPost[] = [];

export const PUBLISHED_BLOG_POSTS = BLOG_POSTS
  .filter((post) => post.status === 'published')
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

// Keep future published article images from silently losing their descriptions.
PUBLISHED_BLOG_POSTS.forEach((post) => {
  if (post.image && !post.image.alt?.trim()) {
    throw new Error(`Blog image for "${post.slug}" needs descriptive alt text before publication.`);
  }
});

export const BLOG_TOPICS = [
  { departmentId: 'urology', title: 'Understanding kidney & urinary health', description: 'Simple guides to urology topics and questions for your next consultation.' },
  { departmentId: 'ent', title: 'Ear, nose & throat care, explained', description: 'Upcoming articles about hearing, sinus and throat concerns.' },
  { departmentId: 'general-medicine', title: 'A clearer guide to everyday health', description: 'Upcoming articles about general health, checkups and ongoing care.' },
  { departmentId: 'anesthesiology', title: 'Before your procedure: questions to ask', description: 'Upcoming guides to anaesthesia consultations and preparing for your visit.' },
  { departmentId: 'neurology', title: 'Understanding brain & nerve health', description: 'Upcoming articles to help you prepare questions for your neurologist.' },
];

export function blogPath(slug: string) {
  return `/blogs/${slug}`;
}

export function blogCategoryLabel(departmentId: string) {
  return BLOG_CATEGORIES.find((category) => category.id === departmentId)?.label || 'Health';
}

export function blogReadingMinutes(post: BlogPost) {
  const words = post.sections.flatMap((section) => [section.heading, ...section.paragraphs, ...(section.points || [])]).join(' ').split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 180));
}

export function blogDate(date: string) {
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(date + 'T00:00:00Z'));
}
