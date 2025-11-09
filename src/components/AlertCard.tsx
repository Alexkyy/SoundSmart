import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface AlertCardProps {
  alert: {
    id: number;
    type: 'warning' | 'success' | 'info';
    message: string;
    timestamp: string;
  };
}

export function AlertCard({ alert }: AlertCardProps) {
  const getIcon = () => {
    switch (alert.type) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
      case 'success':
        return <CheckCircle className="w-4 h-4" />;
      case 'info':
        return <Info className="w-4 h-4" />;
    }
  };

  const getColorClasses = () => {
    switch (alert.type) {
      case 'warning':
        return 'border-amber-200 bg-amber-50 text-amber-900';
      case 'success':
        return 'border-green-200 bg-green-50 text-green-900';
      case 'info':
        return 'border-blue-200 bg-blue-50 text-blue-900';
    }
  };

  return (
    <Alert className={getColorClasses()}>
      <div className="flex items-start gap-3">
        {getIcon()}
        <div className="flex-1">
          <AlertDescription className="text-sm">
            {alert.message}
          </AlertDescription>
          <p className="text-xs mt-1 opacity-70">{alert.timestamp}</p>
        </div>
      </div>
    </Alert>
  );
}
