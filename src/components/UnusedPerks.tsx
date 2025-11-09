import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { AlertCircle, ExternalLink, Lightbulb } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface UnusedPerk {
  id: number;
  title: string;
  description: string;
  howToUse: string;
  estimatedValue: string;
  category: string;
  source: string;
  lastUsed?: string;
}

interface UnusedPerksProps {
  perks: UnusedPerk[];
}

export function UnusedPerks({ perks }: UnusedPerksProps) {
  return (
    <Card className="border-amber-200 bg-amber-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-600" />
              Perks You Haven't Used
            </CardTitle>
            <CardDescription className="text-amber-900">
              You're missing out on these valuable benefits
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-300">
            {perks.length} Unused
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {perks.map((perk) => (
            <div key={perk.id} className="p-4 bg-white rounded-lg border border-amber-200 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-slate-900">{perk.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {perk.source}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">{perk.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-600">Est. Value</p>
                  <p className="text-amber-600">{perk.estimatedValue}</p>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded border border-blue-200">
                <p className="text-xs text-blue-900 mb-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  How to use:
                </p>
                <p className="text-sm text-blue-800">{perk.howToUse}</p>
              </div>

              <div className="flex items-center justify-between">
                {perk.lastUsed ? (
                  <p className="text-xs text-slate-500">Last used: {perk.lastUsed}</p>
                ) : (
                  <p className="text-xs text-amber-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Never used
                  </p>
                )}
                <Button size="sm" variant="outline" className="text-xs gap-1">
                  Learn More
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
