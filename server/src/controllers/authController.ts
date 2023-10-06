import e, {NextFunction, Request, Response} from "express"
import {RequestWithAuth, Roles, Scope, StatusCode} from "../types";
import {mongoConnect} from "../services/mongodb/database.service";
import User, { UserType } from "../models/User";
import {createHash, hashCompare} from "../hash";
import * as mongoDB from "mongodb"
import {createToken} from "../jwt";


import {ObjectId} from "mongodb"
import {errorResponse, successResponse} from "../response"

import fileUpload from "../services/fileUpload/fileUpload";
import { uploadImage } from "../services/cloudinary";


export const login = async (req: Request, res: Response, next: NextFunction) => {
    
    const {email, password, scope} = req.body;
    
    try {
        if (!(email && password)) {
            return errorResponse(next, 'Please provide valid credential', StatusCode.Forbidden)
        }
        let user: null | User;

        user = await User.findOne<User>({
            email
        })

        
        if (!user) {
            return errorResponse(next, 'You are not registered', 404)
        }
        
        if (!user.password) {
            return errorResponse(next, 'You haven"t any password', 409)
        }
        
        const isMatched = await hashCompare(password, user.password)
        if (!isMatched) {
            return errorResponse(next, 'Password Error', 404)
        }
        
        let token = createToken(user._id as any, user.email, user.roles)
        
        delete user.password;
        
        successResponse(res, 201, {
            user,
            token
        })
        
    } catch (ex) {
        next(ex)
    }
}


export const registration = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, firstName, lastName, password} = req.body
        
        if(!(email && firstName && password)){
            return errorResponse(next, "Please provide valid credential", StatusCode.UnprocessableEntity)
        }
        
        const database = await mongoConnect();
        
        const user = await database.collection("users").findOne<User>({email})
        if (user) {
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
        if (!err) {
            newUser.password = hashPassword;
        }
        
        const doc: mongoDB.InsertOneResult = await database.collection("users").insertOne(newUser)
        
        if (doc.insertedId) {
            
            let token = createToken(doc.insertedId as any, newUser.email, newUser.roles)
            delete newUser.password;
            newUser._id = doc.insertedId
            
            successResponse(res, 201, {
                user: newUser,
                token
            })
            
        } else {
            return errorResponse(next, "Registration fail. please try again.")
        }
        
    } catch (ex) {
        next(ex)
    }
}



export const currentAuth = async (req: RequestWithAuth, res: Response, next: NextFunction) => {

    
    try {
        if (!req.authUser) {
            return errorResponse(next, "Please login.", 401)
        }
        
        const database = await mongoConnect();
        
        // validate user roles
        const user = await database.collection("users").findOne<User>({
            _id: new ObjectId(req.authUser._id)
        })
        
        if (!user) {
            return errorResponse(next, "Please login.", 401)
        }
        
        delete user.password
        successResponse(res, 200, user)
        
    } catch (ex) {
        next(ex)
    }
}

export const fetchProfile = async (req: RequestWithAuth, res: Response, next: NextFunction) => {
    // let client;
    // try{
    //   const { c: UserCollection, client: cc } = await dbConnect("users")
    //   client = cc
    //   let user = await UserCollection.findOne({_id: ObjectId(req.user._id) })
    //   res.json({user})
    // } catch(ex){
    //   next(ex)
    // } finally{
    //   client?.close()
    // }
}



export const getProfile = async (req: RequestWithAuth, res: Response, next: NextFunction) => {
    try{
        let user = await User.findOne({_id: new ObjectId(req.authUser._id)})
        if(user){
            successResponse(res, StatusCode.Ok, user)
        } else{
            errorResponse(next, "User not found", StatusCode.NotFound)
        }
    }catch(ex){
        next(ex)
    }
}



export const updateProfile = async (req: RequestWithAuth, res: Response, next: NextFunction) => {
    fileUpload<any>(req, async (err, { fields, files }) => {
        try {
            if (err) return errorResponse(next, "Form data parsing error")

            const {
                username,
                firstName,
                lastName,
                avatar
            } = fields

            let user = await User.findOne<UserType>({ _id: new ObjectId(req.authUser._id) },  { projection: {password: 0}});
            if (!user) return errorResponse(next, "User not found")



            const updateUser = { ...user }
            if (username) updateUser.username = username
            if (firstName) updateUser.firstName = firstName
            if (lastName) updateUser.lastName = lastName



            if(files && files["avatar"]) {
                //  upload image on cloudinary
                let result = await uploadImage(files["avatar"], {dir: "dream-bazar", overwrite: false})
                if (result) {
                    updateUser.avatar = result.secure_url
                } else {
                    return next("Avatar upload fail")
                }
            } else{
                if (avatar) updateUser.avatar = avatar
            }

            let doc = await User.findAndUpdate({_id: new ObjectId(req.authUser._id)}, {
                $set: updateUser
            })

            if(doc.modifiedCount && doc.matchedCount){
                successResponse(res, StatusCode.Created, updateUser)
            } else {
                successResponse(res, StatusCode.Created, {})
            }

        } catch (ex) {
            next(ex)
        }
    })
}



