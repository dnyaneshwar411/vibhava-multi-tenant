import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { CreatePropertyFormValues } from "../helpers/index";
import { ImagePreviewer } from "@/components/common/image-previewer";
import ImageUpload from "@/modules/file-upload/components/image-upload";

export function MediaStage({
  form,
  previousStep,
  nextStep
}: {
  previousStep: any,
  nextStep: any,
  form: UseFormReturn<CreatePropertyFormValues>;
}) {
  return (
    <div className="space-y-4">
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
    </div>
  );
}
