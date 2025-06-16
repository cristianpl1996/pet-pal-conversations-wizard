
import { useState } from 'react';
import { Upload, Globe, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface KnowledgeStepProps {
  onNext: (knowledge: any) => void;
  onBack: () => void;
}

export function KnowledgeStep({ onNext, onBack }: KnowledgeStepProps) {
  const [knowledgeType, setKnowledgeType] = useState<string>('');
  const [textKnowledge, setTextKnowledge] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');

  const handleNext = () => {
    const knowledge = {
      type: knowledgeType,
      content: knowledgeType === 'text' ? textKnowledge : websiteUrl
    };
    onNext(knowledge);
  };

  const isValid = () => {
    if (knowledgeType === 'text') return textKnowledge.trim().length > 0;
    if (knowledgeType === 'website') return websiteUrl.trim().length > 0;
    if (knowledgeType === 'file') return true; // Para simplicidad
    return false;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🧠</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Proporciona conocimiento base
        </h2>
        <p className="text-gray-600">
          Elige cómo quieres que el agente aprenda sobre tu clínica
        </p>
      </div>

      <div className="space-y-4">
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
              <h3 className="font-semibold text-gray-800">Escribir información</h3>
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
              <h3 className="font-semibold text-gray-800">Sitio web</h3>
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
              <h3 className="font-semibold text-gray-800">Subir archivo</h3>
              <p className="text-sm text-gray-600">Sube documentos PDF, Word o texto</p>
            </div>
          </div>
        </div>
      </div>

      {knowledgeType === 'text' && (
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Información sobre tu clínica
          </label>
          <Textarea
            value={textKnowledge}
            onChange={(e) => setTextKnowledge(e.target.value)}
            placeholder="Escribe información sobre servicios, horarios, ubicación, especialidades..."
            className="min-h-32"
          />
        </div>
      )}

      {knowledgeType === 'website' && (
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL de tu sitio web
          </label>
          <Input
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
          className="bg-blue-500 hover:bg-blue-600"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
