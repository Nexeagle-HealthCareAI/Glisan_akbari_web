/**
 * Counts clicks on call, WhatsApp and booking links, and sent enquiries, per page, for the CRM's "Search & results"
 * tab. Only the kind of click and the page path are sent: no names, numbers, cookies or addresses.
 * Off unless VITE_CRM_EVENTS_URL is set when the site is built.
 */
const EVENTS_URL = (import.meta.env?.VITE_CRM_EVENTS_URL as string | undefined) || '';
/** Enquiries also go to the CRM's Leads inbox, with the page they were sent from, when this is set. */
const LEADS_URL = (import.meta.env?.VITE_CRM_LEADS_URL as string | undefined) || '';

export const trackingOn = EVENTS_URL.length > 0;

export function countClick(kind: 'call' | 'whatsapp' | 'booking' | 'enquiry') {
  if (!EVENTS_URL || typeof navigator === 'undefined' || !navigator.sendBeacon) return;
  try { navigator.sendBeacon(EVENTS_URL, new Blob([JSON.stringify({ kind, page: window.location.pathname })], { type: 'text/plain' })); } catch { /* counting must never get in the way */ }
}

function kindOf(href: string): 'call' | 'whatsapp' | 'booking' | null {
  if (href.startsWith('tel:')) return 'call';
  if (/^https:\/\/(wa\.me|api\.whatsapp\.com|chat\.whatsapp\.com)\//.test(href)) return 'whatsapp';
  if (/^https:\/\/doctordekho\.nexeagle\.com\//.test(href)) return 'booking';
  return null;
}

export function startClickCounting() {
  if (!EVENTS_URL || typeof document === 'undefined') return;
  document.addEventListener('click', (e) => {
    const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
    const kind = a ? kindOf(a.href) : null;
    if (kind) countClick(kind);
  }, { capture: true });
}

/** Sends an enquiry to the CRM's Leads inbox with its page. Never blocks the form: failures are ignored. */
export function sendLead(fields: { name: string; phone: string; department?: string; message?: string }) {
  if (!LEADS_URL) return;
  const params = new URLSearchParams(window.location.search);
  const body: Record<string, string> = { ...fields, page: window.location.pathname } as Record<string, string>;
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'gclid']) { const v = params.get(k); if (v) body[k] = v; }
  fetch(LEADS_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), keepalive: true }).catch(() => { /* the hospital still has the request in its own system */ });
}
