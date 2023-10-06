import {NextFunction, Response, Request} from "express"
import RoleService from "./role.service";

class RoleController {
    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        const users = await RoleService.getAllUsers()
        res.json(users);
    }

    async getAllRoles(req: Request, res: Response, next: NextFunction) {
        const roles = await RoleService.getAllRoles()
        return roles
    }

    async getAllFeatures(req: Request, res: Response, next: NextFunction) {
        const features = await RoleService.getAllFeatures()
        return features
    }
}


export default new RoleController();
