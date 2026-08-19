"use client"
import Image from "next/image"
import { Mail, Phone, ShieldCheck, Calendar } from "lucide-react"
import UserProfileUpdate from "./user-profile-update"

interface UserProfile {
  _id: string
  name: string
  email: string
  mobileNumber: number
  salary: number
  status: string
  avatar: string
  updatedAt: string
}

interface UserDataProps {
  user: UserProfile
  actorModel?: string
}

export default function UserProfileDetails({ user, actorModel = "User" }: UserDataProps) {
  const formattedDate = new Date(user.updatedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <div className="w-full p-4 shadow-sm">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden border border-neutral-200 dark:border-neutral-800">
            <Image
              src={user.avatar}
              alt={user.name}
              fill
              className="object-cover"
              sizes="64px"
              unoptimized
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                {user.name}
              </h2>
              <span className="border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-xs font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
                {actorModel}
              </span>
            </div>
          </div>
        </div>
        <UserProfileUpdate user={user} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 border-t border-neutral-200 pt-6 sm:grid-cols-2 dark:border-neutral-800">
        <div className="flex items-center gap-3 bg-card border p-4">
          <Mail className="h-4 w-4 text-neutral-400" />
          <div className="truncate">
            <p className="text-xs font-medium text-neutral-500">Email Address</p>
            <p className="truncate text-sm text-neutral-900 dark:text-neutral-100">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-card border p-4">
          <Phone className="h-4 w-4 text-neutral-400" />
          <div>
            <p className="text-xs font-medium text-neutral-500">Mobile Number</p>
            <p className="text-sm text-neutral-900 dark:text-neutral-100">+{user.mobileNumber}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-card border p-4">
          <ShieldCheck className="h-4 w-4 text-neutral-400" />
          <div>
            <p className="text-xs font-medium text-neutral-500">Account Status</p>
            <span className="inline-block text-sm font-medium text-emerald-600 dark:text-emerald-400">
              {user.status}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-neutral-400">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          <span>Last Updated: {formattedDate}</span>
        </div>
      </div>
    </div>
  )
}