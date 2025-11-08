import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { CreditCard, TrendingUp, DollarSign } from 'lucide-react';
import { Badge } from './ui/badge';

interface CreditCardOptimizerProps {
  cards: Array<{
    id: number;
    name: string;
    color: string;
    perks: string[];
    annualFee: number;
  }>;
  categories: Array<{
    name: string;
    amount: number;
    recommendedCard: string;
    currentRewards: number;
    potentialRewards: number;
    rewardRate: string;
  }>;
}

export function CreditCardOptimizer({ cards, categories }: CreditCardOptimizerProps) {
  // Calculate rewards per card
  const cardRewards = cards.map(card => {
    const rewards = categories
      .filter(cat => cat.recommendedCard === card.name)
      .reduce((sum, cat) => sum + cat.currentRewards, 0);
    
    const spending = categories
      .filter(cat => cat.recommendedCard === card.name)
      .reduce((sum, cat) => sum + cat.amount, 0);

    return {
      ...card,
      totalRewards: rewards,
      totalSpending: spending,
      netValue: rewards - (card.annualFee / 12), // Monthly net value
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Your Sound Credit Union Cards
        </CardTitle>
        <CardDescription>Member-focused cards with no annual fees</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cardRewards.map((card) => (
            <div 
              key={card.id} 
              className="p-5 rounded-xl border-2 hover:shadow-lg transition-all cursor-pointer"
              style={{
                borderColor: card.color,
                backgroundColor: `${card.color}05`,
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: card.color }}
                    >
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3>{card.name}</h3>
                      <p className="text-sm text-slate-600">
                        {card.annualFee === 0 ? 'No annual fee' : `$${card.annualFee}/year`}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600">Monthly Rewards</p>
                  <p className="text-2xl text-green-600">${card.totalRewards.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {card.perks.map((perk, index) => (
                  <Badge 
                    key={index} 
                    variant="outline"
                    className="bg-white"
                  >
                    {perk}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <p className="text-slate-600">Spending</p>
                    <p className="text-slate-900">${card.totalSpending.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Net Value</p>
                    <p className={card.netValue >= 0 ? 'text-green-600' : 'text-red-600'}>
                      ${card.netValue.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <TrendingUp className="w-3 h-3" />
                  <span>Optimized</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-600 rounded-lg">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-green-900">Total Monthly Rewards</p>
              <p className="text-sm text-green-700">
                You're earning ${cardRewards.reduce((sum, card) => sum + card.totalRewards, 0).toFixed(2)} by using the right cards
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}