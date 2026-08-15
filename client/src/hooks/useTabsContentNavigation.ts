import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useTabsContentNavigation(defaultTab: string, tabItems: string[]) {
  if (!defaultTab) throw new Error("defaultTab is required");
  const [selectedTab, setSelectedTab] = useState(defaultTab)

  const pathname = usePathname()
  const params = useSearchParams();
  const router = useRouter();

  function tabChange(value: string) {
    const newParams = new URLSearchParams(params.toString());
    newParams.set("tab", value);
    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  useEffect(function () {
    if (tabItems.includes(params.get("tab")!)) {
      setSelectedTab(params.get("tab") || defaultTab)
    }
  }, [params])

  return {
    selectedTab,
    tabChange
  }
}