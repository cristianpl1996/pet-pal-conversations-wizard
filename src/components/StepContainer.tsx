
import { ReactNode } from 'react';
import { StepIndicator } from './StepIndicator';

interface StepContainerProps {
  children: ReactNode;
  currentStep: number;
  title: string;
  subtitle?: string;
}

const steps = [
  'Objetivo',
  'Conocimiento', 
  'Marcas',
  'Configuración',
  'Simulador',
  'Despliegue'
];

export function StepContainer({ children, currentStep, title, subtitle }: StepContainerProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
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
