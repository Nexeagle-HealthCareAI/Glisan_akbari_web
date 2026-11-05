import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Phone, Stethoscope } from 'lucide-react';
import { DOCTORS, DR_ASIF_IQBAL_BOOKING_URL, HOSPITAL_PROFILE } from '../data/config';
import { NEUROLOGY_PATH, NEUROLOGY_SEO, NEUROLOGY_TOPICS, neurologyTopicImage, neurologyTopicPath } from '../data/neurology';
import { Accordion, BookLink, BulletList, PageHero, SectionHeading, hospitalPhone } from '../components/SiteDesign';
import { CareCard } from '../components/CareCard';
import { DepartmentConcernTabs } from '../components/DepartmentConcernTabs';
import { CARE_DEPARTMENTS } from '../data/careDepartments';
import { DEPARTMENT_HERO_IMAGES } from '../data/pageImages';
import { ServicePage } from './ServicePage';
import { neurologyServiceContent } from '../data/servicePageContent';
import { NotFoundPage } from './NotFoundPage';

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
    <PageHero label="Neurology" imageLayout="background" title={NEUROLOGY_SEO.heading} accent="Start with your concern."
      description={NEUROLOGY_SEO.introduction} image={{ ...DEPARTMENT_HERO_IMAGES.neurology, alt: NEUROLOGY_SEO.image.alt }} pose="thinking"
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
    <DepartmentConcernTabs department={CARE_DEPARTMENTS.find(item => item.id === 'neurology')!} />
    <section className="site-section mm-wrap" aria-label="Neurology care directory">
      <SectionHeading number="01" title="Choose the concern you want to understand." note="Five guides to help you prepare for assessment." />
      <div className="site-card-grid">{NEUROLOGY_TOPICS.map((topic) => <CareCard key={topic.id}
        to={neurologyTopicPath(topic)} title={topic.title} description={topic.summary} label={topic.label}
        image={neurologyTopicImage(topic)} linkLabel="Read the assessment guide" />)}</div>
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
  const topic = NEUROLOGY_TOPICS.find(item => item.slug === slug);
  return topic ? <ServicePage content={neurologyServiceContent(topic)} key={topic.id} /> : <NotFoundPage />;
}
