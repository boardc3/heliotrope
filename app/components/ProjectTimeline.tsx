const phases = [
  {
    phase: "Media Refresh",
    status: "Updated",
    message: "The primary hero film now uses the May 27 Heliotrope video package.",
  },
  {
    phase: "Design Package",
    status: "Ready",
    message: "Interior renders, exterior stills, and the design inspiration PDF are organized for buyer review.",
  },
  {
    phase: "Buyer Diligence",
    status: "Available",
    message: "Interested buyers can request the full package, listing context, and private gallery links from inquiry.",
  },
] as const;

export function ProjectTimeline() {
  return (
    <section className="relative bg-pearl section-pad">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-10 lg:grid-cols-[0.55fr_1fr] lg:items-end">
          <div>
            <span className="eyebrow">03 — Project Timeline</span>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,5.4vw,4.8rem)] font-light leading-[1.02] tracking-[-0.035em]">
              The package is ready for a <span className="italic">serious</span> buyer.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-[1.75] text-ink/68 lg:pb-3">
            The page now tells a more direct delivery story: what has been refreshed, what is documented,
            and how buyers can get the supporting materials.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {phases.map((item, index) => (
            <article key={item.phase} className="rounded-sm border border-line bg-bone p-8">
              <p className="eyebrow-plain text-ink/45">0{index + 1} / {item.phase}</p>
              <h3 className="mt-5 font-display text-3xl font-light tracking-[-0.03em]">{item.status}</h3>
              <p className="mt-5 text-sm leading-6 text-ink/62">{item.message}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
