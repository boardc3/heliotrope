"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { finishSchemes } from "../data/finishSchemes";
import { Picture } from "./Picture";

export function ExteriorConfigurator() {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const scheme = finishSchemes[active];

  useEffect(() => {
    if (touched) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % finishSchemes.length), 9500);
    return () => window.clearInterval(timer);
  }, [touched]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setTouched(true);
        setActive((value) => (value + 1) % finishSchemes.length);
      }
      if (event.key === "ArrowLeft") {
        setTouched(true);
        setActive((value) => (value - 1 + finishSchemes.length) % finishSchemes.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const choose = (index: number) => {
    setTouched(true);
    setActive(index);
  };

  return (
    <section id="vision" className="relative bg-pearl section-pad">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-10 lg:grid-cols-[0.55fr_1fr] lg:items-end">
          <div>
            <span className="eyebrow">02 — Exterior Vision</span>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,5.4vw,4.8rem)] font-light leading-[1.02] tracking-[-0.035em]">
              From village shell to a <span className="italic">contemporary</span> CdM facade.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-[1.75] text-ink/68 lg:pb-3">
            The assets show the property as it stands and the sharper coastal direction it can take. Toggle between the
            two states to feel how much presence the same Heliotrope address can carry.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.5fr_0.55fr]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-ink shadow-[0_50px_120px_-40px_rgba(19,17,14,0.55)] lg:aspect-[16/11]">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Picture
                  bucket="exterior"
                  slug={scheme.image}
                  alt={`${scheme.name} exterior vision for 437 Heliotrope`}
                  className="block h-full w-full"
                  imgClassName="h-full w-full object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(19,17,14,.78)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 text-bone md:p-9">
              <div>
                <p className="text-[0.62rem] font-medium uppercase tracking-widest3 text-bone/65">Scheme {scheme.number}</p>
                <h3 className="mt-2 font-display text-[clamp(1.8rem,2.6vw,2.4rem)] font-light tracking-[-0.025em]">
                  {scheme.name}
                </h3>
              </div>
              <div className="hidden gap-1.5 md:flex">
                {scheme.swatches.map((swatch) => (
                  <span
                    key={swatch}
                    className="h-7 w-7 rounded-full border border-bone/40 shadow-inner"
                    style={{ background: swatch }}
                  />
                ))}
              </div>
            </div>
          </div>

          <aside className="flex flex-col justify-between gap-8 rounded-sm bg-bone p-7 md:p-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
              >
                <span className="eyebrow-plain text-ink/55">Scheme {scheme.number}</span>
                <h3 className="mt-4 font-display text-[clamp(1.9rem,2.6vw,2.4rem)] font-light leading-tight tracking-[-0.03em]">
                  {scheme.name}
                </h3>
                <p className="mt-5 text-[0.95rem] leading-[1.7] text-ink/68">{scheme.blurb}</p>
                <ul className="mt-7 grid gap-2.5">
                  {scheme.materials.map((material) => (
                    <li key={material} className="flex items-baseline gap-3 text-sm text-ink/70">
                      <span className="h-px w-4 bg-ink/25" />
                      {material}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
            <div className="grid grid-cols-2 gap-3 border-t border-line pt-6">
              {finishSchemes.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => choose(index)}
                  aria-pressed={active === index}
                  className={`group flex flex-col gap-2 rounded-sm border p-4 text-left transition ${
                    active === index
                      ? "border-ink bg-ink text-bone"
                      : "border-line text-ink/72 hover:border-ink/40"
                  }`}
                >
                  <span className="text-[0.6rem] font-medium uppercase tracking-widest3 opacity-70">
                    Scheme {item.number}
                  </span>
                  <span className="font-display text-lg font-light leading-tight tracking-tight">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
