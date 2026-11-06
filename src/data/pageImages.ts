import { SERVICE_IMAGES, type CareImage } from './serviceImages';

/** Approved topic artwork reused for the five department heroes. */
export const DEPARTMENT_HERO_IMAGES: Record<string, CareImage> = {
  urology: SERVICE_IMAGES['srv-1'],
  ent: SERVICE_IMAGES['ent-3'],
  'general-medicine': SERVICE_IMAGES['medicine-5'],
  anesthesiology: SERVICE_IMAGES['anaesthesia-1'],
  neurology: SERVICE_IMAGES['neurology-2'],
};

const careSpaceImage = (name: string, alt: string): CareImage => ({
  src: `/media/care-spaces/${name}.webp`,
  srcSet: `/media/care-spaces/${name}-480.webp 480w, /media/care-spaces/${name}-800.webp 800w, /media/care-spaces/${name}.webp 1200w`,
  width: 1200,
  height: 800,
  alt,
});

/** Concept illustrations, not photographs of the hospital's facilities or team. */
export const DOCTORS_HERO_IMAGE = careSpaceImage('doctors-consultation',
  '3D illustration of a patient discussing care with a team of medical professionals');

/** Responsive delivery of the hospital-supplied portrait; the original is preserved. */
export const DOCTOR_PORTRAIT_IMAGE: CareImage = {
  src: '/media/care-spaces/dr-noori-800.webp',
  srcSet: '/media/care-spaces/dr-noori-240.webp 240w, /media/care-spaces/dr-noori-480.webp 480w, /media/care-spaces/dr-noori-800.webp 800w',
  width: 800, height: 1000, alt: 'Dr. Md Taquedis Noori, Consultant Urologist',
};

export const FACILITY_IMAGES: Record<string, CareImage> = {
  emergency: SERVICE_IMAGES['anaesthesia-5'],
  icu: careSpaceImage('icu', '3D concept illustration of an ICU bed with a ventilator and bedside monitoring equipment'),
  hdu: careSpaceImage('hdu', '3D concept illustration of a monitored hospital bed and bedside vital signs screen'),
  'private-rooms': careSpaceImage('private-room', '3D concept illustration of a private hospital room with a bed and family seating'),
};
