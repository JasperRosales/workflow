# CV Builder Module

The CV Builder is a full-featured resume creation tool with real-time preview, PDF export, and local persistence.

## Features

- **Two templates**: Modern (centered header, single column) and Classic (serif typography, traditional)
- **8 accent colors**: Slate, Navy, Blue, Teal, Forest, Burgundy, Violet, Coffee
- **Drag-and-drop section ordering** (personal section is locked at top)
- **Real-time preview** with auto-scaling to fit container
- **PDF export** via @react-pdf/renderer
- **Local Storage** auto-save (key: `cv-builder:resume:v1`)
- **Import/Export resume as JSON** (with versioned export format)
- **Sample resume** loader
- **Resume quality checklist** — 13 automated checks

## Components

### `components/resume-builder.tsx`

Main builder component. Manages:
- Section collapse/expand state
- Drag-and-drop reordering
- Template and accent selection
- PDF export
- Import/JSON export
- Reset and sample loading

### `components/builder/toolbar.tsx`

Top toolbar with:
- Template selector (Modern/Classic)
- Accent color picker (8 colors)
- Theme toggle (light/dark)
- Quality checklist button with pass count
- Import/Export JSON buttons
- Sample resume loader
- Reset button
- PDF download button

### `components/builder/checklist-dialog.tsx`

Modal dialog showing 13 quality checks:
- Full name present
- No placeholder text
- Job title matches target role
- Professional email is valid
- Phone number provided
- Location provided
- Skills listed
- Summary written (40+ chars)
- Work experience included
- Achievement bullets used
- Dates included
- Education included
- One-page fit estimate
- Section order effectiveness

### `components/editor/fields.tsx`

Reusable form field components:
- `TextField` — Labeled input with neobrutalism styling
- `TextareaField` — Labeled textarea
- `GridField` — Compact grid input
- `BulletsEditor` — Dynamic bullet list editor (add/remove)
- `EntryCard` — Collapsible card for entries (work, education, etc.)
- `AddEntryButton` — Button to add new entries
- `DragHandle` — Drag handle for section reordering

### `components/editor/sections-core.tsx`

Core resume sections:
- `PersonalSection` — Name, title, email, phone, location, website
- `SummarySection` — Professional summary with tips
- `WorkSection` — Work experience entries with achievements
- `EducationSection` — Education entries with details

### `components/editor/sections-extra.tsx`

Additional resume sections:
- `LeadershipSection` — Leadership and volunteer experience
- `OtherSection` — Custom groups (skills, certifications, languages, links)
- `ProjectsSection` — Projects with tech stack, links, highlights

### `components/resume/preview.tsx`

Live preview component:
- Auto-scales to fit container width
- Supports Modern and Classic templates
- Real-time updates as you type
- A4 page dimensions (794 x 1123 px)

### `components/resume/resume-pdf.tsx`

PDF document component:
- A4 page size
- Modern and Classic variants
- Accent color support
- Used for PDF export via @react-pdf/renderer

## Data Model

See `lib/types.ts` for the complete `ResumeData` interface:

```typescript
interface ResumeData {
  personal: PersonalInfo
  summary: string
  work: WorkEntry[]
  education: EducationEntry[]
  projects: ProjectEntry[]
  leadership: LeadershipEntry[]
  other: OtherGroup[]
}
```

## Persistence

- **Storage Key**: `cv-builder:resume:v1`
- **Format**: JSON with `ResumeState` shape
- **Auto-save**: On every state change
- **Export Format**: Versioned JSON with `app`, `version`, `exportedAt`, `resume` fields
