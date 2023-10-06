import AuthService from "./auth.service";
import {NextFunction, Request, Response} from "express";

class AuthController {
    async login(req: Request, res: Response, next: NextFunction) {
        try{
            const data = await AuthService.login(req, req.body)
            res.json(data)
        } catch (ex){
            next(ex)
        }
    }
}

export default (new AuthController())
