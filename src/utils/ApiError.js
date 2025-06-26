import { Error } from "mongoose"

class ApiError extends Error {
  constructor(
    StatusCode,
    message= "Something went wrong",
    error = [],
    stack = "" 

  ){
    super(message)
    this.StatusCode = StatusCode
    this.data = null
    this.message = message
    this.error = false
    this.errors = errors 

    if(stack) {
      this.stack = stack
    }else {
      Error.captureStackTrace(this , this.constructor)
    }
  }
}

// export default {ApiError};

export {ApiError}