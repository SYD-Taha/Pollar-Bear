
import { Poll } from "@/types/poll";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";

type PollResultsProps = {
  poll: Poll;
  onBack: () => void;
};

export const PollResults = ({ poll, onBack }: PollResultsProps) => {
  const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#D6BCFA', '#E5DEFF'];
  const isMobile = useIsMobile();

  const data = poll.options.map(option => ({
    name: option.text,
    value: option.votes
  }));

  return (
<div className="min-h-screen  max-w-3xl mx-auto p-4 md:p-6 space-y-6 animate-fade-in">
<Button
        variant="ghost"
        onClick={onBack}
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Poll
      </Button>

      <div className="space-y-4">
        <h1 className="text-xl md:text-2xl font-bold">{poll.question}</h1>
        
        <div className="h-[300px] md:h-[400px] w-full bg-white rounded-lg shadow-lg p-2 md:p-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                // label={({ name, percent }) => 
                //   isMobile ? `${(percent * 100).toFixed(0)}%` : `${name} (${(percent * 100).toFixed(0)}%)`
                // }
                label={({ name, percent, x, y }) => (
                  <text x={x} y={y} fill="black" textAnchor="middle" dominantBaseline="central">
                    {isMobile ? `${(percent * 100).toFixed(0)}%` : `${name} (${(percent * 100).toFixed(0)}%)`}
                  </text>
                )}
                
                outerRadius={isMobile ? 100 : 150}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="text-center text-sm text-gray-500">
          Total votes: {poll.totalVotes}
        </div>
      </div>
    </div>
  );
};
