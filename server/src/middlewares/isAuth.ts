import {errorResponse} from "../response";
import {mongoConnect} from "../services/mongodb/database.service";
import {ObjectId} from "mongodb";

const {getToken, parseToken} = require("../jwt")


async function isAuth (req, res, next){
  const token = getToken(req)
  if(token){
   parseToken(token, async (err, data)=>{
     if(!err){
         try{
             const database = await mongoConnect()
             let user = await database.collection("users").findOne({_id: new ObjectId(data._id)})
             if(user){
                 req.userId = data._id
                 req.user = {roles: user.roles, id: data._id}
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