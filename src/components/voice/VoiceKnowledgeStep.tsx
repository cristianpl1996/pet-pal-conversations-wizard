import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, Globe, FileText, Star, Heart } from 'lucide-react';

interface VoiceKnowledgeStepProps {
  onNext: (knowledge: any) => void;
  onBack: () => void;
  existingBrands?: string[];
}

export function VoiceKnowledgeStep({ onNext, onBack, existingBrands = [] }: VoiceKnowledgeStepProps) {
  const [knowledgeType, setKnowledgeType] = useState<string>('');
  const [textKnowledge, setTextKnowledge] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [enabledSponsoredBrands, setEnabledSponsoredBrands] = useState<string[]>([]);

  // Mock sponsored knowledge blocks
  const sponsoredBrands = [
    { id: 'hills', name: "Hill's", description: "Nutrición terapéutica", sponsor: true },
    { id: 'royal-canin', name: "Royal Canin", description: "Nutrición especializada", sponsor: true },
    { id: 'purina', name: "Purina Pro Plan", description: "Nutrición avanzada", sponsor: false },
    { id: 'bayer', name: "Bayer", description: "Productos farmacéuticos", sponsor: true }
  ];

  const toggleSponsoredBrand = (brandId: string) => {
    setEnabledSponsoredBrands(prev => 
      prev.includes(brandId)
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
  };

  const handleNext = () => {
    const knowledge = {
      type: knowledgeType,
      content: knowledgeType === 'text' ? textKnowledge : websiteUrl,
      existingBrands,
      sponsoredBrands: enabledSponsoredBrands
    };
    onNext(knowledge);
  };

  const isValid = () => {
    if (knowledgeType === 'text') return textKnowledge.trim().length > 0;
    if (knowledgeType === 'website') return websiteUrl.trim().length > 0;
    if (knowledgeType === 'file') return true;
    return enabledSponsoredBrands.length > 0; // Allow to continue if only sponsored brands are selected
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🧠</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Integración de Conocimiento
        </h2>
        <p className="text-gray-600">
          Conecta el conocimiento de tu clínica y activa bloques patrocinados por marcas
        </p>
      </div>

      {/* Existing Brands Section */}
      {existingBrands.length > 0 && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-800">
              <Heart className="w-5 h-5" />
              <span>Marcas ya configuradas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-700 mb-3">
              Tu agente de voz heredará automáticamente el conocimiento de estas marcas desde tu configuración de WhatsApp:
            </p>
            <div className="flex flex-wrap gap-2">
              {existingBrands.map((brand) => (
                <Badge key={brand} variant="outline" className="bg-white border-green-300 text-green-700">
                  {brand}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sponsored Knowledge Section */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-800">
            <Star className="w-5 h-5" />
            <span>🔗 Conocimiento patrocinado</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-purple-700 mb-4">
            Activa bloques de conocimiento ya entrenados y patrocinados por marcas confiables. 
            Esto ahorra tiempo y mejora las respuestas.
          </p>
          
          <div className="space-y-3">
            {sponsoredBrands.map((brand) => (
              <div 
                key={brand.id} 
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-purple-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-800">{brand.name}</span>
                    {brand.sponsor && (
                      <Badge variant="outline" className="bg-yellow-50 border-yellow-300 text-yellow-700">
                        Patrocinado
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm text-gray-600">{brand.description}</span>
                </div>
                <Switch
                  checked={enabledSponsoredBrands.includes(brand.id)}
                  onCheckedChange={() => toggleSponsoredBrand(brand.id)}
                />
              </div>
            ))}
          </div>
          
          <p className="text-xs text-purple-600 mt-3">
            Este bloque ha sido entrenado por cada marca. No necesitas escribir nada adicional.
          </p>
        </CardContent>
      </Card>

      {/* Brand Invitation Section */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="font-medium text-blue-800 mb-2">
              ¿Tu clínica trabaja con alguna marca veterinaria?
            </h3>
            <p className="text-sm text-blue-700 mb-4">
              Puedes invitarla a patrocinar tu agente de voz. Si la marca carga su información aquí, 
              tu agente responderá con sus productos sin que tú tengas que configurarlo.
            </p>
            <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-100">
              Invitar a mi marca
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Knowledge Input Options */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800">Conocimiento adicional de tu clínica</h3>
        
        <div
          onClick={() => setKnowledgeType('text')}
          className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
            knowledgeType === 'text'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-blue-500" />
            <div>
              <h4 className="font-semibold text-gray-800">Escribir información</h4>
              <p className="text-sm text-gray-600">Escribe información específica sobre tu clínica</p>
            </div>
          </div>
        </div>

        <div
          onClick={() => setKnowledgeType('website')}
          className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
            knowledgeType === 'website'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center space-x-3">
            <Globe className="w-6 h-6 text-green-500" />
            <div>
              <h4 className="font-semibold text-gray-800">Sitio web</h4>
              <p className="text-sm text-gray-600">El agente aprenderá de tu página web</p>
            </div>
          </div>
        </div>

        <div
          onClick={() => setKnowledgeType('file')}
          className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
            knowledgeType === 'file'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center space-x-3">
            <Upload className="w-6 h-6 text-purple-500" />
            <div>
              <h4 className="font-semibold text-gray-800">Subir archivo</h4>
              <p className="text-sm text-gray-600">Sube documentos PDF, Word o texto</p>
            </div>
          </div>
        </div>
      </div>

      {/* Knowledge Input Fields */}
      {knowledgeType === 'text' && (
        <div className="mt-6">
          <Label htmlFor="textKnowledge">Información sobre tu clínica</Label>
          <Textarea
            id="textKnowledge"
            value={textKnowledge}
            onChange={(e) => setTextKnowledge(e.target.value)}
            placeholder="Escribe información sobre servicios, horarios, ubicación, especialidades..."
            className="min-h-32"
          />
        </div>
      )}

      {knowledgeType === 'website' && (
        <div className="mt-6">
          <Label htmlFor="websiteUrl">URL de tu sitio web</Label>
          <Input
            id="websiteUrl"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="https://mi-clinica-veterinaria.com"
            type="url"
          />
        </div>
      )}

      {knowledgeType === 'file' && (
        <div className="mt-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Arrastra y suelta tu archivo aquí</p>
            <p className="text-sm text-gray-500 mt-2">O haz clic para seleccionar</p>
          </div>
        </div>
      )}

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
