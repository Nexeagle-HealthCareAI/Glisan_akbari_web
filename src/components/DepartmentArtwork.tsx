import React, { useEffect, useId, useRef } from 'react';
import { DEPARTMENT_ARTWORK_DESCRIPTIONS } from '../data/mediaDescriptions';

// Lightweight decorative symbols, not anatomical or diagnostic diagrams.
// Shared care-artwork styles pause every animation outside the viewport.
export function DepartmentArtwork({ departmentId, variant = 'background', informative = false }: {
  departmentId: string;
  variant?: 'background' | 'card';
  informative?: boolean;
}) {
  const root = useRef<HTMLSpanElement>(null);
  const titleId = useId();
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (root.current) root.current.dataset.visible = String(entry.isIntersecting);
    });
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  let illustration: React.ReactNode;
  switch (departmentId) {
    case 'ent':
      illustration = <>
        <path d="M107 124c-18 9-29-3-29-16 0-17-24-20-24-49 0-46 69-49 75-9 4 23-7 34-20 44-10 8 1 24-12 25" />
        <path className="care-art-line" d="M78 62c-1-25 32-25 33-3 1 14-20 14-20 28m-20-8c2 12 15 9 15 22" />
        <g className="care-art-line department-art-sound"><path d="M145 56q17 19 0 38m13-49q27 30 0 60" /></g>
        <circle className="care-art-accent care-art-pulse" cx="95" cy="51" r="5" />
      </>;
      break;
    case 'general-medicine':
      illustration = <>
        <path className="care-art-line" d="M57 32v29a28 28 0 0 0 56 0V32m-49 0H53m56 0h10m-34 58v14c0 32 65 32 65-1V91" />
        <circle cx="150" cy="78" r="15" /><circle className="care-art-accent care-art-pulse" cx="150" cy="78" r="6" />
        <path className="care-art-accent" d="M143 24h12v10h10v12h-10v10h-12V46h-10V34h10Z" />
        <path className="care-art-line department-art-heartbeat" pathLength="100" d="M39 108h15l7-12 10 23 9-14h20" />
      </>;
      break;
    case 'anesthesiology':
      illustration = <>
        <path className="care-art-line" d="M56 66c-19-10-25 41 3 41m85-41c19-10 25 41-3 41" />
        <path d="M100 41c-13 0-17 21-30 27-18 9-18 35-2 45 16 10 48 10 64 0 16-10 16-36-2-45-13-6-17-27-30-27Z" />
        <path className="care-art-line" d="M100 105v17c0 17 36 17 36 0" />
        <circle className="care-art-accent department-art-breath" cx="100" cy="91" r="13" />
        <g className="care-art-line department-art-air"><path d="M88 25v-9m12 9V11m12 14v-9" /></g>
      </>;
      break;
    case 'neurology':
      illustration = <>
        <path d="M99 36c-16-16-40-2-38 15-24 1-29 30-14 42-9 24 13 41 31 31 7 15 25 8 22-7 3 15 21 22 28 7 18 10 40-7 31-31 15-12 10-41-14-42 2-17-22-31-38-15Z" />
        <path className="care-art-line" d="M100 39v77M63 52c17-3 21 10 17 19M47 92c14-9 26-3 28 10m4 21c-9-9-7-18 1-23m65-48c-17-3-21 10-17 19m31 21c-14-9-26-3-28 10m-3 21c9-9 7-18-1-23" />
        <g className="care-art-line"><path d="M79 71 91 83l-11 17m48-29-17 12 16 17" /></g>
        <circle className="care-art-accent department-art-neuron" cx="79" cy="71" r="5" />
        <circle className="care-art-accent department-art-neuron" cx="111" cy="83" r="5" />
        <circle className="care-art-accent department-art-neuron" cx="127" cy="100" r="5" />
      </>;
      break;
    default:
      illustration = <>
        <path d="M75 35C44 25 34 58 44 80c8 18 25 22 35 10 9-11-7-17-9-25-3-11 18-20 5-30Zm50 0c31-10 41 23 31 45-8 18-25 22-35 10-9-11 7-17 9-25 3-11-18-20-5-30Z" />
        <path className="care-art-line" d="M71 83c18 10 6 18 17 27m41-27c-18 10-6 18-17 27m-12 22v13" />
        <path d="M84 109c-19 7-11 24 16 25 27-1 35-18 16-25-10 5-22 5-32 0Z" />
        <g className="care-art-accent department-art-flow"><circle cx="82" cy="95" r="3" /><circle cx="118" cy="95" r="3" /></g>
      </>;
  }

  return <span ref={root} className={'care-artwork department-artwork department-artwork-' + departmentId + (variant === 'card' ? ' care-artwork-card' : '')}
    data-department-id={departmentId} aria-hidden={informative ? undefined : true}>
    <svg viewBox="0 0 200 160" fill="none" focusable="false" role={informative ? 'img' : undefined} aria-labelledby={informative ? titleId : undefined}>
      {informative && <title id={titleId}>{DEPARTMENT_ARTWORK_DESCRIPTIONS[departmentId] || DEPARTMENT_ARTWORK_DESCRIPTIONS.urology}</title>}
      <circle className="care-art-halo" cx="100" cy="80" r="69" />
      <g className="care-art-subject">{illustration}</g>
      <circle className="care-art-dot" cx="31" cy="43" r="4" /><circle className="care-art-dot" cx="169" cy="118" r="3" />
    </svg>
  </span>;
}
