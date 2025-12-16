import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("❌ MONGO_URI is not defined in .env file");
      console.log("💡 Please add MONGO_URI to your .env file");
      return;
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    
    console.log("\n⚠️  Server will continue running, but database operations will fail.");
    console.log("   Fix the MongoDB connection and restart the server.\n");
    // Don't exit - let server run so user can see the error
  }
};
export default connectDB;
