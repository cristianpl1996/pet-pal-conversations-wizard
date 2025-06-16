
import { useState } from 'react';
import { MessageCircle, Send, Calendar, ShoppingCart, Hospital } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SimulatorStepProps {
  onNext: () => void;
  onBack: () => void;
  config: any;
}

const quickTests = [
  {
    id: 'product',
    title: 'Producto',
    description: 'Pregunta sobre un alimento para perros',
    message: 'Hola, ¿qué alimento me recomiendan para un perro adulto?',
    icon: ShoppingCart
  },
  {
    id: 'appointment',
    title: 'Cita',
    description: 'Solicita agendar una consulta',
    message: 'Necesito agendar una cita para mi gato, ¿tienen disponibilidad mañana?',
    icon: Calendar
  },
  {
    id: 'hospitalization',
    title: 'Hospitalización',
    description: 'Pregunta sobre una mascota hospitalizada',
    message: 'Quiero saber cómo está mi perro que dejé hospitalizado ayer',
    icon: Hospital
  }
];

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

export function SimulatorStep({ onNext, onBack, config }: SimulatorStepProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const generateAgentResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Saludo personalizado
    if (messages.length === 0 && config.greeting) {
      return config.greeting;
    }
    
    // Respuestas simuladas basadas en el objetivo
    if (lowerMessage.includes('alimento') || lowerMessage.includes('comida')) {
      return 'Tenemos varias opciones excelentes de alimento. ¿Para qué tipo de mascota y qué edad tiene?';
    }
    
    if (lowerMessage.includes('cita') || lowerMessage.includes('agendar')) {
      return 'Claro, puedo ayudarte a agendar una cita. ¿Qué tipo de consulta necesitas y cuál es tu preferencia de horario?';
    }
    
    if (lowerMessage.includes('hospitalizado') || lowerMessage.includes('hospital')) {
      return 'Entiendo tu preocupación. Para consultar el estado de tu mascota hospitalizada, necesito verificar algunos datos. ¿Podrías darme el nombre de la mascota y la fecha de ingreso?';
    }
    
    return 'Gracias por tu mensaje. ¿Podrías darme más detalles para poder ayudarte mejor?';
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Agregar mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simular typing delay
    setTimeout(() => {
      const agentResponse = generateAgentResponse(text);
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: agentResponse,
        sender: 'agent',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const useQuickTest = (test: any) => {
    sendMessage(test.message);
  };

  const resetChat = () => {
    setMessages([]);
    if (config.greeting) {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: config.greeting,
        sender: 'agent',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  };

  // Inicializar con saludo si existe
  useState(() => {
    if (config.greeting && messages.length === 0) {
      resetChat();
    }
  });

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🧪</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Prueba tu agente
        </h2>
        <p className="text-gray-600">
          Simula conversaciones para verificar que funciona como esperas
        </p>
      </div>

      {/* Pruebas rápidas */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Pruebas rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {quickTests.map((test) => {
            const Icon = test.icon;
            return (
              <button
                key={test.id}
                onClick={() => useQuickTest(test)}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Icon className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">{test.title}</span>
                </div>
                <p className="text-sm text-gray-600">{test.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Simulador de chat */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MessageCircle className="w-5 h-5 text-green-500" />
            <span className="font-medium">Simulador WhatsApp</span>
          </div>
          <Button variant="outline" size="sm" onClick={resetChat}>
            Reiniciar
          </Button>
        </div>

        <div className="h-80 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-75 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-200 px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(currentMessage)}
            />
            <Button
              onClick={() => sendMessage(currentMessage)}
              size="sm"
              className="px-3"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Atrás
        </Button>
        <Button
          onClick={onNext}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Continuar al resumen
        </Button>
      </div>
    </div>
  );
}
