import {NextFunction, Request, Response} from "express"
import dbConnect from "../database"
import {RequestWithAuth} from "../types";
import {collections} from "../services/database.service";
import User, {Roles} from "../models/User";
import {createHash, hashCompare} from "../hash";

const {ObjectId} = require("mongodb")
const formidable = require('formidable');
const path = require("path")
const { copyFile, mkdir, rm, slats } = require('fs/promises');
const fileUpload = require("../utilities/fileUpload")
const {errorResponse, successResponse} = require("../response")

import * as mongoDB from "mongodb"


const { createToken, getToken, parseToken} = require("../jwt")


export const login = async (req: Request, res: Response, next: NextFunction)=>{

  const { email, password } = req.body;

  try{

    if(!(email && password)){
      return errorResponse(next, 'Please provide valid credential', 404)
    }

    let user = await collections.users.findOne<User>({email})
    if(!user){
      return errorResponse(next, 'You are not registered', 404)
    }

    if(!user.password){
      return errorResponse(next, 'You haven"t any password', 409)
    }

    const isMatched = hashCompare(password, user.password)
    if(!isMatched){
      return errorResponse(next, 'Password Error', 409)
    }

   // let token = getToken(req)
    let token = createToken(user._id)

    delete user.password;

    successResponse(res, 201, {
      user,
      token
    })
    
  } catch(ex) {
    next(ex)
  }
} 

export const registration = async (req: Request, res: Response, next: NextFunction)=>{
  try{
    const { email, firstName, lastName, password } = req.body

    const user = await collections.users.findOne<User>({email})
    if(user){
      return next({message: "User already registered", status: 401})
    }

    let newUser = new User({
      firstName,
      email,
      lastName: (lastName ? " " + lastName : ""),
      username: firstName + (lastName ? " " + lastName : ""),
      roles: [Roles.CUSTOMER]
    })

    const [err, hashPassword] = await createHash(password)
    if(!err){
      newUser.password = hashPassword;
    }

    const doc: mongoDB.InsertOneResult = await collections.users.insertOne(newUser)

    if(doc.insertedId){
      res.status(200).json({user: newUser })
    } else {
      return next("Registration fail. please try again.")
    }

  } catch(ex){
    next(ex)
  }
} 

export const currentAuth = async (req: Request, res: Response, next: NextFunction)=>{
  
  let client;
  
  try{
    const { c: UserCollection, client: cc } = await dbConnect("users")
    client = cc
    let token = getToken(req)
  
   if(!token || token === 'null'){
     return next("Token not found")
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
