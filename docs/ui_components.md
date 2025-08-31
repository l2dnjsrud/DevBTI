# UI Component Library

This document describes the reusable UI components available in the Dev Personality Test application.

## Button

A versatile button component with multiple variants and sizes.

### Usage

```tsx
import { Button } from '../components/ui/Button';

<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `primary` \| `secondary` \| `danger` | `primary` | The visual style of the button |
| size | `sm` \| `md` \| `lg` | `md` | The size of the button |
| onClick | `() => void` | - | Click handler |
| children | `ReactNode` | - | Button content |
| disabled | `boolean` | `false` | Whether the button is disabled |
| className | `string` | - | Additional CSS classes |

## Card

A container component for grouping related content.

### Usage

```tsx
import { Card } from '../components/ui/Card';

<Card title="Section Title" actions={<button>Edit</button>}>
  <p>Card content</p>
</Card>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | `string` | - | Card title |
| children | `ReactNode` | - | Card content |
| actions | `ReactNode` | - | Action elements in the header |
| className | `string` | - | Additional CSS classes |

## ProgressBar

A progress indicator component.

### Usage

```tsx
import { ProgressBar } from '../components/ui/ProgressBar';

<ProgressBar current={3} total={10} />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| current | `number` | - | Current progress value |
| total | `number` | - | Total progress value |
| className | `string` | - | Additional CSS classes |

## QuestionCard

A specialized card for displaying test questions.

### Usage

```tsx
import { QuestionCard } from '../components/QuestionCard';

<QuestionCard 
  question={question} 
  onAnswer={handleAnswer}
  initialValue={selectedValue}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| question | `Question` | - | The question object to display |
| onAnswer | `(value: number \| string) => void` | - | Callback when an answer is selected |
| initialValue | `number \| string` | - | Initially selected value |