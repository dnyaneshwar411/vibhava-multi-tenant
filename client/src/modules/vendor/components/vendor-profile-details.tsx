"use client"
import { Mail, ShieldCheck, Wrench, Calendar } from "lucide-react"
import VendorProfileUpdate from "./vendor-profile-update"
import { Vendor } from "../types"

interface VendorProfile {
  _id: string
  name: string
  email: string
  status: string
  tradeCategory: string
  createdBy: string
  isDeleted: boolean
  updatedAt?: string
}

interface VendorDataProps {
  vendor: Vendor
  actorModel?: string
}

export default function VendorProfileDetails({ vendor, actorModel = "Vendor" }: VendorDataProps) {
  return (
    <div className="p-4">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
            <Wrench className="h-7 w-7 text-neutral-600 dark:text-neutral-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                {vendor.name}
              </h2>
              <span className="border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-xs font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
                {actorModel}
              </span>
            </div>
            <p className="font-mono text-xs text-neutral-500">ID: {vendor._id}</p>
          </div>
        </div>
        <VendorProfileUpdate
          vendor={{
            ...vendor,
            mobileNumber: String(vendor?.mobileNumber || ""),
            countryCode: String(vendor?.countryCode || ""),
          }}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 border-t border-neutral-200 pt-6 sm:grid-cols-2 dark:border-neutral-800">
        <div className="flex items-center gap-3 border bg-card p-4">
          <Mail className="h-4 w-4 text-neutral-400" />
          <div className="truncate">
            <p className="text-xs font-medium text-neutral-500">Email Address</p>
            <p className="truncate text-sm text-neutral-900 dark:text-neutral-100">{vendor.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 border bg-card p-4">
          <Wrench className="h-4 w-4 text-neutral-400" />
          <div>
            <p className="text-xs font-medium text-neutral-500">Trade Category</p>
            <p className="text-sm text-neutral-900 dark:text-neutral-100">{vendor.tradeCategory}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 border bg-card p-4">
          <ShieldCheck className="h-4 w-4 text-neutral-400" />
          <div>
            <p className="text-xs font-medium text-neutral-500">Vendor Status</p>
            <span className="inline-block text-sm font-medium text-emerald-600 dark:text-emerald-400">
              {vendor.status}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-neutral-400">
        <div>
          <span>Record State: </span>
          <span
            className={`font-medium ${
              vendor.isDeleted ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"
            }`}
          >
            {vendor.isDeleted ? "Archived / Deleted" : "Active Record"}
          </span>
        </div>
      </div>
    </div>
  )
}