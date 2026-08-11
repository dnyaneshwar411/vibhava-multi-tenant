"use client"

import { ErrorState } from "@/components/ui/error"
import { ComponentLoader } from "@/components/ui/loader"
import useFetch from "@/hooks/useFetch"
import { copyText } from "@/lib/helpers"

export default function Page() {
  const { isLoading, data, error, mutate } = useFetch("/api/v1/maintenance/tickets")

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <ComponentLoader />
      </div>
    )
  }

  if (error || data?.code !== 200) {
    return (
      <div className="flex items-center justify-center">
        <ErrorState
          title={data?.message || "Dashboard Sync Error"}
          description="The database cluster returned an invalid schema or network failure."
          reset={() => mutate()}
        />
      </div>
    )
  }

  return (
    <div>
      <button onClick={copyText(data)}>
        Copy
      </button>
    </div>
  )
}

// {"code":200,"data":[],"pagination":{"pageNumber":1,"limitNumber":10,"skip":0,"total":0}}