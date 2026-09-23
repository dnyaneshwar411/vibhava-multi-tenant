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
        {/* <Integrations /> */}
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

import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const subdomain = resolveTenant(headersList);

  // Tenant subdomain → let the tenant page own its metadata
  if (subdomain) {
    return {
      title: 'Vibhava',
      // or return {} to fall through to parent metadata
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://vibhava.estate';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: 'Vibhava — Precision Property Stewardship',
      template: '%s · Vibhava',
    },
    description:
      'The multi-tenant platform for modern property operations. Isolated workspaces, subdomain routing, RBAC, and custom branding out of the box.',
    applicationName: 'Vibhava',
    keywords: [
      'multi-tenant SaaS',
      'property management platform',
      'estate management software',
      'tenant isolation',
      'subdomain routing',
      'RBAC',
    ],
    authors: [{ name: 'Vibhava Systems, Inc.' }],
    creator: 'Vibhava Systems, Inc.',
    publisher: 'Vibhava Systems, Inc.',

    alternates: {
      canonical: '/',
    },

    openGraph: {
      type: 'website',
      url: baseUrl,
      siteName: 'Vibhava',
      title: 'Vibhava — Precision Property Stewardship',
      description:
        'Run every tenant, property, and payout from one workspace. Multi-tenant infrastructure for modern property operations.',
      images: [
        {
          url: '/og/company.png',
          width: 1200,
          height: 630,
          alt: 'Vibhava — multi-tenant property operations',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: 'Vibhava — Precision Property Stewardship',
      description:
        'Multi-tenant infrastructure for modern property operations.',
      images: ['/og/company.png'],
      creator: '@vibhava',
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },

    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
  };
}