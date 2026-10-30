import './load-build-env';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_URL, ALLOW_INDEXING, ROUTES_SEO, SITEMAP_ROUTES, PRERENDER_ROUTES, ROUTE_REDIRECTS, getFullUrl } from '../src/data/seo';
import { generatePageSchema } from '../src/data/schema';
import { HOSPITAL_NAME, DOCTOR_NAME, HOSPITAL_CITY, HOSPITAL_SHORT_ADDRESS } from '../src/data/identity';
import { HOMEPAGE_SEO } from '../src/data/homepageSeo';
import { SHARED_SOCIAL_IMAGE_ALT } from '../src/data/mediaDescriptions';
import { CARE_DEPARTMENTS, careDepartmentPath } from '../src/data/careDepartments';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const templatePath = path.resolve(distDir, 'index.html');
const serverEntryPath = path.resolve(rootDir, 'dist-ssr', 'entry-server.js');

async function prerender() {
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Client template not found at ${templatePath}. Run vite build first.`);
  }

  if (!fs.existsSync(serverEntryPath)) {
    throw new Error(`SSR bundle not found at ${serverEntryPath}. Run vite build --ssr first.`);
  }

  const template = fs.readFileSync(templatePath, 'utf-8');
  // Dynamic import of the built SSR bundle
  const { render } = await import(`file://${serverEntryPath}`);

  const prerenderRoutes = PRERENDER_ROUTES;

  console.log(`[SSG] Starting pre-rendering for ${prerenderRoutes.length} static routes...`);
  console.log(`[SSG] SITE_URL: ${SITE_URL}`);
  console.log(`[SSG] ALLOW_INDEXING: ${ALLOW_INDEXING}`);

  let totalPlaceholderCount = 0;
  const pagesWithPlaceholders: { route: string; count: number }[] = [];

  for (const route of prerenderRoutes) {
    const { html: appHtml } = render(route);
    const seo = ROUTES_SEO[route] || {
      path: route,
      title: `Urologist in ${HOSPITAL_CITY} | ${DOCTOR_NAME}`,
      description: `Urologist at ${HOSPITAL_NAME}, ${HOSPITAL_SHORT_ADDRESS}, Bihar.`,
      canonical: getFullUrl(route),
      url: getFullUrl(route),
    };

    let pageHtml = template;

    // 1. Inject prerendered markup into #root
    pageHtml = pageHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );

    // 2. Title tag
    pageHtml = pageHtml.replace(
      /<title>[\s\S]*?<\/title>/i,
      `<title>${escapeHtml(seo.title)}</title>`
    );

    // 3. Meta description
    if (pageHtml.includes('name="description"')) {
      pageHtml = pageHtml.replace(
        /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
        `<meta name="description" content="${escapeHtml(seo.description)}" />`
      );
    } else {
      pageHtml = pageHtml.replace('</head>', `  <meta name="description" content="${escapeHtml(seo.description)}" />\n</head>`);
    }

    // 4. Robots indexing tag
    const robotsTag = '<meta name="robots" content="noindex, nofollow" />';
    if (!ALLOW_INDEXING) {
      if (pageHtml.includes('name="robots"')) {
        pageHtml = pageHtml.replace(/<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i, robotsTag);
      } else {
        pageHtml = pageHtml.replace('</head>', `  ${robotsTag}\n</head>`);
      }
    } else {
      // Remove noindex when indexing is explicitly allowed
      pageHtml = pageHtml.replace(/<meta\s+name="robots"\s+content="noindex,\s*nofollow"\s*\/?>\n?/gi, '');
    }

    // 5. Canonical URL
    const canonicalTag = `<link rel="canonical" href="${seo.canonical}" />`;
    if (pageHtml.includes('rel="canonical"')) {
      pageHtml = pageHtml.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, canonicalTag);
    } else {
      pageHtml = pageHtml.replace('</head>', `  ${canonicalTag}\n</head>`);
    }

    // 6. OpenGraph tags
    const ogUrlTag = `<meta property="og:url" content="${seo.url}" />`;
    if (pageHtml.includes('property="og:url"')) {
      pageHtml = pageHtml.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, ogUrlTag);
    } else {
      pageHtml = pageHtml.replace('</head>', `  ${ogUrlTag}\n</head>`);
    }

    pageHtml = pageHtml.replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:title" content="${escapeHtml(seo.title)}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:description" content="${escapeHtml(seo.description)}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:image" content="${SITE_URL}/og-image.png" />`
    );

    // 7. Twitter tags
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:image" content="${SITE_URL}/og-image.png" />`
    );

    if (route === '/') {
      pageHtml = pageHtml.replace(
        /<meta\s+property="og:site_name"\s+content="[^"]*"\s*\/?>/i,
        `<meta property="og:site_name" content="${escapeHtml(HOMEPAGE_SEO.siteName)}" />`
      );
      if (seo.url) {
        const image = new URL(HOMEPAGE_SEO.imagePath, seo.url).href;
        pageHtml = pageHtml.replace(/(<meta\s+(?:property="og:image"|name="twitter:image")\s+content=")[^"]*("\s*\/?>)/gi, `$1${escapeHtml(image)}$2`);
      } else {
        // No official domain yet: omit URL tags rather than advertising a placeholder.
        pageHtml = pageHtml.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>\n?/i, '');
        pageHtml = pageHtml.replace(/<meta\s+(?:property="og:(?:url|image)"|name="twitter:image")\s+content="[^"]*"\s*\/?>\n?/gi, '');
      }
    }

    if (seo.imagePath) {
      const image = getFullUrl(seo.imagePath);
      pageHtml = pageHtml.replace(/(<meta\s+(?:property="og:image"|name="twitter:image")\s+content=")[^"]*("\s*\/?>)/gi, `$1${escapeHtml(image)}$2`);
    }
    // Descriptions for social preview images match client-side navigation.
    const socialImageAlt = seo.imageAlt || (route === '/' ? HOMEPAGE_SEO.imageAlt : SHARED_SOCIAL_IMAGE_ALT);
    pageHtml = pageHtml.replace('</head>', `  <meta property="og:image:alt" content="${escapeHtml(socialImageAlt)}" />\n  <meta name="twitter:image:alt" content="${escapeHtml(socialImageAlt)}" />\n</head>`);

    // 8. Per-Route JSON-LD Structured Data (Task 6)
    const pageSchema = generatePageSchema(route);
    const jsonLdBlock = `  <script type="application/ld+json" id="page-jsonld">\n${JSON.stringify(pageSchema, null, 2)}\n  </script>`;
    if (pageHtml.includes('id="page-jsonld"')) {
      pageHtml = pageHtml.replace(/<script[^>]*id="page-jsonld"[^>]*>[\s\S]*?<\/script>/i, jsonLdBlock.trim());
    } else if (pageHtml.includes('application/ld+json')) {
      pageHtml = pageHtml.replace(/<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/i, jsonLdBlock.trim());
    } else {
      pageHtml = pageHtml.replace('</head>', `${jsonLdBlock}\n</head>`);
    }

    // Check placeholder occurrences in the pre-rendered page
    const placeholderMatches = pageHtml.match(/\[PLACEHOLDER/g);
    if (placeholderMatches && placeholderMatches.length > 0) {
      totalPlaceholderCount += placeholderMatches.length;
      pagesWithPlaceholders.push({ route, count: placeholderMatches.length });
    }

    // 9. Determine target output path
    let targetFilePath = '';
    if (route === '/') {
      targetFilePath = path.join(distDir, 'index.html');
    } else if (route === '/404') {
      targetFilePath = path.join(distDir, '404.html');
    } else {
      const routeDir = path.join(distDir, route.replace(/^\//, ''));
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }
      targetFilePath = path.join(routeDir, 'index.html');
    }

    fs.writeFileSync(targetFilePath, pageHtml, 'utf-8');
    console.log(`[SSG] Generated: ${path.relative(rootDir, targetFilePath)} (route: ${route})`);
  }

  // Portable fallback for static hosts without Netlify redirect support.
  // Retired URLs redirect instead of serving duplicate or removed pages.
  for (const [from, to] of Object.entries(ROUTE_REDIRECTS)) {
    const routeDir = path.join(distDir, from.replace(/^\//, ''));
    fs.mkdirSync(routeDir, { recursive: true });
    const title = ROUTES_SEO[to]?.title || 'Continue';
    const label = to === '/services' ? 'Explore care' : to === '/contact' ? 'Contact and location' : 'Our doctors';
    const departmentPaths = Object.fromEntries(CARE_DEPARTMENTS.map((department) => [department.id, careDepartmentPath(department.id)]));
    const redirectScript = `const params = new URLSearchParams(window.location.search);
let target = ${JSON.stringify(to)};
if (${['/services', '/conditions', '/treatments'].includes(from)} && params.has('department')) {
  const paths = ${JSON.stringify(departmentPaths)};
  target = Object.hasOwn(paths, params.get('department')) ? paths[params.get('department')] : '/services/urologist-in-purnia';
  params.delete('department');
}
window.location.replace(target + (params.size ? '?' + params.toString() : '') + window.location.hash);`;
    fs.writeFileSync(path.join(routeDir, 'index.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><script>${redirectScript}</script><noscript><meta http-equiv="refresh" content="0;url=${escapeHtml(to)}"></noscript><link rel="canonical" href="${escapeHtml(getFullUrl(to))}"><title>${escapeHtml(title)}</title></head><body><p>Continue to <a href="${escapeHtml(to)}">${escapeHtml(label)}</a>.</p></body></html>`);
  }

  // 10. Task 8: Launch Guard Check
  if (ALLOW_INDEXING) {
    const launchErrors: string[] = [];
    if (SITE_URL.includes('example-domain')) {
      launchErrors.push(`SITE_URL still contains temporary domain "example-domain" (${SITE_URL})`);
    }
    if (totalPlaceholderCount > 0) {
      launchErrors.push(
        `Generated pages contain ${totalPlaceholderCount} unresolved [PLACEHOLDER] occurrences across ${pagesWithPlaceholders.length} page(s): ${pagesWithPlaceholders
          .map((p) => `${p.route} (${p.count})`)
          .join(', ')}`
      );
    }

    if (launchErrors.length > 0) {
      console.error('\n❌ [LAUNCH GUARD BUILD FAILED]');
      console.error('ALLOW_INDEXING is enabled (true), but the build is NOT ready for production indexing:');
      launchErrors.forEach((err) => console.error(`  - ${err}`));
      console.error('\nPlease replace all placeholders and configure your real production SITE_URL in src/data/seo.ts before setting ALLOW_INDEXING = true.\n');
      process.exit(1);
    }
  } else {
    console.log(
      `\n⚠️  [Launch Guard Info] ALLOW_INDEXING is false (safe pre-launch mode). Found ${totalPlaceholderCount} placeholders across ${pagesWithPlaceholders.length} page(s). Build continuing...\n`
    );
  }

  // 11. Generate dist/sitemap.xml
  generateSitemap();

  // 12. Generate dist/robots.txt
  generateRobotsTxt();

  // 13. Clean up dist-ssr directory
  const ssrDir = path.resolve(rootDir, 'dist-ssr');
  if (fs.existsSync(ssrDir)) {
    fs.rmSync(ssrDir, { recursive: true, force: true });
  }

  console.log('[SSG] Pre-rendering and static asset generation completed successfully!');
}

function generateSitemap() {
  const sitemapUrls = SITEMAP_ROUTES.map((route) => {
    const loc = getFullUrl(route);
    return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
  }).join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`;

  const sitemapPath = path.join(distDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapXml, 'utf-8');
  console.log(`[SSG] Generated: dist/sitemap.xml (${SITEMAP_ROUTES.length} URLs, no 404, no query strings)`);
}

function generateRobotsTxt() {
  let content = '';
  if (!ALLOW_INDEXING) {
    content = 'User-agent: *\nDisallow: /\n';
  } else {
    content = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  }

  const robotsPath = path.join(distDir, 'robots.txt');
  fs.writeFileSync(robotsPath, content, 'utf-8');
  console.log(`[SSG] Generated: dist/robots.txt (ALLOW_INDEXING = ${ALLOW_INDEXING})`);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

prerender().catch((err) => {
  console.error('[SSG] Error during prerender:', err);
  process.exit(1);
});
