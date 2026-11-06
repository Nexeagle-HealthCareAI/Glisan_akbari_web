import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { CARE_DEPARTMENTS, DEPARTMENT_VIDEOS, careDepartmentPath } from '../data/careDepartments';
import { ServiceVideo } from './ServiceVideo';
import { MemoCharacter } from './MemoCharacter';
import { SERVICE_IMAGES } from '../data/serviceImages';
import { CareCardBackdrop } from './CareCard';
import { useCareTabs } from './useCareTabs';
import './DepartmentCards.css';

const departmentImages = {
  urology: 'srv-1', ent: 'ent-3', 'general-medicine': 'medicine-1',
  anesthesiology: 'anaesthesia-1', neurology: 'neurology-2',
};

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
  image: SERVICE_IMAGES[departmentImages[department.id as keyof typeof departmentImages]],
}));

export function HomeCareSection() {
  const { selected, choose, tabs, rail, panel, content: panelContent } = useCareTabs(HOME_CARE_DEPARTMENTS.length);
  const department = HOME_CARE_DEPARTMENTS[selected];
  const video = DEPARTMENT_VIDEOS[department.id];
  return (
    <section id="care" className="mm-care mm-wrap mm-department-showcase" aria-labelledby="care-title">
      <div className="mm-section-heading">
        <div><div className="mm-kicker">01 / EXPLORE WITH MIMO</div><h2 id="care-title">What brings you here?</h2></div>
        <Link to="/services/urologist-in-purnia" className="mm-text-link">Explore care <ArrowUpRight size={17} /></Link>
      </div>
      <div ref={rail} className="mm-department-cards" role="tablist" aria-label="Choose a department for Mimo to explain">
        {HOME_CARE_DEPARTMENTS.map((item, index) => (
          <button type="button" key={item.id} id={'home-care-tab-' + item.id} role="tab"
            ref={(element) => { tabs.current[index] = element; }}
            aria-label={item.title + ': ' + item.hint}
            onClick={() => choose(index)}
            onKeyDown={(event) => {
              const count = HOME_CARE_DEPARTMENTS.length;
              const next = event.key === 'ArrowRight' ? (index + 1) % count
                : event.key === 'ArrowLeft' ? (index + count - 1) % count
                : event.key === 'Home' ? 0 : event.key === 'End' ? count - 1 : undefined;
              if (next === undefined) return;
              event.preventDefault();
              choose(next, true);
            }}
            aria-selected={selected === index} aria-controls="home-care-scene"
            tabIndex={selected === index ? 0 : -1}
            className={'mm-department-tab' + (selected === index ? ' is-active' : '')}>
            <CareCardBackdrop image={item.image} sizes="(max-width: 760px) 210px, 260px" />
            <span className="mm-department-tab-copy"><strong>{item.title}</strong><span>{item.hint}</span></span>
            <ArrowUpRight className="mm-department-tab-arrow" size={19} aria-hidden="true" />
          </button>
        ))}
      </div>
      <div ref={panel} id="home-care-scene" className="mm-care-layout mm-home-care-stage" role="tabpanel"
        aria-labelledby={'home-care-tab-' + department.id} tabIndex={0}>
        <div ref={panelContent} className="mm-department-panel">
          <div id="home-care-details" className="mm-department-copy">
            <span className="mm-kicker">MIMO EXPLAINS</span>
            <h3>{department.title}</h3>
            <p id="home-care-video-description">{department.line}</p>
            <Link className="mm-text-link" to={careDepartmentPath(department.id)}>Explore {department.title} <ArrowUpRight size={17} /></Link>
            <MemoCharacter pose="explaining" cue={selected} className="site-home-care-memo" />
          </div>
          <div className="mm-department-player" data-department={department.id} aria-label={'Mimo explains ' + department.title}>
            <ServiceVideo key={department.id} src={video.src} poster={video.poster} title={department.title} describedBy="home-care-video-description" />
          </div>
        </div>
      </div>
    </section>
  );
}
