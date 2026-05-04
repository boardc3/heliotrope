# 437 Heliotrope Showcase

A cinematic single-page Next.js property showcase for 437 Heliotrope Avenue in Corona del Mar.

## Commands

- `npm run assets` — prepares optimized images, posters, compressed MP4s, and stills from `../Assets`
- `npm run dev` — local development at `http://localhost:3737`
- `npm run build` — production build
- `npm run start` — production server at `http://localhost:3737`

## Stack

Next.js 15 App Router, React 19, Tailwind CSS, Framer Motion, Lenis, Mapbox GL, and Sharp.

## Environment

Create `.env.local` with:

```bash
NEXT_PUBLIC_MAPBOX_TOKEN=your_public_mapbox_token
```

## Notes

Do not commit `.env.local`.
