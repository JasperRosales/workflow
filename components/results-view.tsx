"use client"

import {
  Briefcase,
  CircleCheck,
  CircleX,
  Clock,
  FileText,
  Gauge,
  Info,
  Languages,
  ListChecks,
  MessageSquare,
  PenLine,
  Quote,
  Sparkles,
  Target,
  TriangleAlert,
  UserRound,
  Wrench,
} from "lucide-react"

import type { AnalysisResult } from "@/lib/types"
import { analyzeSummary, scoreLabel } from "@/lib/report"
import { cn } from "@/lib/utils"

import { AtsScoreRing } from "@/components/ats-score-ring"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Progress,
  ProgressIndicator,
  ProgressTrack,
} from "@/components/ui/progress"

function SectionCard({
  icon: Icon,
  title,
  description,
  children,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Card className={cn("scroll-mt-24", className)}>
      <CardHeader>
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center border-2 border-foreground bg-primary/10 text-primary">
            <Icon className="size-4" />
          </span>
          <CardTitle>{title}</CardTitle>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-3">{children}</CardContent>
    </Card>
  )
}

function EmptyState({ text }: { text: string }) {
  return <p className="text-sm text-muted-foreground">{text}</p>
}

export function ResultsView({ result }: { result: AnalysisResult }) {
  const { analysis } = result
  const summary = analyzeSummary(analysis)

  const matchedCount = analysis.keywordAnalysis.matched.length
  const missingCount = analysis.keywordAnalysis.missing.length

  return (
    <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-2">
      <Card className="xl:col-span-2">
        <CardContent className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <AtsScoreRing score={analysis.atsScore} />
            <Badge
              variant={
                summary.color === "green"
                  ? "default"
                  : summary.color === "amber"
                    ? "secondary"
                    : "destructive"
              }
            >
              {summary.label}
            </Badge>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div>
              <h2 className="font-heading text-lg font-bold tracking-wide uppercase">
                ATS Compatibility Score
              </h2>
              <p className="text-sm text-muted-foreground">
                {result.fileName} - {result.wordCount} words - {result.model} -{" "}
                {(result.durationMs / 1000).toFixed(1)}s
              </p>
            </div>
            <p className="text-sm leading-relaxed text-pretty">
              {analysis.overallSummary}
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="gap-1">
                <FileText className="size-3" /> {matchedCount + missingCount}{" "}
                keywords
              </Badge>
              <Badge variant="outline" className="gap-1">
                <CircleCheck className="size-3 text-emerald-500" />{" "}
                {matchedCount} matched
              </Badge>
              <Badge variant="outline" className="gap-1">
                <CircleX className="size-3 text-red-500" /> {missingCount}{" "}
                missing
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <SectionCard icon={Gauge} title="Score Breakdown">
        {analysis.scoreBreakdown.length === 0 && (
          <EmptyState text="No breakdown available." />
        )}
        {analysis.scoreBreakdown.map((category) => (
          <div key={category.id} className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm font-bold">{category.label}</span>
              <span className="text-sm text-muted-foreground tabular-nums">
                {category.score}/100 - {Math.round(category.weight * 100)}%
              </span>
            </div>
            <Progress value={category.score} max={100}>
              <ProgressTrack>
                <ProgressIndicator
                  className={
                    category.score >= 80
                      ? "bg-emerald-500"
                      : category.score >= 60
                        ? "bg-amber-500"
                        : "bg-red-500"
                  }
                />
              </ProgressTrack>
            </Progress>
            {category.summary && (
              <p className="text-xs text-muted-foreground">
                {category.summary}
              </p>
            )}
          </div>
        ))}
      </SectionCard>

      {analysis.jobMatch && (
        <SectionCard
          icon={Target}
          title="Job Description Match"
          description="How well your resume aligns with the job description you provided."
        >
          <div className="flex flex-col gap-2 border-2 border-foreground/10 bg-muted/50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">Overall match</span>
              <Badge variant="outline">{analysis.jobMatch.matchPercent}%</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {analysis.jobMatch.note}
            </p>
          </div>
          {analysis.jobMatch.strengths.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <p className="text-xs font-bold tracking-wide text-muted-foreground uppercase">
                Strengths
              </p>
              {analysis.jobMatch.strengths.map((s, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <CircleCheck className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          )}
          {analysis.jobMatch.gaps.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <p className="text-xs font-bold tracking-wide text-muted-foreground uppercase">
                Gaps
              </p>
              {analysis.jobMatch.gaps.map((g, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <CircleX className="mt-0.5 size-4 shrink-0 text-red-500" />
                  <span>{g}</span>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      )}

      <SectionCard
        icon={ListChecks}
        title="Keyword Analysis"
        description="Keywords an ATS looks for, and whether they appear in your resume."
      >
        <div className="flex flex-col gap-3">
          {analysis.keywordAnalysis.matched.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-bold tracking-wide text-muted-foreground uppercase">
                Found ({matchedCount})
              </p>
              <div className="flex flex-wrap gap-2">
                {analysis.keywordAnalysis.matched.map((k) => (
                  <Badge
                    key={k.keyword}
                    variant="secondary"
                    className="gap-1 text-emerald-700 dark:text-emerald-400"
                  >
                    <CircleCheck className="size-3" />
                    {k.keyword}
                    {k.count > 1 && (
                      <span className="text-muted-foreground">x{k.count}</span>
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {analysis.keywordAnalysis.missing.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-bold tracking-wide text-muted-foreground uppercase">
                Missing ({missingCount})
              </p>
              <div className="flex flex-wrap gap-2">
                {analysis.keywordAnalysis.missing.map((k) => (
                  <Badge
                    key={k.keyword}
                    variant="outline"
                    className="gap-1 text-red-700 dark:text-red-400"
                  >
                    <CircleX className="size-3" />
                    {k.keyword}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {matchedCount === 0 && missingCount === 0 && (
            <EmptyState text="No keywords identified." />
          )}
        </div>
      </SectionCard>

      <SectionCard
        icon={Wrench}
        title="Missing Skills & Skill Gaps"
        description="Skills employers expect that your resume does not mention."
      >
        {analysis.missingSkills.length === 0 &&
          analysis.skillGaps.length === 0 && (
            <EmptyState text="No missing skills detected." />
          )}
        {analysis.missingSkills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {analysis.missingSkills.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="text-amber-700 dark:text-amber-400"
              >
                {skill}
              </Badge>
            ))}
          </div>
        )}
        {analysis.skillGaps.length > 0 && (
          <div className="mt-1 flex flex-col gap-2">
            {analysis.skillGaps.map((gap) => (
              <div
                key={gap.skill}
                className="flex flex-col gap-1 border-2 border-foreground/10 bg-muted/50 p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold">{gap.skill}</span>
                  <Badge
                    variant={
                      gap.priority === "high"
                        ? "destructive"
                        : gap.priority === "medium"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {gap.priority}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {gap.howToAcquire}
                </p>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard
        icon={Sparkles}
        title="Formatting Suggestions"
        description="Issues that can trip up an ATS or recruiters."
      >
        {analysis.formattingIssues.length === 0 && (
          <EmptyState text="No formatting issues found." />
        )}
        {analysis.formattingIssues.map((issue, i) => (
          <div
            key={i}
            className="flex flex-col gap-1 border-2 border-foreground/10 bg-muted/50 p-3"
          >
            <div className="flex items-center gap-2">
              {issue.severity === "critical" ? (
                <TriangleAlert className="size-4 shrink-0 text-red-500" />
              ) : issue.severity === "warning" ? (
                <TriangleAlert className="size-4 shrink-0 text-amber-500" />
              ) : (
                <Info className="size-4 shrink-0 text-muted-foreground" />
              )}
              <span className="text-sm font-bold">{issue.issue}</span>
            </div>
            <p className="text-xs text-muted-foreground">{issue.suggestion}</p>
          </div>
        ))}
      </SectionCard>

      <SectionCard
        icon={Languages}
        title="Grammar & Spelling"
        description="Language mistakes to fix before you apply."
      >
        {analysis.grammarIssues.length === 0 && (
          <EmptyState text="No grammar or spelling issues found. Great job!" />
        )}
        {analysis.grammarIssues.map((issue, i) => (
          <div
            key={i}
            className="flex flex-col gap-1 border-2 border-foreground/10 bg-muted/50 p-3"
          >
            <p className="text-sm">
              <span className="text-red-600 line-through dark:text-red-400">
                {issue.original}
              </span>
              {" -> "}
              <span className="font-bold text-emerald-700 dark:text-emerald-400">
                {issue.correction}
              </span>
            </p>
            {issue.suggestion && (
              <p className="text-xs text-muted-foreground">
                {issue.suggestion}
              </p>
            )}
          </div>
        ))}
      </SectionCard>

      <SectionCard
        icon={Quote}
        title="Resume Summary Analysis"
        description="Assessment of your professional summary or objective."
      >
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {scoreLabel(analysis.summaryAnalysis.score)}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {analysis.summaryAnalysis.score}/100
          </span>
        </div>
        {analysis.summaryAnalysis.feedback.length === 0 && (
          <EmptyState text="No feedback available." />
        )}
        {analysis.summaryAnalysis.feedback.map((f, i) => (
          <div key={i} className="flex items-start gap-2 text-sm">
            <CircleCheck className="mt-0.5 size-4 shrink-0 text-emerald-500" />
            <span>{f}</span>
          </div>
        ))}
      </SectionCard>

      <SectionCard
        icon={ListChecks}
        title="Recommended Actions"
        description="Prioritized improvements ranked by impact."
      >
        {analysis.recommendations.length === 0 && (
          <EmptyState text="No recommendations available." />
        )}
        <ol className="flex flex-col gap-2">
          {analysis.recommendations.map((recommendation, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="flex size-5 shrink-0 items-center justify-center border-2 border-foreground bg-primary/10 text-xs font-bold text-primary">
                {i + 1}
              </span>
              <span className="text-pretty">{recommendation}</span>
            </li>
          ))}
        </ol>
      </SectionCard>

      {analysis.rewriteSuggestions.length > 0 && (
        <SectionCard
          icon={PenLine}
          title="Resume Rewrite Suggestions"
          description="Before and after improvements for your strongest selling points."
        >
          {analysis.rewriteSuggestions.map((rewrite, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 border-2 border-foreground/10 bg-muted/50 p-3"
            >
              <p className="text-xs font-bold tracking-wide text-muted-foreground uppercase">
                {rewrite.section}
              </p>
              {rewrite.original && (
                <p className="border-2 border-destructive/30 bg-card p-2 text-sm text-red-700 dark:text-red-400">
                  {rewrite.original}
                </p>
              )}
              {rewrite.suggested && (
                <p className="border-2 border-emerald-500/30 bg-card p-2 text-sm text-emerald-700 dark:text-emerald-400">
                  {rewrite.suggested}
                </p>
              )}
              {rewrite.rationale && (
                <p className="text-xs text-muted-foreground">
                  {rewrite.rationale}
                </p>
              )}
            </div>
          ))}
        </SectionCard>
      )}

      {analysis.coverLetterSuggestions.length > 0 && (
        <SectionCard
          icon={MessageSquare}
          title="Cover Letter Suggestions"
          description="Talking points you can carry into your cover letter."
        >
          {analysis.coverLetterSuggestions.map((suggestion, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <CircleCheck className="mt-0.5 size-4 shrink-0 text-emerald-500" />
              <span className="text-pretty">{suggestion}</span>
            </div>
          ))}
        </SectionCard>
      )}

      {analysis.interviewTips.length > 0 && (
        <SectionCard
          icon={UserRound}
          title="Interview Preparation Tips"
          description="Likely questions based on your resume, and how to answer them."
        >
          {analysis.interviewTips.map((tip, i) => (
            <div
              key={i}
              className="flex flex-col gap-1 border-2 border-foreground/10 bg-muted/50 p-3"
            >
              <p className="flex items-start gap-2 text-sm font-bold">
                <Briefcase className="mt-0.5 size-4 shrink-0 text-primary" />
                {tip.question}
              </p>
              {tip.why && (
                <p className="text-xs text-muted-foreground">Why: {tip.why}</p>
              )}
              {tip.advice && (
                <p className="text-xs text-muted-foreground">
                  Advice: {tip.advice}
                </p>
              )}
            </div>
          ))}
        </SectionCard>
      )}

      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground xl:col-span-2">
        <Clock className="size-3" />
        Your file and this report are processed in memory only and never stored.
      </p>
    </div>
  )
}
