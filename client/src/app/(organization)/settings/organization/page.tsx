"use client"

import { ErrorState } from "@/components/ui/error"
import { ComponentLoader } from "@/components/ui/loader"
import useFetch from "@/hooks/useFetch"
import { copyText } from "@/lib/helpers"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Image as ImageIcon, ExternalLink, Mail, Phone, User, Globe, Calendar, ShieldCheck } from "lucide-react"
import UpdateOrganization from "@/modules/organization/components/update-organization"
import { Organization } from "@/modules/organization/types"

function SettingsSection({
  title,
  description,
  children
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-10 border-b border-border/60 last:border-0">
      <div className="lg:col-span-4 space-y-1">
        <h2 className="text-sm font-semibold text-foreground tracking-tight">{title}</h2>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <div className="lg:col-span-8 space-y-4">
        {children}
      </div>
    </div>
  )
}

export default function OrganizationPage() {
  const { isLoading, data, error, mutate } = useFetch("/api/v1/organization")

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <ComponentLoader />
      </div>
    )
  }

  if (error || data?.code !== 200 || !data?.data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <ErrorState
          title={data?.message || "Dashboard Sync Error"}
          description="The database cluster returned an invalid schema or network failure."
          reset={() => mutate()}
        />
      </div>
    )
  }

  const org: Organization = data.data

  return (
    <div className="p-4">
      <div className="relative mb-12 rounded-md border overflow-hidden">
        <div className="h-40 w-full bg-muted relative">
          {org.branding?.banner && (
            <img src={org.branding.banner as string} alt="Banner" className="w-full h-full object-cover" />
          )}
        </div>
        <div className="px-6 pb-6 pt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 relative z-10">
          <div className="flex items-end gap-4">
            <div className="w-20 h-20 rounded-md border bg-background overflow-hidden shrink-0 shadow-none">
              {org.branding?.logo ? (
                <img src={org.branding.logo as string} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <ImageIcon className="w-6 h-6" />
                </div>
              )}
            </div>
            <div className="space-y-1 pb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold tracking-tight text-foreground">{org.name}</h1>
                <Badge variant={org.status === "Active" ? "default" : "secondary"} className="rounded-sm shadow-none font-normal text-xs">
                  {org.status}
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" />{org.subdomain}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{new Date(org.createdAt as string).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
            <UpdateOrganization organization={data.data} />
        </div>
      </div>

      <div className="space-y-2">
        <SettingsSection 
          title="General Information" 
          description="Basic identifiers and routing configurations for your organization workspace."
        >
          <Card className="shadow-none rounded-md overflow-hidden border">
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Organization Name</Label>
                  <Input readOnly value={org.name} className="shadow-none rounded-md h-9 text-xs" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Subdomain Slug</Label>
                  <Input readOnly value={org.subdomain} className="shadow-none rounded-md h-9 text-xs font-mono bg-muted/20" />
                </div>
              </div>
            </div>
          </Card>
        </SettingsSection>

        <SettingsSection 
          title="Workspace Owner" 
          description="Primary administrator profile linked with full management permissions."
        >
          <Card className="shadow-none rounded-md overflow-hidden border">
            <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md border bg-muted overflow-hidden shrink-0">
                  {org.owner?.avatar as string ? (
                    <img src={org.owner.avatar} alt={org.owner.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-medium text-foreground flex items-center gap-1.5">
                    {org.owner?.name}
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">{org.owner?.email}</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground font-mono bg-muted/30 px-2.5 py-1.5 rounded-sm border">
                +{org.owner?.mobileNumber}
              </div>
            </div>
          </Card>
        </SettingsSection>

        <SettingsSection 
          title="Communications" 
          description="Customer support routes and footer configuration for automated emails."
        >
          <Card className="shadow-none rounded-md overflow-hidden border">
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Support Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-muted-foreground" />
                    <Input readOnly value={org.branding?.supportEmail} className="shadow-none rounded-md h-9 text-xs pl-8" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Support Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-muted-foreground" />
                    <Input readOnly value={org.branding?.supportPhone} className="shadow-none rounded-md h-9 text-xs pl-8" />
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Email Footer Copyright Text</Label>
                <Input readOnly value={org.branding?.emailFooterText} className="shadow-none rounded-md h-9 text-xs bg-muted/20" />
              </div>
            </div>
          </Card>
        </SettingsSection>

        <SettingsSection 
          title="Visual Assets" 
          description="Core branding elements, vector identifiers, and color system variables."
        >
          <Card className="shadow-none rounded-md overflow-hidden border">
            <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Primary Logo</Label>
                <div className="h-24 rounded-md border bg-muted/30 flex items-center justify-center p-3">
                  {org.branding?.logo ? (
                    <img src={org.branding.logo as string} alt="Logo" className="max-h-full max-w-full object-contain" />
                  ) : (
                    <ImageIcon className="w-5 h-5 text-muted-foreground/40" />
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Dark Theme Logo</Label>
                <div className="h-24 rounded-md border bg-foreground flex items-center justify-center p-3">
                  {org.branding?.darkLogo ? (
                    <img src={org.branding.darkLogo as string} alt="Dark Logo" className="max-h-full max-w-full object-contain" />
                  ) : (
                    <ImageIcon className="w-5 h-5 text-muted-foreground/40" />
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Favicon Icon</Label>
                <div className="h-24 rounded-md border bg-muted/30 flex items-center justify-center p-3">
                  {org.branding?.favicon ? (
                    <img src={org.branding.favicon as string} alt="Favicon" className="w-8 h-8 object-contain" />
                  ) : (
                    <ImageIcon className="w-5 h-5 text-muted-foreground/40" />
                  )}
                </div>
              </div>
            </div>
          </Card>

          <Card className="shadow-none rounded-md overflow-hidden border">
            <div className="p-5 space-y-3">
              <Label className="text-xs text-muted-foreground">Theme Color Variables</Label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {org.branding?.colors && Object.entries(org.branding.colors).map(([key, hex]) => (
                  <div key={key} className="border rounded-md p-2.5 space-y-2 bg-background">
                    <div className="w-full h-6 rounded-sm border border-border" style={{ backgroundColor: hex as string }} />
                    <div>
                      <div className="text-[10px] text-muted-foreground capitalize">{key}</div>
                      <div className="text-xs font-mono font-medium">{hex as string}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </SettingsSection>

        <SettingsSection 
          title="Search Engine & Metadata" 
          description="Index configurations, canonical declarations, and social sharing properties."
        >
          <Card className="shadow-none rounded-md overflow-hidden border">
            <div className="p-5 space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Meta Title</Label>
                <Input readOnly value={org.meta?.title} className="shadow-none rounded-md h-9 text-xs" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Meta Description</Label>
                <Textarea readOnly value={org.meta?.description} className="shadow-none rounded-md text-xs resize-none" rows={2} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Canonical URL</Label>
                  <Input readOnly value={org.meta?.canonicalUrl} className="shadow-none rounded-md h-9 text-xs font-mono bg-muted/20" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Keyword Tags</Label>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {org.meta?.keywords?.map((keyword: string, idx: number) => (
                      <Badge key={idx} variant="secondary" className="rounded-sm font-normal text-[10px] shadow-none px-2 py-0.5">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-5 py-2.5 border-t bg-muted/20 text-xs text-muted-foreground flex items-center justify-between">
              <span>Robots Directive Indexing</span>
              <Badge variant={org.meta?.noIndex ? "destructive" : "secondary"} className="rounded-sm font-normal text-[10px] shadow-none">
                {org.meta?.noIndex ? "noIndex: true" : "Indexable (false)"}
              </Badge>
            </div>
          </Card>

          <Card className="shadow-none rounded-md overflow-hidden border">
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Open Graph Title</Label>
                  <Input readOnly value={org.meta?.ogTitle} className="shadow-none rounded-md h-9 text-xs" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Twitter Handle</Label>
                  <Input readOnly value={org.meta?.twitterHandle} className="shadow-none rounded-md h-9 text-xs font-mono" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Open Graph Description</Label>
                <Textarea readOnly value={org.meta?.ogDescription} className="shadow-none rounded-md text-xs resize-none" rows={2} />
              </div>
            </div>
          </Card>
        </SettingsSection>
      </div>
    </div>
  )
}