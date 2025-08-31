# Custom Hooks

This document describes the custom hooks available in the Dev Personality Test application.

## useQuestions

A hook for fetching and managing test questions.

### Usage

```tsx
import { useQuestions } from '../hooks/useQuestions';

function TestPage() {
  const { questions, loading, error, refresh } = useQuestions();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {questions.map(question => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </div>
  );
}
```

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| questions | `Question[]` | Array of questions |
| loading | `boolean` | Whether questions are being fetched |
| error | `string \| null` | Error message if fetching failed |
| refresh | `() => void` | Function to refetch questions |

## useTest

A hook for managing test state and submission.

### Usage

```tsx
import { useTest } from '../hooks/useTest';

function TestPage() {
  const { answers, currentQuestionIndex, setAnswer, submitTest } = useTest(questions);
  
  const handleAnswer = (value: number | string) => {
    setAnswer(questions[currentQuestionIndex].id, value);
  };
  
  const handleSubmit = async () => {
    const result = await submitTest('user-id');
    // Handle result
  };
  
  return (
    <QuestionCard 
      question={questions[currentQuestionIndex]} 
      onAnswer={handleAnswer}
    />
  );
}
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| questions | `Question[]` | Array of questions for the test |

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| answers | `{ [key: string]: number \| string }` | Object mapping question IDs to answers |
| currentQuestionIndex | `number` | Index of the current question |
| setCurrentQuestionIndex | `(index: number) => void` | Function to set the current question index |
| setAnswer | `(questionId: string, value: number \| string) => void` | Function to set an answer |
| submitTest | `(userId: string, meta?: object) => Promise<Result \| null>` | Function to submit the test |
| submitting | `boolean` | Whether the test is being submitted |
| submitError | `string \| null` | Error message if submission failed |