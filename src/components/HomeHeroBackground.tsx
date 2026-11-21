import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

const mediaPath = '/media/home-hero';
const poster = `${mediaPath}/doctor-hero-poster.webp`;

type Connection = EventTarget & { saveData?: boolean };

export function HomeHeroBackground() {
  const video = useRef<HTMLVideoElement>(null);
  const pausedByVisitor = useRef(false);
  const [allowed, setAllowed] = useState(false);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const showVideo = allowed && !failed;

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    const syncPreference = () => {
      const canPlay = !reducedMotion.matches && !connection?.saveData;
      setAllowed(canPlay);
      if (!canPlay) {
        setStarted(false);
        setPlaying(false);
      }
    };
    syncPreference();
    reducedMotion.addEventListener('change', syncPreference);
    connection?.addEventListener('change', syncPreference);
    return () => {
      reducedMotion.removeEventListener('change', syncPreference);
      connection?.removeEventListener('change', syncPreference);
    };
  }, []);

  useEffect(() => {
    const element = video.current;
    if (!showVideo || !element) return;

    let inView = !('IntersectionObserver' in window);
    const syncPlayback = () => {
      if (document.hidden || !inView || pausedByVisitor.current) {
        element.pause();
      } else {
        // If autoplay is blocked, the poster and the play button remain available.
        void element.play().catch(() => {});
      }
    };
    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        syncPlayback();
      }, { threshold: 0.05 })
      : null;
    observer?.observe(element);
    document.addEventListener('visibilitychange', syncPlayback);
    syncPlayback();
    return () => {
      observer?.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
      element.pause();
    };
  }, [showVideo]);

  const togglePlayback = () => {
    const element = video.current;
    if (!element) return;
    pausedByVisitor.current = !element.paused;
    if (pausedByVisitor.current) element.pause();
    else void element.play().catch(() => {});
  };

  return (
    <div className="mm-home-hero-background">
      <div className="mm-home-hero-media" aria-hidden="true">
        <img
          src={poster}
          srcSet={`${mediaPath}/doctor-hero-poster-small.webp 640w, ${poster} 1280w`}
          sizes="(max-width: 600px) 600px, 100vw"
          alt=""
          width={1280}
          height={720}
          fetchPriority="high"
          decoding="async"
        />
        {showVideo && (
          <video
            ref={video}
            className={started ? 'is-ready' : undefined}
            src={`${mediaPath}/doctor-hero.mp4`}
            muted
            loop
            playsInline
            preload="none"
            tabIndex={-1}
            onPlaying={() => { setStarted(true); setPlaying(true); }}
            onPause={() => setPlaying(false)}
            onError={() => setFailed(true)}
          />
        )}
      </div>
      {showVideo && (
        <button
          type="button"
          className="mm-home-hero-toggle"
          aria-label={playing ? 'Pause background video' : 'Play background video'}
          onClick={togglePlayback}
        >
          {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
        </button>
      )}
    </div>
  );
}
