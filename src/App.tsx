import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { AccountLinkingPage } from './components/AccountLinkingPage';
import { PerkOnboarding } from './components/PerkOnboarding';
import { SoundScore } from './components/SoundScore';
import { SoundGrowFunds } from './components/SoundGrowFunds';
import { RealtimeAlerts } from './components/RealtimeAlerts';
import { MonthlyJournal } from './components/MonthlyJournal';
import { UnusedPerks } from './components/UnusedPerks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { CreditCard, Sparkles, TrendingUp, Award, Smartphone } from 'lucide-react';
import { Button } from './components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';

// Mock data for unused perks
const mockUnusedPerks = [
  {
    id: 1,
    title: 'Visa Signature Concierge Service',
    description: 'Personal assistance for travel, dining, and event bookings',
    howToUse: 'Call the number on the back of your Sound Cash Back Card and ask for concierge service',
    estimatedValue: '$50-200/use',
    category: 'Premium',
    source: 'Sound Cash Back Card',
  },
  {
    id: 2,
    title: 'Hotel Portfolio Benefits',
    description: 'Exclusive rates and perks at participating luxury hotels',
    howToUse: 'Book through the Visa Signature hotel portal when planning travel',
    estimatedValue: '$100-500/trip',
    category: 'Premium',
    source: 'Sound Cash Back Card',
    lastUsed: 'Never',
  },
  {
    id: 3,
    title: 'Early Paycheck Access',
    description: 'Get paid up to 2 days early with direct deposit',
    howToUse: 'Set up direct deposit to your Sound checking account',
    estimatedValue: '$0 (time value)',
    category: 'Banking',
    source: 'Sound Credit Union',
    lastUsed: 'Never',
  },
];

// Mock data for SoundScore
const mockSoundScoreData = {
  score: 78,
  trend: 'up' as const,
  breakdown: [
    { category: 'Perk Usage', score: 22, maxScore: 25, status: 'great' as const },
    { category: 'Card Optimization', score: 18, maxScore: 25, status: 'good' as const },
    { category: 'Spending Awareness', score: 20, maxScore: 25, status: 'great' as const },
    { category: 'Benefit Discovery', score: 18, maxScore: 25, status: 'good' as const },
  ],
};

// Mock data for SoundGrow Funds
const mockSoundGrowData = {
  totalSaved: 147.35,
  thisMonth: 43.20,
  projectedYearly: 518.40,
  apy: 4.5,
  interestEarned: 2.15,
  recentSavings: [
    {
      id: 1,
      date: 'Nov 7, 2025',
      description: 'Used Costco member discount',
      amount: 12.50,
      type: 'perk' as const,
    },
    {
      id: 2,
      date: 'Nov 6, 2025',
      description: 'Cash back on dining',
      amount: 8.40,
      type: 'reward' as const,
    },
    {
      id: 3,
      date: 'Nov 5, 2025',
      description: 'Used optimal card for gas',
      amount: 3.25,
      type: 'optimization' as const,
    },
    {
      id: 4,
      date: 'Nov 4, 2025',
      description: 'Hotel discount applied',
      amount: 45.00,
      type: 'perk' as const,
    },
    {
      id: 5,
      date: 'Nov 3, 2025',
      description: 'Cash back on groceries',
      amount: 15.60,
      type: 'reward' as const,
    },
  ],
};

// Mock data for Real-time Alerts
const mockRealtimeAlerts = [
  {
    id: 1,
    time: '2 hours ago',
    merchant: 'Costco',
    location: 'Seattle, WA',
    suggestion: 'Use Sound Cash Back Card for 5% back',
    savings: 12.50,
    status: 'acted' as const,
  },
  {
    id: 2,
    time: '1 day ago',
    merchant: 'Olive Garden',
    location: 'Tacoma, WA',
    suggestion: 'Activate restaurant loyalty for 10% back',
    savings: 6.85,
    status: 'missed' as const,
  },
  {
    id: 3,
    time: '2 days ago',
    merchant: 'Shell Gas',
    location: 'Seattle, WA',
    suggestion: 'Use Sound Rewards Card for 5¢/gallon off',
    savings: 3.25,
    status: 'acted' as const,
  },
  {
    id: 4,
    time: '3 days ago',
    merchant: 'Amazon',
    location: 'Online',
    suggestion: 'Use Amazon Prime card for 5% back',
    savings: 6.25,
    status: 'pending' as const,
  },
];

// Mock data for Monthly Journal
const mockJournalData = {
  month: 'November 2025',
  totalRecovered: 147.35,
  soundGrowBalance: 147.35,
  soundScore: 78,
  entries: [
    {
      category: 'Dining & Entertainment',
      recovered: 42.50,
      opportunities: 8,
      topWin: 'Used cash back card at restaurants (saved $18.40)',
    },
    {
      category: 'Travel & Hotels',
      recovered: 58.25,
      opportunities: 3,
      topWin: 'Visa Signature hotel discount (saved $45.00)',
    },
    {
      category: 'Shopping & Groceries',
      recovered: 31.80,
      opportunities: 12,
      topWin: 'Costco member discount (saved $12.50)',
    },
    {
      category: 'Gas & Transportation',
      recovered: 14.80,
      opportunities: 5,
      topWin: 'Used rewards card at gas station (saved $3.25/fill-up)',
    },
  ],
};

// Mock data for card recommendations
const mockCardRecommendations = [
  {
    category: 'Dining',
    currentCard: 'Sound Rewards Card',
    recommendedCard: 'Sound Cash Back Card',
    monthlySpending: 680,
    currentRewards: 6.80,
    potentialRewards: 10.20,
    difference: 3.40,
  },
  {
    category: 'Groceries',
    currentCard: 'Sound Cash Back Card',
    recommendedCard: 'Sound Cash Back Card',
    monthlySpending: 920,
    currentRewards: 13.80,
    potentialRewards: 13.80,
    difference: 0,
  },
  {
    category: 'Gas',
    currentCard: 'Sound Cash Back Card',
    recommendedCard: 'Sound Rewards Card',
    monthlySpending: 240,
    currentRewards: 3.60,
    potentialRewards: 4.80,
    difference: 1.20,
  },
];

export default function App() {
  // Auth state management
  const [authState, setAuthState] = useState<'login' | 'linking' | 'perk-onboarding' | 'dashboard'>('login');
  const [userName, setUserName] = useState('');
  const [smsEnabled, setSmsEnabled] = useState(true);

  // Auth handlers
  const handleGoogleLogin = () => {
    setUserName('Jordan Smith');
    setAuthState('linking');
  };

  const handleAccountLinked = () => {
    setAuthState('perk-onboarding');
  };

  const handleSkipLinking = () => {
    setAuthState('dashboard');
  };

  // Show login page
  if (authState === 'login') {
    return <LoginPage onGoogleLogin={handleGoogleLogin} />;
  }

  // Show account linking page
  if (authState === 'linking') {
    return (
      <AccountLinkingPage 
        userName={userName}
        onComplete={handleAccountLinked}
        onSkip={handleSkipLinking}
      />
    );
  }

  // Show perk onboarding page
  if (authState === 'perk-onboarding') {
    return (
      <PerkOnboarding 
        onComplete={() => setAuthState('dashboard')}
        onSkip={() => setAuthState('dashboard')}
      />
    );
  }

  // Show dashboard
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-slate-900">SoundSmart</h1>
              <p className="text-slate-500 mt-1">AI Financial Co-Pilot for Sound Credit Union Members</p>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <p className="text-xs text-slate-500">SoundGrow Balance</p>
                <p className="text-2xl text-green-600 mt-0.5">${mockSoundGrowData.totalSaved.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">SoundScore</p>
                <p className="text-2xl text-purple-600 mt-0.5">{mockSoundScoreData.score}/100</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        
        {/* Hero Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-green-100 mb-2">Your Savings This Month</p>
                <p className="text-5xl mb-4">${mockSoundGrowData.thisMonth.toFixed(2)}</p>
                <p className="text-green-50">
                  Automatically saved • Earning 4.5% APY • On track for ${mockSoundGrowData.projectedYearly.toFixed(2)}/year
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                <Award className="w-8 h-8 mx-auto mb-2" />
                <p className="text-3xl">{mockSoundScoreData.score}</p>
                <p className="text-xs text-green-100 mt-1">SoundScore</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-slate-200 p-1">
            <TabsTrigger value="overview" className="gap-2">
              <Sparkles className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="perks" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              My Perks
            </TabsTrigger>
            <TabsTrigger value="cards" className="gap-2">
              <CreditCard className="w-4 h-4" />
              Cards
            </TabsTrigger>
            <TabsTrigger value="alerts" className="gap-2">
              <Smartphone className="w-4 h-4" />
              Alerts
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SoundScore
                score={mockSoundScoreData.score}
                trend={mockSoundScoreData.trend}
                breakdown={mockSoundScoreData.breakdown}
              />
              
              <SoundGrowFunds
                totalSaved={mockSoundGrowData.totalSaved}
                thisMonth={mockSoundGrowData.thisMonth}
                recentSavings={mockSoundGrowData.recentSavings}
                projectedYearly={mockSoundGrowData.projectedYearly}
                apy={mockSoundGrowData.apy}
                interestEarned={mockSoundGrowData.interestEarned}
              />
            </div>

            <MonthlyJournal
              month={mockJournalData.month}
              totalRecovered={mockJournalData.totalRecovered}
              entries={mockJournalData.entries}
              soundGrowBalance={mockJournalData.soundGrowBalance}
              soundScore={mockJournalData.soundScore}
            />
          </TabsContent>

          {/* Perks Tab */}
          <TabsContent value="perks" className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-xl text-slate-900 mb-1">Benefits You Haven't Used</h2>
              <p className="text-sm text-slate-500 mb-6">Activate these to boost your SoundScore</p>
              <UnusedPerks perks={mockUnusedPerks} />
            </div>
          </TabsContent>

          {/* Cards Tab */}
          <TabsContent value="cards" className="space-y-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Smart Card Recommendations</CardTitle>
                <CardDescription>
                  Use the right card for each category to maximize rewards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCardRecommendations.map((rec) => (
                    <div
                      key={rec.category}
                      className={`p-5 rounded-xl transition-all ${
                        rec.difference > 0
                          ? 'bg-amber-50 border-2 border-amber-200'
                          : 'bg-slate-50 border border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="text-slate-900">{rec.category}</h4>
                          <p className="text-sm text-slate-600">
                            ${rec.monthlySpending}/month
                          </p>
                        </div>
                        {rec.difference > 0 ? (
                          <div className="text-right">
                            <p className="text-xs text-amber-700">Potential Extra</p>
                            <p className="text-2xl text-amber-600">+${rec.difference.toFixed(2)}</p>
                            <p className="text-xs text-amber-600">per month</p>
                          </div>
                        ) : (
                          <div className="px-4 py-2 bg-green-100 rounded-lg">
                            <p className="text-green-700 text-sm">✓ Optimized</p>
                          </div>
                        )}
                      </div>
                      {rec.difference > 0 && (
                        <div className="mt-4 p-4 bg-white rounded-lg border border-amber-300">
                          <p className="text-sm text-slate-700 mb-3">
                            Switch to <strong>{rec.recommendedCard}</strong>
                          </p>
                          <Button size="sm" className="bg-amber-600 hover:bg-amber-700 w-full">
                            Set as Default
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <RealtimeAlerts
              alerts={mockRealtimeAlerts}
              smsEnabled={smsEnabled}
              onToggleSMS={setSmsEnabled}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}