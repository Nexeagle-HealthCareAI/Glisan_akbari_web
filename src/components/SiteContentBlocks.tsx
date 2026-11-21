import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Clock, MapPin, Megaphone, Phone, Quote, Stethoscope, X } from 'lucide-react';
import { CURRENT_NOTICES, TESTIMONIAL_CONTENT, isCurrent, type CampContent, type NoticeContent, type TestimonialContent } from '../data/content';
import '../pages/ContentBlocks.css';

/** Today in India, in the browser (the build day can be older than today). */
export const todayInIndia = () => new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10);

export const campDate = (d: string) => new Date(`${d}T00:00:00Z`).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export const clock = (t: string) => { const [h, m] = t.split(':').map(Number); return `${((h + 11) % 12) + 1}${m ? ':' + String(m).padStart(2, '0') : ''} ${h < 12 ? 'am' : 'pm'}`; };

function NoticeLine({ notice, onClose }: { notice: NoticeContent; onClose?: () => void }) {
  const link = notice.link;
  return (
    <div className={`site-notice is-${notice.tone}`} role={notice.tone === 'urgent' ? 'alert' : 'status'}>
      <div className="mm-wrap site-notice-inner">
        <Megaphone size={17} aria-hidden="true" />
        <p>{notice.text}{link && <> {link.href.startsWith('/') ? <Link to={link.href}>{link.label}</Link> : <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>}</>}</p>
        {onClose && <button type="button" onClick={onClose} aria-label="Hide this notice"><X size={16} /></button>}
      </div>
    </div>
  );
}

/** Notices from content/notices.json, at the top of every page while they are current. */
export function NoticeBar({ notices = CURRENT_NOTICES, preview = false }: { notices?: NoticeContent[]; preview?: boolean }) {
  const [shown, setShown] = useState(notices);
  useEffect(() => {
    if (preview) return;
    // The page was built on an earlier day: drop notices that have ended since.
    const t = setTimeout(() => setShown(notices.filter((n) => isCurrent(n, todayInIndia()))), 0);
    return () => clearTimeout(t);
  }, [notices, preview]);
  if (shown.length === 0) return null;
  return <div className="site-notices">{shown.map((n) => <NoticeLine key={n.id} notice={n} onClose={preview ? undefined : () => setShown((all) => all.filter((x) => x.id !== n.id))} />)}</div>;
}

export function TestimonialCard({ story }: { story: TestimonialContent }) {
  return (
    <figure className="site-story">
      <Quote size={26} aria-hidden="true" />
      <blockquote>{story.quote}</blockquote>
      <figcaption><strong>{story.name}</strong>{story.place && <span>{story.place}</span>}</figcaption>
    </figure>
  );
}

/** Patient stories on the home page; nothing is shown until there is at least one with consent on record. */
export function TestimonialSection({ stories = TESTIMONIAL_CONTENT }: { stories?: TestimonialContent[] }) {
  if (stories.length === 0) return null;
  return (
    <section className="site-stories mm-wrap" aria-labelledby="stories-title">
      <div className="mm-section-heading"><div><p className="mm-kicker">PATIENT STORIES</p><h2 id="stories-title">In their <em>own words.</em></h2></div></div>
      <div className="site-story-grid">{stories.slice(0, 6).map((s) => <TestimonialCard key={s.id} story={s} />)}</div>
      <p className="site-caption">Shared with each patient&apos;s written consent. Every person&apos;s care is different.</p>
    </section>
  );
}

export function CampCard({ camp }: { camp: CampContent }) {
  return (
    <article className="site-camp" id={camp.slug}>
      <div className="site-camp-date"><CalendarDays size={20} aria-hidden="true" /><span>{campDate(camp.date)}</span></div>
      <h2>{camp.title}</h2>
      <p className="site-camp-line"><Clock size={16} aria-hidden="true" /> {clock(camp.startTime)} to {clock(camp.endTime)}{camp.free && <span className="site-camp-free">Free</span>}</p>
      <p className="site-camp-line"><MapPin size={16} aria-hidden="true" /> {camp.place}{camp.address ? `, ${camp.address}` : ''}</p>
      <p>{camp.description}</p>
      {camp.services.length > 0 && <><h3>What is checked</h3><ul className="site-camp-list">{camp.services.map((s) => <li key={s}>{s}</li>)}</ul></>}
      {camp.doctors.length > 0 && <p className="site-camp-line"><Stethoscope size={16} aria-hidden="true" /> {camp.doctors.join(', ')}</p>}
      {camp.contactPhone && <a className="mm-text-link" href={`tel:+91${camp.contactPhone}`}><Phone size={16} aria-hidden="true" /> Call {camp.contactPhone}</a>}
    </article>
  );
}
