import { NextRequest, NextResponse } from "next/server"

import { writeEssay } from "@/lib/tools"

export async function POST(request: NextRequest) {
  try {
    const { topic, style, length } = await request.json()
    if (!topic || typeof topic !== "string" || !topic.trim()) {
      return NextResponse.json({ error: "No topic provided" }, { status: 400 })
    }
    const result = await writeEssay(
      topic,
      style || "formal",
      length || "medium (~500 words)"
    )
    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Essay writing failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
