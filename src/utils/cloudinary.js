import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
}); 

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if(!localFilePath) return null
    const response = await cloudinary.uploader.upload(localFilePath , {
      resource_type: "auto"
    })
    // file has been uploaded successfully
    console.log("file is uploaded on cloudinary", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath) 
    // remove the locally saved temparory file as upload operation is failed
  }
}

export {uploadOnCloudinary}
