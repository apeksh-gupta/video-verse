import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse  } from "../utils/ApiResponse.js";

 
const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "ok"
  })

  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const {fullname , username , email , password}  = req.body
  console.log("email:",email )
  // if (fullname == ""){
  //   throw new ApiError(400 , "fullname is required")
  // }
  // better method
  if (
    [fullname, email, username, password].some((field) => 
    field?.trim() == ""
    )
  ){
    throw new ApiError(400 , "All fields are required")
  }

  const existedUser = User.findOne({
    $or: [{username} , {email}]
  })

  if(existedUser){
    throw new ApiError(409 , "User with email or username already exists")
  }

  const avatarLocalPath = req.files?.avatar[0]?.path

  const coverImageLocalPath = req.files?.avatar[0]?.path

  if(!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required")
  } 

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if(!avatar) {
    throw new ApiError(400, "Avatar file is required")
  } 

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage.url || "",
    email,
    password,
    username: username.toLowerCase()
  })

  // checks if user already exits or not by id 
  // and stores user values in this var removing pass and refreshtok
  const createduser = await User.findById(user._id).select(
    "-password -refreshToken"
  )
  if(!createduser){
    throw new ApiError(500 , "Something went wrong while registring a User")

  }

  return res.status(201).json(
    new ApiResponse(200 , createduser , "User registered Successfully")
  )

  


});




export  {registerUser};