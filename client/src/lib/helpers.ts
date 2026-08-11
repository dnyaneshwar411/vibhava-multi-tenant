export const copyText = (payload: string | object) => function () {
  const val: string = typeof payload === "string"
    ? payload
    : JSON.stringify(payload)
  navigator.clipboard.writeText(val);
}

export const buildUrlWithQueryParams = function (
  url: string,
  params: Record<string, string | number> = {},
) {
  const query = Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join("&");
  return url.includes("?") ? `${url}&${query}` : `${url}?${query}`;
};

export const ensureProtocol = function (protocol: "http" | "https", str: string) {
  return str.startsWith("http") ? str : `${protocol}://${str}`;
}

export const wordInitials = function (str: string, length: number = 2) {
  return str
    .split(" ")
    .slice(0, length)
    .map(item => item[0])
    .join("")
}

export const validHTTPURL = function (urlString: string): boolean {
  const httpUrlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/i;
  return httpUrlRegex.test(urlString);
}

export const buildObjectURL = function (file: File) {
  return URL.createObjectURL(file);
}