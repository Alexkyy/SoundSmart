import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { FileText, Download, TrendingUp, Calendar } from 'lucide-react';

interface JournalEntry {
  category: string;
  recovered: number;
  opportunities: number;
  topWin: string;
}

interface MonthlyJournalProps {
  month: string;
  totalRecovered: number;
  entries: JournalEntry[];
  soundGrowBalance: number;
  soundScore: number;
}

export function MonthlyJournal({ month, totalRecovered, entries, soundGrowBalance, soundScore }: MonthlyJournalProps) {
  return (
    <Card className="border border-slate-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-700" />
              Monthly Benefit Journal
            </CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Calendar className="w-4 h-4" />
              {month}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Download
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-green-50 rounded-lg text-center border border-green-100">
            <p className="text-xs text-slate-600 mb-1">Recovered</p>
            <p className="text-2xl text-green-600">${totalRecovered.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg text-center border border-blue-100">
            <p className="text-xs text-slate-600 mb-1">Savings Balance</p>
            <p className="text-xl text-blue-600">${soundGrowBalance.toFixed(2)}</p>
            <p className="text-xs text-slate-500 mt-0.5">@ 4.5% APY</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg text-center border border-purple-100">
            <p className="text-xs text-slate-600 mb-1">SoundScore</p>
            <p className="text-2xl text-purple-600">{soundScore}/100</p>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-3">
          <h3 className="text-sm text-slate-700">Recovered by Category</h3>
          {entries.map((entry) => (
            <div key={entry.category} className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-sm text-slate-900">{entry.category}</h4>
                  <p className="text-xs text-slate-500">{entry.opportunities} opportunities</p>
                </div>
                <p className="text-xl text-green-600">${entry.recovered.toFixed(2)}</p>
              </div>
              <div className="p-2 bg-white rounded text-xs text-slate-600">
                {entry.topWin}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}