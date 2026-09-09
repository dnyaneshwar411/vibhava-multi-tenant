import { protocol } from "@/config/constants";
import { ensureProtocol } from "@/lib/helpers";
import { cacheTag } from "next/cache";

export const fetchCompanyPage = async function (subdomain: string, type: string) {
  "use cache"
  cacheTag(`tenant:${subdomain}:page:${type}`)
  try {
    const origin = ensureProtocol(protocol, subdomain)
    const endpoint = process.env.NEXT_PUBLIC_BASE_URL + `/api/v1/organization/pages/html/${type}`
    const response = await fetch(endpoint, {
      headers: { origin },
    })
    const data = await response.json();
    return {
      success: true,
      data: data.data as string
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message
    }
  }
}