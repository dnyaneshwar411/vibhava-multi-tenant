import { sidebarData } from "../config/organization"

export const resolveSessionScopes = function (scopes: Record<string, boolean>) {
  return sidebarData
    .map(item => {
      if (Array.isArray(item.children)) {
        const children = item.children?.filter(item => 
          item.scopes?.some(scope => scopes[scope] === true) ||
          item.scopes?.length === 0 ||
          !item.scopes
        );
        return {
          ...item,
          children
        }
      }
      return item
    })
    .filter(item => {
      return item.children && item.children.length > 0
    })
}