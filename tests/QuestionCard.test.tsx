// __tests__/QuestionCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { QuestionCard } from '../frontend/components/QuestionCard';

describe('QuestionCard', () => {
  const mockQuestion = {
    id: 'Q1',
    text: 'Test question?',
    type: 'likert' as const,
    scale: ['Option 1', 'Option 2', 'Option 3']
  };

  const mockOnAnswer = jest.fn();

  beforeEach(() => {
    mockOnAnswer.mockClear();
  });

  test('renders question text', () => {
    render(<QuestionCard question={mockQuestion} onAnswer={mockOnAnswer} />);
    expect(screen.getByText('Test question?')).toBeInTheDocument();
  });

  test('renders all scale options for likert type', () => {
    render(<QuestionCard question={mockQuestion} onAnswer={mockOnAnswer} />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  test('calls onAnswer when an option is selected', () => {
    render(<QuestionCard question={mockQuestion} onAnswer={mockOnAnswer} />);
    
    fireEvent.click(screen.getByText('Option 2'));
    expect(mockOnAnswer).toHaveBeenCalledWith(2);
  });

  test('shows initial value as selected', () => {
    render(<QuestionCard question={mockQuestion} onAnswer={mockOnAnswer} initialValue={3} />);
    
    const selectedButton = screen.getByText('Option 3').closest('button');
    expect(selectedButton).toHaveClass('bg-indigo-50');
  });
});