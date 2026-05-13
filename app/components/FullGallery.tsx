"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { galleryItems } from "../data/galleryItems";
import { Lightbox } from "./Lightbox";
import { Picture } from "./Picture";

export function FullGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = galleryItems;

  return (
    <section id="gallery" className="relative bg-bone section-pad">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-10 lg:grid-cols-[0.55fr_1fr] lg:items-end">
          <div>
            <span className="eyebrow">09 — Short Interior Edit</span>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,5.4vw,4.8rem)] font-light leading-[1.02] tracking-[-0.035em]">
              A short <span className="italic">interior</span> edit.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-[1.75] text-ink/68 lg:pb-3">
            A smaller set of selected interior views keeps the page focused and avoids asking buyers to sort through
            categories or duplicate angles. Open any image for the lightbox.
          </p>
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
