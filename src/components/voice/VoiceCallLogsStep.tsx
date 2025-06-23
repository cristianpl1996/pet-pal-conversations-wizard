
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Phone, Calendar, Clock, BarChart3, Play, Download, Settings } from 'lucide-react';

interface VoiceCallLogsStepProps {
  onBack: () => void;
  config: any;
}

export function VoiceCallLogsStep({ onBack, config }: VoiceCallLogsStepProps) {
  const generateConfigSummary = () => {
    const objectives = config.objectives?.selectedObjectives || [];
    const objectiveLabels = {
      general_info: "Atender llamadas y dudas generales",
      appointments: "Agendar o confirmar citas",
      products: "Recomendar productos veterinarios",
      post_surgery: "Dar indicaciones postquirúrgicas",
      emergencies: "Filtrar urgencias",
      transfer: "Redirigir al personal adecuado"
    };

    return {
      agentName: config.basicConfig?.agentName || "Mi Agente de Voz",
      objectives: objectives.map((obj: string) => objectiveLabels[obj as keyof typeof objectiveLabels]).filter(Boolean),
      voiceEngine: "🗣️ Voz del asistente: ElevenLabs (Recomendado)",
      speechRecognition: "🎧 Reconocimiento de voz: Deepgram (Automático)",
      comprehensionEngine: "🧠 Motor de comprensión: GPT-4 (Inteligente)",
      language: config.basicConfig?.language || "Español",
      isActive: config.basicConfig?.isActive !== false
    };
  };

  const summary = generateConfigSummary();

  const handleTestCall = () => {
    // Simular una llamada de prueba
    alert("🎉 ¡Llamada de prueba iniciada! Tu agente está funcionando correctamente.");
  };

  const handleDownloadConfig = () => {
    // Simular descarga de configuración
    console.log("Descargando configuración del agente...", config);
  };

  const handleDeploy = () => {
    // Simular despliegue
    alert("🚀 ¡Tu agente de voz ha sido desplegado exitosamente! Ya está listo para recibir llamadas.");
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          ¡Tu agente de voz está listo!
        </h2>
        <p className="text-gray-600">
          Revisa la configuración final y despliega tu asistente telefónico
        </p>
      </div>

      {/* Configuration Summary */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800">Resumen de configuración</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-800 mb-2">📋 Información básica</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Nombre:</span>
                <span className="ml-2 font-medium">{summary.agentName}</span>
              </div>
              <div>
                <span className="text-gray-600">Idioma:</span>
                <span className="ml-2 font-medium">{summary.language}</span>
              </div>
              <div>
                <span className="text-gray-600">Estado:</span>
                <Badge variant={summary.isActive ? "default" : "secondary"} className="ml-2">
                  {summary.isActive ? "Activo" : "Inactivo"}
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-800 mb-2">🎯 Funciones configuradas</h3>
            <div className="flex flex-wrap gap-2">
              {summary.objectives.map((objective, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {objective}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-800 mb-2">⚙️ Configuración técnica</h3>
            <div className="space-y-2 text-sm">
              <div>{summary.comprehensionEngine}</div>
              <div>{summary.voiceEngine}</div>
              <div>{summary.speechRecognition}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test and Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Play className="w-5 h-5 text-blue-500" />
              <span>Probar agente</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Escucha cómo suena tu agente con una llamada de ejemplo
            </p>
            <Button onClick={handleTestCall} className="w-full">
              🎧 Llamada de prueba
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-purple-500" />
              <span>Monitoreo</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Una vez desplegado, podrás ver estadísticas de llamadas aquí
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex justify-between">
                <span>Llamadas atendidas:</span>
                <span>0</span>
              </div>
              <div className="flex justify-between">
                <span>Citas agendadas:</span>
                <span>0</span>
              </div>
              <div className="flex justify-between">
                <span>Tiempo promedio:</span>
                <span>--</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call Logs Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Phone className="w-5 h-5 text-green-500" />
            <span>Registro de llamadas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Phone className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">Sin llamadas aún</p>
            <p className="text-sm">
              Una vez que despliegues tu agente, aquí aparecerán todas las conversaciones
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="outline"
          onClick={handleDownloadConfig}
          className="flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Descargar configuración</span>
        </Button>
        
        <Button
          variant="outline"
          className="flex items-center space-x-2"
        >
          <Settings className="w-4 h-4" />
          <span>Editar configuración</span>
        </Button>
        
        <div className="flex-1" />
        
        <Button variant="outline" onClick={onBack}>
          Atrás
        </Button>
        
        <Button
          onClick={handleDeploy}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          🚀 Desplegar agente
        </Button>
      </div>

      {/* Help Text */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-800">¡Todo listo!</h4>
            <p className="text-sm text-blue-700 mt-1">
              Tu agente de voz está completamente configurado con inteligencia artificial avanzada. 
              Una vez desplegado, estará disponible 24/7 para atender las llamadas de tu clínica 
              y brindar una experiencia profesional a tus clientes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
