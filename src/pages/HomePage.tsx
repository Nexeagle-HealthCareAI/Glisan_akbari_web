import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Play, Pause, Phone, MapPin, Menu, X, Plus, Heart, Droplets, Activity, Stethoscope, CalendarDays, Check, ShieldCheck, Accessibility, MessageCircle, FileText, Navigation, Video, ChevronRight } from 'lucide-react';
import { DOCTOR_PROFILE, HOSPITAL_PROFILE, UROLOGY_SERVICES } from '../data/config';
import { MimoGuide } from '../components/MimoGuide';
import { useSiteMotion, hospitalMap } from '../components/SiteDesign';
import { DoctorGoogleRating } from '../components/DoctorGoogleRating';
import './HomePage.css';

interface HomePageProps { onOpenBooking: () => void; }
const topics = [
  { title: 'Kidney stones', short: 'Kidney stones? Let’s explore your options.', line: 'A consultation helps you understand the right next step.', index: 0, Icon: Droplets, hint: 'Understand your options' },
  { title: 'Prostate health', short: 'A little clarity about prostate health.', line: 'Talk to a urologist about changes in urination.', index: 1, Icon: ShieldCheck, hint: 'Start a conversation' },
  { title: 'Urinary concerns', short: 'Questions about urinary symptoms?', line: 'Share your symptoms with a qualified doctor.', index: 2, Icon: Activity, hint: 'Talk about your symptoms' },
  { title: 'Male fertility', short: 'Personal questions. A private conversation.', line: 'Explore your concerns in a consultation.', index: 3, Icon: Heart, hint: 'Find confidential support' },
  { title: 'Bladder health', short: 'Let’s talk about everyday comfort.', line: 'Understand the care available for bladder concerns.', index: 5, Icon: Droplets, hint: 'Explore bladder care' },
  { title: 'Children’s urology', short: 'Little ones need a thoughtful approach.', line: 'Speak with a doctor about your child’s urological concerns.', index: 12, Icon: Accessibility, hint: 'Care for little ones' },
];
const steps = [
  { title: 'Choose your doctor', line: 'Open Doctor Dekho and choose your doctor.', bubble: 'Pehle, apne doctor ko chunein.', Icon: CalendarDays },
  { title: 'Confirm your visit', line: 'Check your appointment details before you travel.', bubble: 'Apni appointment confirm kar lein.', Icon: Phone },
  { title: 'Come, let’s talk', line: 'Bring your reports and the questions on your mind.', bubble: 'Reports aur sawaal saath laayein.', Icon: FileText },
];
const questions = [
  { q: 'How do I book?', a: 'Use “Book appointment” to choose a doctor, then continue to Doctor Dekho. Our team can also help by phone.', bubble: 'Booking? Main raasta dikhaata hoon.', Icon: CalendarDays },
  { q: 'What should I bring?', a: 'Bring previous reports, prescriptions, and a list of medicines you take.', bubble: 'Reports saath laana yaad rakhein.', Icon: FileText },
  { q: 'Where do I visit?', a: HOSPITAL_PROFILE.address.fullFormatted, bubble: 'Hum Purnia ke Line Bazar mein hain.', Icon: MapPin },
];
function KidneyGraphic() {
  return <svg className="mm-kidneys" viewBox="0 0 220 180" aria-hidden="true"><path className="mm-organ" d="M76 28C28 23 17 73 30 116c9 29 32 43 55 25 18-14 10-32-3-38-13-7-12-21-1-28 17-11 17-37-5-47Z" /><path className="mm-organ" d="M144 28c48-5 59 45 46 88-9 29-32 43-55 25-18-14-10-32 3-38 13-7 12-21 1-28-17-11-17-37 5-47Z" /><path className="mm-ureter" d="M79 83c29 9 21 49 21 78m41-78c-29 9-21 49-21 78" /><circle className="mm-stone" cx="58" cy="86" r="6" /><circle className="mm-scan" cx="58" cy="86" r="15" /></svg>;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenBooking }) => {
  const root = useRef<HTMLDivElement>(null);
  const { paused } = useSiteMotion();
  const [topic, setTopic] = useState(0);
  const [step, setStep] = useState(0);
  const [question, setQuestion] = useState(0);
  const phone = 'tel:' + HOSPITAL_PROFILE.phone.replace(/\s+/g, '');
  const map = hospitalMap;
  const activeTopic = topics[topic];
  const TopicIcon = activeTopic.Icon;
  const StepIcon = steps[step].Icon;
  const activeQuestion = questions[Math.max(0, question)];
  const FaqIcon = activeQuestion.Icon;
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      (entry.target as HTMLElement).dataset.visible = entry.isIntersecting ? 'true' : 'false';
    }), { threshold: .08 });
    root.current?.querySelectorAll('.mm-scene').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <div ref={root} className="mm-home" data-motion={paused ? 'paused' : 'playing'}>
    <div id="home-content">
      <section className="mm-hero mm-wrap" aria-labelledby="hero-title">
        <div className="mm-hero-copy"><div className="mm-kicker"><span /> UROLOGY CARE · PURNIA</div><h1 id="hero-title">Less worry.<br />More <span className="mm-highlight">clarity.<svg viewBox="0 0 400 22" preserveAspectRatio="none" aria-hidden="true"><path d="M5 15Q180-4 392 12" /></svg></span><br />Care that connects.</h1><p>Real doctors. Simple explanations.<br />Your next step, made easier.</p><DoctorGoogleRating /><div className="mm-hero-ctas"><button className="mm-button" onClick={onOpenBooking}>Book appointment <ArrowUpRight size={18} /></button><a href={phone} className="mm-text-link"><Phone size={17} /> Talk to our team</a></div><a className="mm-scroll-cue" href="#meet-mimo"><span>↓</span> A friend to guide you along the way</a></div>
        <div className="mm-doctor-video-slot" role="group" aria-label="Placeholder reserved for a future real doctor introduction video"><div className="mm-video-slot-top"><span><i /> THE HUMAN SIDE OF CARE</span><Video size={19} /></div><div className="mm-video-empty"><span className="mm-placeholder-ring"><Video size={36} strokeWidth={1.1} /></span><span>Doctor introduction video</span><small>Coming here soon</small></div><div className="mm-video-slot-bottom"><span>A conversation with your doctor.</span><span>01 / INTRODUCTION</span></div></div>
      </section>

      <section id="meet-mimo" className="mm-welcome mm-scene" aria-label="Meet Mimo, your digital guide"><div className="mm-wrap mm-welcome-inner"><div className="mm-welcome-character"><MimoGuide paused={paused} action="welcome" /><span className="mm-welcome-spark">✳</span></div><div><div className="mm-kicker">A FAMILIAR FACE. EVERY STEP.</div><h2>Hi, I’m <span>Mimo.</span></h2><p>Your little guide to a clearer hospital visit.</p></div><div className="mm-welcome-bubble"><MessageCircle size={22} /><span>“Chaliye, ek-ek step<br />aasaan banaate hain.”</span></div><a href="#care" className="mm-round-link" aria-label="Explore care with Mimo"><ArrowRight size={24} /></a></div></section>

      <section id="care" className="mm-care mm-wrap" aria-labelledby="care-title"><div className="mm-section-heading"><div><div className="mm-kicker">01 / EXPLORE WITH MIMO</div><h2 id="care-title">What brings you here?</h2></div><Link to="/services" className="mm-text-link">All our services <ArrowUpRight size={17} /></Link></div><div className="mm-care-layout"><div className={'mm-care-scene mm-scene mm-topic-' + topic}><div className="mm-scene-grid" /><div className="mm-speech" key={topic}><span>MIMO EXPLAINS</span><p>{activeTopic.short}</p></div><div className="mm-organ-card" key={'organ-' + topic}><span className="mm-card-caption">LET’S UNDERSTAND</span>{topic === 0 ? <KidneyGraphic /> : <div className="mm-symbol-graphic"><span /><TopicIcon size={90} strokeWidth={1} /><i /><i /></div>}<strong>{activeTopic.title}</strong></div><MimoGuide paused={paused} action="care" cue={topic} className="mm-care-mimo" /><span className="mm-float-chip mm-care-chip"><Check size={15} /> One step at a time</span><span className="mm-scene-star">✳</span><span className="mm-scene-caption">Your guide to care · Illustrative animation</span></div><div className="mm-topic-panel"><p className="mm-small-heading">CHOOSE A TOPIC. LET’S MAKE IT SIMPLE.</p><div className="mm-topic-list" role="group" aria-label="Explore urology care topics">{topics.map((item, i) => <button key={item.title} onClick={() => setTopic(i)} aria-pressed={topic === i} className={topic === i ? 'is-active' : ''}><span className="mm-topic-icon"><item.Icon size={21} strokeWidth={1.6} /></span><span>{item.title}<small>{item.hint}</small></span><ChevronRight size={18} /></button>)}</div><div className="mm-topic-details" aria-live="polite"><p>{activeTopic.line}</p><Link className="mm-text-link" to={'/services/' + UROLOGY_SERVICES[activeTopic.index].slug}>Explore {activeTopic.title.toLowerCase()} <ArrowUpRight size={17} /></Link></div></div></div></section>

      <section id="doctor" className="mm-doctor-section mm-scene" aria-labelledby="doctor-title"><div className="mm-wrap mm-doctor-inner"><div className="mm-doctor-copy"><div className="mm-kicker">02 / PEOPLE BEHIND YOUR CARE</div><h2 id="doctor-title">A real doctor.<br /><em>A real conversation.</em></h2><h3>{DOCTOR_PROFILE.name}</h3><p>{DOCTOR_PROFILE.professionalTitle}</p><div className="mm-doctor-qualifications">{DOCTOR_PROFILE.qualifications}</div><div className="mm-doctor-languages">Hindi · English · Bengali · Urdu</div><DoctorGoogleRating /><Link to="/doctors/dr-md-taquedis-noori" className="mm-button">Meet Dr. Noori <ArrowUpRight size={18} /></Link><Link to="/doctors" className="mm-text-link mm-all-doctors">All doctors <ArrowRight size={16} /></Link></div><div className="mm-doctor-scene"><span className="mm-doctor-orbit" /><span className="mm-doctor-orbit mm-doctor-orbit-two" /><div className="mm-speech"><span>MIMO’S LITTLE REMINDER</span><p>“Sawaal chhota ho ya bada,<br />doctor se zaroor poochhein.”</p></div><div className="mm-doctor-id"><img className="mm-doctor-portrait" src={DOCTOR_PROFILE.profileImage} alt={DOCTOR_PROFILE.name} width="1122" height="1402" loading="lazy" /><span>YOUR CONSULTATION</span><strong>Dr. Md Taquedis Noori</strong></div><MimoGuide paused={paused} action="doctor" /><span className="mm-float-chip mm-doctor-chip"><MessageCircle size={15} /> Your questions matter</span></div></div></section>

      <section id="how" className="mm-how mm-wrap" aria-labelledby="how-title"><div className="mm-section-heading"><div><div className="mm-kicker">03 / YOUR VISIT, VISUALISED</div><h2 id="how-title">Three steps.<br /><span className="mm-green">One simpler visit.</span></h2></div><p>Let Mimo show you the way.</p></div><div className="mm-booking-layout"><div className="mm-booking-scene mm-scene"><span className="mm-scene-grid" /><div className="mm-speech" key={'step-' + step}><span>MIMO WALKS YOU THROUGH IT</span><p>“{steps[step].bubble}”</p></div><div className="mm-phone-demo"><div className="mm-phone-notch" /><div className="mm-phone-heading">YOUR NEXT STEP<span>0{step + 1} / 03</span></div><div className="mm-phone-visual" key={step}><span className="mm-phone-icon"><StepIcon size={38} strokeWidth={1.5} /></span><span className="mm-phone-check"><Check size={17} /></span></div><strong>{steps[step].title}</strong><div className="mm-demo-line" /><div className="mm-demo-line mm-short" /><div className="mm-phone-progress">{steps.map((_, i) => <span key={i} className={i <= step ? 'is-filled' : ''} />)}</div><span className="mm-phone-demo-caption">Illustration of the steps</span></div><MimoGuide paused={paused} action="booking" cue={step} /><span className="mm-scene-star">✳</span></div><div className="mm-steps-panel"><div className="mm-step-buttons" role="group" aria-label="Booking guide steps">{steps.map((s, i) => <button key={s.title} onClick={() => setStep(i)} aria-pressed={step === i} className={step === i ? 'is-active' : ''}><span className="mm-step-number">0{i + 1}</span><span><strong>{s.title}</strong><small>{s.line}</small></span><ArrowUpRight size={19} /></button>)}</div><button onClick={onOpenBooking} className="mm-button">Let’s book your visit <ArrowUpRight size={18} /></button><span className="mm-booking-note">Choose your doctor, then book on Doctor Dekho.</span></div></div></section>

      <section className="mm-faq mm-wrap" aria-labelledby="faq-title"><div className="mm-section-heading"><div><div className="mm-kicker">04 / A LITTLE REASSURANCE</div><h2 id="faq-title">Before you say hello.</h2></div><Link to="/faqs" className="mm-text-link">More questions <ArrowUpRight size={17} /></Link></div><div className="mm-faq-layout"><div className="mm-faq-scene mm-scene"><div className="mm-question-orbit"><span>?</span><span>+</span><span>?</span></div><div className="mm-speech" key={'faq-' + question}><span>ASK MIMO</span><p>“{activeQuestion.bubble}”</p></div><MimoGuide paused={paused} action="faq" cue={question} /><span className="mm-faq-floating-icon" key={question}><FaqIcon size={30} strokeWidth={1.4} /></span></div><div className="mm-faq-questions">{questions.map((item, i) => <div key={item.q} className={question === i ? 'mm-faq-item is-open' : 'mm-faq-item'}><h3><button onClick={() => setQuestion(question === i ? -1 : i)} aria-expanded={question === i} aria-controls={'mm-answer-' + i}><item.Icon size={20} /><span>{item.q}</span><Plus size={19} /></button></h3><div id={'mm-answer-' + i} hidden={question !== i}><p>{item.a}</p>{i === 0 && <button onClick={onOpenBooking} className="mm-text-link">Book appointment <ArrowUpRight size={16} /></button>}{i === 2 && <a href={map} target="_blank" rel="noreferrer" className="mm-text-link">Get directions <ArrowUpRight size={16} /></a>}</div></div>)}</div></div></section>

      <section id="visit" className="mm-visit mm-wrap mm-scene" aria-labelledby="visit-title"><div className="mm-visit-copy"><div className="mm-kicker">05 / SEE YOU IN PURNIA</div><h2 id="visit-title">Your next step<br />starts <em>here.</em></h2><p>{HOSPITAL_PROFILE.address.fullFormatted}</p><div className="mm-visit-actions"><button onClick={onOpenBooking} className="mm-button mm-peach-button">Book appointment <ArrowUpRight size={18} /></button><a href={map} target="_blank" rel="noreferrer" className="mm-text-link"><Navigation size={17} /> Get directions</a></div><a href={phone} className="mm-visit-phone"><Phone size={16} /> {HOSPITAL_PROFILE.phone}</a><small>Please confirm your appointment before visiting.</small></div><div className="mm-visit-scene"><svg className="mm-route" viewBox="0 0 460 350" aria-hidden="true"><path className="mm-route-base" d="M40 290C-10 150 270 320 230 160S430 180 405 45" /><path className="mm-route-trace" d="M40 290C-10 150 270 320 230 160S430 180 405 45" /></svg><a className="mm-map-pin" href={map} target="_blank" rel="noreferrer" aria-label={"Get Google Maps directions to " + HOSPITAL_PROFILE.address.fullFormatted}><MapPin size={33} strokeWidth={1.6} /><span>Glisan Akbari<br /><small>LINE BAZAR · PURNIA ↗</small></span></a><div className="mm-speech"><p>“Mulaaqaat hogi.<br />Khayaal rakhiye!”</p></div><MimoGuide paused={paused} action="visit" /><span className="mm-route-dot" /></div></section>
    </div>

  </div>;
};
