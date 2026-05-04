"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const NeighborhoodMap = dynamic(() => import("./NeighborhoodMap").then((mod) => mod.NeighborhoodMap), {
  ssr: false,
  loading: () => null,
});

export function NeighborhoodMapLoader() {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
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

  return (
    <div ref={ref} id="map">
      {load ? (
        <NeighborhoodMap />
      ) : (
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
                Beaches, restaurants, trails, resorts, and Newport culture orbit the property. Tap a marker or list
                item to understand the everyday geography of Heliotrope Avenue.
              </p>
            </div>
            <div className="mt-12 grid gap-4 lg:grid-cols-[360px_1fr]">
              <div className="h-[520px] rounded-sm border border-line bg-bone lg:h-[680px]" />
              <div className="h-[520px] rounded-sm border border-line bg-bone lg:h-[680px]" />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
