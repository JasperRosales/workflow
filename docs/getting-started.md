# Getting Started

## Prerequisites

- **Node.js** 20+
- **npm** or **yarn**
- **Google Gemini API key** (for resume analysis)

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.6-flash
```

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GEMINI_API_KEY` | Yes | — | Google Gemini API key for AI analysis |
| `GEMINI_MODEL` | No | `gemini-3.6-flash` | Model to use for analysis |

## Running the App

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production

```bash
npm run build
npm start
```

### Other Commands

| Command | Description |
|---------|-------------|
| `npm run lint` | Run ESLint |
| `npm run format` | Format all files with Prettier |
| `npm run typecheck` | Run TypeScript type checking |

## Using the App

### CV Builder

1. Navigate to the **CV Builder** tab
2. Fill in your personal details, summary, work experience, education, projects, and skills
3. Choose a template (Modern or Classic) and accent color
4. Drag sections to reorder them
5. Click **Download PDF** to export your resume
6. Use **Export JSON** to save your resume data for later

### Resume Analyzer

1. Navigate to the **Resume Analyzer** tab
2. Upload a PDF or DOCX resume (drag & drop or browse)
3. Optionally paste a job description for tailored analysis
4. Click **Analyze Resume**
5. Review the ATS score, keyword analysis, and recommendations
6. Download the report as Markdown or HTML
