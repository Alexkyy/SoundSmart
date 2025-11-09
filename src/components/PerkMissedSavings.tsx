import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { TrendingDown, MapPin, Calendar, DollarSign, AlertTriangle } from 'lucide-react';

interface MissedSaving {
  id: number;
  date: string;
  merchant: string;
  location: string;
  amountSpent: number;
  missedPerk: string;
  potentialSaving: number;
  reason: 'not-activated' | 'wrong-card' | 'not-enrolled' | 'expired';
}

interface PerkMissedSavingsProps {
  missedSavings: MissedSaving[];
  totalMissed: number;
  onActivatePerk: (perkId: number) => void;
}

export function PerkMissedSavings({ missedSavings, totalMissed, onActivatePerk }: PerkMissedSavingsProps) {
  const getReasonText = (reason: string) => {
    switch (reason) {
      case 'not-activated':
        return 'Perk not activated';
      case 'wrong-card':
        return 'Used non-rewards card';
      case 'not-enrolled':
        return 'Not enrolled in program';
      case 'expired':
        return 'Perk expired';
      default:
        return 'Unknown';
    }
  };

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case 'not-activated':
        return 'bg-amber-100 text-amber-700 border-amber-300';
      case 'wrong-card':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'not-enrolled':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'expired':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const getActionButton = (saving: MissedSaving) => {
    switch (saving.reason) {
      case 'not-activated':
        return (
          <Button 
            size="sm" 
            onClick={() => onActivatePerk(saving.id)}
            className="bg-amber-600 hover:bg-amber-700"
          >
            Activate Now
          </Button>
        );
      case 'not-enrolled':
        return (
          <Button 
            size="sm" 
            onClick={() => onActivatePerk(saving.id)}
            variant="outline"
          >
            Enroll Free
          </Button>
        );
      case 'wrong-card':
        return (
          <Button 
            size="sm" 
            variant="outline"
          >
            Set Default Card
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-orange-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-red-600" />
              Missed Savings Last 30 Days
            </CardTitle>
            <CardDescription className="text-red-900">
              Money you could have saved with your existing perks
            </CardDescription>
          </div>
          <div className="text-right">
            <p className="text-xs text-red-700">You Missed</p>
            <p className="text-3xl text-red-600">${totalMissed.toFixed(2)}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {missedSavings.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-4xl mb-3">🎉</div>
            <p className="text-slate-900 mb-1">No missed savings!</p>
            <p className="text-sm text-slate-600">
              You're making the most of your perks
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Summary Alert */}
            <div className="p-4 bg-red-100 rounded-lg border-2 border-red-300 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-red-900 mb-1">
                  <strong>You left ${totalMissed.toFixed(2)} on the table this month</strong>
                </p>
                <p className="text-xs text-red-800">
                  These are transactions where you could have used an existing perk but didn't.
                  Let's fix that for next time!
                </p>
              </div>
            </div>

            {/* Missed Opportunities */}
            <div className="space-y-2">
              {missedSavings.slice(0, 5).map((saving) => (
                <div
                  key={saving.id}
                  className="p-4 bg-white rounded-lg border border-red-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm text-slate-900">{saving.merchant}</h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getReasonColor(saving.reason)}`}
                        >
                          {getReasonText(saving.reason)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {saving.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {saving.location}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-600">Spent</p>
                      <p className="text-sm text-slate-900">${saving.amountSpent.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-red-50 rounded-lg border border-red-200 mb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-red-900 mb-1">
                          <strong>Missed Perk:</strong> {saving.missedPerk}
                        </p>
                        <p className="text-xs text-red-800">
                          You could have saved{' '}
                          <span className="text-red-700">${saving.potentialSaving.toFixed(2)}</span>
                        </p>
                      </div>
                      <DollarSign className="w-8 h-8 text-red-400" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    {getActionButton(saving)}
                    {saving.reason !== 'expired' && (
                      <p className="text-xs text-slate-500">
                        Prevent this next time
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {missedSavings.length > 5 && (
              <Button variant="outline" className="w-full">
                View All {missedSavings.length} Missed Opportunities
              </Button>
            )}

            {/* Prevention Tip */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-900 mb-2">
                <strong>💡 Tip:</strong>
              </p>
              <p className="text-xs text-blue-800">
                Enable location alerts and auto-enrollment to never miss perks again.
                We'll send you SMS reminders before you shop.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
