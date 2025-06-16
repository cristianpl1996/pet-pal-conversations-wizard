
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface BrandsStepProps {
  onNext: (brands: string[]) => void;
  onBack: () => void;
}

const veterinaryBrands = [
  {
    id: 'royal-canin',
    name: 'Royal Canin',
    description: 'Alimento especializado para mascotas',
    logo: '🏆'
  },
  {
    id: 'hills',
    name: "Hill's",
    description: 'Nutrición terapéutica veterinaria',
    logo: '🏔️'
  },
  {
    id: 'purina-pro',
    name: 'Purina Pro Plan',
    description: 'Nutrición avanzada para mascotas',
    logo: '🥇'
  },
  {
    id: 'eukanuba',
    name: 'Eukanuba',
    description: 'Nutrición premium para perros y gatos',
    logo: '⭐'
  },
  {
    id: 'advance',
    name: 'Advance',
    description: 'Alimento natural para mascotas',
    logo: '🌿'
  },
  {
    id: 'nupec',
    name: 'Nupec',
    description: 'Alimento mexicano para mascotas',
    logo: '🇲🇽'
  },
  {
    id: 'bayer',
    name: 'Bayer',
    description: 'Medicamentos y tratamientos',
    logo: '💊'
  },
  {
    id: 'zoetis',
    name: 'Zoetis',
    description: 'Vacunas y medicamentos veterinarios',
    logo: '💉'
  }
];

const getExampleQuestions = (selectedBrands: string[]) => {
  const examples = [];
  
  if (selectedBrands.includes('hills')) {
    examples.push("¿Para qué sirve la dieta Hill's i/d?");
  }
  if (selectedBrands.includes('royal-canin')) {
    examples.push("¿Qué diferencia hay entre Royal Canin Gastro y Satiety?");
  }
  if (selectedBrands.includes('bayer') || selectedBrands.includes('zoetis')) {
    examples.push("¿Qué recomiendan contra las pulgas para un perro de 20 kg?");
  }
  if (selectedBrands.includes('purina-pro')) {
    examples.push("¿Cuál es el mejor Pro Plan para un gato senior?");
  }
  if (selectedBrands.includes('eukanuba')) {
    examples.push("¿Eukanuba tiene opciones para perros con alergias?");
  }
  
  // Ejemplos por defecto si no hay marcas específicas
  if (examples.length === 0) {
    return [
      "¿Qué alimento me recomiendan para mi mascota?",
      "¿Tienen productos para desparasitar?",
      "¿Cuál es la diferencia entre estas marcas?"
    ];
  }
  
  return examples.slice(0, 3); // Máximo 3 ejemplos
};

export function BrandsStep({ onNext, onBack }: BrandsStepProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const toggleBrand = (brandId: string) => {
    setSelectedBrands(prev =>
      prev.includes(brandId)
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
  };

  const exampleQuestions = getExampleQuestions(selectedBrands);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🐾</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Selecciona las marcas que manejas
        </h2>
        <p className="text-gray-600">
          El agente podrá recomendar productos de estas marcas específicamente
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Puedes omitir este paso si prefieres no especificar marcas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {veterinaryBrands.map((brand) => (
          <div
            key={brand.id}
            onClick={() => toggleBrand(brand.id)}
            className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-sm ${
              selectedBrands.includes(brand.id)
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="text-2xl">{brand.logo}</div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedBrands.includes(brand.id)}
                    onChange={() => toggleBrand(brand.id)}
                  />
                  <h3 className="font-semibold text-gray-800">
                    {brand.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {brand.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ejemplos dinámicos basados en selección */}
      {selectedBrands.length > 0 && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-start space-x-3">
            <div className="text-green-500">✅</div>
            <div>
              <h4 className="font-medium text-green-800">Basado en tu selección, tu agente podrá responder preguntas como:</h4>
              <ul className="text-sm text-green-700 mt-2 space-y-1">
                {exampleQuestions.map((question, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span className="italic">"{question}"</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="text-blue-500">💡</div>
          <div>
            <h4 className="font-medium text-blue-800">Tip</h4>
            <p className="text-sm text-blue-700">
              Si un cliente pregunta por una marca que no seleccionaste, el agente dirá amablemente que no la manejan y sugerirá alternativas.
            </p>
          </div>
        </div>
      </div>

      {/* Invitación al patrocinio */}
      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <div className="flex items-start space-x-3">
          <div className="text-purple-500">💎</div>
          <div className="flex-1">
            <h4 className="font-medium text-purple-800">Oportunidad especial</h4>
            <p className="text-sm text-purple-700 mb-3">
              Algunas marcas están patrocinando agentes para clínicas como la tuya. 
              Puedes solicitar patrocinio o ver beneficios exclusivos.
            </p>
            <Button 
              variant="outline" 
              size="sm"
              className="border-purple-300 text-purple-700 hover:bg-purple-100"
            >
              Solicitar patrocinio
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Atrás
        </Button>
        <Button
          onClick={() => onNext(selectedBrands)}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
