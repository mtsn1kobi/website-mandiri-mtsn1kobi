# AGENTS.md — Website Sekolah

## Project overview

Next.js static site for school website + a separate Express admin server.  
Deployed to **GitHub Pages** via CI.

Content is served from **Pocketbase** (`sekolah-backend.sg2.app.web.id`) via client-side JS.  
The build-time data helpers (`lib/api.ts`, `lib/apiPages.ts`) fetch slugs from Pocketbase for `getStaticPaths` resolution. Real data is fetched from Pocketbase at runtime in the browser.

## Package manager

**pnpm** (see `pnpm-lock.yaml`). The README says `yarn` but CI and lockfile use pnpm.  
Both work since `package.json` scripts are generic.

```bash
pnpm dev        # next dev server (port 3000)
pnpm build      # next build → static export to ./out/
pnpm start      # next start (production server)
pnpm typecheck  # tsc --noEmit (strict mode is OFF in tsconfig)
```

## Key architecture

- **Pages Router** — NOT App Router. All pages in `pages/`.
- **Layout components** now live in `components/` (header.tsx, footer.tsx, slider.tsx), moved from `pages/` to avoid accidental page routes.
- **Express admin server** — `admin.mjs` + `admin/` (port 3001). Run separately: `node admin.mjs`
- **No tests** (except the e2e test script which is removed after use)

## Data flow (Pocketbase)

| Layer             | Location                        | Purpose                                                      |
| ----------------- | ------------------------------- | ------------------------------------------------------------ |
| Client helper     | `lib/db.ts`                     | Unauthenticated PocketBase client for browser use            |
| Typed collections | `lib/pocketbase-types.ts`       | Auto-generated from Pocketbase schema via `pnpm gen`         |
| CRUD tables       | `lib/tables/*.ts`               | Following pattern in `lib/tables/users.ts`                   |
| Build-time slugs  | `lib/api.ts`, `lib/apiPages.ts` | Fetch slug lists from Pocketbase API at build time           |

**Client-side data loading pattern** (every page):

```
useEffect → Promise.all([DataSettings.loadAll(), DataPosts.bySlug(slug)])
           → setS(settings), setPost(record)
           → render Header/Footer/content once both are ready
```

Key points:

- `DataSettings.loadAll()` fetches school_settings, menus, teachers, sliders, etc. from Pocketbase (takes ~1-2s).
- Pages show a loading spinner until ALL data is ready.
- If fetch fails, show a Next.js error page (404).
- All Pocketbase content collections are publicly readable (listRule="", viewRule="").

## Pocketbase server

| Property       | Value                                                                                                 |
| -------------- | ----------------------------------------------------------------------------------------------------- |
| URL            | `https://sekolah-backend.sg2.app.web.id`                                                              |
| Admin email    | `yokowasis@gmail.com`                                                                                 |
| Admin password | `6BS5qXPxRH8eZf` (in package.json `gen` script)                                                       |
| Tenant ID      | getTenantId()                                                                                         |
| Collections    | posts, pages, school_settings, menus, teachers, slider_items, events, keunggulan, quick_popular_links |

To regenerate types after schema changes:

```bash
pnpm gen   # runs pocketbase-typegen against the live server
```

## Content management

**Source of truth is Pocketbase.** No local markdown files.

Slugs for `getStaticPaths` are fetched from Pocketbase API at build time.

**Post creation flow** (admin tools):

1. Express server (`admin.mjs`) receives POST → commits a `.md` file to master via GitHub API (`GITHUB_TOKEN`), AND the data is also in Pocketbase
2. AI-based post creation uses **DeepSeek** (not OpenAI) — hardcoded API key `sk-cb7c980a8635419abd5bb7853294e110` in source
3. URL crawling via `crawl4ai.b.app.web.id` service
4. Images uploaded to CDN (`cdnhost2.bimasoft.web.id`)
5. After posting, wait ~5 min for CI to rebuild and deploy

## Next.js configuration (quirks)

| Setting              | Value      | Why                                |
| -------------------- | ---------- | ---------------------------------- |
| `output`             | `"export"` | Static export for GitHub Pages     |
| `images.unoptimized` | `true`     | Required for static export         |
| `strict` (tsconfig)  | `false`    | TypeScript strict mode is disabled |

## Seeding Pocketbase

Run `node seed.mjs` to repopulate Pocketbase from the local markdown files and `settings.ts`.

```bash
node seed.mjs   # clears + reseeds all collections
```

## CI/CD (GitHub Actions)

File: `.github/workflows/nextjs.yml`  
Triggers: push to `master` branch. Node 22, pnpm 8.

## Admin server

1. **Express server** (`admin.mjs`, port 3001) — HTML forms that create posts by committing markdown to GitHub. Requires `GITHUB_TOKEN`.
2. **Next.js admin page** (`/admin`) — client-side AI post generator using DeepSeek.

## Environment variables

- `GITHUB_TOKEN` — required by Express admin to commit posts to GitHub
- `PORT` — Express admin port (default 3001)
- `PORTSSL`, `privkey`, `certificate` — optional HTTPS for admin server

## TypeScript notes

- `strict: false` — unsafe casts and implicit `any` will not error.
- `skipLibCheck: true`
- `zod` in devDependencies is used by `admin/ai.mjs` but unused elsewhere.

## State of the repo

- Single branch: `master` (no `main`).
- Commit messages are Indonesian/English mixed, often generic ("Update page").
- No linter/formatter config (no eslint, prettier, husky).
- No test framework installed.
