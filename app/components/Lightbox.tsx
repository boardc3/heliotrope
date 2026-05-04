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
    <div className="fixed inset-0 z-[100] bg-ink/95 p-4 text-bone backdrop-blur-xl md:p-7">
      <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider2 text-bone/70">
        <span>
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <button onClick={onClose} className="rounded-full border border-bone/20 px-4 py-2" aria-label="Close gallery">
          Close
        </button>
      </div>
      <div className="relative mt-5 flex h-[calc(100vh-9rem)] items-center justify-center overflow-hidden rounded-[2rem] bg-bone/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: zoom }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onDoubleClick={() => setZoom((value) => (value > 1 ? 1 : 2.2))}
            className="h-full w-full cursor-zoom-in"
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
        <button className="absolute left-4 top-1/2 rounded-full bg-ink/65 px-4 py-3" onClick={() => onMove((index - 1 + items.length) % items.length)} aria-label="Previous image">
          Prev
        </button>
        <button className="absolute right-4 top-1/2 rounded-full bg-ink/65 px-4 py-3" onClick={() => onMove((index + 1) % items.length)} aria-label="Next image">
          Next
        </button>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-wider2 text-copper">{item.category}</p>
          <h3 className="font-display text-3xl tracking-[-0.04em]">{item.title}</h3>
          <p className="text-sm text-bone/62">{item.meta}</p>
        </div>
        <div className="flex gap-2 font-mono text-xs uppercase tracking-wider2">
          <button onClick={() => setZoom(Math.max(1, zoom - 0.25))}>-</button>
          <button onClick={() => setZoom(1)}>Reset</button>
          <button onClick={() => setZoom(Math.min(3, zoom + 0.25))}>+</button>
        </div>
      </div>
    </div>
  );
}
