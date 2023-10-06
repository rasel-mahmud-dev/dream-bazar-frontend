import {NextFunction, Response, Request} from "express";

const AuthMiddleware = {
    async requiredAuth(req: Request, _res: Response, next: NextFunction) {
        try {
            const token = req.headers["token"]
            if (!token) return next("Token expired, Please login first")

            let data = await Jwt.parseToken(token as string)
            if (!data) return next("Token expired, Please login first")
            req.user = {
                userId: data.userId
            }
            next()
        } catch (ex) {
            next("Unauthenticated, Please login first")
        }
    }
}

export default AuthMiddleware