"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Building2,
  Calendar,
  CheckCircle2,
  Search,
  User,
} from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { useDebounce } from "@/hooks/useDebounce";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error";
import { ComponentLoader } from "@/components/ui/loader";
import AdvancedPagination from "@/components/common/advanced-pagination";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import CreatePropertyModal from "@/modules/properties/components/create-property-modal";
import { format } from "date-fns";

type Property = {
  _id: string;
  name: string;
  propertyType?: string;
  status?: string;
  address?: {
    street1?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  media?: {
    primaryImage?: string
  };
  finance?: {
    currency?: string;
  };
  amenities: string[]
  createdAt: string
  createdBy?: { name: string }
};

export default function Page() {
  const [pagination, setPagination] = useState({
    query: "",
    page: 1,
    limit: 10,
  });

  const debouncedQuery = useDebounce(pagination.query);

  const { isLoading, data, error, mutate } = useFetch("/api/v1/property", {
    query: debouncedQuery,
    page: pagination.page.toString(),
    limit: pagination.limit.toString(),
  });

  const properties: Property[] = useMemo(() => data?.data ?? [], [data]);
  const paginationData = data?.pagination;

  if (isLoading) {
    return (
      <div className="flex grow min-h-[60vh] items-center justify-center">
        <ComponentLoader />
      </div>
    );
  }

  if (error || data?.code !== 200) {
    return (
      <div className="flex grow min-h-[60vh] items-center justify-center">
        <ErrorState
          title={data?.message || "Properties Sync Error"}
          description="The backend returned an invalid response or the request failed."
          reset={() => mutate()}
        />
      </div>
    );
  }

  return (
    <div className="grow flex w-full flex-col gap-6 p-4 pb-0">
      <div className="flex flex-col gap-4 border-b pb-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">Properties</h1>
            <Badge variant="secondary" className="font-normal">
              {paginationData?.total ?? 0} total
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage property records, update details, and keep inventory organized.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search properties"
              value={pagination.query}
              onChange={(e) =>
                setPagination((prev) => ({
                  ...prev,
                  query: e.target.value,
                  page: 1,
                }))
              }
              className="pl-9"
            />
          </div>

          <CreatePropertyModal>
            <span className={buttonVariants({ variant: "default" })}>
              Create Property
            </span>
          </CreatePropertyModal>
        </div>
      </div>

      {properties.length === 0 ? (
        <div className="flex min-h-[55vh] items-center justify-center">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Building2 />
              </EmptyMedia>
              <EmptyTitle>No properties found</EmptyTitle>
              <EmptyDescription>
                Create a property to start managing buildings and units.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      ) : (
        <div className="mb-auto grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {properties.map(property => <PropertyCard
            key={property._id}
            property={property}
          />)}
        </div>
      )}
      <AdvancedPagination
        page={pagination.page}
        limit={pagination.limit}
        total={paginationData?.total ?? 0}
        onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
        onLimitChange={(limit) =>
          setPagination((prev) => ({ ...prev, limit, page: 1 }))
        }
      />
    </div>
  );
}

function PropertyCard({ property }: {
  property: Property
}) {
  const primaryImageUrl = property.media?.primaryImage

  const formattedDate = property.createdAt ? format(property.createdAt, "MMM dd, YYY") : "";

  return (
    <div
      className="group relative flex flex-col w-full overflow-hidden border border-zinc-800 bg-zinc-900/90 text-zinc-100 transition-all duration-300 hover:border-zinc-700 hover:shadow-xl hover:shadow-black/40"
    >
      <div className="relative h-48 w-full overflow-hidden bg-zinc-950">
        {primaryImageUrl ? (
          <Image
            src={property.media?.primaryImage || "/"}
            alt={property.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={e => (e.target as HTMLImageElement).src = "/placeholder.avif"}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-zinc-900 to-zinc-950 text-zinc-600">
            <Building2 strokeWidth={1} className="h-10 w-10 opacity-40" />
            <span className="text-xs font-medium uppercase tracking-wider">No Image Available</span>
          </div>
        )}

        <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-[4px] bg-zinc-950/80 px-2.5 py-1 text-xs font-medium text-zinc-300 backdrop-blur-md border border-zinc-800">
            {property.propertyType}
          </span>
          <span className={`inline-flex items-center gap-1.5 rounded-[4px] px-2.5 py-1 text-xs font-medium backdrop-blur-md border ${property.status === "Active"
              ? "bg-emerald-950/80 text-emerald-400 border-emerald-800/50"
              : "bg-amber-950/80 text-amber-400 border-amber-800/50"
            }`}>
            <span className={`h-1.5 w-1.5 rounded-full ${property.status === "Active" ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
            {property.status}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-4 gap-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-zinc-100 group-hover:text-white line-clamp-1">
            {property.name}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-xs text-zinc-400">
            <Calendar className="h-3.5 w-3.5 text-zinc-500" />
            <span>Created {formattedDate}</span>
          </div>
        </div>

        {property.amenities && property.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {property.amenities.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 rounded-[4px] bg-zinc-800/60 px-2 py-0.5 text-[11px] font-medium text-zinc-300 border border-zinc-700/50"
              >
                <CheckCircle2 className="h-3 w-3 text-zinc-400" />
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="inline-flex items-center bg-zinc-800/40 px-1.5 py-0.5 text-[11px] text-zinc-400">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between border-t border-zinc-800/80 pt-3 text-xs text-zinc-400">
          <div className="flex items-center gap-1.5 truncate">
            <User className="h-3.5 w-3.5 text-zinc-500 flex-shrink-0" />
            <span className="truncate font-mono text-[11px] text-zinc-500">
              {property.createdBy?.name || "NA"}
            </span>
          </div>
          <Link
            href={`/management/properties/${property._id}`}
            className="text-[11px] font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors"
          >
            View details &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};