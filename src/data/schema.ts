import { PATIENT_FAQS } from './patientFaqs';
import { SITE_URL, getFullUrl } from './seo';
import { DOCTOR_PROFILE, HOSPITAL_PROFILE, UROLOGY_SERVICES, DR_NOORI_BOOKING_URL, DR_NOORI_GOOGLE_PROFILE } from './config';
import { HOSPITAL_NAME, DOCTOR_NAME } from './identity';
import { HOMEPAGE_ADDRESS, HOMEPAGE_SEO, HOMEPAGE_URL } from './homepageSeo';
import { CARE_DEPARTMENTS, careDepartmentPath } from './careDepartments';
import { PUBLISHED_BLOG_POSTS, blogPath } from './blogs';

/**
 * Format phone number into clean E.164 international standard (+919234606330).
 */
export function formatInternationalPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('91') && digits.length === 12) {
    return `+${digits}`;
  }
  if (digits.startsWith('0') && digits.length === 11) {
    return `+91${digits.slice(1)}`;
  }
  if (digits.length === 10) {
    return `+91${digits}`;
  }
  return phone;
}

/**
 * Detects if a value contains any placeholder marker.
 */
function containsPlaceholder(val: unknown): boolean {
  if (typeof val === 'string') {
    return val.includes('[PLACEHOLDER');
  }
  return false;
}

/**
 * Recursively removes any field containing "[PLACEHOLDER".
 * Never outputs placeholder text in structured JSON-LD schema.
 */
export function cleanSchemaValue<T>(obj: T): T | undefined {
  if (obj === null || obj === undefined) return undefined;
  if (typeof obj === 'string') {
    return containsPlaceholder(obj) ? undefined : obj;
  }
  if (typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    const cleanedArr = obj
      .map((item) => cleanSchemaValue(item))
      .filter((item) => item !== undefined);
    return cleanedArr.length > 0 ? (cleanedArr as unknown as T) : undefined;
  }
  const result: Record<string, any> = {};
  for (const [key, val] of Object.entries(obj)) {
    const cleanedVal = cleanSchemaValue(val);
    if (cleanedVal !== undefined) {
      result[key] = cleanedVal;
    }
  }
  return Object.keys(result).length > 0 ? (result as T) : undefined;
}

const BREADCRUMB_LABELS: Record<string, string> = {
  '/doctors': 'Our Doctors',
  '/doctors/dr-md-taquedis-noori': DOCTOR_NAME,
  '/services/urologist-in-purnia': 'Departments',
  '/explore-care': 'Explore care',
  '/blogs': 'Blogs',
  '/faqs': 'FAQs',
  '/contact': 'Visit us',
  '/privacy-policy': 'Privacy Policy',
  '/terms': 'Terms',
  '/404': 'Page Not Found',
  '/sitemap': 'Sitemap',
};

/**
 * Generates per-page Schema.org JSON-LD structured data with stable linked entities.
 * Includes Physician and Hospital on all pages, FAQPage on /faqs, and BreadcrumbList on all non-home pages.
 */
export function generatePageSchema(path: string) {
  const normalizedPath = path === '/' ? '/' : path.replace(/\/+$/, '');
  const blogPost = PUBLISHED_BLOG_POSTS.find((post) => blogPath(post.slug) === normalizedPath);
  if (normalizedPath === '/blogs' || blogPost) {
    const blogUrl = getFullUrl('/blogs');
    const pageUrl = getFullUrl(normalizedPath);
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Blog', '@id': `${blogUrl}#blog`, url: blogUrl,
          name: 'The Health Journal — Glisan Akbari Hospital',
          ...(PUBLISHED_BLOG_POSTS.length > 0 ? { blogPost: PUBLISHED_BLOG_POSTS.map((post) => ({
            '@type': 'BlogPosting', '@id': `${getFullUrl(blogPath(post.slug))}#article`,
            headline: post.title, url: getFullUrl(blogPath(post.slug)),
          })) } : {}),
        },
        ...(blogPost ? [{
          '@type': 'BlogPosting', '@id': `${pageUrl}#article`, url: pageUrl,
          headline: blogPost.title, description: blogPost.excerpt,
          datePublished: blogPost.publishedAt,
          author: { '@type': 'Person', name: blogPost.author },
          publisher: { '@type': 'Organization', name: HOSPITAL_NAME },
          mainEntityOfPage: pageUrl, isPartOf: { '@id': `${blogUrl}#blog` },
          ...(blogPost.image ? { image: getFullUrl(blogPost.image.src) } : {}),
        }] : []),
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: getFullUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Blogs', item: blogUrl },
            ...(blogPost ? [{ '@type': 'ListItem', position: 3, name: blogPost.title, item: pageUrl }] : []),
          ],
        },
      ],
    };
  }
  if (normalizedPath === '/') {
    return {
      '@context': 'https://schema.org',
      '@graph': [{
        '@type': 'Hospital',
        '@id': `${HOMEPAGE_URL}#hospital`,
        name: HOSPITAL_NAME,
        ...(HOMEPAGE_URL ? {
          url: HOMEPAGE_URL,
          image: new URL(HOMEPAGE_SEO.imagePath, HOMEPAGE_URL).href,
          logo: new URL('/media/hospital-logo.png', HOMEPAGE_URL).href,
        } : {}),
        address: { '@type': 'PostalAddress', ...HOMEPAGE_ADDRESS },
        telephone: formatInternationalPhone(HOSPITAL_PROFILE.phone),
        // Specialist practice listings support Urology and Anesthesiology.
        // Avoid converting educational topics into claims about hospital facilities.
        medicalSpecialty: ['https://schema.org/Urologic', 'https://schema.org/Anesthesia'],
      }],
    };
  }
  const hospitalId = `${SITE_URL}/#hospital`;
  const physicianId = `${SITE_URL}/#physician`;
  const cleanPhone = formatInternationalPhone(HOSPITAL_PROFILE.phone);

  const sharedAddress = cleanSchemaValue({
    '@type': 'PostalAddress',
    streetAddress: `${HOSPITAL_PROFILE.address.line2}, ${HOSPITAL_PROFILE.address.area}`,
    addressLocality: HOSPITAL_PROFILE.address.city,
    addressRegion: HOSPITAL_PROFILE.address.state,
    postalCode: HOSPITAL_PROFILE.address.pincode,
    addressCountry: 'IN',
  });

  // 1. Hospital Entity
  const hospitalEntity = cleanSchemaValue({
    '@type': 'Hospital',
    '@id': hospitalId,
    name: HOSPITAL_PROFILE.name || HOSPITAL_NAME,
    url: `${SITE_URL}/`,
    telephone: cleanPhone,
    hasMap: HOSPITAL_PROFILE.googleMapsUrl,
    address: sharedAddress,
  });

  // 2. Physician Entity (Urology) linked to Hospital
  const physicianEntity = cleanSchemaValue({
    '@type': 'Physician',
    '@id': physicianId,
    name: DOCTOR_PROFILE.name,
    url: `${SITE_URL}/doctors/dr-md-taquedis-noori`,
    medicalSpecialty: 'Urology',
    image: DOCTOR_PROFILE.profileImage ? `${SITE_URL}${DOCTOR_PROFILE.profileImage}` : undefined,
    sameAs: DR_NOORI_GOOGLE_PROFILE.url,
    telephone: cleanPhone,
    worksFor: {
      '@type': 'Hospital',
      '@id': hospitalId,
      name: HOSPITAL_PROFILE.name,
    },
    hospitalAffiliation: {
      '@type': 'Hospital',
      '@id': hospitalId,
      name: HOSPITAL_PROFILE.name,
    },
    address: sharedAddress,
  });

  // 3. Optional FAQPage on /faqs (built only from non-placeholder FAQ items)
  let faqEntity: any = undefined;
  if (normalizedPath === '/faqs') {
    const validFaqs = PATIENT_FAQS.filter(
      (f) => !containsPlaceholder(f.question) && !containsPlaceholder(f.answer)
    ).map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    }));

    if (validFaqs.length > 0) {
      faqEntity = cleanSchemaValue({
        '@type': 'FAQPage',
        mainEntity: validFaqs,
      });
    }
  }

  // 4. Dedicated MedicalProcedure & FAQPage for individual service pages (/services/:slug)
  let procedureEntity: any = undefined;
  const currentService = normalizedPath.startsWith('/services/')
    ? UROLOGY_SERVICES.find((s) => `/services/${s.slug}` === normalizedPath)
    : undefined;

  if (currentService) {
    procedureEntity = cleanSchemaValue({
      '@type': 'MedicalWebPage', '@id': `${getFullUrl(normalizedPath)}#webpage`,
      url: getFullUrl(normalizedPath), name: currentService.title,
      description: currentService.description,
      ...(currentService.featuredImage ? { image: getFullUrl(currentService.featuredImage.social) } : {}),
      about: { '@type': 'Service', name: currentService.title,
        provider: { '@id': physicianId }, areaServed: { '@type': 'City', name: 'Purnia' } },
    });

    if (currentService.faqs && currentService.faqs.length > 0) {
      faqEntity = cleanSchemaValue({
        '@type': 'FAQPage',
        mainEntity: currentService.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      });
    }
  }

  // 5. BreadcrumbList for every page except home ('/')
  let breadcrumbEntity: any = undefined;
  if (normalizedPath !== '/') {
    if (normalizedPath === '/doctors/dr-md-taquedis-noori') {
      breadcrumbEntity = cleanSchemaValue({
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Our Doctors',
            item: `${SITE_URL}/doctors`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: DOCTOR_NAME,
            item: `${SITE_URL}/doctors/dr-md-taquedis-noori`,
          },
        ],
      });
    } else if (currentService) {
      breadcrumbEntity = cleanSchemaValue({
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Urology Services',
            item: getFullUrl(careDepartmentPath("urology")),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: currentService.title,
            item: getFullUrl(normalizedPath),
          },
        ],
      });
    } else {
      const department = CARE_DEPARTMENTS.find((item) => careDepartmentPath(item.id) === normalizedPath);
      const pageTitle = BREADCRUMB_LABELS[normalizedPath] || department?.label || 'Page';
      breadcrumbEntity = cleanSchemaValue({
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: pageTitle,
            item: getFullUrl(normalizedPath),
          },
        ],
      });
    }
  }

  const graph = [
    physicianEntity,
    hospitalEntity,
    ...(procedureEntity ? [procedureEntity] : []),
    ...(faqEntity ? [faqEntity] : []),
    ...(breadcrumbEntity ? [breadcrumbEntity] : []),
  ].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
