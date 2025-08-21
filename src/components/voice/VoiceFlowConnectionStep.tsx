
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowRight, Edit, Phone, Users, Save } from 'lucide-react';

interface ClinicArea {
  id: string;
  name: string;
  responsible: string;
  whatsapp: string;
  email: string;
}

interface FlowConnection {
  from: string;
  to: string;
  condition?: string;
}

interface VoiceFlowConnectionStepProps {
  onNext: (connections: any) => void;
  onBack: () => void;
  areas: ClinicArea[];
  guidedMode: boolean;
}

export function VoiceFlowConnectionStep({ onNext, onBack, areas, guidedMode }: VoiceFlowConnectionStepProps) {
  const [connections, setConnections] = useState<FlowConnection[]>([]);
  const [editingArea, setEditingArea] = useState<ClinicArea | null>(null);
  const [editedAreas, setEditedAreas] = useState<ClinicArea[]>(areas);

  useEffect(() => {
    // Initialize connections from reception to all areas
    const initialConnections = areas.map(area => ({
      from: 'reception',
      to: area.id,
      condition: `Consultas sobre ${area.name.toLowerCase()}`
    }));
    setConnections(initialConnections);
  }, [areas]);

  const handleEditArea = (area: ClinicArea) => {
    setEditingArea({ ...area });
  };

  const handleSaveAreaEdit = () => {
    if (editingArea) {
      setEditedAreas(editedAreas.map(area => 
        area.id === editingArea.id ? editingArea : area
      ));
      setEditingArea(null);
    }
  };

  const handleNext = () => {
    const flowData = {
      areas: editedAreas,
      connections: connections,
      flowType: guidedMode ? 'guided' : 'expert'
    };
    onNext(flowData);
  };

  const updateConnection = (fromId: string, toId: string, condition: string) => {
    setConnections(connections.map(conn => 
      conn.from === fromId && conn.to === toId 
        ? { ...conn, condition }
        : conn
    ));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🔄</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Define el flujo entre recepción y tus áreas
        </h2>
        <p className="text-gray-600">
          Ahora conecta la recepción con las áreas que creaste. Así sabremos a quién redirigir cada conversación.
        </p>
      </div>

      {/* Flow Diagram */}
      <div className="bg-gray-50 p-6 rounded-xl">
        <h3 className="font-semibold text-gray-800 mb-6 text-center">Flujo de comunicación</h3>
        
        <div className="space-y-6">
          {/* Reception Node */}
          <div className="flex justify-center">
            <Card className="w-64 bg-blue-500 text-white border-blue-600">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">Recepción</span>
                </div>
                <p className="text-sm text-blue-100 mt-1">Punto de entrada principal</p>
              </CardContent>
            </Card>
          </div>

          {/* Connections */}
          <div className="space-y-4">
            {editedAreas.map((area, index) => {
              const connection = connections.find(conn => conn.to === area.id);
              return (
                <div key={area.id} className="flex items-center space-x-4">
                  {/* Arrow */}
                  <div className="flex-1 flex items-center">
                    <div className="w-16 flex justify-center">
                      <ArrowRight className="w-6 h-6 text-gray-400" />
                    </div>
                    
                    {/* Condition */}
                    <div className="flex-1 px-3">
                      <Input
                        value={connection?.condition || ''}
                        onChange={(e) => updateConnection('reception', area.id, e.target.value)}
                        placeholder="¿Cuándo redirigir aquí?"
                        className="text-sm"
                      />
                    </div>
                    
                    {/* Area Card */}
                    <Card className="w-64 bg-white border-gray-200 hover:border-gray-300 transition-colors">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-gray-500" />
                            <div>
                              <p className="font-medium text-sm">{area.name}</p>
                              <p className="text-xs text-gray-500">{area.responsible}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditArea(area)}
                            className="h-6 w-6 p-0"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Save className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-800">Flujo configurado</h4>
              <p className="text-sm text-green-700 mt-1">
                Tu agente redirigirá automáticamente las conversaciones según las condiciones que definiste. 
                Puedes ajustar esto más adelante si es necesario.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Area Dialog */}
      {editingArea && (
        <Dialog open={!!editingArea} onOpenChange={() => setEditingArea(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar área: {editingArea.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Nombre del área</Label>
                <Input
                  id="edit-name"
                  value={editingArea.name}
                  onChange={(e) => setEditingArea({ ...editingArea, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-responsible">Encargado</Label>
                <Input
                  id="edit-responsible"
                  value={editingArea.responsible}
                  onChange={(e) => setEditingArea({ ...editingArea, responsible: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-whatsapp">WhatsApp</Label>
                <Input
                  id="edit-whatsapp"
                  value={editingArea.whatsapp}
                  onChange={(e) => setEditingArea({ ...editingArea, whatsapp: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-email">Correo</Label>
                <Input
                  id="edit-email"
                  value={editingArea.email}
                  onChange={(e) => setEditingArea({ ...editingArea, email: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditingArea(null)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveAreaEdit}>
                  Guardar cambios
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Atrás
        </Button>
        <Button
          onClick={handleNext}
          className="bg-purple-600 hover:bg-purple-700"
        >
          Guardar y continuar
        </Button>
      </div>
    </div>
  );
}
