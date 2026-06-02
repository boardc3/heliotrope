# 437 Heliotrope Showcase

A cinematic single-page Next.js property showcase for **437 Heliotrope Avenue** — two connected Corona del Mar condos sold separately on a 3,540-square-foot village lot.

## Stack

Next.js 15 App Router, React 19, Tailwind CSS, Framer Motion, Lenis, Mapbox GL, and Sharp.

## Commands

```bash
npm install
npm run assets   # optional — regenerates optimized media from ../Assets
npm run dev      # http://localhost:3737
npm run build    # production build (all routes static)
npm run start    # http://localhost:3737
```

## Environment

Create `.env.local`:

```bash
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_public_mapbox_token
# Optional override for canonical URL (defaults to https://437heliotrope.com)
NEXT_PUBLIC_SITE_URL=https://437heliotrope.com
```

The Mapbox token is read at runtime by the `NeighborhoodMap` component. Without it the map falls back to a quiet placeholder.

## Vercel deployment

- Add the same env vars in the Vercel project settings.
- All routes are statically prerendered (`○ Static` in build output).
- Long-lived cache headers for `/img/*` and `/video/*` are configured in `vercel.json`.
- Videos are served as plain MP4s (no Git LFS), so they ship with the deploy.

## SEO

- Full Next.js Metadata API title, description, OpenGraph, Twitter, Apple meta.
- JSON-LD `@graph` covering `RealEstateListing`, `ApartmentComplex`, `Place`, `WebSite`, `WebPage`, `BreadcrumbList`.
- `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts`, `app/opengraph-image.tsx`, `app/twitter-image.tsx`, `app/icon.tsx`, `app/apple-icon.tsx` all prerendered static.
