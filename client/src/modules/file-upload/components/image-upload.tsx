import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { buildObjectURL, validHTTPURL } from "@/lib/helpers";

export default function ImageUpload({
  formControl,
  imageLink,
  fieldName,
  fieldLabel,
}: {
  formControl: any,
  imageLink?: string
  fieldName: string
  fieldLabel: string
}) {
  const [file, setFile] = useState<any>();
  const inputRef = useRef<HTMLInputElement>(null);

  const fileSelected = file instanceof File
  const objectURL = fileSelected ? buildObjectURL(file) : "";
  const isValidImageLink = validHTTPURL(imageLink!)
  return (
    <FormField
      control={formControl}
      name={fieldName}
      render={({ field: { value, onChange, ...field } }) => (
        <FormItem>
          <FormLabel>{fieldLabel}</FormLabel>
          <FormControl>
            <div className="space-y-2">
              <Input
                hidden
                type="file"
                accept="image/*"
                {...field}
                ref={inputRef}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  setFile(file)
                  onChange(file)
                }}
              />
              <div
                onClick={() => inputRef.current?.click()}
                className="mt-2 relative bg-secondary w-full aspect-[16/8] border border-dashed rounded-[4px] flex items-center justify-center cursor-pointer"
              >
                {!fileSelected &&
                  (imageLink && isValidImageLink)
                  ? <Image
                    alt=""
                    fill
                    className="object-contain"
                    src={imageLink}
                  />
                  : <button>
                    <ImageIcon className="opacity-50" strokeWidth={1} size={32} />
                  </button>}
                {fileSelected && <div>
                  <X
                  strokeWidth={2.5}
                    size={20}
                    onClick={(e) => {
                      e.stopPropagation()
                      setFile(null)
                      onChange(null)
                    }}
                    className="absolute top-2 right-2 cursor-pointer z-100 bg-destructive text-black opacity-80 hover:opacity-100"
                  />
                  <Image
                    alt=""
                    fill
                    className="object-contain"
                    src={objectURL}
                  />
                </div>}
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}