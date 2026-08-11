"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ConfirmationAlert } from "@/components/common/confirmation-alert";
import api from "@/network/client";
import { buildToastMessage } from "@/lib/catchAsync";
import { useRouter } from "next/navigation";

interface DeletePropertyProps {
  propertyId: string;
  propertyName: string;
  children: React.ReactNode;
}

export function DeleteProperty({ propertyId, propertyName, children }: DeletePropertyProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    try {
      const response = await api.delete(`/api/v1/property/${propertyId}`);
      if (response.code !== 200) throw new Error(response.message);
      toast.success(response.message);
      router.push("/management/properties");
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
        description={`This will permanently delete the property "${propertyName}". This action cannot be undone.`}
        onConfirm={handleDelete}
        confirmText="Delete Property"
      />
    </>
  );
}
