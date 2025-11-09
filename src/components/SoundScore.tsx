import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, Award, CheckCircle2, AlertCircle } from 'lucide-react';

interface SoundScoreProps {
  score: number;
  trend: 'up' | 'down' | 'stable';
  breakdown: {
    category: string;
    score: number;
    maxScore: number;
    status: 'great' | 'good' | 'needs-work';
  }[];
}

export function SoundScore({ score, trend, breakdown }: SoundScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreGrade = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Great';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Work';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'great') return <CheckCircle2 className="w-4 h-4 text-green-600" />;
    if (status === 'good') return <CheckCircle2 className="w-4 h-4 text-blue-600" />;
    return <AlertCircle className="w-4 h-4 text-amber-600" />;
  };

  return (
    <Card className="border border-slate-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              Your SoundScore
            </CardTitle>
            <CardDescription>
              How well you're optimizing your finances
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 border-4 border-purple-200 mb-3">
            <div>
              <p className={`text-4xl ${getScoreColor(score)}`}>{score}</p>
              <p className="text-xs text-slate-600">/100</p>
            </div>
          </div>
          <p className="text-lg text-slate-900">{getScoreGrade(score)}</p>
        </div>

        <div className="space-y-4">
          {breakdown.map((item) => (
            <div key={item.category}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(item.status)}
                  <span className="text-sm text-slate-700">{item.category}</span>
                </div>
                <span className="text-sm text-slate-500">
                  {item.score}/{item.maxScore}
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    item.status === 'great' 
                      ? 'bg-green-500' 
                      : item.status === 'good' 
                      ? 'bg-blue-500' 
                      : 'bg-amber-500'
                  }`}
                  style={{ width: `${(item.score / item.maxScore) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}