/**
 * Counts clicks on call, WhatsApp and booking links, and sent enquiries, per page, for the CRM's "Search & results"
 * tab. Only the kind of click and the page path are sent: no names, numbers, cookies or addresses.
 * Off unless VITE_CRM_EVENTS_URL is set when the site is built.
 */
const EVENTS_URL = (import.meta.env?.VITE_CRM_EVENTS_URL as string | undefined) || '';
/** Enquiries also go to the CRM's Leads inbox, with the page they were sent from, when this is set. */
const LEADS_URL = (import.meta.env?.VITE_CRM_LEADS_URL as string | undefined) || '';

export const trackingOn = EVENTS_URL.length > 0;
export const leadsOn = LEADS_URL.length > 0;

const CAMPAIGN_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'gclid'] as const;
const VISIT_KEY = 'crm-visit';

/**
 * Keeps the ad or campaign tags from the address the visitor landed on, for this visit only (the tab's session storage),
 * so an enquiry sent from another page still says which ad brought them. Moving between pages drops them from the address.
 */
function rememberCampaign() {
  if (!LEADS_URL || typeof window === 'undefined') return;
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    for (const k of CAMPAIGN_KEYS) { const v = params.get(k); if (v) found[k] = v.slice(0, 200); }
    if (Object.keys(found).length) sessionStorage.setItem(VISIT_KEY, JSON.stringify(found));
  } catch { /* storage blocked: the landing page's own address still works */ }
}

function campaignTags(): Record<string, string> {
  const out: Record<string, string> = {};
  try {
    const saved = JSON.parse(sessionStorage.getItem(VISIT_KEY) || '{}') as Record<string, unknown>;
    for (const k of CAMPAIGN_KEYS) if (typeof saved[k] === 'string') out[k] = saved[k] as string;
  } catch { /* nothing saved */ }
  const params = new URLSearchParams(window.location.search);
  for (const k of CAMPAIGN_KEYS) { const v = params.get(k); if (v) out[k] = v; }
  return out;
}

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
  rememberCampaign();
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
  const body: Record<string, string> = { ...fields, ...campaignTags(), page: window.location.pathname } as Record<string, string>;
  fetch(LEADS_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), keepalive: true }).catch(() => { /* the hospital still has the request in its own system */ });
}
