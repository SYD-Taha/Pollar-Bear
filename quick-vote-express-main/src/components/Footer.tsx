// import { FaGithub, FaLinkedin } from "react-icons/fa";


// const Footer = () => {
//   return (
//     <footer className="bg-white border-t border-gray-100">
//       <div className="flex flex-col items-center justify-center">
//   <h4 className="mb-2 text-[15px]">📨 Summon Me via Pixels</h4>
//   <p className="m-0 text-[14px]">
//     <a
//       href="mailto:visiondotstj@gmail.com"
//       className="text-[#00c6ff] no-underline hover:underline"
//     >
//       visiondotstj@gmail.com
//     </a>
//   </p>
// </div>

//       <div className="container max-w-5xl mx-auto py-6 px-6">
//         <p className="text-sm text-muted-foreground text-center">
//           V.stj
//         </p>
//       </div>
//       <div className="flex space-x-4">
//   <a 
//     href="https://github.com/SYD-Taha" 
//     target="_blank" 
//     rel="noopener noreferrer"
//     className="text-gray-700 hover:text-black transition-colors"
//   >
//     <FaGithub size={28} />
//   </a>
//   <a 
//     href="https://www.linkedin.com/in/syed-taha-jameel-357911326" 
//     target="_blank" 
//     rel="noopener noreferrer"
//     className="text-gray-700 hover:text-blue-600 transition-colors"
//   >
//     <FaLinkedin size={28} />
//   </a>
// </div>

//     </footer>
//   );
// };

// export default Footer;


import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-4">
      <div className="container max-w-5xl mx-auto flex items-center justify-between px-6">
        
        {/* Email Section (Far Left) */}
        <div className="text-[14px] text-muted-foreground">
          <h4 className="text-[15px]">Pollar-Bear HQ</h4>
          <p className="m-0">
            <a
              href="mailto:visiondotstj@gmail.com"
              className="text-[#9b87f5] no-underline hover:underline"
            >
              visiondotstj@gmail.com
            </a>
          </p>
        </div>

        {/* Spacer to center align the company name */}
        <div className="flex-grow text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} V.stj. All rights reserved.
          </p>
        </div>

        {/* Social Links (Far Right) */}
        <div className="flex space-x-4">
          <a 
            href="https://github.com/SYD-Taha" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#9b87f5] hover:text-[#7E69AB] transition-colors"
          >
            <FaGithub size={28} />
          </a>
          <a 
            href="https://www.linkedin.com/in/syed-taha-jameel-357911326" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#9b87f5] hover:text-[#7E69AB] transition-colors"
          >
            <FaLinkedin size={28} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
