"use client";
import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import AdvancedPagination from "@/components/common/advanced-pagination";
import AuditLogFilterOptions from "@/modules/audit-logs/components/audit-logs-filter-options";
import { ComponentLoader } from "@/components/ui/loader";
import { ErrorState } from "@/components/ui/error";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AuditLogRow from "@/modules/audit-logs/components/audit-log-row";

export default function AuditLogsPage() {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    action: "",
    actor: "",
    resource: "",
    from: "",
    to: "",
  });

  const { isLoading, data, error, mutate } = useFetch("/api/v1/audit", pagination);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <ComponentLoader />
      </div>
    );
  }

  if (error || data?.code !== 200) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <ErrorState
          title={data?.message || "Users Sync Error"}
          description="The backend returned an invalid response or the request failed."
          reset={() => mutate()}
        />
      </div>
    );
  }

  const logs = data.data
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Audit Logs</h1>
        <AuditLogFilterOptions
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>


      <div className="rounded-md border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Actor</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Resource</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead className="text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  No audit logs found matching the selected criteria.
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log: any) => (
                <AuditLogRow
                  key={log._id}
                  log={log}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AdvancedPagination
        page={pagination.page}
        limit={pagination.limit}
        total={data?.data?.pagination?.total ?? data?.data?.total ?? 0}
        onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
        onLimitChange={(limit) =>
          setPagination((prev) => ({ ...prev, limit, page: 1 }))
        }
      />
    </div>
  );
}