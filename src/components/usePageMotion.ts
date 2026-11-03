import { useEffect, type RefObject } from 'react';

const revealSelectors = [
  '.site-hero > div:first-child', '.site-hero > .site-guide', '.site-service-feature',
  '.mm-hero-copy', '.mm-doctor-video-slot', '.mm-hero-details',
  '.mm-welcome-inner > div', '.mm-section-heading', '.site-section-heading',
  '.site-section > h2', '.site-directory-intro', '.site-blog-intro',
  '.site-card-grid > *', '.site-doctor-grid > *', '.site-blog-grid > *',
  '.site-care-choice-grid > *', '.site-stay-grid > *', '.site-service-directory > a',
  '.site-reading > section', '.site-procedures > div', '.site-profile-card',
  '.site-condition-tabs > button', '.site-condition-detail', '.site-decision > div',
  '.site-arrival-steps > li', '.site-emergency-heading > div', '.site-emergency-columns > div',
  '.site-bring-note', '.site-cta > div', '.site-footer-grid > div', '.site-footer-bottom',
  '.site-blog-hero-inner > div', '.site-blog-library > h2', '.site-blog-filters',
  '.mm-visit-copy', '.mm-visit-scene', '.mm-department-player', '.mm-topic-details',
  '.site-contact-card', '.site-location-card', '.site-accordion > details',
  '.site-legal-reading > section', '.site-sitemap-grid > section',
].join(',');

/** Progressive enhancement: prerendered content stays visible without JavaScript or motion. */
export function usePageMotion(root: RefObject<HTMLDivElement | null>, route: string, paused = false) {
  useEffect(() => {
    const element = root.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const active = new Set<Animation>();
    const registered = new WeakSet<Element>();
    const scenes = new WeakSet<Element>();
    let scrollFrame = 0;
    let scanFrame = 0;
    let disposed = false;

    const reveal = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const target = entry.target as HTMLElement;
        reveal.unobserve(target);
        target.dataset.reveal = 'shown';
        if (paused || media.matches || document.hidden || typeof target.animate !== 'function') continue;
        const siblings = target.parentElement?.children;
        const index = siblings ? Array.from(siblings).indexOf(target) : 0;
        const isArt = target.matches('.site-guide, .site-service-feature, .mm-visit-scene, .mm-doctor-video-slot');
        const animation = target.animate([
          { opacity: 0, transform: `translate3d(0, ${isArt ? 34 : 24}px, 0)${isArt ? ' scale(.96)' : ''}` },
          { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' },
        ], { duration: isArt ? 850 : 700, delay: Math.min(index * 65, 260),
          easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
        active.add(animation);
        animation.onfinish = animation.oncancel = () => active.delete(animation);
      }
    }, { threshold: .04, rootMargin: '0px 0px -24px 0px' });

    const visibility = new IntersectionObserver(entries => {
      for (const entry of entries) (entry.target as HTMLElement).dataset.visible = String(entry.isIntersecting);
    }, { threshold: .04, rootMargin: '40px' });

    const updateProgress = () => {
      scrollFrame = 0;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, distance > 0 ? window.scrollY / distance : 0));
      const bar = element.querySelector<HTMLElement>('.site-scroll-progress');
      if (bar) bar.style.transform = `scaleX(${progress})`;
      element.querySelector('.site-header')?.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    const queueProgress = () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateProgress); };
    const scan = () => {
      scanFrame = 0;
      if (disposed) return;
      element.querySelectorAll<HTMLElement>(revealSelectors).forEach(target => {
        if (registered.has(target)) return;
        registered.add(target);
        // Avoid doubling movement when a parent and its children enter together.
        if (target.parentElement?.closest('[data-reveal]')) return;
        target.dataset.reveal = 'ready';
        reveal.observe(target);
      });
      element.querySelectorAll<HTMLElement>('.memo-character, .mm-scene').forEach(target => {
        if (scenes.has(target)) return;
        scenes.add(target);
        visibility.observe(target);
      });
      queueProgress();
    };
    const syncVisibility = () => {
      element.dataset.tabActive = String(!document.hidden);
      for (const animation of active) document.hidden ? animation.pause() : animation.play();
    };
    const syncPreference = () => {
      element.dataset.reducedMotion = String(media.matches);
      if (media.matches) for (const animation of active) animation.cancel();
    };
    const mutation = new MutationObserver(records => {
      if (records.some(record => record.addedNodes.length) && !scanFrame) scanFrame = requestAnimationFrame(scan);
      queueProgress();
    });

    scan(); syncVisibility(); syncPreference();
    mutation.observe(element, { childList: true, subtree: true });
    window.addEventListener('scroll', queueProgress, { passive: true });
    window.addEventListener('resize', queueProgress, { passive: true });
    document.addEventListener('visibilitychange', syncVisibility);
    media.addEventListener('change', syncPreference);
    return () => {
      disposed = true;
      cancelAnimationFrame(scrollFrame); cancelAnimationFrame(scanFrame);
      reveal.disconnect(); visibility.disconnect(); mutation.disconnect();
      for (const animation of active) animation.cancel();
      element.querySelectorAll('[data-reveal]').forEach(target => target.removeAttribute('data-reveal'));
      window.removeEventListener('scroll', queueProgress);
      window.removeEventListener('resize', queueProgress);
      document.removeEventListener('visibilitychange', syncVisibility);
      media.removeEventListener('change', syncPreference);
    };
  }, [root, route, paused]);
}
