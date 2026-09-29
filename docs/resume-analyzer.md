# Resume Analyzer Module

The Resume Analyzer is an AI-powered tool that evaluates resumes for ATS compatibility and provides actionable improvement suggestions.

## Features

- **ATS compatibility score** (0-100) with animated score ring
- **Score breakdown** — per-category weighted scoring with progress bars
- **Keyword analysis** — matched vs. missing keywords with counts
- **Missing skills & skill gaps** — with acquisition advice and prioritization
- **Formatting suggestions** — flags ATS-hostile layout issues
- **Grammar & spelling** — before/after corrections
- **Recommended actions** — prioritized improvements ranked by impact
- **Job description match** — match percentage, strengths, and gaps (when JD provided)
- **Resume summary analysis** — quality assessment
- **Resume rewrite suggestions** — before/after rewrites of real bullet points
- **Cover letter suggestions** and **interview preparation tips**
- **Downloadable report** — export as Markdown or styled HTML

## Components

### `components/resume-analyzer.tsx`

Main analyzer component. Manages:
- File upload state
- Job description input
- Analysis status (idle, uploading, parsing, analyzing, success, error)
- Results display
- Report download (Markdown/HTML)

### `components/upload-zone.tsx`

Drag & drop file upload component:
- Accepts PDF and DOCX files
- 10 MB file size limit
- File type validation
- Drag-over visual feedback
- File info display with remove option

### `components/ats-score-ring.tsx`

Animated SVG circular progress ring:
- Color-coded by score (green 80+, amber 60+, red <60)
- Smooth animation on score change
- Accessible with ARIA label

### `components/results-view.tsx`

Comprehensive results display:
- ATS score ring with quality badge
- Score breakdown with progress bars
- Job description match (when provided)
- Keyword analysis (matched/missing)
- Missing skills and skill gaps
- Formatting suggestions
- Grammar and spelling issues
- Resume summary analysis
- Recommended actions (numbered list)
- Resume rewrite suggestions
- Cover letter suggestions
- Interview preparation tips

## Analysis Flow

```
User uploads file → POST /api/analyze
    ↓
File validation (type, size)
    ↓
Text extraction (PDF: pdf-parse, DOCX: mammoth)
    ↓
Gemini AI analysis (structured JSON response)
    ↓
Response validation and normalization
    ↓
Results displayed in UI
```

## AI Prompt

The analyzer uses a detailed system prompt that instructs the Gemini model to act as a senior technical recruiter with ATS expertise. The prompt requests a structured JSON response with:

- Overall ATS score (0-100)
- Score breakdown by category (with weights)
- Keyword analysis (10-25 keywords)
- Missing skills and skill gaps
- Formatting issues (severity-rated)
- Grammar corrections
- Prioritized recommendations
- Resume rewrite suggestions
- Cover letter suggestions
- Interview tips

## Report Export

Reports can be downloaded in two formats:

- **Markdown** — Plain text with headers, lists, and formatting
- **HTML** — Styled HTML document with inline CSS

Both formats include the complete analysis with all sections.
