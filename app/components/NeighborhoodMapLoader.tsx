"use client";

import dynamic from "next/dynamic";
import { Component, ReactNode, useEffect, useRef, useState } from "react";

const NeighborhoodMap = dynamic(() => import("./NeighborhoodMap").then((mod) => mod.NeighborhoodMap), {
  ssr: false,
  loading: () => null,
});

const HAS_TOKEN = Boolean(process.env.NEXT_PUBLIC_MAPBOX_TOKEN);

class MapErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { errored: boolean }> {
  state = { errored: false };

  static getDerivedStateFromError() {
    return { errored: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Neighborhood map crashed", error);
  }

  render() {
    if (this.state.errored) return this.props.fallback;
    return this.props.children;
  }
}

function MapPlaceholder({ note }: { note?: string }) {
  return (
    <section className="relative bg-pearl section-pad">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-10 lg:grid-cols-[0.55fr_1fr] lg:items-end">
          <div>
            <span className="eyebrow">08 — Neighborhood</span>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,5.4vw,4.8rem)] font-light leading-[1.02] tracking-[-0.035em]">
              Thirty reasons the <span className="italic">address</span> matters.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-[1.75] text-ink/68 lg:pb-3">
            Beaches, restaurants, trails, resorts, and Newport culture orbit the property—one block from East Coast
            Highway and minutes from Newport Harbor.
          </p>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-[360px_1fr]">
          <div className="flex h-[520px] items-center justify-center rounded-sm border border-line bg-bone/60 text-center text-sm text-ink/55 lg:h-[680px]">
            {note ? <span className="px-6">{note}</span> : null}
          </div>
          <div
            className="relative h-[520px] overflow-hidden rounded-sm border border-line bg-cover bg-center lg:h-[680px]"
            style={{ backgroundImage: "url(/img/posters/aerial.jpg)" }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(19,17,14,.28)_100%)]" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function NeighborhoodMapLoader() {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!HAS_TOKEN) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (!HAS_TOKEN) {
    return (
      <div id="map">
        <MapPlaceholder />
      </div>
    );
  }

  return (
    <div ref={ref} id="map">
      <MapErrorBoundary fallback={<MapPlaceholder note="Map temporarily unavailable." />}>
        {load ? <NeighborhoodMap /> : <MapPlaceholder />}
      </MapErrorBoundary>
    </div>
  );
}
