import { NextRequest, NextResponse } from "next/server"

import { detectAi } from "@/lib/tools"

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()
    if (!text || typeof text !== "string" || !text.trim()) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 })
    }
    const result = await detectAi(text)
    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Analysis failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
