import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import jobRoutes from "./routes/jobRoutes.js";

dotenv.config();
connectDB();

const app = express();

// CORS configuration - allow all localhost ports for development
app.use(cors({
  origin: /^http:\/\/localhost:\d+$/, // Allow any localhost port
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/jobs", jobRoutes);

app.get("/", (req, res) => {
  res.send("Job API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
