const pillars = [
  [
    "Two Connected Condos",
    "Two condos on one 3,540-square-foot lot — physically connected yet sold separately — maximizing density in Corona del Mar.",
  ],
  ["Village Walkability", "Daily dining, errands, and beach rituals stay close to the front door."],
  ["Material Continuity", "Warm neutrals, stone, millwork, and soft coastal light carry through the visual story."],
  [
    "Rear Condo Flexibility",
    "The carriage-style rear condo supports guest use, rental income, extended family, or a private coastal base.",
  ],
] as const;

export function DesignVision() {
  return (
    <section id="design-vision" className="relative bg-ink text-bone section-pad">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-12 lg:grid-cols-[0.55fr_1fr] lg:items-end">
          <div>
            <span className="eyebrow !text-bone/70">02 — Design Vision</span>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,5.4vw,4.8rem)] font-light leading-[1.02] tracking-[-0.035em] text-bone">
              A clearer read on the <span className="italic">opportunity</span>.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-[1.75] text-bone/72 md:text-[1.05rem] lg:pb-3">
            The Heliotrope story now moves faster: the buyer sees the condo configuration, the finished material
            direction, the front-and-rear unit logic, and the village lifestyle before getting deep into the gallery.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-bone/12 bg-bone/12 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map(([title, copy]) => (
            <article key={title} className="bg-ink/70 p-7 md:p-8">
              <p className="eyebrow-plain text-bone/45">{title}</p>
              <p className="mt-4 text-sm leading-6 text-bone/68">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
