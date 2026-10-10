import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSeoForPath, SITE_URL, ALLOW_INDEXING } from '../data/seo';
import { generatePageSchema } from '../data/schema';

export const PageMeta: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const seo = getSeoForPath(location.pathname);

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

    // Update OpenGraph Tags
    let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', seo.url);

    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', seo.title);

    const ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', seo.description);

    const ogImage = document.querySelector<HTMLMetaElement>('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute('content', `${SITE_URL}/og-image.png`);

    const twitterImage = document.querySelector<HTMLMetaElement>('meta[name="twitter:image"]');
    if (twitterImage) twitterImage.setAttribute('content', `${SITE_URL}/og-image.png`);

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
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return null;
};
