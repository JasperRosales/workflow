# Core Library Reference

The `lib/` directory contains all core logic, types, and utilities for the Workflow application.

## `types.ts` — Type Definitions

All TypeScript interfaces and types used throughout the app.

### Analysis Types

```typescript
type Severity = "critical" | "warning" | "info"

interface ScoreCategory {
  id: string
  label: string
  score: number
  weight: number
  summary: string
}

interface KeywordMatch {
  keyword: string
  found: boolean
  count: number
  context?: string
}

interface ResumeAnalysis {
  atsScore: number
  overallSummary: string
  scoreBreakdown: ScoreCategory[]
  keywordAnalysis: { matched: KeywordMatch[]; missing: KeywordMatch[] }
  missingSkills: string[]
  formattingIssues: FormattingIssue[]
  grammarIssues: GrammarIssue[]
  recommendations: string[]
  jobMatch?: JobMatchAnalysis
  summaryAnalysis: SummaryAnalysis
  rewriteSuggestions: RewriteSuggestion[]
  coverLetterSuggestions: string[]
  skillGaps: SkillGap[]
  interviewTips: InterviewTip[]
}

interface AnalysisResult {
  analysis: ResumeAnalysis
  resumeText: string
  wordCount: number
  fileName: string
  model: string
  durationMs: number
}
```

### CV Builder Types

```typescript
type SectionKey = "personal" | "summary" | "work" | "education" | "projects" | "leadership" | "other"
type TemplateId = "modern" | "classic"
type AccentId = "slate" | "navy" | "blue" | "teal" | "forest" | "burgundy" | "violet" | "coffee"

interface ResumeData {
  personal: PersonalInfo
  summary: string
  work: WorkEntry[]
  education: EducationEntry[]
  projects: ProjectEntry[]
  leadership: LeadershipEntry[]
  other: OtherGroup[]
}

interface ResumeState {
  data: ResumeData
  config: ResumeConfig
  updatedAt?: number
}
```

## `utils.ts` — Utility Functions

```typescript
function cn(...inputs: ClassValue[]): string
```

Merges Tailwind CSS classes with clsx and tailwind-merge.

## `constants.ts` — Constants

```typescript
const STORAGE_KEY = "cv-builder:resume:v1"
const EXPORT_VERSION = 1
const SECTIONS: Record<SectionKey, { label: string; description: string }>
const TEMPLATES: TemplateDef[]
const ACCENTS: AccentDef[]
const BULLET_PROMPTS: Record<SectionKey, string[]>
```

## `defaults.ts` — Factory Functions

```typescript
function createId(): string
function createEmptyPersonal(): PersonalInfo
function createEmptyWork(): WorkEntry
function createEmptyEducation(): EducationEntry
function createEmptyProject(): ProjectEntry
function createEmptyLeadership(): LeadershipEntry
function createEmptyOtherGroup(): OtherGroup
function createEmptyData(): ResumeData
function defaultConfig(): ResumeConfig
function createEmptyResume(): ResumeState
function createSampleResume(): ResumeState
```

## `storage.ts` — Persistence

```typescript
function loadResume(): ResumeState | null
function saveResume(state: ResumeState): void
function clearResume(): void
function normalizeResume(input: ResumeState): ResumeState
function serializeResume(state: ResumeState): string
function deserializeResume(raw: string): ResumeState
function downloadJson(state: ResumeState, filename?: string): void
function sanitizeFilename(name: string): string
```

## `resume-store.ts` — State Management

External store pattern using `useSyncExternalStore`:

```typescript
function initResumeStore(): void
function getResumeSnapshot(): ResumeState
function getResumeServerSnapshot(): ResumeState
function subscribeResume(listener: () => void): () => void
function updateResume(updater: (prev: ResumeState) => ResumeState): void
function replaceResume(next: ResumeState): void
function resetResume(): void
```

## `checklist.ts` — Quality Checks

```typescript
interface CheckResult {
  id: string
  label: string
  hint?: string
  pass: boolean
}

function runChecks(state: ResumeState): CheckResult[]
function countPassed(checks: CheckResult[]): number
```

13 automated checks for resume quality.

## `format.ts` — Formatting Utilities

```typescript
function formatMonthYear(value: string): string
function formatDateRange(start: string, end: string, current: boolean): string
function formatEducationRange(start: string, end: string, current: boolean): string
function joinNonEmpty(parts: Array<string | undefined>, separator?: string): string
```

## `pdf.ts` — PDF Export

```typescript
async function exportResumeAsPdf(state: ResumeState): Promise<void>
```

Uses dynamic imports for @react-pdf/renderer to reduce initial bundle size.

## `parse.ts` — File Parsing

```typescript
const SUPPORTED_MIME_TYPES: readonly string[]
function isSupportedFileType(mimeType: string): mimeType is ResumeFileType
async function parsePdf(buffer: Buffer): Promise<string>
async function parseDocx(buffer: Buffer): Promise<string>
async function parseResume(buffer: Buffer, fileType: ResumeFileType): Promise<string>
function countWords(text: string): number
function normalizeText(text: string): string
```

## `analyze.ts` — AI Analysis

```typescript
const ANALYSIS_MODEL: string
function parseModelJson(content: string): ResumeAnalysis
function validateAnalysis(raw: ResumeAnalysis): ResumeAnalysis
async function analyzeResume(input: AnalysisInput): Promise<AnalysisResult>
```

## `report.ts` — Report Generation

```typescript
function scoreLabel(score: number): string
function buildReportMarkdown(result: AnalysisResult): string
function buildReportHtml(result: AnalysisResult): string
function sanitizeFileName(fileName: string): string
function analyzeSummary(analysis: ResumeAnalysis): { label: string; color: string }
```
