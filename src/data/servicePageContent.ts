import { DOCTORS, DOCTOR_PROFILE, HOSPITAL_PHONE_HREF, UROLOGY_SERVICES, type UrologyServiceItem } from './config';
import { SERVICE_MARKETING } from './serviceMarketing';
import { SERVICE_IMAGES, type CareImage } from './serviceImages';
import { CARE_DEPARTMENTS, careDepartmentPath } from './careDepartments';
import { NEUROLOGY_TOPICS, NEUROLOGY_PATH, neurologyTopicPath, type NeurologyTopic } from './neurology';
import { ADDITIONAL_CARE_TOPICS, additionalTopicPath, type AdditionalCareTopic } from './additionalCareTopics';
import { DOCTOR_PORTRAIT_IMAGE } from './pageImages';

export type ServicePageContent = {
  id: string; path: string; departmentId: string; departmentName: string; departmentPath: string;
  title: string; introduction: string; summary: string; image: CareImage;
  concernHeading: string; concern: string; consultation: string;
  overview: string[]; symptoms: string[]; assessment: string[];
  options: { name: string; description: string }[]; optionsHeading: string; optionsIntro: string;
  risks: string; preparation: string[]; faqs: { question: string; answer: string }[];
  references: { label: string; url: string }[]; notice: string; urgent: boolean;
  followUp: string; related: { id: string; to: string; title: string; description: string; image: CareImage }[];
  doctor?: { name: string; title: string; qualifications: string; experience: string; languages: string; image?: string; portrait?: CareImage; profilePath?: string; initials: string; timings: string };
  actionHref: string; actionLabel: string; mobileActionLabel: string; appointmentNote?: string;
  video?: { src: string; poster: string };
};

function specialist(departmentId: string) {
  const names: Record<string, string> = { urology: 'Urology', neurology: 'Neurology', ent: 'ENT', anesthesiology: 'Anesthesiology' };
  const doctor = DOCTORS.find(item => item.department === names[departmentId]);
  if (!doctor) return undefined;
  return {
    name: doctor.name,
    title: departmentId === 'urology' ? DOCTOR_PROFILE.professionalTitle
      : departmentId === 'neurology' ? 'Consultant Neurosurgeon'
      : departmentId === 'ent' ? 'ENT Specialist' : 'Anaesthesiology & Critical Care',
    qualifications: doctor.qualifications, experience: doctor.yearsOfExperience,
    languages: doctor.languages, image: doctor.profileImage,
    portrait: doctor.profileImage ? DOCTOR_PORTRAIT_IMAGE : undefined,
    profilePath: doctor.slug ? '/doctors/' + doctor.slug : undefined,
    initials: doctor.initials || doctor.name.split(' ').slice(-2).map(word => word[0]).join(''),
    timings: doctor.consultationTimings.replace('via DoctorDekho', '').replace('Mon - Sat:', 'Monday–Saturday ·').trim(),
  };
}

function appointment(departmentId: string) {
  const departments: Record<string, string> = { urology: 'Urology', neurology: 'Neurology', ent: 'ENT', anesthesiology: 'Anesthesiology' };
  const doctor = DOCTORS.find(item => item.department === departments[departmentId]);
  return {
    doctor: specialist(departmentId), actionHref: doctor?.bookingUrl || HOSPITAL_PHONE_HREF,
    actionLabel: departmentId === 'neurology' ? 'Check appointment options'
      : doctor ? 'Book a consultation' : 'Call for an appointment',
    mobileActionLabel: departmentId === 'urology' ? 'Consult Dr. Noori' : doctor ? 'Book consultation' : 'Call for care',
    appointmentNote: departmentId === 'neurology'
      ? 'Dr Asif Iqbal is listed as a Consultant Neurosurgeon. Ask which specialist appointment fits your concern.' : undefined,
  };
}

export function urologyServiceContent(service: UrologyServiceItem): ServicePageContent {
  const marketing = SERVICE_MARKETING[service.id];
  return {
    id: service.id, path: '/services/' + service.slug, departmentId: 'urology', departmentName: 'Urology Services',
    departmentPath: careDepartmentPath('urology'), title: service.title,
    introduction: service.tagline || service.description, summary: service.description,
    image: service.featuredImage || SERVICE_IMAGES[service.id],
    concernHeading: marketing.heading, concern: marketing.concern, consultation: marketing.consultation,
    overview: marketing.introduction || service.overview, symptoms: service.symptoms,
    assessment: service.assessment || ['Your consultation starts with your symptoms, health history and any reports you already have. Your doctor will explain which further assessment is useful for your situation.'],
    options: service.procedures,
    optionsHeading: service.id === 'srv-1' ? 'Kidney stone laser surgery and other treatment options' : 'Care and treatment options',
    optionsIntro: service.id === 'srv-1'
      ? 'Care at Glisan Akbari includes monitoring, medicines, RIRS, URSL and PCNL. The right choice depends on your stone and your health.'
      : 'Discuss the choices that fit your assessment, what each involves and the alternatives. Your doctor will help you plan the next step.',
    risks: service.risks || 'Ask about the benefits, limitations and possible side effects of the care being recommended. If a procedure is advised, discuss its individual risks, alternatives and expected recovery before deciding.',
    preparation: service.preparation, faqs: service.faqs,
    references: service.references || [{ label: 'NIDDK: urologic disease information', url: 'https://www.niddk.nih.gov/health-information/urologic-diseases' }],
    notice: marketing.note || service.patientNotes,
    urgent: ['srv-1', 'srv-2', 'srv-3', 'srv-7', 'srv-12'].includes(service.id),
    followUp: 'Ask when to return for a review, what progress to expect and which changes need earlier attention. If a procedure is advised, discuss recovery, medicines and any planned device or stent removal.',
    related: marketing.related.flatMap(id => {
      const item = UROLOGY_SERVICES.find(candidate => candidate.id === id);
      return item ? [{ id, to: '/services/' + item.slug, title: item.title, description: item.description, image: SERVICE_IMAGES[id] }] : [];
    }),
    ...appointment('urology'),
    ...(service.id === 'srv-1' ? { video: { src: '/media/services/kidney-stones.mp4', poster: '/media/services/kidney-stones-poster.jpg' } } : {}),
  };
}

const neurologicalChoices: Record<string, { name: string; description: string }[]> = {
  'neurology-1': [
    { name: 'Emergency assessment', description: 'New stroke symptoms need emergency care immediately. A routine follow-up appointment is for someone who is stable after emergency assessment.' },
    { name: 'Review after discharge', description: 'Bring the discharge summary and scans so the clinician can discuss your recovery and ongoing care plan.' },
    { name: 'Coordinated follow-up', description: 'Ask who will coordinate medicines, rehabilitation questions and any referrals you may need.' },
  ],
  'neurology-2': [
    { name: 'Understand the pattern', description: 'A headache diary helps you describe frequency, duration, possible triggers and the effect on your day.' },
    { name: 'Discuss suitable treatment', description: 'Ask about managing attacks and whether a preventive approach fits the diagnosis.' },
    { name: 'Arrange a review', description: 'Discuss when to return, how to record progress and what changes need prompt assessment.' },
  ],
  'neurology-3': [
    { name: 'Describe the episode', description: 'A witness account of what happened before, during and after the event can help the clinician understand it.' },
    { name: 'Discuss further assessment', description: 'Tests depend on the clinical history and examination. Ask what each suggested investigation may clarify.' },
    { name: 'Review ongoing care', description: 'If you already have a diagnosis, bring your prescription and discuss control, side effects and follow-up.' },
  ],
  'neurology-4': [
    { name: 'Review the symptoms', description: 'Describe the affected areas, when the changes began and whether there is weakness or pain.' },
    { name: 'Assess possible causes', description: 'An examination and selected tests can guide the discussion. Not everyone needs the same investigations.' },
    { name: 'Plan cause-specific care', description: 'Ask about suitable care, follow-up and whether another specialist should be involved.' },
  ],
  'neurology-5': [
    { name: 'Describe everyday changes', description: 'Bring examples of changes in memory, concentration or familiar tasks, ideally with someone who knows your usual routine.' },
    { name: 'Review contributing factors', description: 'Discuss sleep, stress, medicines and other health conditions that may be relevant to the assessment.' },
    { name: 'Agree the next steps', description: 'Ask about suitable support, further assessment and a follow-up plan based on what is found.' },
  ],
};

export function neurologyServiceContent(topic: NeurologyTopic): ServicePageContent {
  return {
    id: topic.id, path: neurologyTopicPath(topic), departmentId: 'neurology', departmentName: 'Neurology', departmentPath: NEUROLOGY_PATH,
    title: topic.heading, introduction: topic.introduction, summary: topic.summary, image: SERVICE_IMAGES[topic.id],
    concernHeading: topic.title, concern: topic.summary,
    consultation: 'Before a planned visit, ask which specialist should assess your concern and which existing reports to bring. You do not need to know the diagnosis to ask for help.',
    overview: [topic.discussion], assessment: [topic.assessment], symptoms: topic.concerns,
    options: neurologicalChoices[topic.id], optionsHeading: 'Assessment, care and next steps', optionsIntro: topic.discussion,
    risks: 'Assessment helps guide an individual plan. Ask about the benefits and possible side effects of any proposed treatment, its alternatives and when to seek earlier review. Continue prescribed care until you have discussed changes with your treating clinician.',
    preparation: topic.preparation, faqs: topic.faqs, references: topic.references, notice: topic.emergency, urgent: true,
    followUp: 'Ask who will coordinate your follow-up, what to record between visits and which changes need urgent medical attention. Bring your questions and current prescription to each review.',
    related: topic.related.flatMap(id => { const item = NEUROLOGY_TOPICS.find(candidate => candidate.id === id); return item ? [{ id, to: neurologyTopicPath(item), title: item.title, description: item.summary, image: SERVICE_IMAGES[id] }] : []; }),
    ...appointment('neurology'),
  };
}

export function additionalServiceContent(topic: AdditionalCareTopic): ServicePageContent {
  const department = CARE_DEPARTMENTS.find(item => item.id === topic.departmentId)!;
  return {
    id: topic.id, path: additionalTopicPath(topic), departmentId: topic.departmentId, departmentName: department.label,
    departmentPath: careDepartmentPath(topic.departmentId), title: topic.title,
    introduction: topic.summary, summary: topic.summary, image: SERVICE_IMAGES[topic.id],
    concernHeading: topic.concern, concern: topic.overview[0], overview: topic.overview.slice(1),
    consultation: 'Bring your questions, existing reports and current medicines. Discuss what the assessment means, which care fits your needs and how follow-up will work.',
    assessment: topic.assessment, symptoms: topic.symptoms, options: topic.options,
    optionsHeading: topic.departmentId === 'anesthesiology' ? 'Your assessment and care plan' : 'Care and treatment options',
    optionsIntro: 'The right approach depends on your symptoms, examination and health history. Your clinician will explain suitable choices and alternatives.',
    risks: topic.risks, preparation: topic.preparation, faqs: topic.faqs, references: topic.references,
    notice: topic.urgent || 'Your assessment and care plan are individual. Bring existing records and discuss your questions with the clinical team.', urgent: Boolean(topic.urgent),
    followUp: topic.followUp || 'Ask when to return, what to watch for and how to contact the team if your condition changes. Keep a copy of the care plan and follow the instructions given to you.',
    related: ADDITIONAL_CARE_TOPICS.filter(item => item.departmentId === topic.departmentId && item.id !== topic.id).slice(0, 3).map(item => ({id:item.id,to:additionalTopicPath(item),title:item.title,description:item.summary,image:SERVICE_IMAGES[item.id]})),
    ...appointment(topic.departmentId),
  };
}

export function getServicePage(path: string): ServicePageContent | undefined {
  const normalized = path.replace(/\/+$/, '');
  const urology = UROLOGY_SERVICES.find(item => '/services/' + item.slug === normalized);
  if (urology) return urologyServiceContent(urology);
  const neurology = NEUROLOGY_TOPICS.find(item => neurologyTopicPath(item) === normalized);
  if (neurology) return neurologyServiceContent(neurology);
  const additional = ADDITIONAL_CARE_TOPICS.find(item => additionalTopicPath(item) === normalized);
  if (additional) return additionalServiceContent(additional);
}
