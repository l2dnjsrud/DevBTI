// __tests__/useQuestions.test.ts
import { renderHook, act } from '@testing-library/react';
import { useQuestions } from '../frontend/hooks/useQuestions';

// Mock the apiService
jest.mock('../frontend/services/apiService', () => ({
  apiService: {
    getQuestions: jest.fn()
  }
}));

describe('useQuestions', () => {
  const mockGetQuestions = require('../frontend/services/apiService').apiService.getQuestions;

  beforeEach(() => {
    mockGetQuestions.mockClear();
  });

  test('initially has loading state', () => {
    mockGetQuestions.mockResolvedValue({ questions: [] });
    
    const { result } = renderHook(() => useQuestions());
    
    expect(result.current.loading).toBe(true);
    expect(result.current.questions).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  test('fetches questions on mount', async () => {
    const mockQuestions = [
      { id: 'Q1', text: 'Question 1', type: 'likert', category: 'P' }
    ];
    
    mockGetQuestions.mockResolvedValue({ questions: mockQuestions });
    
    const { result } = renderHook(() => useQuestions());
    
    // Wait for the async operation to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.questions).toEqual(mockQuestions);
    expect(result.current.error).toBeNull();
  });

  test('handles error state', async () => {
    mockGetQuestions.mockRejectedValue(new Error('Failed to fetch'));
    
    const { result } = renderHook(() => useQuestions());
    
    // Wait for the async operation to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.questions).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch');
  });

  test('refresh function refetches questions', async () => {
    mockGetQuestions.mockResolvedValue({ questions: [] });
    
    const { result } = renderHook(() => useQuestions());
    
    // Wait for initial fetch
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    // Call refresh
    await act(async () => {
      result.current.refresh();
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(mockGetQuestions).toHaveBeenCalledTimes(2);
  });
});