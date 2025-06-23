
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Zap, Sparkles, Brain } from 'lucide-react';

interface QuickVoiceCreationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateAgent: (description: string) => void;
}

export function QuickVoiceCreationModal({ 
  open, 
  onOpenChange, 
  onCreateAgent 
}: QuickVoiceCreationModalProps) {
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    if (description.trim()) {
      onCreateAgent(description);
      setDescription('');
      onOpenChange(false);
    }
  };

  const exampleTexts = [
    "Atender llamadas y agendar citas para mi veterinaria",
    "Responder dudas sobre vacunas y dar precios de servicios",
    "Filtrar urgencias y redirigir al veterinario cuando sea necesario"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-purple-500" />
            <span>Crear asistente telefónico en 1 clic</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-800 mb-2">
              Describe con tus palabras qué quieres que haga tu asistente telefónico
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Por ejemplo: "agendar citas", "responder dudas" o "recomendar productos". 
              Nosotros configuramos todo automáticamente.
            </p>
            
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe qué quieres que haga tu asistente telefónico..."
              className="resize-none"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Ejemplos populares:</p>
            {exampleTexts.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setDescription(example)}
                className="text-left h-auto p-2 whitespace-normal w-full justify-start"
              >
                {example}
              </Button>
            ))}
          </div>

          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
            <div className="flex items-start space-x-2">
              <Brain className="w-4 h-4 text-purple-500 mt-0.5" />
              <div>
                <p className="text-sm text-purple-700">
                  <strong>Inteligencia automática:</strong> Interpretaremos tu descripción y crearemos 
                  el asistente completo con voz empática, comprensión inteligente y configuración optimizada 
                  para clínicas veterinarias.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!description.trim()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Crear asistente
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
