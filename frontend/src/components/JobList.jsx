import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import { getJobs } from "../api";

export default function JobList({ refreshTrigger, searchTerm = "" }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedJob, setSelectedJob] = useState(null);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await getJobs();
      setJobs(data);
    } catch (error) {
      console.error("Error loading jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [refreshTrigger]);

  // Format date to relative time
  const formatTimeAgo = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  const filters = ["All", "Design", "Development", "Marketing", "Sales", "Management"];

  const filteredJobs =
    jobs
      .filter((job) => {
        if (activeFilter === "All") return true;
        const category = (job.category || job.type || "").toLowerCase();
        return category === activeFilter.toLowerCase();
      })
      .filter((job) => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return true;
        return (
          (job.title || "").toLowerCase().includes(term) ||
          (job.company || "").toLowerCase().includes(term) ||
          (job.location || "").toLowerCase().includes(term) ||
          (job.description || "").toLowerCase().includes(term)
        );
      });

  const openJobDetails = (job) => setSelectedJob(job);
  const closeJobDetails = () => setSelectedJob(null);

  if (loading) {
    return (
      <div className="w-full bg-gray-50 py-20 px-5">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 py-20 px-5">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h2 className="text-4xl font-bold text-gray-900">Latest Job Openings</h2>
        <p className="text-gray-500 mt-2">
          Discover opportunities that match your skills
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mt-6 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-600"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>

          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm border transition ${
                activeFilter === filter
                  ? "bg-teal-500 text-white border-teal-500"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Job Cards */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No jobs found. Be the first to post one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {filteredJobs.map((job) => (
              <div
                key={job._id || job.id}
                className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs bg-teal-100 text-teal-700 px-3 py-1 rounded-full">
                    {job.category || job.type || "General"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatTimeAgo(job.createdAt)}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>

                {/* Company */}
                <div className="flex items-center mt-3 text-gray-600 text-sm gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path d="M4 21V3h16v18M9 21V9h6v12" />
                  </svg>
                  {job.company}
                </div>

                {/* Location */}
                <div className="flex items-center mt-1 text-gray-600 text-sm gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10z" />
                    <circle cx="12" cy="11" r="2" />
                  </svg>
                  {job.location}
                </div>

                {/* Salary */}
                {job.salary && (
                  <div className="flex items-center mt-1 text-gray-600 text-sm gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <line x1="12" y1="1" x2="12" y2="23"></line>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                    {job.salary}
                  </div>
                )}

                <p className="mt-3 text-gray-500 text-sm line-clamp-3">
                  {job.description}
                </p>

                <button
                  className="mt-5 w-full bg-gray-100 hover:bg-teal-200 text-gray-700 py-3 rounded-full font-medium transition"
                  onClick={() => openJobDetails(job)}
                >
                  View Details
                </button>

                <div className="h-1 w-full bg-teal-400 mt-4 rounded-full opacity-80" />
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeJobDetails}
          />

          {/* Modal content */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 z-10">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={closeJobDetails}
              aria-label="Close"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs bg-teal-100 text-teal-700 px-3 py-1 rounded-full">
                {selectedJob.category || selectedJob.type || "General"}
              </span>
              <span className="text-xs text-gray-500">
                {formatTimeAgo(selectedJob.createdAt)}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-gray-900">
              {selectedJob.title}
            </h3>
            <p className="text-gray-600 mt-1">{selectedJob.company}</p>

            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10z" />
                  <circle cx="12" cy="11" r="2" />
                </svg>
                {selectedJob.location || "Remote / N/A"}
              </div>

              {selectedJob.salary && (
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                  {selectedJob.salary}
                </div>
              )}
            </div>

            <div className="mt-5 text-gray-700 leading-relaxed whitespace-pre-line">
              {selectedJob.description}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
