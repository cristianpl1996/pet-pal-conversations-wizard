
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Users, MapPin } from 'lucide-react';

interface ClinicArea {
  id: string;
  name: string;
  responsible: string;
  whatsapp: string;
  email: string;
}

interface VoiceClinicAreasStepProps {
  onNext: (areas: ClinicArea[]) => void;
  onBack: () => void;
  guidedMode: boolean;
}

export function VoiceClinicAreasStep({ onNext, onBack, guidedMode }: VoiceClinicAreasStepProps) {
  const [areas, setAreas] = useState<ClinicArea[]>([
    { id: '1', name: '', responsible: '', whatsapp: '', email: '' }
  ]);

  const addArea = () => {
    const newArea: ClinicArea = {
      id: Date.now().toString(),
      name: '',
      responsible: '',
      whatsapp: '',
      email: ''
    };
    setAreas([...areas, newArea]);
  };

  const removeArea = (id: string) => {
    if (areas.length > 1) {
      setAreas(areas.filter(area => area.id !== id));
    }
  };

  const updateArea = (id: string, field: keyof ClinicArea, value: string) => {
    setAreas(areas.map(area => 
      area.id === id ? { ...area, [field]: value } : area
    ));
  };

  const handleNext = () => {
    const validAreas = areas.filter(area => 
      area.name.trim() && area.responsible.trim() && area.whatsapp.trim()
    );
    onNext(validAreas);
  };

  const isValid = () => {
    return areas.some(area => 
      area.name.trim() && area.responsible.trim() && area.whatsapp.trim()
    );
  };

  const suggestedAreas = [
    'Urgencias', 'Cirugía', 'Consulta General', 'Peluquería', 
    'Vacunación', 'Laboratorio', 'Radiología', 'Hospitalización'
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🏥</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Crea las áreas de tu clínica
        </h2>
        <p className="text-gray-600">
          Cuando un cliente escribe o llama, ¿a qué áreas podrías redirigirlo desde recepción?
        </p>
      </div>

      {/* Suggested Areas */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-2 mb-3">
          <MapPin className="w-5 h-5 text-blue-500" />
          <h3 className="font-medium text-blue-800">Áreas sugeridas</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestedAreas.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => {
                const emptyAreaIndex = areas.findIndex(area => !area.name.trim());
                if (emptyAreaIndex !== -1) {
                  updateArea(areas[emptyAreaIndex].id, 'name', suggestion);
                } else {
                  const newArea: ClinicArea = {
                    id: Date.now().toString(),
                    name: suggestion,
                    responsible: '',
                    whatsapp: '',
                    email: ''
                  };
                  setAreas([...areas, newArea]);
                }
              }}
              className="text-blue-600 border-blue-300 hover:bg-blue-100"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>

      {/* Areas List */}
      <div className="space-y-4">
        {areas.map((area, index) => (
          <Card key={area.id} className="border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-lg">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span>Área {index + 1}</span>
                </div>
                {areas.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeArea(area.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`area-name-${area.id}`}>Nombre del área *</Label>
                  <Input
                    id={`area-name-${area.id}`}
                    value={area.name}
                    onChange={(e) => updateArea(area.id, 'name', e.target.value)}
                    placeholder="Ej: Urgencias, Cirugía..."
                  />
                </div>
                <div>
                  <Label htmlFor={`area-responsible-${area.id}`}>Encargado *</Label>
                  <Input
                    id={`area-responsible-${area.id}`}
                    value={area.responsible}
                    onChange={(e) => updateArea(area.id, 'responsible', e.target.value)}
                    placeholder="Nombre del responsable"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`area-whatsapp-${area.id}`}>WhatsApp *</Label>
                  <Input
                    id={`area-whatsapp-${area.id}`}
                    value={area.whatsapp}
                    onChange={(e) => updateArea(area.id, 'whatsapp', e.target.value)}
                    placeholder="+52 55 1234 5678"
                    type="tel"
                  />
                </div>
                <div>
                  <Label htmlFor={`area-email-${area.id}`}>Correo (opcional)</Label>
                  <Input
                    id={`area-email-${area.id}`}
                    value={area.email}
                    onChange={(e) => updateArea(area.id, 'email', e.target.value)}
                    placeholder="responsable@clinica.com"
                    type="email"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Area Button */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={addArea}
          className="border-dashed border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50"
        >
          <Plus className="w-4 h-4 mr-2" />
          Añadir nueva área
        </Button>
      </div>

      {/* Info Box */}
      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <div className="flex items-start space-x-3">
          <Users className="w-5 h-5 text-green-500 mt-0.5" />
          <div>
            <h4 className="font-medium text-green-800">Esto hará tu asistente mucho más útil</h4>
            <p className="text-sm text-green-700 mt-1">
              Al crear estas áreas, tu agente podrá redirigir automáticamente las consultas 
              al especialista correcto, mejorando la atención y organizando mejor tu clínica.
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
          className="bg-blue-500 hover:bg-blue-600"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
