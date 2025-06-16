
import { useState } from 'react';
import { Calendar, ShoppingCart, HeadphonesIcon, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ObjectiveStepProps {
  onNext: (objective: string) => void;
}

const objectives = [
  {
    id: 'appointment',
    title: 'Agendamiento de citas',
    description: 'Ayuda a los clientes a agendar consultas y servicios',
    icon: Calendar,
    color: 'bg-blue-500'
  },
  {
    id: 'sales',
    title: 'Ventas de productos',
    description: 'Recomienda y vende productos veterinarios',
    icon: ShoppingCart,
    color: 'bg-green-500'
  },
  {
    id: 'support',
    title: 'Soporte general',
    description: 'Responde dudas y brinda información',
    icon: HeadphonesIcon,
    color: 'bg-purple-500'
  },
  {
    id: 'comprehensive',
    title: 'Servicio integral',
    description: 'Combina agendamiento, ventas y soporte',
    icon: Stethoscope,
    color: 'bg-orange-500'
  }
];

export function ObjectiveStep({ onNext }: ObjectiveStepProps) {
  const [selectedObjective, setSelectedObjective] = useState<string>('');

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🎯</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          ¿Cuál es el objetivo principal de tu agente?
        </h2>
        <p className="text-gray-600">
          Selecciona la función principal que realizará el agente conversacional
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {objectives.map((objective) => {
          const Icon = objective.icon;
          return (
            <div
              key={objective.id}
              onClick={() => setSelectedObjective(objective.id)}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedObjective === objective.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${objective.color} text-white`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {objective.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {objective.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center pt-6">
        <Button
          onClick={() => onNext(selectedObjective)}
          disabled={!selectedObjective}
          className="px-8 py-3 text-lg bg-blue-500 hover:bg-blue-600"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
