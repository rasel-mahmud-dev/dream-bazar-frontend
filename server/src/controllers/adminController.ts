import {ObjectId} from "mongodb";
import {errorResponse, successResponse} from "../response";
import {createToken, getToken, parseToken} from "../jwt";
import {StatusCode, Roles} from "../types";
import User from "../models/User";
import {hashCompare} from "../hash";


export const adminAuthLoading = async (req, res, next) => {
    const token = getToken(req)
    if (token) {
        parseToken(token, async (err, data) => {
            if (!err) {
                try {
                    let admin = await User.findOne<User>({
                        email: data.email,
                        roles: { $in: [Roles.ADMIN] },
                        _id: new ObjectId(data._id)
                    })
                    delete admin.password
                    
                    successResponse(res, StatusCode.Ok, admin)
                    
                } catch (ex: any) {
                    return errorResponse(next, ex.message, StatusCode.Unauthorized)
                }
            } else {
                return errorResponse(next, "Please Login", StatusCode.Unauthorized)
            }
        })
    } else {
        return errorResponse(next, "Please Login", StatusCode.Unauthorized)
    }
}


export const adminLogin = async (req, res, next) => {
    
    const {email, password} = req.body
    
    try {
        let admin = await User.findOne<User>({email, roles: { $in: [Roles.ADMIN] }})
        if (!admin) {
            return errorResponse(next, "Unauthorized you are not admin ", StatusCode.UnprocessableEntity)
        }
    
        let isMatch = await hashCompare(password, admin.password as string)
        
        if (!isMatch) {
            return errorResponse(next, "Please Provide valid password", StatusCode.Forbidden)
        }
        
        let token = createToken(admin._id as ObjectId, admin.email, [Roles.ADMIN])
        delete admin.password
        successResponse(res, StatusCode.Created, {
            message: 'Login success',
            token: token,
            admin: admin
        })
        
    } catch (ex) {
        next(ex)
    }
}


export const updateAdminProfile = async (req, res, next) => {

}


