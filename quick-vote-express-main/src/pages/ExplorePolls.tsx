
import { Poll } from "@/types/poll";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const ExplorePolls = () => {
  const [trendingPolls, setTrendingPolls] = useState<Poll[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTrendingPolls = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('polls')
          .select(`
            id,
            question,
            total_votes,
            expires_at,
            is_archived,
            settings
          `)
          .eq('is_archived', false)
          .order('total_votes', { ascending: false });
          

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

    // Set up real-time subscription for updates
    const channel = supabase
      .channel('trending_polls')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'polls'
        },
        loadTrendingPolls
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="animate-fade-in">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-xl font-semibold">Fetching Polls</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-4 border rounded-lg animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="animate-fade-in">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-xl font-semibold">Fetching Polls</h2>
        </div>
        <div className="text-center p-4 text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#F1F0FB] text-gray-800 flex flex-col flex-1 p-10 overflow-hidden">
      <div className="flex items-center justify-center gap-2 mb-6"> 
        <h1 className="text-center text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Explore Other Polls
        </h1>
      </div>


      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {trendingPolls.map((poll) => (
          <div
            key={poll.id}
            className="p-4 border bg-white rounded-lg hover:border-secondary transition-colors"
          >
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
