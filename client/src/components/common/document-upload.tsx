"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buildObjectURL, validHTTPURL } from "@/lib/helpers";
import { Eye, File, FileCode, FileText, Paperclip, X } from "lucide-react";
import { Dispatch, SetStateAction, useRef } from "react";

type DocumentUploadProps = {
  documentLink?: string;
  fieldLabel?: string;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
};

export default function DocumentUpload({
  documentLink,
  fieldLabel = "Document",
  file,
  setFile,
}: DocumentUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const fileSelected =
    Boolean(file) &&
    typeof file === "object" &&
    file?.constructor?.name === "File";

  const objectURL = fileSelected
    ? buildObjectURL(file)
    : documentLink && validHTTPURL(documentLink)
    ? documentLink
    : "";

  const fileName = fileSelected
    ? file?.name
    : documentLink
    ? documentLink.split("/").pop() || "Document"
    : "";

  const fileExtension = fileName?.split(".").pop()?.toLowerCase();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const renderFileIcon = () => {
    if (fileExtension === "pdf") {
      return <FileText className="h-8 w-8 text-red-500" />;
    }
    if (["doc", "docx"].includes(fileExtension || "")) {
      return <FileCode className="h-8 w-8 text-blue-500" />;
    }
    return <File className="h-8 w-8 text-muted-foreground" />;
  };

  return (
    <div className="space-y-1.5">
      {fieldLabel && (
        <Label className="text-xs font-medium">{fieldLabel}</Label>
      )}

      <div className="space-y-2">
        <Input
          hidden
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          ref={inputRef}
          onChange={handleFileChange}
        />

        {/* Upload Dropzone / Active Preview Area */}
        {!objectURL ? (
          <div
            onClick={() => inputRef.current?.click()}
            className="relative bg-secondary/50 hover:bg-secondary/80 transition-colors w-full h-28 border border-dashed rounded-none flex flex-col items-center justify-center cursor-pointer gap-2 p-4"
          >
            <Paperclip className="h-5 w-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Click to upload document{" "}
              <span className="text-[10px] opacity-75">(PDF, DOC, DOCX)</span>
            </span>
          </div>
        ) : (
          <div className="relative border p-3 bg-card rounded-none space-y-3">
            {/* Selected File Header Bar */}
            <div className="flex items-center justify-between gap-2 border-b pb-2">
              <div className="flex items-center gap-2 overflow-hidden">
                {renderFileIcon()}
                <div className="truncate">
                  <p className="text-xs font-medium truncate">{fileName}</p>
                  <p className="text-[10px] text-muted-foreground uppercase">
                    {fileExtension} File
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Open file in new tab */}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-none"
                  onClick={() => window.open(objectURL, "_blank")}
                  title="View Document"
                >
                  <Eye className="h-4 w-4" />
                </Button>

                {/* Remove file */}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-none text-destructive hover:text-destructive"
                  onClick={handleClear}
                  title="Remove Document"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Inline Document Preview Frame */}
            <div className="w-full h-48 border bg-muted/20 overflow-hidden">
              {fileExtension === "pdf" ? (
                <iframe
                  src={`${objectURL}#toolbar=0&navpanes=0`}
                  className="w-full h-full border-0"
                  title="PDF Preview"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center space-y-2 p-4 text-center">
                  <FileCode className="h-10 w-10 text-blue-500 opacity-80" />
                  <span className="text-xs text-muted-foreground">
                    Inline preview unavailable for Word documents.
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs rounded-none"
                    onClick={() => window.open(objectURL, "_blank")}
                  >
                    Open Document
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}