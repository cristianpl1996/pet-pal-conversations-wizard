
import { ReactNode } from 'react';
import { StepIndicator } from './StepIndicator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StepContainerProps {
  children: ReactNode;
  currentStep: number;
  title: string;
  subtitle?: string;
  steps: string[];
  onBack?: () => void;
}

export function StepContainer({ children, currentStep, title, subtitle, steps, onBack }: StepContainerProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {onBack && (
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Cambiar tipo de agente
            </Button>
          </div>
        )}
        
        <StepIndicator steps={steps} currentStep={currentStep} />
        
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
            {subtitle && (
              <p className="text-gray-600 text-lg">{subtitle}</p>
            )}
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
