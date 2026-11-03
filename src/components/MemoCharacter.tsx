import React, { useEffect, useRef } from 'react';

export type MemoPose = 'sad' | 'resting' | 'happy' | 'waving' | 'thinking' | 'explaining';

// Render the approved sheet without regenerating or changing Memo's identity.
// Tight source rectangles exclude neighbouring poses and keep the transparent background.
const poses: Record<MemoPose, { frame: [number, number, number, number]; label: string }> = {
  sad: { frame: [105, 5, 330, 493], label: 'Memo, the orange plush doctor guide, looking gently sad and sympathetic' },
  resting: { frame: [545, 35, 420, 465], label: 'Memo, the orange plush doctor guide, sitting peacefully with a contented smile' },
  happy: { frame: [1005, 2, 500, 496], label: 'Memo, the orange plush doctor guide, smiling happily with both arms raised' },
  waving: { frame: [35, 500, 470, 510], label: 'Memo, the orange plush doctor guide, waving hello' },
  thinking: { frame: [605, 500, 325, 510], label: 'Memo, the orange plush doctor guide, thinking with a hand at the chin' },
  explaining: { frame: [995, 500, 515, 510], label: 'Memo, the orange plush doctor guide, explaining with an open hand and a clipboard' },
};

export function MemoCharacter({ pose, className = '', paused = false, cue = 0 }: {
  pose: MemoPose; className?: string; paused?: boolean; cue?: number;
}) {
  const root = useRef<HTMLDivElement>(null);
  const lastCue = useRef(cue);
  const { frame: [x, y, width, height], label } = poses[pose];
  const largest = Math.max(width, height);
  const src = '/media/memo/memo-poses.webp';
  const asset = typeof window !== 'undefined' ? (window as any).__SITE_ASSETS__?.[src] || src : src;

  useEffect(() => {
    if (lastCue.current === cue) return;
    lastCue.current = cue;
    if (paused || document.hidden || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const animation = root.current?.animate([
      { transform: 'translateY(0) rotate(0deg)' },
      { transform: 'translateY(-7px) rotate(-2deg)', offset: .45 },
      { transform: 'translateY(0) rotate(0deg)' },
    ], { duration: 650, easing: 'cubic-bezier(.22,1,.36,1)' });
    return () => animation?.cancel();
  }, [cue, paused]);

  return <div ref={root} className={`memo-character memo-${pose} ${className}`}
    data-memo-pose={pose} data-paused={paused} role="img" aria-label={label}>
    <span className="memo-ground" aria-hidden="true" />
    <span className="memo-motion" aria-hidden="true">
      <span className="memo-crop" style={{
        width: `${width / largest * 100}%`, height: `${height / largest * 100}%`,
        left: `${(1 - width / largest) * 50}%`,
      }}>
        <img src={asset} alt="" width="1536" height="1024" loading="lazy" decoding="async"
          draggable={false} style={{ width: `${1536 / width * 100}%`, height: `${1024 / height * 100}%`,
            left: `${-x / width * 100}%`, top: `${-y / height * 100}%` }} />
      </span>
    </span>
  </div>;
}
