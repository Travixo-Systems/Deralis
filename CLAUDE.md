# Project Notes

## Blog Articles

- Blog content lives in `content/blog/<slug>.md` with frontmatter metadata
- Blog listing entries go in `messages/en.json` and `messages/fr.json` under `blog.posts`
- Blog listing metadata (slug, category, date, readTime, image) goes in `app/[locale]/blog/page.tsx`
- Blog detail page renderer is at `app/[locale]/blog/[slug]/page.tsx`
- When rendering article headings, the first `h2` must use `mt-0` (not `mt-10`) to avoid a large gap between the article title/header and the first section heading. Only subsequent `h2` elements get `mt-10`.
- Article container max-width is `850px`, not `max-w-3xl`
- Header section uses split padding (`pt-10 pb-4` / `pt-12 pb-6`) to keep the title close to the article body
- Article body section uses minimal top padding (`pt-2` / `pt-3`) for the same reason
