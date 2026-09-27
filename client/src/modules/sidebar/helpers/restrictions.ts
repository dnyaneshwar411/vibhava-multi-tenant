import { sidebarData } from "../config/organization";

export const resolveSessionScopes = function (
  scopes: Record<string, boolean> = {},
  actor: "Tenant" | "Vendor" | "User"
) {
  // Helper to filter individual nodes recursively
  const filterItem = (item: any) => {
    // 1. Check if the actor matches (if an actor array is defined)
    const matchesActor = !item.actor || (Array.isArray(item.actor) && item.actor.includes(actor));

    // 2. Check if scopes match
    const matchesScopes =
      !item.scopes ||
      item.scopes.length === 0 ||
      item.scopes.some((scope: string) => scopes[scope] === true);

    // If it fails either check, exclude it
    if (!matchesActor || !matchesScopes) {
      return null;
    }

    // 3. Handle nested children recursively (e.g., Reports -> Profit & Loss)
    if (Array.isArray(item.children)) {
      const filteredChildren = item.children
        .map((child: any) => filterItem(child))
        .filter(Boolean);

      // If a nested resource group has no visible children left, hide it
      if (filteredChildren.length === 0 && item.type === "RESOURCE-NESTED") {
        return null;
      }

      return {
        ...item,
        children: filteredChildren,
      };
    }

    return item;
  };

  return sidebarData
    .map(section => {
      if (Array.isArray(section.children)) {
        const children = section.children
          .map(item => filterItem(item))
          .filter(Boolean); // Remove nulls
        return {
          ...section,
          children,
        };
      }
      return section;
    })
    .filter(section => {
      return section.children && section.children.length > 0;
    });
};