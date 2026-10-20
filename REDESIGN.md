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

The homepage intentionally retains the real-doctor video placeholder. Approved doctor/facility photography, patient stories and the hospital’s public review URL have not been supplied. Privacy and terms now have complete draft layouts and plain-language copy describing this website; the hospital must review them against its actual operational practices. Clinical service descriptions and doctor credentials are carried over from the repository and require the hospital’s final content review.

The production domain is still `example-domain.com` and `ALLOW_INDEXING` remains false. This change is a review draft, not a production release.
