
import { MessageCircle, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AgentTypeSelectorProps {
  onSelectType: (type: 'whatsapp' | 'voice') => void;
}

export function AgentTypeSelector({ onSelectType }: AgentTypeSelectorProps) {
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

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Podrás cambiar o configurar ambos tipos de agentes más adelante
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
