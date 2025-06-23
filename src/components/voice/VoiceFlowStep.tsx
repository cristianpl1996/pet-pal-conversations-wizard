import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowDown, Play, MessageSquare, Phone, CheckCircle, Sparkles, Zap } from 'lucide-react';

interface VoiceFlowStepProps {
  onNext: (flow: any) => void;
  onBack: () => void;
}

export function VoiceFlowStep({ onNext, onBack }: VoiceFlowStepProps) {
  const [greeting, setGreeting] = useState('');
  const [faqEnabled, setFaqEnabled] = useState(true);
  const [memoryEnabled, setMemoryEnabled] = useState(true);
  const [closingMessage, setClosingMessage] = useState('');
  const [quickObjective, setQuickObjective] = useState('');
  const [showQuickModal, setShowQuickModal] = useState(false);

  const handleNext = () => {
    const flow = {
      greeting,
      faqEnabled,
      memoryEnabled,
      closingMessage
    };
    onNext(flow);
  };

  const generateQuickFlow = () => {
    // This would generate flow based on objective
    const generatedFlow = {
      greeting: `¡Hola! Hablas con el asistente virtual de tu clínica veterinaria. ${quickObjective.includes('citas') ? 'Estoy aquí para ayudarte a agendar tu cita' : 'Estoy aquí para ayudarte'}.`,
      closingMessage: "Gracias por contactarnos. ¡Que tengas un excelente día y cuida mucho a tu mascota!"
    };
    
    setGreeting(generatedFlow.greeting);
    setClosingMessage(generatedFlow.closingMessage);
    setShowQuickModal(false);
  };

  const flowBlocks = [
    {
      id: 'greeting',
      title: 'Saludo Inicial',
      icon: Phone,
      description: 'Primera impresión al contestar',
      color: 'bg-green-500'
    },
    {
      id: 'faq',
      title: 'Preguntas Frecuentes',
      icon: MessageSquare,
      description: 'Respuestas automáticas a consultas comunes',
      color: 'bg-blue-500'
    },
    {
      id: 'actions',
      title: 'Acciones',
      icon: Play,
      description: 'Agendar, consultar, transferir',
      color: 'bg-purple-500'
    },
    {
      id: 'closing',
      title: 'Cierre',
      icon: CheckCircle,
      description: 'Despedida y próximos pasos',
      color: 'bg-orange-500'
    }
  ];

  const suggestedGreetings = [
    "¡Hola! Hablas con el asistente virtual de Clínica Veterinaria [Nombre]. ¿En qué puedo ayudarte hoy?",
    "Buenos días, gracias por llamar a [Nombre Clínica]. Soy tu asistente virtual. ¿Cómo puedo asistirte?",
    "¡Hola! Bienvenido a [Nombre Clínica]. Estoy aquí para ayudarte con cualquier consulta sobre tu mascota."
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🔄</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Diseña el flujo conversacional
        </h2>
        <p className="text-gray-600">
          Puedes diseñar el flujo paso a paso o decirnos el objetivo de tu agente, y nosotros lo configuramos por ti en segundos.
        </p>
      </div>

      {/* Quick Generation Section */}
      <Card className="border-purple-200 bg-purple-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h3 className="font-medium text-purple-800">Generación rápida por objetivo</h3>
            </div>
            <Dialog open={showQuickModal} onOpenChange={setShowQuickModal}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-100">
                  <Zap className="w-4 h-4 mr-2" />
                  Generar automáticamente
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Describe el objetivo de tu agente</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="quickObjective">¿Qué quieres que haga tu agente?</Label>
                    <Textarea
                      id="quickObjective"
                      value={quickObjective}
                      onChange={(e) => setQuickObjective(e.target.value)}
                      placeholder="Ej. Quiero que atienda llamadas para agendar citas y explicar servicios"
                      className="resize-none"
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowQuickModal(false)}>
                      Cancelar
                    </Button>
                    <Button 
                      onClick={generateQuickFlow}
                      disabled={!quickObjective.trim()}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Generar flujo
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <p className="text-sm text-purple-700">
            Ahorra tiempo: describe lo que quieres lograr y generamos el flujo conversacional automáticamente.
          </p>
        </CardContent>
      </Card>

      {/* Visual Flow Builder */}
      <div className="bg-gray-50 p-6 rounded-xl">
        <h3 className="font-semibold text-gray-800 mb-4">Vista del flujo</h3>
        <div className="space-y-4">
          {flowBlocks.map((block, index) => {
            const Icon = block.icon;
            return (
              <div key={block.id} className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${block.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{block.title}</h4>
                  <p className="text-sm text-gray-600">{block.description}</p>
                </div>
                {index < flowBlocks.length - 1 && (
                  <ArrowDown className="w-4 h-4 text-gray-400" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Configuración del saludo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Phone className="w-5 h-5 text-green-500" />
            <span>Saludo inicial</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="greeting">Mensaje de bienvenida</Label>
            <Textarea
              id="greeting"
              value={greeting}
              onChange={(e) => setGreeting(e.target.value)}
              placeholder="Ej: ¡Hola! Hablas con el asistente de Clínica..."
              className="resize-none"
              rows={3}
            />
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Plantillas sugeridas:</p>
            <div className="space-y-2">
              {suggestedGreetings.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setGreeting(suggestion)}
                  className="text-left h-auto p-3 whitespace-normal w-full"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuraciones adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Preguntas frecuentes</Label>
                <p className="text-sm text-gray-500">Respuestas automáticas a consultas comunes</p>
              </div>
              <Switch
                checked={faqEnabled}
                onCheckedChange={setFaqEnabled}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Memoria conversacional</Label>
                <p className="text-sm text-gray-500">Mantener contexto durante la llamada</p>
              </div>
              <Switch
                checked={memoryEnabled}
                onCheckedChange={setMemoryEnabled}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mensaje de cierre */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-orange-500" />
            <span>Mensaje de cierre</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="closing">Despedida</Label>
            <Textarea
              id="closing"
              value={closingMessage}
              onChange={(e) => setClosingMessage(e.target.value)}
              placeholder="Ej: Gracias por contactarnos. ¡Que tengas un excelente día!"
              className="resize-none"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <Play className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-800">Vista previa del flujo</h4>
            <p className="text-sm text-blue-700 mt-1">
              Una vez configurado, tu agente seguirá este flujo en cada llamada, 
              adaptándose naturalmente a las necesidades del cliente.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Atrás
        </Button>
        <Button
          onClick={handleNext}
          className="bg-purple-600 hover:bg-purple-700"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
