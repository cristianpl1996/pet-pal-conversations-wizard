
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Settings, Zap, Brain, Calendar, Pill, Heart, AlertTriangle, Users, Plus, CheckCircle } from 'lucide-react';

interface VoiceObjectiveStepProps {
  onNext: (objectives: any) => void;
  onBack: () => void;
  onEnableExpertMode?: () => void;
  guidedMode?: boolean;
  setGuidedMode?: (mode: boolean) => void;
}

export function VoiceObjectiveStep({ 
  onNext, 
  onBack, 
  onEnableExpertMode, 
  guidedMode = true, 
  setGuidedMode 
}: VoiceObjectiveStepProps) {
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([]);
  const [customObjective, setCustomObjective] = useState('');
  const [showCustomModal, setShowCustomModal] = useState(false);

  const objectives = [
    {
      id: 'general_info',
      title: 'Atender llamadas y responder dudas generales',
      description: 'Tu agente responderá preguntas sobre servicios, horarios, ubicación y consultas básicas',
      icon: Brain,
      color: 'bg-blue-500'
    },
    {
      id: 'appointments',
      title: 'Agendar o confirmar citas automáticamente',
      description: 'Gestión completa de citas: verificar disponibilidad, agendar, confirmar y reprogramar',
      icon: Calendar,
      color: 'bg-green-500'
    },
    {
      id: 'products',
      title: 'Recomendar productos veterinarios',
      description: 'Sugerir productos apropiados basado en las necesidades del cliente y su mascota',
      icon: Pill,
      color: 'bg-purple-500'
    },
    {
      id: 'post_surgery',
      title: 'Dar indicaciones postquirúrgicas',
      description: 'Proporcionar cuidados e instrucciones después de procedimientos veterinarios',
      icon: Heart,
      color: 'bg-pink-500'
    },
    {
      id: 'emergencies',
      title: 'Filtrar urgencias',
      description: 'Evaluar la gravedad de situaciones y priorizar casos que requieren atención inmediata',
      icon: AlertTriangle,
      color: 'bg-red-500'
    },
    {
      id: 'transfer',
      title: 'Redirigir al personal adecuado',
      description: 'Transferir llamadas al veterinario, asistente o departamento correcto según la consulta',
      icon: Users,
      color: 'bg-orange-500'
    }
  ];

  const handleObjectiveToggle = (objectiveId: string) => {
    setSelectedObjectives(prev => 
      prev.includes(objectiveId)
        ? prev.filter(id => id !== objectiveId)
        : [...prev, objectiveId]
    );
  };

  const handleNext = () => {
    const config = {
      selectedObjectives,
      customObjective: customObjective.trim() || null,
      guidedMode
    };
    onNext(config);
  };

  const handleCustomObjective = () => {
    if (customObjective.trim()) {
      const config = {
        selectedObjectives: [],
        customObjective: customObjective.trim(),
        guidedMode
      };
      onNext(config);
    }
  };

  const isValid = () => {
    return selectedObjectives.length > 0 || customObjective.trim();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🎯</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          ¿Qué quieres que haga tu asistente telefónico?
        </h2>
        <p className="text-gray-600">
          Selecciona uno o varios objetivos. Configuraremos todo automáticamente para que funcione sin complicaciones.
        </p>
      </div>

      {/* Guided Mode Notice */}
      {guidedMode && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-blue-800">🧠 Modo guiado activado</h4>
              <p className="text-sm text-blue-700 mt-1">
                Usaremos automáticamente la mejor configuración para tu clínica veterinaria.
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setGuidedMode?.(false);
                onEnableExpertMode?.();
              }}
              className="text-blue-600 hover:text-blue-700 text-xs"
            >
              ¿Eres técnico? Modo experto
            </Button>
          </div>
        </div>
      )}

      {/* Objectives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {objectives.map((objective) => {
          const Icon = objective.icon;
          const isSelected = selectedObjectives.includes(objective.id);
          
          return (
            <Card 
              key={objective.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                isSelected 
                  ? 'ring-2 ring-purple-500 bg-purple-50 border-purple-200' 
                  : 'hover:border-gray-300'
              }`}
              onClick={() => handleObjectiveToggle(objective.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 ${objective.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base leading-tight">
                      {objective.title}
                    </CardTitle>
                  </div>
                  <Checkbox 
                    checked={isSelected}
                    className="mt-1"
                  />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm">
                  {objective.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}

        {/* Custom Objective Card */}
        <Card className="cursor-pointer transition-all duration-200 hover:shadow-md hover:border-gray-300 border-dashed">
          <CardContent className="p-6">
            <Dialog open={showCustomModal} onOpenChange={setShowCustomModal}>
              <DialogTrigger asChild>
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-10 h-10 bg-gray-500 rounded-lg flex items-center justify-center">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-medium text-gray-800">Otro objetivo personalizado</h3>
                  <p className="text-sm text-gray-600">
                    Describe en tus propias palabras qué quieres lograr
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Describe tu objetivo personalizado</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="customObjective">¿Qué quieres que haga tu asistente telefónico?</Label>
                    <Textarea
                      id="customObjective"
                      value={customObjective}
                      onChange={(e) => setCustomObjective(e.target.value)}
                      placeholder="Ej. Quiero que atienda llamadas para agendar citas y explique servicios específicos de cirugía..."
                      className="resize-none"
                      rows={4}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowCustomModal(false)}>
                      Cancelar
                    </Button>
                    <Button 
                      onClick={handleCustomObjective}
                      disabled={!customObjective.trim()}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Crear asistente personalizado
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      {/* Selected Objectives Summary */}
      {selectedObjectives.length > 0 && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <h3 className="font-medium text-green-800 mb-2">Funciones seleccionadas:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedObjectives.map((id) => {
                const objective = objectives.find(obj => obj.id === id);
                return (
                  <Badge key={id} variant="outline" className="bg-white text-green-700 border-green-300">
                    {objective?.title}
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Auto Configuration Preview */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Zap className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-800">Configuración automática</h4>
              <p className="text-sm text-blue-700 mt-1">
                Una vez que selecciones tus objetivos, configuraremos automáticamente: 
                el motor de comprensión inteligente, la voz empática del asistente, 
                y la línea telefónica. Sin complicaciones técnicas, listo para usar.
              </p>
            </div>
          </div>
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
          🪄 Configurar automáticamente
        </Button>
      </div>
    </div>
  );
}
