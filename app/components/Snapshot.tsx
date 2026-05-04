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
    const controls = animate(motionValue, value, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [motionValue, value]);

  return <motion.span>{display}</motion.span>;
}

export function Snapshot() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section ref={ref} className="section-pad bg-bone">
      <div className="mx-auto max-w-7xl">
        <span className="eyebrow">The Snapshot</span>
        <div className="mt-5 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <h2 className="font-display text-5xl leading-[0.95] tracking-[-0.055em] md:text-7xl">
            A rare CdM address with a flexible two-residence program.
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-ink/70">
            Public listing data identifies the property as a 4-bedroom, 3-bath duplex with roughly 2,499 square feet
            of living area and 3,485 square feet total. The opportunity is the mix: village proximity, separate-unit
            optionality, and a crisp design direction already visualized in the asset package.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {snapshotStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.75, delay: index * 0.06 }}
              className="rounded-[2rem] border border-ink/10 bg-pearl/65 p-7"
            >
              <p className="font-mono text-[0.68rem] uppercase tracking-wider2 text-surf">{stat.label}</p>
              <p className="mt-5 font-display text-5xl tracking-[-0.05em]">
                {inView && stat.numeric ? <Counter value={stat.numeric} format={stat.format} /> : stat.value}
                {stat.value.includes("SF") ? " SF" : ""}
              </p>
              <p className="mt-3 text-sm leading-6 text-ink/62">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
