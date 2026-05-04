import { Picture } from "./Picture";

export function Adu() {
  return (
    <section className="section-pad bg-pearl">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] bg-bone p-8 lg:p-10">
          <span className="eyebrow">Unit B</span>
          <h2 className="mt-5 font-display text-5xl leading-[0.96] tracking-[-0.055em] md:text-7xl">
            A second residence, by design.
          </h2>
          <p className="mt-6 text-lg leading-8 text-ink/68">
            The duplex program gives 437 Heliotrope a useful second life: guest quarters, long-term rental, extended
            family, office, or a private coastal base with its own identity.
          </p>
          <div className="mt-8 grid gap-3">
            {["Independent living volume", "Warm neutral finish direction", "Separate income or family flexibility", "Steps from village dining"].map((item) => (
              <div key={item} className="rounded-2xl border border-ink/10 px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-ink/72">
                {item}
              </div>
            ))}
          </div>
        </div>
        <figure className="relative min-h-[420px] overflow-hidden rounded-[2.25rem] bg-ink">
          <Picture bucket="adu" slug="adu-01" alt="Unit B interior concept at 437 Heliotrope" className="block h-full w-full" imgClassName="h-full w-full object-cover" />
          <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/80 to-transparent p-6 text-bone">
            <p className="font-display text-3xl tracking-[-0.04em]">Unit B Interior</p>
            <p className="mt-1 text-sm text-bone/70">A compact second residence with a refined, rental-ready feel.</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
