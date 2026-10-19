import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, LockKeyhole, FileText, Phone } from 'lucide-react';
import { HOSPITAL_PROFILE } from '../data/config';
import { hospitalPhone } from '../components/SiteDesign';

type LegalSection = { id: string; title: string; content: React.ReactNode };

function LegalLayout({ kind, title, intro, sections }: {
  kind: 'privacy' | 'terms'; title: string; intro: string; sections: LegalSection[];
}) {
  const Icon = kind === 'privacy' ? LockKeyhole : FileText;
  return (
    <div className="site-legal mm-wrap">
      <nav className="site-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link><span>/</span><span aria-current="page">{title}</span>
      </nav>
      <header className="site-legal-header">
        <span className="site-icon"><Icon size={27} strokeWidth={1.4} /></span>
        <p className="mm-kicker">CLEAR INFORMATION. A LITTLE PEACE OF MIND.</p>
        <h1>{title}</h1>
        <p className="site-lead">{intro}</p>
        <p className="site-legal-date">Website information · Updated 19 October 2026</p>
      </header>
      <div className="site-legal-layout">
        <aside className="site-legal-nav">
          <nav aria-label="On this page">
            <p className="mm-kicker">ON THIS PAGE</p>
            {sections.map((section, index) => <a key={section.id} href={'#' + section.id}>
              <span>0{index + 1}</span>{section.title}<ArrowUpRight size={15} />
            </a>)}
          </nav>
          <div className="site-legal-help">
            <h2>A question for our team?</h2>
            <p>Call the hospital for help with your visit or these website notices.</p>
            <a className="mm-text-link" href={hospitalPhone}><Phone size={16} />{HOSPITAL_PROFILE.phone}</a>
          </div>
        </aside>
        <article className="site-legal-paper">
          {sections.map((section, index) => <section key={section.id} id={section.id}>
            <span className="site-small-label">0{index + 1}</span>
            <h2>{section.title}</h2>
            {section.content}
          </section>)}
          <div className="site-legal-related">
            <span>Continue reading</span>
            <Link to={kind === 'privacy' ? '/terms' : '/privacy-policy'}>
              {kind === 'privacy' ? 'Terms of use' : 'Privacy notice'}<ArrowUpRight size={17} />
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}

export function PrivacyPolicyPage() {
  return <LegalLayout kind="privacy" title="Privacy notice" intro="Understand how this website works, where booking takes place and who to contact with a privacy question." sections={[
    { id: 'browsing', title: 'Browsing this website', content: <p>You can explore our doctors, services and visit information without creating an account. This version of the website does not have an on-site appointment submission form or a facility for uploading medical reports.</p> },
    { id: 'external-booking', title: 'Booking on Doctor Dekho', content: <><p>Appointment links take you to Doctor Dekho. Any personal details, reports or appointment information you enter there are submitted to that service, rather than through a form on this website.</p><p>Read the privacy notice and booking terms shown by Doctor Dekho before submitting information. Contact the hospital or booking provider for questions about an existing appointment.</p></> },
    { id: 'browser-preferences', title: 'Your browser preferences', content: <><p>The animation switch saves a preference named <strong>hospital-motion</strong> in your browser’s local storage. It remembers whether you paused Dr. Memo’s animations. This preference is not an appointment record and is not sent to the hospital by this website.</p><p>You can remove it by clearing this website’s saved data in your browser. The animations also respect your device’s reduced-motion setting.</p></> },
    { id: 'linked-services', title: 'Calls, maps and linked services', content: <><p>Call links open your device’s calling application. Directions links open Google Maps with the hospital address. These services handle your interactions according to their own notices and settings.</p><p>As with other websites, hosting infrastructure may process connection information to deliver pages. Contact the hospital if you need details about its hosting, record handling or retention arrangements.</p></> },
    { id: 'privacy-contact', title: 'Contact about your information', content: <><p>For questions about information you have shared with the hospital, call <a href={hospitalPhone}>{HOSPITAL_PROFILE.phone}</a> or speak to the team during your visit. Avoid sharing medical reports or private patient details in public reviews.</p><p>{HOSPITAL_PROFILE.name}<br />{HOSPITAL_PROFILE.address.fullFormatted}</p><Link className="mm-text-link" to="/contact">Contact and location<ArrowUpRight size={17} /></Link></> },
  ]} />;
}

export function TermsPage() {
  return <LegalLayout kind="terms" title="Terms of use" intro="A clear guide to using this website, arranging a visit and understanding the role of our digital guide." sections={[
    { id: 'website-purpose', title: 'About this website', content: <p>This website introduces {HOSPITAL_PROFILE.name}, its doctors and areas of care. It helps you explore services, contact the hospital and find the external appointment booking pages.</p> },
    { id: 'care-information', title: 'Information and your care', content: <><p>Service descriptions and illustrations provide general information. They do not diagnose a condition, recommend an individual treatment or replace a consultation with a qualified doctor.</p><p>Dr. Memo is an illustrated digital guide, not a treating physician. Discuss your symptoms, reports and treatment choices with your doctor.</p></> },
    { id: 'appointment-details', title: 'Arranging an appointment', content: <><p>Choosing a doctor’s booking link takes you to Doctor Dekho. Review the provider’s appointment details and terms before confirming. Opening a booking link does not itself create or confirm an appointment.</p><p>Confirm doctor availability, timings, fees and any preparation with the booking provider or hospital before travelling. Contact them directly about changes, cancellations or payment questions.</p><Link className="mm-text-link" to="/book-appointment">Plan your appointment<ArrowUpRight size={17} /></Link></> },
    { id: 'urgent-help', title: 'When you need urgent help', content: <p>This website is not monitored for emergency requests. If you need urgent medical attention, contact local emergency services or go to the nearest emergency department. Do not wait for an online appointment or website response.</p> },
    { id: 'links-and-questions', title: 'Links, updates and questions', content: <><p>External booking and map services operate separately from this website. Their availability and terms may change. Hospital information can also change, so confirm details that matter to your visit with our team.</p><p>For questions about this website, call <a href={hospitalPhone}>{HOSPITAL_PROFILE.phone}</a> or visit our <Link to="/contact">contact page</Link>.</p></> },
  ]} />;
}
