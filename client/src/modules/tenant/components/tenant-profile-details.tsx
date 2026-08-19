"use client"
import Image from "next/image"
import {
  Mail,
  Phone,
  Calendar,
  UserCheck,
  Bell,
  MessageSquare,
} from "lucide-react"
import TenantProfileUpdate from "./tenant-profile-update"

interface CurrentResidence {
  property: string
  unit: string
  activeLease: string
  moveInDate: string
}

interface CommunicationPreferences {
  preferredChannel: string
  allowSmsNotifications: boolean
  allowEmailNotifications: boolean
}

interface TenantProfile {
  _id: string
  name: string
  email: string
  mobileNumber: number
  countryCode: number
  status: string
  avatar: string
  isDeleted: boolean
  updatedAt: string
  currentResidence?: CurrentResidence
  communicationPreferences?: CommunicationPreferences
}

interface TenantDataProps {
  tenant: TenantProfile
  actorModel?: string
}

export default function TenantProfileDetails({
  tenant,
  actorModel = "Tenant",
}: TenantDataProps) {
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A"
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="w-full p-4 space-y-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden border border-neutral-200 dark:border-neutral-800">
            <Image
              src={tenant.avatar}
              alt={tenant.name}
              fill
              className="object-cover"
              sizes="64px"
              unoptimized
              onError={(e) => ((e.target as HTMLImageElement).src = "/placeholder.avif")}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                {tenant.name}
              </h2>
              <span className="border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-xs font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
                {actorModel}
              </span>
            </div>
            <p className="font-mono text-xs text-neutral-500">ID: {tenant._id}</p>
          </div>
        </div>

        <TenantProfileUpdate tenant={tenant as any} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 bg-card p-4 border border-neutral-200 dark:border-neutral-800">
          <Mail className="h-4 w-4 shrink-0 text-neutral-400" />
          <div className="truncate">
            <p className="text-xs font-medium text-neutral-500">Email Address</p>
            <p className="truncate text-sm text-neutral-900 dark:text-neutral-100">{tenant.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-card p-4 border border-neutral-200 dark:border-neutral-800">
          <Phone className="h-4 w-4 shrink-0 text-neutral-400" />
          <div>
            <p className="text-xs font-medium text-neutral-500">Mobile Number</p>
            <p className="text-sm text-neutral-900 dark:text-neutral-100">
              +{tenant.countryCode} {tenant.mobileNumber}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-card p-4 border border-neutral-200 dark:border-neutral-800">
          <UserCheck className="h-4 w-4 shrink-0 text-neutral-400" />
          <div>
            <p className="text-xs font-medium text-neutral-500">Application Status</p>
            <span className="inline-block text-sm font-medium text-amber-600 dark:text-amber-400">
              {tenant.status}
            </span>
          </div>
        </div>
      </div>

      {tenant.communicationPreferences && (
        <div className="border border-neutral-200 bg-card p-4 space-y-3 dark:border-neutral-800">
          <div className="flex items-center gap-2 border-b border-neutral-100 pb-2 dark:border-neutral-900">
            <Bell className="h-4 w-4 text-neutral-500" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
              Communication Preferences
            </h3>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-3.5 w-3.5 text-neutral-400" />
              <span className="text-neutral-500">Preferred Channel:</span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                {tenant.communicationPreferences.preferredChannel}
              </span>
            </div>
            <div className="flex gap-2">
              <span
                className={`border px-2 py-0.5 text-[11px] font-medium ${tenant.communicationPreferences.allowEmailNotifications
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-400"
                    : "border-neutral-200 text-neutral-400"
                  }`}
              >
                Email Alerts: {tenant.communicationPreferences.allowEmailNotifications ? "ON" : "OFF"}
              </span>
              <span
                className={`border px-2 py-0.5 text-[11px] font-medium ${tenant.communicationPreferences.allowSmsNotifications
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-400"
                    : "border-neutral-200 text-neutral-400"
                  }`}
              >
                SMS Alerts: {tenant.communicationPreferences.allowSmsNotifications ? "ON" : "OFF"}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-100 dark:border-neutral-900">
        <div className="flex items-center gap-1.5 ml-auto">
          <Calendar className="h-3.5 w-3.5" />
          <span>Last Updated: {formatDate(tenant.updatedAt)}</span>
        </div>
      </div>
    </div>
  )
}