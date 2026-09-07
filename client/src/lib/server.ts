import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export const resolveOrigin = function (headersList: ReadonlyHeaders) {
  return headersList.get("origin") ||
    headersList.get("referer") ||
    headersList.get("x-forwarded-host") ||
    ""
}