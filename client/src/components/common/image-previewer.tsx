import { useState, useEffect } from "react";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImagePreviewerProps extends React.ComponentProps<"div"> {
  file: File | string;
  onRemove?: () => void;
}

export function ImagePreviewer({
  file,
  onRemove,
  className,
  ...props
}: ImagePreviewerProps) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (typeof file === "string") {
      setPreview(file);
    } else {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  if (!preview) return null;

  return (
    <div
      className={cn(
        "group relative size-20 overflow-hidden rounded-md border bg-muted",
        className
      )}
      {...props}
    >
      <img
        src={preview}
        alt="Preview"
        className="size-full object-cover"
      />
      {onRemove && (
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute !bg-black top-1 right-1 size-6 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={onRemove}
        >
          <XIcon className="size-4" />
        </Button>
      )}
    </div>
  );
}
