# Neurology keyword research and implementation — 2 November 2026

Scope: the existing `/services/neurology` department and its five patient-information topics. This work preserves the existing department URL and creates five child guides. Existing homepage and urology keyword targets, clinical copy and redirects are preserved.

## What the research establishes

Public search results were reviewed for neurology, neurologist, neurosurgeon, migraine, headache, epilepsy, neuropathy and memory queries with both Purnia and Purnea. Local clinic and hospital websites use both city spellings and cover condition-specific searches. This supports investigating local condition-and-city intent; it does not establish query volume, difficulty, rankings, conversion rates or the highest-demand service.

No keyword metrics or Search Console connector is available in this session. All numeric demand metrics are therefore **unavailable**, not zero. Priorities below are editorial decisions based on patient intent, existing topics and the risk of making unsupported clinical claims. Research is qualitative and provisional until checked with location-specific Keyword Planner data and, after launch, the hospital's Search Console queries.

The hospital's linked booking profile lists Dr Asif Iqbal in the Neurology category, with “Consultant Neurosurgeon” as his focus and MBBS, MS (General Surgeon), MCh as qualifications. This is a listing, not independent credential verification. It does not prove that every neurology condition is managed at this hospital. The implementation identifies the listed specialty and directs patients to confirm the appropriate appointment or referral.

## Applied keyword map

| Existing topic / new guide | Primary editorial target | Secondary editorial targets | Intent and decision |
| --- | --- | --- | --- |
| Department: `/services/neurology` | neurology care in Purnia | neurology consultation in Purnea; brain and nerve care in Purnia | Local department discovery; preserve existing URL. |
| Stroke: `/services/neurology/stroke-symptoms-and-follow-up-in-purnia` | stroke symptoms and follow-up in Purnia | post-stroke consultation in Purnea; stroke follow-up in Purnia | Emergency recognition and planned review information; no stroke-centre claim. |
| Headache: `/services/neurology/migraine-headache-consultation-in-purnia` | migraine and headache consultation in Purnia | migraine assessment in Purnea; headache consultation in Purnia | Preparation for a suitable consultation. |
| Seizures: `/services/neurology/epilepsy-seizure-assessment-in-purnia` | epilepsy and seizure assessment in Purnia | seizure consultation in Purnea; epilepsy assessment in Purnia | Evaluation information; no claim that EEG or epilepsy surgery is available. |
| Nerve symptoms: `/services/neurology/numbness-tingling-assessment-in-purnia` | numbness and tingling assessment in Purnia | nerve problem assessment in Purnea; neuropathy consultation in Purnia | Symptom-led assessment; no diagnosis from symptoms or on-site nerve-testing claim. |
| Memory: `/services/neurology/memory-loss-assessment-in-purnia` | memory loss assessment in Purnia | memory consultation in Purnea; forgetfulness assessment in Purnia | Assessment preparation; no memory-clinic or dementia-treatment claim. |

Each page has one distinct primary intent; secondary phrases are editorial context, not quotas to force into sentences. The city spellings belong on the same page. Separate near-duplicate Purnia/Purnea pages and copied pages for Araria, Katihar or Kishanganj were not created.

## Additional commercial candidates for validation

Investigate `neurologist in Purnia`, `neurologist in Purnea`, `neuro physician in Purnia`, `neurosurgeon in Purnia`, `migraine treatment in Purnia`, `epilepsy treatment in Purnia`, `neuropathy treatment in Purnia` and `memory specialist in Purnia`. Do not promote these as verified demand winners. Selecting neurologist/neuro-physician versus neurosurgeon targets requires confirmation of the actual specialist role; treatment terms require confirmation of what is offered. “Best,” guaranteed cures, 24-hour specialist coverage, a stroke unit and unverified diagnostic facilities are not claimed.

Suggested next validation: compare these terms and their close variants in Keyword Planner using the Purnia service area, retain the reported geography/date/ranges, then use live Search Console impressions and enquiries to refine the map. Start clinical review with the overview, headache and seizure guides; this is an editorial sequence, not a measured volume ranking.

## Local evidence and competitors

Observed public websites, not a Maps or rank-tracking audit:

- Purnea Neuro Clinic: https://purneaneuroclinic.com/ and https://purneaneuroclinic.com/treatments/ — visible condition-specific coverage and named specialist information.
- APG Hospital: https://apghospital.com/best-hospital-doctor-cost-for-migraine-treatment-purnia-bihar-india.html and https://apghospital.com/best-hospital-doctor-cost-for-epilepsy-treatment-purnia-bihar-india.html — local migraine and epilepsy landing pages. Their copy is not used as clinical evidence or copied.
- Umeed Hospital: https://umeedhospital.in/ — separates neurosurgery and neurology in its service presentation.
- The hospital's own booking destination: https://doctordekho.nexeagle.com/doctors/dr-asif-iqbal-neurology-purnea--9b82c587-060b-4f96-9c19-c6fcb282cd65 — supports the listed practice location and the specialty ambiguity described above.

## SEO and content changes

- Six distinct titles, descriptions, headings, introductions and relevant conceptual illustrations with descriptive alt text. PNG social images accompany lightweight SVG page images.
- All five topic summaries and links appear in the department's initial HTML; the content no longer depends on clicking a topic selector.
- Home → Neurology → topic hierarchy, visible and structured breadcrumbs, relevant sibling links, HTML sitemap entries and XML sitemap entries.
- Full prerendered HTML for every new path, self-referencing canonicals and matching client/server metadata.
- Neurology JSON-LD describes medical information and the hospital, without attributing these pages to the urologist, claiming an unperformed medical review or advertising unconfirmed procedures.
- Patient-focused symptom history, questions, preparation, appointment checks, address, callable hospital number and clear emergency guidance.
- General medical sources are linked on each guide. This content has **not yet been medically reviewed by the hospital**; no review claim is displayed.
- No fixed keyword density, forced keyword spacing, guaranteed ranking promise or duplicate city landing pages.

Google guidance: https://developers.google.com/search/docs/fundamentals/seo-starter-guide ; https://developers.google.com/search/docs/fundamentals/creating-helpful-content ; https://developers.google.com/search/docs/crawling-indexing/links-crawlable .

Medical background: https://www.nhs.uk/conditions/migraine/ ; https://www.nhs.uk/conditions/epilepsy/ ; https://www.nhs.uk/conditions/peripheral-neuropathy/ ; https://www.nhs.uk/conditions/peripheral-neuropathy/diagnosis/ ; https://www.nhs.uk/symptoms/memory-loss-amnesia/ ; https://www.nhs.uk/conditions/stroke/symptoms/ ; https://www.nhs.uk/conditions/stroke/recovery/ . These sources describe general clinical information, not the hospital's capabilities. UK emergency numbers are not transplanted into the Indian hospital website.

## Launch and verification

The existing test-host indexing safeguards remain enabled: placeholder HTTPS origin, noindex and blocked crawling by default. Confirm the production domain, specialist credentials, service availability and clinical copy before a production rebuild enables indexing. This change does not deploy, submit a sitemap, verify live rankings or change Google Business Profile.

Completed validation:

- `npm run lint` and `npm run build`: passed. The build generates 34 rendered routes, including the 404 page, and 33 public sitemap URLs. The bundle crosses Vite's default 500 kB warning threshold by approximately 0.01 kB; the build succeeds. No new video or runtime dependency was added.
- `npm run check:urls`: passed for all 33 public routes, internal discovery, metadata, sitemap, 135 department redirect cases and preview routing.
- `npm run check:seo`: passed for the six previously optimized urology pages and 30 legacy URL variants.
- `npm run check:care`: passed across 34 rendered routes, including all 13 urology service links, hospital phone, footer links, valid anchors and 404 behaviour.
- `npm run check:neurology`: passed for all six neurology pages, checking rendered content and metadata, unique intent, images, parent and sibling discovery, relevant appointment links, medical sources and schema without unsupported claims.
- `npm run preview:package`: passed; `website-preview.html` includes the new routes and embeds all six illustrations for Finder use. Open it and choose Departments → Neurology.
- The headache illustration was visually inspected as a local PNG. Browser layout and interaction QA could **not** be completed: starting a local preview server was denied with `listen EPERM`, and the browser security policy rejected observing `file:` URLs. No bypass was attempted. Responsive behaviour and hydration remain unverified in a browser, despite the passing static and TypeScript checks.

The changes are local and uncommitted on the existing working branch. No GitHub push or live deployment was performed.
