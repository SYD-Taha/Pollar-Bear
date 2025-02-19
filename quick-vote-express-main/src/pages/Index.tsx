
import { PollCreationForm } from "@/pages/PollCreationForm";
import { TrendingPolls } from "@/components/TrendingPolls";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#F1F0FB] text-gray-800 flex flex-col">
      {/* <Header /> */}
      <main className="container max-w-4xl mx-auto py-6 md:py-12 space-y-8 md:space-y-12 flex-grow px-4 md:px-6">
        <div className="text-center space-y-4 md:space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Create a Poll
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Complete the below fields to create your poll.
          </p>
        </div>

        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-8">
          <PollCreationForm />
        </div>
        
        <div className="pt-8 md:pt-12">
          <TrendingPolls />
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Index;
