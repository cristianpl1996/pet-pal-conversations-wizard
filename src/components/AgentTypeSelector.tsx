import { useState } from 'react';
import { MessageCircle, Phone, ArrowRight, Bot, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QuickVoiceCreationModal } from './voice/QuickVoiceCreationModal';

interface AgentTypeSelectorProps {
  onSelectType: (type: 'whatsapp' | 'voice') => void;
  onQuickCreate?: (description: string) => void;
}

export function AgentTypeSelector({ onSelectType, onQuickCreate }: AgentTypeSelectorProps) {
  const [showQuickModal, setShowQuickModal] = useState(false);

  // Mock data for existing agents - in production this would come from a backend
  const existingAgents = [
    { id: 1, name: "Agente WhatsApp Principal", type: "whatsapp", status: "activo" },
    { id: 2, name: "Asistente de Ventas", type: "whatsapp", status: "inactivo" },
  ];

  const createVoiceFromWhatsApp = (agentName: string) => {
    // This would create a voice agent based on WhatsApp configuration
    onSelectType('voice');
  };

  const handleQuickCreate = (description: string) => {
    if (onQuickCreate) {
      onQuickCreate(description);
    } else {
      // Default behavior: go to voice agent creation
      onSelectType('voice');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-6xl mb-6">🤖</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Elige tu tipo de agente
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Configura un agente conversacional inteligente para tu clínica veterinaria
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {/* WhatsApp Agent */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-xl mb-6 mx-auto">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Agente de WhatsApp
              </h2>
              
              <p className="text-gray-600 mb-6 text-center">
                Automatiza conversaciones por texto para agendar citas, 
                responder consultas y vender productos veterinarios.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Respuestas automáticas 24/7</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Agendamiento de citas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Recomendación de productos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Integración con marcas veterinarias</span>
                </div>
              </div>

              <Button 
                onClick={() => onSelectType('whatsapp')}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
              >
                Configurar WhatsApp
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Voice Agent */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-xl mb-6 mx-auto">
                <Phone className="w-8 h-8 text-purple-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Agente de Voz
              </h2>
              
              <p className="text-gray-600 mb-6 text-center">
                Crea un asistente telefónico con IA que puede hablar 
                naturalmente con tus clientes por teléfono.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Conversaciones por voz naturales</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Atención telefónica automática</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Análisis de sentimientos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Grabación y transcripción</span>
                </div>
              </div>

              <Button 
                onClick={() => onSelectType('voice')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg"
              >
                Configurar Voz
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* Quick Create Button */}
          <div className="text-center mb-8">
            <Button 
              onClick={() => setShowQuickModal(true)}
              variant="outline" 
              className="bg-white border-2 border-purple-200 text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Crear agente en 1 clic
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Modo rápido: describe tu objetivo y creamos el agente automáticamente
            </p>
          </div>

          {/* Existing Agents Section */}
          {existingAgents.length > 0 && (
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-blue-500" />
                  <span>¿Ya tienes agentes creados?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  ¿Quieres ahorrar tiempo? Puedes crear un nuevo agente de voz reutilizando el conocimiento y comportamiento de un agente de texto existente.
                </p>
                
                <div className="space-y-3">
                  {existingAgents.map((agent) => (
                    <div key={agent.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${agent.status === 'activo' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <div>
                          <h4 className="font-medium text-gray-800">{agent.name}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge variant={agent.type === 'whatsapp' ? 'default' : 'secondary'}>
                              {agent.type === 'whatsapp' ? 'WhatsApp' : 'Voz'}
                            </Badge>
                            <Badge variant={agent.status === 'activo' ? 'default' : 'secondary'}>
                              {agent.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      {agent.type === 'whatsapp' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => createVoiceFromWhatsApp(agent.name)}
                          className="text-purple-600 border-purple-200 hover:bg-purple-50"
                        >
                          Crear agente de voz basado en este
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Podrás cambiar o configurar ambos tipos de agentes más adelante
            </p>
          </div>
        </div>
      </div>

      <QuickVoiceCreationModal
        open={showQuickModal}
        onOpenChange={setShowQuickModal}
        onCreateAgent={handleQuickCreate}
      />
    </div>
  );
}
