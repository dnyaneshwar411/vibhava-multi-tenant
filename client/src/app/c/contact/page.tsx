import { resolveTenant } from "@/lib/server";
import Loader from "@/modules/isr/components/loader";
import NotFound from "@/modules/isr/components/not-found";
import { fetchCompanyPage } from "@/modules/isr/helpers/company-pages";
import { headers } from "next/headers";
import { Suspense } from "react";

export default function Page() {
  return <Suspense fallback={<Loader />}>
    <Container />
  </Suspense>
}

async function Container() {
  const headersList = await headers()
  const origin = resolveTenant(headersList)
  const aboutPage = await fetchCompanyPage(origin, "contact")
  if (!aboutPage.data) return <NotFound />
  return <main dangerouslySetInnerHTML={{ __html: aboutPage.data }}></main>
}