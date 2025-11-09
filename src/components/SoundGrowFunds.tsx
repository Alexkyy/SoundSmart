import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { TrendingUp, DollarSign, Sparkles, Percent } from 'lucide-react';

interface SavingsEntry {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: 'reward' | 'optimization' | 'perk';
}

interface SoundGrowFundsProps {
  totalSaved: number;
  thisMonth: number;
  recentSavings: SavingsEntry[];
  projectedYearly: number;
  apy: number;
  interestEarned: number;
}

export function SoundGrowFunds({ totalSaved, thisMonth, recentSavings, projectedYearly, apy, interestEarned }: SoundGrowFundsProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'reward':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'optimization':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'perk':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'reward':
        return 'Cash Back';
      case 'optimization':
        return 'Smart Choice';
      case 'perk':
        return 'Perk Used';
      default:
        return type;
    }
  };

  return (
    <Card className="border border-slate-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-green-600" />
              SoundGrow Savings
            </CardTitle>
            <CardDescription>
              High-yield savings @ {apy}% APY
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Main Balance */}
        <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl mb-6 text-center border border-green-100">
          <p className="text-xs text-slate-600 mb-2">Total Balance</p>
          <p className="text-4xl text-green-600 mb-4">${totalSaved.toFixed(2)}</p>
          <div className="flex items-center justify-center gap-6 text-xs">
            <div>
              <p className="text-slate-500">This Month</p>
              <p className="text-green-700">+${thisMonth.toFixed(2)}</p>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div>
              <p className="text-slate-500">Interest</p>
              <p className="text-green-700">+${interestEarned.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Recent Savings */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm text-slate-700">Recent Auto-Deposits</h3>
          </div>
          <div className="space-y-2">
            {recentSavings.slice(0, 4).map((saving) => (
              <div
                key={saving.id}
                className="p-3 bg-slate-50 rounded-lg flex items-center justify-between"
              >
                <div className="flex-1">
                  <p className="text-sm text-slate-900">{saving.description}</p>
                  <p className="text-xs text-slate-500">{saving.date}</p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-green-600">+${saving.amount.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}