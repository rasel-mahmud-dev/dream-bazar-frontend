import {NextFunction, Response, Request} from "express"
import ProductService from "./product.service";
import {successResponse} from "../../response";
import {StatusCode} from "../../types";
import {ObjectId} from "mongodb";

class ProductController {
    async getAllProductsForAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await ProductService.getAllProducts(req.query)
            successResponse(res, StatusCode.Ok, data);
        } catch (ex) {
            next(ex)
        }
    }

    async getHomepageSectionProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await ProductService.getHomepageSectionProducts(req.body)
            successResponse(res, StatusCode.Ok, data);
        } catch (ex) {
            next(ex)
        }
    }

    async productFiltersPostV2(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await ProductService.productFiltersPostV2(req.body)
            successResponse(res, StatusCode.Ok, data);
        } catch (ex) {
            next(ex)
        }
    }

    async getProductDetailForUpdate(req: Request, res: Response, next: NextFunction) {
        try {
            let filter = {}
            const query = req.query
            if (query["slug"]) filter["slug"] = query["slug"]
            if (query["id"]) filter["_id"] = new ObjectId(String(query["id"]))
            const data = await ProductService.getProductDetailForUpdate(filter)
            successResponse(res, StatusCode.Ok, data);
        } catch (ex) {
            next(ex)
        }
    }
}


export default new ProductController();
