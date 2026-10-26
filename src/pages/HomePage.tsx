import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Phone, MapPin, MessageCircle, Navigation, Video } from 'lucide-react';
import { DOCTOR_PROFILE, HOSPITAL_PROFILE } from '../data/config';
import { MimoGuide } from '../components/MimoGuide';
import { useSiteMotion, hospitalMap } from '../components/SiteDesign';
import { HospitalFeedback } from '../components/HospitalFeedback';
import { HomeCareSection } from '../components/HomeCareSection';
import { HOMEPAGE_LOCATION } from '../data/homepageSeo';
import './HomePage.css';

interface HomePageProps { onOpenBooking: () => void; }
export const HomePage: React.FC<HomePageProps> = ({ onOpenBooking }) => {
  const root = useRef<HTMLDivElement>(null);
  const { paused } = useSiteMotion();
  const phone = 'tel:' + HOSPITAL_PROFILE.phone.replace(/\s+/g, '');
  const map = hospitalMap;
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
        <div className="mm-hero-copy">
          <div className="mm-kicker"><span aria-hidden="true" /> CARE THAT CONNECTS</div>
          <h1 id="hero-title" className="mm-home-heading">Super Speciality Hospital in <span className="mm-highlight">Purnea<svg viewBox="0 0 400 22" preserveAspectRatio="none" aria-hidden="true"><path d="M5 15Q180-4 392 12" /></svg></span></h1>
          <p>Glisan Akbari is a multispeciality hospital in Purnea, Bihar, on Dharamshala Road, Line Bazar. Meet our doctors and explore care for your next visit.</p>
        </div>
        <div className="mm-doctor-video-slot" role="group" aria-label="Placeholder reserved for a future real doctor introduction video">
          <div className="mm-video-slot-top"><span><i /> THE HUMAN SIDE OF CARE</span><Video size={19} /></div>
          <div className="mm-video-empty"><span className="mm-placeholder-ring"><Video size={36} strokeWidth={1.1} /></span><span>Doctor introduction video</span><small>Coming here soon</small></div>
          <div className="mm-video-slot-bottom"><span>A conversation with your doctor.</span><span>01 / INTRODUCTION</span></div>
        </div>
        <div className="mm-hero-details">
          <div className="mm-hero-doctor">
            <span className="mm-kicker">YOUR CONSULTATION</span>
            <h2>{DOCTOR_PROFILE.name}</h2>
            <p>{DOCTOR_PROFILE.professionalTitle}</p>
            <p className="mm-hero-credentials">{DOCTOR_PROFILE.qualifications}</p>
            <p className="mm-hero-languages">Hindi · English · Bengali · Urdu</p>
            <div className="mm-hero-doctor-links"><Link to="/doctors/dr-md-taquedis-noori" className="mm-text-link">Meet Dr. Noori <ArrowUpRight size={16} /></Link><Link to="/doctors" className="mm-text-link">All doctors <ArrowRight size={16} /></Link></div>
          </div>
          <HospitalFeedback />
          <div className="mm-hero-ctas"><button className="mm-button" onClick={onOpenBooking}>Book appointment <ArrowUpRight size={18} /></button><a href={phone} className="mm-text-link"><Phone size={17} /> Talk to our team</a></div>
          <a className="mm-scroll-cue" href="#meet-mimo"><span>↓</span> A friend to guide you along the way</a>
        </div>
      </section>

      <section id="meet-mimo" className="mm-welcome mm-scene" aria-label="Meet Mimo, your digital guide"><div className="mm-wrap mm-welcome-inner"><div className="mm-welcome-character"><MimoGuide paused={paused} action="welcome" /><span className="mm-welcome-spark">✳</span></div><div><div className="mm-kicker">A FAMILIAR FACE. EVERY STEP.</div><h2>Hi, I’m <span>Mimo.</span></h2><p>Your little guide to a clearer hospital visit.</p></div><div className="mm-welcome-bubble"><MessageCircle size={22} /><span>“Chaliye, ek-ek step<br />aasaan banaate hain.”</span></div><a href="#care" className="mm-round-link" aria-label="Explore care with Mimo"><ArrowRight size={24} /></a></div></section>

      <HomeCareSection paused={paused} />


      <section id="visit" className="mm-visit mm-wrap mm-scene" aria-labelledby="visit-title"><div className="mm-visit-copy"><div className="mm-kicker">02 / SEE YOU IN PURNIA</div><h2 id="visit-title">Your next step<br />starts <em>here.</em></h2><p>Visit our hospital in Line Bazar Purnea, on Dharamshala Road.</p><p>{HOMEPAGE_LOCATION}</p><div className="mm-visit-actions"><button onClick={onOpenBooking} className="mm-button mm-peach-button">Book appointment <ArrowUpRight size={18} /></button><a href={map} target="_blank" rel="noreferrer" className="mm-text-link"><Navigation size={17} /> Get directions</a></div><a href={phone} className="mm-visit-phone"><Phone size={16} /> {HOSPITAL_PROFILE.phone}</a><small>Please confirm your appointment before visiting.</small></div><div className="mm-visit-scene"><svg className="mm-route" viewBox="0 0 460 350" aria-hidden="true"><path className="mm-route-base" d="M40 290C-10 150 270 320 230 160S430 180 405 45" /><path className="mm-route-trace" d="M40 290C-10 150 270 320 230 160S430 180 405 45" /></svg><a className="mm-map-pin" href={map} target="_blank" rel="noreferrer" aria-label={"Get Google Maps directions to " + HOMEPAGE_LOCATION}><MapPin size={33} strokeWidth={1.6} /><span>Glisan Akbari<br /><small>LINE BAZAR · PURNIA ↗</small></span></a><div className="mm-speech"><p>“Mulaaqaat hogi.<br />Khayaal rakhiye!”</p></div><MimoGuide paused={paused} action="visit" /><span className="mm-route-dot" /></div></section>
    </div>

  </div>;
};
