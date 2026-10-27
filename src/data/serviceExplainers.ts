export type ExplainerIcon = 'urine' | 'scan' | 'plan' | 'flow' | 'test' | 'doctor' | 'fertility' | 'shield' | 'heart' | 'baby' | 'ear' | 'sound' | 'nose' | 'speech' | 'temperature' | 'eye' | 'medicine' | 'history' | 'anesthesia' | 'pain' | 'monitor' | 'brain' | 'memory' | 'face' | 'arm';
export type ExplainerStep = { icon: ExplainerIcon; title: string; detail: string };
export type ServiceExplanation = { takeaway: string; steps: [ExplainerStep, ExplainerStep, ExplainerStep]; urgent?: boolean; comparison?: boolean };

const step = (icon: ExplainerIcon, title: string, detail: string): ExplainerStep => ({ icon, title, detail });

// Plain-language visual summaries of the existing service copy. These explain
// concerns and assessment, without promising a diagnosis or a treatment result.
// Background references: NIDDK Urologic Diseases; NHS Stroke / Peripheral
// Neuropathy / Hearing Loss; ASA Made for This Moment, Types of Anesthesia.
// https://www.niddk.nih.gov/health-information/urologic-diseases
// https://www.nhs.uk/conditions/stroke/symptoms/
// https://www.nhs.uk/conditions/peripheral-neuropathy/
// https://www.nhs.uk/conditions/hearing-loss/
// https://madeforthismoment.asahq.org/anesthesia-101/types-of-anesthesia/
export const SERVICE_EXPLAINERS: Record<string, ServiceExplanation> = {
  'srv-1': {
    takeaway: 'Stones in the kidney or ureter need an individual treatment plan.',
    steps: [step('urine', 'Kidney or ureter stone', 'A stone in the urinary system.'), step('scan', 'Review the scans', 'Understand its size and location.'), step('doctor', 'Discuss removal options', 'PCNL, URSL or RIRS may be considered.')],
  },
  'srv-2': {
    takeaway: 'An enlarged prostate can affect the passage of urine.',
    steps: [step('scan', 'Prostate enlargement', 'BPH means non-cancerous enlargement.'), step('flow', 'Urine flow changes', 'Passing urine may become difficult.'), step('doctor', 'Review your options', 'Discuss medicines or a procedure.')],
  },
  'srv-3': {
    takeaway: 'Urinary infections and blood in urine need assessment of the cause.',
    steps: [step('urine', 'Notice the concern', 'Burning, discomfort or blood in urine.'), step('test', 'Review urine tests', 'Further tests depend on assessment.'), step('doctor', 'Discuss the cause', 'Care depends on what is found.')],
  },
  'srv-4': {
    takeaway: 'Male fertility concerns are assessed with your history and test results.',
    steps: [step('fertility', 'A fertility concern', 'Discuss difficulties conceiving.'), step('test', 'Review relevant tests', 'Semen, hormones or scans as advised.'), step('doctor', 'Discuss suitable care', 'Varicocele repair may be one option.')],
  },
  'srv-5': {
    takeaway: 'Keyhole techniques may be used for selected kidney and urinary operations.',
    steps: [step('scan', 'Understand the problem', 'Review the kidney or urinary concern.'), step('doctor', 'Plan the approach', 'Discuss whether keyhole surgery fits.'), step('shield', 'Prepare for the procedure', 'Ask about recovery and follow-up.')],
  },
  'srv-6': {
    takeaway: 'Urine leakage and a sudden urge to pass urine can have different causes.',
    steps: [step('urine', 'Leakage or urgency', 'Describe when it happens.'), step('history', 'Review bladder habits', 'Discuss patterns and relevant tests.'), step('doctor', 'Find suitable support', 'Care is based on your assessment.')],
  },
  'srv-7': {
    takeaway: 'Erection concerns can be discussed privately with your urologist.',
    steps: [step('heart', 'Describe the difficulty', 'Explain how it affects you.'), step('history', 'Review your health', 'Discuss medicines and test results.'), step('doctor', 'Talk through options', 'Treatment is tailored to the cause.')],
  },
  'srv-8': {
    takeaway: 'Transplant-related urology includes assessment and ongoing follow-up.',
    steps: [step('scan', 'Before a transplant', 'Review the urinary system.'), step('doctor', 'Coordinate your care', 'Discuss findings with the care team.'), step('shield', 'After a transplant', 'Continue the advised follow-up.')],
  },
  'srv-9': {
    takeaway: 'An AV fistula connects an artery and a vein to provide dialysis access.',
    steps: [step('scan', 'Review the blood vessels', 'Mapping helps plan the access.'), step('flow', 'Create a connection', 'An artery is joined to a vein.'), step('doctor', 'Check the access', 'Follow the care team’s advice.')],
  },
  'srv-10': {
    takeaway: 'Prostate cancer care starts with assessment of the findings.',
    steps: [step('scan', 'Review the prostate', 'Discuss screening and scan results.'), step('test', 'Clarify the findings', 'Further tests may be advised.'), step('doctor', 'Compare care options', 'Monitoring or treatment depends on assessment.')],
  },
  'srv-11': {
    takeaway: 'Kidney cancer surgery may remove part or all of the affected kidney.',
    steps: [step('scan', 'Review the kidney scan', 'Understand the area of concern.'), step('doctor', 'Discuss the operation', 'Partial or whole-kidney removal.'), step('shield', 'Plan ongoing care', 'Ask about recovery and follow-up.')],
  },
  'srv-12': {
    takeaway: 'Bladder and testicular tumours have different assessment and care pathways.',
    steps: [step('scan', 'Locate the concern', 'Bladder or testicle.'), step('test', 'Review the findings', 'Discuss the required investigations.'), step('doctor', 'Plan individual care', 'Options depend on the findings.')],
  },
  'srv-13': {
    takeaway: 'Children’s urinary concerns need an assessment suited to their age.',
    steps: [step('baby', 'A child’s urinary concern', 'Some conditions are present from birth.'), step('scan', 'Review development', 'Discuss the history and relevant scans.'), step('doctor', 'Plan care together', 'Explain suitable options to the family.')],
  },
  'ent-1': {
    takeaway: 'Ear pain or repeated discharge needs a closer look at the cause.',
    steps: [step('ear', 'Pain or discharge', 'Notice when it started.'), step('history', 'Describe the pattern', 'Mention repeated episodes.'), step('doctor', 'Examine the ear', 'Discuss the next step after assessment.')],
  },
  'ent-2': {
    takeaway: 'Changes in hearing can be assessed before discussing hearing support.',
    steps: [step('sound', 'Sounds feel less clear', 'Describe what is harder to hear.'), step('ear', 'Check your hearing', 'A hearing test can help.'), step('doctor', 'Discuss support', 'Ask whether a hearing aid may suit you.')],
  },
  'ent-3': {
    takeaway: 'A blocked nose or facial pressure can have different causes.',
    steps: [step('nose', 'Nose or sinus symptoms', 'Blocked nose, sneezing or pressure.'), step('history', 'Look for a pattern', 'Describe timing and possible triggers.'), step('doctor', 'Assess the cause', 'Discuss allergy and other possibilities.')],
  },
  'ent-4': {
    takeaway: 'Repeated throat trouble or snoring is useful to discuss with an ENT doctor.',
    steps: [step('speech', 'Throat or breathing concern', 'Sore throats, snoring or a blocked nose.'), step('history', 'Describe repeated trouble', 'Mention sleep and breathing changes.'), step('doctor', 'Review the throat', 'Ask what assessment may be needed.')],
  },
  'ent-5': {
    takeaway: 'Persistent mouth or throat changes need examination.',
    steps: [step('speech', 'Notice a lasting change', 'Ulcers, patches or voice changes.'), step('history', 'Share the history', 'Mention duration and tobacco use.'), step('doctor', 'Arrange an examination', 'Discuss whether more tests are needed.')],
  },
  'medicine-1': {
    takeaway: 'Fever has many possible causes; assessment guides the next step.',
    steps: [step('temperature', 'Fever or body aches', 'Describe how long you have felt unwell.'), step('history', 'Review your symptoms', 'Share the pattern and other concerns.'), step('doctor', 'Discuss assessment', 'The doctor advises whether tests are needed.')],
  },
  'medicine-2': {
    takeaway: 'Yellow eyes or skin and dark urine need medical assessment.',
    steps: [step('eye', 'Notice colour changes', 'Eyes, skin or urine.'), step('history', 'Explain when it began', 'Mention tiredness and medicines.'), step('doctor', 'Assess the cause', 'Discuss which tests may be useful.')],
  },
  'medicine-3': {
    takeaway: 'Loose stools or vomiting should be discussed with their duration and severity.',
    steps: [step('urine', 'A stomach concern', 'Loose stools, vomiting or discomfort.'), step('history', 'Share the details', 'How long? Can you drink fluids?'), step('doctor', 'Review the cause', 'Assessment guides the care plan.')],
  },
  'medicine-4': {
    takeaway: 'Skin and eye irritation can have different causes.',
    steps: [step('eye', 'Redness or irritation', 'Mention swelling or discharge.'), step('history', 'Describe the changes', 'Explain where and when they began.'), step('doctor', 'Arrange a review', 'Ask if a specialist assessment is needed.')],
  },
  'medicine-5': {
    takeaway: 'Regular records help your doctor review blood sugar and blood pressure care.',
    steps: [step('heart', 'Bring your readings', 'Blood sugar and blood pressure records.'), step('medicine', 'Review your medicines', 'Bring your current medicine list.'), step('doctor', 'Plan the follow-up', 'Discuss monitoring and your care plan.')],
  },
  'anaesthesia-1': {
    takeaway: 'A pre-anaesthesia review helps the team prepare for your individual needs.',
    steps: [step('history', 'Share your history', 'Health, medicines and past anaesthesia.'), step('shield', 'Mention allergies', 'Explain any earlier problems.'), step('doctor', 'Discuss the plan', 'Ask how to prepare for the procedure.')],
  },
  'anaesthesia-2': {
    takeaway: 'General and regional anaesthesia work in different ways.',
    comparison: true,
    steps: [step('anesthesia', 'General anaesthesia', 'You are unconscious for the procedure.'), step('arm', 'Regional anaesthesia', 'A region of the body is numbed.'), step('doctor', 'Discuss the approach', 'The choice depends on your health and procedure.')],
  },
  'anaesthesia-3': {
    takeaway: 'Discuss labour pain relief and C-section anaesthesia with your maternity team.',
    steps: [step('baby', 'Discuss the birth plan', 'Share your questions and preferences.'), step('history', 'Review your health', 'Mention medicines and previous experiences.'), step('doctor', 'Ask about suitable options', 'Availability and individual needs matter.')],
  },
  'anaesthesia-4': {
    takeaway: 'A clear description of your pain helps guide assessment.',
    steps: [step('pain', 'Where does it hurt?', 'Explain the location and duration.'), step('history', 'How does it affect you?', 'Mention sleep and daily activities.'), step('doctor', 'Discuss pain relief', 'Options depend on the assessment.')],
  },
  'anaesthesia-5': {
    takeaway: 'Anaesthesia teams may support breathing and monitoring in serious illness.',
    steps: [step('nose', 'Breathing support', 'May be needed during serious illness.'), step('monitor', 'Monitoring', 'The team follows important body functions.'), step('doctor', 'Coordinated care', 'Support depends on the situation and facilities.')],
  },
  'neurology-1': {
    takeaway: 'Any sudden face, arm or speech change needs immediate emergency attention.',
    urgent: true,
    steps: [step('face', 'Face', 'Sudden drooping on one side.'), step('arm', 'Arm', 'Sudden weakness.'), step('speech', 'Speech', 'Sudden difficulty speaking.')],
  },
  'neurology-2': {
    takeaway: 'Headache patterns and triggers help your doctor understand the concern.',
    steps: [step('brain', 'Describe the headache', 'Where, when and how often?'), step('history', 'Track the pattern', 'Mention triggers and effects on daily life.'), step('doctor', 'Discuss the cause', 'Assessment guides the next step.')],
  },
  'neurology-3': {
    takeaway: 'A clear description of an episode helps guide seizure assessment.',
    steps: [step('brain', 'Describe the episode', 'Shaking or a change in awareness.'), step('history', 'Share what happened', 'Mention duration and unusual sensations.'), step('doctor', 'Discuss assessment', 'A doctor advises on further evaluation.')],
  },
  'neurology-4': {
    takeaway: 'Numbness or tingling needs review of its location, timing and other symptoms.',
    steps: [step('arm', 'Numbness or tingling', 'Point out the affected areas.'), step('history', 'Review the pattern', 'When did it start? Is there weakness?'), step('doctor', 'Assess the cause', 'Several causes may need consideration.')],
  },
  'neurology-5': {
    takeaway: 'Changes in memory or daily tasks are useful to discuss with a clinician.',
    steps: [step('memory', 'Notice the changes', 'Memory, concentration or daily tasks.'), step('history', 'Bring examples', 'Explain when the changes began.'), step('doctor', 'Review possible causes', 'Discuss the appropriate assessment.')],
  },
};
