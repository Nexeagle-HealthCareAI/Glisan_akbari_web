import { HOSPITAL_NAME, DOCTOR_NAME, HOSPITAL_CITY, HOSPITAL_SHORT_ADDRESS, SITE_URL } from './identity';
import { UROLOGY_SERVICES } from './config';

export { SITE_URL };

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
  const cleanPath = path === '/' ? '' : path.replace(/\/+$/, '').replace(/^#/, '');
  return `${SITE_URL}${cleanPath}`;
}

export const ROUTES_SEO: Record<string, RouteSeo> = {
  '/': {
    path: '/',
    title: `${HOSPITAL_NAME}, ${HOSPITAL_CITY} | Book Appointment`,
    description:
      `Request an appointment at ${HOSPITAL_NAME}, ${HOSPITAL_SHORT_ADDRESS}. Meet our doctors and see our urology services.`,
    canonical: getFullUrl('/'),
    url: getFullUrl('/'),
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
    title: `Urology Services & Procedures | ${DOCTOR_NAME}`,
    description:
      `Urology services at ${HOSPITAL_NAME}, ${HOSPITAL_CITY}, including kidney stone, prostate, urinary and male infertility care. Book an appointment.`,
    canonical: getFullUrl('/services'),
    url: getFullUrl('/services'),
  },
  '/conditions': {
    path: '/conditions',
    title: `Conditions We Treat | ${DOCTOR_NAME} - Urologist`,
    description:
      `Patient guides for kidney stones, enlarged prostate, urinary infections, male fertility, and bladder concerns in ${HOSPITAL_CITY}.`,
    canonical: getFullUrl('/conditions'),
    url: getFullUrl('/conditions'),
  },
  '/treatments': {
    path: '/treatments',
    title: `Treatments & Surgical Procedures | ${DOCTOR_NAME}`,
    description:
      `Advanced minimally invasive, laser, and endoscopic urology procedures at ${HOSPITAL_NAME}, ${HOSPITAL_CITY}.`,
    canonical: getFullUrl('/treatments'),
    url: getFullUrl('/treatments'),
  },
  '/hospital': {
    path: '/hospital',
    title: `Hospital Overview | ${HOSPITAL_NAME}`,
    description:
      `${HOSPITAL_NAME}, ${HOSPITAL_SHORT_ADDRESS}: facilities, OPD timings, diagnostic imaging, and emergency care.`,
    canonical: getFullUrl('/hospital'),
    url: getFullUrl('/hospital'),
  },
  '/reviews': {
    path: '/reviews',
    title: `Patient Reviews & Testimonials | ${DOCTOR_NAME}`,
    description:
      `Read verified feedback and clinical experiences from patients treated by ${DOCTOR_NAME} in ${HOSPITAL_CITY}, Bihar.`,
    canonical: getFullUrl('/reviews'),
    url: getFullUrl('/reviews'),
  },
  '/faqs': {
    path: '/faqs',
    title: `Frequently Asked Questions | Urology Consultation ${HOSPITAL_CITY}`,
    description:
      'Answers to common questions about urology consultation, appointment scheduling, hospital admission, and insurance.',
    canonical: getFullUrl('/faqs'),
    url: getFullUrl('/faqs'),
  },
  '/book-appointment': {
    path: '/book-appointment',
    title: `Book Consultation | ${DOCTOR_NAME} Urology Care`,
    description:
      `Request an appointment with ${DOCTOR_NAME} at ${HOSPITAL_NAME}, ${HOSPITAL_SHORT_ADDRESS}.`,
    canonical: getFullUrl('/book-appointment'),
    url: getFullUrl('/book-appointment'),
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
      `${srv.title} by senior urologist ${DOCTOR_NAME} at ${HOSPITAL_NAME}, ${HOSPITAL_SHORT_ADDRESS}. High clearance rates and fast recovery.`,
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
  '/conditions',
  '/treatments',
  '/hospital',
  '/reviews',
  '/faqs',
  '/book-appointment',
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
