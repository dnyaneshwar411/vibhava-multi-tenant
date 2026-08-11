"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ConfirmationAlert } from "@/components/common/confirmation-alert";
import api from "@/network/client";
import { buildToastMessage } from "@/lib/catchAsync";

interface DeleteLeaseProps {
  leaseId: string;
  leaseLabel?: string;
  children: React.ReactNode;
}

export function DeleteLease({ leaseId, leaseLabel, children }: DeleteLeaseProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    try {
      const response = await api.delete(`/api/v1/lease/${leaseId}`);
      if (response.code !== 200) throw new Error(response.message);
      toast.success(response.message || "Lease deleted");
      router.push("/management/leases");
    } catch (error) {
      toast.error(buildToastMessage(error));
    }
  }

  return (
    <>
      <span onClick={() => setIsOpen(true)} className="cursor-pointer">
        {children}
      </span>
      <ConfirmationAlert
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Are you sure?"
        description={`This will permanently delete the lease ${leaseLabel ? `"${leaseLabel}"` : ""}. This action cannot be undone.`}
        onConfirm={handleDelete}
        confirmText="Delete Lease"
      />
    </>
  );
}
