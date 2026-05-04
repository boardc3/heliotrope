"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { filters, galleryItems } from "../data/galleryItems";
import { Lightbox } from "./Lightbox";
import { Picture } from "./Picture";

export function FullGallery() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = useMemo(() => galleryItems.filter((item) => filter === "All" || item.category === filter), [filter]);

  return (
    <section id="gallery" className="relative bg-bone section-pad">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-10 lg:grid-cols-[0.55fr_1fr] lg:items-end">
          <div>
            <span className="eyebrow">07 — Full Gallery</span>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,5.4vw,4.8rem)] font-light leading-[1.02] tracking-[-0.035em]">
              Every angle, still, and <span className="italic">material</span> cue.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-[1.75] text-ink/68 lg:pb-3">
            Filter through the exterior, bedroom, interior, and editorial stills pulled from the cinematic and aerial
            source material. Open any image for the lightbox—keyboard, swipe, and zoom supported.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-full border px-4 py-2 text-[0.62rem] font-medium uppercase tracking-widest3 transition ${
                filter === item
                  ? "border-ink bg-ink text-bone"
                  : "border-line text-ink/60 hover:border-ink/30 hover:text-ink"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
          {items.map((item, index) => (
            <motion.button
              layout
              key={item.id}
              onClick={() => setOpenIndex(index)}
              className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-sm bg-ink text-left"
            >
              <Picture
                bucket={item.bucket}
                slug={item.slug}
                alt={item.alt}
                className="block w-full"
                imgClassName="w-full object-cover transition duration-[1400ms] ease-[var(--soft)] group-hover:scale-[1.04]"
                widths={item.bucket === "stills" ? [1280, 1920] : undefined}
              />
              <span className="block bg-ink px-5 py-4 text-bone">
                <span className="text-[0.6rem] font-medium uppercase tracking-widest3 text-bone/55">
                  {item.category}
                </span>
                <span className="mt-1.5 block font-display text-xl font-light tracking-[-0.025em]">
                  {item.title}
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>
      {openIndex !== null ? (
        <Lightbox items={items} index={openIndex} onClose={() => setOpenIndex(null)} onMove={setOpenIndex} />
      ) : null}
    </section>
  );
}
