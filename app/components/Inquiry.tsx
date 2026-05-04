import { PROPERTY } from "../data/property";

export function Inquiry() {
  const subject = encodeURIComponent("437 Heliotrope package request");
  return (
    <section id="inquiry" className="relative overflow-hidden bg-ink text-bone">
      <video className="absolute inset-0 h-full w-full object-cover opacity-35" src="/video/aerial2-1080.mp4" poster="/img/posters/aerial2.jpg" autoPlay muted loop playsInline />
      <div className="absolute inset-0 bg-ink/70" />
      <div className="section-pad relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <span className="eyebrow !text-bone/65">Request the Package</span>
          <h2 className="mt-5 font-display text-5xl leading-[0.96] tracking-[-0.055em] md:text-7xl">
            Bring the full story into the room.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-bone/70">
            Ask for the planning context, asset package, and diligence notes for the two-residence opportunity at
            437 Heliotrope.
          </p>
          <address className="mt-8 not-italic text-bone/75" itemScope itemType="https://schema.org/PostalAddress">
            <span itemProp="streetAddress">{PROPERTY.street}</span>
            <br />
            <span itemProp="addressLocality">{PROPERTY.city}</span>, <span itemProp="addressRegion">{PROPERTY.region}</span>{" "}
            <span itemProp="postalCode">{PROPERTY.postalCode}</span>
          </address>
          <p className="mt-4 font-mono text-xs uppercase tracking-wider2 text-bone/48">
            {PROPERTY.propertyType} · MLS {PROPERTY.mls} · {PROPERTY.bedrooms} BR / {PROPERTY.bathrooms} BA
          </p>
        </div>
        <form action={`mailto:?subject=${subject}`} className="rounded-[2rem] border border-bone/12 bg-bone/10 p-6 backdrop-blur-xl">
          <label className="block font-mono text-[0.65rem] uppercase tracking-wider2 text-bone/60">
            Name
            <input name="name" className="mt-2 block w-full rounded-2xl border border-bone/15 bg-ink/35 px-4 py-4 font-sans text-base text-bone outline-none focus:border-copper" />
          </label>
          <label className="mt-4 block font-mono text-[0.65rem] uppercase tracking-wider2 text-bone/60">
            Email
            <input name="email" type="email" className="mt-2 block w-full rounded-2xl border border-bone/15 bg-ink/35 px-4 py-4 font-sans text-base text-bone outline-none focus:border-copper" />
          </label>
          <label className="mt-4 block font-mono text-[0.65rem] uppercase tracking-wider2 text-bone/60">
            Message
            <textarea name="body" rows={5} defaultValue="Please send the 437 Heliotrope package." className="mt-2 block w-full rounded-2xl border border-bone/15 bg-ink/35 px-4 py-4 font-sans text-base text-bone outline-none focus:border-copper" />
          </label>
          <button className="btn-primary mt-5 !bg-bone !text-ink hover:!bg-copper hover:!text-bone" type="submit">
            Open Email
          </button>
        </form>
      </div>
    </section>
  );
}
