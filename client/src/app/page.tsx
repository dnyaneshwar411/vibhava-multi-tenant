import { resolveTenant } from '@/lib/server';
import Loader from '@/modules/isr/components/loader';
import NotFound from '@/modules/isr/components/not-found';
import { fetchCompanyPage } from '@/modules/isr/helpers/company-pages';
import CTA from '@/modules/landing/components/cta';
import DashboardShowcase from '@/modules/landing/components/dashboard-preview';
import Footer from '@/modules/landing/components/footer';
import Hero from '@/modules/landing/components/hero';
import Metrics from '@/modules/landing/components/metrics';
import Navbar from '@/modules/landing/components/navbar';
import ValueProps from '@/modules/landing/components/value-props';
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
    <main className="relative min-h-screen bg-[#0A0F1A]">
      <Navbar />
      <Hero />
      <ValueProps />
      <DashboardShowcase />
      <Metrics />
      <CTA />
      <Footer />
    </main>
  )
}

async function OrganizationLanding({ subdomain }: {
  subdomain: string
}) {
  const landingPage = await fetchCompanyPage(subdomain, "landing")
  if (!landingPage.data) return <NotFound />
  return <main dangerouslySetInnerHTML={{ __html: landingPage.data }}></main>
}