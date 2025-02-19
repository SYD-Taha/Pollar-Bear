
import { useState, useEffect } from "react";
import { Poll as PollType, PollSettings } from "@/types/poll";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const usePollData = (id: string) => {
  const [poll, setPoll] = useState<PollType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadPoll = async () => {
    try {
      console.log('Loading poll with ID:', id);
      const { data: pollData, error: pollError } = await supabase
        .from('polls')
        .select(`
          *,
          options:poll_options(*)
        `)
        .eq('id', id)
        .maybeSingle();

      if (pollError) {
        console.error('Error fetching poll:', pollError);
        throw pollError;
      }

      console.log('Poll data received:', pollData);

      if (pollData) {
        const now = new Date();
        const expiryDate = pollData.expires_at ? new Date(pollData.expires_at) : null;
        
        const settings = pollData.settings as PollSettings;
        
        setPoll({
          id: pollData.id,
          question: pollData.question,
          options: pollData.options,
          settings: settings,
          totalVotes: pollData.total_votes,
          createdAt: new Date(pollData.created_at),
          expiresAt: expiryDate,
          isExpired: expiryDate ? now > expiryDate : false || pollData.is_archived,
          isPublic: true
        });
      } else {
        console.log('No poll found with ID:', id);
      }
    } catch (error) {
      console.error('Error loading poll:', error);
      toast({
        title: "Error loading poll",
        description: "There was an error loading the poll data.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPoll();

    const channel = supabase
      .channel('poll_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'polls',
          filter: `id=eq.${id}`
        },
        (payload) => {
          console.log('Poll update received:', payload);
          loadPoll();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'poll_options',
          filter: `poll_id=eq.${id}`
        },
        (payload) => {
          console.log('Poll options update received:', payload);
          loadPoll();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  return { poll, isLoading };
};
