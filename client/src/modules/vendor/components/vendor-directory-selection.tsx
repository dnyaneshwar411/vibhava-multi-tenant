import SelectFromDirectory from "@/components/common/select-from-directory"
import useFetch from "@/hooks/useFetch";
import { useState } from "react"

export default function VendorDirectorySelection({ value, onValueChange }: {
  value: string
  onValueChange: any
}) {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    query: ""
  })
  const { isLoading, isValidating, error, data } = useFetch("/api/v1/directory/vendor", pagination)

  const vendors = data?.data?.map((vendor: any) => ({
    id: vendor._id,
    label: vendor.name,
    value: vendor._id
  }))
  const [selectedItem, setSelectedItem] = useState(() => {
    if (value) {
      return vendors?.find((item: any) => item.id === value)
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
        setSelectedItem(vendors.find((item: any) => item.id == val))
      }}
      isLoading={isLoading || isValidating}
      error={error}
      data={vendors || []}
      pagination={{
        ...pagination,
        total: data?.pagination?.total || 10
      }}
      setPagination={setPagination as any}
      placeholder="Choose Vendor..."
    />
  )
}