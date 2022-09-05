import {NextFunction, Request, Response} from "express"
import dbConnect  from "../database"
const {ObjectId} = require("mongodb")
import {Document, InsertOneResult, FindOperators } from "mongodb"
import {RequestWithAuth} from "../types";
const formidable = require('formidable');
const path = require("path")
const { copyFile, mkdir, rm, slats } = require('fs/promises');
const fileUpload = require("../utilities/fileUpload")
const {errorResponse, successResponse} = require("../response")


const { createToken, getToken, parseToken} = require("../jwt")


export const login = async (req: Request, res: Response, next: NextFunction)=>{
  
  let client;
  try{
    const {c: UserCollection, client: cc } = await dbConnect("users")  
    client = cc

    let user = await UserCollection.findOne({ 
      $or: [ 
        {email: req.body.email}, 
        {phone: req.body.phone}
      ]
    })
    
    if(!user){
      return errorResponse(res, 404, {
        message: 'You are not registered',
        phone: "This Phone is not registered"
      })
    }
    
    let fieldName = ""
    if(req.body.email){
      fieldName = "email"
    } else if(req.body.phone){
      fieldName = "phone"
    }
    
    if(user[fieldName] && user[fieldName] !== req.body[fieldName]){
      return errorResponse(res, 404, {
        message: 'Unauthoriz',
        [fieldName]: "Count find Account with this " + fieldName
      })
      return  
    } 
    
    if(user.password !== req.body.password){
      return errorResponse(res, 404, {
        message: 'Password Error',
        password: "wrong password"
      })
    }
    
  //  let token = getToken(req)
    let token = createToken(user._id)
    
   
      res.json({user, token})
      
    
  } catch(ex){ 
    let response: any = {}
    response.message = ex.message || "Internal server error"
    response.status = ex.status || 500
    next(response)} 
    finally{
      client?.close()
  }
} 

export const registration = async (req: Request, res: Response, next: NextFunction)=>{
 
  let client;

  try{

    const { c: UserCollection, client: cc } = await dbConnect("users")  
    client = cc
    
    let user: Document = await UserCollection.findOne({email: req.body.email})

    if(user){
      return res.send('user already registered  ')
    }
    user = await UserCollection.insertOne(req.body)
    if(user.insertedCount >= 1){
      res.status(200).json({user: user.ops[0]})
    }
  } catch(ex){
    next(ex)
    console.log(ex)
  } finally{
    client?.close()
  }
} 

export const currentAuth = async (req: Request, res: Response, next: NextFunction)=>{
  
  let client;
  
  try{
    const { c: UserCollection, client: cc } = await dbConnect("users")
    client = cc
    let token = getToken(req)
  
   if(!token || token === 'null'){
     return errorResponse(res, 409, {message: "token not found"})
   }
   
   parseToken(token, (err, data)=>{
     if(err){
       client?.close()
        return errorResponse(res, 409, {message: "token not found"})
     }
     UserCollection.findOne({_id: ObjectId(data._id) }).then(user=>{
       client?.close()
       let {password, wishlist, ...other} = user
        res.json({user: other})
     }).catch(err=>{
       client?.close()
        return errorResponse(res, 404, {message: err.message})
     })
   })
   
  } catch(ex){
    next(ex)
    console.log(ex)
  } finally{
    // client?.close()
  }
}

export const fetchProfile = async (req: RequestWithAuth, res: Response, next: NextFunction)=>{
  let client;
  try{
    const { c: UserCollection, client: cc } = await dbConnect("users")  
    client = cc
    let user = await UserCollection.findOne({_id: ObjectId(req.user.userId) })
    res.json({user})
  } catch(ex){
    next(ex)
    console.log(ex) 
  } finally{
    client?.close()
  }
} 
