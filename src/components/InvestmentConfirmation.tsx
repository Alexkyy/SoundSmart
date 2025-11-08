import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { TrendingUp, DollarSign, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface InvestmentConfirmationProps {
  amount: number;
  opportunities?: Array<{
    id: number;
    description: string;
    amount: number;
  }>;
  onConfirm: () => void;
  onCancel: () => void;
}

export function InvestmentConfirmation({ 
  amount,
  opportunities = [],
  onConfirm,
  onCancel
}: InvestmentConfirmationProps) {
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const accountName = 'Roth IRA'; // This would come from linked account

  const handleConfirm = () => {
    setConfirming(true);
    // Simulate investment process
    setTimeout(() => {
      setConfirming(false);
      setConfirmed(true);
      setTimeout(() => {
        onConfirm();
        onCancel();
        // Reset state after closing
        setTimeout(() => {
          setConfirmed(false);
        }, 300);
      }, 2000);
    }, 1500);
  };

  const projectedAnnual = amount * 12;
  const projectedGrowth = projectedAnnual * 1.08; // Assuming 8% annual return

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-lg">
        {!confirmed ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Confirm Investment</DialogTitle>
              <DialogDescription>
                Review the details before investing your savings
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              {/* Amount Display */}
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl border-2 border-green-300 text-center">
                <p className="text-sm text-green-900 mb-2">You're investing</p>
                <p className="text-5xl text-green-700 mb-2">${amount.toFixed(2)}</p>
                <div className="flex items-center justify-center gap-2 text-green-800">
                  <ArrowRight className="w-4 h-4" />
                  <span className="text-sm">{accountName}</span>
                </div>
              </div>

              {/* Breakdown */}
              {opportunities.length > 0 && (
                <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                  <h3 className="text-sm text-slate-900 mb-3">What you're investing:</h3>
                  <div className="space-y-2">
                    {opportunities.map((opp) => (
                      <div key={opp.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-3 h-3 text-slate-600" />
                          <span className="text-slate-700">{opp.description}</span>
                        </div>
                        <span className="text-slate-900">${opp.amount.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projections */}
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-sm text-blue-900 mb-3">If you keep this up:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-blue-800">Annual Savings</p>
                    <p className="text-xl text-blue-700">${projectedAnnual.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-800">With 8% Growth*</p>
                    <p className="text-xl text-blue-700">${projectedGrowth.toFixed(2)}</p>
                  </div>
                </div>
                <p className="text-xs text-blue-700 mt-3">
                  *Projected first year growth. Past performance doesn't guarantee future results.
                </p>
              </div>

              {/* Important Info */}
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h4 className="text-sm text-amber-900 mb-2">Important:</h4>
                <ul className="space-y-1 text-xs text-amber-800">
                  <li>• This transfer typically completes in 1-3 business days</li>
                  <li>• You can cancel or modify before market close</li>
                  {accountName.includes('IRA') && (
                    <li>• This counts toward your annual IRA contribution limit</li>
                  )}
                  <li>• You'll receive a confirmation email</li>
                </ul>
              </div>

              {/* Actions */}
              {!confirming ? (
                <div className="flex gap-3">
                  <Button variant="outline" onClick={onCancel} className="flex-1">
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleConfirm} 
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Confirm & Invest
                  </Button>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-green-600 mb-3"></div>
                  <p className="text-slate-700">Processing investment...</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl text-slate-900 mb-2">Investment Confirmed! 🎉</h3>
            <p className="text-slate-600 mb-4">
              ${amount.toFixed(2)} is on its way to your {accountName}
            </p>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-800">
                You'll receive a confirmation email shortly. Keep up the great work!
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}