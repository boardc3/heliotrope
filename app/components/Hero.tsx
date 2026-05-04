import { ADDRESS } from "../data/property";

const navLinks = [
  { href: "#interiors", label: "Interiors" },
  { href: "#gallery", label: "Gallery" },
  { href: "#map", label: "Neighborhood" },
  { href: "#inquiry", label: "Inquiry" },
];

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-ink text-bone">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/video/hero-1080.mp4"
        poster="/img/posters/hero.jpg"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,17,14,.62)_0%,rgba(19,17,14,.18)_38%,rgba(19,17,14,.32)_72%,rgba(19,17,14,.92)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(244,238,223,.08),transparent_55%)]" />

      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-6 px-6 py-6 md:px-10">
        <a href="#" className="flex items-center gap-3 text-bone/95">
          <span className="font-display text-xl tracking-tight">437</span>
          <span className="hidden h-[1px] w-8 bg-bone/40 md:block" />
          <span className="hidden text-[0.62rem] font-medium uppercase tracking-widest3 text-bone/70 md:block">
            Heliotrope · Corona del Mar
          </span>
        </a>
        <nav className="hidden gap-8 text-[0.62rem] font-medium uppercase tracking-widest3 text-bone/72 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative transition hover:text-bone after:absolute after:inset-x-0 after:-bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-bone/80 after:transition-transform hover:after:scale-x-100"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#inquiry"
          className="hidden rounded-full border border-bone/35 px-4 py-2 text-[0.6rem] font-medium uppercase tracking-widest3 text-bone/85 transition hover:border-bone hover:text-bone md:inline-flex"
        >
          Request package
        </a>
      </header>

      <div className="relative z-10 flex min-h-[100svh] items-end px-6 pb-24 pt-32 md:px-10 md:pb-28 lg:px-16">
        <div className="grid w-full grid-cols-1 items-end gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="max-w-5xl">
            <span className="eyebrow !text-bone/82">{ADDRESS}</span>
            <h1 className="mt-8 font-display text-[clamp(3.5rem,9.5vw,9.5rem)] font-light leading-[0.9] tracking-[-0.045em] text-bone">
              A village address,
              <br />
              <span className="italic font-light text-bone/95">one block</span>
              {" "}from the sea.
            </h1>
          </div>
          <div className="flex max-w-xl flex-col gap-7 lg:items-end lg:text-right">
            <p className="text-[1.05rem] leading-[1.65] text-bone/82 md:text-lg">
              437 Heliotrope is a two-residence Corona del Mar property positioned for refined coastal living, income
              flexibility, and the daily ease of village walkability.
            </p>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a href="#interiors" className="btn-primary !bg-bone !text-ink hover:!bg-ember hover:!text-bone">
                Step inside
              </a>
              <a href="#inquiry" className="btn-ghost">
                Request the package
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex items-center justify-between gap-6 px-6 text-[0.6rem] font-medium uppercase tracking-widest3 text-bone/52 md:px-10">
        <span>Corona del Mar · 92625</span>
        <span className="flex items-center gap-3">
          <span className="hidden md:inline">Scroll</span>
          <span className="block h-9 w-px bg-bone/30">
            <span className="block h-3 w-px animate-scroll-cue bg-bone" />
          </span>
        </span>
        <span className="text-right">MLS LG25048387</span>
      </div>
    </section>
  );
}
