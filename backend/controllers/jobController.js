import Job from "../models/Job.js";
import mongoose from "mongoose";

// GET all jobs
export const getJobs = async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        error: "Database not connected. Please check your MongoDB connection." 
      });
    }

    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: "Failed to fetch jobs: " + err.message });
  }
};

// POST new job
export const createJob = async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        error: "Database not connected. Please check your MongoDB connection." 
      });
    }

    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    console.error("Error creating job:", err);
    
    // Handle validation errors
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    
    res.status(500).json({ error: "Failed to create job: " + err.message });
  }
};
