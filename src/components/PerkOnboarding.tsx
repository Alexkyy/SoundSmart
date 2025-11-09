import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { CheckCircle2, MapPin, CreditCard, Calendar, Smartphone, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { Checkbox } from './ui/checkbox';

interface PerkOnboardingProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function PerkOnboarding({ onComplete, onSkip }: PerkOnboardingProps) {
  const [step, setStep] = useState<'welcome' | 'memberships' | 'location' | 'calendar' | 'complete'>('welcome');
  const [permissions, setPermissions] = useState({
    location: false,
    sms: false,
    calendar: false,
  });
  const [memberships, setMemberships] = useState({
    costco: false,
    samsclub: false,
    amazon: false,
    aaa: false,
    gym: false,
    streaming: false,
  });

  const handleToggleMembership = (key: keyof typeof memberships) => {
    setMemberships({ ...memberships, [key]: !memberships[key] });
  };

  const handleEnableLocation = () => {
    setPermissions({ ...permissions, location: true, sms: true });
    setStep('calendar');
  };

  const handleEnableCalendar = () => {
    setPermissions({ ...permissions, calendar: true });
    setStep('complete');
  };

  const handleComplete = () => {
    onComplete();
  };

  return (
    <Dialog open={true} onOpenChange={onSkip}>
      <DialogContent className="max-w-xl">
        {step === 'welcome' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Never Miss a Perk Again</DialogTitle>
              <DialogDescription>
                Let us help you discover and use thousands in benefits you already have
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl border-2 border-purple-300 text-center">
                <div className="text-5xl mb-3">💰</div>
                <p className="text-3xl text-purple-700 mb-2">$1,346</p>
                <p className="text-sm text-purple-900">
                  Average annual value of unused Sound CU member perks
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-slate-900">Here's what we'll help you unlock:</h3>
                
                <div className="flex gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg h-fit">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-900">Location-Based Alerts</p>
                    <p className="text-xs text-slate-600">
                      Get SMS when you're near a store/restaurant with active perks
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="p-2 bg-green-100 rounded-lg h-fit">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-900">Travel Perk Reminders</p>
                    <p className="text-xs text-slate-600">
                      Auto-detect trips and remind you of hotel/rental car discounts
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg h-fit">
                    <CreditCard className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-900">Auto-Enrollment</p>
                    <p className="text-xs text-slate-600">
                      We'll automatically sign you up for eligible loyalty programs
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg h-fit">
                    <Smartphone className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-900">One-Tap Activation</p>
                    <p className="text-xs text-slate-600">
                      Activate perks with a single tap from SMS notifications
                    </p>
                  </div>
                </div>
              </div>

              <Button onClick={() => setStep('memberships')} className="w-full h-12 bg-purple-600 hover:bg-purple-700">
                Get Started
              </Button>
              <Button onClick={onSkip} variant="ghost" className="w-full">
                I'll do this later
              </Button>
            </div>
          </>
        )}

        {step === 'memberships' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Select Your Memberships</DialogTitle>
              <DialogDescription>
                Choose the loyalty programs you're a part of to unlock exclusive perks
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <ShoppingBag className="w-6 h-6 text-blue-600" />
                  <h3 className="text-slate-900">Loyalty Programs</h3>
                </div>
                <p className="text-sm text-slate-700 mb-4">
                  Select the loyalty programs you're a part of to unlock exclusive perks.
                </p>
                <div className="p-3 bg-white rounded-lg border border-blue-200">
                  <p className="text-xs text-slate-600 mb-2">Example:</p>
                  <div className="p-2 bg-slate-50 rounded border-l-2 border-blue-500">
                    <p className="text-xs text-slate-900">
                      📍 <strong>You're near Costco!</strong>
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      Your Sound CU membership includes 2% extra cash back. Tap to activate →
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="text-sm text-green-900 mb-2">Available perks:</h4>
                <ul className="space-y-1 text-xs text-green-800">
                  <li>• Up to 30% off hotels through Love to Travel</li>
                  <li>• Free rental car insurance (save $15-30/day)</li>
                  <li>• No foreign transaction fees worldwide</li>
                  <li>• Trip cancellation insurance included</li>
                  <li>• Priority airport lounge access</li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
                  <Checkbox
                    id="costco"
                    checked={memberships.costco}
                    onCheckedChange={() => handleToggleMembership('costco')}
                  />
                  <label htmlFor="costco" className="flex-1 cursor-pointer text-sm text-slate-900">
                    <div className="flex items-center justify-between">
                      <span>Costco</span>
                      <span className="text-xs text-green-600">2% cash back</span>
                    </div>
                  </label>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
                  <Checkbox
                    id="samsclub"
                    checked={memberships.samsclub}
                    onCheckedChange={() => handleToggleMembership('samsclub')}
                  />
                  <label htmlFor="samsclub" className="flex-1 cursor-pointer text-sm text-slate-900">
                    <div className="flex items-center justify-between">
                      <span>Sam's Club</span>
                      <span className="text-xs text-green-600">Member pricing</span>
                    </div>
                  </label>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
                  <Checkbox
                    id="amazon"
                    checked={memberships.amazon}
                    onCheckedChange={() => handleToggleMembership('amazon')}
                  />
                  <label htmlFor="amazon" className="flex-1 cursor-pointer text-sm text-slate-900">
                    <div className="flex items-center justify-between">
                      <span>Amazon Prime</span>
                      <span className="text-xs text-green-600">5% back w/ card</span>
                    </div>
                  </label>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
                  <Checkbox
                    id="aaa"
                    checked={memberships.aaa}
                    onCheckedChange={() => handleToggleMembership('aaa')}
                  />
                  <label htmlFor="aaa" className="flex-1 cursor-pointer text-sm text-slate-900">
                    <div className="flex items-center justify-between">
                      <span>AAA</span>
                      <span className="text-xs text-green-600">Travel discounts</span>
                    </div>
                  </label>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
                  <Checkbox
                    id="gym"
                    checked={memberships.gym}
                    onCheckedChange={() => handleToggleMembership('gym')}
                  />
                  <label htmlFor="gym" className="flex-1 cursor-pointer text-sm text-slate-900">
                    <div className="flex items-center justify-between">
                      <span>Gym Membership</span>
                      <span className="text-xs text-green-600">Wellness perks</span>
                    </div>
                  </label>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
                  <Checkbox
                    id="streaming"
                    checked={memberships.streaming}
                    onCheckedChange={() => handleToggleMembership('streaming')}
                  />
                  <label htmlFor="streaming" className="flex-1 cursor-pointer text-sm text-slate-900">
                    <div className="flex items-center justify-between">
                      <span>Streaming Services</span>
                      <span className="text-xs text-green-600">Credit card credits</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep('welcome')} className="flex-1">
                  Back
                </Button>
                <Button onClick={() => setStep('location')} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <MapPin className="w-4 h-4 mr-2" />
                  Next
                </Button>
              </div>
            </div>
          </>
        )}

        {step === 'location' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Enable Smart Perk Alerts</DialogTitle>
              <DialogDescription>
                Get notified when you're near stores with active perks
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  <h3 className="text-slate-900">Location Services</h3>
                </div>
                <p className="text-sm text-slate-700 mb-4">
                  We'll send you SMS alerts when you're near a location where you can use perks.
                </p>
                <div className="p-3 bg-white rounded-lg border border-blue-200">
                  <p className="text-xs text-slate-600 mb-2">Example:</p>
                  <div className="p-2 bg-slate-50 rounded border-l-2 border-blue-500">
                    <p className="text-xs text-slate-900">
                      📍 <strong>You're near Costco!</strong>
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      Your Sound CU membership includes 2% extra cash back. Tap to activate →
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="text-sm text-green-900 mb-2">You'll get alerts for:</h4>
                <ul className="space-y-1 text-xs text-green-800">
                  <li>• Hotels with member discounts (avg. $40/night savings)</li>
                  <li>• Restaurants with cash back offers</li>
                  <li>• Gas stations with Sound CU rewards</li>
                  <li>• Retailers with exclusive member pricing</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-100 rounded-lg border border-slate-300">
                <div className="flex items-start gap-2">
                  <input type="checkbox" id="privacy" className="mt-1" defaultChecked />
                  <div>
                    <label htmlFor="privacy" className="text-xs text-slate-900">
                      I understand location data is only used for perk alerts and is never sold or shared
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep('memberships')} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleEnableLocation} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <MapPin className="w-4 h-4 mr-2" />
                  Enable Alerts
                </Button>
              </div>
            </div>
          </>
        )}

        {step === 'calendar' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Travel Perk Detection</DialogTitle>
              <DialogDescription>
                Never forget travel benefits when you're booking trips
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-6 h-6 text-green-600" />
                  <h3 className="text-slate-900">Calendar Integration</h3>
                </div>
                <p className="text-sm text-slate-700 mb-4">
                  We'll scan your calendar for trips and proactively remind you of hotel, rental car, and travel insurance perks.
                </p>
                <div className="p-3 bg-white rounded-lg border border-green-200">
                  <p className="text-xs text-slate-600 mb-2">Example:</p>
                  <div className="p-2 bg-slate-50 rounded border-l-2 border-green-500">
                    <p className="text-xs text-slate-900">
                      ✈️ <strong>Seattle trip in 2 weeks</strong>
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      Book through Love to Travel and save $120 on hotels. Plus free rental car insurance with your Sound Visa!
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="text-sm text-purple-900 mb-2">Available travel perks:</h4>
                <ul className="space-y-1 text-xs text-purple-800">
                  <li>• Up to 30% off hotels through Love to Travel</li>
                  <li>• Free rental car insurance (save $15-30/day)</li>
                  <li>• No foreign transaction fees worldwide</li>
                  <li>• Trip cancellation insurance included</li>
                  <li>• Priority airport lounge access</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep('location')} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleEnableCalendar} className="flex-1 bg-green-600 hover:bg-green-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  Connect Calendar
                </Button>
              </div>
            </div>
          </>
        )}

        {step === 'complete' && (
          <div className="py-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl text-slate-900 mb-2">You're All Set! 🎉</h3>
            <p className="text-slate-600 mb-6">
              We'll start monitoring for perk opportunities right away
            </p>

            <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-100 rounded-lg border border-purple-200 mb-6">
              <h4 className="text-slate-900 mb-3">What happens next:</h4>
              <div className="space-y-2 text-left text-sm text-slate-700">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>You'll get SMS alerts when near stores with perks</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Travel reminders will appear before your trips</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>We'll auto-enroll you in eligible programs</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Track all savings in your dashboard</span>
                </div>
              </div>
            </div>

            <Button onClick={handleComplete} className="w-full h-12 bg-purple-600 hover:bg-purple-700">
              Go to Dashboard
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}