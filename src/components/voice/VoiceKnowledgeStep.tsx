
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Brain, Upload, CheckCircle, Sparkles, Crown, Link } from 'lucide-react';

interface VoiceKnowledgeStepProps {
  onNext: (knowledge: any) => void;
  onBack: () => void;
  existingBrands?: string[];
}

export function VoiceKnowledgeStep({ onNext, onBack, existingBrands }: VoiceKnowledgeStepProps) {
  const [additionalKnowledge, setAdditionalKnowledge] = useState('');
  const [useExistingBrands, setUseExistingBrands] = useState(true);
  const [sponsoredKnowledge, setSponsoredKnowledge] = useState({
    'Hill\'s': true,
    'Royal Canin': false,
    'Purina Pro Plan': true,
    'Bayer': false
  });

  const handleNext = () => {
    const knowledge = {
      useExistingBrands,
      existingBrands: useExistingBrands ? existingBrands : [],
      additionalKnowledge,
      sponsoredKnowledge
    };
    onNext(knowledge);
  };

  const toggleSponsoredKnowledge = (brand: string) => {
    setSponsoredKnowledge(prev => ({
      ...prev,
      [brand]: !prev[brand]
    }));
  };

  const brandCount = existingBrands?.length || 0;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🧠</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Conecta el conocimiento
        </h2>
        <p className="text-gray-600">
          Tu agente heredará el conocimiento ya configurado y podrás agregar más
        </p>
      </div>

      {/* Existing Brands Knowledge */}
      {brandCount > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Conocimiento de marcas existente</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800">¡Excelente!</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Tu agente de voz tendrá conocimiento preentrenado sobre {brandCount} marcas veterinarias 
                    que ya seleccionaste en tu configuración de WhatsApp:
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {existingBrands?.slice(0, 5).map((brand) => (
                      <span key={brand} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        {brand}
                      </span>
                    ))}
                    {brandCount > 5 && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        +{brandCount - 5} más
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h5 className="font-medium text-gray-800 mb-2">Tu agente podrá responder por voz preguntas como:</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• "¿Qué alimento me recomiendan para un cachorro de 2 meses?"</li>
                <li>• "¿Tienen productos Hill's para problemas digestivos?"</li>
                <li>• "¿Cuál es la diferencia entre Royal Canin Gastro y Satiety?"</li>
                <li>• "¿Qué vacunas necesita mi perro adulto?"</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {brandCount === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-3">
                <Brain className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800">Conocimiento base incluido</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Tu agente incluye conocimiento veterinario general sobre cuidados, 
                    enfermedades comunes y procedimientos básicos.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sponsored Knowledge Section */}
      <Card className="border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Link className="w-5 h-5 text-amber-500" />
            <span>Conocimiento patrocinado</span>
            <Crown className="w-4 h-4 text-amber-500" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Activa bloques de conocimiento ya entrenados y patrocinados por marcas confiables. 
            Esto ahorra tiempo y mejora las respuestas.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(sponsoredKnowledge).map(([brand, enabled]) => (
              <div key={brand} className={`p-4 border rounded-lg ${enabled ? 'border-amber-300 bg-amber-50' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Crown className={`w-4 h-4 ${enabled ? 'text-amber-500' : 'text-gray-400'}`} />
                    <span className="font-medium">{brand}</span>
                  </div>
                  <Switch
                    checked={enabled}
                    onCheckedChange={() => toggleSponsoredKnowledge(brand)}
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Este bloque ha sido entrenado por {brand}. No necesitas escribir nada.
                </p>
                {enabled && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800">
                      ✓ Activado
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Knowledge */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5 text-purple-500" />
            <span>Conocimiento adicional</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="additionalKnowledge">
              Información específica de tu clínica
            </Label>
            <Textarea
              id="additionalKnowledge"
              value={additionalKnowledge}
              onChange={(e) => setAdditionalKnowledge(e.target.value)}
              placeholder="Ej: Horarios especiales, servicios únicos, políticas de la clínica, información sobre el personal veterinario..."
              className="resize-none min-h-24"
            />
            <p className="text-sm text-gray-500 mt-2">
              Esta información se agregará al conocimiento base del agente de voz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-2xl mb-2">🕒</div>
              <h4 className="font-medium text-gray-800">Horarios</h4>
              <p className="text-sm text-gray-600">Horarios de atención especiales</p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-2xl mb-2">🏥</div>
              <h4 className="font-medium text-gray-800">Servicios</h4>
              <p className="text-sm text-gray-600">Servicios únicos que ofreces</p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-2xl mb-2">👨‍⚕️</div>
              <h4 className="font-medium text-gray-800">Personal</h4>
              <p className="text-sm text-gray-600">Información del equipo veterinario</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Enhancement Notice */}
      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <div className="flex items-start space-x-3">
          <Brain className="w-5 h-5 text-purple-500 mt-0.5" />
          <div>
            <h4 className="font-medium text-purple-800">IA Asistida</h4>
            <p className="text-sm text-purple-700 mt-1">
              Nuestro sistema analizará automáticamente tu información y la organizará 
              para que tu agente pueda brindar respuestas precisas y coherentes.
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
