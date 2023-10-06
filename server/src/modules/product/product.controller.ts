import {NextFunction, Response, Request} from "express"
import ProductService from "./product.service";
import {successResponse} from "../../response";
import {StatusCode} from "../../types";

class ProductController {
    async getHomepageSectionProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await ProductService.getHomepageSectionProducts(req.body)
            successResponse(res, StatusCode.Ok, data);
        } catch (ex) {
            next(ex)
        }
    }
}


export default new ProductController();
