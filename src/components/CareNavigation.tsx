import React, { useEffect, useId, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Check, ChevronDown } from 'lucide-react';
import { CARE_DEPARTMENTS, careDepartmentPath, getCareDepartment } from '../data/careDepartments';

type Props = { inline?: boolean; onNavigate?: () => void; onOpen?: () => void };

export function CareNavigation({ inline = false, onNavigate, onOpen }: Props) {
  const id = useId();
  const [expanded, setExpanded] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const links = useRef<(HTMLAnchorElement | null)[]>([]);
  const focusIndex = useRef<number | null>(null);
  const { pathname, search, hash } = useLocation();
  const selected = getCareDepartment(pathname);
  const active = pathname === '/services/urologist-in-purnia' || pathname.startsWith('/services/');

  useEffect(() => { setExpanded(false); }, [pathname, search, hash]);
  useEffect(() => {
    if (!expanded) return;
    if (focusIndex.current !== null) links.current[focusIndex.current]?.focus();
    const dismiss = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setExpanded(false);
    };
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, [expanded]);

  const show = (index: number | null = null) => {
    focusIndex.current = index;
    setExpanded(true);
    onOpen?.();
  };

  return (
    <div ref={root} className={'site-care-nav' + (inline ? ' site-care-nav-inline' : '') + (active ? ' is-active' : '')}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setExpanded(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && expanded) {
          event.preventDefault();
          event.stopPropagation();
          setExpanded(false);
          trigger.current?.focus();
        }
      }}>
      <button type="button" ref={trigger} className="site-care-nav-trigger"
        aria-expanded={expanded} aria-controls={id}
        onClick={() => expanded ? setExpanded(false) : show()}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            const index = event.key === 'ArrowDown' ? 0 : CARE_DEPARTMENTS.length - 1;
            if (expanded) links.current[index]?.focus();
            else show(index);
          }
        }}>
        Departments <ChevronDown size={15} aria-hidden="true" />
      </button>
      <div id={id} hidden={!expanded} className="site-care-dropdown" role="group" aria-label="Departments">
        {CARE_DEPARTMENTS.map((department, index) => (
          <Link key={department.id} to={careDepartmentPath(department.id)}
            ref={(element) => { links.current[index] = element; }}
            aria-current={active && selected.id === department.id ? 'page' : undefined}
            onClick={() => { setExpanded(false); onNavigate?.(); }}
            onKeyDown={(event) => {
              let next: number | undefined;
              if (event.key === 'ArrowDown') next = (index + 1) % CARE_DEPARTMENTS.length;
              if (event.key === 'ArrowUp') next = (index + CARE_DEPARTMENTS.length - 1) % CARE_DEPARTMENTS.length;
              if (event.key === 'Home') next = 0;
              if (event.key === 'End') next = CARE_DEPARTMENTS.length - 1;
              if (next !== undefined) { event.preventDefault(); links.current[next]?.focus(); }
            }}>
            <span>{department.label}</span>
            {active && selected.id === department.id && <Check size={15} aria-hidden="true" />}
          </Link>
        ))}
      </div>
    </div>
  );
}
