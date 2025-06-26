// require('dotenv').config({path: './env'})
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

// Load environment variables from './env'
dotenv.config({ path: "./.env" });

// Connect to MongoDB
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000 , ()=>{
      console.log(`Server is running at port: ${process.env.PORT}`)
    })
    app.on("error" , (error)=>{
      console.log("ERROR", error);
      throw error
    })
    console.log("✅ Database connection successful.");
    // You can start your server here if needed
    // app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });


































// ;( async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/{DB_NAME}`)
//   } catch (error) {
//     console.log("ERROR" , error);
//     throw err
//   }
// })