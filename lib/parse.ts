import { PDFParse } from "pdf-parse"
import mammoth from "mammoth"
import * as pdfjsWorker from "pdfjs-dist/legacy/build/pdf.worker.mjs"

async function ensurePdfWorker(): Promise<void> {
  const global = globalThis as typeof globalThis & { pdfjsWorker?: unknown }
  if (!global.pdfjsWorker) {
    global.pdfjsWorker = pdfjsWorker
  }
}

export const SUPPORTED_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const

export type ResumeFileType = (typeof SUPPORTED_MIME_TYPES)[number]

export function isSupportedFileType(
  mimeType: string
): mimeType is ResumeFileType {
  return (SUPPORTED_MIME_TYPES as readonly string[]).includes(mimeType)
}

export async function parsePdf(buffer: Buffer): Promise<string> {
  await ensurePdfWorker()
  const parser = new PDFParse({ data: new Uint8Array(buffer) })
  try {
    const result = await parser.getText()
    return result.text
  } finally {
    await parser.destroy()
  }
}

export async function parseDocx(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer })
  return result.value
}

export async function parseResume(
  buffer: Buffer,
  fileType: ResumeFileType
): Promise<string> {
  if (fileType === "application/pdf") {
    return parsePdf(buffer)
  }
  return parseDocx(buffer)
}

export function countWords(text: string): number {
  const matches = text.match(/[\p{L}\p{N}'-]+/gu)
  return matches?.length ?? 0
}

export function normalizeText(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}
