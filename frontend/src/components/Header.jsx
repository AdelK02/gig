// import { useState } from "react";
// import JobList from "./JobList";
// import Footer from "./Footer";

// const Header = ({ onPostJobClick }) => {
//   return (
//     <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-20">

//         {/* Logo */}
//         <div className="flex items-center gap-3">
//           <div className="h-10 w-10 bg-[#0a1a3b] rounded-xl flex items-center justify-center">
//             <span className="text-white text-xl font-bold">G</span>
//           </div>
//           <span className="text-xl font-bold text-[#0a1a3b]">Gig.</span>
//         </div>

//         {/* Nav Links */}
//         <nav className="hidden md:flex items-center gap-10">
//           <a href="#home" className="text-gray-600 hover:text-gray-900 transition">
//             Home
//           </a>
//           <a href="#jobs" className="text-gray-600 hover:text-gray-900 transition">
//             Jobs
//           </a>
//           <a href="#contact" className="text-gray-600 hover:text-gray-900 transition">
//             Contact
//           </a>
//         </nav>

//         {/* CTA Button */}
//         <button
//           onClick={onPostJobClick}
//           className="hidden md:block bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full shadow-md transition"
//         >
//           Post a Job
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React from "react";

const Header = ({ onPostJobClick }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3 fixed-top">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Left logo */}
        <div className="d-flex align-items-center">
          <div
            style={{
              width: "42px",
              height: "42px",
              backgroundColor: "#0ac3a7ff",
              borderRadius: "12px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <i
              className="bi bi-briefcase"
              style={{ color: "#000000ff", fontSize: "20px" }}
            ></i>
          </div>
          <h4 className="ms-2 mt-1 fw-bold">gig.</h4>
        </div>

        {/* Center navigation */}
        <ul className="navbar-nav gap-4 mx-auto d-none d-lg-flex">
          <li className="nav-item">
            <a className="nav-link text-secondary fw-semibold" href="#home">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-secondary fw-semibold" href="#jobs">
              Jobs
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-secondary fw-semibold" href="#contact">
              Contact
            </a>
          </li>
        </ul>

        {/* Right button */}
        <button
          onClick={onPostJobClick}
          className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-full shadow-md transition"
        >
          Post a Job
        </button>
      </div>
    </nav>
  );
};

export default Header;
