
import { CheckCircle, Edit, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DeployStepProps {
  onBack: () => void;
  onEdit: (step: number) => void;
  config: any;
}

export function DeployStep({ onBack, onEdit, config }: DeployStepProps) {
  const handleDeploy = () => {
    // Aquí iría la lógica real de despliegue
    alert('¡Agente desplegado exitosamente! En unos minutos estará activo en WhatsApp.');
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🚀</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          ¡Todo listo para el despliegue!
        </h2>
        <p className="text-gray-600">
          Revisa la configuración final de tu agente conversacional
        </p>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 space-y-6">
        {/* Objetivo */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800">Objetivo principal</h3>
            <p className="text-gray-600 capitalize">{config.objective || 'No definido'}</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => onEdit(0)}>
            <Edit className="w-4 h-4 mr-1" />
            Editar
          </Button>
        </div>

        {/* Conocimiento */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800">Fuente de conocimiento</h3>
            <p className="text-gray-600 capitalize">{config.knowledge?.type || 'No definido'}</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => onEdit(1)}>
            <Edit className="w-4 h-4 mr-1" />
            Editar
          </Button>
        </div>

        {/* Marcas */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800">Marcas seleccionadas</h3>
            <p className="text-gray-600">
              {config.brands?.length > 0 
                ? `${config.brands.length} marcas seleccionadas`
                : 'Ninguna marca específica'
              }
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => onEdit(2)}>
            <Edit className="w-4 h-4 mr-1" />
            Editar
          </Button>
        </div>

        {/* Configuración */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800">Tono y comportamiento</h3>
            <p className="text-gray-600">
              Tono: {config.config?.tone || 'Amigable'} • 
              Datos: {config.config?.dataChannel || 'Google Sheets'}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => onEdit(3)}>
            <Edit className="w-4 h-4 mr-1" />
            Editar
          </Button>
        </div>
      </div>

      {/* Características incluidas */}
      <div className="bg-green-50 rounded-xl p-6">
        <h3 className="font-semibold text-green-800 mb-4 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          Tu agente incluye:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-green-700">Respuestas inteligentes 24/7</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-green-700">Recolección automática de datos</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-green-700">Integración con WhatsApp</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-green-700">Actualizaciones en tiempo real</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="text-blue-500">⏱️</div>
          <div>
            <h4 className="font-medium text-blue-800">Tiempo de activación</h4>
            <p className="text-sm text-blue-700">
              Tu agente estará activo en WhatsApp en aproximadamente 5-10 minutos después del despliegue.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Volver al simulador
        </Button>
        <Button
          onClick={handleDeploy}
          className="bg-green-500 hover:bg-green-600 flex items-center space-x-2"
          size="lg"
        >
          <Rocket className="w-5 h-5" />
          <span>Lanzar agente en WhatsApp</span>
        </Button>
      </div>
    </div>
  );
}
