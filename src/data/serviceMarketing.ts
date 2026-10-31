// Patient decisions and practical next steps. Keep existing SEO targets and
// medically detailed priority-page copy in config/priorityUrology unchanged.
type ServiceMarketing = {
  heading: string;
  concern: string;
  consultation: string;
  related: string[];
  introduction?: string[];
  note?: string;
};

export const SERVICE_MARKETING: Record<string, ServiceMarketing> = {
  'srv-1': {
    heading: 'Worried about a stone or your scan report?',
    concern: 'Pain, repeat episodes or an unexpected scan result can leave you unsure what to do next. Bring your reports so you can discuss the stone and the options that fit your situation.',
    consultation: 'Ask whether monitoring, medicines or a procedure may be appropriate, what each option involves and what follow-up you will need.',
    related: ['srv-3', 'srv-5', 'srv-6'],
  },
  'srv-2': {
    heading: 'Is your urine flow affecting everyday life?',
    concern: 'A weak stream, repeated night-time visits or difficulty emptying your bladder deserves a conversation. You do not need to decide on surgery before seeing a urologist.',
    consultation: 'Explain how your symptoms affect sleep and daily life. Ask about assessment, medicine options and when a procedure might be considered.',
    related: ['srv-6', 'srv-3', 'srv-10'],
  },
  'srv-3': {
    heading: 'Burning, repeated infections or blood in urine?',
    concern: 'These concerns can be uncomfortable to discuss. Tell your doctor when they began, whether they have happened before and which medicines you have already taken.',
    consultation: 'Bring previous urine tests and prescriptions. Ask what needs checking, whether further tests are appropriate and how your follow-up will work.',
    related: ['srv-1', 'srv-6', 'srv-12'],
  },
  'srv-4': {
    heading: 'Trying for a pregnancy and unsure what comes next?',
    concern: 'Fertility concerns can put pressure on both partners. A consultation gives you a place to explain your history, review existing reports and ask questions without blame.',
    consultation: 'Bring any semen analysis or earlier fertility reports. Ask which findings matter, whether more assessment is needed and what realistic next steps look like.',
    related: ['srv-7', 'srv-13', 'srv-3'],
  },
  'srv-5': {
    heading: 'Been advised to consider keyhole surgery?',
    concern: 'Before agreeing to a procedure, understand why it is being suggested and whether other options fit your diagnosis. Bring your scans and the recommendation you have received.',
    consultation: 'Ask about the surgical approach, alternatives, possible risks, expected recovery and where the proposed procedure can be arranged. Confirm robotic equipment availability with the team.',
    related: ['srv-1', 'srv-11', 'srv-13'],
    introduction: [
      'Laparoscopic urological surgery uses small incisions to reach the kidney, ureter or nearby structures. The appropriate approach depends on the condition, scan findings and your health.',
      'A consultation with Dr. Md Taquedis Noori in Purnia can help you understand a proposed operation and compare it with other suitable approaches. Bring earlier scans and treatment advice.',
      'Laparoscopic, open and robotic approaches are not interchangeable. Ask which is appropriate for you and confirm the facility, equipment and availability before planning treatment.',
    ],
    note: 'The size of an incision does not determine your whole recovery. Ask about individual risks, hospital stay and follow-up before deciding.',
  },
  'srv-6': {
    heading: 'Planning your day around the nearest toilet?',
    concern: 'Leakage and sudden urgency can affect work, sleep and confidence. You can start by describing what happens, how often and what you have already tried.',
    consultation: 'Ask about the possible causes, a bladder diary and the options appropriate for you. Discuss how progress will be reviewed rather than expecting one solution to suit everyone.',
    related: ['srv-2', 'srv-3', 'srv-13'],
    introduction: [
      'Urinary incontinence and overactive bladder can affect sleep, travel and daily routines. A urology consultation can help you explain the problem and understand what needs assessment.',
      'Tell your doctor whether leakage happens with coughing or movement, follows sudden urgency, or occurs at other times. Your symptoms and health history help guide the next steps.',
      'Discuss suitable management options with Dr. Md Taquedis Noori in Line Bazar, Purnia. Tests and procedures depend on the assessment and their availability should be confirmed.',
    ],
    note: 'You do not need to feel embarrassed about asking for help. Improvement and treatment choices vary with the cause and your individual needs.',
  },
  'srv-7': {
    heading: 'Finding it difficult to talk about erection concerns?',
    concern: 'You do not need to arrive with a diagnosis or choose a treatment yourself. Begin with what has changed, how long it has been happening and the questions on your mind.',
    consultation: 'Ask about possible contributing factors, assessment and suitable options. Bring a list of medicines and discuss your expectations and any concerns about treatment.',
    related: ['srv-4', 'srv-2', 'srv-3'],
  },
  'srv-8': {
    heading: 'Need clarity before or after a kidney transplant?',
    concern: 'Transplant care can involve several teams and many reports. Bring your transplant records, medicine list and the advice from your treating nephrologist.',
    consultation: 'Ask which urological issues need review and how care can be coordinated with your transplant team. Confirm the location and availability of any proposed transplant service.',
    related: ['srv-9', 'srv-3', 'srv-5'],
    introduction: [
      'Kidney transplantation and post-transplant care involve long-term planning with a specialist team. Urological review may form part of preparation or follow-up, depending on your needs.',
      'A consultation can help you discuss bladder or urinary concerns, earlier operations and questions raised by your nephrologist or transplant centre.',
      'Bring your transplant records and current prescriptions when meeting Dr. Md Taquedis Noori. Confirm where any proposed treatment can take place and how your existing team will remain involved.',
    ],
    note: 'Keep following your transplant team’s instructions. A website enquiry or routine consultation does not replace your established transplant follow-up.',
  },
  'srv-9': {
    heading: 'Has your kidney team advised dialysis access planning?',
    concern: 'Knowing when and where to arrange access can be confusing. Bring your nephrologist’s recommendation and details of any existing dialysis access.',
    consultation: 'Ask about suitability, timing, recovery, access checks and follow-up with your dialysis team. Confirm the procedure location and fees before travelling.',
    related: ['srv-8', 'srv-5', 'srv-3'],
    introduction: [
      'Dialysis access surgery, including AV fistula creation, is planned around your kidney care and individual blood vessels. Your nephrologist and the access specialist can discuss the right timing.',
      'An AV fistula connects an artery and a vein for haemodialysis access. Suitability and readiness for use require assessment and follow-up; they cannot be established from symptoms alone.',
      'Discuss the proposed access plan with Dr. Md Taquedis Noori in Purnia. Bring referral notes, dialysis details and records of earlier access procedures, and confirm availability with the hospital.',
    ],
    note: 'Ask how the access will be checked and which changes need urgent review. Continue your dialysis team’s instructions while a new access is being planned.',
  },
  'srv-10': {
    heading: 'Concerned about a PSA result or a treatment recommendation?',
    concern: 'A test result can raise difficult questions. Bring the actual reports so you can discuss what they mean and which decisions, if any, need to be made next.',
    consultation: 'Ask about your individual risk, further assessment, alternatives and the possible effects of treatment on daily life. You can also discuss a second opinion.',
    related: ['srv-2', 'srv-11', 'srv-12'],
    introduction: [
      'Prostate cancer screening and treatment decisions depend on your health, preferences, family history and test findings. A PSA result alone does not provide the whole picture.',
      'A consultation can help you understand why a test, scan or biopsy has been suggested. If cancer has been diagnosed, bring the pathology and imaging reports to discuss the next steps.',
      'Discuss monitoring and treatment options, including radical prostatectomy where appropriate, with Dr. Md Taquedis Noori. Confirm the treating team, procedure location and follow-up arrangements.',
    ],
    note: 'Screening is an individual decision. Ask about its possible benefits and limitations, and how any proposed treatment could affect urinary and sexual function.',
  },
  'srv-11': {
    heading: 'Has a scan shown a kidney mass?',
    concern: 'It is understandable to want clear answers before deciding on treatment. Bring the scan images as well as the written report and any earlier kidney tests.',
    consultation: 'Ask what the findings mean, whether more assessment is needed and which options could suit you. Discuss kidney function, recovery and follow-up before choosing a plan.',
    related: ['srv-5', 'srv-10', 'srv-12'],
    introduction: [
      'A kidney mass found on a scan needs an individual assessment. The scan findings, kidney function, overall health and any further tests guide the discussion.',
      'Kidney cancer surgery may involve removing part or all of a kidney, depending on the diagnosis and suitability. Your doctor can explain alternatives and the trade-offs of each approach.',
      'Bring your scan images, reports and current prescriptions to a consultation with Dr. Md Taquedis Noori in Purnia. Confirm where any proposed surgery and subsequent follow-up will take place.',
    ],
    note: 'Ask how each option may affect kidney function and what follow-up is needed. Outcomes depend on the diagnosis and individual circumstances.',
  },
  'srv-12': {
    heading: 'Worried about a bladder finding or a testicular change?',
    concern: 'Uncertainty can make it hard to know where to begin. Tell the doctor what you have noticed and bring any urine tests, scans or biopsy reports you already have.',
    consultation: 'Ask which assessment is appropriate and, if a diagnosis is confirmed, how treatment and follow-up will be coordinated. Do not wait for an online booking if symptoms are severe or sudden.',
    related: ['srv-3', 'srv-10', 'srv-11'],
    introduction: [
      'Bladder and testicular concerns need assessment before treatment decisions are made. Tell your doctor about visible blood in urine, a lump or other changes and when they began.',
      'Tests and treatment options depend on the findings. If cancer has already been diagnosed, bring the pathology reports, scan images and details of any previous treatment.',
      'A consultation with Dr. Md Taquedis Noori can help you discuss the next steps, questions for the treating team and follow-up. Confirm specialist services and procedure availability before planning treatment.',
    ],
    note: 'Seek prompt medical assessment for visible blood in urine or a new testicular lump. Sudden severe testicular pain needs urgent medical attention.',
  },
  'srv-13': {
    heading: 'Have questions about your child’s urinary health?',
    concern: 'Parents often need help understanding a scan finding or a suggested operation. Bring earlier reports and explain your child’s symptoms, previous care and your main worries.',
    consultation: 'Ask whether observation or further assessment is appropriate, when to review and what any proposed treatment involves. Confirm age suitability and paediatric facilities with the team.',
    related: ['srv-1', 'srv-3', 'srv-5'],
    introduction: [
      'Pediatric urology and congenital reconstruction cover urinary conditions present from birth as well as problems identified during childhood. The child’s age, symptoms and development guide assessment.',
      'Findings such as hydronephrosis, hypospadias or an undescended testis do not all follow the same care plan. A consultation helps parents understand whether monitoring or treatment is appropriate.',
      'Bring antenatal scans, earlier reports and prescriptions when discussing your child’s care with Dr. Md Taquedis Noori. Confirm the child’s age, specialist availability and facilities before arranging a procedure.',
    ],
    note: 'Ask what can be monitored, what may need treatment and when to seek help sooner. Decisions should be based on an individual assessment of your child.',
  },
};
