"use client";

import { useMemo } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  TicketCreationInput,
  TicketCreationMediaAttachmentInput,
  ticketCreationMediaAttachmentsSchema,
} from "../schema/creation";
import { ImagePreviewer } from "@/components/common/image-previewer";

export default function TicketCreationMediaAttachments({
  form: defaultForm,
  onSubmit,
  previousStep,
}: {
  form: UseFormReturn<TicketCreationInput>;
  onSubmit: () => void;
  previousStep: () => void;
}) {
  const defaultValues = useMemo(() => defaultForm.getValues(), [defaultForm]);

  const form = useForm<TicketCreationMediaAttachmentInput>({
    resolver: zodResolver(ticketCreationMediaAttachmentsSchema),
    defaultValues: {
      attachments: defaultValues.attachments ?? [],
    },
  });

  const handleSubmit = (data: TicketCreationMediaAttachmentInput) => {
    defaultForm.setValues(data)
    onSubmit();
  };

  return (
    <Form {...form}>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="attachments"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Gallery Images</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    {...field}
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      onChange([...(value || []), ...files]);
                    }}
                  />
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(value) && value.map((file, index) => (
                      <ImagePreviewer
                        key={index}
                        file={file}
                        onRemove={() =>
                          onChange(value.filter((_, i) => i !== index))
                        }
                      />
                    ))}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-6 flex justify-between items-center">
          <Button
            type="button"
            variant="outline"
            className="min-w-[120px]"
            onClick={previousStep}
          >
            Back
          </Button>
          <Button onClick={form.handleSubmit(handleSubmit)} className="min-w-[120px]">
            Next
          </Button>
        </div>
      </div>
    </Form>
  );
}