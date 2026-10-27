import React, { useEffect, useId, useRef, useState } from 'react';
import { Activity, ArrowRight, AudioLines, Baby, Brain, ClipboardCheck, ClipboardList, Dna, Droplets, Ear, Eye, Hand, HeartPulse, Lightbulb, MessageCircle, Pause, Pill, Play, ScanLine, ShieldCheck, Stethoscope, Syringe, Target, Thermometer, UserRound, Waves, Wind, TestTubeDiagonal, type LucideIcon } from 'lucide-react';
import { SERVICE_EXPLAINERS, type ExplainerIcon } from '../data/serviceExplainers';
import { CareArtwork } from './CareArtwork';
import { DepartmentArtwork } from './DepartmentArtwork';
import './ServiceExplainer.css';

const icons: Record<ExplainerIcon, LucideIcon> = {
  urine: Droplets, scan: ScanLine, plan: ClipboardCheck, flow: Waves,
  test: TestTubeDiagonal, doctor: Stethoscope, fertility: Dna, shield: ShieldCheck,
  heart: HeartPulse, baby: Baby, ear: Ear, sound: AudioLines, nose: Wind,
  speech: MessageCircle, temperature: Thermometer, eye: Eye, medicine: Pill,
  history: ClipboardList, anesthesia: Syringe, pain: Target, monitor: Activity,
  brain: Brain, memory: Lightbulb, face: UserRound, arm: Hand,
};

export function ServiceExplainer({ serviceId, departmentId, title }: {
  serviceId: string;
  departmentId: string;
  title: string;
}) {
  const explanation = SERVICE_EXPLAINERS[serviceId];
  const root = useRef<HTMLElement>(null);
  const descriptionId = useId();
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(element);
    const onVisibility = () => setPageVisible(!document.hidden);
    onVisibility();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  if (!explanation) return null;
  return (
    <figure ref={root} className={'site-service-explainer' + (explanation.urgent ? ' is-urgent' : '') + (explanation.comparison ? ' is-comparison' : '')}
      data-service-explainer={serviceId} data-motion={!paused && visible && pageVisible ? 'playing' : 'paused'}
      aria-label={title + ' — visual explanation'} aria-describedby={descriptionId}>
      <figcaption>
      <div className="service-explainer-topline">
        <span>{explanation.urgent ? 'RECOGNISE SUDDEN CHANGES' : 'AT A GLANCE'}</span>
        {!explanation.urgent && <button type="button" className="service-explainer-toggle" onClick={() => setPaused(value => !value)}
          aria-label={paused ? 'Play service illustration' : 'Pause service illustration'}>
          {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
          {paused ? 'Play' : 'Pause'}
        </button>}
      </div>
      <div className="service-explainer-intro">
        <span className="service-explainer-art">
          {departmentId === 'urology' ? <CareArtwork serviceId={serviceId} variant="card" informative />
            : <DepartmentArtwork departmentId={departmentId} variant="card" informative />}
        </span>
        <span id={descriptionId} className="service-explainer-takeaway">{explanation.takeaway}</span>
      </div>
      </figcaption>
      <ol className="service-explainer-steps">
        {explanation.steps.map((item, index) => {
          const Icon = icons[item.icon];
          return <li key={item.title} style={{ '--step': index } as React.CSSProperties}>
            <span className="service-explainer-node" aria-hidden="true"><Icon size={25} strokeWidth={1.5} />{!explanation.urgent && !explanation.comparison && <span>{index + 1}</span>}</span>
            <div><strong>{item.title}</strong><p>{item.detail}</p></div>
            {index < 2 && !explanation.urgent && !explanation.comparison && <span className="service-explainer-connector" aria-hidden="true"><ArrowRight size={17} /></span>}
          </li>;
        })}
      </ol>
      {explanation.urgent ? <p className="service-explainer-emergency">Seek emergency care immediately. Do not wait for a routine appointment.</p>
        : <p className="service-explainer-footnote">Your doctor guides the next step.</p>}
    </figure>
  );
}
