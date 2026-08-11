"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ConfirmationAlert } from "@/components/common/confirmation-alert";
import api from "@/network/client";
import { buildToastMessage } from "@/lib/catchAsync";

export function DeleteVendor({
  vendorId,
  vendorName,
  children,
}: {
  vendorId: string;
  vendorName?: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    try {
      const response = await api.delete(`/api/v1/vendor/${vendorId}`);
      if (response.code !== 200) throw new Error(response.message);
      toast.success(response.message || "Vendor deleted");
      router.push("/operations/vendor");
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
        description={`This will permanently delete ${vendorName ? `"${vendorName}"` : "this vendor"}. This action cannot be undone.`}
        onConfirm={handleDelete}
        confirmText="Delete Vendor"
      />
    </>
  );
}
