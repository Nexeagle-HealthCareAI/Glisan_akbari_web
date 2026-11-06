import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Phone } from 'lucide-react';
import { HOSPITAL_PROFILE } from '../data/config';
import { hospitalPhone } from './SiteDesign';
import './ExploreCareHero.css';

const poster = '/media/explore-care/explore-care-poster.webp';
const film = '/media/explore-care/explore-care-hero.mp4';

type Connection = EventTarget & { saveData?: boolean };

export function ExploreCareHero() {
  const video = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const desktopInput = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    const update = () => {
      // Narrow desktop windows still play the film; width alone does not identify a phone.
      const allowed = (desktop.matches || desktopInput.matches) && !reducedMotion.matches && !connection?.saveData;
      setEnabled(allowed);
      if (!allowed) setPlaying(false);
    };
    update();
    desktop.addEventListener('change', update);
    desktopInput.addEventListener('change', update);
    reducedMotion.addEventListener('change', update);
    connection?.addEventListener('change', update);
    return () => {
      desktop.removeEventListener('change', update);
      desktopInput.removeEventListener('change', update);
      reducedMotion.removeEventListener('change', update);
      connection?.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    const element = video.current;
    if (!enabled || failed || !element) return;
    let visible = true;
    const syncPlayback = () => {
      if (document.hidden || !visible) element.pause();
      else element.play().catch(() => setPlaying(false));
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.05 });
    observer.observe(element);
    document.addEventListener('visibilitychange', syncPlayback);
    syncPlayback();
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
      element.pause();
    };
  }, [enabled, failed]);

  return (
    <section className="site-explore-hero" aria-labelledby="explore-care-title">
      <div className="site-explore-hero-media" aria-hidden="true">
        <img src={poster} alt="" width="1280" height="720" loading="eager" decoding="async" fetchPriority="high" />
        {enabled && !failed && (
          <video
            ref={video}
            className={playing ? 'is-playing' : undefined}
            src={film}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            tabIndex={-1}
            onPlaying={() => setPlaying(true)}
            onError={() => { setFailed(true); setPlaying(false); }}
          />
        )}
      </div>
      <div className="site-explore-hero-content mm-wrap">
        <div className="site-explore-hero-copy">
          <nav className="site-explore-hero-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Explore care</span>
          </nav>
          <p className="mm-kicker"><span aria-hidden="true" /> EXPLORE CARE</p>
          <h1 id="explore-care-title">Here to help<em>you plan your visit.</em></h1>
          <p className="site-explore-hero-lead">Find a starting point for emergency care, a monitored stay or a planned admission. Our doctors will assess the patient and explain the right next step.</p>
          <div className="site-explore-hero-actions">
            <a className="mm-button" href="#choose-care">Find a starting point <ArrowDown size={17} aria-hidden="true" /></a>
            <a className="site-explore-hero-call" href={hospitalPhone}><Phone size={17} aria-hidden="true" /><span>{HOSPITAL_PROFILE.phone}</span></a>
          </div>
          <p className="site-explore-hero-note">Start with how the patient is feeling.</p>
        </div>
      </div>
    </section>
  );
}
