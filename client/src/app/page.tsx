import { resolveTenant } from '@/lib/server';
import Loader from '@/modules/isr/components/loader';
import NotFound from '@/modules/isr/components/not-found';
import { fetchCompanyPage } from '@/modules/isr/helpers/company-pages';
import Announcement from '@/modules/landing/components/announcement';
import BottomCta from '@/modules/landing/components/bottom-cta';
import Comparison from '@/modules/landing/components/comparison';
import CTA from '@/modules/landing/components/cta';
import DashboardShowcase from '@/modules/landing/components/dashboard-preview';
import FAQ from '@/modules/landing/components/faq';
import Features from '@/modules/landing/components/features';
import Footer from '@/modules/landing/components/footer';
import Hero from '@/modules/landing/components/hero';
import HowItWorks from '@/modules/landing/components/how-it-works';
import Integrations from '@/modules/landing/components/integrations';
import LogoBar from '@/modules/landing/components/logo-bar';
import Metrics from '@/modules/landing/components/metrics';
import Navbar from '@/modules/landing/components/navbar';
import OnboardingForm from '@/modules/landing/components/onboarding-form';
import Pricing from '@/modules/landing/components/pricing';
import StatsStrip from '@/modules/landing/components/stats-strip';
import Testimonials from '@/modules/landing/components/testimonals';
import ValueProps from '@/modules/landing/components/value-props';
import { ThemeProvider } from '@/providers/theme-provider';
import { headers } from 'next/headers';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <LandingResolver />
    </Suspense>
  );
}

async function LandingResolver() {
  const headersList = await headers();
  const subdomain = resolveTenant(headersList)

  if (subdomain) {
    return (
      <OrganizationLanding subdomain={subdomain} />
    )
  }

  return (
    <CompanyLanding />
  )
}

function CompanyLanding() {
  return (
    <ThemeProvider>
      <main className="relative min-h-screen vhx-bg! vhx-ink! antialiased">
        <Announcement />
        <Navbar />
        <Hero />
        <StatsStrip />
        <LogoBar />
        <Features />
        <HowItWorks />
        <Pricing />
        <Comparison />
        <Integrations />
        <Testimonials />
        <FAQ />
        <OnboardingForm />
        <BottomCta />
        <Footer />
      </main>
    </ThemeProvider>
  )
}

async function OrganizationLanding({ subdomain }: {
  subdomain: string
}) {
  const landingPage = await fetchCompanyPage(subdomain, "landing")
  if (!landingPage.data) return <NotFound />
  return <main dangerouslySetInnerHTML={{ __html: landingPage.data }}></main>
}