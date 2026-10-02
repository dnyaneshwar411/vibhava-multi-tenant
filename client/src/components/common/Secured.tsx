import { useGlobalStore } from "@/providers/store-provider"

export default function Secured({
  children,
  permissions,
  fallback
}: {
  children: React.ReactNode
  permissions: string[]
  fallback?: React.ReactNode | null | undefined
}) {
  const { scopeMap } = useGlobalStore(state => state);
  const hasAccess = permissions.some(permission => scopeMap[permission]);
  return hasAccess
    ? children
    : fallback
}