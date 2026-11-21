# Content

These three files hold the parts of the website that people edit without touching code.

| File | What it holds |
|---|---|
| `site.json` | Hospital details: phone, WhatsApp number, email, website, consultation timings, emergency note, short description, medical disclaimer |
| `faqs.json` | The questions and answers on the FAQ page |
| `blog.json` | Blog articles, drafts and published |

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
