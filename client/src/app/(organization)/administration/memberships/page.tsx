"use client"

import { useState } from "react"
import {
  Copy,
  RefreshCw,
  Check,
  CreditCard,
  Building2,
  Calendar,
  Zap,
  ArrowUpRight,
  Receipt,
  CheckCircle2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ErrorState } from "@/components/ui/error"
import { ComponentLoader } from "@/components/ui/loader"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import useFetch from "@/hooks/useFetch"
import { copyText } from "@/lib/helpers"
import AdvancedPagination from "@/components/common/advanced-pagination"
import AddOrganizationMembership from "@/modules/membership/components/add-organization-membership"

interface Invoice {
  _id: string
  membership: string
  type: string
  amount: number
  transactionReference: string
  processedAt: string
}

interface MembershipConfig {
  _id: string
  organization: string
  tier: string
  status: string
  billingCycle: string
  currentPeriodStart: string
  currentPeriodEnd: string
}

interface PaginationMeta {
  pageNumber: number
  limitNumber: number
  skip: number
  total: number
}

interface MembershipResponse {
  code: number
  message?: string
  data: {
    config: MembershipConfig
    invoices: Invoice[]
    pagination: PaginationMeta
  }
}

export default function MembershipPage() {
  const [copied, setCopied] = useState(false)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  })

  const { isLoading, data, error, mutate } = useFetch(
    "/api/v1/memberships",
    pagination
  )

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] w-full items-center justify-center">
        <ComponentLoader />
      </div>
    )
  }

  if (error || data?.code !== 200 || !data?.data) {
    return (
      <div className="flex min-h-[500px] w-full items-center justify-center">
        <ErrorState
          title={data?.message || "Dashboard Sync Error"}
          description="The database cluster returned an invalid schema or network failure."
          reset={() => mutate()}
        />
      </div>
    )
  }

  const { config, invoices, pagination: paginationData } = data.data

  const handleCopy = () => {
    copyText(JSON.stringify(data.data, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(val / 100)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">Billing & Subscriptions</h1>
            <Badge variant="outline" className="rounded-none font-mono text-xs">
              LIVE
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage workspace tiers, review transaction history, and export invoice records.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <AddOrganizationMembership />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-0 border-t border-l md:grid-cols-2 lg:grid-cols-4">
        <div className="border-r border-b p-6 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">Current Tier</span>
            <Zap className="h-4 w-4" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold">{config.tier}</span>
            <Badge
              variant={config.status === "Active" ? "default" : "destructive"}
              className="rounded-none shadow-none"
            >
              {config.status}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground font-mono truncate">
            ID: {config._id}
          </p>
        </div>

        <div className="border-r border-b p-6 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">Cadence</span>
            <CreditCard className="h-4 w-4" />
          </div>
          <div className="text-2xl font-bold">{config.billingCycle}</div>
          <p className="text-xs text-muted-foreground">Automated auto-renewal</p>
        </div>

        <div className="border-r border-b p-6 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">Period Start</span>
            <Calendar className="h-4 w-4" />
          </div>
          <div className="text-2xl font-bold">{formatDate(config.currentPeriodStart)}</div>
          <p className="text-xs text-muted-foreground">Cycle initialized</p>
        </div>

        <div className="border-r border-b p-6 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">Next Renewal</span>
            <ArrowUpRight className="h-4 w-4" />
          </div>
          <div className="text-2xl font-bold">{formatDate(config.currentPeriodEnd)}</div>
          <p className="text-xs text-muted-foreground">Next scheduled invoice date</p>
        </div>
      </div>

      <div className="space-y-4 mt-8">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold tracking-tight">Invoice History</h2>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            {paginationData?.total ?? 0} TOTAL RECORDS
          </span>
        </div>

        <div className="border">
          <Table>
            <TableHeader>
              <TableRow className="rounded-none hover:bg-transparent">
                <TableHead className="w-[220px]">Reference ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Processed At</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.length === 0 ? (
                <TableRow className="rounded-none">
                  <TableCell
                    colSpan={4}
                    className="h-32 text-center text-sm text-muted-foreground"
                  >
                    No invoices recorded for this billing cycle.
                  </TableCell>
                </TableRow>
              ) : (
                  invoices.map((invoice: any) => (
                  <TableRow key={invoice._id} className="rounded-none">
                    <TableCell className="font-mono text-xs font-medium">
                      {invoice.transactionReference}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="rounded-none font-normal">
                        {invoice.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {formatDate(invoice.processedAt)}
                    </TableCell>
                    <TableCell className="text-right font-mono font-semibold">
                      {formatCurrency(invoice.amount)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="pt-2">
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
      </div>
    </div>
  )
}