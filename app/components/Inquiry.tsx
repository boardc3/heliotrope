import { PROPERTY } from "../data/property";

export function Inquiry() {
  const subject = encodeURIComponent("437 Heliotrope · Package request");
  return (
    <section id="inquiry" className="relative isolate overflow-hidden bg-ink text-bone">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-32"
        src="/video/aerial2-1080.mp4"
        poster="/img/posters/aerial2.jpg"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,17,14,.85)_0%,rgba(19,17,14,.7)_50%,rgba(19,17,14,.95)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_15%,rgba(168,90,47,.18),transparent_60%)]" />

      <div className="relative section-pad mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[1fr_0.85fr]">
        <div className="flex flex-col gap-10">
          <div>
            <span className="eyebrow !text-bone/72">08 — Inquiry</span>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,5.4vw,4.8rem)] font-light leading-[1.02] tracking-[-0.035em] text-bone">
              Bring the full story <span className="italic">into the room</span>.
            </h2>
            <p className="mt-7 max-w-xl text-base leading-[1.75] text-bone/72">
              Request the planning context, asset package, and diligence notes for the two-residence opportunity at
              437 Heliotrope. We&apos;ll respond personally with what&apos;s relevant to you.
            </p>
          </div>

          <div className="grid gap-6 border-t border-bone/15 pt-8 sm:grid-cols-2">
            <div>
              <p className="eyebrow-plain text-bone/48">The Address</p>
              <address className="mt-3 not-italic text-base leading-7 text-bone/85" itemScope itemType="https://schema.org/PostalAddress">
                <span itemProp="streetAddress">{PROPERTY.street}</span>
                <br />
                <span itemProp="addressLocality">{PROPERTY.city}</span>,{" "}
                <span itemProp="addressRegion">{PROPERTY.region}</span>{" "}
                <span itemProp="postalCode">{PROPERTY.postalCode}</span>
              </address>
            </div>
            <div>
              <p className="eyebrow-plain text-bone/48">Quick Facts</p>
              <p className="mt-3 text-base leading-7 text-bone/85">
                {PROPERTY.propertyType} · {PROPERTY.bedrooms} BR / {PROPERTY.bathrooms} BA
                <br />
                MLS {PROPERTY.mls}
              </p>
            </div>
          </div>
        </div>

        <form
          action={`mailto:?subject=${subject}`}
          className="flex flex-col gap-5 rounded-sm border border-bone/12 bg-bone/[0.06] p-7 backdrop-blur-2xl md:p-9"
        >
          <h3 className="font-display text-2xl font-light tracking-[-0.025em] text-bone">Request the package</h3>
          <label className="flex flex-col gap-2 text-[0.62rem] font-medium uppercase tracking-widest3 text-bone/55">
            Name
            <input
              name="name"
              className="rounded-sm border border-bone/15 bg-transparent px-4 py-3.5 text-base font-normal text-bone outline-none transition placeholder:text-bone/35 focus:border-bone"
              placeholder="Your name"
            />
          </label>
          <label className="flex flex-col gap-2 text-[0.62rem] font-medium uppercase tracking-widest3 text-bone/55">
            Email
            <input
              name="email"
              type="email"
              className="rounded-sm border border-bone/15 bg-transparent px-4 py-3.5 text-base font-normal text-bone outline-none transition placeholder:text-bone/35 focus:border-bone"
              placeholder="you@email.com"
            />
          </label>
          <label className="flex flex-col gap-2 text-[0.62rem] font-medium uppercase tracking-widest3 text-bone/55">
            Message
            <textarea
              name="body"
              rows={5}
              defaultValue="Please send the 437 Heliotrope package."
              className="rounded-sm border border-bone/15 bg-transparent px-4 py-3.5 text-base font-normal text-bone outline-none transition placeholder:text-bone/35 focus:border-bone"
            />
          </label>
          <button className="btn-primary mt-2 self-start !bg-bone !text-ink hover:!bg-ember hover:!text-bone" type="submit">
            Open Email
          </button>
        </form>
      </div>
    </section>
  );
}
