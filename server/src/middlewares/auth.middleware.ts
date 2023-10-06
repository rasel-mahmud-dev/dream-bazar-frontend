import {NextFunction, Response, Request} from "express";
import JwtService from "../services/jwt";

const AuthMiddleware = {
    async requiredAuth(req: Request, _res: Response, next: NextFunction) {
        try {
            const token = JwtService.getToken(req)
            if (!token) return next("Token expired, Please login first")
            let data = await JwtService.parseToken(token as string)
            if (!data) return next("Token expired, Please login first")
            req.authUser = {
                roles: [],
                id: data.id
            }
            next()
        } catch (ex) {
            next("Unauthenticated, Please login first")
        }
    }
}

export default AuthMiddleware