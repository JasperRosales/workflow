# API Reference

## POST /api/analyze

Analyzes an uploaded resume file using Google Gemini AI and returns a comprehensive ATS compatibility report.

### Request

**Method**: `POST`
**Content-Type**: `multipart/form-data`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | File | Yes | Resume file (PDF or DOCX, max 10 MB) |
| `jobDescription` | string | No | Job description for tailored analysis |

### Response

**Status**: `200 OK`
**Content-Type**: `application/json`

```json
{
  "analysis": {
    "atsScore": 72,
    "overallSummary": "2-3 sentence overview of resume quality",
    "scoreBreakdown": [
      {
        "id": "formatting",
        "label": "Formatting",
        "score": 80,
        "weight": 0.2,
        "summary": "Category summary"
      }
    ],
    "keywordAnalysis": {
      "matched": [{ "keyword": "React", "found": true, "count": 3, "context": "..." }],
      "missing": [{ "keyword": "TypeScript", "found": false, "count": 0, "context": "" }]
    },
    "missingSkills": ["Skill 1", "Skill 2"],
    "formattingIssues": [
      { "severity": "warning", "issue": "...", "suggestion": "..." }
    ],
    "grammarIssues": [
      { "original": "...", "correction": "...", "suggestion": "..." }
    ],
    "recommendations": ["Action 1", "Action 2"],
    "jobMatch": {
      "matchPercent": 65,
      "strengths": ["..."],
      "gaps": ["..."],
      "note": "..."
    },
    "summaryAnalysis": {
      "quality": "good",
      "score": 70,
      "feedback": ["..."]
    },
    "rewriteSuggestions": [
      { "section": "...", "original": "...", "suggested": "...", "rationale": "..." }
    ],
    "coverLetterSuggestions": ["..."],
    "skillGaps": [
      { "skill": "...", "priority": "high", "howToAcquire": "..." }
    ],
    "interviewTips": [
      { "question": "...", "why": "...", "advice": "..." }
    ]
  },
  "resumeText": "Extracted resume text",
  "wordCount": 450,
  "fileName": "resume.pdf",
  "model": "gemini-3.6-flash",
  "durationMs": 3200
}
```

### Error Responses

| Status | Error | Description |
|--------|-------|-------------|
| `400` | `No file provided` | Request missing file field |
| `400` | `Unsupported file type` | File is not PDF or DOCX |
| `400` | `The uploaded file is empty` | File has zero bytes |
| `400` | `File is too large` | File exceeds 10 MB limit |
| `400` | `Could not extract text` | File contains no readable text |
| `500` | `GEMINI_API_KEY is not configured` | Server missing API key |
| `500` | `Analysis failed` | Generic server error |

### Example Usage

```bash
curl -X POST http://localhost:3000/api/analyze \
  -F "file=@resume.pdf" \
  -F "jobDescription=Senior Frontend Engineer role..."
```

```typescript
const formData = new FormData()
formData.append("file", file)
formData.append("jobDescription", jobDescription)

const response = await fetch("/api/analyze", {
  method: "POST",
  body: formData,
})

const result = await response.json()
```
