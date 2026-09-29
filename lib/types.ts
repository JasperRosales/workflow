export type Severity = "critical" | "warning" | "info"

export interface ScoreCategory {
  id: string
  label: string
  score: number
  weight: number
  summary: string
}

export interface KeywordMatch {
  keyword: string
  found: boolean
  count: number
  context?: string
}

export interface FormattingIssue {
  severity: Severity
  issue: string
  suggestion: string
}

export interface GrammarIssue {
  original: string
  correction: string
  suggestion: string
}

export interface JobMatchAnalysis {
  matchPercent: number
  strengths: string[]
  gaps: string[]
  note: string
}

export interface SummaryAnalysis {
  quality: "excellent" | "good" | "fair" | "poor"
  score: number
  feedback: string[]
}

export interface RewriteSuggestion {
  section: string
  original: string
  suggested: string
  rationale: string
}

export interface SkillGap {
  skill: string
  priority: "high" | "medium" | "low"
  howToAcquire: string
}

export interface InterviewTip {
  question: string
  why: string
  advice: string
}

export interface ResumeAnalysis {
  atsScore: number
  overallSummary: string
  scoreBreakdown: ScoreCategory[]
  keywordAnalysis: {
    matched: KeywordMatch[]
    missing: KeywordMatch[]
  }
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

export interface AnalysisInput {
  resumeText: string
  jobDescription?: string
  fileName: string
}

export interface AnalysisResult {
  analysis: ResumeAnalysis
  resumeText: string
  wordCount: number
  fileName: string
  model: string
  durationMs: number
}

export type SectionKey =
  | "personal"
  | "summary"
  | "work"
  | "education"
  | "projects"
  | "leadership"
  | "other"

export interface PersonalInfo {
  fullName: string
  jobTitle: string
  email: string
  phone: string
  location: string
  website: string
}

export interface WorkEntry {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  bullets: string[]
}

export interface EducationEntry {
  id: string
  school: string
  degree: string
  fieldOfStudy: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  details: string
}

export interface ProjectEntry {
  id: string
  name: string
  link: string
  techStack: string
  description: string
  bullets: string[]
}

export interface LeadershipEntry {
  id: string
  organization: string
  role: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  bullets: string[]
}

export interface OtherGroup {
  id: string
  label: string
  values: string[]
}

export interface ResumeData {
  personal: PersonalInfo
  summary: string
  work: WorkEntry[]
  education: EducationEntry[]
  projects: ProjectEntry[]
  leadership: LeadershipEntry[]
  other: OtherGroup[]
}

export type TemplateId = "modern" | "classic"

export type AccentId =
  | "slate"
  | "navy"
  | "blue"
  | "teal"
  | "forest"
  | "burgundy"
  | "violet"
  | "coffee"

export interface ResumeConfig {
  template: TemplateId
  accent: AccentId
  sectionOrder: SectionKey[]
}

export interface ResumeState {
  data: ResumeData
  config: ResumeConfig
  updatedAt?: number
}

export interface TemplateDef {
  id: TemplateId
  label: string
  description: string
}

export interface AccentDef {
  id: AccentId
  label: string
  color: string
}
