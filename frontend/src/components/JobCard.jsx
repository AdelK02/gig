import React from "react";

const JobCard = ({ job }) => {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold">{job.title}</h3>
      <p className="text-gray-600">{job.company}</p>

      <div className="flex justify-between mt-3 text-sm text-gray-500">
        <span>{job.category}</span>
        <span>{job.location}</span>
      </div>
    </div>
  );
};

export default JobCard;
