# Architecture

## Overview

Workflow is a Next.js 16 application using the App Router pattern. It combines two major features — a CV Builder and a Resume Analyzer — into a single-page application with tab-based navigation.

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 16.3.4 |
| UI Library | React | 19.2.8 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS | ^4 |
| UI Primitives | Base UI | ^1.6.0 |
| AI | Google Gemini | ^2.15.0 |
| PDF Generation | @react-pdf/renderer | ^4.5.1 |
| File Parsing | pdf-parse, mammoth | ^2.4.5, ^1.12.0 |
| Icons | lucide-react | ^1.28.0 |
| Theme | next-themes | ^0.4.6 |

## Project Structure

```
workflow/
├── app/                        # Next.js App Router
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts        # POST /api/analyze — resume analysis endpoint
│   ├── globals.css             # Global styles (neobrutalism design tokens)
│   ├── layout.tsx              # Root layout with theme provider
│   └── page.tsx                # Main page with tab navigation
├── components/
│   ├── builder/                # CV Builder feature components
│   │   ├── checklist-dialog.tsx
│   │   └── toolbar.tsx
│   ├── editor/                 # Form editors
│   │   ├── fields.tsx          # Reusable form field components
│   │   ├── sections-core.tsx   # Personal, Summary, Work, Education
│   │   └── sections-extra.tsx  # Projects, Leadership, Other
│   ├── resume/                 # Resume rendering
│   │   ├── preview.tsx         # Live preview with auto-scaling
│   │   └── resume-pdf.tsx      # PDF document component
│   ├── ui/                     # Shared UI primitives (shadcn/ui)
│   │   ├── accordion.tsx
│   │   ├── alert.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── progress.tsx
│   │   ├── scroll-area.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── skeleton.tsx
│   │   ├── switch.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   └── tooltip.tsx
│   ├── atssScoreRing.tsx       # Animated SVG score ring
│   ├── results-view.tsx        # Analysis results display
│   ├── resume-analyzer.tsx     # Main analyzer component
│   ├── resume-builder.tsx      # Main builder component
│   ├── theme-provider.tsx      # Theme provider wrapper
│   └── upload-zone.tsx         # Drag & drop file upload
├── lib/                        # Core logic and utilities
│   ├── analyze.ts              # Gemini AI analysis logic
│   ├── checklist.ts            # Resume quality checks (13 checks)
│   ├── constants.ts            # Constants, templates, accents
│   ├── defaults.ts             # Factory functions, sample data
│   ├── format.ts               # Date/text formatting utilities
│   ├── pdf.ts                  # PDF export function
│   ├── parse.ts                # PDF/DOCX text extraction
│   ├── report.ts               # Markdown/HTML report generation
│   ├── resume-store.ts         # External store (useSyncExternalStore)
│   ├── storage.ts              # LocalStorage persistence, JSON import/export
│   ├── types.ts                # TypeScript type definitions
│   └── utils.ts                # Utility functions (cn)
├── types/
│   └── pdfjs-worker.d.ts       # PDF.js worker type declaration
├── docs/                       # Documentation (this folder)
├── .prettierrc.json             # Prettier configuration
├── components.json             # shadcn/ui configuration
├── next.config.ts              # Next.js configuration
├── postcss.config.mjs          # PostCSS configuration
├── tsconfig.json               # TypeScript configuration
└── eslint.config.mjs           # ESLint configuration
```

## Design Patterns

### State Management

The CV Builder uses an **external store pattern** with `useSyncExternalStore`:

- `lib/resume-store.ts` — Singleton store with subscribe/update pattern
- `lib/storage.ts` — LocalStorage persistence layer
- Components subscribe to store changes and re-render on updates

### Component Architecture

- **Server Components** — Layout and page shell
- **Client Components** — All interactive features (builder, analyzer)
- **Dynamic Imports** — Results view is code-split with `next/dynamic`

### Data Flow

```
User Input → Resume Store → LocalStorage (persistence)
                ↓
         Resume Preview (live)
                ↓
         PDF Export / JSON Export

File Upload → API Route → Gemini AI → Analysis Result → Results View
```

## Neobrutalism Design System

The app uses a custom neobrutalism design system built on Tailwind CSS:

- **Borders**: 2px solid `var(--border)` on all interactive elements
- **Shadows**: Offset solid shadows (`4px 4px 0px 0px rgba(0,0,0,1)`)
- **Interactions**: Press-down effect on click (translate + shadow reduction)
- **Typography**: Bold, uppercase, wide tracking
- **Colors**: High contrast light/dark themes via CSS custom properties

See `app/globals.css` for the complete design token definitions.
