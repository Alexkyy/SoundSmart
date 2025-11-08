import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { AccountLinkingPage } from './components/AccountLinkingPage';
import { SpendingChart } from './components/SpendingChart';
import { AlertCard } from './components/AlertCard';
import { PerksCard } from './components/PerksCard';
import { GoalSetting } from './components/GoalSetting';
import { CreditCardOptimizer } from './components/CreditCardOptimizer';
import { MemberValue } from './components/MemberValue';
import { UnusedPerks } from './components/UnusedPerks';
import { PerkUtilization } from './components/PerkUtilization';
import { ContextualReminders } from './components/ContextualReminders';
import { MicroInvestment } from './components/MicroInvestment';
import { FinancialWellnessCheck } from './components/FinancialWellnessCheck';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { CreditCard, Bell, Gift, TrendingUp, Sparkles } from 'lucide-react';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';

// Mock data for credit cards
const mockCreditCards = [
  {
    id: 1,
    name: 'Sound Rewards Card',
    color: '#3b82f6',
    perks: ['1 Point per $1', 'No Annual Fee', 'No Foreign Transaction Fees'],
    annualFee: 0,
  },
  {
    id: 2,
    name: 'Sound Cash Back Card',
    color: '#10b981',
    perks: ['1.5% Cash Back', 'Visa Signature Benefits', 'No Foreign Fees'],
    annualFee: 0,
  },
];

// Mock data for spending
const mockSpendingData = {
  current: 2850,
  average: 3100,
  goal: 3000,
  categories: [
    { 
      name: 'Dining', 
      amount: 680, 
      color: '#3b82f6',
      recommendedCard: 'Sound Cash Back Card',
      currentRewards: 10.20,
      potentialRewards: 10.20,
      rewardRate: '1.5%',
    },
    { 
      name: 'Shopping', 
      amount: 920, 
      color: '#10b981',
      recommendedCard: 'Sound Cash Back Card',
      currentRewards: 13.80,
      potentialRewards: 13.80,
      rewardRate: '1.5%',
    },
    { 
      name: 'Travel', 
      amount: 450, 
      color: '#06b6d4',
      recommendedCard: 'Sound Rewards Card',
      currentRewards: 4.50,
      potentialRewards: 4.50,
      rewardRate: '1 pt/$1',
    },
    { 
      name: 'Entertainment', 
      amount: 380, 
      color: '#f59e0b',
      recommendedCard: 'Sound Cash Back Card',
      currentRewards: 5.70,
      potentialRewards: 5.70,
      rewardRate: '1.5%',
    },
    { 
      name: 'Other', 
      amount: 420, 
      color: '#6b7280',
      recommendedCard: 'Sound Cash Back Card',
      currentRewards: 6.30,
      potentialRewards: 6.30,
      rewardRate: '1.5%',
    },
  ],
};

const mockAlerts = [
  {
    id: 1,
    type: 'warning',
    message: 'You\'ve spent 35% more on Shopping this month compared to last month',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    type: 'success',
    message: 'Great job! You\'re spending $250 less than your average - that\'s money back in your pocket',
    timestamp: '1 day ago',
  },
  {
    id: 3,
    type: 'info',
    message: 'Reminder: Free financial education workshop on budgeting this Thursday at 6pm',
    timestamp: '3 hours ago',
  },
];

const mockPerks = [
  {
    id: 1,
    title: '1.5% Cash Back on All Purchases',
    description: 'Sound Cash Back Card - Visa Signature benefits included',
    category: 'Credit Card',
    expiresIn: 'Permanent',
    cardName: 'Sound Cash Back Card',
  },
  {
    id: 2,
    title: 'Earn 1 Point per $1 Spent',
    description: 'Sound Rewards program with flexible redemption options',
    category: 'Credit Card',
    expiresIn: 'Permanent',
    cardName: 'Sound Rewards Card',
  },
  {
    id: 3,
    title: 'No Foreign Transaction Fees',
    description: 'Use your card internationally without extra charges',
    category: 'Credit Card',
    expiresIn: 'Permanent',
    cardName: 'All Cards',
  },
  {
    id: 4,
    title: 'Visa Signature Benefits',
    description: 'Hotel portfolio, fine dining, concierge service & event access',
    category: 'Premium',
    expiresIn: 'Permanent',
    cardName: 'Sound Cash Back Card',
  },
  {
    id: 5,
    title: 'Early Pay Direct Deposit',
    description: 'Get your paycheck up to 2 days earlier with direct deposit',
    category: 'Banking',
    expiresIn: 'Active',
    cardName: 'Sound Credit Union',
  },
  {
    id: 6,
    title: 'No Minimum Balance Required',
    description: 'Prime & Minor savings accounts - just keep them in good standing',
    category: 'Banking',
    expiresIn: 'Permanent',
    cardName: 'Sound Credit Union',
  },
  {
    id: 7,
    title: 'Free AD&D Insurance',
    description: 'Accidental death & dismemberment coverage at no cost',
    category: 'Insurance',
    expiresIn: 'Permanent',
    cardName: 'Sound Credit Union',
  },
  {
    id: 8,
    title: 'Free Financial Education',
    description: 'Access workshops, tools and resources for budgeting & saving',
    category: 'Education',
    expiresIn: 'Permanent',
    cardName: 'Sound Credit Union',
  },
  {
    id: 9,
    title: 'Large Surcharge-Free ATM Network',
    description: 'Easy access to your money with digital banking and ATMs',
    category: 'Banking',
    expiresIn: 'Permanent',
    cardName: 'Sound Credit Union',
  },
  {
    id: 10,
    title: 'Lower Fees & Better Rates',
    description: 'Not-for-profit cooperative returns profits to members',
    category: 'Banking',
    expiresIn: 'Permanent',
    cardName: 'Sound Credit Union',
  },
];

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
    title: 'Free Financial Education Workshop',
    description: 'Monthly workshops on budgeting, saving, and investing',
    howToUse: 'Visit soundcu.com/workshops or call to register. Next workshop: Nov 14 at 6pm',
    estimatedValue: '$150',
    category: 'Education',
    source: 'Sound Credit Union',
    lastUsed: 'Never',
  },
  {
    id: 3,
    title: 'Hotel Portfolio Benefits',
    description: 'Exclusive rates and perks at participating luxury hotels',
    howToUse: 'Book through the Visa Signature hotel portal when planning travel',
    estimatedValue: '$100-500/trip',
    category: 'Premium',
    source: 'Sound Cash Back Card',
    lastUsed: 'Never',
  },
  {
    id: 4,
    title: 'Early Paycheck Access',
    description: 'Get paid up to 2 days early with direct deposit',
    howToUse: 'Set up direct deposit to your Sound checking account (routing #325081403)',
    estimatedValue: '$0 (time value)',
    category: 'Banking',
    source: 'Sound Credit Union',
    lastUsed: 'Never',
  },
];

const mockReminders = [
  {
    id: 1,
    type: 'event',
    title: 'Planning a Trip?',
    message: 'Use your Visa Signature hotel benefits for your upcoming Seattle trip',
    perkToUse: 'Hotel Portfolio Benefits',
    action: 'View Hotels',
    urgency: 'medium',
  },
  {
    id: 2,
    type: 'time',
    title: 'Workshop Tomorrow',
    message: 'Free budgeting workshop tomorrow at 6pm - spots still available',
    perkToUse: 'Financial Education',
    action: 'Register Now',
    urgency: 'high',
  },
  {
    id: 3,
    type: 'category',
    title: 'Dining Out Tonight?',
    message: 'Remember to use your Sound Cash Back Card for 1.5% back on dining',
    perkToUse: '1.5% Cash Back',
    action: 'View Card',
    urgency: 'low',
  },
];

const mockSavingsOpportunities = [
  {
    id: 1,
    description: 'Saved by using cash back card at restaurant',
    amount: 5.20,
    category: 'Dining',
    timestamp: '2 hours ago',
    invested: true,
  },
  {
    id: 2,
    description: 'Under budget on groceries this week',
    amount: 12.50,
    category: 'Shopping',
    timestamp: '1 day ago',
    invested: false,
  },
  {
    id: 3,
    description: 'Saved on gas with rewards points',
    amount: 8.30,
    category: 'Travel',
    timestamp: '3 days ago',
    invested: true,
  },
  {
    id: 4,
    description: 'Avoided ATM fee using Sound CU network',
    amount: 3.50,
    category: 'Banking',
    timestamp: '4 days ago',
    invested: false,
  },
];

const mockWellnessIndicators = [
  {
    id: 1,
    area: 'Spending Trend',
    status: 'warning',
    message: 'You\'re spending 15% more than usual this month. Let\'s talk about strategies to get back on track.',
  },
  {
    id: 2,
    area: 'Emergency Savings',
    status: 'concern',
    message: 'Your emergency fund is below recommended levels. We can help you build it up with automated savings.',
  },
  {
    id: 3,
    area: 'Credit Utilization',
    status: 'good',
    message: 'Great job keeping your credit card balance low!',
  },
];

export default function App() {
  // Auth state management
  const [authState, setAuthState] = useState<'login' | 'linking' | 'dashboard'>('login');
  const [userName, setUserName] = useState('');
  
  const [spendingGoal, setSpendingGoal] = useState(3000);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const currentSpending = mockSpendingData.current;
  const difference = spendingGoal - currentSpending;
  const isOverBudget = difference < 0;

  // Calculate total rewards
  const totalCurrentRewards = mockSpendingData.categories.reduce(
    (sum, cat) => sum + cat.currentRewards, 
    0
  );
  const totalPotentialRewards = mockSpendingData.categories.reduce(
    (sum, cat) => sum + cat.potentialRewards, 
    0
  );

  // Calculate investment totals
  const totalSaved = mockSavingsOpportunities.reduce((sum, opp) => sum + opp.amount, 0);
  const totalInvested = mockSavingsOpportunities
    .filter(opp => opp.invested)
    .reduce((sum, opp) => sum + opp.amount, 0);

  // Auth handlers
  const handleGoogleLogin = () => {
    // Simulate Google login
    setUserName('Jordan Smith');
    setAuthState('linking');
  };

  const handleAccountLinked = () => {
    setAuthState('dashboard');
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

  // Show dashboard
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-slate-900">Sound Credit Union</h1>
              <p className="text-slate-600 mt-1">Your not-for-profit financial cooperative</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-600">Member Benefits This Month</p>
              <p className="text-3xl text-blue-600 mt-1">${totalCurrentRewards.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl">
            <p className="text-sm text-green-900">Available to Invest</p>
            <p className="text-4xl text-green-700 mt-2">${(totalSaved - totalInvested).toFixed(2)}</p>
            <p className="text-xs text-green-800 mt-1">From your savings this month</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <p className="text-sm text-blue-900">Already Invested</p>
            <p className="text-4xl text-blue-700 mt-2">${totalInvested.toFixed(2)}</p>
            <p className="text-xs text-blue-800 mt-1">Growing your future</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <p className="text-sm text-purple-900">Total Saved</p>
            <p className="text-4xl text-purple-700 mt-2">${totalSaved.toFixed(2)}</p>
            <p className="text-xs text-purple-800 mt-1">This month</p>
          </div>
        </div>

        {/* Main Investment Section - Full Width Priority */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-3xl text-slate-900">Turn Every Dollar Saved Into Investments</h2>
            <p className="text-slate-600 mt-2">
              We help you automatically invest your savings, rewards, and budget surplus - no matter how small
            </p>
          </div>

          <MicroInvestment 
            opportunities={mockSavingsOpportunities}
            totalSaved={totalSaved}
            totalInvested={totalInvested}
            smsEnabled={smsEnabled}
            onToggleSMS={setSmsEnabled}
          />
        </div>

        {/* Financial Wellness Check */}
        <div className="mb-12">
          <FinancialWellnessCheck 
            indicators={mockWellnessIndicators}
            showContactPrompt={true}
          />
        </div>

        {/* Two Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Card Recommendations */}
          <div>
            <h2 className="text-2xl text-slate-900 mb-6">Card Recommendations</h2>
            
            <div className="space-y-4">
              {mockSpendingData.categories.slice(0, 3).map((category) => (
                <div key={category.name} className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-slate-900">{category.name}</h3>
                      <p className="text-sm text-slate-600">Best: {category.recommendedCard}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl text-slate-900">${category.amount}</p>
                      <Badge 
                        variant="outline" 
                        style={{ 
                          backgroundColor: `${category.color}20`,
                          borderColor: category.color,
                          color: category.color,
                        }}
                      >
                        {category.rewardRate}
                      </Badge>
                    </div>
                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${(category.amount / currentSpending) * 100}%`,
                        backgroundColor: category.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Spending Overview */}
          <div>
            <h2 className="text-2xl text-slate-900 mb-6">Spending Overview</h2>
            
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
              <SpendingChart
                currentSpending={currentSpending}
                averageSpending={mockSpendingData.average}
                categories={mockSpendingData.categories}
              />
              
              <div className="mt-6 p-6 bg-white rounded-lg text-center">
                <p className="text-sm text-slate-600 mb-1">
                  {isOverBudget ? 'Over budget by' : 'Remaining'}
                </p>
                <p className={`text-4xl ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                  ${Math.abs(difference).toLocaleString()}
                </p>
              </div>

              <div className="mt-6">
                <GoalSetting currentGoal={spendingGoal} onGoalChange={setSpendingGoal} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}