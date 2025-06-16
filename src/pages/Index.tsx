
import { useState } from 'react';
import { StepContainer } from '@/components/StepContainer';
import { ObjectiveStep } from '@/components/ObjectiveStep';
import { KnowledgeStep } from '@/components/KnowledgeStep';
import { BrandsStep } from '@/components/BrandsStep';
import { ConfigStep } from '@/components/ConfigStep';
import { SimulatorStep } from '@/components/SimulatorStep';
import { DeployStep } from '@/components/DeployStep';

interface AppConfig {
  objective?: string;
  knowledge?: any;
  brands?: string[];
  config?: any;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [appConfig, setAppConfig] = useState<AppConfig>({});

  const steps = [
    'Objetivo',
    'Conocimiento', 
    'Marcas',
    'Configuración',
    'Simulador',
    'Despliegue'
  ];

  const updateConfig = (key: keyof AppConfig, value: any) => {
    setAppConfig(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <StepContainer 
            currentStep={currentStep} 
            title="Define el objetivo"
            subtitle="¿Qué quieres que logre tu agente conversacional?"
          >
            <ObjectiveStep 
              onNext={(objective) => {
                updateConfig('objective', objective);
                nextStep();
              }} 
            />
          </StepContainer>
        );

      case 1:
        return (
          <StepContainer 
            currentStep={currentStep} 
            title="Agrega conocimiento"
            subtitle="Enseña a tu agente sobre tu clínica veterinaria"
          >
            <KnowledgeStep 
              onNext={(knowledge) => {
                updateConfig('knowledge', knowledge);
                nextStep();
              }}
              onBack={prevStep}
            />
          </StepContainer>
        );

      case 2:
        return (
          <StepContainer 
            currentStep={currentStep} 
            title="Selecciona marcas"
            subtitle="¿Qué marcas veterinarias manejas en tu clínica?"
          >
            <BrandsStep 
              onNext={(brands) => {
                updateConfig('brands', brands);
                nextStep();
              }}
              onBack={prevStep}
            />
          </StepContainer>
        );

      case 3:
        return (
          <StepContainer 
            currentStep={currentStep} 
            title="Configura el comportamiento"
            subtitle="Define cómo interactuará con tus clientes"
          >
            <ConfigStep 
              onNext={(config) => {
                updateConfig('config', config);
                nextStep();
              }}
              onBack={prevStep}
            />
          </StepContainer>
        );

      case 4:
        return (
          <StepContainer 
            currentStep={currentStep} 
            title="Prueba tu agente"
            subtitle="Simula conversaciones para verificar el funcionamiento"
          >
            <SimulatorStep 
              onNext={nextStep}
              onBack={prevStep}
              config={appConfig}
            />
          </StepContainer>
        );

      case 5:
        return (
          <StepContainer 
            currentStep={currentStep} 
            title="¡Listo para desplegar!"
            subtitle="Revisa la configuración y lanza tu agente"
          >
            <DeployStep 
              onBack={prevStep}
              onEdit={goToStep}
              config={appConfig}
            />
          </StepContainer>
        );

      default:
        return null;
    }
  };

  return renderStep();
};

export default Index;
