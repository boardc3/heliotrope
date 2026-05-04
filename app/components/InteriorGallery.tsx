"use client";

import { motion } from "framer-motion";
import { Picture } from "./Picture";

const cards = [
  {
    bucket: "great-room",
    slug: "gr-01",
    area: "Unit A",
    title: "The Great Room",
    materials: "white oak · plaster walls · integrated dining",
    span: "lg:col-span-7 lg:row-span-2 aspect-[4/5] lg:aspect-auto",
  },
  {
    bucket: "kitchen",
    slug: "kt-03",
    area: "Kitchen",
    title: "The Chef's Axis",
    materials: "stone counters · warm millwork · soft brass",
    span: "lg:col-span-5 aspect-[4/3]",
  },
  {
    bucket: "kitchen",
    slug: "kt-04",
    area: "Kitchen",
    title: "Island Light",
    materials: "waterfall surfaces · hidden storage · calm palette",
    span: "lg:col-span-5 aspect-[4/3]",
  },
  {
    bucket: "bedrooms",
    slug: "bed-01",
    area: "Primary Suite",
    title: "Terrace Morning",
    materials: "wood ceiling · built-ins · private deck connection",
    span: "lg:col-span-7 aspect-[4/3]",
  },
  {
    bucket: "bedrooms",
    slug: "bed-02",
    area: "Bedroom Suite",
    title: "Built-In Retreat",
    materials: "storage wall · reading bench · warm evening light",
    span: "lg:col-span-5 aspect-[4/3]",
  },
  {
    bucket: "dining",
    slug: "dn-05",
    area: "Dining",
    title: "Gathering Room",
    materials: "wide openings · layered neutrals · coastal daylight",
    span: "lg:col-span-7 aspect-[4/3]",
  },
  {
    bucket: "great-room",
    slug: "gr-02",
    area: "Unit A",
    title: "Connected Living",
    materials: "lounge · dining · kitchen in one continuous field",
    span: "lg:col-span-12 aspect-[16/8]",
  },
];

export function InteriorGallery() {
  return (
    <section id="interiors" className="relative bg-bone section-pad">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-10 lg:grid-cols-[0.55fr_1fr] lg:items-end">
          <div>
            <span className="eyebrow">02 — Inside the Home</span>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,5.4vw,4.8rem)] font-light leading-[1.02] tracking-[-0.035em]">
              Warm material work for a <span className="italic">walkable</span> coastal life.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-[1.75] text-ink/68 lg:pb-3">
            Unit A is visualized as a seamless living, dining, kitchen, and bedroom environment—natural light,
            grounded surfaces, and a palette that lets the village location stay in the foreground.
          </p>
        </div>

        <div className="mt-14 grid auto-rows-[minmax(220px,_auto)] grid-cols-1 gap-4 lg:grid-cols-12">
          {cards.map((card, index) => (
            <motion.figure
              key={`${card.bucket}-${card.slug}-${index}`}
              className={`group relative overflow-hidden rounded-sm bg-ink ${card.span}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.95, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <Picture
                bucket={card.bucket}
                slug={card.slug}
                alt={`${card.title} render at 437 Heliotrope`}
                className="block h-full w-full"
                imgClassName="h-full w-full object-cover transition duration-[1600ms] ease-[var(--soft)] group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(19,17,14,.82)_100%)]" />
              <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-6 text-bone md:p-8">
                <p className="text-[0.6rem] font-medium uppercase tracking-widest3 text-bone/60">{card.area}</p>
                <h3 className="font-display text-[clamp(1.6rem,2.2vw,2rem)] font-light tracking-[-0.025em]">
                  {card.title}
                </h3>
                <p className="text-[0.85rem] text-bone/68">{card.materials}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
