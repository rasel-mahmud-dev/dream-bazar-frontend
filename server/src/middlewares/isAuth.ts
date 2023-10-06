import {errorResponse} from "../response";
import {ObjectId} from "mongodb";
import {NextFunction} from "express";
import User from "../models/User";

const {getToken, parseToken} = require("../jwt")


function isAuth() {
    return function (req: any, res: any, next: NextFunction) {
        const token = getToken(req)

        if (token) {
            parseToken(token, async (err, data) => {

                if (!err) {
                    try {
                        
                        let user = await User.findOne({_id: new ObjectId(data._id)})

                        if (user) {
                            // @ts-ignore
                            req.authUser = {roles: user.roles, _id: data._id, email: user.email}
                            next()
                        } else {
                            errorResponse(next, "Unauthorized. Your are not a member", 403)
                        }
                    } catch (ex) {
                        errorResponse(next, "Unauthorized. Please login", 403)
                    }

                } else {
                    errorResponse(next, "Unauthorized. Token is corrupted", 403)
                }
            })
        } else {
            errorResponse(next, "Unauthorized. token missing, please login again", 403)
        }
    }
}

export default isAuth