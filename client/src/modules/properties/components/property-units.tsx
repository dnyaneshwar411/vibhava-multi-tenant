"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ComponentLoader } from "@/components/ui/loader";
import useFetch from "@/hooks/useFetch";

type PropertyUnitsProps = {
  propertyId: string;
}

export default function PropertyUnits({ propertyId }: PropertyUnitsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAllUnits, setShowAllUnits] = useState(false);
  const { isLoading, data: unitsResponse } = useFetch(
    isOpen ? `/api/v1/property/${propertyId}/units` : "",
  );

  if (!isOpen) {
    return (
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        View Units
      </Button>
    );
  }

  if (isLoading) {
    return <ComponentLoader />;
  }

  const units = unitsResponse?.data || [];
  const displayedUnits = showAllUnits ? units : units.slice(0, 3);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Units</CardTitle>
        <div className="flex gap-2">
          {units.length > 3 && (
            <Button
              variant="ghost"
              onClick={() => setShowAllUnits(!showAllUnits)}
            >
              {showAllUnits ? "Show Less" : "View All"}
            </Button>
          )}
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {units.length === 0 ? (
          <p className="text-sm text-muted-foreground">No units found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedUnits.map((unit: any) => (
              <div
                key={unit._id}
                className="p-4 rounded-lg border bg-card text-card-foreground"
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
  );
}
