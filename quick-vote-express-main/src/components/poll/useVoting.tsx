
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useVoting = (pollId: string) => {
  const { toast } = useToast();
  const [hasVoted, setHasVoted] = useState(false);

  const checkVotingEligibility = async () => {
    try {
      // Get the user's IP address using a free IP API
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const { ip } = await ipResponse.json();

      const { data: existingVotes } = await supabase
        .from('votes')
        .select('id')
        .eq('poll_id', pollId)
        .eq('voter_ip', ip);

      return !existingVotes?.length;
    } catch (error) {
      console.error('Error checking voting eligibility:', error);
      return false;
    }
  };

  const handleVote = async (optionIds: string[], voterName?: string) => {
    if (!await checkVotingEligibility()) {
      toast({
        title: "Already voted",
        description: "You have already voted on this poll from this IP address",
        variant: "destructive"
      });
      return;
    }

    try {
      // Get the user's IP address
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const { ip } = await ipResponse.json();

      const { error: votesError } = await supabase
        .from('votes')
        .insert(
          optionIds.map(optionId => ({
            poll_id: pollId,
            option_id: optionId,
            voter_name: voterName,
            voter_ip: ip
          }))
        );

      if (votesError) throw votesError;

      const { error: updateError } = await supabase.rpc('increment_vote_counts', {
        p_poll_id: pollId,
        p_option_ids: optionIds
      });

      if (updateError) throw updateError;

      setHasVoted(true);
      toast({
        title: "Vote recorded!",
        description: "Thank you for participating in this poll.",
      });
    } catch (error) {
      console.error('Error recording vote:', error);
      toast({
        title: "Error recording vote",
        description: "There was an error recording your vote. Please try again.",
        variant: "destructive"
      });
    }
  };

  return { handleVote, hasVoted };
};
