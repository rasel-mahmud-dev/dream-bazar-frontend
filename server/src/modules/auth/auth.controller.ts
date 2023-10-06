import AuthService from "./auth.service";
import {NextFunction, Request, Response} from "express";
import {successResponse} from "../../response";
import {StatusCode} from "../../types";


class AuthController {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await AuthService.login(req.body)
            successResponse(res, StatusCode.Created, data)
        } catch (ex) {
            next(ex)
        }
    }

    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await AuthService.registration(req.body)
            successResponse(res, StatusCode.Created, data)
        } catch (ex) {
            next(ex)
        }
    }

    async verifyAuth(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await AuthService.verifyAuth(req.authUser)
            successResponse(res, StatusCode.Ok, {user: data})
        } catch (ex) {
            next(ex)
        }
    }
}

export default (new AuthController())
