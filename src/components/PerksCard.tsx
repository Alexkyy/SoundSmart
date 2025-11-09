import { Badge } from './ui/badge';
import { Clock, CreditCard } from 'lucide-react';

interface PerksCardProps {
  perk: {
    id: number;
    title: string;
    description: string;
    category: string;
    expiresIn: string;
    cardName: string;
  };
}

export function PerksCard({ perk }: PerksCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'credit card':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'premium':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'banking':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'insurance':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'education':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="p-4 border-2 border-slate-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all bg-white">
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm flex-1">{perk.title}</h4>
        <Badge variant="outline" className={getCategoryColor(perk.category)}>
          {perk.category}
        </Badge>
      </div>
      <p className="text-sm text-slate-600 mb-3">{perk.description}</p>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-slate-500">
          <CreditCard className="w-3 h-3" />
          <span>{perk.cardName}</span>
        </div>
        <div className="flex items-center gap-1 text-slate-500">
          <Clock className="w-3 h-3" />
          <span>{perk.expiresIn}</span>
        </div>
      </div>
    </div>
  );
}