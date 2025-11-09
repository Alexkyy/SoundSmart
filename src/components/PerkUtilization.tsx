import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { TrendingUp, CheckCircle, XCircle } from 'lucide-react';

interface PerkUtilizationProps {
  totalPerks: number;
  usedPerks: number;
  unusedPerks: number;
  potentialSavings: number;
}

export function PerkUtilization({ totalPerks, usedPerks, unusedPerks, potentialSavings }: PerkUtilizationProps) {
  const utilizationRate = (usedPerks / totalPerks) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Perk Utilization
        </CardTitle>
        <CardDescription>Track how well you're using your benefits</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Circular Progress */}
          <div className="flex items-center justify-center">
            <div className="relative w-40 h-40">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#e2e8f0"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#3b82f6"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 70}`}
                  strokeDashoffset={`${2 * Math.PI * 70 * (1 - utilizationRate / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-3xl text-blue-600">{utilizationRate.toFixed(0)}%</p>
                <p className="text-xs text-slate-600">Active</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-slate-600">Used</span>
              </div>
              <p className="text-2xl text-green-600">{usedPerks}</p>
              <p className="text-xs text-slate-600">perks this month</p>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-4 h-4 text-amber-600" />
                <span className="text-sm text-slate-600">Unused</span>
              </div>
              <p className="text-2xl text-amber-600">{unusedPerks}</p>
              <p className="text-xs text-slate-600">perks available</p>
            </div>
          </div>

          {/* Potential Savings */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <p className="text-sm text-slate-600 mb-1">Potential Monthly Savings</p>
            <p className="text-2xl text-blue-600">${potentialSavings.toFixed(2)}</p>
            <p className="text-xs text-slate-600 mt-1">
              if you used all available perks
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
