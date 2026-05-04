export function Footer() {
  return (
    <footer className="border-t border-bone/10 bg-ink py-10 text-bone/55">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-6 text-[0.62rem] font-medium uppercase tracking-widest3 md:flex-row md:items-center md:justify-between md:px-10">
        <span>437 Heliotrope · Corona del Mar · 92625</span>
        <span className="text-bone/40">A property showcase · {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
