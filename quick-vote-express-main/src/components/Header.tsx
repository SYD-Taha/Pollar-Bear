// import { Link } from "react-router-dom";

// export const Header = () => {
//   return (
//     <header className="bg-white border-b border-gray-100 shadow-sm">
//       <div className="w-full flex justify-between items-center px-6 py-6">
//         {/* Title */}
//         <Link to="/" className="inline-block pl-20">
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity">
//             Pollar-Bear
//           </h1>
//         </Link>

//         {/* Explore Polls Button */}
//         <Link to="/explorePolls" className="inline-block pr-20">
//           <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity">
//             Explore Polls
//           </h3>
//         </Link>
//       </div>
//     </header>
//   );
// };


import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-100 shadow-sm">
      <div className="w-full flex justify-between items-center px-4 md:px-20 py-4">
        {/* Title - Stays on the Left */}
        <Link to="/" className="inline-block">
          <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            Pollar-Bear
          </h1>
        </Link>

        {/* Explore Polls Button - Stays on the Right */}
        <Link to="/explorePolls" className="inline-block">
          <h3 className="text-sm md:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            Explore Polls
          </h3>
        </Link>
      </div>
    </header>
  );
};
