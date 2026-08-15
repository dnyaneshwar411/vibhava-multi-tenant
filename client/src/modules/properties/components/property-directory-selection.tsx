import SelectFromDirectory from "@/components/common/select-from-directory"
import useFetch from "@/hooks/useFetch";
import { useState } from "react"

export default function PropertyDirectorySelection({ value, onValueChange }: {
  value: string
  onValueChange: any
}) {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    query: ""
  })
  const { isLoading, isValidating, error, data } = useFetch("/api/v1/directory/property", pagination)

  const properties = data?.data?.map((property: any) => ({
    id: property._id,
    label: property.name,
    value: property._id
  }))
  const [selectedItem, setSelectedItem] = useState(() => {
    if (value) {
      return properties?.find((item: any) => item.id === value)
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
        setSelectedItem(properties.find((item: any) => item.id == val))
      }}
      isLoading={isLoading || isValidating}
      error={error}
      data={properties || []}
      pagination={{
        ...pagination,
        total: data?.pagination?.total || 10
      }}
      setPagination={setPagination as any}
      placeholder="Choose Property..."
    />
  )
}