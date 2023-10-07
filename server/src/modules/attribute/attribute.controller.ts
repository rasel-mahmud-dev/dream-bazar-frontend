import {NextFunction, Response, Request} from "express"
import {successResponse} from "../../response";
import {StatusCode} from "../../types";

import AttributeService from "./attribute.service";

class AttributeController {
    async getProductAttributes(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await AttributeService.getAttributes()
            successResponse(res, StatusCode.Ok, data);
        } catch (ex) {
            next(ex)
        }
    }

    async addAttribute(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await AttributeService.createAttribute(req.body)
            successResponse(res, StatusCode.Ok, data);
        } catch (ex) {
            next(ex)
        }
    }

    async updateAttribute(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await AttributeService.updateAttribute(req.params.id, req.body)
            successResponse(res, StatusCode.Ok, data);
        } catch (ex) {
            next(ex)
        }
    }

}


export default new AttributeController();
