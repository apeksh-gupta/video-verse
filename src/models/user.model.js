import mongoose , {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";



const userSchema = new Schema(
  {
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true

  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
   fullname: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
   username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
   },
   coverImage: {
    type: String, // Cloudinary url
   },
   watchHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video"
    }
   ],
   password: {
    type: String,
    required: [true , 'Password is Required']
   },
   refreshTokens: {
    type: String,
   }
  } , {timestamps: true}
)


userSchema.pre("save" , async function (next){
  if(!this.isModified(this.password)){
    next();
  } 
  this.password = await bcrypt.hash(this.password , 10)
  next()
 })

userSchema.methods.isPasswordCorrect = async function 
    (password) { 
    bcrypt.compare(password , this.password)
  }

 userSchema.methods.generateAcessToken = function(){
  jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
 }

 userSchema.methods.generateRefreshToken = function(){
  jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
 }


export const User = mongoose.model("User" , userSchema)