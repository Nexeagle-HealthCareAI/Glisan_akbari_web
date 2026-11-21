import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { PageHero } from '../components/SiteDesign';
import { LOCATION_CONTENT, type LocationContent } from '../data/content';
import { HOSPITAL_NAME } from '../data/identity';
import { NotFoundPage } from './NotFoundPage';

/** Areas the hospital serves (content/locations.json). The pages exist only while there is at least one. */
export function AreasPage() {
  return (
    <>
      <PageHero label="Areas we serve" title="Areas" accent="we serve." description={`Families from these towns and villages come to ${HOSPITAL_NAME}. Each page says how to reach us from there.`} action="faq" message="We are close by." />
      <section className="site-section mm-wrap">
        <ul className="site-area-list">
          {LOCATION_CONTENT.map((l) => (
            <li key={l.slug}><Link to={`/areas/${l.slug}`}><MapPin size={18} aria-hidden="true" /> <strong>{l.town}</strong>{l.district ? <span>, {l.district}</span> : null}{l.distance ? <span className="site-area-distance">{l.distance}</span> : null}</Link></li>
          ))}
        </ul>
      </section>
    </>
  );
}

export function AreaPage() {
  const { slug } = useParams();
  const area = LOCATION_CONTENT.find((l) => l.slug === slug);
  if (!area) return <NotFoundPage />;
  return <AreaArticle area={area} />;
}

const paragraphs = (text: string) => text.split(/\n+/).map((p) => p.trim()).filter(Boolean);

/** One area page, as the website shows it. Also used by the CRM's preview. */
export function AreaArticle({ area }: { area: LocationContent }) {
  return (
    <article className="site-blog-article mm-wrap">
      <nav className="site-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><Link to="/areas">Areas we serve</Link><span aria-hidden="true">/</span><span aria-current="page">{area.town}</span></nav>
      <header>
        <p className="mm-kicker">{(area.district ? `${area.town}, ${area.district}` : area.town).toUpperCase()}</p>
        <h1>{HOSPITAL_NAME} for patients from {area.town}</h1>
        {area.distance && <p className="site-lead">{area.distance}</p>}
      </header>
      <div className="site-blog-body">
        <section>{paragraphs(area.intro).map((p, i) => <p key={i}>{p}</p>)}</section>
        <section><h2>How to reach us from {area.town}</h2>{paragraphs(area.howToReach).map((p, i) => <p key={i}>{p}</p>)}</section>
        {area.services && area.services.length > 0 && <section><h2>Care people from {area.town} often come for</h2><ul>{area.services.map((s) => <li key={s}>{s}</li>)}</ul></section>}
        {area.faqs && area.faqs.length > 0 && <section><h2>Questions</h2>{area.faqs.map((f) => <details key={f.question} className="site-area-faq"><summary>{f.question}</summary><p>{f.answer}</p></details>)}</section>}
      </div>
      <div className="site-blog-article-footer"><Link to="/contact" className="mm-text-link">Contact and directions <ArrowUpRight size={17} /></Link><Link to="/doctors" className="mm-text-link">Our doctors <ArrowUpRight size={17} /></Link></div>
    </article>
  );
}
