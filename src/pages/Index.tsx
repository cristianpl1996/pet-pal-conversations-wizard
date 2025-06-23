import { useState } from 'react';
import { StepContainer } from '@/components/StepContainer';
import { AgentTypeSelector } from '@/components/AgentTypeSelector';
import { ObjectiveStep } from '@/components/ObjectiveStep';
import { KnowledgeStep } from '@/components/KnowledgeStep';
import { BrandsStep } from '@/components/BrandsStep';
import { ConfigStep } from '@/components/ConfigStep';
import { SimulatorStep } from '@/components/SimulatorStep';
import { DeployStep } from '@/components/DeployStep';

// Voice Agent Steps
import { VoiceBasicConfigStep } from '@/components/voice/VoiceBasicConfigStep';
import { VoiceFlowStep } from '@/components/voice/VoiceFlowStep';
import { VoiceConfigStep } from '@/components/voice/VoiceConfigStep';
import { VoiceKnowledgeStep } from '@/components/voice/VoiceKnowledgeStep';
import { VoiceProvidersStep } from '@/components/voice/VoiceProvidersStep';
import { VoicePhoneStep } from '@/components/voice/VoicePhoneStep';
import { VoiceCallLogsStep } from '@/components/voice/VoiceCallLogsStep';

interface AppConfig {
  objective?: string;
  clinicType?: string;
  knowledge?: any;
  brands?: string[];
  config?: any;
}

interface VoiceConfig {
  basicConfig?: any;
  flow?: any;
  voiceSettings?: any;
  knowledge?: any;
  providers?: any;
  phone?: any;
  callLogs?: any;
}

const Index = () => {
  const [agentType, setAgentType] = useState<'whatsapp' | 'voice' | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [appConfig, setAppConfig] = useState<AppConfig>({});
  const [voiceConfig, setVoiceConfig] = useState<VoiceConfig>({});

  const whatsappSteps = [
    'Objetivo',
    'Conocimiento', 
    'Marcas',
    'Configuración',
    'Simulador',
    'Despliegue'
  ];

  const voiceSteps = [
    'Configuración Básica',
    'Flujo Conversacional',
    'Configuración de Voz',
    'Conocimiento',
    'Proveedores',
    'Configuración Telefónica',
    'Registro de Llamadas'
  ];

  const updateConfig = (key: keyof AppConfig, value: any) => {
    setAppConfig(prev => ({ ...prev, [key]: value }));
  };

  const updateVoiceConfig = (key: keyof VoiceConfig, value: any) => {
    setVoiceConfig(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    const maxSteps = agentType === 'voice' ? voiceSteps.length - 1 : whatsappSteps.length - 1;
    setCurrentStep(prev => Math.min(prev + 1, maxSteps));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const resetFlow = () => {
    setAgentType(null);
    setCurrentStep(0);
    setAppConfig({});
    setVoiceConfig({});
  };

  // Agent Type Selection
  if (!agentType) {
    return <AgentTypeSelector onSelectType={setAgentType} />;
  }

  // WhatsApp Agent Flow
  if (agentType === 'whatsapp') {
    const renderWhatsAppStep = () => {
      switch (currentStep) {
        case 0:
          return (
            <StepContainer 
              currentStep={currentStep} 
              title="Define el objetivo"
              subtitle="¿Qué quieres que logre tu agente conversacional?"
              steps={whatsappSteps}
              onBack={resetFlow}
            >
              <ObjectiveStep 
                onNext={(objective, clinicType) => {
                  updateConfig('objective', objective);
                  updateConfig('clinicType', clinicType);
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
              steps={whatsappSteps}
              onBack={resetFlow}
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
              steps={whatsappSteps}
              onBack={resetFlow}
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
              steps={whatsappSteps}
              onBack={resetFlow}
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
              steps={whatsappSteps}
              onBack={resetFlow}
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
              steps={whatsappSteps}
              onBack={resetFlow}
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

    return renderWhatsAppStep();
  }

  // Voice Agent Flow
  if (agentType === 'voice') {
    const renderVoiceStep = () => {
      switch (currentStep) {
        case 0:
          return (
            <StepContainer 
              currentStep={currentStep} 
              title="Configuración Básica"
              subtitle="Define los parámetros principales de tu agente de voz"
              steps={voiceSteps}
              onBack={resetFlow}
            >
              <VoiceBasicConfigStep 
                onNext={(config) => {
                  updateVoiceConfig('basicConfig', config);
                  nextStep();
                }}
              />
            </StepContainer>
          );

        case 1:
          return (
            <StepContainer 
              currentStep={currentStep} 
              title="Flujo Conversacional"
              subtitle="Diseña cómo interactuará tu agente con los clientes"
              steps={voiceSteps}
              onBack={resetFlow}
            >
              <VoiceFlowStep 
                onNext={(flow) => {
                  updateVoiceConfig('flow', flow);
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
              title="Configuración de Voz"
              subtitle="Personaliza la voz y reconocimiento de audio"
              steps={voiceSteps}
              onBack={resetFlow}
            >
              <VoiceConfigStep 
                onNext={(voiceSettings) => {
                  updateVoiceConfig('voiceSettings', voiceSettings);
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
              title="Integración de Conocimiento"
              subtitle="Conecta el conocimiento de tu clínica y marcas"
              steps={voiceSteps}
              onBack={resetFlow}
            >
              <VoiceKnowledgeStep 
                onNext={(knowledge) => {
                  updateVoiceConfig('knowledge', knowledge);
                  nextStep();
                }}
                onBack={prevStep}
                existingBrands={appConfig.brands}
              />
            </StepContainer>
          );

        case 4:
          return (
            <StepContainer 
              currentStep={currentStep} 
              title="Proveedores y APIs"
              subtitle="Configura las conexiones con servicios de IA y voz"
              steps={voiceSteps}
              onBack={resetFlow}
            >
              <VoiceProvidersStep 
                onNext={(providers) => {
                  updateVoiceConfig('providers', providers);
                  nextStep();
                }}
                onBack={prevStep}
              />
            </StepContainer>
          );

        case 5:
          return (
            <StepContainer 
              currentStep={currentStep} 
              title="Configuración Telefónica"
              subtitle="Configura el número y opciones de llamada"
              steps={voiceSteps}
              onBack={resetFlow}
            >
              <VoicePhoneStep 
                onNext={(phone) => {
                  updateVoiceConfig('phone', phone);
                  nextStep();
                }}
                onBack={prevStep}
              />
            </StepContainer>
          );

        case 6:
          return (
            <StepContainer 
              currentStep={currentStep} 
              title="Registro de Llamadas"
              subtitle="Monitorea y analiza las conversaciones de tu agente"
              steps={voiceSteps}
              onBack={resetFlow}
            >
              <VoiceCallLogsStep 
                onBack={prevStep}
                config={voiceConfig}
              />
            </StepContainer>
          );

        default:
          return null;
      }
    };

    return renderVoiceStep();
  }

  return null;
};

export default Index;
