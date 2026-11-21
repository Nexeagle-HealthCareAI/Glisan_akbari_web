import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, LockKeyhole, FileText, Phone } from 'lucide-react';
import { HOSPITAL_PROFILE } from '../data/config';
import { trackingOn } from '../lib/track';
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
        <p className="site-legal-date">{kind === 'privacy' ? 'Website and enquiry information · Updated 16 November 2026' : 'Website information · Updated 16 November 2026'}</p>
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
  return <LegalLayout kind="privacy" title="Privacy notice" intro="Understand how this website works, what we receive when you message us or fill an enquiry form on WhatsApp, Facebook or Instagram, and how to ask us to delete it." sections={[
    { id: 'browsing', title: 'Browsing this website', content: <p>You can explore our doctors, services and visit information without creating an account. This version of the website does not have an on-site appointment submission form or a facility for uploading medical reports.</p> },
    { id: 'external-booking', title: 'Booking on Doctor Dekho', content: <><p>Appointment links take you to Doctor Dekho. Any personal details, reports or appointment information you enter there are submitted to that service, rather than through a form on this website.</p><p>Read the privacy notice and booking terms shown by Doctor Dekho before submitting information. Contact the hospital or booking provider for questions about an existing appointment.</p></> },
    { id: 'messages', title: 'WhatsApp, Facebook and Instagram messages', content: <><p>When you message the hospital on WhatsApp, or send a message to our Facebook Page or Instagram account, we receive your name or profile name as that service shows it, your phone number on WhatsApp, and the messages and attachments you send. Our front-desk team reads and answers them in the hospital’s enquiry system.</p><p>We use these messages only to answer you, to arrange or follow up a visit, and to keep a record of the conversation. Replies are written by hospital staff.</p><p>Please do not send medical reports through Facebook or Instagram. Bring them to your visit, or ask the team how to share them.</p></> },
    { id: 'enquiry-forms', title: 'Enquiry forms on Facebook and Instagram', content: <><p>Some of our Facebook and Instagram adverts open an enquiry form. If you submit one, Meta passes us the details you entered or confirmed on the form, usually your name, your phone number and the question or service you chose, with a reference number for that form entry.</p><p>We use these details to call or message you about your enquiry and to help you book a visit. Submitting a form does not create an appointment.</p><p>To learn which adverts are useful, we may tell Meta whether an enquiry was contacted or led to a visit. This uses the form entry’s reference number and a scrambled copy of the phone number. We do not send your diagnosis, doctor, department or any other medical detail to Meta.</p></> },
    { id: 'how-we-use', title: 'How we use, share and keep this information', content: <><p>Information from messages and enquiry forms is seen by the hospital staff who handle enquiries and appointments. It is stored in the hospital’s enquiry system, which our technology provider, NexEagle, runs for us and uses only on the hospital’s instructions. Access needs a staff sign-in.</p><p>We do not sell your information, and we do not give it to other companies for their own marketing. We may disclose it where the law requires us to.</p><p>We keep it for as long as it is needed to answer you and for the hospital’s records, and then delete it. Information that becomes part of your medical record is kept for the period the law requires.</p><p>WhatsApp, Facebook and Instagram are run by Meta, which handles your information under its own privacy policy.</p></> },
    { id: 'delete-my-information', title: 'Ask us to delete your information', content: <><p>You can ask us to delete the information we hold from your WhatsApp, Facebook or Instagram messages, or from an enquiry form. To do this:</p><ol className="site-legal-steps"><li>Call the hospital on <a href={hospitalPhone}>{HOSPITAL_PROFILE.phone}</a>, or send a message to the same WhatsApp number, Facebook Page or Instagram account you used before.</li><li>Tell us you want your information deleted, and give the name and the phone number or profile you contacted us from, so that we can find it.</li><li>We will confirm it is you, delete the messages and enquiry details we hold, and tell you when it is done. This takes up to 30 days.</li></ol><p>We cannot delete information the law requires us to keep, such as the record of treatment you received at the hospital. We will tell you if that applies to you.</p><p>You can also delete your own messages, and stop receiving ours, in the WhatsApp, Facebook or Instagram app.</p></> },
    { id: 'browser-preferences', title: 'Your browser preferences', content: <><p>Animations play automatically and respect your device’s reduced-motion setting. This version does not save an animation preference in your browser.</p><p>If an earlier version saved an animation preference, you can remove that old preference by clearing this website’s saved data in your browser.</p></> },
    { id: 'linked-services', title: 'Calls, maps and linked services', content: <><p>Call links open your device’s calling application. Directions links open Google Maps with the hospital address. These services handle your interactions according to their own notices and settings.</p><p>As with other websites, hosting infrastructure may process connection information to deliver pages.{trackingOn ? ' We count how many times the call, WhatsApp and booking buttons are used on each page, without your name, number, address or any cookie.' : ''} Contact the hospital if you need details about its hosting, record handling or retention arrangements.</p></> },
    { id: 'privacy-contact', title: 'Contact about your information', content: <><p>For questions about information you have shared with the hospital, call <a href={hospitalPhone}>{HOSPITAL_PROFILE.phone}</a> or speak to the team during your visit. Avoid sharing medical reports or private patient details in public reviews.</p><p>{HOSPITAL_PROFILE.name}<br />{HOSPITAL_PROFILE.address.fullFormatted}</p><Link className="mm-text-link" to="/contact">Contact and location<ArrowUpRight size={17} /></Link></> },
  ]} />;
}

export function TermsPage() {
  return <LegalLayout kind="terms" title="Terms of use" intro="A clear guide to using this website, messaging the hospital, arranging a visit and understanding the role of our digital guide." sections={[
    { id: 'website-purpose', title: 'About this website', content: <p>This website introduces {HOSPITAL_PROFILE.name}, its doctors and areas of care. It helps you explore services, contact the hospital and find the external appointment booking pages.</p> },
    { id: 'care-information', title: 'Information and your care', content: <><p>Service descriptions and illustrations provide general information. They do not diagnose a condition, recommend an individual treatment or replace a consultation with a qualified doctor.</p><p>Mimo is an illustrated digital guide, not a treating physician. Discuss your symptoms, reports and treatment choices with your doctor.</p></> },
    { id: 'appointment-details', title: 'Arranging an appointment', content: <><p>Choosing a doctor’s booking link takes you to Doctor Dekho. Review the provider’s appointment details and terms before confirming. Opening a booking link does not itself create or confirm an appointment.</p><p>Confirm doctor availability, timings, fees and any preparation with the booking provider or hospital before travelling. Contact them directly about changes, cancellations or payment questions.</p><Link className="mm-text-link" to="/doctors">Plan your appointment<ArrowUpRight size={17} /></Link></> },
    { id: 'messages-and-enquiries', title: 'Messages and enquiry forms', content: <><p>You can also reach the hospital by WhatsApp, by a message to our Facebook Page or Instagram account, or through an enquiry form on one of our adverts. Hospital staff read and answer these during working hours, so a reply is not instant.</p><p>Sending a message or an enquiry form does not create or confirm an appointment. Your visit is arranged only when the hospital or the booking provider confirms it.</p><p>Our team can share general information by message, such as timings, directions and how to book. They cannot give a diagnosis or treatment advice by message. For that, please see a doctor.</p><Link className="mm-text-link" to="/privacy-policy">How we handle your messages<ArrowUpRight size={17} /></Link></> },
    { id: 'urgent-help', title: 'When you need urgent help', content: <p>This website and our WhatsApp, Facebook and Instagram messages are not monitored for emergency requests. If you need urgent medical attention, contact local emergency services or go to the nearest emergency department. Do not wait for an online appointment, a website response or a reply to a message.</p> },
    { id: 'links-and-questions', title: 'Links, updates and questions', content: <><p>External booking and map services operate separately from this website. Their availability and terms may change. Hospital information can also change, so confirm details that matter to your visit with our team.</p><p>For questions about this website, call <a href={hospitalPhone}>{HOSPITAL_PROFILE.phone}</a> or visit our <Link to="/contact">contact page</Link>.</p></> },
  ]} />;
}
