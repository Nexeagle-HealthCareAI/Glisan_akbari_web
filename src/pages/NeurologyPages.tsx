import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Phone, Stethoscope } from 'lucide-react';
import { DOCTORS, DR_ASIF_IQBAL_BOOKING_URL, HOSPITAL_PROFILE } from '../data/config';
import { NEUROLOGY_PATH, NEUROLOGY_SEO, NEUROLOGY_TOPICS, neurologyTopicImage, neurologyTopicPath } from '../data/neurology';
import { Accordion, BookLink, BulletList, PageHero, SectionHeading, hospitalPhone } from '../components/SiteDesign';

function AppointmentOptions() {
  const doctor = DOCTORS.find((item) => item.id === 'doc-3')!;
  return <div className="site-decision-action">
    <span className="site-small-label">CHECK YOUR SPECIALIST APPOINTMENT</span>
    <h3>{doctor.name}</h3>
    <p>Listed as Consultant Neurosurgeon<br />{doctor.qualifications}</p>
    <p>Ask reception whether this specialist is appropriate for your concern, or whether another appointment or referral is needed.</p>
    <p>Line Bazar, Purnea · Confirm consultation timing, fees and service availability before travelling.</p>
    <BookLink href={DR_ASIF_IQBAL_BOOKING_URL} label="Check appointment options" />
    <a href={hospitalPhone} className="mm-text-link"><Phone size={16} /> Call {HOSPITAL_PROFILE.phone}</a>
  </div>;
}

export function NeurologyDepartmentPage() {
  return <>
    <PageHero label="Neurology" title={NEUROLOGY_SEO.heading} accent="Start with your concern."
      description={NEUROLOGY_SEO.introduction} image={NEUROLOGY_SEO.image} pose="thinking"
      breadcrumbs={[{ label: 'Neurology' }]} message="Let’s find the right next step.">
      <a href={hospitalPhone} className="mm-button"><Phone size={17} /> Ask about a consultation</a>
      <a href="#care-topics" className="mm-text-link">Explore care topics <ArrowRight size={16} /></a>
    </PageHero>
    <section className="site-decision mm-wrap" aria-labelledby="neuro-start-title">
      <div>
        <p className="mm-kicker">A CLEARER START FOR YOU AND YOUR FAMILY</p>
        <h2 id="neuro-start-title">Know what to ask before you book.</h2>
        <p>Repeated headaches, unexplained episodes, altered sensation or memory concerns can leave you unsure where to start. These guides explain what to record and which questions to bring.</p>
        <p>For a neurology consultation in Purnea, first check the right specialist with the hospital. The linked booking profile lists Dr Asif Iqbal as a Consultant Neurosurgeon. Specific treatment and diagnostic facilities need confirmation.</p>
        <div className="site-emergency-note"><Stethoscope size={22} aria-hidden="true" /><p>Sudden facial drooping, arm weakness or speech difficulty needs immediate emergency medical help, even if it improves. Do not wait for a routine booking or a website reply.</p></div>
      </div>
      <AppointmentOptions />
    </section>
    <section id="care-topics" className="site-section mm-wrap" aria-label="Neurology care topics">
      <SectionHeading number="01" title="Choose the concern you want to understand." note="Five guides to help you prepare for assessment." />
      <div className="site-card-grid">{NEUROLOGY_TOPICS.map((topic) => <Link className="site-care-card" to={neurologyTopicPath(topic)} key={topic.id}>
        <span className="site-small-label">{topic.label}</span>
        <h2>{topic.title}</h2>
        <p>{topic.summary}</p>
        <span className="site-card-link">Read the assessment guide <ArrowUpRight size={17} /></span>
      </Link>)}</div>
    </section>
    <div className="site-detail-layout mm-wrap">
      <article className="site-reading">
        <section id="plan-neurology-visit">
          <h2>Plan a visit for brain and nerve care in Purnia.</h2>
          <p>The hospital is on Dharamshala Road, opposite Shiv Mandir, Line Bazar, Purnea, Bihar. Bring previous reports, a current prescription and a short symptom history.</p>
          <p>If you are travelling from Araria, Katihar or Kishanganj, confirm the specialist’s availability before setting out. Ask about consultation fees, follow-up arrangements and whether any advised tests require a separate referral.</p>
          <a href={hospitalPhone} className="mm-text-link"><Phone size={16} /> Call {HOSPITAL_PROFILE.phone}</a>
          <Link to="/contact" className="mm-text-link">Hospital address and directions <ArrowRight size={16} /></Link>
        </section>
        <section id="neurology-questions">
          <h2>Questions before your visit.</h2>
          <Accordion prefix="neurology-overview" items={[
            { question: 'Which specialist is listed for this department?', answer: 'The hospital’s linked booking profile lists Dr Asif Iqbal as a Consultant Neurosurgeon. Contact reception to confirm whether he is appropriate for your concern or whether a neurologist consultation or referral is needed.' },
            { question: 'Are all the listed tests and treatments available here?', answer: 'These are patient information topics. They do not confirm that every test, procedure or treatment is available at the hospital. Ask reception about the specific care you need.' },
            { question: 'What should I bring to the first appointment?', answer: 'Bring previous reports, prescriptions and a short account of the symptoms. A family member may help explain changes or describe an episode they witnessed.' },
          ]} />
        </section>
        <section id="neurology-information">
          <h2>Information you can check.</h2>
          <p>Each topic guide links to medical information sources. General information supports a consultation and cannot diagnose your symptoms.</p>
          <p><a href={DR_ASIF_IQBAL_BOOKING_URL} target="_blank" rel="noopener noreferrer">View Dr Asif Iqbal’s listed specialty and booking profile</a></p>
        </section>
      </article>
      <aside className="site-detail-aside" aria-label="Neurology page navigation">
        <p className="mm-kicker">ON THIS PAGE</p>
        <a href="#care-topics">Care topics <ArrowRight size={15} /></a>
        <a href="#plan-neurology-visit">Plan your visit <ArrowRight size={15} /></a>
        <a href="#neurology-questions">Common questions <ArrowRight size={15} /></a>
      </aside>
    </div>
  </>;
}

export function NeurologyTopicPage() {
  const { slug } = useParams();
  const topic = NEUROLOGY_TOPICS.find((item) => item.slug === slug);
  if (!topic) return <PageHero label="Page not found" title="This guide is unavailable." accent="Explore neurology care."
    description="Choose a care topic from the department overview." message="Let’s find your starting point.">
    <Link to={NEUROLOGY_PATH} className="mm-button">Neurology overview <ArrowRight size={17} /></Link>
  </PageHero>;
  const related = topic.related.flatMap((id) => NEUROLOGY_TOPICS.find((item) => item.id === id) || []);
  return <>
    <PageHero label="Neurology information" title={topic.heading} accent="Understand your next step."
      description={topic.introduction} image={neurologyTopicImage(topic)}
      breadcrumbs={[{ label: 'Neurology', to: NEUROLOGY_PATH }, { label: topic.label }]} message="Bring your questions.">
      <a href={hospitalPhone} className="mm-button"><Phone size={17} /> Check the right appointment</a>
      <Link to={NEUROLOGY_PATH} className="mm-text-link">All neurology topics <ArrowRight size={16} /></Link>
    </PageHero>
    <section className="site-decision mm-wrap" aria-labelledby="neuro-next-title">
      <div>
        <p className="mm-kicker">YOUR CONCERN. A CLEARER CONVERSATION.</p>
        <h2 id="neuro-next-title">{topic.summary}</h2>
        <p>Before a planned visit, ask which specialist should assess your concern and which existing reports to bring. You do not need to know the diagnosis to ask for help.</p>
        <div className="site-emergency-note"><Stethoscope size={22} aria-hidden="true" /><p>{topic.emergency}</p></div>
      </div>
      <AppointmentOptions />
    </section>
    <div className="site-detail-layout mm-wrap">
      <article className="site-reading">
        <section id="symptoms"><h2>Concerns to discuss.</h2><BulletList items={topic.concerns} /></section>
        <section id="assessment"><h2>What assessment may involve.</h2><p>{topic.assessment}</p></section>
        <section id="next-steps"><h2>Questions about care and next steps.</h2><p>{topic.discussion}</p></section>
        <section id="prepare"><h2>Prepare for your appointment.</h2><BulletList items={topic.preparation} /></section>
        <section id="questions"><h2>Common questions.</h2><Accordion items={topic.faqs} prefix={topic.id} /></section>
        <section id="book">
          <h2>Check consultation options in Purnia.</h2>
          <p>Contact Glisan Akbari Super Speciality Hospital, Dharamshala Road, Line Bazar, Purnea, on {HOSPITAL_PROFILE.phone}. Confirm the appropriate specialist, timing, fees and any referral arrangements before travelling.</p>
          <p>The listed doctor is Dr Asif Iqbal, Consultant Neurosurgeon. These guides do not confirm a specialist clinic or a particular procedure for every condition.</p>
          <a href={hospitalPhone} className="mm-button"><Phone size={17} /> Call for appointment information</a>
          <Link to="/contact" className="mm-text-link">Address and directions <ArrowRight size={16} /></Link>
        </section>
        <section id="sources">
          <h2>Sources and further reading.</h2>
          <ul>{topic.references.map((ref) => <li key={ref.url}><a href={ref.url} target="_blank" rel="noopener noreferrer">{ref.label}</a></li>)}</ul>
          <p className="site-medical-note">General information cannot diagnose symptoms or replace medical advice. External resources describe general care, not this hospital’s facilities. Contact local emergency services for urgent symptoms.</p>
        </section>
      </article>
      <aside className="site-detail-aside" aria-label="Guide navigation">
        <p className="mm-kicker">ON THIS PAGE</p>
        {[
          ['symptoms', 'Concerns to discuss'], ['assessment', 'Assessment'], ['prepare', 'Before your visit'],
          ['questions', 'Common questions'], ['book', 'Appointment information'],
        ].map(([id, label]) => <a href={'#' + id} key={id}>{label}<ArrowRight size={15} /></a>)}
        <Link to={NEUROLOGY_PATH}>Neurology overview <ArrowRight size={15} /></Link>
      </aside>
    </div>
    <section className="site-section mm-wrap" aria-labelledby="related-neurology-title">
      <h2 id="related-neurology-title">Related neurology guides.</h2>
      <div className="site-card-grid">{related.map((item) => <Link className="site-care-card" to={neurologyTopicPath(item)} key={item.id}>
        <h3>{item.label}</h3><p>{item.summary}</p><span className="site-card-link">Read the guide <ArrowUpRight size={17} /></span>
      </Link>)}</div>
    </section>
  </>;
}
