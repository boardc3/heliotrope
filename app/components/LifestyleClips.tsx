"use client";

import { useEffect, useRef } from "react";

const clips = [
  "Light study I",
  "Material vignette",
  "Threshold",
  "Slow morning",
  "Unit B quiet",
  "Harbor drift",
  "Last light",
];

function AutoVideo({ index }: { index: number }) {
  const ref = useRef<HTMLVideoElement>(null);

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
      poster={`/img/posters/clips/fl${index === 5 ? 7 : index + 1}.jpg`}
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
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="section-pad overflow-hidden bg-ink text-bone">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="eyebrow !text-bone/65">Motion Studies</span>
            <h2 className="mt-5 max-w-3xl font-display text-5xl leading-[0.96] tracking-[-0.055em] md:text-7xl">
              Small films for the rhythm of the property.
            </h2>
          </div>
          <div className="hidden gap-2 md:flex">
            <button className="btn-ghost" onClick={() => scroll(-1)} aria-label="Previous clips">
              Prev
            </button>
            <button className="btn-ghost" onClick={() => scroll(1)} aria-label="Next clips">
              Next
            </button>
          </div>
        </div>
        <div ref={track} className="mt-10 flex snap-x gap-4 overflow-x-auto pb-6 [scrollbar-width:none]">
          {clips.map((title, index) => (
            <figure key={title} className="relative aspect-[4/5] w-[78vw] shrink-0 snap-center overflow-hidden rounded-[2rem] bg-bone/10 md:w-[58vw] lg:w-[420px]">
              <AutoVideo index={index} />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-ink/85 to-transparent p-5">
                <h3 className="font-display text-3xl tracking-[-0.04em]">{title}</h3>
                <span className="font-mono text-[0.65rem] uppercase tracking-wider2 text-bone/60">Reel {String(index + 1).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
