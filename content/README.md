# Content

These files hold the parts of the website that people edit without touching code.

| File | What it holds |
|---|---|
| `site.json` | Hospital details: phone, WhatsApp number, email, website, consultation timings, emergency note, short description, medical disclaimer |
| `faqs.json` | The questions and answers on the FAQ page |
| `blog.json` | Blog articles, drafts and published |
| `doctors.json` | The doctors on the Our doctors page (Dr Noori's rating follows his Google profile in `src/data/config.ts`) |
| `camps.json` | Health camps. The Health camps page and its footer link appear only while at least one camp is upcoming |
| `notices.json` | Short notices shown at the top of every page between their start and end dates |
| `testimonials.json` | Patient stories on the home page, only with the patient's consent on record |
| `services.json` | Changed text for a service page, by service id (`srv-1`…); fields left out keep the page's own text |
| `redirects.json` | Old addresses sent to new ones, for example an article whose address changed |

They are written by the Website page of the NexMarket CRM when something is published there. They can also be edited by hand.

Every file is checked when the site builds (`src/data/content.ts`). A mistake stops the build with a plain message naming the file and the problem, so it never reaches the live site. For example:

    content/blog.json: article "Kidney Stone!" needs a "slug" in lowercase letters, numbers and hyphens only.

## Rules

**`site.json`**: every field is required. `phone` is the 10-digit number with no `+91`, spaces or dashes. A value still waiting for the hospital is written as `[PLACEHOLDER: ...]` and shows as a placeholder on the site.

**`faqs.json`**: each question needs a unique `id`, a `question`, an `answer`, and a `category` of `appointment`, `consultation`, `hospital` or `medical`. A question or answer that still contains `[PLACEHOLDER` is left off the public FAQ page.

**`blog.json`**: see `BLOG_PUBLISHING.md` for a full example. In short:

- `slug`: lowercase letters, numbers and hyphens; unique. The page is `/blogs/<slug>`.
- `departmentId`: `urology`, `ent`, `general-medicine`, `anesthesiology` or `neurology`.
- `status`: `draft` (no public page) or `published`.
- `publishedAt`: `YYYY-MM-DD`.
- `author` is required; `reviewedBy` only when a clinician really reviewed it.
- `image`, if present, needs a `src` starting with `/` and a description in `alt`.
- At least one section; each section has a `heading` and `paragraphs` and/or `points`.
- `references`, if present, need a `label` and an `https` `url`.

**`doctors.json`**: each doctor needs a unique `id`, `name`, `specialty`, `department`, `qualifications`, `medicalRegistration`, `yearsOfExperience`, `profileImagePlaceholder`, `consultationTimings`, `languages` and `isClickable`. A doctor with a profile page (`isClickable: true`) needs a `slug`. `profileImage` is a path on the site; `bookingUrl` starts with https; `biography` is optional.

**`camps.json`**: `slug`, `title`, `date` (`YYYY-MM-DD`), `startTime` and `endTime` (`HH:MM`), `place`, `description`, `services` and `doctors` (lists, can be empty), `free` (true or false). `address` and `contactPhone` (10 digits) are optional. A camp whose date has passed is left off when the site is built, and hidden in the browser after its day.

**`notices.json`**: `id`, `text` (up to 220 characters), `tone` (`info` or `urgent`); optional `link` with `label` and `href`, and `startDate` / `endDate`.

**`testimonials.json`**: `id`, `quote` (up to 600 characters), `name` (a first name and initial is enough), optional `place` and `departmentId`, and `consentRecorded: true`, which is only set when the patient's written consent is kept at the hospital.

**`services.json`**: an object keyed by service id. Allowed fields: `title`, `tagline`, `description`, `overview`, `symptoms`, `procedures` (`name`, `description`), `benefits`, `preparation`, `faqs` (`question`, `answer`), `risks`, `references` (`label`, https `url`), `seoTitle`, `seoDescription`. The build also writes `/_content/services.json` with every service's current text, which the CRM reads to bring them in.

**`redirects.json`**: a list of `{ "from": "/old/path", "to": "/new/path" }`. A redirect can't start from a page that exists.

## Preview

`/preview` is a page that is never indexed or listed. The CRM opens it with a short-lived key after `#`, and it shows a draft in the real design. It asks only the CRM address set in `VITE_PREVIEW_API` (default `https://nexmarket-api.nexeagle.com`).
