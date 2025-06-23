
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Play, Download, Search, Filter, Phone, Clock, DollarSign, TrendingUp } from 'lucide-react';

interface VoiceCallLogsStepProps {
  onBack: () => void;
  config: any;
}

export function VoiceCallLogsStep({ onBack, config }: VoiceCallLogsStepProps) {
  const [filterAgent, setFilterAgent] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data para demonstración
  const callLogs = [
    {
      id: '1',
      date: '2025-01-15 14:30',
      number: '+52 55 1234 5678',
      duration: '3:45',
      status: 'Completada',
      cost: '$0.78',
      sentiment: 'Positivo',
      intent: 'Agendar cita'
    },
    {
      id: '2',
      date: '2025-01-15 12:15',
      number: '+52 55 8765 4321',
      duration: '2:12',
      status: 'Transferida',
      cost: '$0.46',
      sentiment: 'Neutral',
      intent: 'Consulta médica'
    },
    {
      id: '3',
      date: '2025-01-15 10:45',
      number: '+52 55 9876 5432',
      duration: '5:30',
      status: 'Completada',
      cost: '$1.15',
      sentiment: 'Muy positivo',
      intent: 'Información productos'
    },
    {
      id: '4',
      date: '2025-01-14 16:20',
      number: '+52 55 5555 1234',
      duration: '1:30',
      status: 'Fallida',
      cost: '$0.00',
      sentiment: 'N/A',
      intent: 'Desconocido'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completada': return 'bg-green-100 text-green-800';
      case 'Transferida': return 'bg-blue-100 text-blue-800';
      case 'Fallida': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Muy positivo': return 'bg-green-100 text-green-800';
      case 'Positivo': return 'bg-emerald-100 text-emerald-800';
      case 'Neutral': return 'bg-yellow-100 text-yellow-800';
      case 'Negativo': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLogs = callLogs.filter(log => {
    const matchesSearch = log.number.includes(searchTerm) || log.intent.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || log.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleLaunchAgent = () => {
    // Aquí se implementaría la lógica para lanzar el agente
    console.log('Lanzando agente de voz con configuración:', config);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">📊</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Registro y análisis de llamadas
        </h2>
        <p className="text-gray-600">
          Monitorea el rendimiento de tu agente de voz
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Phone className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-gray-800">24</p>
                <p className="text-sm text-gray-600">Llamadas hoy</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Clock className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-gray-800">4:32</p>
                <p className="text-sm text-gray-600">Duración promedio</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold text-gray-800">$12.45</p>
                <p className="text-sm text-gray-600">Costo total hoy</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold text-gray-800">89%</p>
                <p className="text-sm text-gray-600">Satisfacción</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filtros y búsqueda</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Buscar por número o intención..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="Completada">Completadas</SelectItem>
                  <SelectItem value="Transferida">Transferidas</SelectItem>
                  <SelectItem value="Fallida">Fallidas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Exportar CSV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Llamadas recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha/Hora</TableHead>
                  <TableHead>Número</TableHead>
                  <TableHead>Duración</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Costo</TableHead>
                  <TableHead>Sentimiento</TableHead>
                  <TableHead>Intención</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.date}</TableCell>
                    <TableCell>{log.number}</TableCell>
                    <TableCell>{log.duration}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(log.status)}>
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{log.cost}</TableCell>
                    <TableCell>
                      <Badge className={getSentimentColor(log.sentiment)}>
                        {log.sentiment}
                      </Badge>
                    </TableCell>
                    <TableCell>{log.intent}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Play className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Configuration Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen de configuración</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Configuración básica</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nombre del agente:</span>
                  <span className="font-medium">{config.basicConfig?.agentName || 'No configurado'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Modelo:</span>
                  <span className="font-medium">{config.basicConfig?.model || 'No configurado'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Idioma:</span>
                  <span className="font-medium">{config.basicConfig?.language || 'No configurado'}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Proveedores configurados</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">LLM:</span>
                  <Badge variant={config.providers?.llm?.validated ? 'default' : 'secondary'}>
                    {config.providers?.llm?.validated ? 'Conectado' : 'Pendiente'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">TTS:</span>
                  <Badge variant={config.providers?.tts?.validated ? 'default' : 'secondary'}>
                    {config.providers?.tts?.validated ? 'Conectado' : 'Pendiente'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">STT:</span>
                  <Badge variant={config.providers?.stt?.validated ? 'default' : 'secondary'}>
                    {config.providers?.stt?.validated ? 'Conectado' : 'Pendiente'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Launch Agent */}
      <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-purple-800 mb-2">
            ¡Tu agente de voz está listo!
          </h3>
          <p className="text-purple-700 mb-4">
            Has completado toda la configuración. Puedes lanzar tu agente o volver atrás para ajustar algo.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" onClick={onBack}>
              Volver y ajustar
            </Button>
            <Button 
              onClick={handleLaunchAgent}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8"
            >
              <Phone className="w-5 h-5 mr-2" />
              Lanzar Agente de Voz
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
