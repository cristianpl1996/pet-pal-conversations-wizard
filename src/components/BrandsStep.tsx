
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

export function BrandsStep({ onNext, onBack }: BrandsStepProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const toggleBrand = (brandId: string) => {
    setSelectedBrands(prev =>
      prev.includes(brandId)
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
  };

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
