import {NextFunction, Response, Request} from "express"
import {errorResponse, successResponse} from "../../response";
import {StatusCode} from "../../types";
import BrandService from "./brand.service";
import formidable from "formidable";
import CategoryService from "../category/category.service";

class BrandController {
    async getBrands(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await BrandService.getBrands()
            successResponse(res, StatusCode.Ok, data);
        } catch (ex) {
            next(ex)
        }
    }

    async getBrand(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await BrandService.getBrand(req.params.brandId)
            successResponse(res, StatusCode.Ok, data);
        } catch (ex) {
            next(ex)
        }
    }

    async addBrand(req: Request, res: Response, next: NextFunction) {
        const form = formidable({multiples: false})
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return errorResponse(next, "Form data parse fail")
            }
            try {
                const data = await BrandService.saveBrand(fields, files)
                successResponse(res, StatusCode.Created, {
                    data,
                    message: "Brand successfully updated"
                });
            } catch (ex) {
                next(ex)
            }
        })
    }

    async updateBrand(req: Request, res: Response, next: NextFunction) {
        const form = formidable({multiples: false})
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return errorResponse(next, "Form data parse fail")
            }
            try {
                const data = await BrandService.updateBrand(req.params.brandId, fields, files)
                successResponse(res, StatusCode.Created, {
                    data,
                    message: "Brand successfully created"
                });
            } catch (ex) {
                next(ex)
            }
        })
    }
}


export default new BrandController();
