// services/apiService.ts
export interface Question {
  id: string;
  text: string;
  type: 'likert' | 'sjt';
  scale?: string[];
  options?: string[];
  category: string;
}

export interface SubmitData {
  userId: string;
  answers: { id: string; value: number | string }[];
  meta?: {
    role?: string;
    experience?: string;
  };
}

export interface Result {
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

export const apiService = {
  async getQuestions(): Promise<{ questions: Question[] }> {
    const response = await fetch('/api/questions');
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }
    return response.json();
  },

  async submitAnswers(data: SubmitData): Promise<Result> {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit answers');
    }
    
    return response.json();
  }
};