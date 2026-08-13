# SaZeJe Football — Next.js Migration

A modern Next.js (App Router) migration of the SaZeJe Football stadium visits and scarf collection application.

---

## 1. Quick Start & Local Commands

Ensure you have **Node.js 18+** and **pnpm** installed.

```bash
# 1. Install dependencies
pnpm install

# 2. Run local development server
pnpm dev

# 3. Create production build
pnpm build

# 4. Start production server locally
pnpm start

# 5. Run ESLint code checks
pnpm lint
```

The application will be available at `http://localhost:3000`.

---

## 2. Project Architecture & Directory Structure

```text
sazeje-football/
├── app/                              # Next.js App Router Pages & Routes
│   ├── layout.tsx                    # Root Layout (Fonts, Header, Footer, Blocking Theme Script)
│   ├── page.tsx                      # Home Page (Hero, Stats, Recent Grounds, Featured Scarves)
│   ├── globals.css                   # Tailwind CSS v4 Theme Tokens & Design System Variables
│   ├── about/                        # About & Goals Pages
│   │   ├── page.tsx                  # About Bio & Goals Overview
│      │   └── goals/[goalId]/           # Goal Detail View (SSG via generateStaticParams)
│   ├── contact/                      # Contact Page (mailto: Submit Handler)
│   ├── grounds/                      # Grounds Database & Detail
│   │   ├── page.tsx                  # Grounds List (URL Search Params Filtering & Sorting)
│      │   ├── GroundsView.tsx           # Suspense Client Filter View
│      │   └── [groundId]/               # Ground Detail View (SSG via generateStaticParams)
│   ├── map/                          # Map View
│   │   └── page.tsx                  # Interactive Leaflet Stadium Map (SSR-disabled dynamic import)
│   ├── scarves/                      # Scarf Collection Routes
│   │   ├── page.tsx                  # Category Chooser
│      │   └── [category]/[country]/      # Scarves Browse & Pagination (SSG via generateStaticParams)
│   ├── dev/                          # Preview Routes (Gated 404 in Production)
│   │   ├── components/               # UI Component Showcase
│      │   └── design-system/            # Color & Typography Token Gallery
│   ├── sitemap.ts                    # Dynamic XML Sitemap Generator
│   └── robots.ts                     # Search Engine Indexing Directives
├── components/                       # Reusable React UI & Domain Components
│   ├── ui/                           # Base Primitives (Button, Card, Badge, InfoBox, EmptyState)
│   ├── layout/                       # SiteHeader, SiteFooter, MobileNav, ThemeToggle
│   ├── hero/                         # HomeHero, PageHero
│   ├── grounds/                      # GroundCard, GroundDetail, GroundGallery, GroundsFilterBar
│   ├── scarves/                      # ScarfEntry, ScarfCategoryChooser, CountryDirectory, ScarfPagination
│   ├── about/                        # GoalCard, GoalDetail
│   └── map/                          # StadiumMap, StadiumMapInner
├── lib/                              # Data Access Layer & Helper Functions
│   ├── data/                         # Static Typed Seed Data Files
│   │   ├── grounds.ts                # Stadium Visit Database Records
│   │   ├── scarves.ts                # Scarf Collection Database Records
│   │   ├── goals.ts                  # Personal Goal Database Records
│   │   ├── countries.ts              # UEFA Country List & Flag Metadata
│   │   └── index.ts                  # Data Query Helper Functions
│   └── utils/                        # Utility Functions (cn helper, formatting)
└── types/                            # TypeScript Type Definitions
    ├── ground.ts                     # Ground Data Model Interface
    ├── scarf.ts                      # Scarf Data Model Interface
    ├── goal.ts                       # Goal Data Model Interface
    └── country.ts                    # Country Data Model Interface
```

---

## 3. Data Editing & Maintenance Workflow (Option A)

Per Section 7.1 Option A of the migration plan, content is stored as typed static TypeScript data files. No database or CMS is required.

### Adding or Editing a Stadium Visit
Open [`lib/data/grounds.ts`](file:///d:/Projects/Football%20-%20Netherlands/sazeje-football/lib/data/grounds.ts) and add/update a `Ground` object:

```typescript
{
  id: "de-kuip",
  name: "Stadion Feijenoord (De Kuip)",
  club: "Feyenoord",
  city: "Rotterdam",
  country: "🇳🇱 Nederland",
  competition: "Eredivisie",
  capacity: 47500,
  coordinates: [51.8939, 4.5231],
  visitDate: "2024-04-14",
  match: "Feyenoord - Ajax (6-0)",
  score: "6-0",
  rating: 5,
  photo: "https://picsum.photos/id/1040/800/600",
  ticketStubPhoto: "https://picsum.photos/id/1040/800/600",
  description: "Magische klassieker in een kolkende Adelaarshorst van Rotterdam.",
  gallery: ["https://picsum.photos/id/1040/800/600"],
}
```

### Adding or Editing a Scarf Entry
Open [`lib/data/scarves.ts`](file:///d:/Projects/Football%20-%20Netherlands/sazeje-football/lib/data/scarves.ts) and add/update a `Scarf` object:

```typescript
{
  id: "s101",
  club: "Celtic FC",
  country: "Schotland",
  category: "new",
  type: "Officiële Club Sjaal",
  stadium: "Celtic Park",
  founded: "1887",
  trophies: "53x Landskampioen, 1x Europa Cup I",
  funFact: "Eerste Britse club die de Europa Cup I won in 1967 (Lisbon Lions).",
  purchaseDate: "2024-02-18",
  photo: "https://picsum.photos/id/1050/800/600",
  description: "Gekocht in de hoofdwinkel bij Celtic Park voor de wedstrijd.",
}
```

After updating seed data, run `pnpm build` to re-generate static SSG HTML files.

---

## 4. Production Deployment & Vercel Setup

### Environment Variables
- **Zero environment variables required.**

### Preview Route Gating
- Internal preview routes `/dev/components` and `/dev/design-system` check `process.env.NODE_ENV === "production"` and call `notFound()`, ensuring they return a `404 Not Found` response on production deployments.

### Vercel Deployment Instructions
1. Push repository to GitHub/GitLab.
2. Log into [Vercel](https://vercel.com) and click **Add New Project**.
3. Select the `sazeje-football` repository.
4. **Framework Preset:** Next.js (automatically detected).
5. **Build & Output Settings:** Zero configuration required.
6. Click **Deploy**.

---

## 5. Deferred Features Context

Per Section 7 of the Migration Plan, the following features are intentionally deferred for future consideration:
- **CMS / Administrative Editing UI:** Static TypeScript seed data is used for performance and simplicity.
- **Contact Form Backend:** Form uses native `mailto:` link generation. Can be upgraded to Server Actions (e.g. Resend / SendGrid) if backend submission is requested in the future.
