# Care, SILO and SEO audit — 31 October 2026

Changes were prepared on `updates/oct31-care-silo`, based on `798275e` from `seo/oct29-priority-urology`. Before publication, GitHub main at `ec1a440` was checked: it includes the earlier SEO commit and introduces no conflicting file changes. Publishing this branch does not deploy the production website.

## 1. SILO structure

The site previously followed a partial topical hierarchy. Home and navigation linked to five department pages. Urology had 13 dedicated service pages with structured breadcrumbs, but only the five priority services were explicitly listed together in the overview's initial HTML. Other service links depended on the selected topic or the rotating related-service links. Visible service breadcrumbs did not link to the parent page.

Urology now follows **Home → Urology overview → individual service**, with all 13 service links in the parent's initial HTML, visible parent breadcrumbs matching the existing structured breadcrumbs, and related services chosen by topic instead of array position. The new HTML sitemap links to every public page.

This is not a complete service-and-article SILO for every department. ENT, General Medicine, Anesthesiology and Neurology currently have department pages and educational topic panels, not individual service pages. The blog has no published articles. New thin pages or unapproved articles were not invented to fill that gap. Shared navigation, booking and contact links remain useful across topics; visitors do not need to be trapped inside one department.

## 2. Marketing-focused service pages

All 13 dedicated urology pages now address a specific patient concern, explain what to discuss in consultation, show the doctor's credentials and experience, and offer direct booking and telephone actions. The eight older non-priority pages display simpler introductory copy and consultation notes in place of their earlier promotional introductions. The detailed priority urology content, source service objects, keyword targets, titles, descriptions, opening taglines, H1s, images and existing clinical sections are preserved. Department-page heroes also have appointment and telephone actions.

The new copy does not promise a cure, a guaranteed recovery time or robotic/transplant equipment availability. Existing detailed clinical explanations remain subject to hospital review; this update is not a claim that a clinician reviewed them.

## 3–5. Contact details, YouTube and experience

The hospital number is `9234606330`; active call links use `tel:+919234606330`. Header, footer, mobile actions, contact/booking guidance and generated telephone schema use the shared number. No WhatsApp availability was inferred from the telephone change.

The shared footer includes the supplied YouTube channel alongside Instagram and Facebook. Dr. Noori's homepage hero shows **10+ years of experience**. Shared doctor-profile, doctor-list and trust-strip data use the same experience value instead of the earlier nine-year figure. Other doctors' experience values are unchanged.

## 6. Explore Care

`/explore-care` contains the four requested patient-situation cards, linked Emergency, ICU, HDU and Private rooms sections, emergency symptoms, four arrival steps, a hospital call action, directions and the documents-to-bring reminder. Assessment determines the unit; the descriptions are not a self-diagnosis tool. Treatment wording reflects clinical urgency rather than guaranteeing immediate treatment for every arrival.

The 24×7 emergency and inpatient descriptions come from the user's supplied hospital copy. Before public deployment, the hospital should verify those operational statements, bed/room arrangements and whether the supplied hospital number is staffed around the clock. It is labelled as the hospital contact, not as a verified ambulance dispatch line.

## 7. Sitemaps

An XML sitemap generator already existed. It continues to generate `/sitemap.xml` during `npm run build`, with 28 unique canonical public URLs after adding `/sitemap`. Redirect destinations are included; legacy URLs, query filters and 404 pages are excluded. The new `/sitemap` HTML page groups departments, urology services, doctors and visit information, is linked from the shared footer, and links to the XML sitemap.

The existing test-host indexing safeguards remain unchanged: the default origin is `https://example-domain.com`, robots disallows crawling and pages are `noindex` until the confirmed HTTPS domain and indexing environment are deliberately configured. This draft sitemap must not be submitted as the live hospital sitemap. See `SEO_NOTES.md` for launch configuration.

## 8. 404

The custom 404 design and Nginx/Netlify error handling already existed and were retained. The metadata layer now keeps the 404 page and unknown client-side routes `noindex` even in an indexing-enabled build. Unknown routes use the 404 title instead of generic hospital metadata. Preview routing also handles unknown `.html` URLs and direct `/404.html` with status 404, while allowing the real XML sitemap and assets through.

## Verification

- TypeScript validation and a complete static build.
- Existing URL checks: all 28 public pages, internal crawl reachability, canonicals, sitemap and 135 legacy department redirect cases.
- Existing priority SEO checks: six priority pages, keyword placement, illustrations, clinical section anchors, schema and 30 legacy URL variants.
- New care checks: all 29 rendered pages including 404, shared contact details, YouTube, experience, unique IDs and working in-page anchors; all 13 service decisions, parent breadcrumbs and related links; HTML sitemap coverage; emergency sections; custom 404 routing.
- Before/after comparison against the initial build: all 28 pre-existing route titles, descriptions, canonicals, social image metadata and rendered H1s unchanged. All 13 original service data objects unchanged.
- XML parsed successfully with 28 unique canonical entries and no redirects, 404 URLs, query strings or fragments.
- Updated standalone Finder preview generated at `website-preview.html`.

The session denied starting a local preview server, and browser policy denied opening local file URLs. Browser visual inspection and real HTTP checks were therefore unavailable. Routing checks above exercise the preview middleware and inspect generated HTML; they do not certify the live server's configuration or search rankings. No server configuration was deployed.

Run the checks again after further edits:

```sh
npm run lint
npm run build
npm run check:urls
npm run check:seo
npm run check:care
npm run preview:package
git diff --check
```

## GitHub delivery

The user authorised publishing this batch after reviewing the local preview. Changes remain isolated on `updates/oct31-care-silo`; the original SEO branch is retained. The destination history was compared and all checks were rerun before publication. The delivery uses a pull request into `main`, without force-pushing or deploying the live server. The GitHub pull request records the final published commit and review status.

## Reference guidance

- Google sitemap and internal discovery guidance: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- Google HTTP status and soft 404 guidance: https://developers.google.com/crawling/docs/troubleshooting/http-status-codes
- NHS emergency assessment and prioritisation background (not a source for this hospital's availability or Indian contact numbers): https://www.nhs.uk/nhs-services/urgent-and-emergency-care-services/when-to-go-to-ae/
