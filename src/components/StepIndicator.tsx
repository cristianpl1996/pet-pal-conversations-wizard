
interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function StepIndicator({ steps = [], currentStep }: StepIndicatorProps) {
  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index <= currentStep 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {index + 1}
            </div>
            <span className={`ml-2 text-sm ${
              index <= currentStep ? 'text-purple-600' : 'text-gray-500'
            }`}>
              {step}
            </span>
            {index < steps.length - 1 && (
              <div className={`ml-4 w-8 h-0.5 ${
                index < currentStep ? 'bg-purple-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
