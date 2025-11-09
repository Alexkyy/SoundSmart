import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { TrendingUp, MessageSquare, DollarSign, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { InvestmentAccountSetup } from './InvestmentAccountSetup';
import { InvestmentConfirmation } from './InvestmentConfirmation';
import { useState } from 'react';

interface SavingsOpportunity {
  id: number;
  description: string;
  amount: number;
  category: string;
  timestamp: string;
  invested: boolean;
}

interface MicroInvestmentProps {
  opportunities: SavingsOpportunity[];
  totalSaved: number;
  totalInvested: number;
  smsEnabled: boolean;
  onToggleSMS: (enabled: boolean) => void;
  onInvest?: () => void;
}

export function MicroInvestment({ 
  opportunities, 
  totalSaved, 
  totalInvested,
  smsEnabled,
  onToggleSMS,
  onInvest
}: MicroInvestmentProps) {
  const [investmentAccountLinked, setInvestmentAccountLinked] = useState(false);
  const [linkedAccountName, setLinkedAccountName] = useState('');
  const [showAccountSetup, setShowAccountSetup] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [selectedOpportunities, setSelectedOpportunities] = useState<SavingsOpportunity[]>([]);
  
  const availableToInvest = totalSaved - totalInvested;

  const handleInvestAll = () => {
    if (!investmentAccountLinked) {
      setShowAccountSetup(true);
      return;
    }
    
    const uninvestedOpportunities = opportunities.filter(opp => !opp.invested);
    setSelectedAmount(availableToInvest);
    setSelectedOpportunities(uninvestedOpportunities);
    setShowConfirmation(true);
  };

  const handleInvestSingle = (opportunity: SavingsOpportunity) => {
    if (!investmentAccountLinked) {
      setShowAccountSetup(true);
      return;
    }
    
    setSelectedAmount(opportunity.amount);
    setSelectedOpportunities([opportunity]);
    setShowConfirmation(true);
  };

  const handleAccountSetupComplete = (accountName: string) => {
    setInvestmentAccountLinked(true);
    setLinkedAccountName(accountName);
    setShowAccountSetup(false);
  };

  const handleConfirmInvestment = () => {
    if (onInvest) {
      onInvest();
    }
    setShowConfirmation(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Investment Summary & Action */}
        <div className="lg:col-span-2 space-y-6">
          {/* Investment CTA */}
          <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl border-2 border-green-300">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-sm text-green-900">Ready to Invest</p>
                <p className="text-5xl text-green-700 mt-2">${availableToInvest.toFixed(2)}</p>
                <p className="text-sm text-green-800 mt-2">
                  This is money you've saved through rewards, staying under budget, and avoiding fees
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-900">Total Saved</p>
                <p className="text-3xl text-green-700 mt-1">${totalSaved.toFixed(2)}</p>
              </div>
            </div>

            {availableToInvest > 0 && (
              <Button className="w-full bg-green-600 hover:bg-green-700 h-14 text-lg" onClick={handleInvestAll}>
                <TrendingUp className="w-5 h-5 mr-2" />
                Invest ${availableToInvest.toFixed(2)} Now
              </Button>
            )}

            {availableToInvest === 0 && (
              <div className="p-4 bg-white rounded-lg text-center">
                <p className="text-green-800">
                  ✓ All your savings are invested! Keep up the great work.
                </p>
              </div>
            )}
          </div>

          {/* Recent Savings Opportunities */}
          <div>
            <h3 className="text-xl text-slate-900 mb-4">Recent Savings Opportunities</h3>
            <div className="space-y-3">
              {opportunities.map((opp) => (
                <div 
                  key={opp.id} 
                  className={`p-5 rounded-lg border ${
                    opp.invested 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className={`w-4 h-4 ${opp.invested ? 'text-green-600' : 'text-slate-600'}`} />
                        <p className="text-slate-900">{opp.description}</p>
                      </div>
                      <p className="text-xs text-slate-600">{opp.timestamp}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className={`text-xl ${opp.invested ? 'text-green-600' : 'text-slate-900'}`}>
                        ${opp.amount.toFixed(2)}
                      </p>
                      {opp.invested ? (
                        <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300 text-xs mt-1">
                          ✓ Invested
                        </Badge>
                      ) : (
                        <Button size="sm" variant="default" className="text-xs mt-1 bg-green-600 hover:bg-green-700" onClick={() => handleInvestSingle(opp)}>
                          Invest
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: SMS & Info */}
        <div className="space-y-6">
          {/* SMS Notifications */}
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-slate-900">SMS Alerts</p>
                  <p className="text-sm text-slate-600">Get notified instantly</p>
                </div>
              </div>
              <Switch checked={smsEnabled} onCheckedChange={onToggleSMS} />
            </div>

            {smsEnabled && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-900 mb-2">Example:</p>
                <p className="text-sm text-blue-800 italic">
                  "You saved $5.20 at that restaurant! 💰 Want to invest it? Reply YES. -Sound CU"
                </p>
              </div>
            )}
          </div>

          {/* Investment Stats */}
          <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
            <h4 className="text-slate-900 mb-4">Investment Impact</h4>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-600">Total Invested</p>
                <p className="text-2xl text-purple-700">${totalInvested.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Projected Annual</p>
                <p className="text-2xl text-purple-700">${(totalInvested * 12).toFixed(2)}</p>
                <p className="text-xs text-slate-600 mt-1">at current savings rate</p>
              </div>
            </div>
          </div>

          {/* How it Works */}
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="text-slate-900 mb-3">How It Works</h4>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex gap-2">
                <span className="text-green-600">1.</span>
                <p>We track your savings from rewards & budgets</p>
              </div>
              <div className="flex gap-2">
                <span className="text-green-600">2.</span>
                <p>Get SMS alerts when you save money</p>
              </div>
              <div className="flex gap-2">
                <span className="text-green-600">3.</span>
                <p>One-click to invest in your future</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Account Setup */}
      {showAccountSetup && (
        <InvestmentAccountSetup 
          onComplete={handleAccountSetupComplete} 
          onCancel={() => setShowAccountSetup(false)}
        />
      )}

      {/* Investment Confirmation */}
      {showConfirmation && (
        <InvestmentConfirmation 
          amount={selectedAmount}
          opportunities={selectedOpportunities}
          onConfirm={handleConfirmInvestment}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </>
  );
}