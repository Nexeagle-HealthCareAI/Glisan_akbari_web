import { HOSPITAL_NAME } from './identity';

export const HOSPITAL_LOGO_ALT = `${HOSPITAL_NAME} logo`;
export const MIMO_IMAGE_ALT = 'Mimo, an orange illustrated hospital guide wearing a white coat and stethoscope';
export const SHARED_SOCIAL_IMAGE_ALT = `${HOSPITAL_NAME} logo with the message “Less worry. More clarity.”`;

// Describe the actual simplified artwork, rather than promising clinical results.
export const CARE_ARTWORK_DESCRIPTIONS: Record<string, string> = {
  'srv-1': 'Kidney illustration with a highlighted stone and a treatment instrument',
  'srv-2': 'Simplified prostate and urinary passage highlighted for prostate enlargement care',
  'srv-3': 'Bladder illustration with symbols representing urinary infection',
  'srv-4': 'Sperm cell illustration representing male fertility assessment',
  'srv-5': 'Surgical instruments around a small operating area, representing keyhole urological surgery',
  'srv-6': 'Bladder illustration with a urine drop, representing leakage and bladder control concerns',
  'srv-7': 'Heart and pulse-line symbols representing sexual health care',
  'srv-8': 'Kidney illustration with arrows representing transplant-related care and follow-up',
  'srv-9': 'Two blood vessel paths with a highlighted connection, representing AV fistula access',
  'srv-10': 'Prostate illustration with a check symbol representing assessment and care planning',
  'srv-11': 'Kidney illustration with a magnifying glass representing assessment of a kidney concern',
  'srv-12': 'Bladder illustration with a check symbol representing bladder cancer assessment and care',
  'srv-13': 'Child illustration representing paediatric urinary care',
};

export const DEPARTMENT_ARTWORK_DESCRIPTIONS: Record<string, string> = {
  urology: 'Simplified kidneys, ureters and bladder representing the urinary system',
  ent: 'Ear outline with sound waves representing ear, nose and throat care',
  'general-medicine': 'Stethoscope, medical cross and pulse line representing general medicine',
  anesthesiology: 'Anaesthesia mask and breathing symbols representing anaesthesia care',
  neurology: 'Brain outline with highlighted connections representing brain and nerve health',
};
