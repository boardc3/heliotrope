"use client";

import { useEffect, useRef } from "react";

const clips = [
  { title: "Light study I", area: "Unit A" },
  { title: "Material vignette", area: "Unit A" },
  { title: "Threshold", area: "Unit A" },
  { title: "Slow morning", area: "Unit A" },
  { title: "A second residence", area: "Unit B" },
  { title: "Above the village", area: "Aerial" },
  { title: "Last light", area: "Aerial" },
];

function AutoVideo({ index }: { index: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const posterIndex = index === 5 ? 7 : index + 1;

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => undefined);
        else video.pause();
      },
      { threshold: 0.42 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="h-full w-full object-cover"
      src={`/video/clips/fl${index + 1}.mp4`}
      poster={`/img/posters/clips/fl${posterIndex}.jpg`}
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}

export function LifestyleClips() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-ink text-bone section-pad">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(168,90,47,.16),transparent_55%)]" />
      <div className="relative mx-auto max-w-[1280px]">
        <div className="grid gap-10 lg:grid-cols-[0.55fr_1fr] lg:items-end">
          <div>
            <span className="eyebrow !text-bone/72">04 — Motion Studies</span>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,5.4vw,4.8rem)] font-light leading-[1.02] tracking-[-0.035em] text-bone">
              Small films for the <span className="italic">rhythm</span> of the property.
            </h2>
          </div>
          <div className="flex items-end justify-between gap-6 lg:pb-3">
            <p className="max-w-md text-base leading-[1.75] text-bone/68">
              Drag through quiet vignettes from inside the residences, the second unit, and the aerial context above
              Corona del Mar.
            </p>
            <div className="hidden gap-2 md:flex">
              <button
                onClick={() => scroll(-1)}
                aria-label="Previous clips"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/22 text-bone/80 transition hover:border-bone hover:text-bone"
              >
                ←
              </button>
              <button
                onClick={() => scroll(1)}
                aria-label="Next clips"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/22 text-bone/80 transition hover:border-bone hover:text-bone"
              >
                →
              </button>
            </div>
          </div>
        </div>

        <div
          ref={track}
          className="no-scrollbar mt-12 flex snap-x gap-5 overflow-x-auto pb-4"
        >
          {clips.map((clip, index) => (
            <figure
              key={clip.title}
              className="relative aspect-[4/5] w-[78vw] shrink-0 snap-center overflow-hidden rounded-sm bg-bone/5 md:w-[58vw] lg:w-[420px]"
            >
              <AutoVideo index={index} />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(19,17,14,.85)_100%)]" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 md:p-6">
                <div>
                  <p className="text-[0.6rem] font-medium uppercase tracking-widest3 text-bone/55">{clip.area}</p>
                  <h3 className="mt-1 font-display text-[clamp(1.4rem,1.8vw,1.8rem)] font-light tracking-[-0.025em] text-bone">
                    {clip.title}
                  </h3>
                </div>
                <span className="text-[0.6rem] font-medium uppercase tracking-widest3 text-bone/52">
                  Reel {String(index + 1).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
