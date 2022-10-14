import {errorResponse} from "../response";
import {mongoConnect} from "../services/mongodb/database.service";
import {ObjectId} from "mongodb";
import {NextFunction, Response} from "express";
import {RequestWithAuth} from "../types";

const {getToken, parseToken} = require("../jwt")


async function isAuth (req: RequestWithAuth, res: Response, next: NextFunction){
  const token = getToken(req)
  if(token){
   parseToken(token, async (err, data: any)=>{
     if(!err){
         try{
             const database = await mongoConnect()
             let user = await database.collection("users").findOne({_id: new ObjectId(data._id)})
             if(user){
                 req.userId = data._id
                 req.user = {roles: user.roles, _id: user._id, email: user.email}
                 next()
             } else {
                 errorResponse(next, "Unauthorized. Your are not a member", 403)
             }
         } catch (ex){
             errorResponse(next, "Unauthorized. Please login", 500)
         }

     } else{
         errorResponse(next, "Unauthorized. Please login", 403)
     }
   })
  } else{
    errorResponse(next, "Unauthorized. Please login", 403)
  }
}

export default isAuth