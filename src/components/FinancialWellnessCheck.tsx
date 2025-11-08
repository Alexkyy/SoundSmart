import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Heart, Phone, MessageCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';

interface WellnessIndicator {
  id: number;
  area: string;
  status: 'good' | 'warning' | 'concern';
  message: string;
}

interface FinancialWellnessCheckProps {
  indicators: WellnessIndicator[];
  showContactPrompt: boolean;
}

export function FinancialWellnessCheck({ indicators, showContactPrompt }: FinancialWellnessCheckProps) {
  const hasWarnings = indicators.some(i => i.status === 'warning' || i.status === 'concern');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'warning':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'concern':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-slate-50 border-slate-200 text-slate-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return '✓';
      case 'warning':
        return '!';
      case 'concern':
        return '⚠';
      default:
        return '•';
    }
  };

  return (
    <div className="space-y-6">
      {/* Wellness Score */}
      <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl border border-blue-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Heart className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl text-slate-900">Financial Wellness Check</h3>
            <p className="text-sm text-blue-900">We're here to help you succeed</p>
          </div>
        </div>

        <div className="space-y-3">
          {indicators.map((indicator) => (
            <div 
              key={indicator.id}
              className={`p-4 rounded-lg border ${getStatusColor(indicator.status)}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-lg">{getStatusIcon(indicator.status)}</span>
                <div className="flex-1">
                  <p className="font-medium mb-1">{indicator.area}</p>
                  <p className="text-sm opacity-90">{indicator.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Prompt - Only show when there are issues */}
      {(showContactPrompt || hasWarnings) && (
        <div className="p-6 bg-purple-50 rounded-xl border-2 border-purple-300">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg text-slate-900 mb-2">
                We're Here to Help - Before Things Get Tough
              </h3>
              <p className="text-sm text-slate-700 mb-4">
                As your credit union, we succeed when you succeed. If you're facing financial challenges 
                or worried about upcoming expenses, reach out early. We can work together on solutions like:
              </p>
              <ul className="text-sm text-slate-700 space-y-1 mb-4 ml-4">
                <li>• Payment plans and loan modifications</li>
                <li>• Skip-a-payment programs</li>
                <li>• Emergency savings assistance</li>
                <li>• Free financial counseling</li>
              </ul>
              <p className="text-sm text-purple-900 italic">
                The earlier we talk, the more options we have to help.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <Phone className="w-4 h-4 mr-2" />
              Call Member Services
            </Button>
            <Button variant="outline" className="w-full border-purple-300 text-purple-700 hover:bg-purple-100">
              <MessageCircle className="w-4 h-4 mr-2" />
              Schedule a Call
            </Button>
          </div>

          <p className="text-xs text-center text-slate-600 mt-4">
            Available Mon-Fri 8am-6pm, Sat 9am-1pm • (206) 583-0585
          </p>
        </div>
      )}
    </div>
  );
}
