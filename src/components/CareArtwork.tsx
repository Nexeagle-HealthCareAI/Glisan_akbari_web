import React, { useEffect, useId, useRef } from "react";
import { CARE_ARTWORK_DESCRIPTIONS } from '../data/mediaDescriptions';

// Decorative service illustrations: no external images, video downloads or timers.
// Stable service IDs keep artwork consistent when search results change order.
export function CareArtwork({ serviceId, variant = "background", informative = false }: {
  serviceId: string;
  variant?: "background" | "card";
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
  const index = Number(serviceId.replace("srv-", ""));
  const kidney = <path d="M104 37C60 19 43 69 57 103c10 25 34 32 48 15 12-15-9-24-12-35-4-16 28-32 11-46Z" />;
  const bladder = <><path d="M83 52c-30 11-27 53 17 64 44-11 47-53 17-64-11 7-23 7-34 0Z" /><path className="care-art-line" d="M78 32v21m44-21v21m-22 63v20" /></>;
  const prostate = <><path d="M76 76c-24-1-25 35-5 40 11 3 18-10 29-10s18 13 29 10c20-5 19-41-5-40-9-1-16 8-24 8s-15-9-24-8Z" /><path className="care-art-line" d="M67 37c0 48 66 48 66 0m-33 40v58" /></>;
  const heart = <path d="M100 118 60 80C28 48 69 18 100 51c31-33 72-3 40 29Z" />;
  let illustration: React.ReactNode;
  switch (index) {
    case 1: illustration = <>{kidney}<path className="care-art-line" d="m148 37-36 45" /><circle className="care-art-accent care-art-pulse" cx="83" cy="80" r="7" /><path className="care-art-line" d="M106 91c14 10 9 25 12 40" /></>; break;
    case 2: illustration = <>{prostate}<circle className="care-art-ring" cx="100" cy="99" r="32" /></>; break;
    case 3: illustration = <>{bladder}<g className="care-art-drift care-art-accent"><circle cx="88" cy="76" r="4" /><circle cx="112" cy="88" r="4" /><path d="M106 59v10m-5-5h10" /></g></>; break;
    case 4: illustration = <><ellipse cx="77" cy="68" rx="12" ry="8" transform="rotate(-25 77 68)" /><path className="care-art-line care-art-drift" d="M88 66c33-27 17 48 54 20" /><circle className="care-art-ring" cx="100" cy="81" r="53" /></>; break;
    case 5: illustration = <><rect x="67" y="63" width="65" height="57" rx="19" /><path className="care-art-line" d="M98 20v46m47-31-25 34m-65-34 25 34m-5 66h49" /><circle className="care-art-accent care-art-pulse" cx="99" cy="83" r="10" /></>; break;
    case 6: illustration = <>{bladder}<path className="care-art-line care-art-drift" d="M59 77q-12 12 0 24m82-24q12 12 0 24" /><path className="care-art-accent" d="M100 72c-17 21-17 25 0 30 17-5 17-9 0-30Z" /></>; break;
    case 7: illustration = <>{heart}<path className="care-art-line care-art-pulse" d="M53 78h24l10-17 13 32 12-20h35" /></>; break;
    case 8: illustration = <>{kidney}<path className="care-art-line care-art-drift" d="M132 53h26m-9-9 9 9-9 9m9 39h-26m9-9-9 9 9 9" /><path className="care-art-accent" d="M136 75h17m-8-8v17" /></>; break;
    case 9: illustration = <><path className="care-art-line" d="M66 27c0 45 55 42 55 100M132 27c0 35-59 57-59 100" /><circle className="care-art-ring" cx="99" cy="78" r="26" /><circle className="care-art-accent care-art-pulse" cx="99" cy="78" r="8" /></>; break;
    case 10: illustration = <>{prostate}<path className="care-art-line care-art-drift" d="m133 43 9 9 18-20" /><circle className="care-art-ring" cx="143" cy="42" r="25" /></>; break;
    case 11: illustration = <>{kidney}<circle className="care-art-ring" cx="84" cy="79" r="26" /><path className="care-art-line care-art-drift" d="m104 100 25 25" /></>; break;
    case 12: illustration = <>{bladder}<path className="care-art-line care-art-pulse" d="m85 81 10 10 20-24" /><circle className="care-art-ring" cx="100" cy="81" r="47" /></>; break;
    case 13: illustration = <><circle cx="101" cy="45" r="15" /><path d="M74 87c0-36 54-36 54 0v17H74Z" /><path className="care-art-line" d="M88 105v23m25-23v23m-40-47-14 15m70-15 14 15" /><path className="care-art-accent care-art-pulse" d="m151 37 3 8 9 1-7 6 2 9-7-5-8 5 2-9-7-6 9-1Z" /></>; break;
    default: illustration = kidney;
  }
  return <span ref={root} className={"care-artwork care-artwork-" + index + (variant === "card" ? " care-artwork-card" : "")} data-service-id={serviceId} aria-hidden={informative ? undefined : true}>
    <svg viewBox="0 0 200 160" fill="none" focusable="false" role={informative ? 'img' : undefined} aria-labelledby={informative ? titleId : undefined}>
      {informative && <title id={titleId}>{CARE_ARTWORK_DESCRIPTIONS[serviceId] || 'Simplified kidney illustration representing urological care'}</title>}
      <circle className="care-art-halo" cx="100" cy="80" r="69" />
      <g className="care-art-subject">{illustration}</g>
      <circle className="care-art-dot" cx="31" cy="43" r="4" /><circle className="care-art-dot" cx="169" cy="118" r="3" />
    </svg>
  </span>;
}
