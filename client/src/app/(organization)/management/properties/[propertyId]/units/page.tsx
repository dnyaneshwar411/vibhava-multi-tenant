"use client";

import { useParams } from "next/navigation";
import { ErrorState } from "@/components/ui/error";
import { ComponentLoader } from "@/components/ui/loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

export default function Page() {
  const { propertyId } = useParams() as { propertyId: string };
  const { isLoading, data: unitsResponse, error, mutate } = useFetch(`/api/v1/property/${propertyId}/units`);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <ComponentLoader />
      </div>
    );

  if (error || unitsResponse?.code !== 200) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ErrorState
          title={unitsResponse?.message || "Units Sync Error"}
          description="Failed to load units for this property."
          reset={() => mutate()}
        />
      </div>
    );
  }

  const units = unitsResponse?.data || [];

  return (
    <div className="p-4 w-full space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Link href={`/properties/${propertyId}`}>
            <ArrowLeftIcon className="size-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Units</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Units</CardTitle>
        </CardHeader>
        <CardContent>
          {units.length === 0 ? (
            <p className="text-sm text-muted-foreground">No units found.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {units.map((unit: any) => (
                <div
                  key={unit._id}
                  className="p-4 rounded-lg border bg-card text-card-foreground hover:shadow-sm transition-shadow"
                >
                  <p className="font-semibold">{unit.unitNumber}</p>
                  <p className="text-sm text-muted-foreground">
                    {unit.unitType} • {unit.status}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
