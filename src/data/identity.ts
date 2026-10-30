/**
 * Official hospital name is not yet confirmed by the client. Change it here only.
 */
export const HOSPITAL_NAME = 'Glisan Akbari Super Speciality Hospital';
export const DOCTOR_NAME = 'Dr. Md Taquedis Noori';
export const HOSPITAL_CITY = 'Purnia';
export const HOSPITAL_SHORT_ADDRESS = 'Line Bazar, Purnia';
const configuredUrl = import.meta.env?.VITE_SITE_URL
  || (typeof process !== 'undefined' ? process.env.VITE_SITE_URL : undefined);
export const SITE_URL = configuredUrl ? new URL(configuredUrl).origin : 'https://example-domain.com';
if (configuredUrl && (new URL(configuredUrl).protocol !== 'https:' || configuredUrl.replace(/\/$/, '') !== SITE_URL)) {
  throw new Error('VITE_SITE_URL must be the confirmed HTTPS origin, without a path, query or fragment.');
}
const indexingFlag = import.meta.env?.VITE_ALLOW_INDEXING
  || (typeof process !== 'undefined' ? process.env.VITE_ALLOW_INDEXING : undefined);
export const ALLOW_INDEXING = indexingFlag === 'true';

