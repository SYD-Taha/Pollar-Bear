
import { useParams } from "react-router-dom";
import { PollDisplay } from "@/components/PollDisplay";
import { PollResults } from "@/components/PollResults";
import { useState } from "react";
import { PollLoadingState } from "@/components/poll/PollLoadingState";
import { PollNotFound } from "@/components/poll/PollNotFound";
import { usePollData } from "@/components/poll/usePollData";
import { useVoting } from "@/components/poll/useVoting";

const Poll = () => {
  const { id } = useParams();
  const [showResults, setShowResults] = useState(false);
  const { poll, isLoading } = usePollData(id!);
  const { handleVote } = useVoting(id!);

  if (isLoading) {
    return <PollLoadingState />;
  }

  if (!poll) {
    return <PollNotFound />;
  }

  if (showResults) {
    return <PollResults poll={poll} onBack={() => setShowResults(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-8">
        <PollDisplay 
          poll={poll} 
          onVote={handleVote}
          onShowResults={() => setShowResults(true)}
        />
      </main>
    </div>
  );
};

export default Poll;
