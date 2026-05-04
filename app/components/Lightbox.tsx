"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GalleryItem } from "../data/galleryItems";
import { Picture } from "./Picture";

export function Lightbox({
  items,
  index,
  onClose,
  onMove,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onMove: (index: number) => void;
}) {
  const item = items[index];
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    setZoom(1);
  }, [index]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onMove((index + 1) % items.length);
      if (event.key === "ArrowLeft") onMove((index - 1 + items.length) % items.length);
      if (event.key === "+" || event.key === "=") setZoom((value) => Math.min(3, value + 0.25));
      if (event.key === "-") setZoom((value) => Math.max(1, value - 0.25));
      if (event.key === "0") setZoom(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, items.length, onClose, onMove]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-ink/96 p-4 text-bone backdrop-blur-2xl md:p-8">
      <div className="flex items-center justify-between text-[0.62rem] font-medium uppercase tracking-widest3 text-bone/65">
        <span className="tabular">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <span className="hidden md:inline">{item.category}</span>
        <button
          onClick={onClose}
          className="rounded-full border border-bone/22 px-4 py-2 transition hover:border-bone hover:text-bone"
          aria-label="Close gallery"
        >
          Close
        </button>
      </div>

      <div className="relative mt-6 flex flex-1 items-center justify-center overflow-hidden rounded-sm bg-bone/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: zoom }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            onDoubleClick={() => setZoom((value) => (value > 1 ? 1 : 2.2))}
            className="flex h-full w-full cursor-zoom-in items-center justify-center"
          >
            <Picture
              bucket={item.bucket}
              slug={item.slug}
              alt={item.alt}
              className="flex h-full w-full items-center justify-center"
              imgClassName="max-h-full max-w-full object-contain"
              widths={item.bucket === "stills" ? [1280, 1920] : undefined}
            />
          </motion.div>
        </AnimatePresence>

        <button
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-bone/22 bg-ink/55 px-3 py-3 text-sm transition hover:border-bone md:left-6"
          onClick={() => onMove((index - 1 + items.length) % items.length)}
          aria-label="Previous image"
        >
          ←
        </button>
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-bone/22 bg-ink/55 px-3 py-3 text-sm transition hover:border-bone md:right-6"
          onClick={() => onMove((index + 1) % items.length)}
          aria-label="Next image"
        >
          →
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-4 text-bone">
        <div>
          <p className="text-[0.6rem] font-medium uppercase tracking-widest3 text-ember">{item.category}</p>
          <h3 className="mt-1 font-display text-2xl font-light tracking-[-0.025em]">{item.title}</h3>
          <p className="text-sm text-bone/62">{item.meta}</p>
        </div>
        <div className="flex gap-1.5 text-[0.62rem] font-medium uppercase tracking-widest3">
          <button
            onClick={() => setZoom(Math.max(1, zoom - 0.25))}
            className="rounded-full border border-bone/22 px-3 py-2 transition hover:border-bone"
            aria-label="Zoom out"
          >
            −
          </button>
          <button
            onClick={() => setZoom(1)}
            className="rounded-full border border-bone/22 px-3 py-2 transition hover:border-bone"
            aria-label="Reset zoom"
          >
            Reset
          </button>
          <button
            onClick={() => setZoom(Math.min(3, zoom + 0.25))}
            className="rounded-full border border-bone/22 px-3 py-2 transition hover:border-bone"
            aria-label="Zoom in"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
