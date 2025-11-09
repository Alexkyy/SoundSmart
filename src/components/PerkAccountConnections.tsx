import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CheckCircle2, Link2, AlertCircle, ExternalLink, Plus } from 'lucide-react';
import { useState } from 'react';

interface ConnectedAccount {
  id: string;
  name: string;
  type: 'merchant' | 'travel' | 'entertainment' | 'dining' | 'insurance';
  connected: boolean;
  availablePerks: number;
  potentialSavings: string;
  logo: string;
}

interface PerkAccountConnectionsProps {
  onConnect: (accountId: string) => void;
}

export function PerkAccountConnections({ onConnect }: PerkAccountConnectionsProps) {
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([
    {
      id: 'costco',
      name: 'Costco Membership',
      type: 'merchant',
      connected: false,
      availablePerks: 3,
      potentialSavings: '$180/year',
      logo: '🏪',
    },
    {
      id: 'aaa',
      name: 'AAA Auto Club',
      type: 'travel',
      connected: false,
      availablePerks: 8,
      potentialSavings: '$250/year',
      logo: '🚗',
    },
    {
      id: 'hotels',
      name: 'Hotel Rewards Programs',
      type: 'travel',
      connected: false,
      availablePerks: 12,
      potentialSavings: '$400/year',
      logo: '🏨',
    },
    {
      id: 'amazon',
      name: 'Amazon Prime',
      type: 'merchant',
      connected: true,
      availablePerks: 5,
      potentialSavings: '$120/year',
      logo: '📦',
    },
    {
      id: 'restaurants',
      name: 'Restaurant Loyalty',
      type: 'dining',
      connected: false,
      availablePerks: 6,
      potentialSavings: '$300/year',
      logo: '🍽️',
    },
    {
      id: 'streaming',
      name: 'Streaming Services',
      type: 'entertainment',
      connected: false,
      availablePerks: 4,
      potentialSavings: '$96/year',
      logo: '🎬',
    },
  ]);

  const connectedAccounts = accounts.filter(acc => acc.connected);
  const unconnectedAccounts = accounts.filter(acc => !acc.connected);
  
  const totalPotentialSavings = unconnectedAccounts.reduce((sum, acc) => {
    const amount = parseInt(acc.potentialSavings.replace(/[^0-9]/g, ''));
    return sum + amount;
  }, 0);

  const handleConnect = (accountId: string) => {
    setAccounts(accounts.map(acc => 
      acc.id === accountId ? { ...acc, connected: true } : acc
    ));
    onConnect(accountId);
  };

  return (
    <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Link2 className="w-5 h-5 text-purple-600" />
              Connected Accounts
            </CardTitle>
            <CardDescription className="text-purple-900">
              Link your memberships to unlock hidden perks automatically
            </CardDescription>
          </div>
          <div className="text-right">
            <p className="text-xs text-purple-700">Missing Out On</p>
            <p className="text-2xl text-purple-600">${totalPotentialSavings}</p>
            <p className="text-xs text-purple-700">/year</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Connected Accounts */}
        {connectedAccounts.length > 0 && (
          <div>
            <h3 className="text-sm text-slate-700 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              Connected ({connectedAccounts.length})
            </h3>
            <div className="space-y-2">
              {connectedAccounts.map((account) => (
                <div
                  key={account.id}
                  className="p-3 bg-white rounded-lg border border-green-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{account.logo}</div>
                    <div>
                      <p className="text-sm text-slate-900">{account.name}</p>
                      <p className="text-xs text-green-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {account.availablePerks} perks active
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                    Connected
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Unconnected Accounts */}
        {unconnectedAccounts.length > 0 && (
          <div>
            <h3 className="text-sm text-slate-700 mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              Available to Connect ({unconnectedAccounts.length})
            </h3>
            <div className="space-y-2">
              {unconnectedAccounts.map((account) => (
                <div
                  key={account.id}
                  className="p-4 bg-white rounded-lg border-2 border-slate-200 hover:border-purple-300 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{account.logo}</div>
                      <div>
                        <p className="text-sm text-slate-900">{account.name}</p>
                        <p className="text-xs text-slate-600">
                          {account.availablePerks} perks available
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-600">Save up to</p>
                      <p className="text-purple-600">{account.potentialSavings}</p>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => handleConnect(account.id)}
                    size="sm"
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Connect Account
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Banner */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-900 mb-2">
            <strong>How it works:</strong>
          </p>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• We scan your connected accounts for available perks</li>
            <li>• Get SMS alerts when you're near a location with perks</li>
            <li>• Auto-apply discounts and rewards when available</li>
            <li>• Track all your savings in one dashboard</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
