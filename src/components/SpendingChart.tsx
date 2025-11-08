import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, PolarAngleAxis } from 'recharts';

interface SpendingChartProps {
  currentSpending: number;
  averageSpending: number;
  categories: Array<{ name: string; amount: number; color: string }>;
}

export function SpendingChart({ currentSpending, averageSpending, categories }: SpendingChartProps) {
  const difference = currentSpending - averageSpending;
  const percentageOfAverage = (currentSpending / averageSpending) * 100;
  const isOverAverage = difference > 0;
  
  // Cap the percentage for display purposes
  const displayPercentage = Math.min(percentageOfAverage, 150);

  const data = [
    {
      name: 'Spending',
      value: displayPercentage,
      fill: isOverAverage ? '#ef4444' : '#10b981',
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width="100%" height={280}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="90%"
          barSize={24}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 150]} angleAxisId={0} tick={false} />
          <RadialBar
            background
            dataKey="value"
            cornerRadius={10}
            fill={data[0].fill}
          />
          <text
            x="50%"
            y="42%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-3xl"
            fill={isOverAverage ? '#ef4444' : '#10b981'}
          >
            ${Math.abs(difference).toLocaleString()}
          </text>
          <text
            x="50%"
            y="52%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-sm"
            fill="#64748b"
          >
            {isOverAverage ? 'more than' : 'less than'}
          </text>
          <text
            x="50%"
            y="60%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-sm"
            fill="#64748b"
          >
            your average
          </text>
        </RadialBarChart>
      </ResponsiveContainer>

      <div className="w-full space-y-2 mt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">Current spending</span>
          <span className="text-slate-900">${currentSpending.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">Average spending</span>
          <span className="text-slate-900">${averageSpending.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}