import { ADDRESS } from "../data/property";

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
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,26,36,.86),rgba(14,26,36,.34)_48%,rgba(14,26,36,.1)),linear-gradient(0deg,rgba(14,26,36,.82),transparent_48%)]" />
      <nav className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-5 py-5 md:px-10">
        <a href="#" className="font-mono text-xs uppercase tracking-wider2">
          437 Heliotrope · 92625
        </a>
        <div className="hidden gap-6 font-mono text-[0.68rem] uppercase tracking-wider2 text-bone/80 md:flex">
          <a href="#vision">Vision</a>
          <a href="#interiors">Interiors</a>
          <a href="#gallery">Gallery</a>
          <a href="#map">Map</a>
          <a href="#inquiry">Inquiry</a>
        </div>
      </nav>
      <div className="relative z-10 flex min-h-[100svh] items-end px-5 pb-20 md:px-10 lg:px-16">
        <div className="max-w-5xl">
          <span className="eyebrow !text-bone/75">{ADDRESS}</span>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(4rem,10vw,9rem)] leading-[0.88] tracking-[-0.07em]">
            Village energy.
            <br />
            Ocean air.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-bone/82 md:text-2xl md:leading-9">
            A two-residence Corona del Mar property with cinematic redesign potential, immediate village proximity,
            and the everyday ease of Heliotrope Avenue.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#vision" className="btn-primary !bg-bone !text-ink hover:!bg-copper hover:!text-bone">
              See the transformation
            </a>
            <a href="#inquiry" className="btn-ghost">
              Request the package
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 z-10 h-12 w-px -translate-x-1/2 bg-bone/30">
        <span className="block h-4 w-px animate-scroll-cue bg-bone" />
      </div>
    </section>
  );
}
