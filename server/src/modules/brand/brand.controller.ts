import {NextFunction, Response, Request} from "express"
import {successResponse} from "../../response";
import {StatusCode} from "../../types";
import BrandService from "./brand.service";

class BrandController {
    async getBrands(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await BrandService.getBrands()
            successResponse(res, StatusCode.Ok, data);
        } catch (ex) {
            next(ex)
        }
    }
}


export default new BrandController();
