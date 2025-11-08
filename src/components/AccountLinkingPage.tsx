import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Building2, Lock, CheckCircle2, ArrowRight, Shield } from 'lucide-react';
import { useState } from 'react';

interface AccountLinkingPageProps {
  userName: string;
  onComplete: () => void;
  onSkip: () => void;
}

export function AccountLinkingPage({ userName, onComplete, onSkip }: AccountLinkingPageProps) {
  const [linking, setLinking] = useState(false);

  const handleLink = () => {
    setLinking(true);
    // Simulate linking process
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl text-slate-900">Sound Credit Union</h1>
                <p className="text-sm text-slate-600">Account Setup</p>
              </div>
            </div>
            <Button variant="ghost" onClick={onSkip}>
              Skip for now
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        {/* Progress */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-slate-600">Sign In</span>
            </div>
            <div className="w-16 h-0.5 bg-blue-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                2
              </div>
              <span className="text-sm text-slate-900">Link Account</span>
            </div>
            <div className="w-16 h-0.5 bg-slate-200"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-400">
                3
              </div>
              <span className="text-sm text-slate-400">Dashboard</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-4xl text-slate-900 mb-3">
            Welcome, {userName}! 👋
          </h2>
          <p className="text-xl text-slate-600">
            Link your Sound Credit Union account to unlock personalized insights
          </p>
        </div>

        {/* Linking Card */}
        <Card className="border-2 mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Connect Your Sound CU Account</CardTitle>
            <CardDescription>
              We use secure, read-only access to analyze your transactions and help you save more
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!linking ? (
              <>
                {/* What We'll Access */}
                <div className="p-6 bg-slate-50 rounded-lg">
                  <h3 className="text-slate-900 mb-4">What we'll access:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-slate-900">Transaction History</p>
                        <p className="text-sm text-slate-600">
                          To identify savings opportunities and spending patterns
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-slate-900">Account Balances</p>
                        <p className="text-sm text-slate-600">
                          To track your financial wellness and goals
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-slate-900">Credit Card Rewards</p>
                        <p className="text-sm text-slate-600">
                          To recommend which card to use for maximum benefits
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Plaid-style Connection */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="username">Sound CU Online Banking Username</Label>
                    <Input 
                      id="username" 
                      type="text" 
                      placeholder="Enter your username"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Enter your password"
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Security Notice */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex gap-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-900 mb-1">
                        Bank-level security with 256-bit encryption
                      </p>
                      <p className="text-xs text-blue-800">
                        Your credentials are encrypted and never stored. We use read-only access 
                        through Sound Credit Union's official API. You can revoke access anytime.
                      </p>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleLink}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Securely Link Account
                </Button>

                <p className="text-xs text-center text-slate-500">
                  Connection powered by Plaid • Used by millions of users
                </p>
              </>
            ) : (
              <div className="py-12 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <h3 className="text-xl text-slate-900 mb-2">Connecting to Sound Credit Union...</h3>
                <p className="text-slate-600">This should only take a moment</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Why Link */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg border border-slate-200">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="text-slate-900 mb-2">Auto-Invest Savings</h3>
            <p className="text-sm text-slate-600">
              Get SMS alerts and invest every dollar you save with one tap
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg border border-slate-200">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-slate-900 mb-2">Smart Card Picks</h3>
            <p className="text-sm text-slate-600">
              See which credit card to use in real-time for maximum rewards
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg border border-slate-200">
            <div className="text-3xl mb-3">🛡️</div>
            <h3 className="text-slate-900 mb-2">Early Help</h3>
            <p className="text-sm text-slate-600">
              AI detects financial stress early so we can help before it's urgent
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
