import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Settings, Mic } from 'lucide-react';

interface VoiceBasicConfigStepProps {
  onNext: (config: any) => void;
  onBack?: () => void;
}

export function VoiceBasicConfigStep({ onNext, onBack }: VoiceBasicConfigStepProps) {
  const [agentName, setAgentName] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('');
  const [model, setModel] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [temperature, setTemperature] = useState('0.7');
  const [topP, setTopP] = useState('0.9');
  const [maxTokens, setMaxTokens] = useState('150');
  const [prompt, setPrompt] = useState('');

  const handleNext = () => {
    const config = {
      agentName,
      description,
      language,
      model,
      isActive,
      temperature: parseFloat(temperature),
      topP: parseFloat(topP),
      maxTokens: parseInt(maxTokens),
      prompt
    };
    onNext(config);
  };

  const isValid = () => {
    return agentName.trim() && language && model;
  };

  const suggestedPrompts = [
    "Eres un asistente virtual de una clínica veterinaria. Ayudas a los clientes con información sobre servicios, agendamiento de citas y consultas generales sobre sus mascotas. Eres amable, profesional y empático.",
    "Soy el asistente telefónico de [Nombre Clínica]. Mi objetivo es ayudarte con todo lo relacionado a la salud de tu mascota. Puedo agendar citas, resolver dudas sobre nuestros servicios y orientarte sobre cuidados básicos.",
    "Hola, hablas con el sistema automatizado de atención de [Nombre Clínica]. Estoy aquí para brindarte información sobre nuestros servicios veterinarios y ayudarte a programar una consulta para tu mascota."
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🎤</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Configuremos tu agente de voz
        </h2>
        <p className="text-gray-600">
          Define los parámetros básicos de tu asistente telefónico
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="agentName">Nombre del agente *</Label>
          <Input
            id="agentName"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            placeholder="Ej: Asistente Veterinaria San Patricio"
          />
        </div>

        <div>
          <Label htmlFor="language">Idioma *</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona idioma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="en">Inglés</SelectItem>
              <SelectItem value="pt">Portugués</SelectItem>
              <SelectItem value="fr">Francés</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe brevemente qué hace tu agente..."
          className="resize-none"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="model">Modelo de IA *</Label>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona modelo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4">GPT-4 (Recomendado)</SelectItem>
              <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
              <SelectItem value="claude-3">Claude 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Estado del agente</Label>
            <p className="text-sm text-gray-500">Activar/desactivar agente</p>
          </div>
          <Switch
            checked={isActive}
            onCheckedChange={setIsActive}
          />
        </div>
      </div>

      {/* Configuración Avanzada */}
      <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between">
            <div className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Parámetros avanzados</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="temperature">Temperatura</Label>
              <Input
                id="temperature"
                type="number"
                min="0"
                max="2"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Creatividad (0-2)</p>
            </div>
            <div>
              <Label htmlFor="topP">Top P</Label>
              <Input
                id="topP"
                type="number"
                min="0"
                max="1"
                step="0.1"
                value={topP}
                onChange={(e) => setTopP(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Diversidad (0-1)</p>
            </div>
            <div>
              <Label htmlFor="maxTokens">Max Tokens</Label>
              <Input
                id="maxTokens"
                type="number"
                min="50"
                max="500"
                value={maxTokens}
                onChange={(e) => setMaxTokens(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Longitud respuesta</p>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Prompt Inicial */}
      <div>
        <Label htmlFor="prompt">Prompt inicial del agente</Label>
        <Textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Define cómo debe comportarse tu agente..."
          className="resize-none min-h-24"
        />
        
        {/* Sugerencias de prompts */}
        <div className="mt-3">
          <p className="text-sm font-medium text-gray-700 mb-2">Plantillas sugeridas:</p>
          <div className="space-y-2">
            {suggestedPrompts.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setPrompt(suggestion)}
                className="text-left h-auto p-3 whitespace-normal"
              >
                {suggestion.substring(0, 100)}...
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            Atrás
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={!isValid()}
          className="px-8 py-3 text-lg bg-purple-600 hover:bg-purple-700 ml-auto"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
