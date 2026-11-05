import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const easing = 'cubic-bezier(.22,1,.36,1)';
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Shared, interruptible transitions for department and patient-concern selectors. */
export function useCareTabs(count: number) {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const rail = useRef<HTMLDivElement | null>(null);
  const panel = useRef<HTMLDivElement | null>(null);
  const content = useRef<HTMLDivElement | null>(null);
  const direction = useRef(1);
  const oldHeight = useRef<number | null>(null);
  const interacted = useRef(false);

  const choose = (index: number, focus = false) => {
    if (index < 0 || index >= count) return;
    if (index !== selected) {
      interacted.current = true;
      direction.current = index > selected ? 1 : -1;
      oldHeight.current = panel.current?.getBoundingClientRect().height ?? null;
      setSelected(index);
    }
    if (focus) tabs.current[index]?.focus({ preventScroll: true });
  };

  useEffect(() => {
    if (!interacted.current) return;
    // Scroll only the rail; scrollIntoView also moves the page vertically.
    const reveal = () => {
      const strip = rail.current;
      const tab = tabs.current[selected];
      if (!strip || !tab) return;
      const stripBox = strip.getBoundingClientRect();
      const tabBox = tab.getBoundingClientRect();
      const margin = 12;
      const offset = tabBox.left < stripBox.left + margin
        ? tabBox.left - stripBox.left - margin
        : tabBox.right > stripBox.right - margin
          ? tabBox.right - stripBox.right + margin : 0;
      if (offset) strip.scrollTo({ left: strip.scrollLeft + offset, behavior: reducedMotion() ? 'instant' : 'smooth' });
    };
    const frame = requestAnimationFrame(reveal);
    // Measure again after the selected card reaches its expanded width.
    const timer = window.setTimeout(reveal, reducedMotion() ? 0 : 430);
    return () => { cancelAnimationFrame(frame); clearTimeout(timer); };
  }, [selected]);

  useLayoutEffect(() => {
    const element = content.current;
    if (!interacted.current || !element || reducedMotion() || !element.animate) return;
    const enter = element.animate([
      { opacity: .15, transform: `translateX(${20 * direction.current}px)` },
      { opacity: 1, transform: 'translateX(0)' },
    ], { duration: 300, easing });
    const container = panel.current;
    const height = container?.getBoundingClientRect().height;
    const resize = container && height && oldHeight.current !== null && Math.abs(height - oldHeight.current) > 1
      ? container.animate([{ height: `${oldHeight.current}px` }, { height: `${height}px` }], { duration: 300, easing })
      : undefined;
    oldHeight.current = null;
    return () => { enter.cancel(); resize?.cancel(); };
  }, [selected]);

  // Content changes with selection, even if the browser pauses an animation.
  return { selected, choose, tabs, rail, panel, content };
}
