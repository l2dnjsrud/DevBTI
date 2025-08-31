import { useState } from 'react';

interface QuestionCardProps {
  question: {
    id: string;
    text: string;
    type: 'likert' | 'sjt';
    scale?: string[];
    options?: string[];
  };
  onAnswer: (value: number | string) => void;
  initialValue?: number | string;
}

export function QuestionCard({ question, onAnswer, initialValue }: QuestionCardProps) {
  const [selectedValue, setSelectedValue] = useState<number | string | undefined>(initialValue);
  
  const handleSelect = (value: number | string) => {
    setSelectedValue(value);
    onAnswer(value);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {question.text}
      </h2>
      
      <div className="space-y-3">
        {question.type === 'likert' && question.scale?.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index + 1)}
            className={`w-full text-left p-4 rounded-lg border transition duration-200 ${
              selectedValue === index + 1 
                ? 'border-indigo-500 bg-indigo-50' 
                : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
            }`}
          >
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full border mr-4 flex items-center justify-center ${
                selectedValue === index + 1 ? 'border-indigo-500' : 'border-gray-300'
              }`}>
                {selectedValue === index + 1 && (
                  <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
                )}
              </div>
              <span className="text-gray-800">{option}</span>
            </div>
          </button>
        ))}
        
        {question.type === 'sjt' && question.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(option)}
            className={`w-full text-left p-4 rounded-lg border transition duration-200 ${
              selectedValue === option 
                ? 'border-indigo-500 bg-indigo-50' 
                : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
            }`}
          >
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full border mr-4 flex items-center justify-center ${
                selectedValue === option ? 'border-indigo-500' : 'border-gray-300'
              }`}>
                {selectedValue === option && (
                  <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
                )}
              </div>
              <span className="text-gray-800">{option}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}