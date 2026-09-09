'use client';
import { useState } from 'react';
import { ArrowRight, Check, Mail, MapPin, MessageSquare, Phone } from 'lucide-react';
import Footer from '@/modules/landing/components/footer';
import Navbar from '@/modules/landing/components/navbar';
import PageTransition from '@/modules/landing/components/page-transitions';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#0A0F1A]">
      <Navbar />
      <PageTransition>
        <section className="relative overflow-hidden pt-40 pb-20 lg:pt-48 lg:pb-24">
          <div className="absolute inset-0 grid-bg pointer-events-none" />
          <div className="absolute top-1/4 left-1/2 h-[400px] w-[650px] -translate-x-1/2 ambient-gold pointer-events-none" />
          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <div className="inline-flex items-center gap-2 border border-gold/25 bg-gold/[0.04] px-3.5 py-1.5 rounded-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-soft" />
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-gold/80">
                Client relations
              </span>
            </div>
            <h1 className="mt-8 font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-8xl">
              Direct Channel.
            </h1>
            <p className="mx-auto mt-7 max-w-xl text-base font-light leading-relaxed tracking-tight text-white/45 sm:text-lg">
              Connect with our client relations or platform architecture teams.
            </p>
          </div>
        </section>

        <section className="border-t border-white/10 py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-5 lg:px-8">
            <div className="lg:col-span-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">Channels</span>
              <h2 className="mt-5 font-serif text-3xl font-semibold tracking-tight text-white">A considered reply starts here.</h2>
              <p className="mt-5 max-w-sm text-sm font-light leading-relaxed tracking-tight text-white/40">
                Tell us what you are building, operating, or protecting. We route every inquiry to the right specialist.
              </p>

              <div className="mt-10 space-y-6">
                <ContactChannel icon={Mail} label="General enquiries" value="hello@vibhava.estate" href="mailto:hello@vibhava.estate" />
                <ContactChannel icon={MessageSquare} label="Platform architecture" value="architecture@vibhava.estate" href="mailto:architecture@vibhava.estate" />
                <ContactChannel icon={Phone} label="Client relations" value="+1 (212) 555-0148" href="tel:+12125550148" />
                <ContactChannel icon={MapPin} label="Principal office" value="New York · London · Singapore" />
              </div>

              <div id="status" className="mt-10 inline-flex items-center gap-2 border border-gold/20 bg-gold/[0.03] px-3 py-2 rounded-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-soft" />
                <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-gold/70">Support Queue Active</span>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="border border-white/10 bg-white/[0.015] p-6 sm:p-8 lg:p-10">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/35">Secure enquiry</span>
                    <h2 className="mt-2 font-serif text-2xl font-semibold text-white">Start a conversation.</h2>
                  </div>
                  <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-gold/60">01 / 01</span>
                </div>

                {submitted ? (
                  <div className="flex min-h-[390px] flex-col items-center justify-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold">
                      <Check className="h-6 w-6 text-ink" />
                    </div>
                    <h3 className="mt-6 font-serif text-2xl font-semibold text-white">Message received.</h3>
                    <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-white/40">
                      A member of our team will respond within one business day.
                    </p>
                    <button onClick={() => setSubmitted(false)} className="mt-7 text-xs font-semibold uppercase tracking-[0.15em] text-gold hover:text-white transition-colors">
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Full name" name="name" placeholder="Your name" required />
                      <Field label="Work email" name="email" type="email" placeholder="you@estate.com" required />
                    </div>
                    <Field label="Portfolio size" name="portfolio" placeholder="e.g. 120 units across 6 properties" />
                    <div>
                      <label htmlFor="message" className="mb-2 block text-[10px] font-medium uppercase tracking-[0.16em] text-white/35">How can we help?</label>
                      <textarea id="message" name="message" required rows={5} placeholder="Tell us what you are looking to improve." className="w-full resize-none border border-white/10 bg-transparent px-4 py-3 text-sm font-light text-white outline-none placeholder:text-white/20 focus:border-gold/50 transition-colors" />
                    </div>
                    <button type="submit" className="group inline-flex w-full items-center justify-center gap-2 bg-gold px-6 py-3.5 text-sm font-semibold tracking-wide text-ink transition-all duration-300 hover:shadow-[0_0_35px_-6px_rgba(212,175,55,0.5)]">
                      Send enquiry
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                    <p className="text-center text-[10px] font-light tracking-tight text-white/25">Your information is handled under our privacy standards.</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </PageTransition>
      <Footer />
    </main>
  );
}

function ContactChannel({ icon: Icon, label, value, href }: { icon: typeof Mail; label: string; value: string; href?: string }) {
  const content = <><Icon className="h-4 w-4 text-gold/60" /><div><div className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/30">{label}</div><div className="mt-1 text-sm font-light tracking-tight text-white/65">{value}</div></div></>;
  return href ? <a href={href} className="flex items-start gap-3 group">{content}</a> : <div className="flex items-start gap-3">{content}</div>;
}

function Field({ label, name, placeholder, type = 'text', required = false }: { label: string; name: string; placeholder: string; type?: string; required?: boolean }) {
  return <div><label htmlFor={name} className="mb-2 block text-[10px] font-medium uppercase tracking-[0.16em] text-white/35">{label}</label><input id={name} name={name} type={type} required={required} placeholder={placeholder} className="w-full border border-white/10 bg-transparent px-4 py-3 text-sm font-light text-white outline-none placeholder:text-white/20 focus:border-gold/50 transition-colors" /></div>;
}
