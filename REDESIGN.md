# Full website redesign — review draft

The previous homepage design now carries through all 27 existing routes: home, doctors, Dr. Noori’s profile, services, 13 service detail pages, conditions, treatments, hospital, patient feedback, FAQs, appointment planning, contact, privacy, terms and 404.

The supplied `Logo.png` is used unchanged as `public/media/hospital-logo.png`. It appears in the shared header and footer; browser icons and the social sharing image are generated from it. Cream, deep green, peach, Inter typography and the existing Mimo artwork connect the pages.

## Main changes

- Shared responsive navigation, all-pages menu, footer and mobile call/booking actions.
- Search and category filters for services and FAQs, interactive condition topics, readable service details and a three-step appointment guide.
- Retained the four existing doctor-specific Doctor Dekho booking URLs. Website booking buttons now lead to the planning page; choosing a doctor opens the external booking portal.
- Existing backend and clinical configuration files are retained. The unused booking modal is no longer mounted by the active application.
- Mimo has distinct welcome, explanation, doctor, booking, listening and farewell gestures. Motion can be paused site-wide; the preference persists. Reduced-motion and offscreen/hidden-tab animation controls remain supported.
- Incomplete condition placeholders are replaced in the visible interface by existing service topics. Patient feedback has an honest empty state rather than placeholder testimonials or unsupported live review counts. FAQ structured data shares the same source as the visible questions.
- Inner-page static previews serve their own prerendered HTML instead of falling back to homepage HTML. Unknown Netlify routes use the generated 404 page.

## Final polish

- Redesigned privacy and terms as complete reading pages with section navigation, contact help and links between the notices. Replaced visible placeholder copy and obsolete on-site booking claims with descriptions of the current external booking flow. Hospital-specific disclosures still require final content review.
- Enlarged patient information, search fields and touch targets; added outside-click, keyboard-focus and same-page dismissal for the navigation menu.
- Improved screen-reader focus after route changes and made malformed anchors safe. Standalone preview now supports browser Back/Forward as well as page refresh.
- Aligned feedback and FAQ page descriptions with their actual content.

## Local review

```sh
npm ci
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

Open `http://127.0.0.1:4173`. This redesign is prepared for `Nexeagle-HealthCareAI/Glisan_akbari_web` on `main`, based on its existing revision `061da8e1c172fb763053668a7730b74722e80725`.

For a single-file preview, run `npm run preview:package` after the production build. Open `website-preview.html` in a browser. This embeds the artwork, logo and font; internal navigation and refreshing a selected page are supported. The standalone file is approximately 9.15 MB and is intended for review. The normal deployed build serves separate cached assets.

## Validation after final polish

- TypeScript, client/SSR production builds and all 27 prerendered routes passed.
- Built-HTML audit passed for one H1 per route, all internal links and anchor targets, referenced image/CSS files, and absence of visible placeholder markers.
- Git whitespace checks passed; the self-contained preview was regenerated from the production stylesheet.
- Fresh browser checks could not run in the final session: local server binding was denied and browser policy blocked local-file navigation. The earlier browser results below describe the preceding design revision.

## Earlier browser validation

- `npm run lint` (TypeScript) passed.
- Production client build, SSR build and 27-route prerender passed.
- Static audit: one H1 per page; no unresolved internal route links or same-page anchors.
- Chrome mobile render checks at 390 × 844: all 27 routes rendered with one H1 and no horizontal overflow; no new console errors after fixing preview routing.
- Visually inspected the desktop homepage/services and mobile homepage, services, doctors and a service detail page. Corrected the mobile doctor guide’s speech-bubble overlap.
- Exercised service search, FAQ search and expansion, mobile menu, booking-step changes and standalone navigation/refresh. Doctor-specific booking links were inspected; no appointments were submitted.

## Content still needed before launch

The homepage intentionally retains the real-doctor video placeholder. Facility photography and patient stories have not been supplied. Privacy and terms now have complete draft layouts and plain-language copy describing this website; the hospital must review them against its actual operational practices. Clinical service descriptions and doctor credentials are carried over from the repository and require the hospital’s final content review.

## Doctor portrait and directions update — 20 October 2026

- Applied the supplied Dr. Noori portrait to the homepage doctor panel, doctor directory, profile and booking card.
- Centralized the address from the supplied Google profile screenshot. Displayed its 4.8/5 rating and 343 reviews as a dated 19 October 2026 snapshot of Dr. Noori’s profile, not a live hospital rating. The current public Maps view returned a different review count, so the snapshot date remains explicit.
- Linked location actions to the Google Maps place destination, and added an embedded map with a pulsing directions control on Contact. The homepage location marker also opens directions. The Google Maps listing was checked against the supplied address.
- TypeScript, production build, 27 prerendered routes, standalone preview packaging and whitespace checks passed. Fresh mobile visual checks remain unverified: the preview server was denied permission to bind locally, and the browser connection closed during the preview attempt.

The production domain is still `example-domain.com` and `ALLOW_INDEXING` remains false. This change is a review draft, not a production release.

## Patient navigation and homepage updates — 21 October 2026

This update supersedes the original booking-page and motion-switch descriptions above.

- Primary navigation now stays visible below the mobile brand row: Explore care, Our doctors, Our hospital and Visit us. The all-pages menu remains available.
- The top strip shows the full configured hospital address and a phone link, with wrapping on phones.
- Removed the motion switch and stored paused-state handling. Animation starts by default; system reduced-motion preferences and Mimo’s offscreen/hidden-tab controls remain supported. The privacy notice reflects this behavior.
- Website appointment buttons go directly to `/doctors`. Doctor-specific Doctor Dekho links are preserved. Removed the duplicate booking-page implementation; existing `/book-appointment` links have a React redirect, preview-server redirect, Netlify 301 and a portable static HTML redirect. The obsolete route is excluded from the sitemap. Legacy `#doctor` and `#how` links also resolve to the doctor directory.
- Removed the homepage doctor panel and three-step visit section. Moved Dr. Noori’s title, credentials, languages and profile/directory links into the hero. The hero video placeholder stays; the homepage portrait is removed. Directory and profile portraits are preserved.
- Added decorative animated SVG backgrounds to the six homepage topics and all 13 service cards. Stable service IDs preserve the matching artwork during filtering; offscreen and reduced-motion behavior is handled without additional packages or downloads.
- Removed the doctor rating from the homepage. Its replacement is a prominent hospital-feedback link. Google Maps search returned the doctor’s listing, not a separately verified hospital listing, so no hospital rating/count/testimonials have been invented. `HOSPITAL_PROFILE.googleBusinessProfileUrl` is intentionally empty until the hospital’s own URL is supplied. Doctor reviews remain on doctor pages and the Physician schema links to the doctor’s profile.

Validation: TypeScript, production client/SSR build, 26 content routes, redirect fallback, standalone packaging, internal links/anchors, image/script/style assets, section removal, hero content, illustration counts and whitespace checks pass. Browser/mobile visual and interactive verification is blocked: local listening returned `EPERM`, and browser policy does not permit `file:` navigation. These updates are local; no new commit or push was performed in this task.

### Hospital review attribution confirmed — 21 October 2026

The client clarified that the Google business listing named Dr. Md Taquedis Noori is the hospital's listing, and reports that the doctor confirmed this. This supersedes the pending-listing note above. The homepage now displays a prominent 4.8/5 score and 343 Google reviews, retaining the supplied snapshot date of 19 October 2026 and showing the listing name. The hospital feedback page and compact badges use the same attribution and profile URL. These are dated supplied figures, not a live count or newly fetched reviews. No individual testimonial text was added.

### Simplified mobile navigation and pages — 21 October 2026

This revision supersedes the earlier always-visible mobile link rows. At widths up to 1000px, the primary links are inside the top-right three-dot menu; the brand row is compact again. Desktop primary navigation is retained. Menu closing on selection, Escape, outside click and focus departure is unchanged.

`/services` now renders the former Conditions page, with the visible label **Explore care**. The old services listing implementation and duplicate Conditions navigation entry are removed. Detailed `/services/:slug` articles remain accessible from care topics. The Treatments and Our hospital page implementations and wrapper files are deleted, and links are removed from active and legacy navigation components. Footer groups and homepage/detail-page links use the simplified structure.

Retired URLs redirect consistently in React, preview hosting, Netlify rules and static fallback documents: `/conditions` and `/treatments` → `/services`; `/hospital` → `/contact`. These retired URLs are absent from the sitemap. Hospital structured data now points to the homepage.

Validation: TypeScript and production client/SSR build passed; 23 content pages and four redirect documents generated; internal links, anchors and referenced assets passed an audit. Static CSS checks confirm hidden primary rows at 320, 390, 600, 768 and 1000px and retained desktop links at 1440px. The standalone preview is refreshed. Mobile appearance and menu interaction still require visual review because browser testing remains unavailable in this environment. No push was performed.

### Matching selected-topic artwork — 21 October 2026

Mimo's left-hand topic card now uses the same service-specific `CareArtwork` SVG as the matching topic button. Removed the old kidney-only/custom generic-icon branch. The selected service controls the picture, caption and detail destination together; changing topics remounts the illustration to restart its entrance and animation. A foreground card variant keeps the picture centered and fully visible at desktop and mobile sizes, while existing button backgrounds stay faint.

TypeScript, production build, standalone packaging and whitespace checks passed. Render checks across all six homepage topics confirm six distinct drawings and identical SVGs between each selected-card and background variant. Live browser interaction and appearance remain unverified in this environment. No push performed.
