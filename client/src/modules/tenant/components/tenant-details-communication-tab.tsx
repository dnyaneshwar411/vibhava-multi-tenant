import { Badge } from "@/components/ui/badge";
import { TabsContent } from "@/components/ui/tabs";
import { Bell, CheckCircle2, XCircle } from "lucide-react";

export default function TenantDetailsCommunicationTab({ communicationPreferences }: { communicationPreferences: any }) {
  return (
    <TabsContent value="communication" className="m-0 focus-visible:outline-none space-y-4">
      <div className="border bg-card/50 p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            Notification & Channel Preferences
          </h3>
          <Bell className="h-4 w-4 text-muted-foreground/60" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border p-4 space-y-2">
            <span className="text-xs text-muted-foreground block">
              Preferred Channel
            </span>
            <Badge variant="secondary" className="font-mono text-xs rounded-none">
              {communicationPreferences.preferredChannel}
            </Badge>
          </div>

          <div className="border p-4 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Email Notifications
            </span>
            {communicationPreferences.allowEmailNotifications ? (
              <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium font-mono">
                <CheckCircle2 className="h-3.5 w-3.5" /> Enabled
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-mono">
                <XCircle className="h-3.5 w-3.5" /> Disabled
              </span>
            )}
          </div>

          <div className="border p-4 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              SMS Notifications
            </span>
            {communicationPreferences.allowSmsNotifications ? (
              <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium font-mono">
                <CheckCircle2 className="h-3.5 w-3.5" /> Enabled
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-mono">
                <XCircle className="h-3.5 w-3.5" /> Disabled
              </span>
            )}
          </div>
        </div>
      </div>
    </TabsContent>
  )
}