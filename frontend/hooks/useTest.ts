// hooks/useTest.ts
import { useState, useCallback } from 'react';
import { Question, SubmitData, Result, apiService } from '../services/apiService';

interface UseTestReturn {
  answers: { [key: string]: number | string };
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  setAnswer: (questionId: string, value: number | string) => void;
  submitTest: (userId: string, meta?: SubmitData['meta']) => Promise<Result | null>;
  submitting: boolean;
  submitError: string | null;
}

export function useTest(questions: Question[]): UseTestReturn {
  const [answers, setAnswers] = useState<{ [key: string]: number | string }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const setAnswer = useCallback((questionId: string, value: number | string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  }, []);

  const submitTest = useCallback(async (userId: string, meta?: SubmitData['meta']): Promise<Result | null> => {
    try {
      setSubmitting(true);
      setSubmitError(null);
      
      const submitData: SubmitData = {
        userId,
        answers: Object.entries(answers).map(([id, value]) => ({ id, value })),
        meta
      };
      
      const result = await apiService.submitAnswers(submitData);
      return result;
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to submit test');
      return null;
    } finally {
      setSubmitting(false);
    }
  }, [answers]);

  return {
    answers,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    setAnswer,
    submitTest,
    submitting,
    submitError
  };
}