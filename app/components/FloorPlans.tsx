import { Picture } from "./Picture";

const plans = [
  {
    title: "Unit A Flow",
    copy: "A larger primary residence story with living, dining, kitchen, bedroom, and terrace imagery organized for review.",
    image: { bucket: "great-room", slug: "gr-01" },
    href: "/docs/Design-Inspo-437-Heliotrope.pdf",
  },
  {
    title: "Unit B Flexibility",
    copy: "A second-residence reference for guest use, rental thinking, extended family, or a private coastal base.",
    image: { bucket: "adu", slug: "adu-01" },
    href: "/docs/Design-Inspo-437-Heliotrope.pdf",
  },
] as const;

export function FloorPlans() {
  return (
    <section id="floor-plans" className="relative bg-pearl section-pad">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-10 lg:grid-cols-[0.55fr_1fr] lg:items-end">
          <div>
            <span className="eyebrow">05 — Package</span>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,5.4vw,4.8rem)] font-light leading-[1.02] tracking-[-0.035em]">
              See the flow before the <span className="italic">finish</span>.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-[1.75] text-ink/68 lg:pb-3">
            The Heliotrope package pairs rendered imagery with a direct design reference so serious buyers can
            understand the primary residence, Unit B, and overall material direction.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {plans.map((plan) => (
            <article key={plan.title} className="overflow-hidden rounded-sm border border-line bg-bone">
              <figure className="relative aspect-[16/10] bg-ink">
                <Picture
                  bucket={plan.image.bucket}
                  slug={plan.image.slug}
                  alt={`${plan.title} reference for 437 Heliotrope`}
                  className="block h-full w-full"
                  imgClassName="h-full w-full object-cover"
                />
              </figure>
              <div className="p-7 md:p-8">
                <h3 className="font-display text-3xl font-light tracking-[-0.03em]">{plan.title}</h3>
                <p className="mt-4 text-sm leading-6 text-ink/62">{plan.copy}</p>
                <a href={plan.href} className="btn-primary mt-6">
                  Open package PDF
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
