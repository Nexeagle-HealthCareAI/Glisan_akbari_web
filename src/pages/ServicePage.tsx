import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronRight, CircleAlert, ClipboardList, Clock3, FileText, MapPin, Navigation, Phone, ScanLine, ShieldCheck, Stethoscope, Video } from 'lucide-react';
import { HOSPITAL_PROFILE } from '../data/config';
import { HOMEPAGE_LOCATION } from '../data/homepageSeo';
import { type ServicePageContent, getServicePage } from '../data/servicePageContent';
import { Accordion, hospitalMap, hospitalPhone } from '../components/SiteDesign';
import { ResponsiveCareImage } from '../components/ResponsiveCareImage';
import { CareCard } from '../components/CareCard';
import { NotFoundPage } from './NotFoundPage';
import './KidneyStonePage.css';

function ConsultationLink({ content, secondary = false, label }: { content: ServicePageContent; secondary?: boolean; label?: string }) {
  return <a className={'kidney-button' + (secondary ? ' kidney-button-secondary' : '')} href={content.actionHref}>{label || content.actionLabel}<ArrowUpRight size={18} aria-hidden="true" /></a>;
}

function DoctorAvatar({ content }: { content: ServicePageContent }) {
  return <span className="kidney-doctor-avatar">{content.doctor?.image
    ? <ResponsiveCareImage image={{ ...content.doctor.portrait!, alt: content.doctor.name }} sizes="64px" />
    : <Stethoscope size={24} aria-hidden="true" />}</span>;
}

export function ServicePage({ content }: { content: ServicePageContent }) {
  const doctor = content.doctor;
  const bookingNote = content.actionHref.startsWith('tel:')
    ? 'Call the hospital to arrange the right appointment and confirm timing before travelling.'
    : 'Booking opens the specialist’s Doctor Dekho profile. Confirm your consultation time before travelling.';
  return <article className="kidney-page service-page" data-service-id={content.id} aria-labelledby="kidney-title">
    <div className="mm-wrap kidney-breadcrumbs"><nav className="site-breadcrumb" aria-label="Breadcrumb">
      <Link to="/">Home</Link><ChevronRight size={13} aria-hidden="true" /><Link to={content.departmentPath}>{content.departmentName}</Link><ChevronRight size={13} aria-hidden="true" /><span aria-current="page">{content.title}</span>
    </nav></div>

    <section className="kidney-hero mm-wrap" aria-labelledby="kidney-title">
      <div className="kidney-hero-copy">
        <p className="kidney-eyebrow"><span aria-hidden="true" /> {content.departmentName.toUpperCase()} · LINE BAZAR, PURNIA</p>
        <h1 id="kidney-title">{content.title}</h1><p className="kidney-hero-intro">{content.introduction}</p>
        <div className="kidney-hero-doctor"><DoctorAvatar content={content} /><div><p>{doctor?.name || 'Hospital appointment team'}</p><span>{doctor ? doctor.title : 'Help choosing the right consultation'}</span></div></div>
        <div className="kidney-actions"><ConsultationLink content={content} /><a className="kidney-call-link" href={hospitalPhone}><Phone size={17} aria-hidden="true" /> Call the hospital</a></div>
        <p className="kidney-hero-note"><CalendarDays size={15} aria-hidden="true" /> By appointment · Bring your existing reports</p>
      </div>
      <figure className="kidney-hero-art"><div className="kidney-art-label"><ScanLine size={16} aria-hidden="true" /> UNDERSTAND YOUR CARE</div><ResponsiveCareImage image={content.image} hero sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 45vw, 540px" /><figcaption><span>{content.departmentName} care</span><span>Medical illustration</span></figcaption></figure>
    </section>

    <div className="kidney-care-facts mm-wrap" aria-label="Your care at a glance">
      <div><Stethoscope size={22} aria-hidden="true" /><p><strong>Your care, explained</strong><span>Assessment, choices & follow-up</span></p></div>
      <div><ScanLine size={22} aria-hidden="true" /><p><strong>A plan for your needs</strong><span>Discuss symptoms and existing reports</span></p></div>
      <div><MapPin size={22} aria-hidden="true" /><p><strong>Here in Line Bazar</strong><span>Glisan Akbari Hospital, Purnia</span></p></div>
    </div>
    <nav className="kidney-section-nav mm-wrap" aria-label="On this page"><span>ON THIS PAGE</span><a href="#overview">Your concern</a><a href="#options">Care options</a><a href="#kidney-doctor">{doctor ? 'Your specialist' : 'Your care team'}</a><a href="#kidney-cost">Costs & visiting</a><a href="#questions">FAQs</a></nav>
    <div className={'kidney-urgent mm-wrap' + (content.urgent ? '' : ' service-information-note')} role="note"><CircleAlert size={21} aria-hidden="true" /><p><strong>{content.urgent ? 'Know when to seek urgent help.' : 'Before planning your care.'}</strong> {content.notice}</p></div>

    <div className="kidney-care-layout mm-wrap">
      <div className="kidney-reading">
        <section id="overview" className="kidney-section"><p className="kidney-eyebrow">01 / UNDERSTAND THE CONCERN</p><h2>{content.concernHeading}</h2><p>{content.concern}</p>{content.overview.map(p => <p key={p}>{p}</p>)}</section>
        <section id="symptoms" className="kidney-section"><h2>Concerns worth discussing</h2><p>Tell the clinician what you have noticed, when it began and how it affects daily life.</p><ul className="kidney-symptoms">{content.symptoms.map((s, i) => <li key={s}><span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><p>{s}</p></li>)}</ul></section>
        <section id="assessment" className="kidney-section"><p className="kidney-eyebrow">02 / YOUR CONSULTATION</p><h2>Start with an individual assessment.</h2>{content.assessment.map(p => <p key={p}>{p}</p>)}<div className="kidney-consultation-note"><ClipboardList size={22} aria-hidden="true" /><p>{content.consultation}</p></div></section>
      </div>
      <aside id="kidney-doctor" className="kidney-doctor-card" aria-labelledby="kidney-doctor-name">
        <div className={'kidney-doctor-portrait' + (!doctor?.image ? ' service-doctor-without-photo' : '')}><span className="kidney-eyebrow">{doctor ? 'YOUR LISTED SPECIALIST' : 'YOUR CARE TEAM'}</span>
          {doctor?.image ? <ResponsiveCareImage image={{ ...doctor.portrait!, alt: `${doctor.name}, ${doctor.title}` }} sizes="(max-width: 760px) 230px, 300px" /> : <span className="service-doctor-initials" aria-hidden="true">{doctor?.initials || <Stethoscope size={46} />}</span>}
          {doctor && <span className="kidney-experience"><ShieldCheck size={16} aria-hidden="true" />{doctor.experience}</span>}
        </div>
        <div className="kidney-doctor-details"><h2 id="kidney-doctor-name">{doctor?.name || 'Talk to our care team'}</h2><p className="kidney-doctor-title">{doctor?.title || 'Find the right starting point for your care.'}</p>{doctor && <p className="kidney-qualifications">{doctor.qualifications}</p>}
          <dl><div><dt><MapPin size={16} aria-hidden="true" /> Hospital</dt><dd>Glisan Akbari · Line Bazar, Purnia</dd></div><div><dt><Clock3 size={16} aria-hidden="true" /> Appointments</dt><dd>{doctor?.timings || 'Call to confirm the appropriate clinician and consultation time.'}</dd></div>{doctor && <div><dt>Languages</dt><dd>{doctor.languages}</dd></div>}</dl>
          {content.appointmentNote && <p className="service-specialist-note">{content.appointmentNote}</p>}
          <ConsultationLink content={content} />
          <Link className="kidney-text-link" to={doctor?.profilePath || '/doctors'}>{doctor?.profilePath ? 'View doctor profile' : 'Meet our doctors'}<ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </aside>
    </div>

    <section id="options" className="kidney-options" aria-labelledby="kidney-options-title"><div className="mm-wrap"><div className="kidney-section-heading"><div><p className="kidney-eyebrow">03 / UNDERSTAND YOUR CHOICES</p><h2 id="kidney-options-title">{content.optionsHeading}</h2></div><p id="next-steps">{content.optionsIntro}</p></div><div className="kidney-option-grid">{content.options.map((option, i) => <div className="kidney-option-card" key={option.name}><div className="kidney-option-top"><span>{String(i + 1).padStart(2, '0')}</span><Stethoscope size={25} aria-hidden="true" /></div><h3>{option.name}</h3><p>{option.description}</p><div className="kidney-option-question"><span>ASK YOUR CLINICIAN</span><p>{i === 0 ? 'Is this appropriate for me, and what alternatives should I consider?' : i === 1 ? 'What benefits and possible side effects should I understand?' : 'What preparation and follow-up would I need?'}</p></div></div>)}</div><p className="kidney-options-note"><ShieldCheck size={17} aria-hidden="true" /> Your clinician will explain which options fit your assessment.</p></div></section>
    <div className="kidney-aftercare mm-wrap"><section id="risks" className="kidney-section"><p className="kidney-eyebrow">MAKE AN INFORMED DECISION</p><h2>Benefits, limits & possible risks</h2><p>{content.risks}</p></section><section className="kidney-recovery" aria-labelledby="kidney-recovery-title"><Clock3 size={24} aria-hidden="true" /><h2 id="kidney-recovery-title">Plan your follow-up.</h2><p>{content.followUp}</p><ConsultationLink content={content} secondary label="Discuss your care plan" /></section></div>
    {content.video && <section className="kidney-explainer mm-wrap" aria-labelledby="kidney-video-title"><div className="kidney-video-copy"><p className="kidney-eyebrow"><Video size={16} aria-hidden="true" /> A SIMPLE EXPLANATION</p><h2 id="kidney-video-title">Prefer to watch?</h2><p id="kidney-video-description">Watch this service explainer, then bring your questions to the consultation. The assessment and care options are also explained on this page.</p><a className="kidney-text-link" href="#options">Read the care options <ArrowRight size={16} aria-hidden="true" /></a></div><video controls playsInline preload="none" poster={content.video.poster} src={content.video.src} width="1080" height="720" aria-labelledby="kidney-video-title" aria-describedby="kidney-video-description">Your browser does not support this video. Please read the care options above.</video></section>}
    <section id="prepare" className="kidney-visit mm-wrap" aria-labelledby="kidney-visit-title"><div className="kidney-section-heading"><div><p className="kidney-eyebrow">04 / MAKE YOUR VISIT EASIER</p><h2 id="kidney-visit-title">Know what to bring.<br />Know what to ask.</h2></div><p>Travelling from Katihar, Araria or Kishanganj? Confirm your consultation time with the team before you set out.</p></div><div className="kidney-visit-grid"><div className="kidney-prepare-card"><FileText size={24} aria-hidden="true" /><h3>Your consultation checklist</h3><ul>{content.preparation.map(p => <li key={p}><Check size={17} aria-hidden="true" /><span>{p}</span></li>)}</ul></div><div id="kidney-cost" className="kidney-cost-card"><ClipboardList size={24} aria-hidden="true" /><h3>Fees, estimates & insurance</h3><p>Ask our team about the consultation fee. Treatment costs depend on the assessment and proposed care.</p><p>Request an estimate for the recommended care and follow-up. If a procedure is advised, ask about tests, anaesthesia, hospital stay and any separate charges. Confirm insurance acceptance and approval requirements before admission.</p><a className="kidney-text-link" href={hospitalPhone}>Ask the team about costs <ArrowUpRight size={16} aria-hidden="true" /></a></div></div></section>
    <section id="questions" className="kidney-faq mm-wrap" aria-labelledby="kidney-faq-title"><div><p className="kidney-eyebrow">05 / YOUR QUESTIONS, ANSWERED</p><h2 id="kidney-faq-title">A little clarity<br />before your visit.</h2><p>Have a question about your own symptoms, reports or care plan? Discuss it with your clinician.</p><a className="kidney-call-link" href={hospitalPhone}><Phone size={17} aria-hidden="true" /> {HOSPITAL_PROFILE.phone}</a></div><Accordion prefix={content.id + '-faq'} items={content.faqs} /></section>
    <section id="book" className="kidney-booking mm-wrap" aria-labelledby="kidney-booking-title"><div><p className="kidney-eyebrow">YOUR NEXT STEP</p><h2 id="kidney-booking-title">Bring your questions.<br />Let’s plan your care.</h2><p>{doctor ? `Discuss your concerns with ${doctor.name}` : 'Contact our care team to arrange the right consultation'} at Glisan Akbari Super Speciality Hospital.</p><div className="kidney-actions"><ConsultationLink content={content} /><a className="kidney-call-link" href={hospitalPhone}><Phone size={17} aria-hidden="true" /> {HOSPITAL_PROFILE.phone}</a></div><p className="kidney-booking-note">{bookingNote}</p></div><div className="kidney-address"><MapPin size={25} aria-hidden="true" /><h3>Visit us in Line Bazar</h3><address>{HOMEPAGE_LOCATION}</address><a className="kidney-text-link" href={hospitalMap} target="_blank" rel="noopener noreferrer"><Navigation size={16} aria-hidden="true" /> Get directions <ArrowUpRight size={16} aria-hidden="true" /></a><Link className="kidney-text-link" to="/contact">Hospital & visiting details <ArrowRight size={16} aria-hidden="true" /></Link></div></section>
    <section className="kidney-related mm-wrap" aria-labelledby="kidney-related-title"><div className="kidney-section-heading"><div><p className="kidney-eyebrow">CONNECTED CARE</p><h2 id="kidney-related-title">Related {content.departmentName.toLowerCase()} care</h2></div><Link className="kidney-text-link" to={content.departmentPath}>Department overview <ArrowRight size={16} aria-hidden="true" /></Link></div><div className="site-card-grid">{content.related.map(item => <CareCard key={item.id} to={item.to} title={item.title} description={item.description} image={item.image} heading="h3" />)}</div></section>
    <section id="sources" className="kidney-sources mm-wrap" aria-labelledby="kidney-sources-title"><h2 id="kidney-sources-title">Sources & further reading</h2><ul>{content.references.map(ref => <li key={ref.url}><a href={ref.url} target="_blank" rel="noopener noreferrer">{ref.label}<ArrowUpRight size={14} aria-hidden="true" /></a></li>)}</ul><p>General information supports your consultation; it cannot diagnose your symptoms. Your clinician will explain which care is suitable for you.</p></section>
  </article>;
}

export function CareServiceRoute() {
  const { pathname } = useLocation();
  const content = getServicePage(pathname);
  return content ? <ServicePage content={content} key={content.id} /> : <NotFoundPage />;
}
