import {errorResponse} from "../response";

const {getToken, parseToken} = require("../jwt")


module.exports = async (req, res, next)=>{
  const token = getToken(req)
  if(token){
   parseToken(token, (err, data)=>{
     if(!err){
        req.userId = data._id
        next()
     } else{
         errorResponse(next, "Unauthorized. Please login", 403)
     }
   })
  } else{
    errorResponse(next, "Unauthorized. Please login", 403)
  }
}