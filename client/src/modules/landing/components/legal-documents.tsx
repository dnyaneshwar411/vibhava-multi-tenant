import Footer from "./footer";
import Navbar from "./navbar";
import PageTransition from "./page-transitions";

type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export default function LegalDocument({
  title,
  eyebrow,
  updated,
  intro,
  sections,
}: {
  title: string;
  eyebrow: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <main className="min-h-screen bg-[#0A0F1A]">
      <Navbar />
      <PageTransition>
        <header className="relative overflow-hidden pt-40 pb-20 lg:pt-48 lg:pb-24">
          <div className="absolute inset-0 grid-bg pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 h-[350px] w-[600px] -translate-x-1/2 ambient-gold pointer-events-none" />
          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <span className="inline-flex border border-gold/25 bg-gold/[0.04] px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-gold/80 rounded-sm">{eyebrow}</span>
            <h1 className="mt-8 font-serif text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">{title}</h1>
            <div className="mt-7 flex flex-col items-center gap-3 text-xs font-light tracking-tight text-white/35 sm:flex-row sm:justify-center">
              <span>Last updated {updated}</span><span className="hidden h-1 w-1 rounded-full bg-gold/60 sm:block" /><span>Vibhava Estate Systems</span>
            </div>
          </div>
        </header>

        <section className="border-t border-white/10 py-16 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[220px_1fr] lg:gap-24 lg:px-8">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/30">On this page</span>
              <nav className="mt-5 space-y-3 border-l border-white/10 pl-4">
                {sections.map((section) => <a key={section.id} href={`#${section.id}`} className="block text-xs font-light leading-relaxed tracking-tight text-white/40 transition-colors hover:text-gold">{section.title}</a>)}
              </nav>
            </aside>

            <article className="max-w-3xl text-sm font-light leading-[1.9] tracking-tight text-white/50">
              <p className="border-l border-gold/50 pl-5 text-base leading-relaxed text-white/65">{intro}</p>
              <div className="mt-14 space-y-14">
                {sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-28">
                    <h2 className="font-serif text-2xl font-semibold tracking-tight text-white sm:text-3xl">{section.title}</h2>
                    <div className="mt-5 space-y-4">
                      {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                      {section.bullets && <ul className="space-y-3 border border-white/10 bg-white/[0.015] p-5 sm:p-6">{section.bullets.map((bullet) => <li key={bullet} className="flex gap-3"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold/70" /><span>{bullet}</span></li>)}</ul>}
                    </div>
                  </section>
                ))}
              </div>
            </article>
          </div>
        </section>
      </PageTransition>
      <Footer />
    </main>
  );
}
