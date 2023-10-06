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


        const form = formidable({multiples: true})
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return errorResponse(next, "Form data parse fail")
            }

            try {
                let data = await CategoryService.saveCategory(fields, files)
                successResponse(res, StatusCode.Ok, data);
            } catch (ex) {
                next(ex)
            }
            // if(Object.keys(files).length > 0){
            //     let renamed = {}
            //     try{
            //         for (let filesKey in files) {
            //             let newPath = files[filesKey].filepath.replace(files[filesKey].newFilename, files[filesKey].originalFilename)
            //             await cpSync(files[filesKey].filepath, newPath)
            //             renamed[filesKey] = newPath
            //         }
            //
            //         callback(false, {fields, files: renamed })
            //     } catch (ex){
            //         callback(false, {fields, files: false })
            //     }
            // } else {
            //     callback(false, {fields, files: false })
            // }
        })


    }


    async updateCategory(req: Request, res: Response, next: NextFunction) {

        const form = formidable({multiples: true})
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return errorResponse(next, "Form data parse fail")
            }

            try {
                let data = await CategoryService.saveCategory(fields, files)
                successResponse(res, StatusCode.Ok, data);
            } catch (ex) {
                next(ex)
            }
        })
    }
}


export default new CategoryController();
