import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { MapPin, Calendar, ShoppingBag, Plane } from 'lucide-react';
import { Badge } from './ui/badge';

interface Reminder {
  id: number;
  type: 'location' | 'time' | 'category' | 'event';
  title: string;
  message: string;
  perkToUse: string;
  action: string;
  urgency: 'high' | 'medium' | 'low';
}

interface ContextualRemindersProps {
  reminders: Reminder[];
}

export function ContextualReminders({ reminders }: ContextualRemindersProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'location':
        return MapPin;
      case 'time':
        return Calendar;
      case 'category':
        return ShoppingBag;
      case 'event':
        return Plane;
      default:
        return MapPin;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'low':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Smart Reminders
        </CardTitle>
        <CardDescription>Use the right perk at the right time</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {reminders.map((reminder) => {
          const Icon = getIcon(reminder.type);
          return (
            <div
              key={reminder.id}
              className={`p-4 rounded-lg border ${getUrgencyColor(reminder.urgency)}`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  reminder.urgency === 'high' ? 'bg-red-100' :
                  reminder.urgency === 'medium' ? 'bg-amber-100' : 'bg-blue-100'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium">{reminder.title}</p>
                    {reminder.urgency === 'high' && (
                      <Badge variant="destructive" className="text-xs">
                        Act Now
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm opacity-90 mb-2">{reminder.message}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs opacity-75">Use: {reminder.perkToUse}</p>
                    <p className="text-xs underline cursor-pointer">{reminder.action}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
