import React, { useEffect, useState } from 'react';
import { BlogArticle } from './BlogsPage';
import { ServicePage } from './ServicePage';
import { urologyServiceContent } from '../data/servicePageContent';
import { BASE_UROLOGY_SERVICES } from '../data/config';
import { CampCard, NoticeBar, TestimonialCard } from '../components/SiteContentBlocks';
import type { BlogContent, CampContent, NoticeContent, ServiceOverride, TestimonialContent, DoctorContent, FaqContent } from '../data/content';

/** Where the CRM serves previews. Only this address is ever asked, whatever the link says. */
const PREVIEW_API = (import.meta.env?.VITE_PREVIEW_API as string | undefined) || 'https://nexmarket-api.nexeagle.com';

type Preview =
  | { type: 'article'; title: string; data: BlogContent }
  | { type: 'service'; title: string; data: ServiceOverride & { id: string } }
  | { type: 'camp'; title: string; data: CampContent }
  | { type: 'notice'; title: string; data: NoticeContent }
  | { type: 'testimonial'; title: string; data: TestimonialContent }
  | { type: 'doctor'; title: string; data: DoctorContent }
  | { type: 'faq'; title: string; data: FaqContent };

/**
 * Shows a page from the CRM that is not published yet, in the website's real design. The link carries a short-lived
 * key in its # part (never sent to the website's server). Nothing here is indexed or saved.
 */
export function PreviewPage() {
  const [state, setState] = useState<{ status: 'loading' | 'ready' | 'error'; preview?: Preview; message?: string }>({ status: 'loading' });
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    const key = params.get('t') ?? '';
    const org = params.get('o') ?? '';
    if (!/^[A-Za-z0-9_-]{20,80}$/.test(key)) { const t = setTimeout(() => setState({ status: 'error', message: 'This preview link is not complete. Open it again from the CRM.' }), 0); return () => clearTimeout(t); }
    let gone = false;
    // A new preview link opened in the same tab: start again.
    const again = () => window.location.reload();
    window.addEventListener('hashchange', again);
    fetch(`${PREVIEW_API}/api/v1/website-preview/${key}${org ? `?org=${encodeURIComponent(org)}` : ''}`)
      .then(async (r) => { if (!r.ok) throw new Error(r.status === 404 ? 'This preview has expired. Open a new one from the CRM.' : 'The preview could not be loaded.'); return r.json() as Promise<Preview>; })
      .then((p) => { if (!gone) setState({ status: 'ready', preview: p }); })
      .catch((e: Error) => { if (!gone) setState({ status: 'error', message: e.message }); });
    return () => { gone = true; window.removeEventListener('hashchange', again); };
  }, []);

  const p = state.preview;
  return (
    <>
      <div className="site-preview-flag" role="status"><strong>Preview</strong> Not published. Only people with this link can see it, for 30 minutes.</div>
      {state.status === 'loading' && <p className="mm-wrap site-section site-lead">Loading the preview…</p>}
      {state.status === 'error' && <div className="mm-wrap site-section"><h1>Preview</h1><p className="site-lead">{state.message}</p></div>}
      {p?.type === 'article' && <BlogArticle post={p.data} />}
      {p?.type === 'service' && <ServicePreview data={p.data} />}
      {p?.type === 'notice' && <><NoticeBar notices={[p.data]} preview /><div className="mm-wrap site-section"><h1>Notice</h1><p className="site-lead">The notice shows like this at the top of every page while it is current.</p></div></>}
      {p?.type === 'camp' && <div className="mm-wrap site-section"><h1>Health camps</h1><div className="site-camp-grid"><CampCard camp={p.data} /></div></div>}
      {p?.type === 'testimonial' && <div className="mm-wrap site-section"><h1>Patient story</h1><div className="site-story-grid"><TestimonialCard story={p.data} /></div></div>}
      {p?.type === 'doctor' && <div className="mm-wrap site-section site-preview-doctor"><p className="mm-kicker">{p.data.department}</p><h1>{p.data.name}</h1><p className="site-lead">{p.data.qualifications}</p><p>{p.data.specialty} · {p.data.yearsOfExperience}</p><p>{p.data.languages}</p>{p.data.biography && <p>{p.data.biography}</p>}<p>{p.data.consultationTimings}</p></div>}
      {p?.type === 'faq' && <div className="mm-wrap site-section"><h1>Question</h1><details open className="site-preview-faq"><summary>{p.data.question}</summary><p>{p.data.answer}</p></details></div>}
    </>
  );
}

function ServicePreview({ data }: { data: ServiceOverride & { id: string } }) {
  const base = BASE_UROLOGY_SERVICES.find((s) => s.id === data.id);
  if (!base) return <div className="mm-wrap site-section"><h1>Service</h1><p className="site-lead">This service page is not on the website.</p></div>;
  const { id: _id, ...changes } = data;
  return <ServicePage content={urologyServiceContent({ ...base, ...changes })} />;
}
