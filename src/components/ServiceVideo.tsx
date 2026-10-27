import React, { useEffect, useRef, useState } from 'react';
import { Volume2 } from 'lucide-react';

type Props = { src: string; poster: string; title: string; describedBy: string };

export function ServiceVideo({ src, poster, title, describedBy }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [activated, setActivated] = useState(false);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);
  const attemptedAutoplay = useRef(false);

  useEffect(() => {
    const player = video.current;
    if (!player) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) setActivated(true);
      else player.pause();
    }, { threshold: 0.25 });
    observer.observe(player);
    const pauseWhenHidden = () => { if (document.hidden) player.pause(); };
    document.addEventListener('visibilitychange', pauseWhenHidden);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', pauseWhenHidden);
      player.pause();
    };
  }, []);

  useEffect(() => {
    if (!activated || !visible || attemptedAutoplay.current) return;
    attemptedAutoplay.current = true;
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Browsers may decline autoplay; native controls remain available.
      video.current?.play().catch(() => {});
    }
  }, [activated, visible]);

  return (
    <div className="site-service-video">
      <video
        ref={video}
        src={activated ? src : undefined}
        poster={poster}
        controls
        muted
        playsInline
        preload="none"
        width="1080"
        height="720"
        title={title + ' department overview with Mimo'}
        aria-label={title + ' department overview — explainer video with Mimo'}
        aria-describedby={describedBy}
        onVolumeChange={(event) => setMuted(event.currentTarget.muted || event.currentTarget.volume === 0)}
        onError={() => setFailed(true)}
      >
        <p>Your browser does not support embedded video. <a href={src}>Watch the {title} department overview</a>.</p>
      </video>
      {failed ? (
        <p className="site-service-video-help" role="status">
          The video could not load. <a href={src}>Open the video</a> or try again.
        </p>
      ) : (
        <div className="site-service-video-help">
          <span>A short guide to your care.</span>
          {muted && <button type="button" onClick={() => {
            const player = video.current;
            if (!player) return;
            player.muted = false;
            player.volume = 1;
            setMuted(false);
            player.play().catch(() => {});
          }}><Volume2 size={16} /> Turn on sound</button>}
        </div>
      )}
    </div>
  );
}
