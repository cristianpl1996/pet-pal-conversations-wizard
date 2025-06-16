
import { useState } from 'react';
import { Mail, Phone, FileSpreadsheet, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface ConfigStepProps {
  onNext: (config: any) => void;
  onBack: () => void;
}

const dataChannels = [
  {
    id: 'email',
    title: 'Correo electrónico',
    description: 'Recibe resúmenes diarios por email',
    icon: Mail,
    color: 'bg-blue-500'
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp',
    description: 'Notificaciones instantáneas por WhatsApp',
    icon: Phone,
    color: 'bg-green-500'
  },
  {
    id: 'sheets',
    title: 'Google Sheets',
    description: 'Todo se guarda automáticamente en una hoja de cálculo',
    icon: FileSpreadsheet,
    color: 'bg-purple-500'
  }
];

const fallbackActions = [
  {
    id: 'retry',
    title: 'Reintentar con pregunta diferente',
    description: 'El agente reformula la pregunta para entender mejor'
  },
  {
    id: 'human',
    title: 'Ofrecer contacto humano',
    description: 'Proporciona número de teléfono o info de contacto'
  },
  {
    id: 'polite',
    title: 'Finalizar amablemente',
    description: 'Se despide de forma cordial y profesional'
  }
];

export function ConfigStep({ onNext, onBack }: ConfigStepProps) {
  const [greeting, setGreeting] = useState('');
  const [tone, setTone] = useState('');
  const [dataChannel, setDataChannel] = useState('sheets');
  const [contactInfo, setContactInfo] = useState('');
  const [fallbackAction, setFallbackAction] = useState('polite');

  const handleNext = () => {
    const config = {
      greeting,
      tone,
      dataChannel,
      contactInfo,
      fallbackAction
    };
    onNext(config);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">⚙️</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Configura el comportamiento
        </h2>
        <p className="text-gray-600">
          Define cómo interactuará el agente con tus clientes
        </p>
      </div>

      {/* Saludo personalizado */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Saludo personalizado (opcional)
        </label>
        <Textarea
          value={greeting}
          onChange={(e) => setGreeting(e.target.value)}
          placeholder="¡Hola! Soy el asistente virtual de [Nombre de tu clínica]. ¿En qué puedo ayudarte hoy?"
          className="min-h-20"
        />
      </div>

      {/* Tono de voz */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Tono de voz
        </label>
        <div className="grid grid-cols-3 gap-3">
          {['Formal', 'Amigable', 'Casual'].map((toneOption) => (
            <button
              key={toneOption}
              onClick={() => setTone(toneOption)}
              className={`p-3 rounded-lg border transition-all duration-200 ${
                tone === toneOption
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {toneOption}
            </button>
          ))}
        </div>
      </div>

      {/* Canal de datos */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          ¿Dónde quieres recibir la información capturada?
        </label>
        <div className="space-y-3">
          {dataChannels.map((channel) => {
            const Icon = channel.icon;
            return (
              <div
                key={channel.id}
                onClick={() => setDataChannel(channel.id)}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  dataChannel === channel.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${channel.color} text-white`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{channel.title}</h3>
                    <p className="text-sm text-gray-600">{channel.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {(dataChannel === 'email' || dataChannel === 'whatsapp') && (
          <Input
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            placeholder={dataChannel === 'email' ? 'tu@email.com' : '+52 123 456 7890'}
            type={dataChannel === 'email' ? 'email' : 'tel'}
          />
        )}
      </div>

      {/* Acción de respaldo */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          ¿Qué hacer si el agente no entiende? (opcional)
        </label>
        <div className="space-y-3">
          {fallbackActions.map((action) => (
            <div
              key={action.id}
              onClick={() => setFallbackAction(action.id)}
              className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                fallbackAction === action.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  fallbackAction === action.id ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                }`} />
                <div>
                  <h4 className="font-medium text-gray-800">{action.title}</h4>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nota sobre actualizaciones futuras */}
      <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
        <div className="flex items-start space-x-3">
          <div className="text-cyan-500">🔄</div>
          <div>
            <h4 className="font-medium text-cyan-800">Tranquilidad total</h4>
            <p className="text-sm text-cyan-700">
              Puedes actualizar el conocimiento de tu agente en cualquier momento después del despliegue.
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
          className="bg-blue-500 hover:bg-blue-600"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
