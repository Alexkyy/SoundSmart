import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Heart, Users, DollarSign, TrendingDown } from 'lucide-react';

interface MemberValueProps {
  totalSavings: number;
  feesSaved: number;
  rewardsEarned: number;
}

export function MemberValue({ totalSavings, feesSaved, rewardsEarned }: MemberValueProps) {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-blue-600" />
          Your Member Value
        </CardTitle>
        <CardDescription className="text-blue-900">
          As a not-for-profit cooperative, we return profits to you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DollarSign className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm text-slate-700">Total Value This Year</span>
              </div>
            </div>
            <p className="text-3xl text-blue-600">${totalSavings.toFixed(2)}</p>
            <p className="text-xs text-slate-600 mt-1">vs. traditional banks</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown className="w-3 h-3 text-green-600" />
                <span className="text-xs text-slate-600">Fees Saved</span>
              </div>
              <p className="text-xl text-green-600">${feesSaved.toFixed(2)}</p>
            </div>

            <div className="p-3 bg-white rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-1">
                <Heart className="w-3 h-3 text-blue-600" />
                <span className="text-xs text-slate-600">Rewards Earned</span>
              </div>
              <p className="text-xl text-blue-600">${rewardsEarned.toFixed(2)}</p>
            </div>
          </div>

          <div className="p-3 bg-blue-600 rounded-lg text-white">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4" />
              <span className="text-sm">Community First</span>
            </div>
            <p className="text-xs opacity-90">
              Your membership helps us give back to our community through better rates, lower fees, and local support.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
