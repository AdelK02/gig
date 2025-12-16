import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: String },
    type: { type: String, required: true }, // Full-time, Part-time
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
