export function Aerial() {
  return (
    <section className="relative min-h-[78vh] overflow-hidden bg-ink text-bone">
      <video className="absolute inset-0 h-full w-full object-cover opacity-70" src="/video/aerial-1080.mp4" poster="/img/posters/aerial.jpg" autoPlay muted loop playsInline />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(14,26,36,.72)_100%),linear-gradient(0deg,rgba(14,26,36,.9),rgba(14,26,36,.12))]" />
      <div className="relative z-10 flex min-h-[78vh] items-end px-5 py-16 md:px-10 lg:px-16">
        <div className="max-w-5xl">
          <span className="eyebrow !text-bone/65">Aerial Context</span>
          <h2 className="mt-5 max-w-4xl font-display text-5xl leading-[0.95] tracking-[-0.055em] md:text-8xl">
            CdM Village below. Newport Harbor minutes away.
          </h2>
          <div className="mt-8 grid max-w-4xl gap-3 md:grid-cols-3">
            {["One block to East Coast Highway", "Coves and beaches in every direction", "A duplex program with daily flexibility"].map((item) => (
              <div key={item} className="rounded-3xl border border-bone/15 bg-bone/10 p-5 backdrop-blur-xl">
                <p className="font-mono text-xs uppercase tracking-wider2 text-bone/70">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
