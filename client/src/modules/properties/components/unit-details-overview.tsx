import { Building, User } from "lucide-react";
import Image from "next/image";

export default function UnitOverviewDetails({ unit }: {
  unit: any
}) {
  return (
    <div className="relative w-full">
      <div className="h-48 sm:h-64 w-full bg-muted overflow-hidden">
        <Image
          src={unit.media?.coverImage}
          alt="Cover"
          height={400}
          width={400}
          onError={e => (e.target as HTMLImageElement).src = "/placeholder.avif"}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-6 pb-6 pt-0 border-b relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between -mt-12 sm:-mt-16 mb-4 gap-4">
          <div className="flex items-end gap-4">
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-md overflow-hidden bg-background ring-4 ring-background border">
              <Image
                src={unit.media?.primaryImage}
                alt="Primary Image"
                height={400}
                width={400}
                onError={e => (e.target as HTMLImageElement).src = "/placeholder.avif"}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1 mb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">
                  {unit.unitNumber}
                </h1>
                <StatusDot status={unit.status} />
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Building className="h-3.5 w-3.5" />
                {unit.property.name} • Floor {unit.floor}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t text-xs">
          <div>
            <span className="text-muted-foreground block mb-0.5">Unit Layout</span>
            <span className="font-medium">{unit.unitType}</span>
          </div>
          <div>
            <span className="text-muted-foreground block mb-0.5">Created By</span>
            <span className="font-medium flex items-center gap-1">
              <User className="h-3 w-3 text-muted-foreground" />
              {unit.createdBy.name}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground block mb-0.5">Property Type</span>
            <span className="font-medium">{unit.property.propertyType}</span>
          </div>
          <div>
            <span className="text-muted-foreground block mb-0.5">Amenities</span>
            <div className="flex flex-wrap gap-1">
              {unit.amenities.length > 0 ? (
                unit.amenities.map((item: any, idx: number) => (
                  <span key={idx} className="bg-muted px-1.5 py-0.5 text-[10px]">
                    {item}
                  </span>
                ))
              ) : (
                <span className="text-muted-foreground/50">—</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusDot({ status }: { status: string }) {
  switch (status) {
    case "Occupied":
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Occupied
        </span>
      );
    case "Vacant":
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-zinc-400" />
          Vacant
        </span>
      );
    case "Under Maintenance":
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-600 dark:text-amber-500">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          Maintenance
        </span>
      );
    default:
      return null;
  }
}