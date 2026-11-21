import React, { useEffect, useState } from 'react';
import { PageHero } from '../components/SiteDesign';
import { CampCard, todayInIndia } from '../components/SiteContentBlocks';
import { UPCOMING_CAMPS } from '../data/content';
import { HOSPITAL_NAME } from '../data/identity';

/** Upcoming health camps from content/camps.json. The page exists only while there is at least one. */
export function CampsPage() {
  const [camps, setCamps] = useState(UPCOMING_CAMPS);
  useEffect(() => {
    // The page was built on an earlier day: drop camps that have passed since.
    const t = setTimeout(() => setCamps(UPCOMING_CAMPS.filter((c) => c.date >= todayInIndia())), 0);
    return () => clearTimeout(t);
  }, []);
  return (
    <>
      <PageHero label="Health camps" title="Health camps" accent="Near you." description={`Upcoming health camps by ${HOSPITAL_NAME}. Walk in on the day, or call to ask.`} action="faq" message="Come and get checked." />
      <section className="site-section mm-wrap">
        {camps.length === 0
          ? <p className="site-lead">There are no upcoming camps right now. Please check again soon.</p>
          : <div className="site-camp-grid">{camps.map((c) => <CampCard key={c.slug} camp={c} />)}</div>}
        <p className="site-caption">Dates and places can change. Please call before you travel.</p>
      </section>
    </>
  );
}
