export function Aerial() {
  return (
    <section className="relative isolate min-h-[80svh] overflow-hidden bg-ink text-bone">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-65"
        src="/video/aerial-1080.mp4"
        poster="/img/posters/aerial.jpg"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,17,14,.45)_0%,rgba(19,17,14,.0)_30%,rgba(19,17,14,.65)_85%,rgba(19,17,14,.95)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(168,90,47,.18),transparent_55%)]" />

      <div className="relative z-10 flex min-h-[80svh] flex-col justify-end px-6 pb-16 pt-24 md:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-[1280px]">
          <span className="eyebrow !text-bone/72">07 — Aerial Context</span>
          <h2 className="mt-6 max-w-5xl font-display text-[clamp(2.6rem,7vw,6.4rem)] font-light leading-[0.96] tracking-[-0.035em] text-bone">
            CdM Village below.
            <br />
            Newport Harbor <span className="italic">minutes</span> away.
          </h2>

          <div className="mt-10 grid max-w-5xl gap-px overflow-hidden rounded-sm border border-bone/12 bg-bone/12 backdrop-blur-xl md:grid-cols-3">
            {[
              { label: "From the door", value: "1 block", sub: "to East Coast Highway" },
              { label: "By foot", value: "5 min", sub: "to the village shoreline" },
              { label: "By car", value: "8 min", sub: "to Newport Harbor" },
            ].map((item) => (
              <div key={item.label} className="bg-ink/55 p-7 backdrop-blur-xl">
                <p className="text-[0.6rem] font-medium uppercase tracking-widest3 text-bone/58">{item.label}</p>
                <p className="mt-3 font-display text-4xl font-light tracking-[-0.03em] text-bone">{item.value}</p>
                <p className="mt-2 text-sm text-bone/65">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
