import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Smartphone, Bell, MapPin, CheckCircle2, Clock } from 'lucide-react';

interface Alert {
  id: number;
  time: string;
  merchant: string;
  location: string;
  suggestion: string;
  savings: number;
  status: 'acted' | 'missed' | 'pending';
}

interface RealtimeAlertsProps {
  alerts: Alert[];
  smsEnabled: boolean;
  onToggleSMS: (enabled: boolean) => void;
}

export function RealtimeAlerts({ alerts, smsEnabled, onToggleSMS }: RealtimeAlertsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'acted':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'missed':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'acted':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'missed':
        return <Clock className="w-4 h-4 text-red-600" />;
      case 'pending':
        return <Bell className="w-4 h-4 text-amber-600" />;
      default:
        return null;
    }
  };

  const totalSaved = alerts
    .filter(alert => alert.status === 'acted')
    .reduce((sum, alert) => sum + alert.savings, 0);

  const totalMissed = alerts
    .filter(alert => alert.status === 'missed')
    .reduce((sum, alert) => sum + alert.savings, 0);

  return (
    <Card className="border border-slate-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-blue-600" />
              Real-Time SMS Alerts
            </CardTitle>
            <CardDescription>
              Get notified at the moment of purchase
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant={smsEnabled ? "default" : "outline"}
              size="sm"
              onClick={() => onToggleSMS(!smsEnabled)}
              className={smsEnabled ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {smsEnabled ? '✓ Enabled' : 'Enable'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-green-50 rounded-lg text-center border border-green-100">
            <p className="text-xs text-slate-600 mb-1">Saved via Alerts</p>
            <p className="text-2xl text-green-600">${totalSaved.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg text-center border border-red-100">
            <p className="text-xs text-slate-600 mb-1">Missed</p>
            <p className="text-2xl text-red-600">${totalMissed.toFixed(2)}</p>
          </div>
        </div>

        {/* Sample Alert Preview */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-900 mb-2">
            <strong>Example SMS:</strong>
          </p>
          <div className="p-3 bg-white rounded border-l-4 border-blue-500">
            <p className="text-sm text-slate-900 mb-1">
              📍 <strong>You're at Costco!</strong>
            </p>
            <p className="text-sm text-slate-600">
              Use your Sound Cash Back Card for 5% back. Estimated savings: $12.50
            </p>
          </div>
        </div>

        {/* Recent Alerts */}
        <div>
          <h3 className="text-sm text-slate-700 mb-3">Recent Alerts</h3>
          <div className="space-y-2">
            {alerts.slice(0, 4).map((alert) => (
              <div
                key={alert.id}
                className="p-3 bg-slate-50 rounded-lg"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm text-slate-900">{alert.merchant}</p>
                      <Badge variant="outline" className={`text-xs ${getStatusColor(alert.status)}`}>
                        {alert.status === 'acted' && '✓'}
                        {alert.status === 'missed' && '✗'}
                        {alert.status === 'pending' && '⋯'}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500">
                      {alert.location} • {alert.time}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className={alert.status === 'acted' ? 'text-green-600 text-sm' : 'text-slate-500 text-sm'}>
                      ${alert.savings.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}