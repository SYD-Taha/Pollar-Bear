
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-100 shadow-sm">
      <div className="container max-w-5xl mx-auto py-6 px-6">
        <Link to="/" className="inline-block">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            Pollar-Bear
          </h1>
        </Link>
      </div>
    </header>
  );
};
