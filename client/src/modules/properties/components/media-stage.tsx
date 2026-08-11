import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, UseFormReturn } from "react-hook-form";
import { CreatePropertyFormValues, mediaFormSchema, MediaFormSchemaType } from "../helpers/index";
import { ImagePreviewer } from "@/components/common/image-previewer";
import ImageUpload from "@/modules/file-upload/components/image-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";

export function MediaStage({
  form: defaultForm,
  previousStep,
  nextStep
}: {
  previousStep: any,
  nextStep: any,
  form: UseFormReturn<CreatePropertyFormValues>;
}) {
  const defaultFormState = useMemo(() => defaultForm.getValues(), [])

  const form = useForm<MediaFormSchemaType>({
    resolver: zodResolver(mediaFormSchema),
    mode: "onChange",
    defaultValues: {
      media: defaultFormState.media
    }
  });


  async function goToNextStep(data: MediaFormSchemaType) {
    defaultForm.setValues(data)
    nextStep(data);
  }
  return (
    <Form {...form}>
      <ImageUpload
        fieldLabel="Primary Image"
        fieldName="media.primaryImage"
        formControl={form.control}
      />
      <ImageUpload
        fieldLabel="Cover Image"
        fieldName="media.coverImage"
        formControl={form.control}
      />
      <FormField
        control={form.control}
        name="media.gallery"
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

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={previousStep}
        >
          Back
        </Button>
        <Button onClick={form.handleSubmit(goToNextStep)}>
          Next
        </Button>
      </div>
    </Form>
  );
}
