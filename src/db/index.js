import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

     console.log("🔗 Full MongoDB URI:", connectionInstance);

    console.log(`\n✅ MongoDB connected!! DB HOST: ${connectionInstance.connection.host}`);
    
    // Optional: log full connection object for debugging
    // console.log(connectionInstance);

  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
