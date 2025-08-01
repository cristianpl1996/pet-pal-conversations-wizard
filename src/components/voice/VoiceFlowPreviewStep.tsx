
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, Play, MessageSquare, Phone, CheckCircle, Edit, Eye, Sparkles } from 'lucide-react';
import { VoiceFlowStep } from './VoiceFlowStep';

interface VoiceFlowPreviewStepProps {
  onNext: (flowPreview: any) => void;
  onBack: () => void;
  objectives?: any;
  expertMode?: boolean;
  guidedMode?: boolean;
}

export function VoiceFlowPreviewStep({ onNext, onBack, objectives, expertMode, guidedMode }: VoiceFlowPreviewStepProps) {
  const [showManualEditor, setShowManualEditor] = useState(false);
  const [generatedFlow, setGeneratedFlow] = useState(() => generateAutomaticFlow(objectives));

  // Si el usuario activó modo experto o eligió "otro objetivo", mostrar editor manual directamente
  const shouldShowManualEditor = expertMode || objectives?.customObjective || showManualEditor;

  if (shouldShowManualEditor) {
    return (
      <VoiceFlowStep 
        onNext={onNext}
        onBack={onBack}
      />
    );
  }

  const handleNext = () => {
    onNext(generatedFlow);
  };

  const handleManualEdit = () => {
    setShowManualEditor(true);
  };

  const flowBlocks = [
    {
      id: 'greeting',
      title: 'Saludo Inicial',
      icon: Phone,
      description: generatedFlow.greeting,
      color: 'bg-green-500'
    },
    {
      id: 'objectives',
      title: 'Funciones Principales',
      icon: MessageSquare,
      description: generateObjectivesDescription(objectives),
      color: 'bg-blue-500'
    },
    {
      id: 'actions',
      title: 'Acciones Disponibles',
      icon: Play,
      description: generateActionsDescription(objectives),
      color: 'bg-purple-500'
    },
    {
      id: 'closing',
      title: 'Mensaje de Cierre',
      icon: CheckCircle,
      description: generatedFlow.closingMessage,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">✨</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Tu flujo conversacional está listo
        </h2>
        <p className="text-gray-600">
          Hemos generado automáticamente el flujo basado en tus objetivos. 
          Puedes usarlo así o editarlo manualmente.
        </p>
      </div>

      {/* Generated Flow Preview */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-green-600" />
            <span className="text-green-800">Flujo generado automáticamente</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {flowBlocks.map((block, index) => {
              const Icon = block.icon;
              return (
                <div key={block.id} className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${block.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 mb-1">{block.title}</h4>
                    <p className="text-sm text-gray-600">{block.description}</p>
                  </div>
                  {index < flowBlocks.length - 1 && (
                    <ArrowDown className="w-4 h-4 text-gray-400 mt-4" />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Preview Example */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Play className="w-5 h-5 text-blue-600" />
            <span className="text-blue-800">Ejemplo de conversación</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="bg-white p-3 rounded-lg border-l-4 border-green-500">
              <p className="text-sm"><strong>Agente:</strong> {generatedFlow.greeting}</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg border-l-4 border-gray-400">
              <p className="text-sm"><strong>Cliente:</strong> Hola, necesito agendar una cita para mi perro</p>
            </div>
            <div className="bg-white p-3 rounded-lg border-l-4 border-green-500">
              <p className="text-sm"><strong>Agente:</strong> Perfecto, estaré encantado de ayudarte a agendar una cita. ¿Para qué fecha te gustaría programarla?</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Objectives Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Objetivos configurados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {objectives?.selectedObjectives?.map((obj: string, index: number) => (
              <Badge key={index} variant="outline" className="text-sm">
                {getObjectiveLabel(obj)}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="outline"
          onClick={handleManualEdit}
          className="flex items-center space-x-2"
        >
          <Edit className="w-4 h-4" />
          <span>Quiero editar manualmente</span>
        </Button>
        
        <div className="flex-1" />
        
        <Button variant="outline" onClick={onBack}>
          Atrás
        </Button>
        
        <Button
          onClick={handleNext}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Eye className="w-4 h-4 mr-2" />
          Continuar con este flujo
        </Button>
      </div>

      {/* Help Text */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex items-start space-x-3">
          <MessageSquare className="w-5 h-5 text-gray-500 mt-0.5" />
          <div>
            <h4 className="font-medium text-gray-800">¿Cómo funciona esto?</h4>
            <p className="text-sm text-gray-600 mt-1">
              Hemos creado un flujo conversacional inteligente basado en los objetivos que seleccionaste. 
              Tu agente seguirá este flujo naturalmente, adaptándose a cada conversación. 
              Siempre puedes editarlo después desde el panel de administración.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function generateAutomaticFlow(objectives: any) {
  const selectedObjectives = objectives?.selectedObjectives || [];
  
  let greeting = "¡Hola! Hablas con el asistente virtual de tu clínica veterinaria. ";
  let closingMessage = "Gracias por contactarnos. ¡Que tengas un excelente día y cuida mucho a tu mascota!";

  if (selectedObjectives.includes('appointments')) {
    greeting += "Estoy aquí para ayudarte a agendar tu cita y resolver cualquier duda sobre nuestros servicios.";
  } else if (selectedObjectives.includes('general_info')) {
    greeting += "¿En qué puedo ayudarte hoy?";
  } else if (selectedObjectives.includes('products')) {
    greeting += "Puedo ayudarte con información sobre nuestros productos y servicios veterinarios.";
  } else {
    greeting += "¿Cómo puedo asistirte hoy?";
  }

  return {
    greeting,
    closingMessage,
    faqEnabled: true,
    memoryEnabled: true,
    selectedObjectives
  };
}

function generateObjectivesDescription(objectives: any) {
  const selected = objectives?.selectedObjectives || [];
  const descriptions = {
    appointments: "Agendar y confirmar citas",
    general_info: "Responder dudas generales",
    products: "Recomendar productos veterinarios",
    post_surgery: "Dar indicaciones postquirúrgicas",
    emergencies: "Filtrar urgencias",
    transfer: "Redirigir al personal adecuado"
  };

  return selected.map((obj: string) => descriptions[obj as keyof typeof descriptions]).join(", ");
}

function generateActionsDescription(objectives: any) {
  const selected = objectives?.selectedObjectives || [];
  let actions = [];

  if (selected.includes('appointments')) actions.push("Programar citas");
  if (selected.includes('products')) actions.push("Consultar productos");
  if (selected.includes('emergencies')) actions.push("Evaluar urgencias");
  if (selected.includes('transfer')) actions.push("Transferir llamadas");

  return actions.length > 0 ? actions.join(", ") : "Responder consultas y orientar al cliente";
}

function getObjectiveLabel(objective: string) {
  const labels = {
    general_info: "📞 Atender llamadas y dudas generales",
    appointments: "📅 Agendar o confirmar citas",
    products: "💊 Recomendar productos veterinarios",
    post_surgery: "🐶 Dar indicaciones postquirúrgicas",
    emergencies: "🛑 Filtrar urgencias",
    transfer: "👥 Redirigir al personal adecuado"
  };
  
  return labels[objective as keyof typeof labels] || objective;
}
