import { DOCTORS, UROLOGY_SERVICES, type UrologyServiceItem } from './config';

export type CareService = Pick<UrologyServiceItem, 'id' | 'title' | 'description'> &
  Partial<Pick<UrologyServiceItem, 'slug' | 'symptoms' | 'explainerVideo'>>;

export type CareDepartment = {
  id: string;
  label: string;
  proposed?: boolean;
  doctorDepartment?: string;
  services: CareService[];
};

// These are educational topics proposed for review, not confirmed hospital services.
// Keep Urology's original objects, copy and media untouched.
export const CARE_DEPARTMENTS: CareDepartment[] = [
  { id: 'urology', label: 'Urology', doctorDepartment: 'Urology', services: UROLOGY_SERVICES },
  {
    id: 'ent', label: 'ENT (Ear, Nose & Throat)', doctorDepartment: 'ENT', proposed: true,
    services: [
      { id: 'ent-1', title: 'Ear Infections & Chronic Ear Discharge', description: 'Ear pain or repeated discharge can have different causes. A consultation can help you understand what needs assessment.' },
      { id: 'ent-2', title: 'Hearing Loss & Hearing Aids', description: 'Discuss changes in hearing, ringing in the ears and difficulty following conversations. Hearing tests can help clarify whether hearing aids may be suitable.' },
      { id: 'ent-3', title: 'Sinusitis & Nasal Allergies', description: 'A blocked or runny nose, sneezing and facial pressure are useful concerns to discuss. Assessment can help distinguish allergies from other causes.' },
      { id: 'ent-4', title: 'Tonsil & Adenoid Problems', description: 'Repeated sore throats, snoring or difficulty breathing through the nose may need assessment. A doctor can discuss possible causes and next steps.' },
      { id: 'ent-5', title: 'Mouth Ulcers & Throat Cancer Screening', description: 'Discuss persistent mouth ulcers, white patches, voice changes or swallowing problems, including any tobacco use. A clinician can advise whether further examination is needed.' },
    ],
  },
  {
    id: 'general-medicine', label: 'General Medicine', proposed: true,
    services: [
      { id: 'medicine-1', title: 'Dengue, Malaria & Seasonal Fever Care', description: 'Fever, body aches and tiredness can have many causes. A doctor can review your symptoms and advise whether tests are needed.' },
      { id: 'medicine-2', title: 'Jaundice & Hepatitis Assessment', description: 'Yellowing of the eyes or skin, dark urine and unusual tiredness need medical assessment. Discuss when these changes started and any medicines you take.' },
      { id: 'medicine-3', title: 'Diarrhoea & Gastrointestinal Infections', description: 'Discuss loose stools, vomiting or stomach discomfort, including how long they have lasted and whether you can drink fluids. Assessment can help identify the cause.' },
      { id: 'medicine-4', title: 'Skin & Eye Infection Assessment', description: 'Redness, irritation, swelling or discharge can have different causes. A clinician can assess your concerns and advise whether a specialist review is needed.' },
      { id: 'medicine-5', title: 'Diabetes & Blood Pressure Management', description: 'Bring any blood sugar or blood pressure records and your current medicines. Discuss monitoring, follow-up and questions about your care plan with a doctor.' },
    ],
  },
  {
    id: 'anesthesiology', label: 'Anesthesiology', doctorDepartment: 'Anesthesiology', proposed: true,
    services: [
      { id: 'anaesthesia-1', title: 'Pre-Anaesthesia Assessment', description: 'Before a procedure, discuss your health history, medicines, allergies and any past experience with anaesthesia. This helps the care team plan for your individual needs.' },
      { id: 'anaesthesia-2', title: 'General & Regional Anaesthesia', description: 'General anaesthesia and regional anaesthesia work in different ways. The anaesthetist can explain which approach may suit your procedure and health.' },
      { id: 'anaesthesia-3', title: 'Labour & C-Section Anaesthesia', description: 'Discuss pain relief and anaesthesia questions with your maternity team. Suitable options depend on your health, the birth plan and the facilities available.' },
      { id: 'anaesthesia-4', title: 'Pain Management', description: 'Explain where pain occurs, how long it lasts and how it affects daily life. An assessment can guide a discussion about suitable pain management options.' },
      { id: 'anaesthesia-5', title: 'Emergency & Critical Care Support', description: 'Anaesthesia teams may support breathing and monitoring during serious illness or emergency procedures. This topic does not confirm emergency or critical care facilities at this hospital.' },
    ],
  },
  {
    id: 'neurology', label: 'Neurology', doctorDepartment: 'Neurology', proposed: true,
    services: [
      { id: 'neurology-1', title: 'Stroke Assessment & Emergency Guidance', description: 'Sudden face drooping, arm weakness or speech difficulty needs immediate emergency medical attention. Do not wait for a website response or routine appointment.' },
      { id: 'neurology-2', title: 'Headache & Migraine Management', description: 'Discuss headache patterns, triggers and their effect on daily life. An assessment can help clarify the cause and appropriate next steps.' },
      { id: 'neurology-3', title: 'Epilepsy & Seizure Evaluation', description: 'Describe any episodes of shaking, loss of awareness or unusual sensations, including how long they lasted. A doctor can advise on further assessment.' },
      { id: 'neurology-4', title: 'Numbness, Tingling & Nerve Problems', description: 'Discuss where numbness or tingling occurs, when it began and whether there is weakness. These symptoms can have several causes that need assessment.' },
      { id: 'neurology-5', title: 'Memory & Cognitive Disorders', description: 'Discuss changes in memory, concentration or everyday tasks, including when they started. A clinician can review possible causes and advise on assessment.' },
    ],
  },
];

export function getCareDepartment(pathname: string) {
  const path = pathname.replace(/\/+$/, '') || '/';
  return CARE_DEPARTMENTS.find((department) => careDepartmentPath(department.id) === path)
    || CARE_DEPARTMENTS[0];
}

export function careDepartmentPath(id: string) {
  return id === 'urology' ? '/services' : `/services/${id}`;
}

export function getCareDoctor(department: CareDepartment) {
  return department.doctorDepartment
    ? DOCTORS.find((doctor) => doctor.department === department.doctorDepartment && doctor.bookingUrl)
    : undefined;
}
