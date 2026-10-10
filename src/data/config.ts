import { SITE_URL } from './seo';
import { HOSPITAL_NAME, DOCTOR_NAME, HOSPITAL_CITY, HOSPITAL_SHORT_ADDRESS } from './identity';

/**
 * Centralized Business, Doctor, and Hospital Configuration
 * All information, contact numbers, and placeholders are consolidated here.
 * Any client updates can be made directly in this single file.
 */

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
  logoPlaceholder: string;
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

export interface UrologyServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  patientNotes: string;
  slug: string;
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
  professionalTitle: '[PLACEHOLDER: INSERT EXACT PROFESSIONAL TITLE]',
  primaryProfessionalIdentity: '[PLACEHOLDER: INSERT EXACT PROFESSIONAL TITLE]',
  qualifications: '[PLACEHOLDER: INSERT VERIFIED QUALIFICATIONS]',
  medicalRegistration: '[PLACEHOLDER: INSERT REGISTRATION INFORMATION IF APPROVED]',
  yearsOfExperience: '[PLACEHOLDER: INSERT VERIFIED YEARS OF EXPERIENCE]',
  memberships: '[PLACEHOLDER: INSERT VERIFIED MEMBERSHIPS/FELLOWSHIPS]',
  currentHospital: HOSPITAL_NAME,
  hospitalRelationship: '[PLACEHOLDER: INSERT EXACT RELATIONSHIP BETWEEN DR. NOORI AND THE HOSPITAL]',
  languages: '[PLACEHOLDER: INSERT LANGUAGES SPOKEN]',
  biography: '[PLACEHOLDER: INSERT CLIENT-APPROVED PROFESSIONAL BIOGRAPHY]',
  specialtyLabel: '[PLACEHOLDER: INSERT SHORT VERIFIED SPECIALTY LABEL]',
  heroValueProp: '[PLACEHOLDER: INSERT 1–2 SENTENCE VALUE PROPOSITION]',
  doctorIntroduction: '[PLACEHOLDER: INSERT APPROVED DOCTOR INTRODUCTION]',
  profileImagePlaceholder: '[PLACEHOLDER: INSERT HIGH-QUALITY DOCTOR PHOTOGRAPH]',
  logoPlaceholder: '[PLACEHOLDER: INSERT LOGO IF AVAILABLE]',
};

export const HOSPITAL_PROFILE: HospitalProfile = {
  name: HOSPITAL_NAME,
  address: {
    line1: 'Glisan, Akbari Super Speciality Hospital',
    line2: 'Dharamshala Road, Ashiyana Colony',
    area: 'Line Bazar',
    city: 'Purnia',
    state: 'Bihar',
    pincode: '854301',
    stateAndPin: 'Bihar 854301',
    fullFormatted: 'Glisan, Akbari Super Speciality Hospital, Dharamshala Road, Ashiyana Colony, Line Bazar, Purnia, Bihar 854301',
  },
  phone: '079037 81377',
  officialAppointmentPhone: '[PLACEHOLDER: INSERT CONFIRMED APPOINTMENT PHONE NUMBER]',
  whatsappNumber: '[PLACEHOLDER: INSERT WHATSAPP NUMBER]',
  email: '[PLACEHOLDER: INSERT OFFICIAL EMAIL]',
  website: '[PLACEHOLDER: INSERT OFFICIAL HOSPITAL WEBSITE]',
  googleBusinessProfileUrl: '[PLACEHOLDER: INSERT GOOGLE BUSINESS PROFILE URL]',
  googleMapsUrl: '[PLACEHOLDER: INSERT GOOGLE MAPS URL]',
  consultationTimings: '[PLACEHOLDER: INSERT VERIFIED CONSULTATION DAYS AND TIMES]',
  emergencyInfo: '[PLACEHOLDER: INSERT EMERGENCY INFORMATION IF APPLICABLE]',
  hospitalExteriorPlaceholder: '[PLACEHOLDER: INSERT HOSPITAL EXTERIOR]',
  hospitalInteriorPlaceholder: '[PLACEHOLDER: INSERT HOSPITAL INTERIOR]',
  hospitalLogoPlaceholder: '[PLACEHOLDER: INSERT LOGO]',
  approvedHospitalImagesPlaceholder: '[PLACEHOLDER: INSERT APPROVED HOSPITAL IMAGES]',
  description: '[PLACEHOLDER: INSERT APPROVED HOSPITAL DESCRIPTION]',
  facilities: [
    '[PLACEHOLDER: INSERT VERIFIED FACILITIES]',
  ],
  departments: [
    '[PLACEHOLDER: INSERT VERIFIED DEPARTMENTS]',
  ],
  patientServices: [
    '[PLACEHOLDER: INSERT VERIFIED PATIENT SERVICES]',
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
  consultationTimings: string;
  languages: string;
  isClickable: boolean;
}

export const DOCTORS: DoctorListItem[] = [
  {
    id: 'doc-1',
    slug: 'dr-md-taquedis-noori',
    name: DOCTOR_NAME,
    label: 'Featured Doctor',
    specialty: 'Urology',
    department: 'Urology',
    qualifications: DOCTOR_PROFILE.qualifications,
    medicalRegistration: DOCTOR_PROFILE.medicalRegistration,
    yearsOfExperience: DOCTOR_PROFILE.yearsOfExperience,
    profileImagePlaceholder: DOCTOR_PROFILE.profileImagePlaceholder,
    consultationTimings: HOSPITAL_PROFILE.consultationTimings,
    languages: DOCTOR_PROFILE.languages,
    isClickable: true,
  },
  {
    id: 'doc-2',
    name: '[PLACEHOLDER: DOCTOR 2 NAME]',
    department: '[PLACEHOLDER: INSERT DEPARTMENT 2]',
    specialty: '[PLACEHOLDER: INSERT SPECIALTY 2]',
    qualifications: '[PLACEHOLDER: INSERT QUALIFICATIONS 2]',
    medicalRegistration: '[PLACEHOLDER: INSERT REGISTRATION 2]',
    yearsOfExperience: '[PLACEHOLDER: INSERT EXPERIENCE 2]',
    profileImagePlaceholder: '[PLACEHOLDER: INSERT DOCTOR 2 PHOTOGRAPH]',
    consultationTimings: '[PLACEHOLDER: INSERT DOCTOR 2 TIMINGS]',
    languages: '[PLACEHOLDER: INSERT DOCTOR 2 LANGUAGES]',
    isClickable: false,
  },
  {
    id: 'doc-3',
    name: '[PLACEHOLDER: DOCTOR 3 NAME]',
    department: '[PLACEHOLDER: INSERT DEPARTMENT 3]',
    specialty: '[PLACEHOLDER: INSERT SPECIALTY 3]',
    qualifications: '[PLACEHOLDER: INSERT QUALIFICATIONS 3]',
    medicalRegistration: '[PLACEHOLDER: INSERT REGISTRATION 3]',
    yearsOfExperience: '[PLACEHOLDER: INSERT EXPERIENCE 3]',
    profileImagePlaceholder: '[PLACEHOLDER: INSERT DOCTOR 3 PHOTOGRAPH]',
    consultationTimings: '[PLACEHOLDER: INSERT DOCTOR 3 TIMINGS]',
    languages: '[PLACEHOLDER: INSERT DOCTOR 3 LANGUAGES]',
    isClickable: false,
  },
  {
    id: 'doc-4',
    name: '[PLACEHOLDER: DOCTOR 4 NAME]',
    department: '[PLACEHOLDER: INSERT DEPARTMENT 4]',
    specialty: '[PLACEHOLDER: INSERT SPECIALTY 4]',
    qualifications: '[PLACEHOLDER: INSERT QUALIFICATIONS 4]',
    medicalRegistration: '[PLACEHOLDER: INSERT REGISTRATION 4]',
    yearsOfExperience: '[PLACEHOLDER: INSERT EXPERIENCE 4]',
    profileImagePlaceholder: '[PLACEHOLDER: INSERT DOCTOR 4 PHOTOGRAPH]',
    consultationTimings: '[PLACEHOLDER: INSERT DOCTOR 4 TIMINGS]',
    languages: '[PLACEHOLDER: INSERT DOCTOR 4 LANGUAGES]',
    isClickable: false,
  },
];

export const TRUST_STRIP_DATA: TrustStripData = {
  googleRating: '4.8',
  googleRatingPlaceholder: '[PLACEHOLDER: UPDATE GOOGLE RATING]',
  googleReviewCount: '265+ reviews',
  googleReviewCountPlaceholder: '[PLACEHOLDER: UPDATE GOOGLE REVIEW COUNT]',
  verifiedCredential: '[PLACEHOLDER: INSERT VERIFIED CREDENTIAL]',
  verifiedExperience: '[PLACEHOLDER: INSERT VERIFIED EXPERIENCE]',
  verifiedMembership: '[PLACEHOLDER: INSERT VERIFIED MEMBERSHIP]',
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
    category: '[PLACEHOLDER: INSERT VERIFIED SERVICE CATEGORY]',
    description: '[PLACEHOLDER: INSERT APPROVED SERVICE DESCRIPTION]',
    patientNotes: '[PLACEHOLDER: INSERT APPROVED PATIENT NOTES]',
    slug: 'kidney-stone-laser-surgery-pcnl-ursl-rirs',
  },
  {
    id: 'srv-2',
    title: 'Prostate Enlargement & BPH Treatment',
    category: '[PLACEHOLDER: INSERT VERIFIED SERVICE CATEGORY]',
    description: '[PLACEHOLDER: INSERT APPROVED SERVICE DESCRIPTION]',
    patientNotes: '[PLACEHOLDER: INSERT APPROVED PATIENT NOTES]',
    slug: 'prostate-enlargement-bph-treatment',
  },
  {
    id: 'srv-3',
    title: 'Urinary Tract Infection (UTI) & Hematuria Care',
    category: '[PLACEHOLDER: INSERT VERIFIED SERVICE CATEGORY]',
    description: '[PLACEHOLDER: INSERT APPROVED SERVICE DESCRIPTION]',
    patientNotes: '[PLACEHOLDER: INSERT APPROVED PATIENT NOTES]',
    slug: 'urinary-tract-infection-uti-hematuria-care',
  },
  {
    id: 'srv-4',
    title: 'Male Infertility & Varicocele Repair',
    category: '[PLACEHOLDER: INSERT VERIFIED SERVICE CATEGORY]',
    description: '[PLACEHOLDER: INSERT APPROVED SERVICE DESCRIPTION]',
    patientNotes: '[PLACEHOLDER: INSERT APPROVED PATIENT NOTES]',
    slug: 'male-infertility-varicocele-repair',
  },
  {
    id: 'srv-5',
    title: 'Laparoscopic & Robotic Urological Surgery',
    category: '[PLACEHOLDER: INSERT VERIFIED SERVICE CATEGORY]',
    description: '[PLACEHOLDER: INSERT APPROVED SERVICE DESCRIPTION]',
    patientNotes: '[PLACEHOLDER: INSERT APPROVED PATIENT NOTES]',
    slug: 'laparoscopic-robotic-urological-surgery',
  },
  {
    id: 'srv-6',
    title: 'Urinary Incontinence & Overactive Bladder',
    category: '[PLACEHOLDER: INSERT VERIFIED SERVICE CATEGORY]',
    description: '[PLACEHOLDER: INSERT APPROVED SERVICE DESCRIPTION]',
    patientNotes: '[PLACEHOLDER: INSERT APPROVED PATIENT NOTES]',
    slug: 'urinary-incontinence-overactive-bladder',
  },
  {
    id: 'srv-7',
    title: 'Erectile Dysfunction & Penile Implants',
    category: '[PLACEHOLDER: INSERT VERIFIED SERVICE CATEGORY]',
    description: '[PLACEHOLDER: INSERT APPROVED SERVICE DESCRIPTION]',
    patientNotes: '[PLACEHOLDER: INSERT APPROVED PATIENT NOTES]',
    slug: 'erectile-dysfunction-penile-implants',
  },
  {
    id: 'srv-8',
    title: 'Kidney Transplantation & Post-Transplant Care',
    category: '[PLACEHOLDER: INSERT VERIFIED SERVICE CATEGORY]',
    description: '[PLACEHOLDER: INSERT APPROVED SERVICE DESCRIPTION]',
    patientNotes: '[PLACEHOLDER: INSERT APPROVED PATIENT NOTES]',
    slug: 'kidney-transplantation-post-transplant-care',
  },
  {
    id: 'srv-9',
    title: 'Dialysis Access Surgery (AV Fistula Creation)',
    category: '[PLACEHOLDER: INSERT VERIFIED SERVICE CATEGORY]',
    description: '[PLACEHOLDER: INSERT APPROVED SERVICE DESCRIPTION]',
    patientNotes: '[PLACEHOLDER: INSERT APPROVED PATIENT NOTES]',
    slug: 'dialysis-access-surgery-av-fistula-creation',
  },
  {
    id: 'srv-10',
    title: 'Prostate Cancer Screening & Radical Prostatectomy',
    category: '[PLACEHOLDER: INSERT VERIFIED SERVICE CATEGORY]',
    description: '[PLACEHOLDER: INSERT APPROVED SERVICE DESCRIPTION]',
    patientNotes: '[PLACEHOLDER: INSERT APPROVED PATIENT NOTES]',
    slug: 'prostate-cancer-screening-radical-prostatectomy',
  },
  {
    id: 'srv-11',
    title: 'Kidney Cancer Surgery (Nephrectomy)',
    category: '[PLACEHOLDER: INSERT VERIFIED SERVICE CATEGORY]',
    description: '[PLACEHOLDER: INSERT APPROVED SERVICE DESCRIPTION]',
    patientNotes: '[PLACEHOLDER: INSERT APPROVED PATIENT NOTES]',
    slug: 'kidney-cancer-surgery-nephrectomy',
  },
  {
    id: 'srv-12',
    title: 'Bladder & Testicular Cancer Treatment',
    category: '[PLACEHOLDER: INSERT VERIFIED SERVICE CATEGORY]',
    description: '[PLACEHOLDER: INSERT APPROVED SERVICE DESCRIPTION]',
    patientNotes: '[PLACEHOLDER: INSERT APPROVED PATIENT NOTES]',
    slug: 'bladder-testicular-cancer-treatment',
  },
  {
    id: 'srv-13',
    title: 'Pediatric Urology & Congenital Reconstruction',
    category: '[PLACEHOLDER: INSERT VERIFIED SERVICE CATEGORY]',
    description: '[PLACEHOLDER: INSERT APPROVED SERVICE DESCRIPTION]',
    patientNotes: '[PLACEHOLDER: INSERT APPROVED PATIENT NOTES]',
    slug: 'pediatric-urology-congenital-reconstruction',
  },
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
