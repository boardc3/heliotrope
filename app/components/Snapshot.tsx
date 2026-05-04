"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { snapshotStats } from "../data/property";

function Counter({ value, format }: { value: number; format: "int" | "decimal" | "year" }) {
  const motionValue = useMotionValue(0);
  const display = useTransform(motionValue, (latest) => {
    if (format === "year") return String(Math.round(latest));
    if (format === "decimal") return latest.toFixed(1);
    return Math.round(latest).toLocaleString();
  });

  useEffect(() => {
    const controls = animate(motionValue, value, { duration: 2.0, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [motionValue, value]);

  return <motion.span className="tabular">{display}</motion.span>;
}

export function Snapshot() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section ref={ref} className="relative bg-bone section-pad">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-12 lg:grid-cols-[0.55fr_1fr] lg:items-end">
          <div>
            <span className="eyebrow">01 — The Snapshot</span>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,5.4vw,4.8rem)] font-light leading-[1.02] tracking-[-0.035em]">
              A rare CdM address with a flexible <span className="italic">two-residence</span> program.
            </h2>
          </div>
          <div className="lg:pb-3">
            <p className="max-w-xl text-base leading-[1.75] text-ink/68 md:text-[1.05rem]">
              Public listing data describes the property as a four-bedroom, three-bath duplex with roughly 2,499 square
              feet of living area on a tightly held block of Heliotrope Avenue. The opportunity is the mix:
              village proximity, separate-unit optionality, and a clear design direction.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 divide-x divide-y divide-line border-y border-line lg:grid-cols-3">
          {snapshotStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col gap-4 p-7 md:p-9"
            >
              <span className="eyebrow-plain text-ink/58">{stat.label}</span>
              <p className="font-display text-[clamp(2.8rem,5vw,4rem)] font-light leading-none tracking-[-0.04em] text-ink">
                {inView && stat.numeric ? <Counter value={stat.numeric} format={stat.format} /> : stat.value}
                {stat.value.includes("SF") ? <span className="ml-2 text-base align-middle text-ink/50">SF</span> : null}
              </p>
              <p className="text-sm leading-6 text-ink/60">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
