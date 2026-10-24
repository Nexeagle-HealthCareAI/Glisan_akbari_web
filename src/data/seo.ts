import { HOSPITAL_NAME, DOCTOR_NAME, HOSPITAL_CITY, HOSPITAL_SHORT_ADDRESS, SITE_URL } from './identity';
import { UROLOGY_SERVICES } from './config';
import { HOMEPAGE_SEO, HOMEPAGE_URL } from './homepageSeo';

export { SITE_URL };

/**
 * Set to true only at launch, after all placeholders are replaced.
 */
export const ALLOW_INDEXING = false;

export const ROUTE_REDIRECTS: Record<string, string> = {
  '/book-appointment': '/doctors',
  '/conditions': '/services',
  '/treatments': '/services',
  '/hospital': '/contact',
};

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
  const cleanPath = path === '/' ? '' : path.replace(/\/+$/, '').replace(/^#/, '');
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
    title: `Explore Care | ${HOSPITAL_NAME}, ${HOSPITAL_CITY}`,
    description:
      `Explore kidney stone, prostate, urinary and other urology concerns at ${HOSPITAL_NAME}, ${HOSPITAL_CITY}. Prepare questions for your consultation.`,
    canonical: getFullUrl('/services'),
    url: getFullUrl('/services'),
  },
  '/reviews': {
    path: '/reviews',
    title: `Patient Feedback | ${HOSPITAL_NAME}`,
    description:
      `Contact ${HOSPITAL_NAME} to share feedback about your visit or explore our doctor profiles before booking.`,
    canonical: getFullUrl('/reviews'),
    url: getFullUrl('/reviews'),
  },
  '/faqs': {
    path: '/faqs',
    title: `Frequently Asked Questions | Urology Consultation ${HOSPITAL_CITY}`,
    description:
      'Answers to common questions about booking on Doctor Dekho, preparing reports for a consultation, and finding the hospital.',
    canonical: getFullUrl('/faqs'),
    url: getFullUrl('/faqs'),
  },
  '/contact': {
    path: '/contact',
    title: `Contact & Hospital Location | ${DOCTOR_NAME}`,
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
export const SITEMAP_ROUTES = [
  '/',
  '/doctors',
  '/doctors/dr-md-taquedis-noori',
  '/services',
  ...UROLOGY_SERVICES.map((srv) => `/services/${srv.slug}`),
  '/reviews',
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
