"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { 
  Building2, 
  User, 
  Users, 
  FileText, 
  Calendar, 
  CreditCard, 
  ShieldCheck, 
  Clock, 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  Eye, 
  ArrowUpRight,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useFetch from "@/hooks/useFetch";
import { ComponentLoader } from "@/components/ui/loader";
import { ErrorState } from "@/components/ui/error";
import { toast } from "sonner";
import { buildToastMessage } from "@/lib/catchAsync";
import { DeleteLease } from "@/modules/lease/components/delete-lease";

const formatCurrency = (val: number) => 
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(val);

const formatDate = (dateStr: string) => {
  if (!dateStr) return "N/A";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
};

const formatFileSize = (bytes?: number) => {
  if (!bytes) return "0 KB";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
};

export default function LeaseDetailsPage() {
  const { leaseId } = useParams() as { leaseId: string };
  const { isLoading, data, error, mutate } = useFetch(`/api/v1/lease/${leaseId}`);

  const lease = data?.data;

  const remainingDays = useMemo(() => {
    if (!lease?.endDate) return null;
    const end = new Date(lease.endDate).getTime();
    const now = new Date().getTime();
    return Math.ceil((end - now) / (1000 * 3600 * 24));
  }, [lease?.endDate]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <ComponentLoader />
      </div>
    );
  }

  if (error || data?.code !== 200 || !lease) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <ErrorState
          title={data?.message || "Lease Sync Error"}
          description="Failed to load the lease details."
          reset={() => mutate()}
        />
      </div>
    );
  }

  const primaryTenantName = `${lease.primaryTenant?.firstName || ""} ${lease.primaryTenant?.lastName || ""}`.trim() || "N/A";
  const documentMeta = lease.leaseAgreementDocument?.meta;
  const documentUrl = lease.leaseAgreementDocument?.url;

  const handlePreview = async function (url: string, mimeType: string) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const pdfBlob = new Blob([blob], { type: mimeType});
      const blobUrl = URL.createObjectURL(pdfBlob);
      window.open(blobUrl, "_blank");
    } catch (error) {
      toast.error(buildToastMessage(error));
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <span>Properties</span>
            <span>/</span>
            <span className="font-medium text-foreground">{lease.property?.name}</span>
            <span>/</span>
            <span>{lease.unit?.unitNumber}</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">
              {lease.property?.name} - Unit {lease.unit?.unitNumber}
            </h1>
            <Badge 
              variant="outline" 
              className="rounded-full px-2.5 py-0.5 text-xs font-semibold bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400"
            >
              {lease.status}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {documentUrl && (
            <Button 
              variant="outline" 
              size="sm" 
              className="h-9 rounded-none text-xs gap-1.5"
              onClick={() => window.open(documentUrl, "_blank")}
            >
              <Download className="h-3.5 w-3.5" />
              Download Lease PDF
            </Button>
          )}

          {/* <Button size="sm" className="h-9 rounded-none text-xs gap-1.5">
            Renew Lease
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Button> */}
          <DeleteLease
            leaseId={data.data?._id}
            leaseLabel={data.data?.title}
          >
            <Button>Delete</Button>
          </DeleteLease>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-none border shadow-none bg-card">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Monthly Rent</p>
              <p className="text-2xl font-bold tracking-tight">{formatCurrency(lease.finance?.rentAmount || 0)}</p>
              <p className="text-[11px] text-muted-foreground">Due on day {lease.finance?.paymentDueDay} of month</p>
            </div>
            <div className="h-10 w-10 border flex items-center justify-center text-muted-foreground bg-muted/40">
              <CreditCard className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border shadow-none bg-card">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Security Deposit</p>
              <p className="text-2xl font-bold tracking-tight">{formatCurrency(lease.security?.amountRequired || 0)}</p>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-muted-foreground">Status:</span>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 rounded-none font-medium">
                  {lease.security?.status}
                </Badge>
              </div>
            </div>
            <div className="h-10 w-10 border flex items-center justify-center text-muted-foreground bg-muted/40">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border shadow-none bg-card">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Lease Duration</p>
              <p className="text-sm font-semibold pt-1">
                {formatDate(lease.startDate)} &rarr; {formatDate(lease.endDate)}
              </p>
              {remainingDays !== null && (
                <div className="flex items-center gap-1 text-[11px] text-amber-600 font-medium pt-0.5">
                  <Clock className="h-3 w-3" />
                  <span>{remainingDays} days remaining</span>
                </div>
              )}
            </div>
            <div className="h-10 w-10 border flex items-center justify-center text-muted-foreground bg-muted/40">
              <Calendar className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border shadow-none bg-card">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Primary Tenant</p>
              <p className="text-sm font-bold truncate max-w-[130px]">{primaryTenantName}</p>
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 rounded-none">
                {lease.primaryTenant?.status}
              </Badge>
            </div>
            <Avatar className="h-10 w-10 rounded-none border">
              <AvatarFallback className="rounded-none bg-primary/5 font-semibold text-xs">
                {lease.primaryTenant?.firstName?.[0]}{lease.primaryTenant?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        <div className="lg:col-span-8 space-y-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 h-auto gap-6">
              <TabsTrigger 
                value="overview" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-2 pt-1 text-xs font-semibold"
              >
                Overview & Financials
              </TabsTrigger>
              <TabsTrigger 
                value="tenants" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-2 pt-1 text-xs font-semibold"
              >
                Tenants ({1 + (lease.coTenants?.length || 0)})
              </TabsTrigger>
              <TabsTrigger 
                value="property" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-2 pt-1 text-xs font-semibold"
              >
                Property & Unit Specs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="pt-4 space-y-6">
              <Card className="rounded-none border shadow-none">
                <CardHeader className="p-4 border-b">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    Rent & Financial Agreement
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-6">
                  <div>
                    <span className="text-xs text-muted-foreground uppercase font-medium block">Base Rent</span>
                    <span className="text-sm font-semibold text-foreground">{formatCurrency(lease.finance?.rentAmount || 0)}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase font-medium block">Billing Cycle</span>
                    <span className="text-sm font-semibold text-foreground">{lease.finance?.billingCycle}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase font-medium block">Due Day</span>
                    <span className="text-sm font-semibold text-foreground">{lease.finance?.paymentDueDay}th of the month</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase font-medium block">Lease Type</span>
                    <span className="text-sm font-semibold text-foreground">{lease.leaseType}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase font-medium block">Created Date</span>
                    <span className="text-sm font-semibold text-foreground">{formatDate(lease.createdAt)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-none border shadow-none">
                <CardHeader className="p-4 border-b">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                    Security Deposit Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-6">
                  <div>
                    <span className="text-xs text-muted-foreground uppercase font-medium block">Amount Required</span>
                    <span className="text-sm font-semibold text-foreground">{formatCurrency(lease.security?.amountRequired || 0)}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase font-medium block">Amount Paid</span>
                    <span className="text-sm font-semibold text-foreground">{formatCurrency(lease.security?.amountPaid || 0)}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase font-medium block">Deposit Status</span>
                    <Badge variant="outline" className="mt-0.5 text-[10px] rounded-none">
                      {lease.security?.status}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase font-medium block">Held In Account</span>
                    <span className="text-sm font-semibold text-foreground">{lease.security?.heldInAccount || "N/A"}</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tenants" className="pt-4 space-y-4">
              <Card className="rounded-none border shadow-none">
                <CardHeader className="p-4 border-b flex flex-row items-center justify-between space-y-0">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <CardTitle className="text-sm font-semibold">Primary Tenant</CardTitle>
                  </div>
                  <Badge className="rounded-none text-[10px]">Primary</Badge>
                </CardHeader>
                <CardContent className="p-4 flex items-start gap-4">
                  <Avatar className="h-12 w-12 rounded-none border">
                    <AvatarFallback className="rounded-none font-semibold">
                      {lease.primaryTenant?.firstName?.[0]}{lease.primaryTenant?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 text-xs">
                    <p className="text-sm font-bold">{primaryTenantName}</p>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-3.5 w-3.5" />
                      <span>{lease.primaryTenant?.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-3.5 w-3.5" />
                      <span>+{lease.primaryTenant?.countryCode} {lease.primaryTenant?.mobileNumber}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {lease.coTenants && lease.coTenants.length > 0 && (
                <Card className="rounded-none border shadow-none">
                  <CardHeader className="p-4 border-b">
                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      Co-Tenants ({lease.coTenants.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 divide-y">
                    {lease.coTenants.map((tenant: any, idx: number) => (
                      <div key={tenant._id || idx} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 rounded-none border">
                            <AvatarFallback className="rounded-none text-xs">
                              {tenant.firstName?.[0]}{tenant.lastName?.[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-xs">
                            <p className="font-semibold">{tenant.firstName} {tenant.lastName}</p>
                            <p className="text-muted-foreground text-[11px]">{tenant.email}</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-[10px] rounded-none">
                          +{tenant.countryCode} {tenant.mobileNumber}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="property" className="pt-4 space-y-4">
              <Card className="rounded-none border shadow-none">
                <CardHeader className="p-4 border-b">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    Property & Unit Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                  <div className="space-y-2">
                    <span className="font-semibold text-muted-foreground uppercase tracking-wider block text-[10px]">Property</span>
                    <p className="text-sm font-bold">{lease.property?.name}</p>
                    <div className="flex items-start gap-1.5 text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                      <span>
                        {lease.property?.address?.street1}, {lease.property?.address?.street2 && `${lease.property?.address?.street2}, `}
                        {lease.property?.address?.city}, {lease.property?.address?.state} - {lease.property?.address?.zipCode}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 border-t sm:border-t-0 sm:border-l sm:pl-6 pt-4 sm:pt-0">
                    <span className="font-semibold text-muted-foreground uppercase tracking-wider block text-[10px]">Unit</span>
                    <p className="text-sm font-bold">Unit {lease.unit?.unitNumber}</p>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>
                        <span className="text-muted-foreground block text-[11px]">Unit Type</span>
                        <span className="font-medium">{lease.unit?.unitType}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block text-[11px]">Occupancy Status</span>
                        <Badge variant="outline" className="text-[10px] rounded-none">
                          {lease.unit?.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-4 space-y-6">

          <Card className="rounded-none border shadow-none">
            <CardHeader className="p-4 border-b">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                Lease Agreement Document
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {documentUrl ? (
                <>
                  <div className="border p-3 flex items-center gap-3 bg-muted/20">
                    <div className="h-10 w-10 border bg-background flex items-center justify-center text-red-500 shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="truncate text-xs">
                      <p className="font-medium truncate" title={documentMeta?.name}>
                        {documentMeta?.name || "Lease_Agreement.pdf"}
                      </p>
                      <p className="text-[10px] text-muted-foreground uppercase">
                        {formatFileSize(documentMeta?.size)} &bull; {documentMeta?.mimeType?.split("/")[1] || "pdf"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs h-8 rounded-none gap-1"
                      onClick={() => handlePreview(documentUrl, data?.data?.leaseAgreementDocument?.meta?.mimeType)}
                    >
                      <Eye className="h-3.5 w-3.5" />
                      Preview
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs h-8 rounded-none gap-1"
                      onClick={() => window.open(documentUrl, "_blank")}
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </Button>
                  </div>
                </>
              ) : (
                <div className="p-6 border border-dashed text-center text-xs text-muted-foreground">
                  No document uploaded for this lease.
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-none border shadow-none">
            <CardHeader className="p-4 border-b">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                Created By
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex items-center gap-3">
              <Avatar className="h-9 w-9 rounded-none border">
                <AvatarFallback className="rounded-none text-xs bg-muted font-semibold">
                  {lease.createdBy?.name?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="text-xs space-y-0.5">
                <p className="font-semibold">{lease.createdBy?.name}</p>
                <p className="text-muted-foreground text-[11px]">Phone: {lease.createdBy?.mobileNumber}</p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}