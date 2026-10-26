import { HOSPITAL_NAME, SITE_URL } from './identity';

// Leave homepage URLs absent until the existing central SITE_URL is a real domain.
// Never publish example-domain.com as the hospital's canonical identity.
const configuredUrl = new URL(SITE_URL);
export const HOMEPAGE_URL = configuredUrl.hostname === 'example-domain.com'
  ? ''
  : `${configuredUrl.origin}/`;

export const HOMEPAGE_SEO = {
  title: 'Super Speciality Hospital in Purnea | Glisan Akbari',
  description: 'Glisan Akbari Super Speciality Hospital in Purnea offers multispeciality care. Find doctors and book a consultation at our hospital in Line Bazar Purnea.',
  imagePath: '/super-speciality-hospital-in-purnea.png',
  imageAlt: 'Glisan Akbari Super Speciality Hospital in Purnea — hospital logo and care introduction',
  siteName: HOSPITAL_NAME,
};

// Address supported by the hospital's Doctor Dekho practice listings (23 Oct 2026).
// Ashiyana Colony in the shared draft configuration could not be corroborated.
export const HOMEPAGE_ADDRESS = {
  streetAddress: 'Dharamshala Road, Line Bazar',
  addressLocality: 'Purnea',
  addressRegion: 'Bihar',
  postalCode: '854301',
  addressCountry: 'IN',
};
export const HOMEPAGE_LOCATION = 'Dharamshala Road, Line Bazar, Purnea, Bihar 854301';
