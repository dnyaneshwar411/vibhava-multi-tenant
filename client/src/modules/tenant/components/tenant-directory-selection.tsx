import SelectFromDirectory from "@/components/common/select-from-directory"
import useFetch from "@/hooks/useFetch";
import { useState } from "react"

export default function TenantDirectorySelection({ value, onValueChange }: {
  value: string
  onValueChange: any
}) {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    query: ""
  })
  const { isLoading, isValidating, error, data } = useFetch("/api/v1/directory/tenant", pagination)

  const tenants = data?.data?.map((tenant: any) => ({
    id: tenant._id,
    label: tenant.name,
    value: tenant._id
  }))
  const [selectedItem, setSelectedItem] = useState(() => {
    if (value) {
      return tenants?.find((item: any) => item.id === value)
    }
    return {
      id: 1,
      label: "",
      value: "",
    }
  })

  return (
    <SelectFromDirectory
      selectedItem={selectedItem}
      onValueChange={(val) => {
        onValueChange(val)
        setSelectedItem(tenants.find((item: any) => item.id == val))
      }}
      isLoading={isLoading || isValidating}
      error={error}
      data={tenants || []}
      pagination={{
        ...pagination,
        total: data?.pagination?.total || 10
      }}
      setPagination={setPagination as any}
      placeholder="Choose Tenant..."
    />
  )
}