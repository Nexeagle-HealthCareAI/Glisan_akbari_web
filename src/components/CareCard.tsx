import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { CareImage } from '../data/serviceImages';
import { ResponsiveCareImage } from './ResponsiveCareImage';
import './CareCard.css';

export function CareCardBackdrop({ image, sizes }: { image: CareImage; sizes?: string }) {
  return <span className="site-card-backdrop">
    <ResponsiveCareImage image={image} sizes={sizes || '(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 45vw, 400px'} />
  </span>;
}

export function CareCard({ to, title, description, image, label, linkLabel = 'Explore care', heading: Heading = 'h2' }: {
  to: string;
  title: string;
  description: string;
  image?: CareImage;
  label?: string;
  linkLabel?: string;
  heading?: 'h2' | 'h3';
}) {
  return <Link to={to} className={'site-care-card' + (image ? ' site-image-card' : '')}>
    {image && <span className="site-card-media"><ResponsiveCareImage image={image} sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 1000px) 45vw, 400px" /></span>}
    <div className="site-card-copy">
      {label && <span className="site-small-label">{label}</span>}
      <Heading>{title}</Heading>
      <p>{description}</p>
      <span className="site-card-link">{linkLabel} <ArrowUpRight size={17} aria-hidden="true" /></span>
    </div>
  </Link>;
}
