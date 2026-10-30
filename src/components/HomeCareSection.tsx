import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { CARE_DEPARTMENTS, DEPARTMENT_VIDEOS, careDepartmentPath } from '../data/careDepartments';
import { ServiceVideo } from './ServiceVideo';

const content = {
  urology: { title: 'Urology', hint: 'Kidney, bladder & urinary concerns', short: 'Questions about kidney or urinary health?', line: 'Explore kidney, bladder and urinary concerns to discuss with your urologist.' },
  ent: { title: 'ENT', hint: 'Ear, nose & throat concerns', short: 'Ear, nose or throat concerns? Let’s understand them.', line: 'Explore hearing, sinus and throat concerns to discuss during a consultation.' },
  'general-medicine': { title: 'General Medicine', hint: 'Everyday health & ongoing conditions', short: 'Not sure where to start with a health concern?', line: 'Explore general health questions and ask the hospital which doctor to consult.' },
  anesthesiology: { title: 'Anesthesiology', hint: 'Anaesthesia & pain-related questions', short: 'Questions about anaesthesia? Let’s make them clearer.', line: 'Prepare questions about anaesthesia, assessment before surgery and pain relief.' },
  neurology: { title: 'Neurology', hint: 'Brain, nerve & headache concerns', short: 'Let’s understand questions about brain and nerve health.', line: 'Explore headache, nerve and memory concerns to discuss with a qualified doctor.' },
};

export const HOME_CARE_DEPARTMENTS = CARE_DEPARTMENTS.map((department) => ({
  ...department,
  ...content[department.id as keyof typeof content],
}));

export function HomeCareSection() {
  const section = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState(0);
  const department = HOME_CARE_DEPARTMENTS[selected];
  const video = DEPARTMENT_VIDEOS[department.id];
  const selectDepartment = (index: number) => {
    setSelected(index);
    requestAnimationFrame(() => {
      const bounds = section.current?.querySelector('#home-care-scene')?.getBoundingClientRect();
      const actionsHeight = document.querySelector('.mm-mobile-actions')?.getBoundingClientRect().height || 0;
      // Keep the selected video above the mobile booking bar after focus settles.
      if (bounds && (bounds.top < 0 || bounds.bottom > window.innerHeight - actionsHeight)) {
        section.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
      }
    });
  };
  return (
    <section ref={section} id="care" className="mm-care mm-wrap" aria-labelledby="care-title">
      <div className="mm-section-heading">
        <div><div className="mm-kicker">01 / EXPLORE WITH MIMO</div><h2 id="care-title">What brings you here?</h2></div>
        <Link to="/services/urologist-in-purnia" className="mm-text-link">Explore care <ArrowUpRight size={17} /></Link>
      </div>
      <div className="mm-department-buttons" role="group" aria-label="Choose a department for Mimo to explain">
        {HOME_CARE_DEPARTMENTS.map((item, index) => (
          <button type="button" key={item.id} title={item.hint}
            onClick={() => selectDepartment(index)}
            aria-pressed={selected === index} aria-controls="home-care-scene home-care-details"
            className={selected === index ? 'is-active' : ''}>
            {item.title}
          </button>
        ))}
      </div>
      <div className="mm-care-layout mm-home-care-stage">
        <div id="home-care-scene" className="mm-department-player" data-department={department.id}
          role="region" aria-label={'Mimo explains ' + department.title}>
          <div className="mm-department-player-heading">
            <span className="mm-kicker">MIMO EXPLAINS</span>
            <h3>{department.title}</h3>
          </div>
          <ServiceVideo key={department.id} src={video.src} poster={video.poster} title={department.title} describedBy="home-care-video-description" />
        </div>
        <div id="home-care-details" className="mm-topic-details" aria-live="polite" aria-atomic="true">
          <p id="home-care-video-description">{department.line}</p>
          <Link className="mm-text-link" to={careDepartmentPath(department.id)}>Explore {department.title} <ArrowUpRight size={17} /></Link>
        </div>
      </div>
    </section>
  );
}
