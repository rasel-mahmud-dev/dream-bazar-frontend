import {NextFunction, Response, Request} from "express"
import {errorResponse, successResponse} from "../../response";
import {StatusCode} from "../../types";
import CategoryService from "./category.service";
import {ObjectId} from "mongodb";
import formidable from "formidable";

class CategoryController {
    async getCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await CategoryService.getCategories()
            successResponse(res, StatusCode.Ok, data);
        } catch (ex) {
            next(ex)
        }
    }

    async getCategoryDetail(req: Request, res: Response, next: NextFunction) {
        try {
            let data;
            if (req.query["id"]) {
                data = await CategoryService.getCategoryDetail({_id: new ObjectId(String(req.query["id"]))})
            } else if (req.query["slug"]) {
                data = await CategoryService.getCategoryDetail({slug: req.query["slug"]})
            }
            successResponse(res, StatusCode.Ok, data);
        } catch (ex) {
            next(ex)
        }
    }

    async createNewCategory(req: Request, res: Response, next: NextFunction) {
        const form = formidable({multiples: false})
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return errorResponse(next, "Form data parse fail")
            }

            try {
                let data = await CategoryService.saveCategory(fields, files)
                successResponse(res, StatusCode.Created, data);
            } catch (ex) {
                next(ex)
            }
        })
    }


    async updateCategory(req: Request, res: Response, next: NextFunction) {
        const form = formidable({multiples: false})
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return errorResponse(next, "Form data parse fail")
            }
            try {
                let data = await CategoryService.udpateCategory(req.params.categoryId as string, fields, files)
                successResponse(res, StatusCode.Created, {
                    message: "Category update successfully",
                    data
                });
            } catch (ex) {
                next(ex)
            }
        })
    }
}


export default new CategoryController();
