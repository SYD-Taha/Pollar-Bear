
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const PollNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Poll Not Found</h1>
        <p className="text-muted-foreground">The poll you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/')}>Return Home</Button>
      </div>
    </div>
  );
};
