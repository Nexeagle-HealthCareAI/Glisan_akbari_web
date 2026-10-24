import { HOSPITAL_NAME, SITE_URL } from './identity';

// Leave homepage URLs absent until the existing central SITE_URL is a real domain.
// Never publish example-domain.com as the hospital's canonical identity.
const configuredUrl = new URL(SITE_URL);
export const HOMEPAGE_URL = configuredUrl.hostname === 'example-domain.com'
  ? ''
  : `${configuredUrl.origin}/`;

export const HOMEPAGE_SEO = {
  title: 'Multispeciality Hospital in Purnea | Glisan Akbari',
  description: 'Glisan Akbari is a Multispeciality Hospital in Purnea, Bihar. Explore doctors, urology care and appointments on Dharamshala Road, Line Bazar.',
  imagePath: '/glisan-akbari-hospital-purnea.png',
  imageAlt: 'Glisan Akbari Super Speciality Hospital logo and care introduction card',
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
