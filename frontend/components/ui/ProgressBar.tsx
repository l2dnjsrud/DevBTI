interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export function ProgressBar({ current, total, className = '' }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);
  
  return (
    <div className={className}>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-indigo-600">
          질문 {current} / {total}
        </span>
        <span className="text-sm font-medium text-indigo-600">
          {percentage}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  )
}