import Footer from '@/modules/landing/components/footer';
import Navbar from '@/modules/landing/components/navbar';
import PageTransition from '@/modules/landing/components/page-transitions';
import { ArrowRight, LockKeyhole, Ruler, ShieldCheck, Sparkles } from 'lucide-react';

const values = [
  {
    icon: Ruler,
    number: '01',
    title: 'Precision',
    description:
      'Every ledger, work order, and yield is measured with the same discipline as the asset itself.',
  },
  {
    icon: Sparkles,
    number: '02',
    title: 'Stewardship',
    description:
      'We protect the long horizon: durable relationships, considered decisions, and compounding value.',
  },
  {
    icon: ShieldCheck,
    number: '03',
    title: 'Security',
    description:
      'Private by design. Every organization, unit, and financial record remains isolated and accountable.',
  },
];

const stats = [
  { value: '86+', label: 'Units governed' },
  { value: '100%', label: 'Organization isolation' },
  { value: '24/7', label: 'Operational visibility' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1A]">
      <Navbar />
      <PageTransition>
        <section className="relative overflow-hidden pt-40 pb-24 lg:pt-48 lg:pb-32">
          <div className="absolute inset-0 grid-bg pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 h-[420px] w-[700px] -translate-x-1/2 ambient-gold pointer-events-none" />
          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <div className="mx-auto inline-flex items-center gap-2 border border-gold/25 bg-gold/[0.04] px-3.5 py-1.5 rounded-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-soft" />
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-gold/80">
                Our philosophy
              </span>
            </div>
            <h1 className="mt-8 font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-8xl">
              The Science of
              <br />
              <span className="text-gold">Enduring Stewardship.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-base font-light leading-relaxed tracking-tight text-white/45 sm:text-lg">
              Vibhava pairs the quiet discipline of heritage stewardship with
              software precision — giving every property, tenant, and owner the
              attention it deserves.
            </p>
          </div>
        </section>

        <section id="values" className="relative border-t border-white/10 py-24 lg:py-32">
          <div className="absolute inset-0 grid-bg-fine pointer-events-none opacity-30" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-xl">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">
                Core values
              </span>
              <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                Built for the long view.
              </h2>
            </div>
            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {values.map((value) => (
                <article
                  key={value.title}
                  className="group relative border border-white/10 bg-white/[0.015] p-7 transition-all duration-500 hover:border-gold/30 hover:bg-white/[0.03] gold-glow-hover"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center border border-gold/20 bg-gold/[0.04] rounded-sm">
                      <value.icon className="h-5 w-5 text-gold/70" />
                    </div>
                    <span className="font-serif text-sm text-white/25">{value.number}</span>
                  </div>
                  <h3 className="mt-10 font-serif text-2xl font-semibold text-white">{value.title}</h3>
                  <p className="mt-4 text-sm font-light leading-relaxed tracking-tight text-white/40">
                    {value.description}
                  </p>
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-gold to-transparent transition-all duration-700 group-hover:w-full" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:gap-24 lg:px-8">
            <div>
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">
                Origin &amp; intent
              </span>
              <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                Technology in service of trust.
              </h2>
              <div className="mt-7 space-y-5 text-sm font-light leading-relaxed tracking-tight text-white/45 sm:text-base">
                <p>
                  Vibhava began with a simple observation: the best property
                  operators were still managing enduring assets through
                  disconnected spreadsheets, inboxes, and delayed reports.
                </p>
                <p>
                  We built a private operating layer for estates that deserve
                  more than a generic dashboard. One system brings financial
                  truth, maintenance momentum, and owner confidence into the
                  same considered view.
                </p>
                <p>
                  The result is not more noise. It is the calm that comes from
                  knowing every important detail is current, protected, and
                  ready for the next decision.
                </p>
              </div>
              <a href="/contact" className="group mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                Speak with our team
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            <div className="relative border border-white/10 bg-white/[0.015] p-7 sm:p-9">
              <div className="absolute right-0 top-0 h-px w-32 bg-gradient-to-l from-gold to-transparent" />
              <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-gold/70">
                <LockKeyhole className="h-3.5 w-3.5" />
                Stewardship by the numbers
              </div>
              <div className="mt-10 divide-y divide-white/10">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-end justify-between py-6 first:pt-0 last:pb-0">
                    <span className="text-sm font-light tracking-tight text-white/40">{stat.label}</span>
                    <span className="font-serif text-4xl font-semibold tracking-tight text-white">{stat.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 border-t border-white/10 pt-6">
                <p className="text-xs font-light leading-relaxed text-white/30">
                  Every measure reflects our operating standard: clear records,
                  deliberate action, and no compromise on privacy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </PageTransition>
      <Footer />
    </main>
  );
}
