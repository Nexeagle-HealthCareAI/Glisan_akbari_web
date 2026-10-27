import { loadMimoArtwork } from './MimoArtwork';
import React, { useEffect, useRef, useState } from 'react';
import { drawCharacterRig, RIG_PADDING } from './MimoRig';
import { getMimoPose, MIMO_ACTIONS, REST_POSE, type MimoAction } from './MimoMotion';
import { MIMO_IMAGE_ALT } from '../data/mediaDescriptions';

export function MimoGuide({ paused, action = 'welcome', cue = 0, className = '' }: {
  paused: boolean; action?: MimoAction; cue?: number; className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const shadow = useRef<HTMLSpanElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  const controller = useRef<{ sync: () => void; replay: () => void } | null>(null);
  const [ready, setReady] = useState(false);
  pausedRef.current = paused;

  useEffect(() => {
    let disposed = false, frame = 0, visible = false, elapsed = 0;
    let previous = 0, lastRigPaint = -Infinity, forceRig = true;
    let loaded: HTMLCanvasElement | undefined;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const poseAt = () => media.matches ? REST_POSE : getMimoPose(action, elapsed);
    const paint = (force = false) => {
      const context = canvas.current?.getContext('2d');
      if (!loaded || !context) return;
      const pose = poseAt();
      if (body.current) {
        body.current.style.transform = 'translate3d(' + pose.x + '%, ' + pose.y + '%, 0) rotate(' + pose.tilt + 'deg) rotateY(' + pose.turn + 'deg) scale(' + pose.scale + ')';
      }
      if (shadow.current) {
        shadow.current.style.transform = 'translateX(' + pose.x + '%) scaleX(' + (1 + pose.y * .025) + ')';
        shadow.current.style.opacity = String(1 + pose.y * .07);
      }
      // Body transforms run smoothly; texture deformation has its own bounded frame rate.
      if (force || forceRig || Math.abs(elapsed - lastRigPaint) >= 1 / 24) {
        drawCharacterRig(context, loaded, pose, action);
        lastRigPaint = elapsed; forceRig = false;
      }
    };
    const stop = () => { cancelAnimationFrame(frame); frame = 0; previous = 0; };
    const canRun = () => loaded && visible && !pausedRef.current && !media.matches && !document.hidden && !disposed;
    const tick = (now: number) => {
      if (!canRun()) { stop(); return; }
      if (!previous) previous = now;
      const delta = Math.min((now - previous) / 1000, .06);
      previous = now;
      elapsed += delta;
      paint();
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      if (media.matches) { stop(); paint(true); }
      else if (!canRun()) stop();
      else if (!frame) frame = requestAnimationFrame(tick);
    };
    const replay = () => {
      if (pausedRef.current || media.matches) return;
      elapsed = 0; previous = 0; forceRig = true;
      paint(true); sync();
    };
    controller.current = { sync, replay };
    const observer = new IntersectionObserver(([entry]) => {
      const entered = !visible && entry.isIntersecting;
      visible = entry.isIntersecting;
      // Returning to a section gives the visitor a complete performance.
      if (entered && !pausedRef.current && !media.matches) replay();
      else sync();
    }, { threshold: .12 });
    if (root.current) observer.observe(root.current);
    void loadMimoArtwork(action).then(image => {
      if (disposed) return;
      loaded = image; paint(true); setReady(true); sync();
    }).catch(() => { /* Keep the accessible label if artwork cannot load. */ });
    media.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      disposed = true; stop(); observer.disconnect(); controller.current = null;
      media.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [action]);

  useEffect(() => { controller.current?.sync(); }, [paused]);
  useEffect(() => { controller.current?.replay(); }, [cue]);

  return <div ref={root} className={'mm-mimo ' + className} data-action={action}
    aria-label={MIMO_ACTIONS[action].label} role="img"
    onPointerEnter={() => controller.current?.replay()}>
    <span ref={shadow} className="mm-mimo-shadow" />
    <div ref={body} className="mm-mimo-body">
      <img src="/media/mimo-original.png" alt={MIMO_IMAGE_ALT} width="1226" height="1283" loading="lazy" style={{ opacity: !ready && action === 'doctor' ? 1 : 0 }} />
      <canvas aria-hidden="true" ref={canvas} width={1226 + 2 * RIG_PADDING} height={1283 + 2 * RIG_PADDING} style={{ opacity: ready ? 1 : 0,
        left: (-RIG_PADDING / 1226 * 100) + '%', top: (-RIG_PADDING / 1283 * 100) + '%',
        width: ((1226 + 2 * RIG_PADDING) / 1226 * 100) + '%',
        height: ((1283 + 2 * RIG_PADDING) / 1283 * 100) + '%',
      }}>{MIMO_ACTIONS[action].label}</canvas>
    </div>
  </div>;
}

