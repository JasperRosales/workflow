import { NextRequest, NextResponse } from "next/server"

import { analyzeResume } from "@/lib/analyze"
import {
  isSupportedFileType,
  parseResume,
  SUPPORTED_MIME_TYPES,
} from "@/lib/parse"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const jobDescription =
      (formData.get("jobDescription") as string | null) ?? ""

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (!isSupportedFileType(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type. Please upload a PDF or DOCX file." },
        { status: 400 }
      )
    }

    if (file.size === 0) {
      return NextResponse.json(
        { error: "The uploaded file is empty." },
        { status: 400 }
      )
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File is too large. Maximum allowed size is 10 MB." },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const resumeText = await parseResume(
      buffer,
      file.type as (typeof SUPPORTED_MIME_TYPES)[number]
    )

    if (!resumeText.trim()) {
      return NextResponse.json(
        {
          error:
            "Could not extract text from the file. Please ensure it contains readable text.",
        },
        { status: 400 }
      )
    }

    const result = await analyzeResume({
      resumeText,
      jobDescription: jobDescription.trim() || undefined,
      fileName: file.name,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Analysis error:", error)
    const message = error instanceof Error ? error.message : "Analysis failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
