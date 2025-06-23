
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Phone, Plus, MessageSquare, RotateCcw } from 'lucide-react';

interface VoicePhoneStepProps {
  onNext: (phone: any) => void;
  onBack: () => void;
}

export function VoicePhoneStep({ onNext, onBack }: VoicePhoneStepProps) {
  const [phoneOption, setPhoneOption] = useState('');
  const [selectedNumber, setSelectedNumber] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [fallbackOption, setFallbackOption] = useState('retry');

  const existingNumbers = [
    { id: '1', number: '+52 55 1234 5678', status: 'Activo', agent: 'Agente WhatsApp' },
    { id: '2', number: '+52 55 8765 4321', status: 'Disponible', agent: null }
  ];

  const handleNext = () => {
    const phone = {
      phoneOption,
      selectedNumber: phoneOption === 'existing' ? selectedNumber : newNumber,
      fallbackOption
    };
    onNext(phone);
  };

  const isValid = () => {
    if (phoneOption === 'existing') return selectedNumber;
    if (phoneOption === 'new') return newNumber;
    return phoneOption;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">📞</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Configura el número telefónico
        </h2>
        <p className="text-gray-600">
          Define qué número utilizará tu agente de voz
        </p>
      </div>

      {/* Phone Number Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Phone className="w-5 h-5 text-blue-500" />
            <span>Número telefónico</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={phoneOption} onValueChange={setPhoneOption}>
            <div className="space-y-4">
              {/* Use existing number */}
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="existing" id="existing" />
                <Label htmlFor="existing" className="flex-1">
                  <div>
                    <h4 className="font-medium">Usar número existente</h4>
                    <p className="text-sm text-gray-500">Asignar un número que ya tienes configurado</p>
                  </div>
                </Label>
              </div>

              {phoneOption === 'existing' && (
                <div className="ml-6 space-y-3">
                  <Label>Selecciona el número</Label>
                  {existingNumbers.map((number) => (
                    <div
                      key={number.id}
                      onClick={() => setSelectedNumber(number.number)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedNumber === number.number
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-800">{number.number}</h4>
                          <p className="text-sm text-gray-600">
                            {number.agent ? `Asignado a: ${number.agent}` : 'Disponible'}
                          </p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          number.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {number.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Create new number */}
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="new" id="new" />
                <Label htmlFor="new" className="flex-1">
                  <div>
                    <h4 className="font-medium">Crear nuevo número</h4>
                    <p className="text-sm text-gray-500">Configurar un número específico para este agente</p>
                  </div>
                </Label>
              </div>

              {phoneOption === 'new' && (
                <div className="ml-6 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="newNumber">Número deseado</Label>
                      <Input
                        id="newNumber"
                        value={newNumber}
                        onChange={(e) => setNewNumber(e.target.value)}
                        placeholder="+52 55 ..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">País</Label>
                      <Select defaultValue="mexico">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mexico">México</SelectItem>
                          <SelectItem value="usa">Estados Unidos</SelectItem>
                          <SelectItem value="spain">España</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Use future integration */}
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="future" id="future" />
                <Label htmlFor="future" className="flex-1">
                  <div>
                    <h4 className="font-medium">Configurar más tarde</h4>
                    <p className="text-sm text-gray-500">Terminar configuración sin asignar número</p>
                  </div>
                </Label>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Fallback Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <RotateCcw className="w-5 h-5 text-orange-500" />
            <span>Escenarios de fallback</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label>¿Qué hacer si el agente no puede atender?</Label>
            <Select value={fallbackOption} onValueChange={setFallbackOption}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Selecciona una opción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="retry">Reintentar llamada automáticamente</SelectItem>
                <SelectItem value="whatsapp">Enviar mensaje por WhatsApp</SelectItem>
                <SelectItem value="voicemail">Dejar mensaje de voz</SelectItem>
                <SelectItem value="human">Transferir a humano</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {fallbackOption && (
            <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <RotateCcw className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-orange-800">Configuración de fallback</h4>
                  <p className="text-sm text-orange-700 mt-1">
                    {fallbackOption === 'retry' && 'El sistema intentará llamar nuevamente después de 30 minutos.'}
                    {fallbackOption === 'whatsapp' && 'Se enviará un mensaje automático por WhatsApp con la información solicitada.'}
                    {fallbackOption === 'voicemail' && 'El cliente podrá dejar un mensaje que será transcrito y enviado.'}
                    {fallbackOption === 'human' && 'La llamada será transferida al personal disponible de la clínica.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Future Integration Notice */}
      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <div className="flex items-start space-x-3">
          <Plus className="w-5 h-5 text-purple-500 mt-0.5" />
          <div>
            <h4 className="font-medium text-purple-800">Próximamente: Integración completa</h4>
            <p className="text-sm text-purple-700 mt-1">
              Pronto podrás configurar números directamente desde la plataforma 
              con integración automática a Twilio y otros proveedores.
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
