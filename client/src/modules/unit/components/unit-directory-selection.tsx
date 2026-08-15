import SelectFromDirectory from "@/components/common/select-from-directory"
import useFetch from "@/hooks/useFetch";
import { useState } from "react"

export default function UnitDirectorySelection({ value, onValueChange, property }: {
  value: string
  onValueChange: any
  property?:string
}) {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    query: "",
    property: property || ""
  })
  const { isLoading, isValidating, error, data } = useFetch("/api/v1/directory/unit", pagination)

  const units = data?.data?.map((unit: any) => ({
    id: unit._id,
    label: unit.unitNumber,
    value: unit._id
  }))
  const [selectedItem, setSelectedItem] = useState(() => {
    if (value) {
      return units?.find((item: any) => item.id === value)
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
        setSelectedItem(units.find((item: any) => item.id == val))
      }}
      isLoading={isLoading || isValidating}
      error={error}
      data={units || []}
      pagination={{
        ...pagination,
        total: data?.pagination?.total || 10
      }}
      setPagination={setPagination as any}
      placeholder="Choose Unit..."
    />
  )
}