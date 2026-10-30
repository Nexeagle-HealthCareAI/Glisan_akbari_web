import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getSeoForPath, SITE_URL, ALLOW_INDEXING } from '../data/seo';
import { generatePageSchema } from '../data/schema';
import { HOSPITAL_NAME, DOCTOR_NAME } from '../data/identity';
import { HOMEPAGE_SEO } from '../data/homepageSeo';
import { SHARED_SOCIAL_IMAGE_ALT } from '../data/mediaDescriptions';

export const PageMeta: React.FC = () => {
  const location = useLocation();
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    const seo = getSeoForPath(location.pathname);
    const isHome = location.pathname === '/';

    // Update Document Title
    document.title = seo.title;

    // Update Meta Description
    let descMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', seo.description);

    // Update Robots Meta according to ALLOW_INDEXING
    let robotsMeta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!ALLOW_INDEXING) {
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.setAttribute('name', 'robots');
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.setAttribute('content', 'noindex, nofollow');
    } else if (robotsMeta) {
      robotsMeta.remove();
    }

    // Update Canonical Link Tag
    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', seo.canonical);
    if (!seo.canonical) canonicalLink.remove();

    // Update OpenGraph Tags
    let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', seo.url);
    if (!seo.url) ogUrl.remove();

    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', seo.title);

    const ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', seo.description);

    const ogImage = document.querySelector<HTMLMetaElement>('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute('content', `${SITE_URL}/og-image.png`);

    const twitterImage = document.querySelector<HTMLMetaElement>('meta[name="twitter:image"]');
    if (twitterImage) twitterImage.setAttribute('content', `${SITE_URL}/og-image.png`);

    // A client-side route change must match the homepage's prerendered head.
    const setMeta = (attribute: 'name' | 'property', key: string, content: string) => {
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!content) { tag?.remove(); return; }
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, key);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };
    setMeta('property', 'og:site_name', isHome ? HOSPITAL_NAME : `${DOCTOR_NAME} Urology Care`);
    setMeta('property', 'og:image:alt', seo.imageAlt || (isHome ? HOMEPAGE_SEO.imageAlt : SHARED_SOCIAL_IMAGE_ALT));
    setMeta('name', 'twitter:image:alt', seo.imageAlt || (isHome ? HOMEPAGE_SEO.imageAlt : SHARED_SOCIAL_IMAGE_ALT));
    setMeta('name', 'twitter:title', seo.title);
    setMeta('name', 'twitter:description', seo.description);
    const shareImage = isHome
      ? (seo.url ? new URL(HOMEPAGE_SEO.imagePath, seo.url).href : '')
      : `${SITE_URL}${seo.imagePath || "/og-image.png"}`;
    setMeta('property', 'og:image', shareImage);
    setMeta('name', 'twitter:image', shareImage);

    // Update Per-Page JSON-LD Structured Data
    let schemaScript = document.querySelector<HTMLScriptElement>(
      'script[type="application/ld+json"]#page-jsonld'
    );
    if (!schemaScript) {
      schemaScript = document.querySelector<HTMLScriptElement>('script[type="application/ld+json"]');
    }
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      schemaScript.id = 'page-jsonld';
      document.head.appendChild(schemaScript);
    }
    schemaScript.text = JSON.stringify(generatePageSchema(location.pathname));

    // Scroll to top on page change
    const pageChanged = previousPath.current !== location.pathname;
    previousPath.current = location.pathname;
    const frame = requestAnimationFrame(() => {
      let target: HTMLElement | null = null;
      try {
        target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
      } catch { /* Ignore malformed anchors without breaking the page. */ }
      if (target) target.scrollIntoView({ behavior: 'instant' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
      if (pageChanged) document.getElementById('main-content')?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.search, location.hash]);

  return null;
};
