// hooks/useQuestions.ts
import { useState, useEffect } from 'react';
import { apiService, Question } from '../services/apiService';

interface UseQuestionsReturn {
  questions: Question[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useQuestions(): UseQuestionsReturn {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getQuestions();
      setQuestions(data.questions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch questions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return {
    questions,
    loading,
    error,
    refresh: fetchQuestions
  };
}