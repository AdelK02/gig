import React, { useState } from "react";
import { postJob } from "../api";

const PostJobForm = ({ onJobPosted }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    type: "",
    location: "",
    salary: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate required fields
    if (!formData.title || !formData.company || !formData.type || !formData.location || !formData.description) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      // Remove salary if empty (optional field)
      const jobData = { ...formData };
      if (!jobData.salary) {
        delete jobData.salary;
      }

      await postJob(jobData);
      // Reset form
      setFormData({
        title: "",
        company: "",
        type: "",
        location: "",
        salary: "",
        description: "",
      });
      // Success - trigger refresh and close modal
      onJobPosted();
    } catch (err) {
      setError(err.message || "Failed to post job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="max-w-lg mx-auto p-6 space-y-5" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold">Post a Job</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Job Title *"
        required
        className="w-full border px-3 py-3 rounded-lg"
      />

      <input
        name="company"
        value={formData.company}
        onChange={handleChange}
        placeholder="Company Name *"
        required
        className="w-full border px-3 py-3 rounded-lg"
      />

      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        required
        className="w-full border px-3 py-3 rounded-lg"
      >
        <option value="">Select Category *</option>
        <option value="Design">Design</option>
        <option value="Development">Development</option>
        <option value="Marketing">Marketing</option>
        <option value="Sales">Sales</option>
        <option value="Management">Management</option>
      </select>

      <input
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location *"
        required
        className="w-full border px-3 py-3 rounded-lg"
      />

      <input
        name="salary"
        value={formData.salary}
        onChange={handleChange}
        placeholder="Salary (optional)"
        className="w-full border px-3 py-3 rounded-lg"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Job Description *"
        required
        className="w-full border px-3 py-3 rounded-lg h-28"
      />

      <button 
        type="submit"
        disabled={loading}
        className="bg-teal-500 hover:bg-teal-600 disabled:bg-gray-400 text-white w-full py-3 rounded-lg transition"
      >
        {loading ? "Posting..." : "Submit Job"}
      </button>
    </form>
  );
};

export default PostJobForm;
