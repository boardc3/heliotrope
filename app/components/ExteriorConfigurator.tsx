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
    const timer = window.setInterval(() => setActive((value) => (value + 1) % finishSchemes.length), 9000);
    return () => window.clearInterval(timer);
  }, [touched]);

  const choose = (index: number) => {
    setTouched(true);
    setActive(index);
  };

  return (
    <section id="vision" className="section-pad bg-pearl">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <span className="eyebrow">Exterior Vision</span>
            <h2 className="mt-5 font-display text-5xl leading-[0.96] tracking-[-0.055em] md:text-7xl">
              From village shell to contemporary CdM.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-ink/68">
            The assets show the property as it stands and the sharper coastal direction it can take. Toggle between
            the two states to feel how much presence the same Heliotrope address can carry.
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="relative min-h-[62vw] overflow-hidden rounded-[2.25rem] bg-ink shadow-2xl shadow-ink/20 lg:min-h-[650px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
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
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-6 text-bone md:p-8">
              <p className="font-mono text-xs uppercase tracking-wider2 text-bone/70">{scheme.number}</p>
              <h3 className="mt-2 font-display text-4xl tracking-[-0.04em]">{scheme.name}</h3>
              <div className="mt-4 flex gap-2">
                {scheme.swatches.map((swatch) => (
                  <span key={swatch} className="h-6 w-6 rounded-full border border-bone/40" style={{ background: swatch }} />
                ))}
              </div>
            </div>
          </div>
          <aside className="rounded-[2.25rem] bg-bone p-7 lg:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.55 }}
              >
                <span className="eyebrow">Scheme {scheme.number}</span>
                <h3 className="mt-4 font-display text-4xl leading-none tracking-[-0.045em]">{scheme.name}</h3>
                <p className="mt-5 leading-7 text-ink/68">{scheme.blurb}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {scheme.materials.map((material) => (
                    <span key={material} className="rounded-full border border-ink/10 px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink/70">
                      {material}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {finishSchemes.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => choose(index)}
                  className={`rounded-2xl border p-4 text-left transition ${active === index ? "border-copper bg-pearl" : "border-ink/10 bg-transparent hover:border-ink/25"}`}
                >
                  <span className="font-mono text-[0.65rem] uppercase tracking-wider2 text-surf">{item.number}</span>
                  <span className="mt-2 block font-display text-xl tracking-[-0.035em]">{item.name}</span>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
