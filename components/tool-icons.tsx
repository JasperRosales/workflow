import * as React from "react"

type IconProps = React.SVGProps<SVGSVGElement>

export function CvBuilderIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <defs>
        <linearGradient id="cvb-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fde68a" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <path d="M10 6h18l10 10v26H10z" fill="#b45309" transform="translate(2,2)" />
      <path d="M10 6h18l10 10v26H10z" fill="url(#cvb-front)" stroke="#7c2d12" strokeWidth="2" />
      <path d="M28 6l10 10H28z" fill="#fff7ed" stroke="#7c2d12" strokeWidth="2" />
      <path d="M16 22h16M16 29h16M16 36h10" stroke="#7c2d12" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function AnalyzerIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <defs>
        <linearGradient id="ana-lens" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a7f3d0" />
          <stop offset="1" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <rect x="6" y="8" width="24" height="30" rx="2" fill="#065f46" transform="translate(2,2)" />
      <rect x="6" y="8" width="24" height="30" rx="2" fill="#ecfdf5" stroke="#065f46" strokeWidth="2" />
      <path d="M11 15h14M11 21h14M11 27h9" stroke="#065f46" strokeWidth="2" strokeLinecap="round" />
      <circle cx="30" cy="28" r="9" fill="url(#ana-lens)" stroke="#064e3b" strokeWidth="2.5" />
      <circle cx="27" cy="25" r="2.5" fill="#ffffff" opacity="0.8" />
      <path d="M36 35l7 7" stroke="#064e3b" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

export function DetectorIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <defs>
        <linearGradient id="det-brain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c4b5fd" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <path
        d="M24 40c-8 0-14-5.4-14-12.5C10 21 13.5 15 20 15c1-3.5 4-5 6-3 3-2 7 .5 7 5 4 2 7 6.5 7 11C40 34.6 33 40 24 40z"
        fill="#5b21b6"
        transform="translate(2,2)"
      />
      <path
        d="M24 40c-8 0-14-5.4-14-12.5C10 21 13.5 15 20 15c1-3.5 4-5 6-3 3-2 7 .5 7 5 4 2 7 6.5 7 11C40 34.6 33 40 24 40z"
        fill="url(#det-brain)"
        stroke="#4c1d95"
        strokeWidth="2"
      />
      <path d="M24 14v24M17 20c2 1 3 3 3 5M31 20c-2 1-3 3-3 5" stroke="#4c1d95" strokeWidth="2" strokeLinecap="round" />
      <circle cx="17" cy="30" r="2" fill="#4c1d95" />
      <circle cx="31" cy="30" r="2" fill="#4c1d95" />
    </svg>
  )
}

export function ParaphraserIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <defs>
        <linearGradient id="par-arrow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#93c5fd" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <path d="M10 18a14 14 0 0 1 24-6l4 4" stroke="#1e3a8a" strokeWidth="6" strokeLinecap="round" transform="translate(1.5,1.5)" />
      <path d="M10 18a14 14 0 0 1 24-6l4 4" stroke="url(#par-arrow)" strokeWidth="6" strokeLinecap="round" />
      <path d="M38 12a14 14 0 0 1-24 6l-4-4" stroke="#1e3a8a" strokeWidth="6" strokeLinecap="round" transform="translate(1.5,1.5)" />
      <path d="M38 12a14 14 0 0 1-24 6l-4-4" stroke="url(#par-arrow)" strokeWidth="6" strokeLinecap="round" />
      <path d="M40 4v8h-8" stroke="#1e3a8a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 44v-8h8" stroke="#1e3a8a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CitationIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <defs>
        <linearGradient id="cit-book" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fda4af" />
          <stop offset="1" stopColor="#f43f5e" />
        </linearGradient>
      </defs>
      <path d="M10 8h24a2 2 0 0 1 2 2v30H12a2 2 0 0 1-2-2z" fill="#9f1239" transform="translate(2,2)" />
      <path d="M10 8h24a2 2 0 0 1 2 2v30H12a2 2 0 0 1-2-2z" fill="url(#cit-book)" stroke="#881337" strokeWidth="2" />
      <path d="M16 8v34" stroke="#881337" strokeWidth="2" />
      <path d="M24 16h8M24 22h8" stroke="#881337" strokeWidth="2" strokeLinecap="round" />
      <path d="M28 40V28l4 4 4-4v12z" fill="#fff1f2" stroke="#881337" strokeWidth="1.5" />
    </svg>
  )
}

export function EssayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <defs>
        <linearGradient id="pen-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#67e8f9" />
          <stop offset="1" stopColor="#0891b2" />
        </linearGradient>
      </defs>
      <path d="M30 6l12 12L20 40l-14 4 4-14z" fill="#155e75" transform="translate(2,2)" />
      <path d="M30 6l12 12L20 40l-14 4 4-14z" fill="url(#pen-body)" stroke="#164e63" strokeWidth="2" />
      <path d="M26 10l12 12" stroke="#164e63" strokeWidth="2" />
      <path d="M6 44l4-14 10 10z" fill="#fef3c7" stroke="#164e63" strokeWidth="2" />
      <path d="M9 41l2-6 4 4z" fill="#164e63" />
    </svg>
  )
}

export function PdfIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <defs>
        <linearGradient id="pdf-doc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fdba74" />
          <stop offset="1" stopColor="#f97316" />
        </linearGradient>
      </defs>
      <path d="M10 4h18l12 12v28H10z" fill="#7c2d12" transform="translate(2,2)" />
      <path d="M10 4h18l12 12v28H10z" fill="url(#pdf-doc)" stroke="#9a3412" strokeWidth="2" />
      <path d="M28 4l12 12H28z" fill="#fff7ed" stroke="#9a3412" strokeWidth="2" />
      <rect x="14" y="26" width="20" height="10" rx="2" fill="#fff7ed" stroke="#9a3412" strokeWidth="2" />
      <text x="24" y="34" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#9a3412">PDF</text>
    </svg>
  )
}

export function GrammarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <defs>
        <linearGradient id="gram-badge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5eead4" />
          <stop offset="1" stopColor="#14b8a6" />
        </linearGradient>
      </defs>
      <path
        d="M24 4l16 6v12c0 10-6.5 17.5-16 22C14.5 39.5 8 32 8 22V10z"
        fill="#134e4a"
        transform="translate(2,2)"
      />
      <path
        d="M24 4l16 6v12c0 10-6.5 17.5-16 22C14.5 39.5 8 32 8 22V10z"
        fill="url(#gram-badge)"
        stroke="#115e59"
        strokeWidth="2"
      />
      <path d="M16 23l6 6 11-12" stroke="#134e4a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

export function SummarizerIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <defs>
        <linearGradient id="wand-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f9a8d4" />
          <stop offset="1" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <path d="M8 40L30 18" stroke="#831843" strokeWidth="7" strokeLinecap="round" transform="translate(1.5,1.5)" />
      <path d="M8 40L30 18" stroke="url(#wand-body)" strokeWidth="7" strokeLinecap="round" />
      <path d="M33 4l2.2 5.3L41 11l-5 4.2L38 21l-5.8-3.4L26 21l2-5.8L24 11l5.8-1.7z" fill="#fbcfe8" stroke="#be185d" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2" fill="#ec4899" />
      <circle cx="40" cy="30" r="2" fill="#ec4899" />
      <circle cx="20" cy="6" r="1.5" fill="#f472b6" />
    </svg>
  )
}
