import { HOSPITAL_NAME, DOCTOR_NAME, HOSPITAL_CITY, HOSPITAL_SHORT_ADDRESS, SITE_URL } from './identity';

/**
 * Centralized Business, Doctor, and Hospital Configuration
 * All information, contact numbers, and placeholders are consolidated here.
 * Any client updates can be made directly in this single file.
 */

export const BOOKING_URL = 'https://doctordekho.nexeagle.com/';
export const DR_NOORI_BOOKING_URL = 'https://doctordekho.nexeagle.com/doctors/dr-md-taquedis-noori-urology-purnea--f7445125-df8b-45d9-9441-fc2a47208caa';
export const DR_AZIZ_AHMED_BOOKING_URL = 'https://doctordekho.nexeagle.com/doctors/dr-aziz-ahmed-anesthesiology-purnea--4069bdb7-8822-4ee1-838f-28c164a4af2b';
export const DR_ASIF_IQBAL_BOOKING_URL = 'https://doctordekho.nexeagle.com/doctors/dr-asif-iqbal-neurology-purnea--9b82c587-060b-4f96-9c19-c6fcb282cd65';
export const DR_ANWAR_KABIR_BOOKING_URL = 'https://doctordekho.nexeagle.com/doctors/dr-anwar-kabir-ent-purnea--2c9b0613-120d-4edd-883c-d8f56dd51e48';


// Google profile details from the client-supplied screenshot captured 19 October 2026.
// This is a dated snapshot, not a live review feed. The place ID was checked against Google Maps.
export const DR_NOORI_GOOGLE_PROFILE = {
  name: 'Dr. Md Taquedis Noori, MCh Urologist',
  rating: 4.8,
  reviewCount: 343,
  capturedOn: '19 Oct 2026',
  placeId: 'ChIJj_f8bKv57zkRejFzO1fZXL0',
  url: 'https://www.google.com/maps/search/?api=1&query=Dr.%20Md%20Taquedis%20Noori%2C%20MCh%20Urologist%2C%20Purnia&query_place_id=ChIJj_f8bKv57zkRejFzO1fZXL0',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Glisan%20Akbari%20Super%20Speciality%20Hospital%2C%20Purnia&destination_place_id=ChIJj_f8bKv57zkRejFzO1fZXL0',
  embedUrl: 'https://www.google.com/maps?cid=13645019939708547450&z=17&output=embed',
};

// Client reports the doctor confirmed on 21 October 2026 that this is the
// hospital's business listing, registered under his name. Retain the dated
// screenshot figures above rather than implying a live review feed.
export const HOSPITAL_GOOGLE_PROFILE = DR_NOORI_GOOGLE_PROFILE;

export const HOSPITAL_ADDRESS = {
  line1: HOSPITAL_NAME,
  line2: 'Dharamshala Road, Ashiyana Colony',
  area: 'Line Bazar',
  city: 'Purnia',
  state: 'Bihar',
  pincode: '854301',
  stateAndPin: 'Bihar 854301',
  fullFormatted: `${HOSPITAL_NAME}, Dharamshala Road, Ashiyana Colony, Line Bazar, Purnia, Bihar 854301`,
};

export interface DoctorProfile {
  name: string;
  professionalTitle: string;
  primaryProfessionalIdentity: string;
  qualifications: string;
  medicalRegistration: string;
  yearsOfExperience: string;
  memberships: string;
  currentHospital: string;
  hospitalRelationship: string;
  languages: string;
  biography: string;
  specialtyLabel: string;
  heroValueProp: string;
  doctorIntroduction: string;
  profileImagePlaceholder: string;
  profileImage?: string;
  logoPlaceholder: string;
  bookingUrl?: string;
  rating?: number;
  reviewCount?: number;
  isVerified?: boolean;
  focusAreas?: string[];
  practicesAtAddress?: string;
}

export interface HospitalProfile {
  name: string;
  address: {
    line1: string;
    line2: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    stateAndPin: string;
    fullFormatted: string;
  };
  phone: string;
  officialAppointmentPhone: string;
  whatsappNumber: string;
  email: string;
  website: string;
  googleBusinessProfileUrl: string;
  googleMapsUrl: string;
  consultationTimings: string;
  emergencyInfo: string;
  hospitalExteriorPlaceholder: string;
  hospitalInteriorPlaceholder: string;
  hospitalLogoPlaceholder: string;
  approvedHospitalImagesPlaceholder: string;
  description: string;
  facilities: string[];
  departments: string[];
  patientServices: string[];
}

export interface TrustStripData {
  googleRating: string;
  googleRatingPlaceholder: string;
  googleReviewCount: string;
  googleReviewCountPlaceholder: string;
  verifiedCredential: string;
  verifiedExperience: string;
  verifiedMembership: string;
}

export interface PatientConditionItem {
  id: string;
  name: string;
  description: string;
  commonSymptoms: string[];
  whyConsult: string;
  evaluationNote: string;
  treatmentsOverview: string;
  urgencyWarning?: string;
  slug: string;
}

export interface ServiceProcedureItem {
  name: string;
  description: string;
}

export interface ServiceFAQItem {
  question: string;
  answer: string;
}

export interface UrologyServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  patientNotes: string;
  slug: string;
  tagline: string;
  overview: string[];
  symptoms: string[];
  procedures: ServiceProcedureItem[];
  benefits: string[];
  preparation: string[];
  faqs: ServiceFAQItem[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface WhyChooseReason {
  id: string;
  title: string;
  detail: string;
}

export interface TestimonialItem {
  id: string;
  placeholderText: string;
  verifiedPatientBadge: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'appointment' | 'consultation' | 'hospital' | 'medical';
}

export const DOCTOR_PROFILE: DoctorProfile = {
  name: DOCTOR_NAME,
  professionalTitle: 'Consultant Urologist & Kidney Transplant Surgeon',
  primaryProfessionalIdentity: 'Consultant Urologist & Kidney Transplant Surgeon',
  qualifications: 'MBBS, MS(Gen. Surgery), MCh Urology',
  medicalRegistration: 'Verified Profile',
  yearsOfExperience: '9 years experience',
  memberships: 'Andrologist, Consultant Urologist, Laparoscopic & Kidney Transplant Surgeon',
  currentHospital: HOSPITAL_NAME,
  hospitalRelationship: 'Consultant Urologist & Kidney Transplant Surgeon',
  languages: 'English, Bengali, Urdu, Hindi',
  biography:
    'With nearly a decade of specialized experience, Dr. Md Taquedis Noori (MBBS, MS, MCh) is a dedicated Urologist and Kidney Transplant Surgeon. Whether providing care as an Andrologist, performing advanced laparoscopic procedures, or treating urological cancers, Dr. Noori brings top-tier surgical expertise to his patients.',
  specialtyLabel: 'Urology, Andrology & Kidney Transplant Surgery',
  heroValueProp:
    'Dedicated Urologist and Kidney Transplant Surgeon with 9 years of specialized experience in Line Bazar, Purnia.',
  doctorIntroduction:
    'With nearly a decade of specialized experience, Dr. Md Taquedis Noori (MBBS, MS, MCh) is a dedicated Urologist and Kidney Transplant Surgeon. Whether providing care as an Andrologist, performing advanced laparoscopic procedures, or treating urological cancers, Dr. Noori brings top-tier surgical expertise to his patients.',
  profileImagePlaceholder: 'Dr. Md Taquedis Noori (MBBS, MS, MCh)',
  profileImage: '/media/dr-md-taquedis-noori.png',
  logoPlaceholder: 'Glisan Akbari Super Speciality Hospital',
  bookingUrl: DR_NOORI_BOOKING_URL,
  rating: DR_NOORI_GOOGLE_PROFILE.rating,
  reviewCount: DR_NOORI_GOOGLE_PROFILE.reviewCount,
  isVerified: true,
  focusAreas: [
    'Andrologist',
    'Consultant Urologist',
    'Laproscopic and kidney Transplant Surgeon',
  ],
  practicesAtAddress: HOSPITAL_ADDRESS.fullFormatted,
};

export const HOSPITAL_PROFILE: HospitalProfile = {
  name: HOSPITAL_NAME,
  address: HOSPITAL_ADDRESS,
  phone: '079037 81377',
  officialAppointmentPhone: '079037 81377',
  whatsappNumber: '[PLACEHOLDER: INSERT WHATSAPP NUMBER]',
  email: '[PLACEHOLDER: INSERT OFFICIAL EMAIL]',
  website: '[PLACEHOLDER: INSERT OFFICIAL HOSPITAL WEBSITE]',
  googleBusinessProfileUrl: HOSPITAL_GOOGLE_PROFILE.url,
  googleMapsUrl: DR_NOORI_GOOGLE_PROFILE.directionsUrl,
  consultationTimings: 'Mon - Sat: Prior Appointment via DoctorDekho',
  emergencyInfo: '[PLACEHOLDER: INSERT EMERGENCY INFORMATION IF APPLICABLE]',
  hospitalExteriorPlaceholder: '[PLACEHOLDER: INSERT HOSPITAL EXTERIOR]',
  hospitalInteriorPlaceholder: '[PLACEHOLDER: INSERT HOSPITAL INTERIOR]',
  hospitalLogoPlaceholder: '[PLACEHOLDER: INSERT LOGO]',
  approvedHospitalImagesPlaceholder: '[PLACEHOLDER: INSERT APPROVED HOSPITAL IMAGES]',
  description: 'Glisan Akbari Super Speciality Hospital provides advanced urological, nephrological, and surgical medical care located on Dharamshala Road, Ashiyana Colony, Line Bazar, Purnia.',
  facilities: [
    'Advanced Endourology & Laser Surgery Suite',
    'Laparoscopic & Keyhole Surgery Unit',
    'In-House Diagnostic Ultrasound & Uroflowmetry',
    '24x7 Emergency Care & Inpatient Facilities',
  ],
  departments: [
    'Urology & Andrology',
    'Kidney Stone & Laser Center',
    'Kidney Transplantation Surveillance',
    'Dialysis Access & Vascular Surgery',
  ],
  patientServices: [
    'Outpatient Urology Consultations',
    'Laser Stone Procedures (PCNL, RIRS, URSL)',
    'TURP & Laser Prostate Surgery',
    'AV Fistula Creation for Hemodialysis',
  ],
};

export interface DoctorListItem {
  id: string;
  slug?: string;
  name: string;
  label?: string;
  specialty: string;
  department: string;
  qualifications: string;
  medicalRegistration: string;
  yearsOfExperience: string;
  profileImagePlaceholder: string;
  profileImage?: string;
  consultationTimings: string;
  languages: string;
  isClickable: boolean;
  bookingUrl?: string;
  rating?: number;
  reviewCount?: number;
  isVerified?: boolean;
  focusAreas?: string[];
  practicesAtAddress?: string;
  initials?: string;
  avatarGradient?: string;
}

export const DOCTORS: DoctorListItem[] = [
  {
    id: 'doc-1',
    slug: 'dr-md-taquedis-noori',
    name: DOCTOR_NAME,
    label: `Google rating · ${DR_NOORI_GOOGLE_PROFILE.rating} ★`,
    specialty: 'Urology',
    department: 'Urology',
    qualifications: 'MBBS, MS(Gen. Surgery), MCh Urology',
    medicalRegistration: 'Verified Profile',
    yearsOfExperience: '9 years experience',
    profileImagePlaceholder: 'Dr. Md Taquedis Noori, MBBS, MS, MCh',
    profileImage: DOCTOR_PROFILE.profileImage,
    consultationTimings: 'Mon - Sat: Prior Appointment via DoctorDekho',
    languages: 'English, Bengali, Urdu, Hindi',
    isClickable: true,
    bookingUrl: DR_NOORI_BOOKING_URL,
    rating: DR_NOORI_GOOGLE_PROFILE.rating,
    reviewCount: DR_NOORI_GOOGLE_PROFILE.reviewCount,
    isVerified: true,
    focusAreas: [
      'Andrologist',
      'Consultant Urologist',
      'Laproscopic and kidney Transplant Surgeon',
    ],
    practicesAtAddress: HOSPITAL_ADDRESS.fullFormatted,
    initials: 'MT',
    avatarGradient: 'from-amber-500 to-orange-500',
  },
  {
    id: 'doc-2',
    name: 'Dr Aziz Ahmed',
    label: 'Verified Doctor · 10 Yrs Exp',
    specialty: 'Anesthesiology',
    department: 'Anesthesiology',
    qualifications: 'MBBS, MD',
    medicalRegistration: 'Verified Profile',
    yearsOfExperience: '10 years experience',
    profileImagePlaceholder: 'Dr Aziz Ahmed, MBBS, MD',
    consultationTimings: 'Mon - Sat: On Call & Pre-Operative Assessment',
    languages: 'English, Hindi, Urdu',
    isClickable: false,
    bookingUrl: DR_AZIZ_AHMED_BOOKING_URL,
    isVerified: true,
    focusAreas: [
      'Intensive Critical Care',
    ],
    practicesAtAddress: HOSPITAL_ADDRESS.fullFormatted,
    initials: 'AA',
    avatarGradient: 'from-sky-500 to-blue-500',
  },
  {
    id: 'doc-3',
    name: 'Dr Asif Iqbal',
    label: 'Verified Doctor · 10 Yrs Exp',
    specialty: 'Neurology',
    department: 'Neurology',
    qualifications: 'MBBS, MS(Gen. Surgeon), MCh',
    medicalRegistration: 'Verified Profile',
    yearsOfExperience: '10 years experience',
    profileImagePlaceholder: 'Dr Asif Iqbal, MBBS, MS, MCh (Neurology)',
    consultationTimings: 'Mon - Sat: On Call & Prior Appointment via DoctorDekho',
    languages: 'English, Hindi, Urdu',
    isClickable: false,
    bookingUrl: DR_ASIF_IQBAL_BOOKING_URL,
    isVerified: true,
    focusAreas: [
      'Consultant Neurosurgeon',
    ],
    practicesAtAddress: HOSPITAL_ADDRESS.fullFormatted,
    initials: 'AI',
    avatarGradient: 'from-purple-500 to-indigo-600',
  },
  {
    id: 'doc-4',
    name: 'Dr Anwar Kabir',
    label: 'Verified Doctor · 10 Yrs Exp',
    specialty: 'ENT',
    department: 'ENT',
    qualifications: 'MBBS, MS ENT',
    medicalRegistration: 'Verified Profile',
    yearsOfExperience: '10 years experience',
    profileImagePlaceholder: 'Dr Anwar Kabir, MBBS, MS ENT',
    consultationTimings: 'Mon - Sat: On Call & Prior Appointment via DoctorDekho',
    languages: 'English, Hindi, Urdu',
    isClickable: false,
    bookingUrl: DR_ANWAR_KABIR_BOOKING_URL,
    isVerified: true,
    focusAreas: [
      'Ear, Nose & Throat (ENT)',
    ],
    practicesAtAddress: HOSPITAL_ADDRESS.fullFormatted,
    initials: 'AK',
    avatarGradient: 'from-teal-500 to-emerald-500',
  },
];

export const TRUST_STRIP_DATA: TrustStripData = {
  googleRating: String(DR_NOORI_GOOGLE_PROFILE.rating),
  googleRatingPlaceholder: `${DR_NOORI_GOOGLE_PROFILE.rating} ★ Dr. Noori’s Google profile · ${DR_NOORI_GOOGLE_PROFILE.capturedOn}`,
  googleReviewCount: `${DR_NOORI_GOOGLE_PROFILE.reviewCount} Google reviews`,
  googleReviewCountPlaceholder: `Google profile snapshot · ${DR_NOORI_GOOGLE_PROFILE.capturedOn}`,
  verifiedCredential: 'MBBS, MS(Gen. Surgery), MCh Urology',
  verifiedExperience: '9 years experience',
  verifiedMembership: 'Urologist & Kidney Transplant Surgeon',
};

export const TARGET_AREAS = {
  primary: `${HOSPITAL_CITY}, Bihar`,
  secondaryPlaceholder: '[PLACEHOLDER: INSERT SECONDARY SERVICE AREAS]',
  searchIntentKeywords: [
    `urologist in ${HOSPITAL_CITY}`,
    `urology doctor in ${HOSPITAL_CITY}`,
    `kidney stone treatment in ${HOSPITAL_CITY}`,
    '[PLACEHOLDER: INSERT VERIFIED KEYWORDS]',
  ],
};

export const PATIENT_CONDITIONS: PatientConditionItem[] = [
  {
    id: 'cond-1',
    name: '[PLACEHOLDER: CONDITION 1]',
    description: 'Patient-friendly overview of condition 1. Consult a qualified urologist for proper evaluation and clinical assessment.',
    commonSymptoms: [
      'Discomfort or pain requiring professional medical evaluation',
      'Changes in urinary frequency or discomfort',
      'Symptoms requiring clinical consultation',
    ],
    whyConsult: 'Prompt consultation helps in early diagnosis and determining the appropriate medical course of action.',
    evaluationNote: 'Consult a qualified urologist for proper evaluation. Diagnosis is never provided through website marketing copy.',
    treatmentsOverview: 'Evaluated individually following clinical examination and diagnostic review.',
    urgencyWarning: 'Seek urgent hospital medical attention if experiencing high fever, acute severe pain, or inability to urinate.',
    slug: 'condition-1',
  },
  {
    id: 'cond-2',
    name: '[PLACEHOLDER: CONDITION 2]',
    description: `Patient-friendly overview of condition 2. Dedicated diagnostic and clinical consultation available at ${HOSPITAL_NAME}.`,
    commonSymptoms: [
      'Specific symptoms to be reviewed with the attending physician',
      'Persistent discomfort affecting daily routine',
    ],
    whyConsult: 'Early clinical assessment provides clarity and personalized treatment planning.',
    evaluationNote: 'Consult a qualified urologist for proper evaluation.',
    treatmentsOverview: 'Medical and procedural options explained in detail during hospital consultation.',
    slug: 'condition-2',
  },
  {
    id: 'cond-3',
    name: '[PLACEHOLDER: CONDITION 3]',
    description: `Patient-friendly overview of condition 3. Comprehensive urological checkup and consultation for patients in ${HOSPITAL_CITY} and surrounding regions.`,
    commonSymptoms: [
      'Symptoms as verified and documented by the clinic',
      'Signs warranting professional urological checkup',
    ],
    whyConsult: 'Expert guidance ensures appropriate diagnostic tests without unnecessary delay.',
    evaluationNote: 'Consult a qualified urologist for proper evaluation.',
    treatmentsOverview: 'Determined based on verified medical investigations and patient health history.',
    slug: 'condition-3',
  },
  {
    id: 'cond-4',
    name: '[PLACEHOLDER: CONDITION 4]',
    description: 'Patient-friendly overview of condition 4. Personalized care plan structured around patient safety and clinical guidelines.',
    commonSymptoms: [
      'Documented clinical symptoms verified by doctor',
      'Recurrent discomfort needing clinical examination',
    ],
    whyConsult: 'Timely medical review prevents complications and eases patient concern.',
    evaluationNote: 'Consult a qualified urologist for proper evaluation.',
    treatmentsOverview: 'Care tailored to diagnostic test results and clinical findings.',
    slug: 'condition-4',
  },
  {
    id: 'cond-5',
    name: '[PLACEHOLDER: CONDITION 5]',
    description: 'Patient-friendly overview of condition 5. Confidential and professional urological care provided at the hospital.',
    commonSymptoms: [
      'Discomfort during routine activities',
      'Symptoms to be reviewed during confidential consultation',
    ],
    whyConsult: 'Professional consultation offers reassurance and clear treatment steps.',
    evaluationNote: 'Consult a qualified urologist for proper evaluation.',
    treatmentsOverview: 'Options discussed transparently during patient visit.',
    slug: 'condition-5',
  },
  {
    id: 'cond-6',
    name: '[PLACEHOLDER: CONDITION 6]',
    description: `Patient-friendly overview of condition 6. Structured care pathway for patients seeking specialist advice in ${HOSPITAL_CITY}, Bihar.`,
    commonSymptoms: [
      'Specific clinical symptoms documented upon client confirmation',
      'Symptoms requiring diagnostic imaging or laboratory tests',
    ],
    whyConsult: 'Accurate clinical workup is key to effective management.',
    evaluationNote: 'Consult a qualified urologist for proper evaluation.',
    treatmentsOverview: 'Based strictly on verified evidence and clinical recommendations.',
    slug: 'condition-6',
  },
];

export const UROLOGY_SERVICES: UrologyServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Kidney Stone Laser Surgery (PCNL, URSL, RIRS)',
    category: 'Endourology & Laser Surgery',
    description: 'Minimally invasive laser treatments (PCNL, URSL, and flexible RIRS) for single, multiple, and complex staghorn kidney or ureteric stones without large incisions.',
    patientNotes: 'Fast recovery, minimal discomfort, and same-day or 24-hour discharge protocols for most endoscopic laser stone procedures.',
    slug: 'kidney-stone-laser-surgery-pcnl-ursl-rirs',
    tagline: 'Precision Holmium Laser Stone Vaporization with High Clearance Rates in Purnia',
    overview: [
      'Kidney and ureteric stones are common urological conditions causing intense colic pain, urinary obstruction, and potential renal impairment if left untreated.',
      'Dr. Md Taquedis Noori utilizes advanced endourological technologies—including flexible ureteroscopy (RIRS), miniature nephrolithotomy (Mini-PCNL), and semi-rigid ureteroscopy (URSL)—to fragment and clear stones of all sizes with pinpoint laser energy.',
      'Procedures are performed through natural urinary passages or miniature keyholes, eliminating large painful incisions, reducing hospital stays, and speeding your return to normal activities.'
    ],
    symptoms: [
      'Severe, sharp cramping pain in the flank, back, or lower abdomen radiating to the groin',
      'Blood in urine (hematuria) appearing pink, red, or tea-colored',
      'Painful, burning sensation during urination (dysuria)',
      'Sudden persistent urge to urinate or frequent voiding in small quantities',
      'Nausea, vomiting, and high fever with chills in cases of infected stone obstruction'
    ],
    procedures: [
      {
        name: 'RIRS (Retrograde Intrarenal Surgery)',
        description: 'An ultra-thin flexible ureteroscope navigated through the urethra and bladder into the kidney to dust stones in any calyx using Holmium laser fibers, requiring zero external incisions.'
      },
      {
        name: 'PCNL (Percutaneous Nephrolithotomy / Mini-PCNL)',
        description: 'Keyhole surgical access through a tiny puncture in the flank to break and evacuate large (>2 cm) or staghorn stones with high clearance efficiency.'
      },
      {
        name: 'URSL (Ureteroscopic Lithotripsy)',
        description: 'Endoscopic visualization and pneumatic or laser fragmentation of stones impacted in the middle and lower ureter.'
      },
      {
        name: 'DJ Stenting & Cystoscopic Removal',
        description: 'Placement of a soft temporary internal stent to preserve urine flow, prevent colic, and facilitate safe post-operative renal healing.'
      }
    ],
    benefits: [
      'No major surgical cuts or disfiguring scars',
      'Significantly reduced post-operative pain and blood loss',
      'Short hospital stay (often 24 to 48 hours)',
      'Rapid return to routine work and daily routine',
      'Comprehensive metabolic stone analysis and recurrence prevention advice'
    ],
    preparation: [
      'Bring recent Ultrasound KUB, NCCT KUB scan films, and serum creatinine reports',
      'Provide current urine routine and culture-sensitivity test results',
      'Inform the doctor of any blood thinners (aspirin, clopidogrel) or cardiac medications',
      'Follow the fasting instructions provided during pre-anesthetic checkup'
    ],
    faqs: [
      {
        question: 'Is laser kidney stone surgery painful?',
        answer: 'The procedure is performed under spinal or general anesthesia, so you feel absolutely no pain during surgery. Mild temporary discomfort or stent-related urgency afterward is well-managed with prescription medications.'
      },
      {
        question: 'How long will I need to stay in the hospital?',
        answer: 'Most patients undergoing URSL or RIRS are discharged within 24 hours. Mini-PCNL patients typically stay 1 to 2 days for post-operative observation.'
      },
      {
        question: 'Can kidney stones return after laser removal?',
        answer: 'Yes, stones can recur if metabolic causes and hydration habits are not addressed. Dr. Noori provides individualized dietary counseling and stone analysis to minimize recurrence risk.'
      }
    ],
    seoTitle: 'Kidney Stone Laser Surgery (PCNL, URSL, RIRS) in Purnia | Dr. Md Taquedis Noori',
    seoDescription: 'Minimally invasive kidney stone laser surgery (PCNL, RIRS, URSL) by Dr. Md Taquedis Noori at Glisan Akbari Hospital, Line Bazar, Purnia. Fast recovery and high stone clearance.'
  },
  {
    id: 'srv-2',
    title: 'Prostate Enlargement & BPH Treatment',
    category: 'Prostate Health & Endourology',
    description: 'Advanced medical therapy and endoscopic interventions including Bipolar TURP and laser enucleation for Benign Prostatic Hyperplasia (BPH) to restore free urinary flow.',
    patientNotes: 'Timely treatment prevents chronic urinary retention, permanent bladder wall damage, and secondary kidney strain.',
    slug: 'prostate-enlargement-bph-treatment',
    tagline: 'Modern Prostate Care Restoring Natural Urinary Flow & Nighttime Rest',
    overview: [
      'Benign Prostatic Hyperplasia (BPH) is a common non-cancerous enlargement of the prostate gland in men over 50, causing progressive compression of the urethra.',
      'Symptoms often start with hesitant urination and frequent nighttime awakenings, progressing to urinary tract infections or complete inability to pass urine if ignored.',
      'Dr. Md Taquedis Noori provides comprehensive evaluation through digital rectal examination, uroflowmetry, and serum PSA, offering medical protocols or minimally invasive endoscopic surgeries like Bipolar TURP tailored to gland volume.'
    ],
    symptoms: [
      'Frequent urge to urinate, especially waking up multiple times at night (nocturia)',
      'Weak, slow, or interrupted urinary stream',
      'Difficulty or straining when beginning to pass urine',
      'Sensation of incomplete bladder emptying after voiding',
      'Sudden acute urinary retention requiring emergency catheterization'
    ],
    procedures: [
      {
        name: 'Bipolar TURP (Transurethral Resection of Prostate)',
        description: 'Endoscopic resection performed in saline medium to shave obstructing prostate tissue, minimizing bleeding risks and TUR syndrome.'
      },
      {
        name: 'Laser Prostate Enucleation / Vaporization',
        description: 'High-precision laser technology for larger prostates or high-risk patients on antiplatelet therapy.'
      },
      {
        name: 'Uroflowmetry & Bladder Scan',
        description: 'Non-invasive computerized flow rate measurement and ultrasound assessment of post-void residual volume.'
      },
      {
        name: 'Targeted Pharmacotherapy Protocol',
        description: 'Evidence-based alpha-blockers and 5-alpha reductase inhibitors tailored to alleviate urinary resistance and shrink prostate tissue.'
      }
    ],
    benefits: [
      'Immediate and lasting improvement in urinary flow and emptying',
      'Cessation of tiring nighttime urinary frequency',
      'Low blood loss and short catheter duration (typically 24–48 hours)',
      'Prevention of bladder calculi and secondary hydronephrosis'
    ],
    preparation: [
      'Bring recent Serum PSA (Prostate Specific Antigen) laboratory reports',
      'Carry Ultrasound of KUB with post-void residual volume assessment',
      'Disclose any history of diabetes, hypertension, or antiplatelet/blood thinner use'
    ],
    faqs: [
      {
        question: 'Does an enlarged prostate always indicate prostate cancer?',
        answer: 'No. Benign Prostatic Hyperplasia is a benign non-cancerous growth. However, a Serum PSA test and clinical examination are always performed to rule out malignancy.'
      },
      {
        question: 'How long will the urinary catheter stay after TURP?',
        answer: 'In modern bipolar surgery, the urinary catheter is typically removed within 24 to 48 hours once urine clears, allowing you to void naturally before leaving the hospital.'
      }
    ],
    seoTitle: 'Prostate Enlargement & TURP Surgery in Purnia | Dr. Md Taquedis Noori',
    seoDescription: 'Expert BPH and prostate treatment in Line Bazar, Purnia. Bipolar TURP and laser surgery by senior urologist Dr. Md Taquedis Noori at Glisan Akbari Hospital.'
  },
  {
    id: 'srv-3',
    title: 'Urinary Tract Infection (UTI) & Hematuria Care',
    category: 'Clinical Urology & Diagnostics',
    description: 'Comprehensive diagnostic investigation and evidence-based therapeutic care for recurrent urinary infections, painful micturition, and visible or microscopic blood in urine.',
    patientNotes: 'Blood in urine (hematuria) is an important clinical warning sign that requires prompt endoscopic and radiological workup.',
    slug: 'urinary-tract-infection-uti-hematuria-care',
    tagline: 'Targeted Antimicrobial Therapy & Endoscopic Workup for Clear Urinary Health',
    overview: [
      'Recurrent urinary tract infections (UTIs) and blood in the urine (hematuria) can indicate underlying conditions ranging from cystitis and stones to bladder and renal pathologies.',
      'Self-medicating with over-the-counter antibiotics often leads to drug-resistant infections and masks serious underlying lesions.',
      'Dr. Md Taquedis Noori conducts methodical clinical evaluations including urine microbiology, high-resolution ultrasound, and gentle diagnostic cystoscopy to diagnose the exact cause.'
    ],
    symptoms: [
      'Persistent burning sensation or pain during urination',
      'Pink, red, or brownish discoloration in urine (gross hematuria)',
      'Intense, uncontrollable urge to urinate even with an empty bladder',
      'Cloudy, dark, or unusually pungent urine',
      'Pelvic pain in women or rectal/perineal discomfort in men'
    ],
    procedures: [
      {
        name: 'Diagnostic Flexible Cystoscopy',
        description: 'Gentle, minimally invasive visualization of the urethral lumen and bladder lining to detect source of bleeding, stones, or mucosal abnormalities.'
      },
      {
        name: 'Urine Culture & Sensitivity Profiling',
        description: 'Microbiological culture to identify specific bacterial strains and target treatment with sensitive antibiotics, preventing multidrug resistance.'
      },
      {
        name: 'Upper Tract Imaging (Ultrasound & CT Urography)',
        description: 'Detailed evaluation of kidney parenchyma, renal pelvis, and ureters to rule out silent calculi or upper tract lesions.'
      },
      {
        name: 'Recurrent UTI Preventive Protocols',
        description: 'Long-term bladder defense regimens, urinary alkalinizers, and behavioral guidance tailored to female and geriatric patients.'
      }
    ],
    benefits: [
      'Definitive identification of hidden bleeding sources',
      'Resolution of chronic, antibiotic-resistant urinary infections',
      'Prevention of acute pyelonephritis (kidney infection) and renal scarring',
      'Clear, empathetic guidance on daily bladder hygiene and hydration'
    ],
    preparation: [
      'Do not start random antibiotics right before urine collection unless advised',
      'Bring recent urine routine, microscopy, and culture sensitivity reports',
      'Drink adequate water before attending the clinic for physical examination'
    ],
    faqs: [
      {
        question: 'Why should I never ignore blood in my urine if there is no pain?',
        answer: 'Painless hematuria is actually more concerning because it can indicate early bladder or kidney lesions that do not cause pain initially. Early investigation leads to prompt, curative treatment.'
      },
      {
        question: 'Why do my urinary tract infections keep recurring?',
        answer: 'Recurrent UTIs can stem from incomplete bladder emptying, anatomical variations, kidney stones harboring bacteria, or resistant microbes. A formal urological workup identifies and resolves the root cause.'
      }
    ],
    seoTitle: 'UTI & Hematuria (Blood in Urine) Treatment in Purnia | Dr. Md Taquedis Noori',
    seoDescription: 'Accurate diagnosis and targeted care for recurrent UTIs and blood in urine in Purnia, Bihar by Dr. Md Taquedis Noori at Glisan Akbari Super Speciality Hospital.'
  },
  {
    id: 'srv-4',
    title: 'Male Infertility & Varicocele Repair',
    category: 'Andrology & Men\'s Health',
    description: 'Specialized reproductive urology evaluation including microscopic subinguinal varicocelectomy, hormonal profiling, and semen parameter optimization for male factor infertility.',
    patientNotes: 'Microscopic surgical repair preserves testicular arterial supply and lymphatic drainage, drastically lowering recurrence and hydrocele risks.',
    slug: 'male-infertility-varicocele-repair',
    tagline: 'Precision Microsurgical Varicocelectomy & Advanced Reproductive Andrology',
    overview: [
      'Male factor infertility contributes to nearly 50% of couples facing difficulty conceiving, with varicoceles (abnormally dilated scrotal veins) being the most treatable surgical cause.',
      'Elevated scrotal temperatures caused by stagnant venous pooling impair sperm count, motility, and DNA integrity.',
      'Dr. Md Taquedis Noori offers comprehensive andrological evaluation, advanced semen analysis interpretation, and the gold standard microscopic subinguinal varicocelectomy to optimize reproductive potential.'
    ],
    symptoms: [
      'Inability to achieve pregnancy after 12 months of regular unprotected intercourse',
      'Dull, aching heaviness or pain in the scrotum, especially after prolonged standing or exertion',
      'Visible or palpable enlarged veins resembling a bag of worms above the testis',
      'Noticeable difference in size or volume between the testicles (testicular hypotrophy)',
      'Abnormal semen analysis parameters (low sperm count, poor motility, abnormal morphology)'
    ],
    procedures: [
      {
        name: 'Microscopic Subinguinal Varicocelectomy',
        description: 'Gold-standard microsurgical ligation of dilated spermatoceles and veins under surgical operating microscope, protecting testicular arteries and lymphatics.'
      },
      {
        name: 'Standardized Semen Analysis & Hormonal Profiling',
        description: 'Comprehensive analysis following WHO criteria, coupled with serum testosterone, LH, FSH, and prolactin evaluation.'
      },
      {
        name: 'Surgical Sperm Retrieval (TESA / PESA)',
        description: 'Micro-needle aspiration or testicular sperm extraction for azoospermic men in coordination with assisted reproductive technology (ART/ICSI).'
      },
      {
        name: 'Scrotal Ultrasound & Color Doppler',
        description: 'High-frequency duplex imaging measuring venous caliber and retrograde reflux during the Valsalva maneuver.'
      }
    ],
    benefits: [
      'Statistically significant improvement in sperm concentration, motility, and morphology',
      'Extremely low complication rates and near-zero hydrocele incidence with microscopic magnification',
      'Alleviation of chronic scrotal dragging pain and heaviness',
      'Day-care or 24-hour procedure with rapid return to daily work'
    ],
    preparation: [
      'Maintain 3 to 5 days of sexual abstinence prior to attending for semen testing',
      'Bring all prior semen analysis reports and scrotal color Doppler scans',
      'Both partners are encouraged to share previous fertility workup records'
    ],
    faqs: [
      {
        question: 'Does varicocele repair improve sperm count?',
        answer: 'Yes. Clinical studies demonstrate that microscopic varicocelectomy improves semen parameters in 60% to 70% of men, leading to significantly higher natural pregnancy rates.'
      },
      {
        question: 'How quickly can I resume work after varicocelectomy?',
        answer: 'Because the subinguinal approach avoids cutting abdominal muscles, most patients resume light office work within 3 to 4 days, avoiding heavy lifting for 3 weeks.'
      }
    ],
    seoTitle: 'Male Infertility & Varicocele Surgery in Purnia | Dr. Md Taquedis Noori',
    seoDescription: 'Microscopic varicocele repair and male infertility treatment by Dr. Md Taquedis Noori in Purnia, Bihar. Improved semen parameters with advanced microsurgery.'
  },
  {
    id: 'srv-5',
    title: 'Laparoscopic & Robotic Urological Surgery',
    category: 'Advanced Laparoscopic Surgery',
    description: 'Keyhole surgical management of complex renal and pelvic pathologies including pyeloplasty for PUJ obstruction, simple nephrectomy, and cyst deroofing.',
    patientNotes: 'Smaller keyhole incisions reduce surgical trauma, wound infections, and post-operative hospital stay compared to open surgery.',
    slug: 'laparoscopic-robotic-urological-surgery',
    tagline: 'Precision Keyhole Surgery for Kidneys & Ureters with Minimal Scarring',
    overview: [
      'Laparoscopic urological surgery has transformed surgical recovery by replacing large, painful flank incisions with small 5–10 mm keyholes.',
      'High-definition optical magnification allows precise tissue dissection, meticulous suturing, and excellent preservation of vital nerves and blood vessels.',
      'Dr. Md Taquedis Noori routinely performs advanced laparoscopic urological procedures at Glisan Akbari Hospital, providing patients from Purnia and surrounding districts with international standards of surgical care.'
    ],
    symptoms: [
      'Pelvi-ureteric junction (PUJ) obstruction causing severe intermittent loin pain',
      'Large, painful symptomatic renal cysts causing flank discomfort or compression',
      'Severely non-functioning or chronically infected kidney requiring surgical removal',
      'Large impacted upper ureteric stones refractory to endoscopic extraction'
    ],
    procedures: [
      {
        name: 'Laparoscopic Pyeloplasty',
        description: 'Dismembered Anderson-Hynes reconstruction of the narrowed ureteropelvic junction to restore unrestricted urine outflow from the kidney.'
      },
      {
        name: 'Laparoscopic Simple & Radical Nephrectomy',
        description: 'Complete extirpation of damaged or diseased kidneys through small keyhole ports, ensuring minimal blood loss and rapid mobilization.'
      },
      {
        name: 'Laparoscopic Renal Cyst Deroofing',
        description: 'Excision of the protruding cyst wall for large symptomatic renal cysts, relieving pain and preventing recurrence.'
      },
      {
        name: 'Laparoscopic Ureterolithotomy',
        description: 'Direct laparoscopic extraction of large, impacted ureteric stones that cannot be safely managed with ureteroscopy.'
      }
    ],
    benefits: [
      'Minimal post-operative pain and reduced need for strong analgesics',
      'Cosmetically superior tiny puncture scars instead of a 10-inch flank incision',
      'Short hospital stay (usually 2 to 3 days)',
      'Early return to vigorous activity and work'
    ],
    preparation: [
      'Carry contrast-enhanced CT (CECT) Urography or renal dynamic scan (DTPA/EC)',
      'Undergo pre-anesthetic clearance including ECG, chest X-ray, and coagulation profile',
      'Follow prescribed fasting and bowel preparation protocols before surgery'
    ],
    faqs: [
      {
        question: 'How does laparoscopic surgery compare to traditional open surgery?',
        answer: 'Laparoscopy achieves the exact same internal anatomical results as open surgery but through keyhole ports. This results in significantly less muscle injury, minimal bleeding, and a recovery measured in days rather than weeks.'
      },
      {
        question: 'How long does a DJ stent stay after laparoscopic pyeloplasty?',
        answer: 'A temporary DJ stent is left inside the ureter for 4 to 6 weeks to ensure optimal healing of the reconstructed joint, after which it is painlessly removed during a quick day-care cystoscopy.'
      }
    ],
    seoTitle: 'Laparoscopic Urology Surgery in Purnia | Dr. Md Taquedis Noori',
    seoDescription: 'Minimally invasive laparoscopic pyeloplasty and nephrectomy by Dr. Md Taquedis Noori at Glisan Akbari Super Speciality Hospital, Line Bazar, Purnia.'
  },
  {
    id: 'srv-6',
    title: 'Urinary Incontinence & Overactive Bladder',
    category: 'Female & Functional Urology',
    description: 'Specialized medical and surgical management of accidental urine leakage, stress incontinence, urgency incontinence, and neurogenic bladder dysfunction.',
    patientNotes: 'Urinary leakage is a treatable medical condition, not an inevitable consequence of aging or childbirth.',
    slug: 'urinary-incontinence-overactive-bladder',
    tagline: 'Regain Bladder Confidence & Freedom with Specialized Functional Urology',
    overview: [
      'Urinary incontinence affects millions of men and women, often leading to social isolation, skin excoriation, and sleep disruption.',
      'Whether leakage occurs during coughing, sneezing, and physical movement (stress incontinence) or through sudden, overwhelming bladder spasms (urge incontinence), modern urology provides effective solutions.',
      'Dr. Md Taquedis Noori offers empathetic, respectful clinical evaluation, urodynamic diagnostics, and modern minimally invasive interventions to help patients regain full control.'
    ],
    symptoms: [
      'Involuntary urine loss when coughing, laughing, sneezing, or lifting heavy objects',
      'Sudden, overwhelming urge to urinate that cannot be delayed (urgency)',
      'Waking up multiple times throughout the night to urinate (nocturia)',
      'Constant dribbling of urine or feeling unable to empty the bladder completely',
      'Frequent daytime urination occurring more than 8 times per day'
    ],
    procedures: [
      {
        name: 'Urodynamic Study (UDS)',
        description: 'Computerized assessment of bladder pressures, filling sensations, and sphincter competence to pinpoint the exact incontinence type.'
      },
      {
        name: 'Transobturator Mid-Urethral Sling (TOT Tape)',
        description: 'A 20-minute minimally invasive procedure placing a supportive synthetic tape beneath the urethra to permanently cure stress incontinence.'
      },
      {
        name: 'Intravesical Botox Injections',
        description: 'Cystoscopic micro-injection of botulinum toxin directly into the bladder wall to calm severe, refractory overactive bladder muscle spasms.'
      },
      {
        name: 'Pelvic Floor Muscle Retraining & Pharmacotherapy',
        description: 'Guided pelvic rehabilitation protocols paired with modern beta-3 adrenergic agonists to optimize bladder capacity.'
      }
    ],
    benefits: [
      'Complete restoration of voluntary urinary control and dryness',
      'Elimination of pads, absorbent undergarments, and embarrassment',
      'Uninterrupted nighttime sleep and improved daily productivity',
      'Safe, brief procedures with rapid return to daily living'
    ],
    preparation: [
      'Complete a 3-day bladder diary documenting fluid intake and leakage times',
      'Bring recent urine analysis and culture reports to rule out active infection',
      'List all current medications, including diuretics or blood pressure tablets'
    ],
    faqs: [
      {
        question: 'Can urinary incontinence in women be cured without open surgery?',
        answer: 'Yes. Mild symptoms often resolve with pelvic floor exercises and medications. For persistent stress leakage, a quick TOT tape sling is performed through tiny incisions with high cure rates.'
      },
      {
        question: 'How long do the effects of bladder Botox last?',
        answer: 'Intravesical Botox typically provides 6 to 9 months of bladder calmness and symptom relief, after which the procedure can be safely repeated.'
      }
    ],
    seoTitle: 'Urinary Incontinence & Overactive Bladder Treatment in Purnia | Dr. Md Taquedis Noori',
    seoDescription: 'Specialized female and functional urology care for urine leakage and overactive bladder in Purnia. TOT sling and Botox therapy by Dr. Md Taquedis Noori.'
  },
  {
    id: 'srv-7',
    title: 'Erectile Dysfunction & Penile Implants',
    category: 'Andrology & Sexual Health',
    description: 'Evidence-based clinical workup and phased management of male erectile difficulties, premature ejaculation, and advanced penile prosthesis options.',
    patientNotes: 'Conducted in an atmosphere of strict clinical confidentiality, empathy, and scientific medicine.',
    slug: 'erectile-dysfunction-penile-implants',
    tagline: 'Confidential Clinical Andrology for Restored Male Vitality & Confidence',
    overview: [
      'Erectile dysfunction (ED) is a common medical condition that frequently stems from vascular, neurological, hormonal, or psychological factors—especially in men with diabetes or cardiovascular disease.',
      'Instead of relying on unverified supplements, patients benefit from scientific andrological workup to address the vascular root cause and safeguard heart and metabolic health.',
      'Dr. Md Taquedis Noori offers compassionate, private consultations and step-wise evidence-based therapies ranging from oral PDE-5 inhibitors to surgical penile prosthesis implantation.'
    ],
    symptoms: [
      'Difficulty achieving an erection suitable for satisfactory sexual intercourse',
      'Difficulty maintaining firmness until completion of intercourse',
      'Reduced sexual desire or lack of morning erections',
      'Premature ejaculation or difficulty with ejaculatory control',
      'Penile pain or palpable fibrous plaques causing curvature (Peyronie\'s disease)'
    ],
    procedures: [
      {
        name: 'Penile Duplex Color Doppler Study',
        description: 'Pharmacologically induced ultrasound assessment of cavernous arterial inflow and veno-occlusive competence.'
      },
      {
        name: 'Step-Wise Medical & Hormonal Therapy',
        description: 'Optimized oral PDE-5 inhibitors, testosterone replacement for hypogonadism, and management of diabetic microvascular factors.'
      },
      {
        name: 'Penile Prosthesis Implantation',
        description: 'Surgical placement of malleable semi-rigid or inflatable hydraulic penile cylinders for end-stage organic erectile dysfunction.'
      },
      {
        name: 'Peyronie\'s Disease Plaque Assessment & Plication',
        description: 'Medical stabilization and corrective surgical straightening for painful penile curvature.'
      }
    ],
    benefits: [
      'Restored sexual confidence and intimate partnership harmony',
      'Scientifically verified treatments safe for diabetic and hypertensive patients',
      'Strict clinical confidentiality and private one-on-one consultation chambers',
      'Permanent solutions with high patient satisfaction through penile implants'
    ],
    preparation: [
      'Bring recent fasting blood sugar, HbA1c, and lipid profile reports',
      'Provide a complete list of current cardiac and blood pressure medications',
      'Write down questions you wish to discuss privately during consultation'
    ],
    faqs: [
      {
        question: 'Is erectile dysfunction consultation strictly confidential?',
        answer: 'Yes. All consultations, records, and treatments with Dr. Md Taquedis Noori are strictly confidential and conducted in private OPD rooms.'
      },
      {
        question: 'Can diabetic men with severe ED regain normal function?',
        answer: 'Yes. Even if oral tablets fail, advanced treatments such as intracavernous therapy or penile prosthesis implantation provide a 100% reliable erection on demand.'
      }
    ],
    seoTitle: 'Erectile Dysfunction & Andrology Specialist in Purnia | Dr. Md Taquedis Noori',
    seoDescription: 'Confidential and evidence-based erectile dysfunction and male sexual health treatment by Dr. Md Taquedis Noori at Glisan Akbari Hospital, Line Bazar, Purnia.'
  },
  {
    id: 'srv-8',
    title: 'Kidney Transplantation & Post-Transplant Care',
    category: 'Renal Transplantation & Nephro-Urology',
    description: 'Pre-transplant urological clearance, donor-recipient anatomical workup, vascular/ureteral anastomosis counseling, and long-term post-transplant urological surveillance.',
    patientNotes: 'Specialized monitoring of graft function, immunosuppression safety, and early detection of ureteral stenosis or reflux.',
    slug: 'kidney-transplantation-post-transplant-care',
    tagline: 'Comprehensive Surgical Evaluation & Long-Term Graft Urological Surveillance',
    overview: [
      'Kidney transplantation is the definitive treatment for patients suffering from end-stage renal disease (ESRD), restoring quality of life and long-term survival.',
      'Successful transplantation requires meticulous surgical coordination, from pre-transplant lower urinary tract evaluation to vascular and ureteral reconstruction and lifelong post-transplant care.',
      'Dr. Md Taquedis Noori provides expert surgical consultations for transplant candidates, lower urinary tract optimization, and proactive management of post-transplant urological complications.'
    ],
    symptoms: [
      'End-stage kidney failure requiring or anticipating maintenance hemodialysis',
      'Small, defunctionalized bladder requiring pre-transplant assessment or augmentation',
      'Post-transplant graft tenderness, fever, or sudden reduction in daily urine output',
      'Rising serum creatinine levels following kidney transplantation',
      'Post-transplant ureteric obstruction or urinary fistula leaks'
    ],
    procedures: [
      {
        name: 'Pre-Transplant Recipient Urological Workup',
        description: 'Comprehensive assessment of native bladder capacity, compliance, and exclusion of active infections or vesicoureteral reflux.'
      },
      {
        name: 'Post-Transplant Double-J Stent Removal',
        description: 'Delicate cystoscopic removal of the graft ureteric stent under sterile precautions 4 to 6 weeks after surgery.'
      },
      {
        name: 'Graft Urological Complication Management',
        description: 'Endourological and surgical management of transplant ureteric strictures, stones, and lymphocele drainage.'
      },
      {
        name: 'Long-Term Graft Surveillance & Infection Protocols',
        description: 'Serial ultrasound Doppler monitoring of graft perfusion and targeted therapy for opportunistic urinary infections.'
      }
    ],
    benefits: [
      'Thorough optimization of bladder dynamics before receiving a donor kidney',
      'Preservation of delicate graft ureteric anastomosis and kidney longevity',
      'Rapid diagnosis and non-invasive resolution of post-surgical fluid collections or strictures',
      'Close multi-disciplinary collaboration with treating nephrologists'
    ],
    preparation: [
      'Carry complete HLA tissue typing, cross-match reports, and viral serology panels',
      'Bring all dialysis prescription records and serial serum creatinine trends',
      'Maintain an updated list of all immunosuppressive medications and dosages'
    ],
    faqs: [
      {
        question: 'Can stones form in a transplanted kidney?',
        answer: 'Yes, although uncommon, stones can develop in graft kidneys. They can be safely treated using minimally invasive flexible ureteroscopy (RIRS) without harming the new organ.'
      },
      {
        question: 'Why is lower urinary tract evaluation necessary before transplant?',
        answer: 'The new kidney needs a healthy, low-pressure bladder reservoir. Detecting and treating bladder outflow obstruction or small capacity before transplant prevents graft damage.'
      }
    ],
    seoTitle: 'Kidney Transplant Urological Care in Purnia | Dr. Md Taquedis Noori',
    seoDescription: 'Expert pre-transplant urological workup and post-transplant graft urological care in Purnia, Bihar by Dr. Md Taquedis Noori at Glisan Akbari Super Speciality Hospital.'
  },
  {
    id: 'srv-9',
    title: 'Dialysis Access Surgery (AV Fistula Creation)',
    category: 'Vascular Access & Dialysis Surgery',
    description: 'Precision surgical creation of radiocephalic and brachiocephalic Arteriovenous (AV) Fistulas, fistula salvage, and maintenance for chronic hemodialysis patients.',
    patientNotes: 'A well-matured autologous AV fistula provides the safest, longest-lasting lifeline for hemodialysis with minimal infection risk.',
    slug: 'dialysis-access-surgery-av-fistula-creation',
    tagline: 'Durable Vascular Access Surgery for Safe & Effective Long-Term Hemodialysis',
    overview: [
      'For patients with advanced chronic kidney disease (CKD stage 4–5), establishing high-quality vascular access is vital for effective hemodialysis.',
      'An autologous arteriovenous (AV) fistula connects a native artery directly to a vein, allowing high-flow arterial blood to mature the vein into a durable dialysis lifeline.',
      'Dr. Md Taquedis Noori performs micro-vascular AV fistula creation in Purnia, carefully preserving vascular anatomy to maximize fistula longevity and flow clearance.'
    ],
    symptoms: [
      'Progressive chronic kidney disease approaching end-stage renal disease (CKD stage 4 or 5)',
      'Currently on hemodialysis via temporary jugular or femoral catheter requiring permanent access',
      'Poor blood flow or prolonged bleeding during dialysis through an existing fistula',
      'Weakening or loss of palpable thrill (vibration) over an established fistula site',
      'Swelling or localized bulge (pseudoaneurysm) along the dialysis arm'
    ],
    procedures: [
      {
        name: 'Radiocephalic AV Fistula (Wrist Fistula)',
        description: 'First-choice distal wrist connection linking the radial artery to cephalic vein, preserving upper arm vessels for future options.'
      },
      {
        name: 'Brachiocephalic AV Fistula (Elbow Fistula)',
        description: 'Upper arm anastomosis linking the brachial artery to cephalic vein, providing reliable flow when wrist veins are small.'
      },
      {
        name: 'Preoperative Vessel Mapping Ultrasound',
        description: 'High-resolution duplex scan measuring arterial inflow caliber and vein diameter (>2.5 mm) to pick the best anatomical site.'
      },
      {
        name: 'Fistula Salvage & Stenosis Correction',
        description: 'Surgical revision or superficialization of deep veins to ensure safe and comfortable cannulation during dialysis cycles.'
      }
    ],
    benefits: [
      'Lowest infection rate compared to dialysis catheters and artificial grafts',
      'High long-term patency allowing smooth hemodialysis for many years',
      'Local or regional anesthesia procedure with same-day discharge',
      'Significantly lower risk of central vein thrombosis and sepsis'
    ],
    preparation: [
      'Do not allow blood draws, IV lines, or blood pressure measurements on the planned arm',
      'Carry recent coagulation profile (PT/INR), platelet count, and serum creatinine',
      'Wear loose-fitting, comfortable clothing on the day of surgery'
    ],
    faqs: [
      {
        question: 'How long does an AV fistula take to mature before it can be used?',
        answer: 'An autologous fistula generally requires 6 to 8 weeks to mature and thicken its walls under arterial pressure before the first needle cannulation.'
      },
      {
        question: 'How can I check if my fistula is functioning properly at home?',
        answer: 'Place your fingertips gently over the fistula site daily; you should feel a continuous buzzing vibration called a "thrill". If the thrill feels weak or disappears, contact the clinic immediately.'
      }
    ],
    seoTitle: 'AV Fistula Surgery in Purnia (Dialysis Access) | Dr. Md Taquedis Noori',
    seoDescription: 'Reliable AV fistula creation for hemodialysis by Dr. Md Taquedis Noori at Glisan Akbari Hospital, Line Bazar, Purnia. Long-lasting vascular access solutions.'
  },
  {
    id: 'srv-10',
    title: 'Prostate Cancer Screening & Radical Prostatectomy',
    category: 'Urologic Oncology (Uro-Oncology)',
    description: 'Early detection, multiparametric MRI evaluation, TRUS-guided prostate biopsy, and surgical management of localized to advanced prostate adenocarcinoma.',
    patientNotes: 'Early-stage prostate cancer often causes no symptoms; routine PSA screening after age 50 is critical for timely detection and curative intervention.',
    slug: 'prostate-cancer-screening-radical-prostatectomy',
    tagline: 'Early Screening, Precision Biopsy & Curative Oncological Prostate Surgery',
    overview: [
      'Prostate cancer is one of the most common malignancies in aging men, yet when detected in early, localized stages, it carries excellent cure rates.',
      'Because early prostate carcinoma causes few to no symptoms, routine screening with Serum PSA and digital rectal examination is recommended for men starting at age 50.',
      'Dr. Md Taquedis Noori provides comprehensive uro-oncological care including multiparametric MRI interpretation, precision prostate biopsies, nerve-sparing radical prostatectomy, and androgen deprivation therapy.'
    ],
    symptoms: [
      'Elevated or rising Serum PSA levels (>4.0 ng/mL or rapid velocity)',
      'Firm or hard nodule detected during routine digital rectal examination',
      'Urinary difficulties resembling BPH: weak stream, straining, or frequent nocturia',
      'Blood in urine (hematuria) or blood in semen (hematospermia)',
      'Dull lower back, hip, or pelvis bone pain in advanced presentations'
    ],
    procedures: [
      {
        name: 'Multiparametric MRI (mpMRI) & TRUS Prostate Biopsy',
        description: 'Advanced MRI categorization (PIRADS scoring) followed by ultrasound-guided core biopsies to accurately grade cancer using Gleason scoring.'
      },
      {
        name: 'Radical Prostatectomy',
        description: 'Complete oncological removal of the prostate gland, seminal vesicles, and regional pelvic lymph nodes for localized organ-confined disease.'
      },
      {
        name: 'Active Surveillance Protocols',
        description: 'Structured monitoring with serial PSA tests, examinations, and repeat MRIs for very low-risk indolent prostate cancers, avoiding unnecessary surgery.'
      },
      {
        name: 'Androgen Deprivation Therapy (ADT)',
        description: 'Medical castration and anti-androgen therapy tailored for locally advanced or metastatic prostate cancer.'
      }
    ],
    benefits: [
      'High cure rates when managed in localized, early stages',
      'Nerve-sparing surgical techniques aimed at preserving urinary continence and potency',
      'Systematic multidisciplinary oncological planning following international guidelines',
      'Continuous post-operative PSA surveillance for peace of mind'
    ],
    preparation: [
      'Bring all serial Serum PSA reports over the past 12–24 months',
      'Carry previous biopsy pathology slides and blocks for histopathological review',
      'Bring pelvic MRI or whole-body PSMA PET-CT imaging if already performed'
    ],
    faqs: [
      {
        question: 'Does an elevated PSA level always mean I have prostate cancer?',
        answer: 'No. Elevated PSA can also stem from benign prostate enlargement (BPH), prostate inflammation (prostatitis), or recent urinary retention. Further clinical evaluation is essential to confirm or rule out cancer.'
      },
      {
        question: 'What are the benefits of nerve-sparing radical prostatectomy?',
        answer: 'Nerve-sparing techniques preserve the fine neurovascular bundles alongside the prostate, significantly speeding the recovery of urinary continence and improving erectile recovery.'
      }
    ],
    seoTitle: 'Prostate Cancer Screening & Surgery in Purnia | Dr. Md Taquedis Noori',
    seoDescription: 'Uro-oncology care for prostate cancer screening, TRUS biopsy, and radical prostatectomy in Purnia, Bihar by Dr. Md Taquedis Noori at Glisan Akbari Hospital.'
  },
  {
    id: 'srv-11',
    title: 'Kidney Cancer Surgery (Nephrectomy)',
    category: 'Urologic Oncology (Uro-Oncology)',
    description: 'Specialized surgical extirpation of renal cell carcinoma (RCC) emphasizing nephron-sparing partial nephrectomy whenever possible to preserve healthy kidney parenchyma.',
    patientNotes: 'Small renal masses (under 4 cm) detected incidentally on routine ultrasound can often be safely cured while saving the rest of the kidney.',
    slug: 'kidney-cancer-surgery-nephrectomy',
    tagline: 'Nephron-Sparing Partial Nephrectomy & Radical Surgery for Renal Tumors',
    overview: [
      'Renal cell carcinoma (RCC) accounts for the vast majority of kidney tumors, with many cases now detected early during routine abdominal ultrasound or CT scans for other issues.',
      'The modern standard of care emphasizes "nephron-sparing surgery" (partial nephrectomy) whenever feasible, excising the tumor while preserving the remaining healthy kidney tissue.',
      'Dr. Md Taquedis Noori performs both partial and radical nephrectomies via laparoscopic and open approaches, delivering complete cancer clearance while protecting long-term kidney function.'
    ],
    symptoms: [
      'Painless blood in urine (gross or microscopic hematuria)',
      'Palpable lump or fullness in the flank or side of the abdomen',
      'Persistent dull ache or pain in the back or side below the ribs',
      'Unexplained weight loss, chronic fatigue, or recurrent low-grade fever',
      'Sudden onset of left-sided varicocele in older men'
    ],
    procedures: [
      {
        name: 'Partial Nephrectomy (Nephron-Sparing Surgery)',
        description: 'Surgical excision of the tumor with a margin of healthy tissue, suturing the renal defect to preserve maximal functioning kidney tissue.'
      },
      {
        name: 'Radical Nephrectomy',
        description: 'Complete removal of the kidney, surrounding Gerota\'s fascia, adrenal gland (when indicated), and lymph nodes for larger or centrally placed tumors.'
      },
      {
        name: 'Laparoscopic Kidney Tumor Removal',
        description: 'Minimally invasive keyhole approach for suitable renal masses, minimizing incision size, blood loss, and recovery time.'
      },
      {
        name: 'Post-Operative Oncological Surveillance',
        description: 'Scheduled contrast CT imaging and renal function panels to ensure cancer-free long-term survival.'
      }
    ],
    benefits: [
      'Maximum preservation of overall renal function and filtration reserve',
      'Excellent oncological disease control and cure rates for localized masses',
      'Minimal post-operative hospital stay through laparoscopic keyhole techniques',
      'Reduced risk of future chronic kidney disease and cardiovascular complications'
    ],
    preparation: [
      'Carry triple-phase Contrast-Enhanced CT (CECT) of the abdomen and pelvis',
      'Bring recent serum creatinine, urea, and complete blood count reports',
      'Provide chest imaging (X-ray or CT chest) for complete oncological staging'
    ],
    faqs: [
      {
        question: 'Can I lead a normal life with just one kidney if a full nephrectomy is needed?',
        answer: 'Yes. A single healthy kidney easily filters blood and maintains normal bodily functions without dietary restrictions, provided blood pressure and blood sugar are kept well-controlled.'
      },
      {
        question: 'When is partial nephrectomy preferred over full kidney removal?',
        answer: 'Partial nephrectomy is the gold standard for tumors under 4 to 7 cm located favorably on the kidney periphery, giving identical cancer cure rates while protecting kidney longevity.'
      }
    ],
    seoTitle: 'Kidney Cancer Surgery (Nephrectomy) in Purnia | Dr. Md Taquedis Noori',
    seoDescription: 'Partial and radical nephrectomy for kidney tumors in Line Bazar, Purnia by senior urologist Dr. Md Taquedis Noori at Glisan Akbari Super Speciality Hospital.'
  },
  {
    id: 'srv-12',
    title: 'Bladder & Testicular Cancer Treatment',
    category: 'Urologic Oncology (Uro-Oncology)',
    description: 'Transurethral Resection of Bladder Tumor (TURBT), intravesical BCG immunotherapy, radical cystectomy with urinary diversion, and high inguinal orchidectomy for testicular tumors.',
    patientNotes: 'Even a single episode of visible painless red urine must be evaluated promptly with cystoscopy to rule out urothelial carcinoma.',
    slug: 'bladder-testicular-cancer-treatment',
    tagline: 'Comprehensive Surgical Oncology & Bladder Preservation for Genitourinary Tumors',
    overview: [
      'Bladder and testicular malignancies are treatable conditions when recognized early and managed in accordance with international oncological protocols.',
      'Bladder cancer typically begins in the inner urothelial lining and is strongly linked to smoking. Testicular cancer is most common in young men between 15 and 35 years and boasts cure rates exceeding 95% with timely surgery.',
      'Dr. Md Taquedis Noori provides endourological resection (TURBT), intravesical immunotherapy regimens, high inguinal orchidectomy, and radical reconstructive surgery at Glisan Akbari Hospital.'
    ],
    symptoms: [
      'Painless visible blood in urine (hematuria), often with clots',
      'Increased frequency, urgency, or painful urination without bacterial infection',
      'Firm, painless swelling or lump in either testicle',
      'Feeling of heaviness in the scrotum or dull ache in the lower abdomen or groin',
      'Enlargement or tenderness of male breast tissue (gynecomastia) in testicular cancer'
    ],
    procedures: [
      {
        name: 'TURBT (Transurethral Resection of Bladder Tumor)',
        description: 'Complete endoscopic resection of bladder tumor down to the detrusor muscle layer for diagnostic pathology and primary treatment.'
      },
      {
        name: 'Intravesical BCG / Chemotherapy Instillation',
        description: 'Immunotherapy instilled directly into the bladder to prevent tumor recurrence and stage progression in non-muscle invasive bladder cancer.'
      },
      {
        name: 'Radical Cystectomy & Reconstructive Urinary Diversion',
        description: 'Surgical excision of the cancerous bladder followed by ileal conduit or orthotopic neobladder creation for muscle-invasive disease.'
      },
      {
        name: 'High Inguinal Orchidectomy',
        description: 'Safe surgical removal of the affected testicle through a groin incision, strictly avoiding scrotal violation, with tumor marker monitoring (AFP, beta-hCG, LDH).'
      }
    ],
    benefits: [
      'Accurate histopathological grading and muscle invasion determination',
      'Bladder preservation protocols prioritized for suitable non-muscle invasive tumors',
      'Exceptional cure rates exceeding 95% for testicular cancer when treated early',
      'Clear, supportive guidance through every stage of cancer therapy and follow-up'
    ],
    preparation: [
      'Bring previous urine cytology or diagnostic cystoscopy reports',
      'Carry contrast-enhanced CT or MRI scans of the abdomen and pelvis',
      'For testicular lumps, carry high-resolution scrotal ultrasound and serum tumor markers'
    ],
    faqs: [
      {
        question: 'Why is smoking the primary risk factor for bladder cancer?',
        answer: 'Carcinogens inhaled from tobacco smoke enter the bloodstream, get filtered through the kidneys, and concentrate in the urine, directly irritating and mutating the bladder lining over time.'
      },
      {
        question: 'Will testicular cancer surgery affect fertility and sexual function?',
        answer: 'Removal of one testicle does not typically affect erectile function or testosterone levels, as the remaining testicle compensates. Sperm banking can also be arranged prior to surgery if desired.'
      }
    ],
    seoTitle: 'Bladder & Testicular Cancer Care in Purnia | Dr. Md Taquedis Noori',
    seoDescription: 'TURBT, intravesical BCG, and testicular cancer surgery in Line Bazar, Purnia, Bihar by Dr. Md Taquedis Noori at Glisan Akbari Super Speciality Hospital.'
  },
  {
    id: 'srv-13',
    title: 'Pediatric Urology & Congenital Reconstruction',
    category: 'Pediatric Urology & Reconstructive Surgery',
    description: 'Compassionate surgical correction of congenital urinary tract anomalies in infants and children including Pelvi-Ureteric Junction (PUJ) obstruction, hypospadias, undescended testis, and vesicoureteral reflux (VUR).',
    patientNotes: 'Timely pediatric intervention preserves developing kidney nephrons and supports normal anatomical development.',
    slug: 'pediatric-urology-congenital-reconstruction',
    tagline: 'Gentle & Precise Reconstructive Surgery for Children\'s Kidney & Urological Health',
    overview: [
      'Pediatric urological conditions require delicate surgical precision, deep understanding of child growth physiology, and a gentle, comforting approach for young patients and parents.',
      'Congenital conditions such as antenatal hydronephrosis, hypospadias, and undescended testes benefit greatly from timely corrective surgery to protect long-term kidney function and reproductive potential.',
      'Dr. Md Taquedis Noori provides compassionate consultations and advanced pediatric reconstructive surgery for infants and children across Purnia and North Bihar.'
    ],
    symptoms: [
      'Antenatal hydronephrosis (kidney swelling) detected on maternal pregnancy ultrasound',
      'Urinary opening located on the underside of the penis rather than at the tip (hypospadias)',
      'Testis not felt inside the scrotal sac in an infant boy (cryptorchidism / undescended testis)',
      'Recurrent unexplained childhood fevers, vomiting, or diagnosed pediatric UTIs',
      'Downward curvature of the penis during erection in young boys (chordee)'
    ],
    procedures: [
      {
        name: 'Pediatric Pyeloplasty (Dismembered)',
        description: 'Micro-surgical or laparoscopic reconstruction of narrowed kidney outlets in infants to relieve hydronephrosis and preserve renal parenchymal growth.'
      },
      {
        name: 'Hypospadias Repair (Single & Two-Stage)',
        description: 'Delicate reconstruction of the urethral opening to the tip of the glans with chordee correction, ensuring normal standing micturition and cosmetic anatomy.'
      },
      {
        name: 'Orchidopexy for Undescended Testis',
        description: 'Mobilization and surgical fixation of the testis into the scrotal sac, recommended between 6 and 18 months of age.'
      },
      {
        name: 'Deflux Injection & Ureteral Reimplantation for VUR',
        description: 'Correction of backward urine reflux from the bladder to the kidneys to prevent chronic pyelonephritis and renal scarring.'
      }
    ],
    benefits: [
      'Protection and salvage of delicate growing kidney nephrons',
      'Normal anatomical development and age-appropriate cosmetic outcomes',
      'Child-friendly pediatric anesthetic protocols and gentle recovery care',
      'Clear, reassuring counseling for anxious parents at every step'
    ],
    preparation: [
      'Bring all antenatal (pregnancy) and postnatal ultrasound reports',
      'Carry MCU (Micturating Cystourethrogram) and nuclear kidney scans (DTPA/MAG3/DMSA) if done',
      'Bring immunization records and current pediatric growth charts'
    ],
    faqs: [
      {
        question: 'At what age should an undescended testis be surgically corrected?',
        answer: 'International pediatric urology guidelines recommend performing orchidopexy between 6 and 18 months of age. Early positioning preserves sperm-producing cells and reduces long-term risks.'
      },
      {
        question: 'Does every infant with hydronephrosis need surgery?',
        answer: 'No. Many cases of antenatal hydronephrosis resolve naturally as the child grows. Dr. Noori conducts careful serial monitoring with ultrasound and nuclear scans to identify which children truly require surgery.'
      }
    ],
    seoTitle: 'Pediatric Urology & Hypospadias Repair in Purnia | Dr. Md Taquedis Noori',
    seoDescription: 'Pediatric pyeloplasty, hypospadias, and undescended testis surgery in Purnia, Bihar by Dr. Md Taquedis Noori at Glisan Akbari Hospital.'
  }
];

export const WHY_CHOOSE_REASONS: WhyChooseReason[] = [
  {
    id: 'rc-1',
    title: '[PLACEHOLDER: VERIFIED REASON 1]',
    detail: 'Verified professional qualifications, specialized medical training, and clinical standards in comprehensive hospital care.',
  },
  {
    id: 'rc-2',
    title: '[PLACEHOLDER: VERIFIED REASON 2]',
    detail: `Established hospital environment at ${HOSPITAL_NAME}, Dharamshala Road, ${HOSPITAL_SHORT_ADDRESS}.`,
  },
  {
    id: 'rc-3',
    title: '[PLACEHOLDER: VERIFIED REASON 3]',
    detail: 'Structured clinical evaluation focused on patient comfort, clear explanations, and medically sound guidance.',
  },
  {
    id: 'rc-4',
    title: '[PLACEHOLDER: VERIFIED REASON 4]',
    detail: 'Accessible appointment coordination with phone, WhatsApp, and online request options for patients across Bihar.',
  },
];

export const APPOINTMENT_STEPS = [
  {
    step: '1',
    title: 'Request an Appointment',
    description: 'Fill out the simple appointment form with your preferred date, or call the hospital desk directly.',
  },
  {
    step: '2',
    title: 'Receive Confirmation',
    description: 'Our hospital coordination team will contact you to confirm your consultation timing.',
  },
  {
    step: '3',
    title: 'Visit the Hospital',
    description: `Visit ${HOSPITAL_NAME}, ${HOSPITAL_SHORT_ADDRESS} for your consultation with Dr. Noori.`,
  },
];

export const APPOINTMENT_PROCESS_PLACEHOLDER = '[PLACEHOLDER: INSERT EXACT APPOINTMENT PROCESS]';
export const APPOINTMENT_AFTER_SUBMISSION_NOTE = '[PLACEHOLDER: INSERT WHAT HAPPENS AFTER SUBMISSION]';

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    placeholderText: '[PLACEHOLDER: INSERT VERIFIED PATIENT TESTIMONIAL 1]',
    verifiedPatientBadge: 'Verified Consultation Record',
  },
  {
    id: 'test-2',
    placeholderText: '[PLACEHOLDER: INSERT VERIFIED PATIENT TESTIMONIAL 2]',
    verifiedPatientBadge: 'Verified Consultation Record',
  },
  {
    id: 'test-3',
    placeholderText: '[PLACEHOLDER: INSERT VERIFIED PATIENT TESTIMONIAL 3]',
    verifiedPatientBadge: 'Verified Consultation Record',
  },
];

export const GOOGLE_REVIEWS_URL_PLACEHOLDER = '[PLACEHOLDER: GOOGLE REVIEWS URL]';

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'appointment',
    question: `How can I book an appointment with ${DOCTOR_NAME}?`,
    answer: 'You can request an appointment through the online form on this website, call the hospital desk at 079037 81377, or message via WhatsApp [PLACEHOLDER: INSERT WHATSAPP NUMBER]. Our team will connect with you to confirm your consultation slot.',
  },
  {
    id: 'faq-2',
    category: 'hospital',
    question: 'Where is Dr. Noori available for consultation?',
    answer: `${DOCTOR_NAME} consults at ${HOSPITAL_NAME}, situated on Dharamshala Road, Ashiyana Colony, ${HOSPITAL_SHORT_ADDRESS}, Bihar 854301.`,
  },
  {
    id: 'faq-3',
    category: 'appointment',
    question: 'What are the consultation timings?',
    answer: '[PLACEHOLDER: INSERT VERIFIED CONSULTATION DAYS AND TIMES]. Please call 079037 81377 to confirm today’s available OPD schedule.',
  },
  {
    id: 'faq-4',
    category: 'consultation',
    question: 'What should I bring to my consultation?',
    answer: 'Please bring your valid government identification, a notebook for doctor instructions, a list of current medications, and any past medical records or prescriptions.',
  },
  {
    id: 'faq-5',
    category: 'consultation',
    question: 'Do I need to carry previous medical reports and ultrasound scans?',
    answer: 'Yes. Carrying prior lab tests, blood work, urine tests, ultrasound, CT scans, and discharge summaries helps the doctor assess your case thoroughly without repeating necessary tests.',
  },
  {
    id: 'faq-6',
    category: 'hospital',
    question: `How can I reach ${HOSPITAL_NAME} in ${HOSPITAL_CITY}?`,
    answer: `The hospital is centrally located in ${HOSPITAL_SHORT_ADDRESS}, along Dharamshala Road near Ashiyana Colony. It is easily accessible by auto-rickshaw, taxi, or private vehicle from ${HOSPITAL_CITY} Junction and surrounding transit hubs.`,
  },
  {
    id: 'faq-7',
    category: 'medical',
    question: 'What conditions does a urologist treat?',
    answer: 'A urologist specializes in the medical and surgical management of conditions affecting the male and female urinary tract (kidneys, ureters, bladder, urethra) and the male reproductive system. [PLACEHOLDER: INSERT VERIFIED ANSWER for doctor-specific sub-specialties].',
  },
  {
    id: 'faq-8',
    category: 'appointment',
    question: 'Does submitting the online appointment form guarantee my exact slot?',
    answer: 'Submitting the form sends a priority booking request. Our hospital reception team will contact you promptly by phone to confirm the exact consultation time and ensure the doctor is available during your requested window.',
  },
];

export const FINAL_CTA_COPY = {
  heading: 'Need a Urology Consultation?',
  supportingText: '[PLACEHOLDER: INSERT APPROVED CTA SUPPORTING COPY]',
};

export const MEDICAL_DISCLAIMER = '[PLACEHOLDER: INSERT CLIENT-APPROVED MEDICAL DISCLAIMER]';

export const BRAND_COLORS = {
  primary: '[PLACEHOLDER: INSERT BRAND PRIMARY COLOR]',
  secondary: '[PLACEHOLDER: INSERT BRAND SECONDARY COLOR]',
  accent: '[PLACEHOLDER: INSERT BRAND ACCENT COLOR]',
};

export const SEO_CONFIG = {
  primaryKeyword: '[PLACEHOLDER: INSERT APPROVED PRIMARY SEO KEYWORD]',
  secondaryKeywords: '[PLACEHOLDER: INSERT SECONDARY SEO KEYWORDS]',
  canonicalUrl: SITE_URL,
};
