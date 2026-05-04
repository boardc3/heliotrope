"use client";

import { motion } from "framer-motion";
import { Picture } from "./Picture";

const cards = [
  { bucket: "great-room", slug: "gr-01", area: "Unit A", title: "Open Great Room", materials: "white oak · plaster walls · integrated dining", span: "lg:col-span-7 lg:row-span-2" },
  { bucket: "kitchen", slug: "kt-03", area: "Kitchen", title: "The Chef's Axis", materials: "stone counters · warm millwork · soft brass", span: "lg:col-span-5" },
  { bucket: "kitchen", slug: "kt-04", area: "Kitchen", title: "Island Light", materials: "waterfall surfaces · hidden storage · calm palette", span: "lg:col-span-5" },
  { bucket: "dining", slug: "dn-05", area: "Dining", title: "Gathering Room", materials: "wide openings · layered neutrals · coastal daylight", span: "lg:col-span-7" },
  { bucket: "great-room", slug: "gr-02", area: "Unit A", title: "Connected Living", materials: "lounge · dining · kitchen in one continuous field", span: "lg:col-span-12" },
];

export function InteriorGallery() {
  return (
    <section id="interiors" className="section-pad bg-bone">
      <div className="mx-auto max-w-7xl">
        <span className="eyebrow">Inside the Home</span>
        <div className="mt-5 grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <h2 className="font-display text-5xl leading-[0.96] tracking-[-0.055em] md:text-7xl">
            Warm material work for a walkable coastal life.
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-ink/68">
            Unit A is visualized as a seamless living, dining, and kitchen environment: natural light, grounded
            surfaces, and a palette that lets the village location stay in the foreground.
          </p>
        </div>
        <div className="mt-12 grid auto-rows-[260px] grid-cols-1 gap-4 lg:grid-cols-12">
          {cards.map((card, index) => (
            <motion.figure
              key={card.slug}
              className={`group relative overflow-hidden rounded-[2rem] bg-ink ${card.span}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.75, delay: index * 0.06 }}
            >
              <Picture
                bucket={card.bucket}
                slug={card.slug}
                alt={`${card.title} render at 437 Heliotrope`}
                className="block h-full w-full"
                imgClassName="h-full w-full object-cover transition duration-[1400ms] ease-[var(--soft)] group-hover:scale-[1.04]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-6 text-bone">
                <p className="font-mono text-[0.66rem] uppercase tracking-wider2 text-bone/65">{card.area}</p>
                <h3 className="mt-1 font-display text-3xl tracking-[-0.04em]">{card.title}</h3>
                <p className="mt-1 text-sm text-bone/70">{card.materials}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
