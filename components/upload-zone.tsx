"use client"

import * as React from "react"
import { FileText, FileType, CloudUpload, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const MAX_FILE_SIZE = 10 * 1024 * 1024

const ACCEPTED_TYPES: Record<string, string> = {
  "application/pdf": "PDF",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "DOCX",
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function UploadZone({
  file,
  onFileChange,
  disabled,
}: {
  file: File | null
  onFileChange: (file: File | null) => void
  disabled?: boolean
}) {
  const [isDragging, setIsDragging] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const validateFile = React.useCallback(
    (candidate: File) => {
      if (!(candidate.type in ACCEPTED_TYPES)) {
        setError("Unsupported file type. Please upload a PDF or DOCX resume.")
        return
      }
      if (candidate.size === 0) {
        setError("This file is empty.")
        return
      }
      if (candidate.size > MAX_FILE_SIZE) {
        setError("File is too large. Maximum allowed size is 10 MB.")
        return
      }
      setError(null)
      onFileChange(candidate)
    },
    [onFileChange]
  )

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(false)
    if (disabled) return
    const candidate = event.dataTransfer.files[0]
    if (candidate) validateFile(candidate)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const candidate = event.target.files?.[0]
    if (candidate) validateFile(candidate)
    event.target.value = ""
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={handleInputChange}
        disabled={disabled}
      />
      {file ? (
        <div className="flex items-center gap-3 border-2 border-foreground bg-card p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex size-10 shrink-0 items-center justify-center border-2 border-foreground bg-primary/10 text-primary">
            {file.type === "application/pdf" ? (
              <FileText className="size-5" />
            ) : (
              <FileType className="size-5" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {ACCEPTED_TYPES[file.type] ?? "Document"} -{" "}
              {formatSize(file.size)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onFileChange(null)}
            disabled={disabled}
            aria-label="Remove file"
            className="p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault()
            if (!disabled) setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          disabled={disabled}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-3 border-2 border-dashed border-foreground bg-card px-6 py-10 text-center transition-all outline-none hover:border-primary/60 hover:bg-muted/40 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/50",
            isDragging && "border-primary bg-muted/40",
            disabled && "pointer-events-none opacity-60"
          )}
        >
          <div className="flex size-12 items-center justify-center border-2 border-foreground bg-primary/10 text-primary">
            <CloudUpload className="size-6" />
          </div>
          <div>
            <p className="text-sm font-bold">
              Drag &amp; drop your resume, or{" "}
              <span className="text-primary">browse</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              PDF or DOCX - up to 10 MB
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline">PDF</Badge>
            <Badge variant="outline">DOCX</Badge>
          </div>
        </button>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
