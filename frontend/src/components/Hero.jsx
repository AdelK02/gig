import React from "react";

export default function Hero({ searchTerm, onSearchChange, onSearchSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(searchTerm || "");
  };

  return (
    <div className="w-full bg-gradient-to-b from-[#0a1a3f] to-[#07254f] text-white py-40 px-4">
      <div className="max-w-4xl mx-auto text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5  py-4 rounded-full text-sm border border-white/20">
          <span className="w-2 h-2 rounded-full bg-teal-400 "></span>
          Over 10,000+ jobs available
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold mt-6 leading-tight pt-2 pb-2">
          Find {" "}
          <span className="relative inline-block">
            Your Dream Job
            <span className="absolute left-0 right-0 -bottom-2 h-2 bg-teal-400/70 rounded-full"></span>
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-lg text-gray-300 mt-6 leading-relaxed">
          Search thousands of job listings from top companies. Your next
          opportunity is just a click away.
        </p>

        {/* Search Bar */}
        <form
          className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center bg-white rounded-xl shadow-lg px-4 py-3 w-full md:w-2/3">
            
            {/* Search Icon (inline SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-500"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search job titles, companies, or locations..."
              className="flex-1 ml-3 outline-none text-gray-700"
            />
          </div>

          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 px-8 py-3 rounded-full  font-semibold shadow-lg transition"
          >
            Search Jobs
          </button>
        </form>

        {/* Stats */}
        <div className="flex justify-center gap-10 mt-14 text-center">
          <div>
            <h3 className="text-3xl font-bold">10K+</h3>
            <p className="text-gray-300 text-sm">Active Jobs</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">5K+</h3>
            <p className="text-gray-300 text-sm">Companies</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">50K+</h3>
            <p className="text-gray-300 text-sm">Hired</p>
          </div>
        </div>
      </div>
    </div>
  );
}
