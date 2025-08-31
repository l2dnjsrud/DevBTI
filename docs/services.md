# Services

This document describes the service layer in the Dev Personality Test application.

## apiService

The API service provides functions for communicating with the backend.

### Usage

```tsx
import { apiService } from '../services/apiService';

// Get questions
const { questions } = await apiService.getQuestions();

// Submit answers
const result = await apiService.submitAnswers({
  userId: 'user-id',
  answers: [{ id: 'Q1', value: 4 }],
  meta: { role: 'backend', experience: 'junior' }
});
```

### Functions

#### getQuestions

Fetches the list of questions for the test.

```ts
getQuestions(): Promise<{ questions: Question[] }>
```

#### submitAnswers

Submits the user's answers and returns the calculated results.

```ts
submitAnswers(data: SubmitData): Promise<Result>
```

### Types

#### Question

```ts
interface Question {
  id: string;
  text: string;
  type: 'likert' | 'sjt';
  scale?: string[];
  options?: string[];
  category: string;
}
```

#### SubmitData

```ts
interface SubmitData {
  userId: string;
  answers: { id: string; value: number | string }[];
  meta?: {
    role?: string;
    experience?: string;
  };
}
```

#### Result

```ts
interface Result {
  score: {
    C: number;
    P: number;
    A: number;
    L: number;
    M: number;
    total: number;
  };
  archetype: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}
```