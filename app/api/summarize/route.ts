import { NextRequest, NextResponse } from "next/server"

import { summarize } from "@/lib/tools"

export async function POST(request: NextRequest) {
  try {
    const { text, format } = await request.json()
    if (!text || typeof text !== "string" || !text.trim()) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 })
    }
    const result = await summarize(text, format || "concise paragraph")
    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Summarization failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
