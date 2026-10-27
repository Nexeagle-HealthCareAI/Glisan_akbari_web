# Publishing a blog article

The homepage journal, `/blogs` filters and individual article pages share `src/data/blogs.ts`.
This is a code-managed blog. There is no admin login or CMS in this change.
No articles have been published yet; topic cards are explicitly marked “Coming soon”.

## Add an article

Add a `BlogPost` object to `BLOG_POSTS` in `src/data/blogs.ts`. Use a unique lowercase, hyphen-separated `slug` (no slashes, spaces, query strings or hashes). The URL will be `/blogs/your-slug`.

```ts
{
  slug: 'your-article-slug',
  title: 'Your approved article title',
  excerpt: 'A short, accurate summary for the card and search description.',
  departmentId: 'urology',
  status: 'draft',
  publishedAt: '2026-10-27', // Replace with the actual publication date.
  author: 'Actual author name',
  // reviewedBy: 'Actual clinician who reviewed this article',
  // image: { src: '/media/blogs/your-image.jpg', alt: 'Describe the image' },
  sections: [
    { heading: 'Section heading', paragraphs: ['Approved paragraph text.'] },
    { heading: 'Questions for your doctor', paragraphs: [], points: ['Approved question.'] },
  ],
  // references: [{ label: 'Source title', url: 'https://authoritative-source-url' }],
}
```

Department IDs: `urology`, `ent`, `general-medicine`, `anesthesiology`, `neurology`.
`author` and `reviewedBy` are separate: only include a reviewer when the review actually happened.
Add sources for medical claims and obtain the hospital's review before publishing.

## Publish

Change `status` to `published`, set the real publication date, and run:

```sh
npm run lint
npm run build
npm run check:urls
npm run preview:package
```

The build automatically generates the article HTML, title, description, canonical URL, sitemap entry and BlogPosting schema. Published posts appear newest first and feed the homepage's latest three cards. Draft posts have no public route, card or sitemap entry; keep confidential drafts outside the frontend repository.

Redeploy the updated build to make the article available on the hosted website. The existing pre-launch indexing setting remains in effect.

## Department videos

The homepage selector uses `DEPARTMENT_VIDEOS` in `src/data/careDepartments.ts`. Its MP4s are exact copies of the supplied `FOR_WEB/Low MB` files, using simple public filenames under `public/media/departments/`. Posters were extracted from those copies. Only the selected player mounts, loading its video when visible; switching department pauses and removes the previous player. Playback starts muted where permitted, with native controls and a sound button.
