"use client";
import { useParams } from "next/navigation";
import { ErrorState } from "@/components/ui/error";
import { ComponentLoader } from "@/components/ui/loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useFetch from "@/hooks/useFetch";
import UnitOverviewDetails from "@/modules/properties/components/unit-details-overview";
import UnitDetailsSpecifications from "@/modules/properties/components/unit-details-specifications";
import UnitDetailsFinance from "@/modules/properties/components/unit-details-finance";
import UnitDetailsTenants from "@/modules/properties/components/unit-details-tenant";
import UnitDetailsLeases from "@/modules/properties/components/unit-details-leases";
import { useTabsContentNavigation } from "@/hooks/useTabsContentNavigation";

type UnitDetails = {
  _id: string;
  unitNumber: string;
  floor: number;
  unitType: string;
  status: "Occupied" | "Vacant" | "Under Maintenance";
  amenities: string[];
  isDeleted: boolean;
  organization: string;
  property: {
    _id: string;
    name: string;
    propertyType: string;
    status: string;
    media: {
      primaryImage: { private: boolean; key: string };
    };
  };
  createdBy: {
    _id: string;
    name: string;
    mobileNumber: number;
    avatar: { private: boolean; key: string };
  };
  specifications: {
    squareFeet: number;
    bedrooms: number;
    bathrooms: number;
    halfBathrooms: number;
    balconies: number;
    maxOccupancy: number;
    furnishingStatus: string;
    flooringType: string;
    heatingType: string;
    coolingType: string;
    utilityMeters: {
      electricMeterNumber: string;
      waterMeterNumber: string;
      gasMeterNumber: string;
    };
    isPetFriendly: boolean;
    petPolicyDetails: string;
    isAdaAccessible: boolean;
    isSmokingAllowed: boolean;
    keyCodes: { smartLockId: string };
  };
  finance: {
    marketRent: number;
    currentRent: number;
    securityDeposit: number;
    currency: string;
  };
  media: {
    primaryImage: { key: string; private: boolean };
    coverImage: { key: string; private: boolean };
    gallery: string[];
  };
}

export default function Page() {
  const { unitId } = useParams();
  const { isLoading, data, error, mutate } = useFetch(
    `/api/v1/property/units/${unitId}`
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <ComponentLoader />
      </div>
    );
  }

  if (error || data?.code !== 200) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <ErrorState
          title={data?.message || "Dashboard Sync Error"}
          description="The database cluster returned an invalid schema or network failure."
          reset={() => mutate()}
        />
      </div>
    );
  }

  const unit: UnitDetails = data.data;

  return (
    <div className="w-full min-h-screen text-foreground">
      <UnitOverviewDetails unit={unit} />
      <div className="p-6">
        <Container unit={unit} />
      </div>
    </div>
  );
}

function Container({ unit }: { unit: UnitDetails }) {
  const { selectedTab, tabChange } = useTabsContentNavigation("specifications", [
    "specifications", "finance", "tenants", "leases"
  ]);
  const { unitId } = useParams();
  return (
    <Tabs value={selectedTab} onValueChange={tabChange} className="w-full space-y-6">
      <TabsList className="w-full justify-start h-10 p-0 bg-transparent border-b !sticky top-[var(--header-height)] backdrop-blur rounded-none space-x-6">
        <TabsTrigger
          value="specifications"
          className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-0 text-xs font-medium"
        >
          Specifications
        </TabsTrigger>
        <TabsTrigger
          value="finance"
          className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-0 text-xs font-medium"
        >
          Finance
        </TabsTrigger>
        <TabsTrigger
          value="tenants"
          className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-0 text-xs font-medium"
        >
          Tenants
        </TabsTrigger>
        <TabsTrigger
          value="leases"
          className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-0 text-xs font-medium"
        >
          Leases
        </TabsTrigger>
      </TabsList>
      <UnitDetailsSpecifications specifications={unit.specifications} />
      <UnitDetailsFinance finance={unit.finance} />

      <TabsContent value="tenants" className="m-0 focus-visible:outline-none">
        <UnitDetailsTenants unitId={unitId as string} />
      </TabsContent>

      <TabsContent value="leases" className="m-0 space-y-4 focus-visible:outline-none">
        <UnitDetailsLeases unitId={unitId} />
      </TabsContent>
    </Tabs>
  )
}