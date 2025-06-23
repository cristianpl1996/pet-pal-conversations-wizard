
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Volume2, Mic, Settings, Play } from 'lucide-react';

interface VoiceConfigStepProps {
  onNext: (voiceSettings: any) => void;
  onBack: () => void;
}

export function VoiceConfigStep({ onNext, onBack }: VoiceConfigStepProps) {
  const [ttsProvider, setTtsProvider] = useState('');
  const [voiceType, setVoiceType] = useState('');
  const [voiceLanguage, setVoiceLanguage] = useState('');
  const [voiceSpeed, setVoiceSpeed] = useState([1.0]);
  const [sttProvider, setSttProvider] = useState('');
  const [fallbackEnabled, setFallbackEnabled] = useState(true);

  const handleNext = () => {
    const voiceSettings = {
      ttsProvider,
      voiceType,
      voiceLanguage,
      voiceSpeed: voiceSpeed[0],
      sttProvider,
      fallbackEnabled
    };
    onNext(voiceSettings);
  };

  const isValid = () => {
    return ttsProvider && voiceType && sttProvider;
  };

  const voiceTypes = [
    { id: 'natural', name: 'Voz Natural', description: 'Sonido humano y cálido' },
    { id: 'professional', name: 'Voz Profesional', description: 'Formal y clara' },
    { id: 'empathetic', name: 'Voz Empática', description: 'Comprensiva y suave' },
    { id: 'technical', name: 'Voz Técnica', description: 'Precisa y directa' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🎵</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Configura la voz de tu agente
        </h2>
        <p className="text-gray-600">
          Personaliza cómo suena y entiende tu asistente virtual
        </p>
      </div>

      {/* Text-to-Speech Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Volume2 className="w-5 h-5 text-blue-500" />
            <span>Síntesis de Voz (TTS)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ttsProvider">Proveedor de voz *</Label>
              <Select value={ttsProvider} onValueChange={setTtsProvider}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona proveedor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="elevenlabs">ElevenLabs (Recomendado)</SelectItem>
                  <SelectItem value="openai">OpenAI TTS</SelectItem>
                  <SelectItem value="google">Google Cloud TTS</SelectItem>
                  <SelectItem value="azure">Azure Cognitive Services</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="voiceLanguage">Idioma de la voz *</Label>
              <Select value={voiceLanguage} onValueChange={setVoiceLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es-ES">Español (España)</SelectItem>
                  <SelectItem value="es-MX">Español (México)</SelectItem>
                  <SelectItem value="es-AR">Español (Argentina)</SelectItem>
                  <SelectItem value="en-US">Inglés (Estados Unidos)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Tipo de voz *</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              {voiceTypes.map((voice) => (
                <div
                  key={voice.id}
                  onClick={() => setVoiceType(voice.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    voiceType === voice.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h4 className="font-medium text-gray-800">{voice.name}</h4>
                  <p className="text-sm text-gray-600">{voice.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Velocidad de voz</Label>
            <div className="mt-2 space-y-2">
              <Slider
                value={voiceSpeed}
                onValueChange={setVoiceSpeed}
                max={2}
                min={0.5}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Lenta (0.5x)</span>
                <span>Normal ({voiceSpeed[0]}x)</span>
                <span>Rápida (2x)</span>
              </div>
            </div>
          </div>

          {ttsProvider === 'elevenlabs' && (
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-start space-x-3">
                <Play className="w-5 h-5 text-purple-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-purple-800">Vista previa disponible</h4>
                  <p className="text-sm text-purple-700 mt-1">
                    Con ElevenLabs podrás escuchar cómo sonará tu agente antes de activarlo.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Speech-to-Text Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mic className="w-5 h-5 text-green-500" />
            <span>Reconocimiento de Voz (STT)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="sttProvider">Proveedor de reconocimiento *</Label>
            <Select value={sttProvider} onValueChange={setSttProvider}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona proveedor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deepgram">Deepgram (Recomendado)</SelectItem>
                <SelectItem value="whisper">OpenAI Whisper</SelectItem>
                <SelectItem value="google">Google Cloud STT</SelectItem>
                <SelectItem value="azure">Azure Speech</SelectItem>
              </SelectContent>
            </Select>
            {sttProvider === 'deepgram' && (
              <p className="text-sm text-gray-500 mt-1">
                Excelente para español y tiempo real
              </p>
            )}
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex items-start space-x-3">
              <Settings className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800">Fallback automático</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Si el reconocimiento de voz falla, el agente leerá un texto predefinido 
                  para mantener la conversación fluida.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Section */}
      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <div className="flex items-start space-x-3">
          <Volume2 className="w-5 h-5 text-green-500 mt-0.5" />
          <div>
            <h4 className="font-medium text-green-800">Configuración completada</h4>
            <p className="text-sm text-green-700 mt-1">
              Tu agente podrá hablar y escuchar con la configuración seleccionada. 
              Más adelante podrás probar cómo suena en el simulador.
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
          disabled={!isValid()}
          className="bg-purple-600 hover:bg-purple-700"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
