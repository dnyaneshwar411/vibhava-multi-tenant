"use client";

import { useState, useEffect } from "react";
import { ErrorState } from "@/components/ui/error";
import { ComponentLoader } from "@/components/ui/loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import useFetch from "@/hooks/useFetch";
import {
  ShieldCheck,
  ShieldAlert,
  Key,
  Copy,
  Check,
  RotateCcw,
  Save,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import { buildToastMessage } from "@/lib/catchAsync";
import api from "@/network/client";

export const TENANT_SCOPES = [
  "tenant:read",
  "tenant:read:pii",
  "lease:read",
  "ticket:create",
  "ticket:read:own",
  "ticket:update",
  "ledger:read",
  "ledger:pay",
  "document:read",
] as const;

export type TenantScope = (typeof TENANT_SCOPES)[number];

const SCOPE_DESCRIPTIONS: Record<TenantScope, { label: string; group: string }> = {
  "tenant:read": { label: "View basic profile data", group: "Tenant" },
  "tenant:read:pii": { label: "View sensitive PII (Phone/Email)", group: "Tenant" },
  "lease:read": { label: "View active & historical lease records", group: "Lease" },
  "ticket:create": { label: "Submit new maintenance tickets", group: "Tickets" },
  "ticket:read:own": { label: "View submitted support tickets", group: "Tickets" },
  "ticket:update": { label: "Update ticket status and notes", group: "Tickets" },
  "ledger:read": { label: "View financial ledger & balance", group: "Ledger" },
  "ledger:pay": { label: "Execute payments against balance", group: "Ledger" },
  "document:read": { label: "Access uploaded lease documents", group: "Documents" },
};

export default function TenantDetailsManageScopes({ tenantId }: { tenantId: string }) {
  const { isLoading, isValidating, data, error, mutate } = useFetch(
    `/api/v1/tenant/scope/${tenantId}`
  );

  const [scopesMap, setScopesMap] = useState<Record<string, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (data?.data) {
      setScopesMap(data.data?.scopeMap || {});
    }
  }, [data]);

  if (isValidating || isLoading) {
    return (
      <div className="border bg-card/50 p-12 flex items-center justify-center min-h-[300px]">
        <ComponentLoader />
      </div>
    );
  }

  if (error || data?.code !== 200) {
    return (
      <div className="border bg-card/50 p-6 flex items-center justify-center min-h-[300px]">
        <ErrorState
          title="Scope Synchronization Failure"
          description="Unable to fetch current access claim definitions for this tenant."
          reset={() => mutate()}
        />
      </div>
    );
  }

  const handleToggle = (scopeKey: string) => {
    setScopesMap((prev) => ({
      ...prev,
      [scopeKey]: !prev[scopeKey],
    }));
  };

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const activeCount = TENANT_SCOPES.filter((scope) => scopesMap[scope]).length;
  const isDirty =
    JSON.stringify(scopesMap) !==
    JSON.stringify(data?.data || data?.scopesMap || {});

  const groupedScopes = TENANT_SCOPES.reduce((acc, scope) => {
    const group = SCOPE_DESCRIPTIONS[scope]?.group || "General";
    if (!acc[group]) acc[group] = [];
    acc[group].push(scope);
    return acc;
  }, {} as Record<string, TenantScope[]>);

  const updateScopesList = async function () {
    try {
      setIsSaving(true);
      const response = await api.put(`/api/v1/tenant/scope/${tenantId}`, {
        body: { scopeMap: scopesMap }
      });
      if (response.code !== 200) throw new Error(response.message);
      toast.success(response.message || "Successfull")
    } catch (error) {
      toast.error(buildToastMessage(error));
    }
    setIsSaving(false);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border bg-card/50 p-5">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-bold tracking-tight uppercase">
              Access Claims & Permission Scopes
            </h3>
            <Badge variant="outline" className="font-mono text-[11px] rounded-none">
              {activeCount} / {TENANT_SCOPES.length} Active
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Configure permission capabilities and API authorization claims for this tenant account.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isDirty && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setScopesMap(data?.data?.scopeMap || {})}
              className="h-8 rounded-none text-xs gap-1.5"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Discard
            </Button>
          )}
          <Button
            size="sm"
            disabled={!isDirty || isSaving}
            className="h-8 rounded-none text-xs gap-1.5"
            onClick={updateScopesList}
          >
            <Save className="h-3.5 w-3.5" /> Save Changes
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(groupedScopes).map(([groupName, scopes]) => (
          <div key={groupName} className="border bg-card/50 overflow-hidden">
            <div className="px-4 py-2.5 bg-muted/30 border-b flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {groupName} Scopes
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">
                {scopes.filter((s) => scopesMap[s]).length} of {scopes.length} enabled
              </span>
            </div>

            <div className="divide-y">
              {scopes.map((scope) => {
                const isEnabled = Boolean(scopesMap[scope]);
                const meta = SCOPE_DESCRIPTIONS[scope];

                return (
                  <div
                    key={scope}
                    className="p-3.5 flex items-center justify-between gap-4 hover:bg-muted/20 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id={scope}
                        checked={isEnabled}
                        onCheckedChange={() => handleToggle(scope)}
                        className="mt-0.5 rounded-none border-muted focus-visible:ring-0"
                      />
                      <div className="space-y-0.5">
                        <label
                          htmlFor={scope}
                          className="text-xs font-semibold cursor-pointer block leading-none"
                        >
                          {meta?.label || scope}
                        </label>
                        <div className="flex items-center gap-2 pt-1">
                          <code className="text-[11px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 border inline-block">
                            {scope}
                          </code>
                          <button
                            type="button"
                            onClick={() => handleCopy(scope)}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            title="Copy scope key"
                          >
                            {copiedKey === scope ? (
                              <Check className="h-3 w-3 text-emerald-600" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      {isEnabled ? (
                        <Badge
                          variant="secondary"
                          className="text-[10px] font-mono font-medium text-emerald-600 bg-emerald-500/10 rounded-none border-0"
                        >
                          Granted
                        </Badge>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="text-[10px] font-mono text-muted-foreground bg-muted rounded-none border-0"
                        >
                          Disabled
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}