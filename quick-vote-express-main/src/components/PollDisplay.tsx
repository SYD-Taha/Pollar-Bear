
import { Poll, PollOption } from "@/types/poll";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Share2, ChartPie, Timer } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

type PollDisplayProps = {
  poll: Poll;
  onVote?: (optionIds: string[], voterName?: string) => void;
  onShowResults?: () => void;
};

export const PollDisplay = ({ poll, onVote, onShowResults }: PollDisplayProps) => {
  const { toast } = useToast();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [voterName, setVoterName] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    if (poll.expiresAt) {
      const updateTimeLeft = () => {
        const now = new Date();
        const expiry = new Date(poll.expiresAt!);
        const diff = expiry.getTime() - now.getTime();
        
        if (diff <= 0) {
          setTimeLeft("Expired");
          return;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        if (hours > 24) {
          const days = Math.floor(hours / 24);
          setTimeLeft(`${days} days left`);
        } else if (hours > 0) {
          setTimeLeft(`${hours}h ${minutes}m left`);
        } else {
          setTimeLeft(`${minutes}m left`);
        }
      };

      updateTimeLeft();
      const interval = setInterval(updateTimeLeft, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [poll.expiresAt]);

  const handleOptionSelect = (optionId: string) => {
    if (hasVoted) return;

    if (poll.settings.allowMultipleSelections) {
      setSelectedOptions(prev => 
        prev.includes(optionId)
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    } else {
      setSelectedOptions([optionId]);
    }
  };

  const handleVote = () => {
    if (selectedOptions.length === 0) {
      toast({
        title: "Please select an option",
        description: "You need to select at least one option to vote",
      });
      return;
    }

    if (poll.settings.requireParticipantNames && !voterName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to vote",
      });
      return;
    }

    if (onVote) {
      onVote(selectedOptions, voterName);
      setHasVoted(true);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Poll link has been copied to your clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy link",
        description: "Please try again",
      });
    }
  };

  const calculatePercentage = (votes: number) => {
    if (poll.totalVotes === 0) return 0;
    return Math.round((votes / poll.totalVotes) * 100);
  };

  if (poll.isExpired) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="text-center text-gray-500">
          <h2 className="text-xl font-semibold">This poll has expired</h2>
          <p>Thank you for your interest!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-4 md:space-y-6 animate-fade-in">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <h1 className="text-xl md:text-2xl font-bold break-words">{poll.question}</h1>
          {timeLeft && (
            <div className="flex items-center gap-2 text-sm text-gray-500 shrink-0">
              <Timer className="h-4 w-4" />
              {timeLeft}
            </div>
          )}
        </div>
        
        {poll.settings.requireParticipantNames && !hasVoted && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Your Name</label>
            <Input
              value={voterName}
              onChange={(e) => setVoterName(e.target.value)}
              placeholder="Enter your name"
              className="max-w-full"
            />
          </div>
        )}
        
        <div className="space-y-3">
          {poll.options.map((option: PollOption) => (
            <div
              key={option.id}
              className={`relative border rounded-lg p-4 transition-all 
                ${hasVoted ? "cursor-default" : "cursor-pointer hover:border-secondary"}
                ${selectedOptions.includes(option.id) ? 
                  "border-secondary bg-secondary/60 ring-5 ring-secondary/120" : 
                  "border-gray-300"}
              `}
              onClick={() => handleOptionSelect(option.id)}
            >
              <div className="flex justify-between items-center relative z-10">
                <span className="font-medium break-words">{option.text}</span>
                {hasVoted && (
                  <span className="text-sm text-gray-500 shrink-0 ml-2">
                    {calculatePercentage(option.votes)}%
                  </span>
                )}
              </div>
              {hasVoted && (
                <div 
                  className="absolute left-0 top-0 h-full bg-secondary/10 rounded-lg transition-all"
                  style={{ width: `${calculatePercentage(option.votes)}%` }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
          {!hasVoted && (
            <Button onClick={handleVote} className="w-full md:flex-1">
              Vote
            </Button>
          )}
          <Button variant="outline" onClick={onShowResults} className="w-full md:w-auto">
            <ChartPie className="h-4 w-4 mr-2" />
            Show Results
          </Button>
          <Button variant="outline" onClick={handleShare} className="w-full md:w-auto">
            <Share2 className="h-4 w-4 mr-2" />
            Share Poll
          </Button>
        </div>

        <div className="text-sm text-gray-500 text-center">
          Total votes: {poll.totalVotes}
        </div>
      </div>
    </div>
  );
};
