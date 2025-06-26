import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

// it will allow request from all
app.use(cors({
  // kon konse origin alow kar rhe ho
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

// json configure kar rha hu ki json aayegi and limit set kadro 
// ki max 16 kb tak aa skti hai
app.use(express.json({limit: "16kb"}))

app.use(express.urlencoded({extended: true , limit: "16kb"}))


// server se agar koi assets like image video aaye toh 
// inhe public mein store karlo
app.use(express.static("public"))


//server se user ki browser ki cookies access kar pau 
//basically crud ioperation on cookies
app.use(cookieParser())


export { app }