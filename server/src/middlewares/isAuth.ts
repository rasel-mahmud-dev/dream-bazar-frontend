import {errorResponse} from "../response";
import {ObjectId} from "mongodb";
import {NextFunction} from "express";
import {Scope} from "../types";
import User from "../models/User";
import Seller from "../models/Seller";

const {getToken, parseToken} = require("../jwt")


function isAuth (scope?: Scope){
  return function (req: any, res: any, next: NextFunction){
      const token = getToken(req)
      if(token){
          parseToken(token, async (err, data)=>{
              if(!err){
                  try{
                      if(scope === Scope.SELLER_DASHBOARD){
                          let user = await Seller.findOne({_id: new ObjectId(data._id)})
                          if (user) {
                              // @ts-ignore
                              req.authUser = {roles: user.roles, _id: data._id, email: user.email}
                              next()
                          } else {
                              errorResponse(next, "Unauthorized. Your are not a member", 403)
                          }
                      } else {
                          let user = await User.findOne({_id: new ObjectId(data._id)})
                          if (user) {
                              // @ts-ignore
                              req.authUser = {roles: user.roles, _id: data._id, email: user.email}
                              next()
                          } else {
                              errorResponse(next, "Unauthorized. Your are not a member", 403)
                          }
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
}

export default isAuth