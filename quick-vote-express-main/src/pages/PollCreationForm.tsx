
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { PollQuestionInput } from "@/components/poll/PollQuestionInput";
import { PollOptionsInput } from "@/components/poll/PollOptionsInput";
import { PollSettingsInput } from "@/components/poll/PollSettingsInput";
import { PollSettings } from "@/types/poll";
import { supabase } from "@/integrations/supabase/client";

export const PollCreationForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [settings, setSettings] = useState<PollSettings>({
    allowMultipleSelections: false,
    requireParticipantNames: false,
    votingSecurity: "ip",
    expiresIn: "1day"
  });
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateExpirationDate = (expiresIn: "1hour" | "1day" | "1week") => {
    const now = new Date();
    let expirationDate: Date;
    
    switch (expiresIn) {
      case "1hour":
        expirationDate = new Date(now.getTime() + 60 * 60 * 1000);
        break;
      case "1day":
        expirationDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        break;
      case "1week":
        expirationDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        break;
      default:
        expirationDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    }
    
    // Ensure the date is not beyond 30 days from now (per our constraint)
    const maxDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    if (expirationDate > maxDate) {
      expirationDate = maxDate;
    }
    
    return expirationDate.toISOString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!question.trim()) {
        toast({
          title: "Question required",
          description: "Please enter a question for your poll",
          variant: "destructive",
        });
        return;
      }

      if (options.some(opt => !opt.trim())) {
        toast({
          title: "Invalid options",
          description: "All options must have content",
          variant: "destructive",
        });
        return;
      }

      // Insert the poll first
      const { data: pollData, error: pollError } = await supabase
        .from('polls')
        .insert({
          question: question,
          settings: settings,
          expires_at: calculateExpirationDate(settings.expiresIn),
          total_votes: 0,
          is_archived: false
        })
        .select()
        .single();

      if (pollError) {
        console.error('Error creating poll:', pollError);
        throw pollError;
      }

      // Then insert all options
      const { error: optionsError } = await supabase
        .from('poll_options')
        .insert(
          options.map(text => ({
            poll_id: pollData.id,
            text: text,
            votes: 0
          }))
        );

      if (optionsError) {
        console.error('Error creating poll options:', optionsError);
        throw optionsError;
      }

      toast({
        title: "Poll created!",
        description: "Your poll has been created successfully.",
      });

      navigate(`/poll/${pollData.id}`);
    } catch (error) {
      console.error('Error creating poll:', error);
      toast({
        title: "Error creating poll",
        description: "There was an error creating your poll. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSettingChange = <K extends keyof PollSettings>(
    key: K,
    value: PollSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <PollQuestionInput
          question={question}
          setQuestion={setQuestion}
        />

        <PollOptionsInput
          options={options}
          setOptions={setOptions}
        />

        <PollSettingsInput
          settings={settings}
          onSettingChange={handleSettingChange}
          showAdvancedSettings={showAdvancedSettings}
          setShowAdvancedSettings={setShowAdvancedSettings}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating poll..." : "Create poll"}
      </Button>
    </form>
  );
};
