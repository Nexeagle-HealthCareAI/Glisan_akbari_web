import React from 'react';
import { Phone } from 'lucide-react';
import { PageHero, hospitalPhone } from '../components/SiteDesign';

export function ExploreCarePage() {
  return (
    <PageHero
      label="Explore care"
      title="Here to help"
      accent="you plan your visit."
      description="For information about hospital facilities, please speak with our team."
      action="visit"
      message="Our team can help with your questions."
    >
      <a className="mm-button" href={hospitalPhone}>
        <Phone size={17} /> Talk to our team
      </a>
    </PageHero>
  );
}
