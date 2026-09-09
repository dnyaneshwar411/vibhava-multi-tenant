import { ENV } from "@/config/envVars";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export const resolveOrigin = function (headersList: ReadonlyHeaders) {
  return headersList.get("origin") ||
    headersList.get("referer") ||
    headersList.get("x-forwarded-host") ||
    ""
}

export const resolveSubdomain = function (subdomain: string): string {
  if (!subdomain?.trim()) return ENV.PUBLIC_BASE_URL!;

  try {
    const url = new URL(process.env.NEXT_PUBLIC_BASE_URL!);
    const cleanSubdomain = subdomain.trim().toLowerCase();

    if (url.hostname.startsWith(`${cleanSubdomain}.`)) {
      return url.toString();
    }

    url.hostname = `${cleanSubdomain}.${url.hostname}`;
    return url.toString();
  } catch (error) {
    return ENV.PUBLIC_BASE_URL!;
  }
}

export const resolveTenant = function (headersList: ReadonlyHeaders): string {
  const host =
    headersList.get("x-forwarded-host") ||
    headersList.get("host") ||
    "";

  if (!host) return "";

  const hostWithoutPort = host.split(":")[0];
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost";

  if (hostWithoutPort.endsWith(`.${rootDomain}`)) {
    return hostWithoutPort.replace(`.${rootDomain}`, "");
  }

  const parts = hostWithoutPort.split(".");
  if (parts.length > 2 || (hostWithoutPort.includes("localhost") && parts.length > 1)) {
    return parts[0];
  }

  return "";
};