import { NextRequest, NextResponse } from "next/server"

import { paraphrase } from "@/lib/tools"

export async function POST(request: NextRequest) {
  try {
    const { text, tone } = await request.json()
    if (!text || typeof text !== "string" || !text.trim()) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 })
    }
    const result = await paraphrase(text, tone || "neutral")
    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Paraphrase failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
