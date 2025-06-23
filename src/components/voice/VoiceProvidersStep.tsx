
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, CheckCircle, AlertCircle, Brain, Volume2, Mic, Phone } from 'lucide-react';

interface VoiceProvidersStepProps {
  onNext: (providers: any) => void;
  onBack: () => void;
}

export function VoiceProvidersStep({ onNext, onBack }: VoiceProvidersStepProps) {
  const [llmApiKey, setLlmApiKey] = useState('');
  const [ttsApiKey, setTtsApiKey] = useState('');
  const [sttApiKey, setSttApiKey] = useState('');
  const [phoneApiKey, setPhoneApiKey] = useState('');
  const [showKeys, setShowKeys] = useState({
    llm: false,
    tts: false,
    stt: false,
    phone: false
  });
  const [validations, setValidations] = useState({
    llm: null as boolean | null,
    tts: null as boolean | null,
    stt: null as boolean | null,
    phone: null as boolean | null
  });

  const handleValidation = async (type: string, apiKey: string) => {
    // Simulación de validación - en producción esto haría una llamada real a la API
    setTimeout(() => {
      setValidations(prev => ({
        ...prev,
        [type]: apiKey.length > 10 // Validación simple para demo
      }));
    }, 1000);
  };

  const toggleShowKey = (type: keyof typeof showKeys) => {
    setShowKeys(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const handleNext = () => {
    const providers = {
      llm: { apiKey: llmApiKey, validated: validations.llm },
      tts: { apiKey: ttsApiKey, validated: validations.tts },
      stt: { apiKey: sttApiKey, validated: validations.stt },
      phone: { apiKey: phoneApiKey, validated: validations.phone }
    };
    onNext(providers);
  };

  const isValid = () => {
    return llmApiKey && ttsApiKey && sttApiKey;
  };

  const ApiKeyInput = ({ 
    label, 
    value, 
    onChange, 
    type, 
    placeholder, 
    description 
  }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type: keyof typeof showKeys;
    placeholder: string;
    description: string;
  }) => (
    <div className="space-y-2">
      <Label>{label} *</Label>
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Input
            type={showKeys[type] ? 'text' : 'password'}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            onClick={() => toggleShowKey(type)}
          >
            {showKeys[type] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleValidation(type, value)}
          disabled={!value}
          className="shrink-0"
        >
          {validations[type] === null ? 'Validar' : 
           validations[type] ? <CheckCircle className="w-4 h-4 text-green-500" /> :
           <AlertCircle className="w-4 h-4 text-red-500" />}
        </Button>
      </div>
      <p className="text-sm text-gray-500">{description}</p>
      {validations[type] === false && (
        <p className="text-sm text-red-500">API Key inválida o sin permisos</p>
      )}
      {validations[type] === true && (
        <p className="text-sm text-green-500">Conexión verificada correctamente</p>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🔑</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Configura los proveedores
        </h2>
        <p className="text-gray-600">
          Conecta los servicios de IA necesarios para tu agente de voz
        </p>
      </div>

      <Tabs defaultValue="llm" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="llm" className="flex items-center space-x-2">
            <Brain className="w-4 h-4" />
            <span>LLM</span>
          </TabsTrigger>
          <TabsTrigger value="tts" className="flex items-center space-x-2">
            <Volume2 className="w-4 h-4" />
            <span>TTS</span>
          </TabsTrigger>
          <TabsTrigger value="stt" className="flex items-center space-x-2">
            <Mic className="w-4 h-4" />
            <span>STT</span>
          </TabsTrigger>
          <TabsTrigger value="phone" className="flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <span>Telefonía</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="llm">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-blue-500" />
                  <span>Modelo de Lenguaje (LLM)</span>
                </div>
                <Badge variant="secondary">Requerido</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ApiKeyInput
                label="OpenAI API Key"
                value={llmApiKey}
                onChange={setLlmApiKey}
                type="llm"
                placeholder="sk-..."
                description="Necesaria para generar respuestas inteligentes"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tts">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-5 h-5 text-green-500" />
                  <span>Síntesis de Voz (TTS)</span>
                </div>
                <Badge variant="secondary">Requerido</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ApiKeyInput
                label="ElevenLabs API Key"
                value={ttsApiKey}
                onChange={setTtsApiKey}
                type="tts"
                placeholder="sk_..."
                description="Para convertir texto en voz natural"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stt">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mic className="w-5 h-5 text-purple-500" />
                  <span>Reconocimiento de Voz (STT)</span>
                </div>
                <Badge variant="secondary">Requerido</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ApiKeyInput
                label="Deepgram API Key"
                value={sttApiKey}
                onChange={setSttApiKey}
                type="stt"
                placeholder="..."
                description="Para entender lo que dicen los clientes"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="phone">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-orange-500" />
                  <span>Servicios Telefónicos</span>
                </div>
                <Badge variant="outline">Opcional</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ApiKeyInput
                label="Twilio API Key"
                value={phoneApiKey}
                onChange={setPhoneApiKey}
                type="phone"
                placeholder="AC..."
                description="Para gestionar llamadas telefónicas (opcional por ahora)"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Security Notice */}
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800">Seguridad de API Keys</h4>
            <p className="text-sm text-yellow-700 mt-1">
              Tus API keys se almacenan de forma segura y encriptada. 
              Solo se usarán para hacer funcionar tu agente de voz.
            </p>
          </div>
        </div>
      </div>

      {/* Cost Estimation */}
      <Card>
        <CardHeader>
          <CardTitle>Estimación de costos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800">LLM (GPT-4)</h4>
              <p className="text-sm text-blue-600">~$0.03 por minuto</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800">TTS (ElevenLabs)</h4>
              <p className="text-sm text-green-600">~$0.18 por minuto</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-800">STT (Deepgram)</h4>
              <p className="text-sm text-purple-600">~$0.0043 por minuto</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 text-center mt-3">
            Costo estimado por minuto de conversación: ~$0.21
          </p>
        </CardContent>
      </Card>

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
