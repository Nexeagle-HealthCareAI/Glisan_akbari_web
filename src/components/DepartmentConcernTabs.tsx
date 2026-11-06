import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Phone } from 'lucide-react';
import { type CareDepartment, getCareDoctor } from '../data/careDepartments';
import { SERVICE_IMAGES } from '../data/serviceImages';
import { ResponsiveCareImage } from './ResponsiveCareImage';
import { hospitalPhone } from './SiteDesign';
import { useCareTabs } from './useCareTabs';
import './DepartmentConcernTabs.css';

/** Patient-concern tabs adapt the reviewed case-study interaction without scroll pinning. */
export function DepartmentConcernTabs({ department }: { department: CareDepartment }) {
  const { selected, choose, tabs, rail, panel, content } = useCareTabs(department.services.length);
  const service = department.services[selected];
  const doctor = getCareDoctor(department);
  return <section id="care-topics" className="concern-section mm-wrap" aria-labelledby="concern-section-title">
    <div className="concern-heading"><div><p className="mm-kicker">FIND YOUR STARTING POINT</p><h2 id="concern-section-title">Start with your concern.</h2><p>Choose a topic to understand the next step, then explore the full care guide.</p></div><div className="concern-controls" aria-label="Browse care topics"><button type="button" disabled={selected === 0} onClick={() => choose(selected - 1)} aria-label="Previous care topic"><ArrowLeft size={18} /></button><button type="button" disabled={selected === department.services.length - 1} onClick={() => choose(selected + 1)} aria-label="Next care topic"><ArrowRight size={18} /></button></div></div>
    <p className="concern-swipe-hint">{department.label} · {selected + 1} of {department.services.length}<span>Swipe to browse topics</span></p>
    <div ref={rail} className="concern-tabs" role="tablist" aria-label={department.label + ' care topics'}>
      {department.services.map((item, index) => <button type="button" role="tab" key={item.id} id={'concern-tab-' + item.id} ref={element => { tabs.current[index] = element; }}
        className={'concern-tab' + (selected === index ? ' is-active' : '')} aria-selected={selected === index} aria-controls="concern-panel" tabIndex={selected === index ? 0 : -1}
        onClick={() => choose(index)} onKeyDown={event => {
          const next = event.key === 'ArrowRight' ? (index + 1) % department.services.length : event.key === 'ArrowLeft' ? (index - 1 + department.services.length) % department.services.length : event.key === 'Home' ? 0 : event.key === 'End' ? department.services.length - 1 : undefined;
          if (next === undefined) return; event.preventDefault(); choose(next, true);
        }}>
        {SERVICE_IMAGES[item.id] && <span className="concern-tab-image"><ResponsiveCareImage image={SERVICE_IMAGES[item.id]} sizes="190px" /></span>}
        <span className="concern-tab-number">{String(index + 1).padStart(2, '0')}{selected === index && <Check size={13} aria-hidden="true" />}</span><span className="concern-tab-title">{item.title}</span>
      </button>)}
    </div>
    <div ref={panel} id="concern-panel" role="tabpanel" aria-labelledby={'concern-tab-' + service.id} tabIndex={0} className="concern-panel">
      <div ref={content} className="concern-panel-content">
      <figure className="concern-panel-image" key={'image-' + service.id}>{SERVICE_IMAGES[service.id] && <ResponsiveCareImage image={SERVICE_IMAGES[service.id]} sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 42vw, 490px" />}<figcaption>Medical illustration</figcaption></figure>
      <div className="concern-panel-copy" key={'copy-' + service.id}><p className="mm-kicker">LET’S UNDERSTAND IT</p><h3>{service.title}</h3><p>{service.description}</p><p className="concern-visit-tip">Bring any existing reports and questions. Your clinician will explain which assessment and care are appropriate for you.</p><div className="concern-panel-actions">{service.slug && <Link to={'/services/' + service.slug} className="mm-button">Read the full care guide <ArrowUpRight size={17} /></Link>}<a href={doctor?.bookingUrl || hospitalPhone} className="mm-text-link">{doctor ? 'Check appointments' : 'Ask about your visit'}<ArrowUpRight size={16} /></a></div><p className="concern-specialist">{doctor ? doctor.name + ' · ' + (department.id === 'neurology' ? 'Consultant Neurosurgeon' : doctor.specialty) : 'Our team can help you choose the right consultation.'}</p></div>
      </div>
    </div>
    <p className="concern-bottom-note"><Phone size={15} aria-hidden="true" /> Not sure where to start? <a href={hospitalPhone}>Call our team</a>. Urgent symptoms need immediate medical attention.</p>
  </section>;
}
