// Approved 3D service artwork, with responsive WebP files and JPEG social images.
export type CareImage = {
  src: string;
  alt: string;
  social?: string;
  srcSet?: string;
  width?: number;
  height?: number;
};

export const SERVICE_IMAGES: Record<string, CareImage & { social: string }> = {
  "srv-1": {
    "src": "/media/service-heroes/kidney-stone-treatment-in-purnia.webp",
    "social": "/media/service-heroes/kidney-stone-treatment-in-purnia-social.jpg",
    "alt": "3D illustration of kidney stone treatment in Purnia, showing the urinary tract and laser stone fragmentation",
    "srcSet": "/media/service-heroes/kidney-stone-treatment-in-purnia-480.webp 480w, /media/service-heroes/kidney-stone-treatment-in-purnia-800.webp 800w, /media/service-heroes/kidney-stone-treatment-in-purnia.webp 1200w",
    "width": 1200,
    "height": 900
  },
  "srv-2": {
    "src": "/media/service-heroes/prostate-treatment-in-purnia.webp",
    "social": "/media/service-heroes/prostate-treatment-in-purnia-social.jpg",
    "alt": "3D bladder and enlarged prostate illustration for prostate treatment in Purnia",
    "srcSet": "/media/service-heroes/prostate-treatment-in-purnia-480.webp 480w, /media/service-heroes/prostate-treatment-in-purnia-800.webp 800w, /media/service-heroes/prostate-treatment-in-purnia.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "srv-3": {
    "src": "/media/service-heroes/urine-infection-treatment-in-purnia.webp",
    "social": "/media/service-heroes/urine-infection-treatment-in-purnia-social.jpg",
    "alt": "3D urinary tract and inflamed bladder illustration for urine infection treatment in Purnia",
    "srcSet": "/media/service-heroes/urine-infection-treatment-in-purnia-480.webp 480w, /media/service-heroes/urine-infection-treatment-in-purnia-800.webp 800w, /media/service-heroes/urine-infection-treatment-in-purnia.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "srv-4": {
    "src": "/media/service-heroes/male-infertility-treatment-in-purnia.webp",
    "social": "/media/service-heroes/male-infertility-treatment-in-purnia-social.jpg",
    "alt": "3D varicocele and sperm illustration for male infertility treatment in Purnia",
    "srcSet": "/media/service-heroes/male-infertility-treatment-in-purnia-480.webp 480w, /media/service-heroes/male-infertility-treatment-in-purnia-800.webp 800w, /media/service-heroes/male-infertility-treatment-in-purnia.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "srv-5": {
    "src": "/media/service-heroes/laparoscopic-robotic-urological-surgery.webp",
    "social": "/media/service-heroes/laparoscopic-robotic-urological-surgery-social.jpg",
    "alt": "3D kidney model with laparoscopic instruments and a close-up of robotic surgical instruments",
    "srcSet": "/media/service-heroes/laparoscopic-robotic-urological-surgery-480.webp 480w, /media/service-heroes/laparoscopic-robotic-urological-surgery-800.webp 800w, /media/service-heroes/laparoscopic-robotic-urological-surgery.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "srv-6": {
    "src": "/media/service-heroes/urinary-incontinence-overactive-bladder.webp",
    "social": "/media/service-heroes/urinary-incontinence-overactive-bladder-social.jpg",
    "alt": "3D bladder, pelvic floor and nerve illustrations explaining urinary incontinence and overactive bladder",
    "srcSet": "/media/service-heroes/urinary-incontinence-overactive-bladder-480.webp 480w, /media/service-heroes/urinary-incontinence-overactive-bladder-800.webp 800w, /media/service-heroes/urinary-incontinence-overactive-bladder.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "srv-7": {
    "src": "/media/service-heroes/erectile-dysfunction-treatment-in-purnia.webp",
    "social": "/media/service-heroes/erectile-dysfunction-treatment-in-purnia-social.jpg",
    "alt": "3D blood vessel and erectile tissue illustration for erectile dysfunction treatment in Purnia",
    "srcSet": "/media/service-heroes/erectile-dysfunction-treatment-in-purnia-480.webp 480w, /media/service-heroes/erectile-dysfunction-treatment-in-purnia-800.webp 800w, /media/service-heroes/erectile-dysfunction-treatment-in-purnia.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "srv-8": {
    "src": "/media/service-heroes/kidney-transplantation-post-transplant-care.webp",
    "social": "/media/service-heroes/kidney-transplantation-post-transplant-care-social.jpg",
    "alt": "3D urinary system showing a donor kidney in the lower abdomen and its blood vessel connections",
    "srcSet": "/media/service-heroes/kidney-transplantation-post-transplant-care-480.webp 480w, /media/service-heroes/kidney-transplantation-post-transplant-care-800.webp 800w, /media/service-heroes/kidney-transplantation-post-transplant-care.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "srv-9": {
    "src": "/media/service-heroes/dialysis-access-surgery-av-fistula-creation.webp",
    "social": "/media/service-heroes/dialysis-access-surgery-av-fistula-creation-social.jpg",
    "alt": "3D forearm illustration showing an artery-to-vein fistula and ultrasound assessment for dialysis access",
    "srcSet": "/media/service-heroes/dialysis-access-surgery-av-fistula-creation-480.webp 480w, /media/service-heroes/dialysis-access-surgery-av-fistula-creation-800.webp 800w, /media/service-heroes/dialysis-access-surgery-av-fistula-creation.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "srv-10": {
    "src": "/media/service-heroes/prostate-cancer-screening-radical-prostatectomy.webp",
    "social": "/media/service-heroes/prostate-cancer-screening-radical-prostatectomy-social.jpg",
    "alt": "3D prostate model showing a focal lesion alongside scan review for prostate cancer assessment",
    "srcSet": "/media/service-heroes/prostate-cancer-screening-radical-prostatectomy-480.webp 480w, /media/service-heroes/prostate-cancer-screening-radical-prostatectomy-800.webp 800w, /media/service-heroes/prostate-cancer-screening-radical-prostatectomy.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "srv-11": {
    "src": "/media/service-heroes/kidney-cancer-surgery-nephrectomy.webp",
    "social": "/media/service-heroes/kidney-cancer-surgery-nephrectomy-social.jpg",
    "alt": "3D kidney cutaway showing a kidney mass and instruments used to explain surgical options",
    "srcSet": "/media/service-heroes/kidney-cancer-surgery-nephrectomy-480.webp 480w, /media/service-heroes/kidney-cancer-surgery-nephrectomy-800.webp 800w, /media/service-heroes/kidney-cancer-surgery-nephrectomy.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "srv-12": {
    "src": "/media/service-heroes/bladder-testicular-cancer-treatment.webp",
    "social": "/media/service-heroes/bladder-testicular-cancer-treatment-social.jpg",
    "alt": "Separate 3D bladder and testis cutaways showing lesions alongside cystoscopy and ultrasound views",
    "srcSet": "/media/service-heroes/bladder-testicular-cancer-treatment-480.webp 480w, /media/service-heroes/bladder-testicular-cancer-treatment-800.webp 800w, /media/service-heroes/bladder-testicular-cancer-treatment.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "srv-13": {
    "src": "/media/service-heroes/pediatric-urology-congenital-reconstruction.webp",
    "social": "/media/service-heroes/pediatric-urology-congenital-reconstruction-social.jpg",
    "alt": "3D kidney and bladder illustration showing a dilated kidney collecting system with paediatric ultrasound assessment",
    "srcSet": "/media/service-heroes/pediatric-urology-congenital-reconstruction-480.webp 480w, /media/service-heroes/pediatric-urology-congenital-reconstruction-800.webp 800w, /media/service-heroes/pediatric-urology-congenital-reconstruction.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "ent-1": {
    "src": "/media/service-heroes/ear-infections-and-chronic-ear-discharge.webp",
    "social": "/media/service-heroes/ear-infections-and-chronic-ear-discharge-social.jpg",
    "alt": "3D ear cutaway showing inflammation and middle-ear fluid with an otoscope examination",
    "srcSet": "/media/service-heroes/ear-infections-and-chronic-ear-discharge-480.webp 480w, /media/service-heroes/ear-infections-and-chronic-ear-discharge-800.webp 800w, /media/service-heroes/ear-infections-and-chronic-ear-discharge.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "ent-2": {
    "src": "/media/service-heroes/hearing-loss-and-hearing-aids.webp",
    "social": "/media/service-heroes/hearing-loss-and-hearing-aids-social.jpg",
    "alt": "3D ear and cochlear hair cell illustrations with a behind-the-ear hearing aid",
    "srcSet": "/media/service-heroes/hearing-loss-and-hearing-aids-480.webp 480w, /media/service-heroes/hearing-loss-and-hearing-aids-800.webp 800w, /media/service-heroes/hearing-loss-and-hearing-aids.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "ent-3": {
    "src": "/media/service-heroes/sinusitis-and-nasal-allergies.webp",
    "social": "/media/service-heroes/sinusitis-and-nasal-allergies-social.jpg",
    "alt": "3D facial sinus and nasal passage cutaway with pollen and swollen nasal lining details",
    "srcSet": "/media/service-heroes/sinusitis-and-nasal-allergies-480.webp 480w, /media/service-heroes/sinusitis-and-nasal-allergies-800.webp 800w, /media/service-heroes/sinusitis-and-nasal-allergies.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "ent-4": {
    "src": "/media/service-heroes/tonsil-and-adenoid-problems.webp",
    "social": "/media/service-heroes/tonsil-and-adenoid-problems-social.jpg",
    "alt": "3D head and throat cutaway showing enlarged tonsils and adenoids with a throat examination",
    "srcSet": "/media/service-heroes/tonsil-and-adenoid-problems-480.webp 480w, /media/service-heroes/tonsil-and-adenoid-problems-800.webp 800w, /media/service-heroes/tonsil-and-adenoid-problems.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "ent-5": {
    "src": "/media/service-heroes/mouth-ulcers-and-throat-cancer-screening.webp",
    "social": "/media/service-heroes/mouth-ulcers-and-throat-cancer-screening-social.jpg",
    "alt": "3D mouth and tongue illustration showing an oral ulcer and a clinical mouth examination",
    "srcSet": "/media/service-heroes/mouth-ulcers-and-throat-cancer-screening-480.webp 480w, /media/service-heroes/mouth-ulcers-and-throat-cancer-screening-800.webp 800w, /media/service-heroes/mouth-ulcers-and-throat-cancer-screening.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "medicine-1": {
    "src": "/media/service-heroes/dengue-malaria-and-seasonal-fever-care.webp",
    "social": "/media/service-heroes/dengue-malaria-and-seasonal-fever-care-social.jpg",
    "alt": "3D bloodstream and mosquito illustration with temperature checking and blood sample assessment",
    "srcSet": "/media/service-heroes/dengue-malaria-and-seasonal-fever-care-480.webp 480w, /media/service-heroes/dengue-malaria-and-seasonal-fever-care-800.webp 800w, /media/service-heroes/dengue-malaria-and-seasonal-fever-care.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "medicine-2": {
    "src": "/media/service-heroes/jaundice-and-hepatitis-assessment.webp",
    "social": "/media/service-heroes/jaundice-and-hepatitis-assessment-social.jpg",
    "alt": "3D liver and bile duct illustration with microscopic virus detail and blood test review",
    "srcSet": "/media/service-heroes/jaundice-and-hepatitis-assessment-480.webp 480w, /media/service-heroes/jaundice-and-hepatitis-assessment-800.webp 800w, /media/service-heroes/jaundice-and-hepatitis-assessment.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "medicine-3": {
    "src": "/media/service-heroes/diarrhoea-and-gastrointestinal-infections.webp",
    "social": "/media/service-heroes/diarrhoea-and-gastrointestinal-infections-social.jpg",
    "alt": "3D stomach and intestinal illustration with intestinal lining detail, water and a sample container",
    "srcSet": "/media/service-heroes/diarrhoea-and-gastrointestinal-infections-480.webp 480w, /media/service-heroes/diarrhoea-and-gastrointestinal-infections-800.webp 800w, /media/service-heroes/diarrhoea-and-gastrointestinal-infections.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "medicine-4": {
    "src": "/media/service-heroes/skin-and-eye-infection-assessment.webp",
    "social": "/media/service-heroes/skin-and-eye-infection-assessment-social.jpg",
    "alt": "Separate 3D eye and skin illustrations showing inflammation and clinical examination",
    "srcSet": "/media/service-heroes/skin-and-eye-infection-assessment-480.webp 480w, /media/service-heroes/skin-and-eye-infection-assessment-800.webp 800w, /media/service-heroes/skin-and-eye-infection-assessment.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "medicine-5": {
    "src": "/media/service-heroes/diabetes-and-blood-pressure-management.webp",
    "social": "/media/service-heroes/diabetes-and-blood-pressure-management-social.jpg",
    "alt": "3D pancreas and artery illustrations with blood glucose testing and an upper-arm blood pressure cuff",
    "srcSet": "/media/service-heroes/diabetes-and-blood-pressure-management-480.webp 480w, /media/service-heroes/diabetes-and-blood-pressure-management-800.webp 800w, /media/service-heroes/diabetes-and-blood-pressure-management.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "anaesthesia-1": {
    "src": "/media/service-heroes/pre-anaesthesia-assessment.webp",
    "social": "/media/service-heroes/pre-anaesthesia-assessment-social.jpg",
    "alt": "3D airway and heart models with a pre-anaesthesia consultation and fingertip oxygen monitoring",
    "srcSet": "/media/service-heroes/pre-anaesthesia-assessment-480.webp 480w, /media/service-heroes/pre-anaesthesia-assessment-800.webp 800w, /media/service-heroes/pre-anaesthesia-assessment.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "anaesthesia-2": {
    "src": "/media/service-heroes/general-and-regional-anaesthesia.webp",
    "social": "/media/service-heroes/general-and-regional-anaesthesia-social.jpg",
    "alt": "3D anaesthesia illustration showing a face mask and a lumbar spine model without an inserted needle",
    "srcSet": "/media/service-heroes/general-and-regional-anaesthesia-480.webp 480w, /media/service-heroes/general-and-regional-anaesthesia-800.webp 800w, /media/service-heroes/general-and-regional-anaesthesia.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "anaesthesia-3": {
    "src": "/media/service-heroes/labour-and-c-section-anaesthesia.webp",
    "social": "/media/service-heroes/labour-and-c-section-anaesthesia-social.jpg",
    "alt": "3D labour and C-section anaesthesia planning illustration with a covered pregnant patient, spine model and monitoring",
    "srcSet": "/media/service-heroes/labour-and-c-section-anaesthesia-480.webp 480w, /media/service-heroes/labour-and-c-section-anaesthesia-800.webp 800w, /media/service-heroes/labour-and-c-section-anaesthesia.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "anaesthesia-4": {
    "src": "/media/service-heroes/pain-management.webp",
    "social": "/media/service-heroes/pain-management-social.jpg",
    "alt": "3D back, shoulder and nerve illustration with a clinical shoulder movement assessment",
    "srcSet": "/media/service-heroes/pain-management-480.webp 480w, /media/service-heroes/pain-management-800.webp 800w, /media/service-heroes/pain-management.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "anaesthesia-5": {
    "src": "/media/service-heroes/emergency-and-critical-care-support.webp",
    "social": "/media/service-heroes/emergency-and-critical-care-support-social.jpg",
    "alt": "3D critical care illustration showing oxygen support, fingertip monitoring, lung detail and an ECG display",
    "srcSet": "/media/service-heroes/emergency-and-critical-care-support-480.webp 480w, /media/service-heroes/emergency-and-critical-care-support-800.webp 800w, /media/service-heroes/emergency-and-critical-care-support.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "neurology-1": {
    "src": "/media/service-heroes/stroke-symptoms-and-follow-up-in-purnia.webp",
    "social": "/media/service-heroes/stroke-symptoms-and-follow-up-in-purnia-social.jpg",
    "alt": "3D brain and blocked artery illustration for stroke symptoms and follow-up in Purnia",
    "srcSet": "/media/service-heroes/stroke-symptoms-and-follow-up-in-purnia-480.webp 480w, /media/service-heroes/stroke-symptoms-and-follow-up-in-purnia-800.webp 800w, /media/service-heroes/stroke-symptoms-and-follow-up-in-purnia.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "neurology-2": {
    "src": "/media/service-heroes/migraine-headache-consultation-in-purnia.webp",
    "social": "/media/service-heroes/migraine-headache-consultation-in-purnia-social.jpg",
    "alt": "3D head and facial nerve illustration for migraine and headache consultation in Purnia",
    "srcSet": "/media/service-heroes/migraine-headache-consultation-in-purnia-480.webp 480w, /media/service-heroes/migraine-headache-consultation-in-purnia-800.webp 800w, /media/service-heroes/migraine-headache-consultation-in-purnia.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "neurology-3": {
    "src": "/media/service-heroes/epilepsy-seizure-assessment-in-purnia.webp",
    "social": "/media/service-heroes/epilepsy-seizure-assessment-in-purnia-social.jpg",
    "alt": "3D brain and synapse illustration with an EEG cap for epilepsy and seizure assessment in Purnia",
    "srcSet": "/media/service-heroes/epilepsy-seizure-assessment-in-purnia-480.webp 480w, /media/service-heroes/epilepsy-seizure-assessment-in-purnia-800.webp 800w, /media/service-heroes/epilepsy-seizure-assessment-in-purnia.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "neurology-4": {
    "src": "/media/service-heroes/numbness-tingling-assessment-in-purnia.webp",
    "social": "/media/service-heroes/numbness-tingling-assessment-in-purnia-social.jpg",
    "alt": "3D hand and foot nerve illustration with a light-touch examination for numbness and tingling assessment in Purnia",
    "srcSet": "/media/service-heroes/numbness-tingling-assessment-in-purnia-480.webp 480w, /media/service-heroes/numbness-tingling-assessment-in-purnia-800.webp 800w, /media/service-heroes/numbness-tingling-assessment-in-purnia.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "neurology-5": {
    "src": "/media/service-heroes/memory-loss-assessment-in-purnia.webp",
    "social": "/media/service-heroes/memory-loss-assessment-in-purnia-social.jpg",
    "alt": "3D brain and hippocampus illustration with a consultation for memory loss assessment in Purnia",
    "srcSet": "/media/service-heroes/memory-loss-assessment-in-purnia-480.webp 480w, /media/service-heroes/memory-loss-assessment-in-purnia-800.webp 800w, /media/service-heroes/memory-loss-assessment-in-purnia.webp 1200w",
    "width": 1200,
    "height": 800
  }
};
