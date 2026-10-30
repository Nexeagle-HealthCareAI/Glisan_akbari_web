# Priority Purnia urology SEO

The 29 October cloud ZIP could not be recovered after moving to this Mac session. These changes recreate the agreed scope directly in the local repository; they are not a byte-for-byte restoration of that archive.

| Page | Primary target | Secondary targets |
| --- | --- | --- |
| `/services/urologist-in-purnia` | urologist in Purnia | urology doctor in Purnia; urology consultation |
| `/services/kidney-stone-treatment-in-purnia` | kidney stone treatment in Purnia | kidney stone laser surgery; RIRS surgery |
| `/services/prostate-treatment-in-purnia` | prostate treatment in Purnia | enlarged prostate treatment; TURP surgery |
| `/services/urine-infection-treatment-in-purnia` | urine infection treatment in Purnia | UTI treatment; blood in urine |
| `/services/erectile-dysfunction-treatment-in-purnia` | erectile dysfunction treatment in Purnia | ED treatment; andrologist in Purnia |
| `/services/male-infertility-treatment-in-purnia` | male infertility treatment in Purnia | varicocele treatment; male fertility specialist |

The homepage retains its hospital keyword targets. Each priority page has a specific title, description, H1, opening paragraph and relevant featured illustration with descriptive alt text. All five priority service links are present in the overview's initial HTML. Clinical explanations include assessment, options, risks, preparation, questions, sources and booking. Text avoids promises about cure, discharge time or unconfirmed on-site procedures. Dr. Noori has not yet reviewed this new medical copy; no review or authorship assertion was added.

The keyword targets are editorial choices, not new search-volume measurements. Earlier broad Keyword Planner ranges do not establish the volume of every exact local phrase. Do not force an exact 1.5% density or fixed keyword spacing: use natural, relevant sentences. Google's SEO starter guide and spam policy explain helpful content and keyword stuffing:

- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/essentials/spam-policies#keyword-stuffing

## Routing and media

Old overview and service URLs redirect permanently in Nginx, Netlify and preview routing. Static HTML fallbacks retain campaign parameters and hashes on other hosts. Navigation, canonicals, sitemap and schema use the new destinations. Procedure availability is not represented as an in-stock surgical offer. SVGs are simplified topic symbols, not diagnostic anatomical diagrams; PNGs support social sharing. Department videos are unchanged.

## Launch configuration

Indexing stays disabled on test hosts. Confirm the hospital's real domain and clinical content before launch. Configure `VITE_SITE_URL` to the HTTPS origin and `VITE_ALLOW_INDEXING=true` only for the confirmed production site, then rebuild. Settings can be supplied by the hosting environment or an untracked `.env.production.local`. Node build scripts and Vite share the same settings. The launch guard rejects indexing with the default domain or unresolved placeholders. Do not submit the placeholder sitemap to Google.

After launch, verify the final URLs in Search Console and measure appointment clicks and actual bookings, not page visits alone.

## Checks

```
npm run lint
npm run build
npm run check:urls
npm run check:seo
npm run preview:package
```

`check:urls` checks all static pages, discoverability, sitemap, canonical links, department redirects and preview handling. `check:seo` checks the emitted priority HTML, three editorial targets, metadata placement, images, assessment and booking sections, schema and old URL variants. These do not establish medical review, rankings or live deployment.
