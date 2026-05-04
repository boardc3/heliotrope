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
    <section id="gallery" className="section-pad bg-bone">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow">Full Gallery</span>
            <h2 className="mt-5 max-w-3xl font-display text-5xl leading-[0.96] tracking-[-0.055em] md:text-7xl">
              Every angle, still, and material cue.
            </h2>
          </div>
          <div className="flex max-w-3xl flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-full border px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] transition ${filter === item ? "border-ink bg-ink text-bone" : "border-ink/10 text-ink/65 hover:border-ink/30"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
          {items.map((item, index) => (
            <motion.button
              layout
              key={item.id}
              onClick={() => setOpenIndex(index)}
              className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-[1.75rem] bg-ink text-left"
            >
              <Picture
                bucket={item.bucket}
                slug={item.slug}
                alt={item.alt}
                className="block w-full"
                imgClassName="w-full object-cover transition duration-[1200ms] group-hover:scale-[1.04]"
                widths={item.bucket === "stills" ? [1280, 1920] : undefined}
              />
              <span className="block bg-ink p-4 text-bone">
                <span className="font-mono text-[0.62rem] uppercase tracking-wider2 text-bone/55">{item.category}</span>
                <span className="mt-1 block font-display text-2xl tracking-[-0.04em]">{item.title}</span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>
      {openIndex !== null ? <Lightbox items={items} index={openIndex} onClose={() => setOpenIndex(null)} onMove={setOpenIndex} /> : null}
    </section>
  );
}
