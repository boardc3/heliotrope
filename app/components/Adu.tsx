import { Picture } from "./Picture";
import { formatUnitBaths, UNITS } from "../data/property";

const unitB = UNITS[1];

const features = [
  "Carriage-style rear condo · 1,206 SF habitable",
  "2 bedrooms · 2 full baths + powder room",
  "Sold separately from Unit A, yet connected",
  "Guest, rental, or extended-family flexibility",
];

export function Adu() {
  return (
    <section className="relative bg-pearl section-pad">
      <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.55fr_1fr] lg:items-stretch">
        <div className="flex flex-col justify-between gap-12 rounded-sm bg-bone p-9 lg:p-12">
          <div>
            <span className="eyebrow">08 — Unit B · Rear Condo</span>
            <h2 className="mt-6 font-display text-[clamp(2.4rem,4.6vw,4rem)] font-light leading-[1.02] tracking-[-0.035em]">
              A carriage-style condo, <span className="italic">by design</span>.
            </h2>
            <p className="mt-6 text-base leading-[1.75] text-ink/68">
              Unit B is the rear condo — a substantial {unitB.habitableSqFt.toLocaleString()}-square-foot residence
              with {unitB.bedrooms} bedrooms and {formatUnitBaths(unitB.fullBaths, unitB.powderRooms)}. Connected to
              Unit A yet sold separately, it offers guest quarters, rental income, extended family, or a private
              coastal base with its own identity.
            </p>
            <a href="/docs/Design-Inspo-437-Heliotrope.pdf" className="btn-primary mt-7">
              Open package PDF
            </a>
          </div>
          <ul className="grid gap-3 border-t border-line pt-6">
            {features.map((feature) => (
              <li key={feature} className="flex items-baseline gap-3 text-sm text-ink/72">
                <span className="h-px w-5 bg-ink/28" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <figure className="relative min-h-[460px] overflow-hidden rounded-sm bg-ink">
          <Picture
            bucket="adu"
            slug="adu-01"
            alt="Unit B rear condo interior concept at 437 Heliotrope"
            className="block h-full w-full"
            imgClassName="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(19,17,14,.82)_100%)]" />
          <figcaption className="absolute inset-x-0 bottom-0 p-7 text-bone md:p-9">
            <p className="text-[0.6rem] font-medium uppercase tracking-widest3 text-bone/60">Unit B · Rear Condo</p>
            <h3 className="mt-2 font-display text-[clamp(1.8rem,2.6vw,2.4rem)] font-light tracking-[-0.025em]">
              Substantial rear living
            </h3>
            <p className="mt-2 max-w-md text-sm text-bone/68">
              Both bedrooms on the second floor, with refined neutrals and rental-ready proportions at the same
              Heliotrope address.
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
