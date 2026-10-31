import React from 'react';
import { Activity, ArrowDown, ArrowUpRight, BedDouble, Clock3, HeartPulse, Navigation, Phone, Siren } from 'lucide-react';
import { PageHero, hospitalPhone, hospitalMap, BulletList } from '../components/SiteDesign';
import { HOSPITAL_PROFILE } from '../data/config';

const choices = [
  { id: 'emergency', prefix: 'The patient has', need: 'A sudden illness, an accident or severe pain', label: '24×7 Emergency', icon: Siren },
  { id: 'icu', prefix: 'The patient has', need: 'A life-threatening condition that needs constant care', label: 'ICU', icon: HeartPulse },
  { id: 'hdu', prefix: 'The patient has', need: 'A serious illness, but is more stable and needs close watching', label: 'HDU', icon: Activity },
  { id: 'private-rooms', prefix: 'The patient needs', need: 'A planned stay, with family close by', label: 'Private rooms', icon: BedDouble },
];
const emergencies = [
  'An accident or injury', 'Chest pain or trouble breathing', 'Heavy bleeding',
  'A fit (seizure) or fainting',
  'Sudden weakness on one side, a drooping face or slurred speech',
  'Severe pain that will not settle',
];
const arrival = [
  'The emergency team checks the patient first and assesses how urgently care is needed.',
  'Treatment is prioritised by urgency. Tests are done if needed.',
  'A specialist doctor is called when required.',
  'The doctor explains whether the patient needs to stay, and what comes next.',
];

export function ExploreCarePage() {
  return <div className="site-explore-care">
    <PageHero label="Explore care" title="Here to help" accent="you plan your visit."
      description="Find a starting point for emergency care, a monitored stay or a planned admission. Our doctors will assess the patient and explain the right next step."
      action="visit" message="Start with how the patient is feeling.">
      <a className="mm-button" href="#choose-care">Find a starting point <ArrowDown size={17} /></a>
      <a className="mm-text-link" href={hospitalPhone}><Phone size={17} /> {HOSPITAL_PROFILE.phone}</a>
    </PageHero>

    <section id="choose-care" className="site-section mm-wrap" aria-labelledby="choose-care-title">
      <p className="mm-kicker">A SIMPLE GUIDE TO YOUR NEXT STEP</p>
      <h2 id="choose-care-title">Which service do I need?</h2>
      <p className="site-directory-intro">Start with how the patient is feeling right now. Our doctors decide the final unit after they check the patient.</p>
      <div className="site-care-choice-grid">{choices.map(({ id, prefix, need, label, icon: Icon }) => <a key={id} href={'#' + id} className="site-care-choice">
        <Icon size={25} strokeWidth={1.5} aria-hidden="true" />
        <span className="site-small-label">{prefix}</span>
        <h3>{need}</h3>
        <span className="site-card-link">{label} <ArrowDown size={17} aria-hidden="true" /></span>
      </a>)}</div>
      <div className="site-emergency-note"><Siren size={24} aria-hidden="true" /><p><strong>Not sure? In an emergency, do not wait.</strong> Call <a href={hospitalPhone}>{HOSPITAL_PROFILE.phone}</a> or come straight to the emergency department. Do not wait for an online appointment or a call back.</p></div>
    </section>

    <section id="emergency" className="site-emergency mm-wrap" aria-labelledby="emergency-title">
      <div className="site-emergency-heading">
        <div><p className="mm-kicker"><Clock3 size={15} aria-hidden="true" /> OPEN ALL DAY AND NIGHT</p>
          <h2 id="emergency-title">24×7 Emergency Services</h2>
          <p>Our emergency department is open every hour of every day. If something feels seriously wrong, come in. You do not need an appointment.</p>
        </div>
        <div className="site-emergency-actions">
          <a href={hospitalPhone} className="mm-button mm-peach-button"><Phone size={17} /> Call {HOSPITAL_PROFILE.phone}</a>
          <a href={hospitalMap} target="_blank" rel="noopener noreferrer" className="mm-text-link"><Navigation size={17} /> Get directions <ArrowUpRight size={16} /></a>
        </div>
      </div>
      <div className="site-emergency-columns">
        <div><h3>Come straight in for</h3><BulletList items={emergencies} /></div>
        <div><h3>What happens when you arrive</h3><ol className="site-arrival-steps">{arrival.map((step, index) => <li key={step}><span aria-hidden="true">{index + 1}</span><p>{step}</p></li>)}</ol></div>
      </div>
      <div className="site-bring-note"><h3>If you can, bring</h3><p>Photo ID, earlier reports and prescriptions, and a list of the medicines the patient takes. <strong>Never delay coming in to find them.</strong></p></div>
    </section>

    <section className="site-section mm-wrap" aria-labelledby="stay-title">
      <p className="mm-kicker">WHEN THE PATIENT NEEDS TO STAY</p>
      <h2 id="stay-title">Care matched to the patient.</h2>
      <p className="site-directory-intro">These descriptions explain the different units. They do not tell you which unit to choose yourself. The clinical team decides after assessment; ask the hospital about bed and room availability.</p>
      <div className="site-stay-grid">
        <article id="icu"><HeartPulse size={26} aria-hidden="true" /><h3>ICU</h3><p className="site-small-label">INTENSIVE CARE UNIT</p><p>For a life-threatening condition that needs constant care. The clinical team explains the level of support the patient needs.</p><a href={hospitalPhone} className="mm-text-link">Talk to our team <ArrowUpRight size={16} /></a></article>
        <article id="hdu"><Activity size={26} aria-hidden="true" /><h3>HDU</h3><p className="site-small-label">HIGH DEPENDENCY UNIT</p><p>For a serious illness when the patient is more stable but still needs close watching. The doctor decides whether this level of care is appropriate.</p><a href={hospitalPhone} className="mm-text-link">Ask about monitored care <ArrowUpRight size={16} /></a></article>
        <article id="private-rooms"><BedDouble size={26} aria-hidden="true" /><h3>Private rooms</h3><p className="site-small-label">A PLANNED HOSPITAL STAY</p><p>For a planned stay, with family close by. Ask about room availability, charges and attendant arrangements before admission.</p><a href={hospitalPhone} className="mm-text-link">Plan an admission <ArrowUpRight size={16} /></a></article>
      </div>
    </section>
  </div>;
}
