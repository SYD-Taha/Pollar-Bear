
import { Input } from "@/components/ui/input";
import { ImagePlus } from "lucide-react";

interface PollQuestionInputProps {
  question: string;
  setQuestion: (value: string) => void;
}

export const PollQuestionInput = ({ question, setQuestion }: PollQuestionInputProps) => {
  return (
    <div>
      <label htmlFor="question" className="text-sm font-medium text-gray-700">
        Question
      </label>
      <Input
        id="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question here"
        className="mt-2"
      />
      <button
        type="button"
        className="mt-2 text-sm text-[#9b87f5] hover:text-[#7E69AB] flex items-center gap-2"
      >
        <ImagePlus className="h-4 w-4" />
        Add description or image (Coming soon...)
      </button>
    </div>
  );
};
