import { Poll } from "@/types/poll";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Switch } from "@/components/ui/switch";

export const ExplorePolls = () => {
  const [trendingPolls, setTrendingPolls] = useState<Poll[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAvailable, setShowAvailable] = useState(true);
  const [showAllVotes, setShowAllVotes] = useState(false);

  useEffect(() => {
    const loadTrendingPolls = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        let query = supabase
          .from('polls')
          .select(`id, question, total_votes, expires_at, is_archived, settings`)
          .eq('is_archived', false);
        
        if (showAvailable) {
          query = query.gt('expires_at', new Date().toISOString());
        }
        
        const { data, error } = await query.order('total_votes', { ascending: false });
        
        if (error) throw error;

        setTrendingPolls(data.map(poll => ({
          id: poll.id,
          question: poll.question,
          totalVotes: poll.total_votes,
          expiresAt: new Date(poll.expires_at),
          isPublic: true,
          options: [],
          settings: poll.settings as Poll['settings'],
          createdAt: new Date()
        })));
      } catch (error) {
        console.error('Error loading trending polls:', error);
        setError('Failed to load trending polls');
      } finally {
        setIsLoading(false);
      }
    };

    loadTrendingPolls();
  }, [showAvailable, showAllVotes]);

  return (
    <div className="h-screen bg-[#F1F0FB] text-gray-800 flex flex-col flex-1 p-10 overflow-hidden">
      <div className="flex items-center justify-between mb-6"> 
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Explore Other Polls
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span>Currently Available</span>
            <Switch checked={showAvailable} onCheckedChange={setShowAvailable} />
          </div>
          <div className="flex items-center gap-2">
            <span>All Votes</span>
            <Switch checked={showAllVotes} onCheckedChange={setShowAllVotes} />
          </div>
        </div>
      </div>
      
      {isLoading && <p className="text-center">Fetching Polls...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {trendingPolls.map((poll) => (
          <div key={poll.id} className="p-4 border bg-white rounded-lg hover:border-secondary transition-colors">
            <h3 className="font-medium mb-2 line-clamp-2">{poll.question}</h3>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>{poll.totalVotes} votes</span>
              <Link to={`/poll/${poll.id}`}>
                <Button variant="ghost" size="sm">
                  Vote
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
