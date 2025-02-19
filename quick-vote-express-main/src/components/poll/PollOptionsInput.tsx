
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PollOptionsInputProps {
  options: string[];
  setOptions: (options: string[]) => void;
}

export const PollOptionsInput = ({ options, setOptions }: PollOptionsInputProps) => {
  const { toast } = useToast();

  const addOption = () => {
    if (options.length < 10) {
      setOptions([...options, ""]);
    } else {
      toast({
        title: "Maximum options reached",
        description: "You can only add up to 10 options",
      });
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    } else {
      toast({
        title: "Minimum options required",
        description: "You need at least 2 options",
      });
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        Answer Options
      </label>
      
      {options.map((option, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeOption(index)}
            className="shrink-0"
          >
            <Minus className="h-4 w-4" />
          </Button>
        </div>
      ))}
      
      <Button
        type="button"
        variant="ghost"
        onClick={addOption}
        className="text-[#9b87f5] hover:text-[#7E69AB]"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add option
      </Button>
    </div>
  );
};
