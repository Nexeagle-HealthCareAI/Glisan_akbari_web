/**
 * Patient information for the 15 additional department topics.
 * Neutral service labels only: keyword research and city-page targeting are deferred.
 * Clinical references support general education; they do not imply medical review by a hospital doctor.
 */
export type AdditionalCareTopic = {
  id: string;
  departmentId: 'ent' | 'general-medicine' | 'anesthesiology';
  slug: string;
  title: string;
  summary: string;
  concern: string;
  overview: string[];
  assessment: string[];
  symptoms: string[];
  options: { name: string; description: string }[];
  risks: string;
  preparation: string[];
  faqs: { question: string; answer: string }[];
  references: { label: string; url: string }[];
  urgent?: string;
  followUp?: string;
};

export function additionalTopicPath(topic: Pick<AdditionalCareTopic, 'departmentId' | 'slug'>) {
  return `/services/${topic.departmentId}/${topic.slug}`;
}

export const ADDITIONAL_CARE_TOPICS: AdditionalCareTopic[] = [
  {
    id: 'ent-1', departmentId: 'ent', slug: 'ear-infections-chronic-discharge',
    title: 'Ear Infections & Chronic Ear Discharge',
    summary: 'Ear pain or repeated discharge can have different causes. A consultation can help you understand what needs assessment.',
    concern: 'Has ear pain or discharge returned again?',
    overview: [
      'An ear infection can affect different parts of the ear. Pain, discharge or reduced hearing needs an examination to understand the cause.',
      'For repeated episodes, explain how often they happen and what treatment you have tried. Bring previous prescriptions so the ENT doctor can see the full pattern.',
    ],
    assessment: [
      'The doctor asks about pain, fever, discharge and hearing changes, then examines the ear with a lighted instrument.',
      'Ask whether the eardrum is affected and whether further assessment is needed. The next step depends on the examination rather than the appearance of discharge alone.',
    ],
    symptoms: ['Earache, pressure or irritation', 'Fluid or discharge from the ear, especially when it keeps returning', 'Hearing changes, dizziness or fever alongside ear symptoms'],
    options: [
      { name: 'Treatment matched to the cause', description: 'The examination guides whether medicines, ear drops or another approach is appropriate.' },
      { name: 'Assessment of recurring discharge', description: 'Discuss repeated episodes and whether specialist cleaning or further investigation is needed.' },
      { name: 'Hearing and follow-up review', description: 'Tell the doctor if hearing has not returned after earlier treatment, and ask when it should be checked again.' },
    ],
    risks: 'Ear treatments differ by the cause and condition of the eardrum. Ask which drops are suitable and how to use prescribed treatment; avoid putting objects or unprescribed remedies inside the ear.',
    preparation: ['Bring earlier ear prescriptions and any hearing-test reports.', 'Record when discharge started, whether it smells or contains blood, and any hearing change.', 'Mention diabetes, immune problems, allergies and medicines you take.'],
    faqs: [
      { question: 'Does every ear infection need antibiotics?', answer: 'No. Treatment depends on the cause and which part of the ear is affected. The doctor will explain the examination findings.' },
      { question: 'Should repeated discharge be checked even if it is not painful?', answer: 'Yes. Arrange an ENT review and describe how often it happens, including any hearing changes.' },
      { question: 'Can I use an old bottle of ear drops?', answer: 'Ask a clinician first. A previous prescription may not be suitable for the current problem or the condition of your eardrum.' },
    ],
    urgent: 'Seek urgent assessment for new hearing loss, swelling around the ear, severe dizziness or ear symptoms with a high fever or feeling very unwell.',
    followUp: 'Ask what improvement to expect and when to return if discharge or hearing changes continue.',
    references: [{ label: 'NHS: ear infections', url: 'https://www.nhs.uk/conditions/ear-infections/' }],
  },
  {
    id: 'ent-2', departmentId: 'ent', slug: 'hearing-loss-hearing-aids',
    title: 'Hearing Loss & Hearing Aids',
    summary: 'Discuss changes in hearing, ringing in the ears and difficulty following conversations. Hearing tests can help clarify whether hearing aids may be suitable.',
    concern: 'Are conversations becoming harder to follow?',
    overview: [
      'Hearing changes may develop gradually or suddenly. Some causes can be treated, while others need ongoing hearing support.',
      'Describe the situations that are difficult, such as telephone calls or conversation in a busy room. Those details help make the assessment useful to everyday life.',
    ],
    assessment: [
      'An ear examination and hearing assessment help establish the type and extent of hearing loss. Mention whether one or both ears are affected.',
      'Bring earlier test results and any hearing aids you already use. Discuss ringing, dizziness, noise exposure and changes since your last assessment.',
    ],
    symptoms: ['Difficulty following speech or needing the television louder', 'One ear hearing less clearly than the other', 'Ringing, a blocked sensation or hearing changes after an ear problem'],
    options: [
      { name: 'Check for treatable causes', description: 'Earwax or an infection may need attention before the hearing-support plan is decided.' },
      { name: 'Discuss hearing aids', description: 'If suitable, hearing aids are selected and adjusted to your hearing needs, with advice on use and care.' },
      { name: 'Plan ongoing support', description: 'Ask about follow-up, communication strategies and whether another specialist assessment is appropriate.' },
    ],
    risks: 'Hearing aids may make sound clearer but do not restore perfect hearing. Fit, adjustment and follow-up matter; ask about expected benefit, device care and any costs before choosing.',
    preparation: ['Bring previous hearing tests and details of ear operations or infections.', 'Bring existing hearing aids, accessories and information about difficulties using them.', 'Write down when the change began and the listening situations that matter most to you.'],
    faqs: [
      { question: 'Do all hearing problems need a hearing aid?', answer: 'No. The cause and hearing-test findings guide treatment and whether a device could help.' },
      { question: 'Will a hearing aid restore normal hearing?', answer: 'It can help make sounds louder and speech clearer, but it does not make hearing perfect. Discuss realistic expectations and adjustments.' },
      { question: 'What happens after a hearing aid is fitted?', answer: 'Ask about a review to check comfort, settings and use. Tell the team about situations where hearing is still difficult.' },
    ],
    urgent: 'Sudden hearing loss in either ear needs urgent medical assessment. Do not wait for a routine hearing-aid appointment.',
    followUp: 'Keep your hearing-review appointments and report new or sudden changes promptly.',
    references: [
      { label: 'NHS: hearing loss', url: 'https://www.nhs.uk/conditions/hearing-loss/' },
      { label: 'NHS: hearing aids and implants', url: 'https://www.nhs.uk/tests-and-treatments/hearing-aids-and-implants/' },
    ],
  },
  {
    id: 'ent-3', departmentId: 'ent', slug: 'sinusitis-nasal-allergies',
    title: 'Sinusitis & Nasal Allergies',
    summary: 'A blocked or runny nose, sneezing and facial pressure are useful concerns to discuss. Assessment can help distinguish allergies from other causes.',
    concern: 'Is a blocked nose disrupting sleep or daily life?',
    overview: [
      'Sinus inflammation and nasal allergies can cause overlapping symptoms. The duration and pattern help the doctor work out what may be contributing.',
      'Explain whether symptoms follow a cold, return in particular seasons or occur around dust and other triggers. Mention effects on sleep, smell and daily activities.',
    ],
    assessment: [
      'The ENT doctor reviews symptoms and examines the nose. Further tests depend on the findings and whether the problem is persistent or keeps returning.',
      'Bring details of sprays and other medicines already used, including how long you used them. Ask what the assessment suggests and how the next treatment will be reviewed.',
    ],
    symptoms: ['A blocked or runny nose with sneezing or itching', 'Pressure or discomfort around the cheeks, eyes or forehead', 'Reduced sense of smell or symptoms that keep returning'],
    options: [
      { name: 'Symptom-directed treatment', description: 'The doctor may discuss nasal treatment or other medicines according to the likely cause.' },
      { name: 'Review possible allergy triggers', description: 'A pattern of symptoms may help guide practical trigger advice and whether allergy assessment is useful.' },
      { name: 'Further ENT assessment', description: 'Persistent or recurring problems may need a further review. An operation is considered only when appropriate.' },
    ],
    risks: 'Different nasal medicines have different instructions and side effects. Ask how to use them and when to review progress; antibiotics are not automatically needed for sinus symptoms.',
    preparation: ['Note how long symptoms last and whether they affect one or both sides.', 'Bring earlier prescriptions and any relevant scan or allergy reports.', 'Mention asthma, allergies, other medicines and treatments that have not helped.'],
    faqs: [
      { question: 'Do sinus symptoms always mean an infection?', answer: 'No. Allergy and other nasal problems may cause similar symptoms. An examination helps guide the next step.' },
      { question: 'Will I need a scan or an operation?', answer: 'Not everyone does. Your history, examination and response to treatment guide whether further assessment is needed.' },
      { question: 'What should I ask about a prescribed nasal spray?', answer: 'Ask about the technique, how long to use it, possible side effects and when the doctor wants to review you.' },
    ],
    urgent: 'Get urgent medical assessment if nasal or sinus symptoms become severe, worsen quickly or are accompanied by feeling very unwell.',
    followUp: 'Tell the doctor if symptoms persist despite the agreed treatment or repeatedly affect sleep and daily life.',
    references: [
      { label: 'NHS: sinusitis', url: 'https://www.nhs.uk/conditions/sinusitis-sinus-infection/' },
      { label: 'NHS: allergic rhinitis', url: 'https://www.nhs.uk/conditions/allergic-rhinitis/' },
    ],
  },
  {
    id: 'ent-4', departmentId: 'ent', slug: 'tonsil-adenoid-problems',
    title: 'Tonsil & Adenoid Problems',
    summary: 'Repeated sore throats, snoring or difficulty breathing through the nose may need assessment. A doctor can discuss possible causes and next steps.',
    concern: 'Are sore throats or noisy sleep happening repeatedly?',
    overview: [
      'Repeated tonsil infections and enlarged adenoids can affect children and, in some situations, adults. Symptoms need assessment before choosing a treatment.',
      'Bring a record of sore-throat episodes and describe sleep, breathing and hearing concerns. Explain the effect on eating, school, work and family routines.',
    ],
    assessment: [
      'The ENT doctor reviews the history and examines the throat. Tests may be considered where they would help explain the symptoms.',
      'For a child, describe snoring, mouth breathing and any pauses in breathing during sleep. Ask which concerns need monitoring and which need further investigation.',
    ],
    symptoms: ['Repeated sore throats, painful swallowing or fever with throat symptoms', 'Snoring, mouth breathing or difficulty breathing through the nose', 'Repeated ear problems or disturbed sleep alongside throat or nasal concerns'],
    options: [
      { name: 'Monitoring and review', description: 'Some problems can be monitored while the family records episodes and follows the agreed review plan.' },
      { name: 'Treatment for the current problem', description: 'Care depends on the cause. Antibiotics are considered for appropriate bacterial infections rather than every sore throat.' },
      { name: 'Discuss surgery when appropriate', description: 'Selected recurring infections or obstructive symptoms may need a discussion about tonsil or adenoid surgery.' },
    ],
    risks: 'If an operation is suggested, ask about pain, bleeding, anaesthesia, time away from school or work, and the recovery instructions. Surgery is not automatically needed for enlarged tonsils or adenoids.',
    preparation: ['Bring records of infections, treatment and missed school or work.', 'Describe the child’s sleep and any witnessed breathing pauses.', 'List medicines, allergies and earlier operations or anaesthesia problems.'],
    faqs: [
      { question: 'Does snoring always mean an operation is needed?', answer: 'No. Describe the pattern and any breathing pauses so the ENT doctor can assess what needs checking.' },
      { question: 'Does every sore throat need antibiotics?', answer: 'No. Tonsillitis may be viral or bacterial, and treatment depends on the assessment.' },
      { question: 'What should parents ask before surgery?', answer: 'Ask why it is recommended, what alternatives exist, how recovery is managed and what bleeding or breathing changes require urgent help.' },
    ],
    urgent: 'Difficulty breathing, inability to swallow, marked throat swelling or a rapidly worsening severe sore throat needs urgent medical care.',
    followUp: 'Keep a record of further episodes and attend the review agreed with the ENT team.',
    references: [
      { label: 'NHS: tonsillitis', url: 'https://www.nhs.uk/conditions/tonsillitis/' },
      { label: 'NHS: adenoidectomy', url: 'https://www.nhs.uk/tests-and-treatments/adenoidectomy/' },
    ],
  },
  {
    id: 'ent-5', departmentId: 'ent', slug: 'mouth-ulcers-throat-assessment',
    title: 'Mouth Ulcers & Throat Cancer Screening',
    summary: 'Discuss persistent mouth ulcers, white patches, voice changes or swallowing problems, including any tobacco use. A clinician can advise whether further examination is needed.',
    concern: 'Has an ulcer, patch or voice change failed to settle?',
    overview: [
      'Mouth ulcers and throat symptoms have many possible causes. A persistent change should be examined rather than assumed to be harmless or diagnosed from a photograph.',
      'This consultation is an assessment of your symptoms and risk history. A concerning finding may need specialist tests; an examination by itself does not establish or rule out every cancer.',
    ],
    assessment: [
      'The clinician asks how long the change has been present and examines the relevant area. Mention tobacco, khaini, gutkha and alcohol use openly.',
      'Depending on the findings, further examination, imaging or a tissue sample may be advised. Ask how results will reach you and what happens next.',
    ],
    symptoms: ['An ulcer lasting longer than three weeks or a persistent red or white patch', 'An unexplained mouth or neck lump, persistent hoarseness or swallowing difficulty', 'Mouth pain or other changes that do not settle'],
    options: [
      { name: 'Examination and cause assessment', description: 'Start by explaining the change and showing the area of concern to the clinician.' },
      { name: 'Further tests when indicated', description: 'A specialist may advise a biopsy or scans to clarify a concerning finding.' },
      { name: 'Plan treatment or referral', description: 'Care depends on the diagnosis. Ask which team will guide any further assessment and treatment.' },
    ],
    risks: 'A symptom does not automatically mean cancer, and a referral for tests is not a diagnosis. Avoid repeated self-treatment that delays examination of a persistent change.',
    preparation: ['Record when the ulcer, patch or voice change began.', 'Bring previous prescriptions, biopsy reports or scans if you have them.', 'Mention tobacco and alcohol use, medicines and any unexplained weight change.'],
    faqs: [
      { question: 'Does a white patch or ulcer mean cancer?', answer: 'Not necessarily. Several conditions can cause these changes, but persistent or unexplained symptoms need an examination.' },
      { question: 'Will every patient need a biopsy?', answer: 'No. The clinician recommends further tests according to the history and examination.' },
      { question: 'What does screening mean on this page?', answer: 'It means discussing risk factors and checking concerning mouth or throat changes. It is not a promise that one test can rule out cancer.' },
    ],
    urgent: 'Arrange prompt assessment for an ulcer lasting more than three weeks, a persistent patch, lump or hoarseness. Difficulty breathing or inability to swallow needs urgent care.',
    followUp: 'Make sure you know when to expect any test result and when to return if the change persists.',
    references: [
      { label: 'NHS: mouth ulcers', url: 'https://www.nhs.uk/conditions/mouth-ulcers/' },
      { label: 'NHS: symptoms of mouth cancer', url: 'https://www.nhs.uk/conditions/mouth-cancer/symptoms/' },
      { label: 'NHS: mouth cancer tests and next steps', url: 'https://www.nhs.uk/conditions/mouth-cancer/tests-and-next-steps/' },
    ],
  },
  {
    id: 'medicine-1', departmentId: 'general-medicine', slug: 'seasonal-fever-dengue-malaria',
    title: 'Dengue, Malaria & Seasonal Fever Care',
    summary: 'Fever, body aches and tiredness can have many causes. A doctor can review your symptoms and advise whether tests are needed.',
    concern: 'Have a fever and need to understand the cause?',
    overview: [
      'Fever can occur with many illnesses. Dengue and malaria need different approaches, so symptoms alone should not be used to choose treatment.',
      'Explain when the fever began, where you have recently been and what medicines or tests you have already had. Early assessment helps identify the next step.',
    ],
    assessment: [
      'The doctor reviews the fever pattern, associated symptoms and signs of dehydration or serious illness. Tests are selected according to the examination and timing.',
      'Bring actual test reports and note when the sample was taken. Ask whether you need a further review, because one result may not answer every question.',
    ],
    symptoms: ['Fever with headache, chills, body aches or unusual tiredness', 'Nausea, vomiting, rash or a change in appetite', 'Symptoms that persist, worsen or return after earlier treatment'],
    options: [
      { name: 'Assessment and appropriate testing', description: 'The clinician considers likely causes and advises which tests or repeat checks would help.' },
      { name: 'Cause-specific care', description: 'Treatment and fluid advice depend on the diagnosis. Do not use leftover antibiotics or malaria medicines without assessment.' },
      { name: 'Monitoring or admission', description: 'Concerning symptoms may require close monitoring or hospital treatment rather than routine follow-up.' },
    ],
    risks: 'A falling temperature does not always mean recovery in dengue. Ask which medicines are safe while the cause is being assessed and which changes should bring you back immediately.',
    preparation: ['Bring fever-test reports, prescriptions and a list of medicines already taken.', 'Note symptom start dates, recent travel and any earlier dengue or malaria illness.', 'Tell the doctor about pregnancy, diabetes, kidney problems or other ongoing conditions.'],
    faqs: [
      { question: 'Can symptoms alone distinguish dengue from malaria?', answer: 'No. A clinician uses your history, examination and appropriate tests to assess the cause.' },
      { question: 'Do all patients with fever need admission?', answer: 'No. The decision depends on the illness, hydration, warning signs and the person’s overall health.' },
      { question: 'What should I do if I feel worse after the fever drops?', answer: 'Seek medical review promptly, especially if there is pain, repeated vomiting, bleeding, breathing difficulty or marked weakness.' },
    ],
    urgent: 'Seek urgent care for severe abdominal pain, repeated vomiting, bleeding, confusion, breathing difficulty or marked weakness. Suspected malaria needs prompt medical treatment.',
    followUp: 'Follow the agreed review and test plan even if the fever settles, and return sooner for warning signs.',
    references: [
      { label: 'WHO: dengue and severe dengue', url: 'https://www.who.int/news-room/fact-sheets/detail/dengue-and-severe-dengue' },
      { label: 'NHS: malaria', url: 'https://www.nhs.uk/conditions/malaria/' },
    ],
  },
  {
    id: 'medicine-2', departmentId: 'general-medicine', slug: 'jaundice-hepatitis-assessment',
    title: 'Jaundice & Hepatitis Assessment',
    summary: 'Yellowing of the eyes or skin, dark urine and unusual tiredness need medical assessment. Discuss when these changes started and any medicines you take.',
    concern: 'Noticed yellow eyes, dark urine or unusual tiredness?',
    overview: [
      'Jaundice is a sign that needs medical assessment. Hepatitis is one possible cause, but liver, bile-duct and other conditions can also be involved.',
      'Describe when the change began and bring any earlier blood tests. Avoid choosing a treatment solely because someone else had similar symptoms.',
    ],
    assessment: [
      'The doctor reviews symptoms, medicines and health history and examines you. Blood tests or imaging may be advised to investigate the cause.',
      'Mention recent illness, travel, alcohol and supplements. If hepatitis is suspected, ask what any proposed test can explain and how results will guide care.',
    ],
    symptoms: ['Yellowing of the whites of the eyes or skin', 'Dark urine, pale stools, itching or upper abdominal discomfort', 'Unusual tiredness, nausea, reduced appetite or fever with these changes'],
    options: [
      { name: 'Find the cause', description: 'The initial aim is to understand why jaundice or abnormal liver results have appeared.' },
      { name: 'Treatment and monitoring', description: 'Care depends on the diagnosis and severity; different types of hepatitis are managed differently.' },
      { name: 'Specialist coordination', description: 'The doctor may advise further liver, digestive-system or hospital assessment where needed.' },
    ],
    risks: 'Some causes need urgent treatment. Medicines, alcohol and supplements may affect liver health, so discuss them openly and do not start a liver remedy or change prescribed treatment yourself.',
    preparation: ['Bring liver-function results, hepatitis reports and existing scans.', 'List prescribed medicines, supplements and remedies, including when you started them.', 'Record when yellowing, urine changes or other symptoms appeared.'],
    faqs: [
      { question: 'Does jaundice always mean hepatitis?', answer: 'No. There are several possible causes, so examination and appropriate tests matter.' },
      { question: 'Is every type of hepatitis spread in the same way?', answer: 'No. Causes and routes of spread differ. Ask for advice based on the diagnosis rather than assumptions.' },
      { question: 'Will I need to stay in hospital?', answer: 'The doctor decides according to the cause, severity and your general condition.' },
    ],
    urgent: 'New yellowing of the eyes or skin needs prompt medical assessment. Confusion, severe abdominal pain, repeated vomiting or feeling very unwell requires urgent care.',
    followUp: 'Ask when blood tests should be reviewed and what changes require an earlier assessment.',
    references: [
      { label: 'NHS: jaundice', url: 'https://www.nhs.uk/conditions/jaundice/' },
      { label: 'NHS: hepatitis', url: 'https://www.nhs.uk/conditions/hepatitis/' },
    ],
  },
  {
    id: 'medicine-3', departmentId: 'general-medicine', slug: 'diarrhoea-gastrointestinal-infections',
    title: 'Diarrhoea & Gastrointestinal Infections',
    summary: 'Discuss loose stools, vomiting or stomach discomfort, including how long they have lasted and whether you can drink fluids. Assessment can help identify the cause.',
    concern: 'Are loose stools or vomiting making it hard to drink?',
    overview: [
      'Stomach infections can cause diarrhoea and vomiting, but medicines and other conditions may cause similar symptoms. The assessment considers both the cause and hydration.',
      'Explain how often symptoms happen and whether you can keep fluids down. Babies, older people and people with other illnesses may need earlier review.',
    ],
    assessment: [
      'The doctor checks the symptom pattern, recent food or travel history and signs of dehydration. Tell them about blood in the stool, fever or significant pain.',
      'Tests are not needed for every episode. Blood or stool tests may be considered depending on duration, severity and examination findings.',
    ],
    symptoms: ['Loose stools, vomiting or abdominal discomfort', 'Thirst, dizziness or passing less urine than usual', 'Persistent symptoms, blood in the stool or difficulty keeping fluids down'],
    options: [
      { name: 'Assess and address dehydration', description: 'The clinician advises an appropriate fluid plan and whether oral support or hospital treatment is needed.' },
      { name: 'Care matched to the cause', description: 'Medicines and tests depend on the findings. Antibiotics are not a treatment for every stomach upset.' },
      { name: 'Review and prevention advice', description: 'Discuss when to return and how handwashing and food hygiene can help limit infection spread.' },
    ],
    risks: 'Dehydration can become serious. Tell the doctor about ongoing medicines and health conditions before taking remedies, and do not give an adult medicine to a child without advice.',
    preparation: ['Record the start date, number of episodes and ability to drink and pass urine.', 'Bring medicines and any recent test reports or antibiotic prescriptions.', 'Mention recent travel, shared meals, pregnancy and other people with similar symptoms.'],
    faqs: [
      { question: 'Does diarrhoea always need an antibiotic?', answer: 'No. The cause and severity guide treatment, and some episodes need supportive care rather than antibiotics.' },
      { question: 'When does vomiting need urgent review?', answer: 'Seek help if you cannot keep fluids down, pass much less urine, become confused or have other warning signs.' },
      { question: 'Can I wait for my planned appointment if symptoms worsen?', answer: 'Do not wait if there is significant dehydration, blood in vomit or stool, severe pain or marked illness.' },
    ],
    urgent: 'Seek urgent assessment if fluids will not stay down or urine becomes very reduced. Blood in vomit, confusion, fainting or sudden severe abdominal pain needs emergency care.',
    followUp: 'Ask when persistent symptoms need reassessment and follow any sample-collection instructions given.',
    references: [{ label: 'NHS: diarrhoea and vomiting', url: 'https://www.nhs.uk/symptoms/diarrhoea-and-vomiting/' }],
  },
  {
    id: 'medicine-4', departmentId: 'general-medicine', slug: 'skin-eye-infection-assessment',
    title: 'Skin & Eye Infection Assessment',
    summary: 'Redness, irritation, swelling or discharge can have different causes. A clinician can assess your concerns and advise whether a specialist review is needed.',
    concern: 'Have redness, swelling or discharge and need an assessment?',
    overview: [
      'A red eye or irritated skin is not always an infection. Allergy, inflammation and other causes may look similar, while some changes need urgent specialist assessment.',
      'Describe which area is affected and how quickly it is changing. Bring details of creams, drops or other treatment already used.',
    ],
    assessment: [
      'The clinician examines the affected area and reviews pain, fever, discharge and any change in vision. Mention contact-lens use, diabetes and immune problems.',
      'Further tests or a specialist referral depend on the findings. Ask whether the concern can be managed in general medicine or needs eye or skin specialist care.',
    ],
    symptoms: ['Redness, itching, irritation or discharge from the eyes', 'Skin that is painful, hot, swollen or spreading in redness', 'Symptoms that persist or worsen despite earlier treatment'],
    options: [
      { name: 'Clarify the cause', description: 'An examination helps distinguish infection from allergy or another problem before choosing treatment.' },
      { name: 'Condition-specific treatment', description: 'Drops, skin treatment or other medicines are chosen according to the diagnosis and individual needs.' },
      { name: 'Specialist or urgent review', description: 'Eye warning signs or a spreading skin problem may need prompt specialist or hospital assessment.' },
    ],
    risks: 'The wrong drops or cream can delay appropriate care. Do not reuse another person’s treatment; ask how to use prescribed medicines and what changes need reassessment.',
    preparation: ['Bring previous prescriptions and the names of creams or eye drops already used.', 'Record when symptoms started and whether swelling or redness is spreading.', 'Mention contact lenses, allergies, diabetes and medicines that affect immunity.'],
    faqs: [
      { question: 'Does every red eye need antibiotic drops?', answer: 'No. Infection, allergy and other causes need different approaches, and some eye symptoms need urgent specialist review.' },
      { question: 'Can I use the same treatment for skin and eye symptoms?', answer: 'No. Use medicines only for the purpose and area prescribed. Ask before applying a product around or inside the eye.' },
      { question: 'When should I return after starting treatment?', answer: 'Follow the clinician’s review plan, and seek earlier help if symptoms spread, pain increases, vision changes or you feel unwell.' },
    ],
    urgent: 'Eye pain, light sensitivity or a change in vision needs urgent assessment. Rapidly spreading painful swelling with fever, faintness or confusion needs urgent care.',
    followUp: 'Ask whether the affected area should be checked again and how to reduce spread if an infection is diagnosed.',
    references: [
      { label: 'NHS: conjunctivitis', url: 'https://www.nhs.uk/conditions/conjunctivitis/' },
      { label: 'NHS: cellulitis', url: 'https://www.nhs.uk/conditions/cellulitis/' },
    ],
  },
  {
    id: 'medicine-5', departmentId: 'general-medicine', slug: 'diabetes-blood-pressure-management',
    title: 'Diabetes & Blood Pressure Management',
    summary: 'Bring any blood sugar or blood pressure records and your current medicines. Discuss monitoring, follow-up and questions about your care plan with a doctor.',
    concern: 'Need a clearer plan for sugar or blood pressure readings?',
    overview: [
      'Diabetes and high blood pressure need an individual monitoring and treatment plan. Feeling well does not by itself show whether readings are within your agreed targets.',
      'Bring a record rather than relying on one remembered result. Discuss work, meals, activity, medicine use and anything that makes the plan difficult to follow.',
    ],
    assessment: [
      'The doctor reviews readings, medicines, earlier blood tests and other health conditions. Your diabetes type and circumstances matter when discussing treatment.',
      'Ask which checks are due and how often follow-up is needed. Bring the monitor or log you use at home if you have questions about measurements.',
    ],
    symptoms: ['A new high reading or uncertainty about results', 'Difficulty following a prescribed monitoring or medicine plan', 'Symptoms or side effects that have appeared during ongoing treatment'],
    options: [
      { name: 'Review readings and targets', description: 'Understand what your recent results show and which monitoring schedule is appropriate for you.' },
      { name: 'Discuss medicines and daily habits', description: 'Review benefit, side effects and practical changes with the doctor rather than adjusting treatment yourself.' },
      { name: 'Plan ongoing health checks', description: 'Ask which blood tests and other checks are needed and how results and follow-up will be coordinated.' },
    ],
    risks: 'Medicines and targets are individual. Do not stop or double treatment because of a single result or someone else’s advice; ask for a plan for unusual readings and days when you are ill.',
    preparation: ['Bring blood sugar or blood pressure records with dates and times.', 'List all medicines, doses as prescribed, supplements and any missed doses or side effects.', 'Bring earlier blood tests and questions about home monitoring or daily routines.'],
    faqs: [
      { question: 'Can I use someone else’s treatment targets?', answer: 'No. Ask the doctor which targets and monitoring plan fit your health and treatment.' },
      { question: 'Should I stop medicines when my readings improve?', answer: 'Discuss any change with the prescribing clinician. Better readings may be a result of treatment.' },
      { question: 'What if I am unsure how to use my home monitor?', answer: 'Bring the device or its details and your log so you can ask about the measurement technique and how to record results.' },
    ],
    urgent: 'Chest pain, severe breathing difficulty, new one-sided weakness, collapse or confusion needs urgent medical care. Follow any emergency plan already given by your diabetes team.',
    followUp: 'Leave with a clear review date, a monitoring plan and instructions on whom to contact for concerning readings.',
    references: [
      { label: 'NHS: treatment and follow-up for type 2 diabetes', url: 'https://www.nhs.uk/conditions/type-2-diabetes/treatment/' },
      { label: 'NHS: high blood pressure', url: 'https://www.nhs.uk/conditions/high-blood-pressure/' },
    ],
  },
  {
    id: 'anaesthesia-1', departmentId: 'anesthesiology', slug: 'pre-anaesthesia-assessment',
    title: 'Pre-Anaesthesia Assessment',
    summary: 'Before a procedure, discuss your health history, medicines, allergies and any past experience with anaesthesia. This helps the care team plan for your individual needs.',
    concern: 'Preparing for a procedure and have questions about anaesthesia?',
    overview: [
      'A pre-anaesthesia assessment helps the team understand your health before an operation or procedure. It is a chance to discuss questions and plan the appropriate approach.',
      'Tell the team about prescribed medicines, supplements and any earlier anaesthesia problem. Written information is useful when several doctors are involved in your care.',
    ],
    assessment: [
      'The assessment reviews health conditions, allergies, medicines and past operations. The team may advise selected examinations or tests when needed.',
      'The anaesthetist discusses suitable options, risks and preparation. Ask for clear instructions about eating, drinking and medicines rather than following a general internet timetable.',
    ],
    symptoms: ['A planned operation or procedure requiring anaesthesia advice', 'An earlier reaction, severe sickness or other concern during anaesthesia', 'Questions about medicines, allergies or existing heart, lung or other conditions'],
    options: [
      { name: 'Review health and previous experiences', description: 'Share your history so the team can identify issues that may affect the plan.' },
      { name: 'Discuss the anaesthetic approach', description: 'Understand suitable options and how pain relief, monitoring and recovery will be managed.' },
      { name: 'Receive individual preparation instructions', description: 'Clarify fasting, medicines, arrival arrangements and the support you may need afterwards.' },
    ],
    risks: 'Anaesthetic risks depend on your health and the procedure. An assessment helps planning but cannot remove every risk; ask about your individual concerns and any recommended changes.',
    preparation: ['Bring the operation or procedure details, referral note and earlier test reports.', 'Bring a complete medicine list, including supplements and any blood-thinning medicines.', 'Describe allergies, earlier anaesthesia problems and relevant family experiences.'],
    faqs: [
      { question: 'Should I stop my usual medicines before assessment?', answer: 'Do not change prescribed medicines yourself. The team will give instructions specific to you and your procedure.' },
      { question: 'Does everyone need the same pre-operative tests?', answer: 'No. Tests depend on the planned procedure, health history and assessment.' },
      { question: 'Where do I get fasting instructions?', answer: 'Follow the instructions from your treating anaesthesia and surgical team. Ask if they are unclear or your circumstances change.' },
    ],
    followUp: 'Tell the team about a new illness or medicine change before the procedure, and keep the written preparation instructions available.',
    references: [{ label: 'Royal College of Anaesthetists: you and your anaesthetic', url: 'https://rcoa.ac.uk/patients/patient-information-resources/patient-information-leaflets-video-resources/you-your-anaesthetic' }],
  },
  {
    id: 'anaesthesia-2', departmentId: 'anesthesiology', slug: 'general-regional-anaesthesia',
    title: 'General & Regional Anaesthesia',
    summary: 'General anaesthesia and regional anaesthesia work in different ways. The anaesthetist can explain which approach may suit your procedure and health.',
    concern: 'Unsure what being asleep or having an area numbed means?',
    overview: [
      'General anaesthesia makes you unconscious for a procedure. Regional anaesthesia numbs a larger area of the body; the team may discuss sedation as part of the plan.',
      'The choice depends on the operation and your health, as well as the options that are suitable. Share your preferences and concerns during the assessment.',
    ],
    assessment: [
      'The anaesthetist reviews the planned procedure, medicines, allergies and earlier experiences, then explains the proposed approach.',
      'Ask what you may be aware of, how you will be monitored and how pain will be managed afterwards. The team explains whether a combination of methods is appropriate.',
    ],
    symptoms: ['A procedure for which general or regional anaesthesia has been proposed', 'Questions about awareness, discomfort, needles or recovery', 'A history of an anaesthetic reaction or difficulty with earlier pain relief'],
    options: [
      { name: 'General anaesthesia', description: 'Medicines produce unconsciousness while the anaesthesia team monitors you throughout the procedure.' },
      { name: 'Regional anaesthesia', description: 'An appropriate area is numbed, such as with a spinal, epidural or nerve block. Suitability depends on the procedure.' },
      { name: 'Combined care and recovery planning', description: 'Different methods may be combined. Ask about pain relief, side effects and the plan if the approach needs to change.' },
    ],
    risks: 'Possible effects vary by method and can include sickness, soreness or temporary numbness. Serious complications are also possible; ask the anaesthetist to explain risks relevant to you.',
    preparation: ['Bring your procedure details and complete medicine list.', 'Mention allergies, loose teeth or dental work and previous anaesthesia experiences.', 'Confirm the team’s instructions on eating, drinking and arrangements for going home.'],
    faqs: [
      { question: 'Can I always choose the type of anaesthetic?', answer: 'Your preferences matter, but some methods are not suitable for every operation or health condition. Discuss the available choices with the anaesthetist.' },
      { question: 'Will I be awake with regional anaesthesia?', answer: 'You may be awake, or sedation or general anaesthesia may be used alongside it. Ask what is planned for your procedure.' },
      { question: 'Who explains pain relief after the procedure?', answer: 'Ask the anaesthesia and treating team about the recovery plan, prescribed medicines and when to seek advice.' },
    ],
    followUp: 'Follow your discharge instructions and contact the team if symptoms do not settle as expected or you are worried about recovery.',
    references: [
      { label: 'NHS: general anaesthetic', url: 'https://www.nhs.uk/tests-and-treatments/general-anaesthesia/' },
      { label: 'NHS: epidural anaesthesia', url: 'https://www.nhs.uk/tests-and-treatments/epidural/' },
    ],
  },
  {
    id: 'anaesthesia-3', departmentId: 'anesthesiology', slug: 'labour-caesarean-anaesthesia',
    title: 'Labour & C-Section Anaesthesia',
    summary: 'Discuss pain relief and anaesthesia questions with your maternity team. Suitable options depend on your health, the birth plan and the facilities available.',
    concern: 'Want to understand pain relief and anaesthesia for birth?',
    overview: [
      'Labour pain relief and anaesthesia for a caesarean are related but different decisions. Your maternity and anaesthesia teams plan care around you and the baby.',
      'Discuss your questions during pregnancy where possible. In an urgent situation, the team explains the safest appropriate approach for the circumstances.',
    ],
    assessment: [
      'The anaesthetist reviews your pregnancy history, health, medicines, allergies and previous anaesthesia or birth experiences.',
      'Ask how the proposed option works, what you may feel and what alternatives exist. The plan may change according to progress in labour or the urgency of delivery.',
    ],
    symptoms: ['Questions about pain relief during labour', 'A planned caesarean or a discussion about possible operative delivery', 'An earlier difficult anaesthetic, reaction or concern you want to explain'],
    options: [
      { name: 'Discuss labour pain-relief options', description: 'Your maternity team explains options, including whether an epidural is appropriate for you.' },
      { name: 'Regional anaesthesia for caesarean', description: 'A spinal or epidural may numb the lower body while you remain awake, where clinically suitable.' },
      { name: 'General anaesthesia when needed', description: 'A general anaesthetic may be used when urgency or clinical factors make it the appropriate approach.' },
    ],
    risks: 'Each method has benefits, limits and possible side effects. Ask about your individual risks and recovery; one birth plan cannot guarantee a particular anaesthetic or delivery experience.',
    preparation: ['Bring your antenatal records and details of any proposed delivery plan.', 'List medicines, allergies and earlier spinal, epidural or general anaesthesia experiences.', 'Ask your maternity team when to discuss anaesthesia and how preparation instructions will be provided.'],
    faqs: [
      { question: 'Is an epidural the same as a general anaesthetic?', answer: 'No. An epidural numbs part of the body, while a general anaesthetic makes you unconscious.' },
      { question: 'Will I be awake during a caesarean?', answer: 'Many caesareans use a spinal or epidural so the mother is awake. The anaesthetist explains what is appropriate in your situation.' },
      { question: 'Can the plan change during labour?', answer: 'Yes. Clinical needs and the urgency of delivery may change. The treating team will explain the options and reasons.' },
    ],
    followUp: 'Follow the maternity team’s recovery instructions and tell them promptly about concerns after the birth or anaesthetic.',
    references: [
      { label: 'NHS: caesarean section', url: 'https://www.nhs.uk/tests-and-treatments/caesarean-section/' },
      { label: 'NHS: epidural anaesthesia', url: 'https://www.nhs.uk/tests-and-treatments/epidural/' },
    ],
  },
  {
    id: 'anaesthesia-4', departmentId: 'anesthesiology', slug: 'pain-management',
    title: 'Pain Management',
    summary: 'Explain where pain occurs, how long it lasts and how it affects daily life. An assessment can guide a discussion about suitable pain management options.',
    concern: 'Is pain affecting movement, sleep or daily activities?',
    overview: [
      'Pain assessment considers the possible cause and its effect on your life. New pain and persistent pain may need different approaches.',
      'Explain what you find difficult and what you hope to improve. A useful plan may combine more than one approach and needs review over time.',
    ],
    assessment: [
      'The clinician reviews where the pain occurs, how long it has lasted, earlier diagnoses and treatments. An examination helps decide whether further tests are useful.',
      'Bring a medicine list and describe both benefit and side effects. Discuss movement, sleep, work and the goals that matter to you.',
    ],
    symptoms: ['Pain that persists, keeps returning or is difficult to control', 'Pain that limits movement, work, sleep or daily tasks', 'Questions about the benefit or side effects of current pain treatment'],
    options: [
      { name: 'Review the cause and current treatment', description: 'Start by understanding the assessment and whether existing treatment is helping.' },
      { name: 'Discuss a combined care plan', description: 'Suitable care may include medicines, supported activity, rehabilitation or other approaches matched to your needs.' },
      { name: 'Specialist assessment where appropriate', description: 'Ask whether further specialist input or a procedure is relevant rather than assuming injections are needed.' },
    ],
    risks: 'Pain treatment does not guarantee complete relief. Medicines and procedures have different risks; review them with the clinician and avoid increasing or stopping prescribed treatment yourself.',
    preparation: ['Bring earlier scans, diagnoses and records of procedures or physiotherapy.', 'List medicines and treatments tried, including how much they helped and any side effects.', 'Write down activities you want to improve and the pattern of pain through the day.'],
    faqs: [
      { question: 'Will I need an injection or an operation?', answer: 'Not necessarily. The cause, examination and treatment goals guide the options.' },
      { question: 'What if pain medicines are not helping?', answer: 'Bring the medicine details and explain the benefit and side effects. Ask for a review rather than changing the dose yourself.' },
      { question: 'How will we know whether the plan is working?', answer: 'Agree on useful goals, such as better sleep or movement, and a review date to assess progress and any side effects.' },
    ],
    followUp: 'Agree on a review date and realistic goals, including how the plan affects daily function as well as pain.',
    references: [
      { label: 'NHS: getting help for pain', url: 'https://www.nhs.uk/live-well/pain/how-to-get-nhs-help-for-your-pain/' },
      { label: 'NICE: chronic pain assessment and management', url: 'https://www.nice.org.uk/guidance/ng193/chapter/recommendations' },
    ],
  },
  {
    id: 'anaesthesia-5', departmentId: 'anesthesiology', slug: 'emergency-critical-care-support',
    title: 'Emergency & Critical Care Support',
    summary: 'Anaesthesia teams may support breathing and monitoring during serious illness or emergency procedures.',
    concern: 'Need to understand the support a seriously ill patient may receive?',
    overview: [
      'Critical care provides close monitoring and treatment when a person is seriously ill or needs additional support after an operation. The clinical team decides the appropriate level of care.',
      'This information can help families prepare questions about monitoring, breathing support and updates. An emergency needs immediate assessment rather than an online booking.',
    ],
    assessment: [
      'The team assesses the illness and important body functions, including breathing and circulation, and decides what support is needed.',
      'Ask the treating team to explain the current problem, treatment goals and how the patient is being reviewed. Needs can change as the illness develops.',
    ],
    symptoms: ['A serious illness or injury requiring urgent hospital assessment', 'A need for closer monitoring or breathing support', 'A planned or unexpected need for additional care after major surgery'],
    options: [
      { name: 'Immediate assessment and stabilisation', description: 'The emergency and treating teams address urgent needs and decide the appropriate next step.' },
      { name: 'Monitoring and organ support', description: 'Care may involve monitoring, medicines, oxygen or other breathing support according to the patient’s condition.' },
      { name: 'Ongoing review and care coordination', description: 'The team reviews treatment, specialist input and whether continued critical care, transfer or ward care is appropriate.' },
    ],
    risks: 'Serious illness and critical-care treatments carry significant risks. Recovery cannot be predicted from a website; discuss the individual situation, benefits and limits of treatment with the clinical team.',
    preparation: ['If available, bring the patient’s medicine list, allergies and relevant medical records.', 'Give the team a reliable contact for family updates and explain important health history.', 'Ask about visiting and communication arrangements; never delay emergency care to collect documents.'],
    faqs: [
      { question: 'Can I choose ICU or HDU through an online appointment?', answer: 'No. Admission and the level of monitoring are clinical decisions made after assessment.' },
      { question: 'Does every patient in critical care need a ventilator?', answer: 'No. Breathing support and other treatments depend on the patient’s condition.' },
      { question: 'How can the family understand the treatment plan?', answer: 'Ask the treating team about the main problem, current goals and arrangements for updates. The plan may change as the patient is reviewed.' },
    ],
    urgent: 'Severe breathing difficulty, collapse, unconsciousness, major bleeding or sudden severe illness needs emergency medical care. Do not wait for a routine consultation or online response.',
    followUp: 'The clinical team explains the next stage of care, including any transfer, ward recovery or further follow-up.',
    references: [{ label: 'NHS: intensive care', url: 'https://www.nhs.uk/tests-and-treatments/intensive-care/' }],
  },
];
