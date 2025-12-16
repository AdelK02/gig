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
    
    // Provide helpful error messages
    if (error.message.includes("authentication failed") || error.message.includes("bad auth")) {
      console.error("\n💡 Authentication failed. Please check:");
      console.error("   - Your MongoDB username and password in MONGO_URI");
      console.error("   - Make sure your MongoDB user has proper permissions");
      console.error("   - Example MONGO_URI format: mongodb+srv://username:password@cluster.mongodb.net/dbname");
    } else if (error.message.includes("ENOTFOUND") || error.message.includes("getaddrinfo")) {
      console.error("\n💡 Cannot reach MongoDB server. Please check:");
      console.error("   - Your internet connection");
      console.error("   - MongoDB cluster URL is correct");
    } else {
      console.error("\n💡 Please check your MONGO_URI in the .env file");
    }
    
    console.log("\n⚠️  Server will continue running, but database operations will fail.");
    console.log("   Fix the MongoDB connection and restart the server.\n");
    // Don't exit - let server run so user can see the error
  }
};
export default connectDB;
