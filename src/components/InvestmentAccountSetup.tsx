import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { TrendingUp, Shield, Building2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface InvestmentAccountSetupProps {
  onComplete: (accountType: string) => void;
  onCancel: () => void;
}

export function InvestmentAccountSetup({ onComplete, onCancel }: InvestmentAccountSetupProps) {
  const [step, setStep] = useState<'select' | 'link' | 'confirm'>('select');
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [linking, setLinking] = useState(false);

  const accountTypes = [
    {
      id: 'roth-ira',
      name: 'Roth IRA',
      description: 'Tax-free growth for retirement',
      badge: 'Recommended',
      benefits: ['Tax-free withdrawals in retirement', 'No required distributions', 'Contributions grow tax-free'],
      icon: '🏆',
    },
    {
      id: 'traditional-ira',
      name: 'Traditional IRA',
      description: 'Tax-deductible contributions',
      benefits: ['Tax deduction now', 'Tax-deferred growth', 'Lower current tax bill'],
      icon: '📊',
    },
    {
      id: 'brokerage',
      name: 'Brokerage Account',
      description: 'Flexible investing with no restrictions',
      benefits: ['Withdraw anytime', 'No contribution limits', 'Full flexibility'],
      icon: '💼',
    },
    {
      id: 'sound-savings',
      name: 'Sound High-Yield Savings',
      description: 'Safe, liquid savings with competitive rates',
      benefits: ['NCUA insured', 'No market risk', 'Instant access'],
      icon: '🏦',
    },
  ];

  const handleSelectAccount = (accountId: string) => {
    setSelectedAccount(accountId);
    setStep('link');
  };

  const handleLink = () => {
    setLinking(true);
    // Simulate linking process
    setTimeout(() => {
      setLinking(false);
      setStep('confirm');
    }, 2000);
  };

  const handleComplete = () => {
    const account = accountTypes.find(a => a.id === selectedAccount);
    onComplete(account?.name || 'Investment Account');
    onCancel();
  };

  const handleReset = () => {
    setStep('select');
    setSelectedAccount('');
    setLinking(false);
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {step === 'select' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Choose Your Investment Account</DialogTitle>
              <DialogDescription>
                Select where you'd like to automatically invest your savings
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 mt-4">
              {accountTypes.map((account) => (
                <button
                  key={account.id}
                  onClick={() => handleSelectAccount(account.id)}
                  className="w-full p-5 bg-white border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{account.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg text-slate-900">{account.name}</h3>
                        {account.badge && (
                          <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                            {account.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{account.description}</p>
                      <ul className="space-y-1">
                        {account.benefits.map((benefit, idx) => (
                          <li key={idx} className="text-xs text-slate-600 flex items-center gap-1">
                            <span className="text-green-600">✓</span> {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mt-4">
              <div className="flex gap-2">
                <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
                <p className="text-xs text-blue-900">
                  Your investment account will be managed by Sound Credit Union's partner, 
                  with SIPC protection up to $500,000. You can change or disconnect this anytime.
                </p>
              </div>
            </div>
          </>
        )}

        {step === 'link' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Link Your {accountTypes.find(a => a.id === selectedAccount)?.name}
              </DialogTitle>
              <DialogDescription>
                Connect your investment account to enable auto-investing
              </DialogDescription>
            </DialogHeader>

            {!linking ? (
              <div className="space-y-6 mt-4">
                <div className="p-6 bg-slate-50 rounded-lg">
                  <h3 className="text-slate-900 mb-3">You'll be able to:</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <p className="text-sm text-slate-700">Automatically invest savings with one tap</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <p className="text-sm text-slate-700">Set up recurring micro-investments</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <p className="text-sm text-slate-700">Track all investments in one dashboard</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="account-number">Account Number</Label>
                    <Input 
                      id="account-number" 
                      type="text" 
                      placeholder="Enter your account number"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="routing-number">Routing Number</Label>
                    <Input 
                      id="routing-number" 
                      type="text" 
                      placeholder="Enter routing number"
                      className="mt-1"
                      defaultValue="325081403"
                    />
                    <p className="text-xs text-slate-500 mt-1">Sound Credit Union routing number</p>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-900 mb-2">
                    <strong>Contribution Limits for 2025:</strong>
                  </p>
                  <p className="text-xs text-green-800">
                    {selectedAccount === 'roth-ira' || selectedAccount === 'traditional-ira' 
                      ? 'IRA: $7,000/year ($8,000 if age 50+)'
                      : 'No annual limits for brokerage or savings accounts'}
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleReset} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handleLink} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Shield className="w-4 h-4 mr-2" />
                    Securely Link Account
                  </Button>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <h3 className="text-xl text-slate-900 mb-2">Linking your account...</h3>
                <p className="text-slate-600">Verifying details securely</p>
              </div>
            )}
          </>
        )}

        {step === 'confirm' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">All Set! 🎉</DialogTitle>
              <DialogDescription>
                Your investment account is now connected
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl border-2 border-green-300 text-center">
                <div className="text-5xl mb-3">✓</div>
                <h3 className="text-xl text-slate-900 mb-2">
                  {accountTypes.find(a => a.id === selectedAccount)?.name} Connected
                </h3>
                <p className="text-sm text-slate-600">
                  You can now start investing your savings automatically
                </p>
              </div>

              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="text-slate-900 mb-2">Next Steps:</h4>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="text-blue-600">1.</span>
                    <span>We'll send SMS alerts when you save money</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600">2.</span>
                    <span>Tap "Invest" to move savings to your account</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600">3.</span>
                    <span>Watch your investments grow over time</span>
                  </li>
                </ul>
              </div>

              <Button onClick={handleComplete} className="w-full h-12 bg-green-600 hover:bg-green-700">
                <TrendingUp className="w-4 h-4 mr-2" />
                Start Investing
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}