import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Brain, Check, ChevronRight, Droplets, Ear, Stethoscope, Wind } from 'lucide-react';
import { CARE_DEPARTMENTS, careDepartmentPath } from '../data/careDepartments';
import { DepartmentArtwork } from './DepartmentArtwork';
import { MimoGuide } from './MimoGuide';

const content = {
  urology: { title: 'Urology', hint: 'Kidney, bladder & urinary concerns', short: 'Questions about kidney or urinary health?', line: 'Explore kidney, bladder and urinary concerns to discuss with your urologist.', Icon: Droplets },
  ent: { title: 'ENT', hint: 'Ear, nose & throat concerns', short: 'Ear, nose or throat concerns? Let’s understand them.', line: 'Explore hearing, sinus and throat concerns to discuss during a consultation.', Icon: Ear },
  'general-medicine': { title: 'General Medicine', hint: 'Everyday health & ongoing conditions', short: 'Not sure where to start with a health concern?', line: 'Explore general health questions and ask the hospital which doctor to consult.', Icon: Stethoscope },
  anesthesiology: { title: 'Anesthesiology', hint: 'Anaesthesia & pain-related questions', short: 'Questions about anaesthesia? Let’s make them clearer.', line: 'Prepare questions about anaesthesia, assessment before surgery and pain relief.', Icon: Wind },
  neurology: { title: 'Neurology', hint: 'Brain, nerve & headache concerns', short: 'Let’s understand questions about brain and nerve health.', line: 'Explore headache, nerve and memory concerns to discuss with a qualified doctor.', Icon: Brain },
};

export const HOME_CARE_DEPARTMENTS = CARE_DEPARTMENTS.map((department) => ({
  ...department,
  ...content[department.id as keyof typeof content],
}));

export function HomeCareSection({ paused }: { paused: boolean }) {
  const [selected, setSelected] = useState(0);
  const department = HOME_CARE_DEPARTMENTS[selected];
  return (
    <section id="care" className="mm-care mm-wrap" aria-labelledby="care-title">
      <div className="mm-section-heading">
        <div><div className="mm-kicker">01 / EXPLORE WITH MIMO</div><h2 id="care-title">What brings you here?</h2></div>
        <Link to="/services" className="mm-text-link">Explore care <ArrowUpRight size={17} /></Link>
      </div>
      <div className="mm-care-layout">
        <div id="home-care-scene" className={'mm-care-scene mm-scene mm-topic-' + selected} data-department={department.id}>
          <div className="mm-scene-grid" />
          <div className="mm-speech" key={department.id}><span>MIMO EXPLAINS</span><p>{department.short}</p></div>
          <div className="mm-organ-card" key={'art-' + department.id} role="img" aria-label={department.label + ' illustration'}>
            <span className="mm-card-caption">LET’S UNDERSTAND</span>
            <DepartmentArtwork departmentId={department.id} variant="card" />
            <strong>{department.title}</strong>
          </div>
          <MimoGuide paused={paused} action="care" cue={selected} className="mm-care-mimo" />
          <span className="mm-float-chip mm-care-chip"><Check size={15} /> One step at a time</span>
          <span className="mm-scene-star">✳</span>
          <span className="mm-scene-caption">Your guide to care · Illustrative animation</span>
        </div>
        <div className="mm-topic-panel">
          <p className="mm-small-heading">CHOOSE A DEPARTMENT. LET’S MAKE IT SIMPLE.</p>
          <div className="mm-topic-list" role="group" aria-label="Explore medical departments">
            {HOME_CARE_DEPARTMENTS.map((item, index) => (
              <button type="button" key={item.id} onClick={() => setSelected(index)} aria-pressed={selected === index}
                aria-controls="home-care-scene home-care-details" className={selected === index ? 'is-active' : ''}>
                <DepartmentArtwork departmentId={item.id} />
                <span className="mm-topic-icon"><item.Icon size={21} strokeWidth={1.6} aria-hidden="true" /></span>
                <span>{item.label}<small>{item.hint}</small></span><ChevronRight size={18} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div id="home-care-details" className="mm-topic-details" aria-live="polite" aria-atomic="true">
            <p>{department.line}</p>
            <Link className="mm-text-link" to={careDepartmentPath(department.id)}>Explore {department.title} <ArrowUpRight size={17} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
