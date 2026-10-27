import { HOSPITAL_NAME, DOCTOR_NAME, HOSPITAL_CITY, HOSPITAL_SHORT_ADDRESS, SITE_URL } from './identity';
import { UROLOGY_SERVICES } from './config';
import { HOMEPAGE_SEO, HOMEPAGE_URL } from './homepageSeo';
import { CARE_DEPARTMENTS, careDepartmentPath } from './careDepartments';
import { PUBLISHED_BLOG_POSTS, blogPath } from './blogs';

export { SITE_URL };
export { ROUTE_REDIRECTS } from './routes';

/**
 * Set to true only at launch, after all placeholders are replaced.
 */
export const ALLOW_INDEXING = false;

export interface RouteSeo {
  path: string;
  title: string;
  description: string;
  canonical: string;
  url: string;
}

/**
 * Helper to build canonical and og:url without hashes or trailing slashes
 */
export function getFullUrl(path: string): string {
  const pathname = path.split(/[?#]/, 1)[0] || '/';
  const cleanPath = pathname === '/' ? '' : pathname.replace(/\/+$/, '');
  return `${SITE_URL}${cleanPath}`;
}

export const ROUTES_SEO: Record<string, RouteSeo> = {
  '/': {
    path: '/',
    title: HOMEPAGE_SEO.title,
    description: HOMEPAGE_SEO.description,
    canonical: HOMEPAGE_URL,
    url: HOMEPAGE_URL,
  },
  '/doctors': {
    path: '/doctors',
    title: `Our Doctors | ${HOSPITAL_NAME}, ${HOSPITAL_CITY}`,
    description:
      `Meet the doctors at ${HOSPITAL_NAME}, ${HOSPITAL_SHORT_ADDRESS}, and request an appointment.`,
    canonical: getFullUrl('/doctors'),
    url: getFullUrl('/doctors'),
  },
  '/doctors/dr-md-taquedis-noori': {
    path: '/doctors/dr-md-taquedis-noori',
    title: `${DOCTOR_NAME} | Urologist in ${HOSPITAL_CITY}`,
    description:
      `${DOCTOR_NAME}, urologist at ${HOSPITAL_NAME}, ${HOSPITAL_SHORT_ADDRESS}. Request an appointment.`,
    canonical: getFullUrl('/doctors/dr-md-taquedis-noori'),
    url: getFullUrl('/doctors/dr-md-taquedis-noori'),
  },
  '/services': {
    path: '/services',
    title: `Departments | ${HOSPITAL_NAME}, ${HOSPITAL_CITY}`,
    description:
      `Browse department care topics at ${HOSPITAL_NAME}, ${HOSPITAL_CITY}, and find the right doctor for your consultation.`,
    canonical: getFullUrl('/services'),
    url: getFullUrl('/services'),
  },
  '/explore-care': {
    path: '/explore-care',
    title: `Explore Care | ${HOSPITAL_NAME}`,
    description:
      `Contact ${HOSPITAL_NAME} for information about hospital facilities and help planning your visit.`,
    canonical: getFullUrl('/explore-care'),
    url: getFullUrl('/explore-care'),
  },
  '/faqs': {
    path: '/faqs',
    title: `Frequently Asked Questions | Urology Consultation ${HOSPITAL_CITY}`,
    description:
      'Answers to common questions about booking on Doctor Dekho, preparing reports for a consultation, and finding the hospital.',
    canonical: getFullUrl('/faqs'),
    url: getFullUrl('/faqs'),
  },
  '/blogs': {
    path: '/blogs',
    title: 'Health Blog | Glisan Akbari Hospital, Purnea',
    description: 'Explore the Glisan Akbari Hospital health blog for articles about urology, ENT, general medicine, anaesthesia and neurology, explained in simple words.',
    canonical: getFullUrl('/blogs'),
    url: getFullUrl('/blogs'),
  },
  '/contact': {
    path: '/contact',
    title: `Visit Us | ${HOSPITAL_NAME}`,
    description:
      `Reach ${HOSPITAL_NAME} in ${HOSPITAL_SHORT_ADDRESS}. OPD contact numbers, address, and consultation directions.`,
    canonical: getFullUrl('/contact'),
    url: getFullUrl('/contact'),
  },
  '/privacy-policy': {
    path: '/privacy-policy',
    title: `Privacy Policy | ${DOCTOR_NAME} Urology Care`,
    description:
      'Privacy policy and patient data confidentiality guidelines for website visitors and appointment booking.',
    canonical: getFullUrl('/privacy-policy'),
    url: getFullUrl('/privacy-policy'),
  },
  '/terms': {
    path: '/terms',
    title: `Terms & Conditions | ${DOCTOR_NAME} Urology Care`,
    description:
      `Terms and conditions of use and medical website disclaimer for ${DOCTOR_NAME}.`,
    canonical: getFullUrl('/terms'),
    url: getFullUrl('/terms'),
  },
  '/404': {
    path: '/404',
    title: `Page Not Found (404) | ${DOCTOR_NAME}`,
    description:
      `The requested urology care page could not be found. Return to home or schedule an appointment with ${DOCTOR_NAME}.`,
    canonical: getFullUrl('/404'),
    url: getFullUrl('/404'),
  },
};

// Urology keeps its existing /services URL. Each other department gets a
// dedicated static page instead of sharing the Urology canonical URL.
CARE_DEPARTMENTS.filter((department) => department.id !== 'urology').forEach((department) => {
  const path = careDepartmentPath(department.id);
  ROUTES_SEO[path] = {
    path,
    title: `${department.label} Care Topics | ${HOSPITAL_CITY}`,
    description: `Explore ${department.label.toLowerCase()} care topics and questions to discuss with your doctor. Contact ${HOSPITAL_NAME} to confirm availability.`,
    canonical: getFullUrl(path),
    url: getFullUrl(path),
  };
});

// Dynamically generate SEO metadata for each dedicated urological procedure page
UROLOGY_SERVICES.forEach((srv) => {
  const servicePath = `/services/${srv.slug}`;
  ROUTES_SEO[servicePath] = {
    path: servicePath,
    title: srv.seoTitle || `${srv.title} in ${HOSPITAL_CITY} | ${DOCTOR_NAME}`,
    description:
      srv.seoDescription ||
      `Explore ${srv.title.toLowerCase()} with ${DOCTOR_NAME} at ${HOSPITAL_NAME}, ${HOSPITAL_SHORT_ADDRESS}. Discuss your options in a consultation.`,
    canonical: getFullUrl(servicePath),
    url: getFullUrl(servicePath),
  };
});

/**
 * Public pages for sitemap.xml (including all dedicated procedure pages, excluding /404)
 */
PUBLISHED_BLOG_POSTS.forEach((post) => {
  const path = blogPath(post.slug);
  ROUTES_SEO[path] = { path, title: `${post.title} | Glisan Akbari`, description: post.excerpt,
    canonical: getFullUrl(path), url: getFullUrl(path) };
});

export const SITEMAP_ROUTES = [
  '/',
  '/doctors',
  '/doctors/dr-md-taquedis-noori',
  '/services',
  ...CARE_DEPARTMENTS.filter((department) => department.id !== 'urology')
    .map((department) => careDepartmentPath(department.id)),
  ...UROLOGY_SERVICES.map((srv) => `/services/${srv.slug}`),
  '/explore-care',
  '/blogs',
  ...PUBLISHED_BLOG_POSTS.map((post) => blogPath(post.slug)),
  '/faqs',
  '/contact',
  '/privacy-policy',
  '/terms',
];

export const PRERENDER_ROUTES = Object.keys(ROUTES_SEO);

export function getSeoForPath(path: string): RouteSeo {
  // Normalize path by stripping trailing slash (except root '/')
  const normalized = path === '/' ? '/' : path.replace(/\/+$/, '');
  const url = getFullUrl(normalized);
  const base = ROUTES_SEO[normalized];
  if (normalized === '/') return { ...base };
  if (base) {
    return {
      ...base,
      canonical: url,
      url,
    };
  }

  return {
    path: normalized,
    title: `${DOCTOR_NAME} - Urology | ${HOSPITAL_NAME}`,
    description:
      `Urology consultation with ${DOCTOR_NAME} at ${HOSPITAL_NAME}, ${HOSPITAL_SHORT_ADDRESS}, Bihar.`,
    canonical: url,
    url,
  };
}
