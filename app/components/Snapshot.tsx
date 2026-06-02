"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { formatUnitBaths, PROPERTY, snapshotStats, UNITS } from "../data/property";

function Counter({ value, format }: { value: number; format: "int" | "decimal" | "decimal2" | "year" }) {
  const motionValue = useMotionValue(0);
  const display = useTransform(motionValue, (latest) => {
    if (format === "year") return String(Math.round(latest));
    if (format === "decimal2") return latest.toFixed(2);
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
    <section id="property" ref={ref} className="relative bg-bone section-pad">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-12 lg:grid-cols-[0.55fr_1fr] lg:items-end">
          <div>
            <span className="eyebrow">01 — The Snapshot</span>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,5.4vw,4.8rem)] font-light leading-[1.02] tracking-[-0.035em]">
              Key details, without the <span className="italic">extra</span> scroll.
            </h2>
          </div>
          <div className="lg:pb-3">
            <p className="max-w-xl text-base leading-[1.75] text-ink/68 md:text-[1.05rem]">
              437 Heliotrope is two connected condos sold separately on a {PROPERTY.lotSqFt.toLocaleString()}
              -square-foot lot in Corona del Mar — a larger primary residence in the front and a substantial
              carriage-style unit in the rear. Together they offer five bedrooms, six bathrooms (four full and two
              powder rooms), and {PROPERTY.habitableArea.toLocaleString()} square feet of combined habitable area.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 divide-x divide-y divide-line border-y border-line lg:grid-cols-4">
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
                {inView && stat.numeric ? (
                  <Counter value={stat.numeric} format={stat.format} />
                ) : (
                  stat.value.replace(/\s*SF$/, "")
                )}
                {stat.value.includes("SF") ? <span className="ml-2 text-base align-middle text-ink/50">SF</span> : null}
              </p>
              <p className="text-sm leading-6 text-ink/60">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-2">
          {UNITS.map((unit, index) => (
            <motion.article
              key={unit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, delay: 0.4 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-bone p-8 md:p-10"
            >
              <p className="eyebrow-plain text-ink/45">
                {unit.label} · {unit.position}
              </p>
              <h3 className="mt-4 font-display text-[clamp(1.8rem,3vw,2.4rem)] font-light tracking-[-0.03em]">
                {unit.description}
              </h3>
              <dl className="mt-6 grid gap-4 border-t border-line pt-6 sm:grid-cols-3">
                <div>
                  <dt className="text-[0.62rem] font-medium uppercase tracking-widest3 text-ink/45">Habitable</dt>
                  <dd className="mt-2 font-display text-2xl font-light tracking-[-0.02em]">
                    {unit.habitableSqFt.toLocaleString()} SF
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.62rem] font-medium uppercase tracking-widest3 text-ink/45">Bedrooms</dt>
                  <dd className="mt-2 font-display text-2xl font-light tracking-[-0.02em]">{unit.bedrooms}</dd>
                </div>
                <div>
                  <dt className="text-[0.62rem] font-medium uppercase tracking-widest3 text-ink/45">Bathrooms</dt>
                  <dd className="mt-2 text-sm leading-6 text-ink/72">
                    {formatUnitBaths(unit.fullBaths, unit.powderRooms)}
                  </dd>
                </div>
              </dl>
              <p className="mt-5 text-sm leading-6 text-ink/62">
                <span className="font-medium text-ink/72">Layout:</span> {unit.layout}
              </p>
            </motion.article>
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-sm leading-7 text-ink/58">
          This configuration maximizes density for a {PROPERTY.lotSqFt.toLocaleString()}-square-foot lot in Corona del
          Mar — two condos that share a connection yet convey as separate interests, giving buyers a larger front
          residence and a meaningful rear unit without sacrificing village walkability.
        </p>
      </div>
    </section>
  );
}
