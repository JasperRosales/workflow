# Components Reference

## UI Components (`components/ui/`)

All UI components follow the neobrutalism design system with bold borders, offset shadows, and press-down interactions.

### Button

```tsx
import { Button } from "@/components/ui/button"

<Button variant="default" size="md">Click me</Button>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `default` \| `destructive` \| `outline` \| `secondary` \| `ghost` \| `link` | `default` | Visual style |
| `size` | `default` \| `sm` \| `lg` \| `icon` \| `icon-sm` \| `icon-xs` | `default` | Button size |
| `asChild` | `boolean` | `false` | Render as child component |

### Card

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Input

```tsx
import { Input } from "@/components/ui/input"

<Input type="text" placeholder="Enter text..." />
```

### Textarea

```tsx
import { Textarea } from "@/components/ui/textarea"

<Textarea rows={5} placeholder="Enter text..." />
```

### Badge

```tsx
import { Badge } from "@/components/ui/badge"

<Badge variant="default">Label</Badge>
```

| Variant | Description |
|---------|-------------|
| `default` | Solid foreground background |
| `secondary` | Muted background |
| `destructive` | Red background |
| `outline` | Transparent with border |

### Dialog

```tsx
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog"

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    <DialogFooter>Actions</DialogFooter>
  </DialogContent>
</Dialog>
```

### Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

### Select

```tsx
import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem
} from "@/components/ui/select"

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
  </SelectContent>
</Select>
```

### Checkbox

```tsx
import { Checkbox } from "@/components/ui/checkbox"

<Checkbox checked={checked} onCheckedChange={setChecked} />
```

### Switch

```tsx
import { Switch } from "@/components/ui/switch"

<Switch checked={checked} onCheckedChange={setChecked} />
```

### Progress

```tsx
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress"

<Progress value={50}>
  <ProgressTrack>
    <ProgressIndicator className="bg-emerald-500" />
  </ProgressTrack>
</Progress>
```

### Tooltip

```tsx
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

<Tooltip>
  <TooltipTrigger>Hover me</TooltipTrigger>
  <TooltipContent>Tooltip content</TooltipContent>
</Tooltip>
```

### Skeleton

```tsx
import { Skeleton } from "@/components/ui/skeleton"

<Skeleton className="h-4 w-full" />
```

### Separator

```tsx
import { Separator } from "@/components/ui/separator"

<Separator orientation="horizontal" />
```

### ScrollArea

```tsx
import { ScrollArea } from "@/components/ui/scroll-area"

<ScrollArea className="h-72 w-full">
  Content
</ScrollArea>
```

### Accordion

```tsx
import {
  Accordion, AccordionItem,
  AccordionTrigger, AccordionContent
} from "@/components/ui/accordion"

<Accordion>
  <AccordionItem value="item1">
    <AccordionTrigger>Trigger</AccordionTrigger>
    <AccordionContent>Content</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Alert

```tsx
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>
```

## Feature Components

### ResumeBuilder

Main CV builder component. No props — manages its own state via the resume store.

```tsx
import { ResumeBuilder } from "@/components/resume-builder"

<ResumeBuilder />
```

### ResumeAnalyzer

Main resume analyzer component. No props — manages its own state.

```tsx
import { ResumeAnalyzer } from "@/components/resume-analyzer"

<ResumeAnalyzer />
```

### UploadZone

Drag & drop file upload for resume files.

```tsx
import { UploadZone } from "@/components/upload-zone"

<UploadZone file={file} onFileChange={setFile} disabled={false} />
```

| Prop | Type | Description |
|------|------|-------------|
| `file` | `File \| null` | Currently selected file |
| `onFileChange` | `(file: File \| null) => void` | File selection callback |
| `disabled` | `boolean` | Disable interaction |

### AtsScoreRing

Animated circular progress ring for ATS scores.

```tsx
import { AtsScoreRing } from "@/components/ats-score-ring"

<AtsScoreRing score={75} size={180} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `score` | `number` | — | Score value (0-100) |
| `size` | `number` | `180` | Ring diameter in pixels |

### ResultsView

Displays the complete analysis results.

```tsx
import { ResultsView } from "@/components/results-view"

<ResultsView result={analysisResult} />
```

| Prop | Type | Description |
|------|------|-------------|
| `result` | `AnalysisResult` | Analysis result from API |
