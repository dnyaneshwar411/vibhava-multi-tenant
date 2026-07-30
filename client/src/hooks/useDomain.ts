import { useState, useEffect } from "react";
import { rootDomain } from "@/config/constants";

type UseDomainResult = {
  subdomain: string | null;
  isSubdomain: boolean;
}

const useDomain = function (): UseDomainResult {
  const [domainData, setDomainData] = useState<UseDomainResult>({
    isSubdomain: false,
    subdomain: null,
  });

  useEffect(() => {
    const { hostname, href } = window.location;
    const rootDomainFormatted = rootDomain.split(":")[0];

    if (href.includes("localhost") || href.includes("127.0.0.1")) {
      const fullUrlMatch = href.match(/http:\/\/([^.]+)\.localhost/);
      if (fullUrlMatch && fullUrlMatch[1]) {
        setDomainData({ isSubdomain: true, subdomain: fullUrlMatch[1] });
        return;
      }

      if (hostname.includes(".localhost")) {
        setDomainData({ isSubdomain: true, subdomain: hostname.split(".")[0] });
        return;
      }

      setDomainData({ isSubdomain: false, subdomain: null });
      return;
    }

    if (hostname.includes("---") && hostname.endsWith(".vercel.app")) {
      const parts = hostname.split("---");
      const subdomain = parts.length > 0 && parts[0] ? parts[0] : null;
      setDomainData({
        isSubdomain: typeof subdomain === "string",
        subdomain,
      });
      return;
    }

    const isSubdomain =
      hostname !== rootDomainFormatted &&
      hostname !== `www.${rootDomainFormatted}` &&
      hostname.endsWith(`.${rootDomainFormatted}`);

    const subdomain = isSubdomain
      ? hostname.replace(`.${rootDomainFormatted}`, "")
      : null;

    setDomainData({ isSubdomain, subdomain });
  }, []);

  return domainData;
};

export default useDomain;