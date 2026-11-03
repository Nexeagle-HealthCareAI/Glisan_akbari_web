import { SERVICE_IMAGES } from './serviceImages';

// Editorial targets from a public search review on 2 November 2026.
// No search-volume or difficulty measurements are available. Consultation and
// assessment wording deliberately avoids claiming unconfirmed treatment services.
export const NEUROLOGY_PATH = '/services/neurology';
export const NEUROLOGY_SEO = {
  title: 'Neurology Care in Purnia | Glisan Akbari Hospital',
  description: 'Explore neurology care in Purnia: headache, seizure, nerve and memory concerns. Contact Glisan Akbari Hospital, Line Bazar, to check specialist appointments.',
  heading: 'Neurology care in Purnia',
  keywords: ['neurology care in Purnia', 'neurology consultation in Purnea', 'brain and nerve care in Purnia'],
  introduction: 'Looking for neurology care in Purnia? Start with your concern, understand what to bring, and ask the hospital which specialist appointment is appropriate for you.',
  image: {
    src: '/media/neurology/neurology-care-in-purnia.svg',
    social: '/media/neurology/neurology-care-in-purnia.png',
    alt: 'Brain and nerve illustration introducing neurology care in Purnia',
  },
};

export type NeurologyTopic = {
  id: string;
  slug: string;
  label: string;
  title: string;
  heading: string;
  seoTitle: string;
  seoDescription: string;
  keywords: [string, string, string];
  summary: string;
  introduction: string;
  concerns: string[];
  assessment: string;
  discussion: string;
  preparation: string[];
  emergency: string;
  faqs: { question: string; answer: string }[];
  references: { label: string; url: string }[];
  related: string[];
  imageAlt: string;
};

export const NEUROLOGY_TOPICS: NeurologyTopic[] = [
  {
    id: 'neurology-1', slug: 'stroke-symptoms-and-follow-up-in-purnia', label: 'Stroke guidance',
    title: 'Stroke Assessment & Emergency Guidance',
    heading: 'Stroke symptoms and follow-up in Purnia',
    seoTitle: 'Stroke Symptoms and Follow-up in Purnia | Glisan Akbari',
    seoDescription: 'Understand stroke symptoms and follow-up in Purnia. Sudden weakness or speech changes need emergency help. Ask Glisan Akbari about planned review appointments.',
    keywords: ['stroke symptoms and follow-up in Purnia', 'post-stroke consultation in Purnea', 'stroke follow-up in Purnia'],
    summary: 'Recognise sudden changes that need emergency care, and prepare questions for a planned review after hospital discharge.',
    introduction: 'This guide to stroke symptoms and follow-up in Purnia separates an emergency from a planned review. A routine booking is only for someone who is stable after emergency assessment.',
    concerns: ['Sudden facial drooping, arm weakness or speech difficulty', 'New changes after a previous stroke', 'Questions about a discharge or recovery plan'],
    assessment: 'At a planned review, take your discharge summary, scans and medicine list. Discuss changes in movement, communication and everyday activities.',
    discussion: 'Ask who will coordinate follow-up and whether you need referrals for movement, speech or daily living support. Recovery differs between people; this page does not promise a timetable or confirm local rehabilitation facilities.',
    preparation: ['Carry the discharge summary and scan reports.', 'Bring the current prescription and questions from your family.', 'Check the appropriate specialist and appointment timing before travelling.'],
    emergency: 'Sudden face drooping, one-sided weakness or speech difficulty needs emergency medical help immediately, even if symptoms stop. Do not wait for a routine appointment or a website reply.',
    faqs: [
      { question: 'Can I book a routine appointment for new stroke symptoms?', answer: 'No. Seek emergency care immediately. A planned follow-up appointment cannot replace emergency assessment.' },
      { question: 'Does this page confirm a stroke unit at Glisan Akbari?', answer: 'No. Contact the hospital to confirm planned review services. A dedicated stroke unit, emergency imaging and stroke procedures are not confirmed here.' },
      { question: 'What should I ask before a follow-up visit?', answer: 'Ask which specialist will see you, which reports to bring, the consultation fee and whether any referral needs arranging separately.' },
    ],
    references: [
      { label: 'NHS: recognising stroke symptoms', url: 'https://www.nhs.uk/conditions/stroke/symptoms/' },
      { label: 'NHS: recovery after a stroke', url: 'https://www.nhs.uk/conditions/stroke/recovery/' },
    ],
    related: ['neurology-4', 'neurology-5'],
    imageAlt: SERVICE_IMAGES['neurology-1'].alt,
  },
  {
    id: 'neurology-2', slug: 'migraine-headache-consultation-in-purnia', label: 'Headache & migraine',
    title: 'Headache & Migraine Management',
    heading: 'Migraine and headache consultation in Purnia',
    seoTitle: 'Migraine and Headache Consultation in Purnia | Glisan Akbari',
    seoDescription: 'Planning a migraine and headache consultation in Purnia? Prepare a symptom diary and questions. Ask Glisan Akbari Hospital about the right specialist visit.',
    keywords: ['migraine and headache consultation in Purnia', 'migraine assessment in Purnea', 'headache consultation in Purnia'],
    summary: 'Repeated headaches can interrupt work, study and family life. Record the pattern and ask about the right assessment.',
    introduction: 'Preparing for a migraine and headache consultation in Purnia? Note how often headaches happen, what they feel like and how they affect your day. Not every headache is migraine.',
    concerns: ['Headaches that recur or disrupt daily activities', 'Pain with nausea or sensitivity to light and sound', 'Changing headache patterns or frequent painkiller use'],
    assessment: 'A clinician reviews the pattern, medicines and examination findings. Further tests depend on the assessment; a scan is not automatically required for every headache.',
    discussion: 'Ask about managing attacks, reducing triggers and whether preventive care is appropriate. Treatment depends on the diagnosis. This information does not establish which medicines or procedures the hospital provides.',
    preparation: ['Bring a headache diary and your current medicine list.', 'Note previous assessments and any existing scan reports.', 'Confirm the appropriate specialist, timing and fee with reception.'],
    emergency: 'A sudden extremely severe headache, or headache with new weakness, speech problems or confusion, needs immediate emergency care. Do not wait for a routine consultation.',
    faqs: [
      { question: 'Does every headache mean migraine?', answer: 'No. Headaches have several causes. A clinician assesses the symptoms before discussing a diagnosis or treatment.' },
      { question: 'What is useful to record in a headache diary?', answer: 'Record the date, duration, effect on daily activities, possible triggers and medicines taken.' },
      { question: 'Can I check appointment options before visiting?', answer: 'Yes. Contact the hospital on 9234606330 to check the right specialist, appointment timing and fees. New emergency symptoms need immediate emergency care.' },
    ],
    references: [
      { label: 'NHS: migraine symptoms and management', url: 'https://www.nhs.uk/conditions/migraine/' },
    ],
    related: ['neurology-3', 'neurology-4'],
    imageAlt: SERVICE_IMAGES['neurology-2'].alt,
  },
  {
    id: 'neurology-3', slug: 'epilepsy-seizure-assessment-in-purnia', label: 'Epilepsy & seizures',
    title: 'Epilepsy & Seizure Evaluation',
    heading: 'Epilepsy and seizure assessment in Purnia',
    seoTitle: 'Epilepsy and Seizure Assessment in Purnia | Glisan Akbari',
    seoDescription: 'Prepare for epilepsy and seizure assessment in Purnia. Learn which episode details and reports to bring, and check specialist options at Glisan Akbari.',
    keywords: ['epilepsy and seizure assessment in Purnia', 'seizure consultation in Purnea', 'epilepsy assessment in Purnia'],
    summary: 'Episodes of shaking, loss of awareness or unusual sensations need a clear history and appropriate medical assessment.',
    introduction: 'For epilepsy and seizure assessment in Purnia, a description of what happened before, during and after an episode is useful. Having a seizure does not always mean a person has epilepsy.',
    concerns: ['Episodes of shaking or loss of awareness', 'Unusual sensations or unresponsive staring spells', 'Questions about an existing diagnosis or care plan'],
    assessment: 'A specialist reviews the episode history and may advise tests such as an EEG, blood tests or imaging. These are possible investigations, not confirmed on-site services.',
    discussion: 'Bring someone who witnessed the episode if possible. Ask about the diagnosis, medicine review and an individual seizure care plan. Do not stop or change prescribed seizure medicine without the treating clinician.',
    preparation: ['Write down when the episode happened and how long it lasted.', 'Bring previous prescriptions, EEG reports and scan reports if available.', 'Ask reception which specialist can assess your concern.'],
    emergency: 'Seek emergency help for a first seizure, one lasting more than five minutes, repeated seizures without recovery, breathing difficulty or serious injury. Follow an existing emergency care plan when available.',
    faqs: [
      { question: 'Does a seizure always mean epilepsy?', answer: 'No. Seizures can have different causes. A specialist considers the history and any relevant investigations.' },
      { question: 'Is an EEG available at this hospital?', answer: 'EEG availability has not been confirmed for this page. Ask the hospital whether testing is available or a referral is needed.' },
      { question: 'Can a family member help at the consultation?', answer: 'Yes. Someone who saw the episode can help describe it. Ask the hospital about appointment arrangements before visiting.' },
    ],
    references: [
      { label: 'NHS: epilepsy and seizure assessment', url: 'https://www.nhs.uk/conditions/epilepsy/' },
    ],
    related: ['neurology-2', 'neurology-5'],
    imageAlt: SERVICE_IMAGES['neurology-3'].alt,
  },
  {
    id: 'neurology-4', slug: 'numbness-tingling-assessment-in-purnia', label: 'Numbness & nerve concerns',
    title: 'Numbness, Tingling & Nerve Problems',
    heading: 'Numbness and tingling assessment in Purnia',
    seoTitle: 'Numbness and Tingling Assessment in Purnia | Glisan Akbari',
    seoDescription: 'Plan a numbness and tingling assessment in Purnia. Understand which symptoms and reports to discuss, and check appointment options at Glisan Akbari Hospital.',
    keywords: ['numbness and tingling assessment in Purnia', 'nerve problem assessment in Purnea', 'neuropathy consultation in Purnia'],
    summary: 'Persistent pins and needles, burning discomfort or altered sensation deserve assessment of the pattern and possible cause.',
    introduction: 'A numbness and tingling assessment in Purnia starts with where the symptoms occur and when they began. Similar sensations can have different causes, so symptoms alone cannot confirm neuropathy.',
    concerns: ['Persistent numbness or pins and needles in hands or feet', 'Burning or shooting discomfort', 'Changes in strength, balance or everyday hand movements'],
    assessment: 'A clinician may examine sensation, strength and reflexes. Blood tests or nerve studies may be considered depending on the findings; not everyone needs the same tests.',
    discussion: 'Discuss existing diabetes, injuries and medicines. Management depends on the underlying cause. Ask whether further investigation or referral is appropriate and where any recommended testing would take place.',
    preparation: ['Note the affected area, start date and any changes.', 'Bring relevant reports and a list of medicines.', 'Confirm the specialist and any testing arrangements before travelling.'],
    emergency: 'Sudden one-sided numbness or weakness, especially with facial drooping or speech difficulty, needs immediate emergency medical help. Do not wait for a routine appointment.',
    faqs: [
      { question: 'Does tingling always mean nerve damage?', answer: 'No. A clinician needs to assess the pattern and possible causes before explaining the diagnosis.' },
      { question: 'Will I need a nerve conduction test?', answer: 'It depends on the assessment. Ask whether testing is appropriate and confirm where it is available.' },
      { question: 'Can I bring existing reports?', answer: 'Yes. Existing blood tests, prescriptions and previous nerve or scan reports can help you explain what has already been assessed.' },
    ],
    references: [
      { label: 'NHS: peripheral neuropathy', url: 'https://www.nhs.uk/conditions/peripheral-neuropathy/' },
      { label: 'NHS: assessment and nerve investigations', url: 'https://www.nhs.uk/conditions/peripheral-neuropathy/diagnosis/' },
      { label: 'NHS: sudden stroke symptoms', url: 'https://www.nhs.uk/conditions/stroke/symptoms/' },
    ],
    related: ['neurology-2', 'neurology-1'],
    imageAlt: SERVICE_IMAGES['neurology-4'].alt,
  },
  {
    id: 'neurology-5', slug: 'memory-loss-assessment-in-purnia', label: 'Memory & concentration',
    title: 'Memory & Cognitive Disorders',
    heading: 'Memory loss assessment in Purnia',
    seoTitle: 'Memory Loss Assessment in Purnia | Glisan Akbari Hospital',
    seoDescription: 'Preparing for memory loss assessment in Purnia? Record changes in daily activities and bring a family member. Check specialist options at Glisan Akbari.',
    keywords: ['memory loss assessment in Purnia', 'memory consultation in Purnea', 'forgetfulness assessment in Purnia'],
    summary: 'Repeated forgetfulness or changes in daily tasks can worry the whole family. Bring examples and ask about appropriate assessment.',
    introduction: 'Memory loss assessment in Purnia can help start a conversation about repeated forgetfulness or difficulty with familiar tasks. Memory problems do not automatically mean dementia.',
    concerns: ['Repeated questions or missed familiar tasks', 'Changes in concentration noticed by family', 'Memory concerns that affect day-to-day life'],
    assessment: 'A clinician asks about the changes and their effect on daily life. Sleep difficulties, stress and other health problems may contribute. Further specialist assessment or tests depend on the findings.',
    discussion: 'Bring someone who knows your usual routine. Ask about possible causes, the right specialist and next steps. Treatment depends on the cause; this page does not confirm a dedicated memory clinic or dementia programme.',
    preparation: ['Write a few examples and when the changes started.', 'Bring previous assessments and a current medicine list.', 'Ask about the right appointment and whether a companion can attend.'],
    emergency: 'Sudden confusion, speech difficulty or new one-sided weakness needs urgent emergency assessment. Do not treat an abrupt change as ordinary forgetfulness.',
    faqs: [
      { question: 'Is memory loss always dementia?', answer: 'No. Memory problems have several possible causes. Seek assessment rather than trying to diagnose the cause yourself.' },
      { question: 'Should a family member come along?', answer: 'A companion can help describe changes and bring questions. Check appointment arrangements with the hospital.' },
      { question: 'Does this hospital have a dedicated memory clinic?', answer: 'A dedicated memory clinic has not been confirmed. Contact reception to ask about suitable assessment or referral options.' },
    ],
    references: [
      { label: 'NHS: memory loss and assessment', url: 'https://www.nhs.uk/symptoms/memory-loss-amnesia/' },
      { label: 'NHS: sudden stroke symptoms', url: 'https://www.nhs.uk/conditions/stroke/symptoms/' },
    ],
    related: ['neurology-3', 'neurology-1'],
    imageAlt: SERVICE_IMAGES['neurology-5'].alt,
  },
];

export function neurologyTopicPath(topic: NeurologyTopic) {
  return `${NEUROLOGY_PATH}/${topic.slug}`;
}

export function neurologyTopicImage(topic: NeurologyTopic) {
  return SERVICE_IMAGES[topic.id];
}
