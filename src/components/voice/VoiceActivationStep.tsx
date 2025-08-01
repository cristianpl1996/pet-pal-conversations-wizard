import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, CreditCard, Gift, Clock, MessageSquare, TrendingUp, FileSpreadsheet, HeadphonesIcon } from 'lucide-react';

interface VoiceActivationStepProps {
  onBack: () => void;
  config: any;
  guidedMode?: boolean;
}

export function VoiceActivationStep({ onBack, config, guidedMode }: VoiceActivationStepProps) {
  const [activationOption, setActivationOption] = useState<'sponsor' | 'payment' | null>(null);
  const [sponsorCode, setSponsorCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [codeValidated, setCodeValidated] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [sponsorInfo, setSponsorInfo] = useState<any>(null);

  const handleValidateCode = async () => {
    if (!sponsorCode.trim()) return;
    
    setIsValidating(true);
    setValidationError('');
    
    // Simular validación del código
    setTimeout(() => {
      if (sponsorCode.toLowerCase() === 'hills2024' || sponsorCode.toLowerCase() === 'royal2024') {
        setCodeValidated(true);
        setSponsorInfo({
          brand: sponsorCode.toLowerCase().includes('hills') ? "Hill's" : "Royal Canin",
          duration: "6 meses",
          sponsor: sponsorCode.toLowerCase().includes('hills') ? "Hill's Pet Nutrition" : "Royal Canin"
        });
      } else {
        setValidationError('Código no válido. Verifica e intenta nuevamente.');
      }
      setIsValidating(false);
    }, 1500);
  };

  const handlePayment = () => {
    // Simular proceso de pago
    alert('🔄 Redirigiendo a la pasarela de pago...');
  };

  const handleActivate = () => {
    if (activationOption === 'sponsor' && codeValidated) {
      alert(`🎉 ¡Agente activado exitosamente! Patrocinado por ${sponsorInfo.brand} por ${sponsorInfo.duration}.`);
    } else if (activationOption === 'payment') {
      alert('🚀 ¡Agente activado exitosamente! El pago se procesará automáticamente cada mes.');
    }
  };

  const benefits = [
    { icon: Clock, text: "Respuestas automáticas 24/7" },
    { icon: MessageSquare, text: "Integración con WhatsApp" },
    { icon: TrendingUp, text: "Recomendación de productos" },
    { icon: FileSpreadsheet, text: "Datos exportables a Google Sheets" },
    { icon: HeadphonesIcon, text: "Soporte técnico prioritario" }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🚀</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Activación
        </h2>
        <p className="text-gray-600">
          Tu agente está listo para empezar a atender en WhatsApp. Solo falta activarlo.
        </p>
      </div>

      {!activationOption && (
        <Card>
          <CardHeader>
            <CardTitle className="text-center">¿Cómo deseas activar tu agente?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center space-y-2 border-2 hover:border-purple-300 hover:bg-purple-50"
                onClick={() => setActivationOption('sponsor')}
              >
                <Gift className="w-6 h-6 text-purple-500" />
                <span className="text-base font-medium">🔹 Tengo un código de patrocinio</span>
              </Button>
              
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center space-y-2 border-2 hover:border-green-300 hover:bg-green-50"
                onClick={() => setActivationOption('payment')}
              >
                <CreditCard className="w-6 h-6 text-green-500" />
                <span className="text-base font-medium">🔹 Quiero comprarlo ahora</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activationOption === 'sponsor' && (
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Gift className="w-5 h-5 text-purple-500" />
              <span>Código de patrocinio</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Ingresa tu código de patrocinio
              </label>
              <div className="flex gap-3">
                <Input
                  value={sponsorCode}
                  onChange={(e) => setSponsorCode(e.target.value)}
                  placeholder="Ej: HILLS2024"
                  className="flex-1"
                  disabled={codeValidated}
                />
                <Button
                  onClick={handleValidateCode}
                  disabled={!sponsorCode.trim() || isValidating || codeValidated}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isValidating ? 'Validando...' : codeValidated ? 'Validado ✓' : 'Validar código'}
                </Button>
              </div>
            </div>

            {validationError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{validationError}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    setValidationError('');
                    setSponsorCode('');
                  }}
                >
                  Intentar nuevamente
                </Button>
              </div>
            )}

            {codeValidated && sponsorInfo && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800">
                      🎉 Código válido. Patrocinado por {sponsorInfo.brand} por {sponsorInfo.duration}
                    </h4>
                    <p className="text-sm text-green-700 mt-1">
                      Tu agente estará activo sin costo durante {sponsorInfo.duration} gracias a {sponsorInfo.sponsor}.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {activationOption === 'payment' && (
        <div className="space-y-6">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-green-500" />
                <span>Plan de suscripción</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="flex justify-center items-baseline space-x-2 mb-2">
                  <span className="text-4xl font-bold text-gray-800">$49.000</span>
                  <span className="text-lg text-gray-600">COP / mes</span>
                </div>
                <div className="text-center">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    O $490.000 COP / año (2 meses gratis)
                  </Badge>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <h4 className="font-medium text-gray-800 mb-3">Beneficios incluidos:</h4>
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{benefit.text}</span>
                    </div>
                  );
                })}
              </div>

              <Button
                onClick={handlePayment}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                size="lg"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Pagar y activar agente
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {(codeValidated || activationOption === 'payment') && (
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            onClick={() => {
              setActivationOption(null);
              setCodeValidated(false);
              setSponsorCode('');
              setValidationError('');
              setSponsorInfo(null);
            }}
          >
            Cambiar método
          </Button>
          
          <div className="flex-1" />
          
          <Button variant="outline" onClick={onBack}>
            Atrás
          </Button>
          
          <Button
            onClick={handleActivate}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={activationOption === 'sponsor' && !codeValidated}
          >
            🚀 Activar agente
          </Button>
        </div>
      )}

      {!activationOption && (
        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={onBack}>
            Atrás
          </Button>
        </div>
      )}
    </div>
  );
}