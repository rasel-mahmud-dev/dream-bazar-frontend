import {errorResponse, successResponse} from "../response"
import {NextFunction, Request, Response} from "express";
import Category, {CategoryType} from "../models/Category";
import isObjectId from "../utilities/isObjectId";
import {StatusCode} from "../types";

import {ObjectId} from "mongodb"
// import CategoryDetail from "../models/CategoryDetail";
import Attributes from "../models/Attributes";
import fileUpload from "../services/fileUpload/fileUpload";
import {uploadImage} from "../services/cloudinary";


export const getCategoriesCount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const count = await Category.count()
        res.send(count)
    } catch (ex) {
        next(ex)
    }
}


/**
 get all flat database categories
 */
export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await Category.find<Category[]>({}, {
            projection: {
                name: 1,
                parentId: 1,
                isProductLevel: 1
            }
        })
        res.send(categories)

    } catch (ex) {
        next(ex)
    }
}


/**
 get all product level categories
 */
export const getProductLevelCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await Category.find<Category[]>({isProductLevel: true}, {
            projection: {
                name: 1,
                parentId: 1,
                isProductLevel: 1
            }
        })
        res.send(categories)

    } catch (ex) {
        next(ex)
    }
}


/**
 Get flat single category
 */
export const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    const {name, parentId, id} = req.query


    try {
        if (id) {
            const category = await Category.findOne<CategoryType>({_id: new ObjectId(id as string)})
            if (!category) return errorResponse(next, "category not found", 404)

            if (category.filterAttributes) {
                let allFilterAttributes = await Attributes.find<Attributes[]>({attributeName: {$in: [...category.filterAttributes]}})
                if (allFilterAttributes) {
                    category.filterAttributesValues = allFilterAttributes;
                }
            }
            return successResponse(res, StatusCode.Ok, category)
        }
        if (name) {
            const category = await Category.findOne({name: name})
            if (!category) return errorResponse(next, "category not found", 404)
            return successResponse(res, StatusCode.Ok, category)

        }
        if (parentId && isObjectId(parentId)) {
            const category = await Category.findOne({parentId: parentId})
            if (!category) return errorResponse(next, "category not found", 404)
            return successResponse(res, StatusCode.Ok, category)
        }

        errorResponse(next, "please provide query params name or parentId", 500)

    } catch (ex) {
        next(ex)

    }
}

function parseFormDataToObject<T>(formData): T {
    let obj: T = {} as T
    for (let formDataKey in formData) {
        if(formData[formDataKey] === "null"){
            obj[formDataKey] = null
        } else if(formData[formDataKey] === "false"){
            obj[formDataKey] = false
        }else if(formData[formDataKey] === "true"){
            obj[formDataKey] = true
        } else if(formData[formDataKey] === "undefined"){
            obj[formDataKey] = undefined
        } else if(!isNaN(Number(formData[formDataKey]))) {
            obj[formDataKey] = Number(formData[formDataKey])
        } else {
            try{
                obj[formDataKey]  =  JSON.parse(formData[formDataKey] || "")
            } catch (ex){
                obj[formDataKey]  = ""
            }
        }
    }
    return obj
}



// update category
export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params

    fileUpload(req, async (err, {fields, files}) => {
        if (err) return errorResponse(next, "Form data parsing error")

        try {

            const {
                name,
                parentId = null,
                logo,
                isProductLevel = true,
                defaultExpand = [],
                filterAttributes = [],
                renderProductAttr = [],
                productDescriptionSection = {}
            } = parseFormDataToObject<{
                name: string
                parentId: object
                logo: string
                isProductLevel: boolean
                defaultExpand: string[]
                filterAttributes: string[]
                renderProductAttr: string[]
                productDescriptionSection: any
            }>(fields)

            // check it this category already exist or not

            let category = await Category.findOne<Category>({_id: new ObjectId(id)})
            if (!category) return errorResponse(next, "Category not found")

            let newPath = logo;

            if (files && files["logo"]) {
                let info = await uploadImage(files["logo"], {dir: "dream-bazar"})
                if (info) {
                    newPath = info.secure_url
                }
            }

            let updatedCategory = {} as Category
            if (name) updatedCategory.name = name
            if (newPath) updatedCategory.logo = newPath
            if (parentId) updatedCategory.parentId = parentId as unknown as string
            if (isProductLevel !== undefined) updatedCategory.isProductLevel = isProductLevel
            if (defaultExpand) updatedCategory.defaultExpand = defaultExpand
            if (filterAttributes) updatedCategory.filterAttributes = filterAttributes
            if (renderProductAttr) updatedCategory.renderProductAttr = renderProductAttr
            if (productDescriptionSection) updatedCategory.productDescriptionSection = productDescriptionSection

            let updateResult = await Category.findAndUpdate<Category>({_id: new ObjectId(id)}, {
                $set: {
                    ...updatedCategory
                }
            })

            if (!updateResult) return errorResponse(next, "category update fail")

            successResponse(res, StatusCode.Created, {
                message: "category updated",
                category: updateResult
            })

        } catch (ex) {
            next(ex)

        }

    })

}


export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params

    try {

        let isDeleted = await Category.deleteById(id)
        if (isDeleted.deletedCount) {
            return successResponse(res, 201, {message: "Category deleted", id});
        }

        errorResponse(next, "Category delete fail", 500)

    } catch (ex) {
        next(ex)
    } finally {

    }
}




