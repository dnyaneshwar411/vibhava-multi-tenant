"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pen, Upload, Loader2 } from "lucide-react";

import { buttonVariants, Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { updateUserSchema, UpdateUserInput } from "../helpers/update-schema";
import { Form } from "@/components/ui/form";
import ImageUpload from "@/modules/file-upload/components/image-upload";
import { uploadImageHelper } from "@/modules/file-upload/helpers";
import { toast } from "sonner";
import api from "@/network/client";
import { buildToastMessage } from "@/lib/catchAsync";

export default function UserProfileUpdate({
  user,
  onSuccess,
}: {
  user: any;
  onSuccess?: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <span className={buttonVariants({ variant: "default" })}>
          <Pen className="!h-[14px] !w-[14px]" />
          Update
        </span>
      </DialogTrigger>
      <DialogContent className="border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold tracking-tight">
            Update Profile
          </DialogTitle>
        </DialogHeader>
        <FormContainer
          user={user}
          closeDialog={() => {
            setOpen(false);
            onSuccess?.();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

function FormContainer({
  user,
  closeDialog,
}: {
  user: any;
  closeDialog: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
    mode: "onChange",
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      mobileNumber: user?.mobileNumber ? String(user.mobileNumber) : "",
      countryCode: user?.countryCode ? String(user.countryCode) : "91",
      avatar: user?.avatar || "",
    },
  });

  const onSubmit = async (values: UpdateUserInput) => {
    try {
      setIsSubmitting(true);

      if (values.avatar instanceof File) {
        const toastId = toast.loading("Uploading Image...")
        const { success, message, data } = await uploadImageHelper(values.avatar, {
          private: false,
          resource: "profiles/user"
        })
        toast.dismiss(toastId);
        if (!success) throw new Error(message);
        form.setValue("avatar", data)
      }

      const payload = {
        ...form.getValues(),
        type: "User"
      }
      if (!payload.avatar.key) {
        delete payload.avatar;
      }

      const response = await api.put("/api/v1/auth/profile", {
        body: payload
      })

      if (response.code !== 200) throw new Error(response.message)

      toast.success(response.message || "Successfull")
    } catch (error) {
      toast.error(buildToastMessage(error))
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <div className="space-y-4 pt-2">
        <ImageUpload
          fieldLabel="Avatar"
          fieldName="avatar"
          formControl={form.control}
          imageLink={user.avatar}
        />

        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-xs font-medium">
            Name
          </Label>
          <Input
            id="name"
            className="h-9 border-neutral-200 dark:border-neutral-800"
            {...form.register("name")}
          />
          {form.formState.errors.name && (
            <p className="text-xs text-rose-500">{form.formState.errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-medium">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            className="h-9 border-neutral-200 dark:border-neutral-800"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="text-xs text-rose-500">{form.formState.errors.email.message}</p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="countryCode" className="text-xs font-medium">
              Country Code
            </Label>
            <Input
              id="countryCode"
              placeholder="91"
              className="h-9 border-neutral-200 dark:border-neutral-800"
              {...form.register("countryCode")}
            />
          </div>
          <div className="col-span-2 space-y-1.5">
            <Label htmlFor="mobileNumber" className="text-xs font-medium">
              Mobile Number
            </Label>
            <Input
              id="mobileNumber"
              className="h-9 border-neutral-200 dark:border-neutral-800"
              {...form.register("mobileNumber")}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-neutral-100 pt-4 dark:border-neutral-900">
          <Button
            type="button"
            variant="outline"
            onClick={closeDialog}
            className="h-9 border-neutral-200 px-4 text-xs dark:border-neutral-800"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-9 px-4 text-xs"
            onClick={form.handleSubmit(onSubmit)}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </div>
    </Form>
  );
}