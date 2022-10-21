import {NextFunction, Request, Response} from "express"

import {errorResponse, successResponse} from "../response";
import fileUpload from "../utilities/fileUpload"
import fs from "fs";

import staticDir from "../utilities/staticDir";

import Brand from "../models/Brand";

import {ObjectId} from "mongodb";
import {mongoConnect} from "../services/mongodb/database.service";
import isObjectId from "../utilities/isObjectId";

export const getBrandsCount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let count = await Brand.count()
        successResponse(res, 200, count as any)
    } catch(ex){
        errorResponse(next, "brands row count fail")
    }
}

export const getBrandsForCategory = async (req: Request, res: Response, next: NextFunction) => {
    
    const { forCategory } = req.body
    
    try {
        const collection = await Brand.collection()
        
        if (forCategory) {
            let allBrands = await collection.find({
                forCategory: {
                    $in: forCategory
                }
            }).toArray();
            
            res.status(200).json({brands: allBrands})
        } else {
            res.status(200).json({brands: []})
        }
        
    } catch (ex) {
        next(ex)
    }
}

export const getBrands = async (req: Request, res: Response, next: NextFunction) => {
    
    let { perPage = 10, pageNumber = 1 } = req.query

    try {
        // let Skip = (perPage as number) * (pageNumber as number - 1)
        let brands= await Brand.find<Brand[]>({})
        successResponse(res, 200, brands)
        
    } catch (ex) {
        next(ex)
    }
}

export const getBrand = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let brand = await Brand.findOne<Brand>({_id : new ObjectId(req.params.id)})
        if (brand) {
            successResponse(res, 200, brand)
        } else {
            errorResponse(next, "not found", 404)
        }

    } catch (ex) {
        next(ex)
    }
    
   
}


// save brand controller
export const saveBrands = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // parse formdata
        let {err, fields, file, fileName} = await fileUpload(req, "logo");
        if (err) return errorResponse(next, "Internal Error. Please try Again")

        const {name, forCategory = "[]"} = fields as any

        // check it this brand already exists or not
        let result = await Brand.findOne({name: name})
        if (result)  return errorResponse(next, "Brand already exists", 401)
        

        let newPath = ""

        // move file to our static dir
        if (file) {
            newPath = "upload/" + fileName
            try {
                fs.cpSync(file, staticDir + "/" + newPath)
            } catch (ex) {
            }
        }
        
        let c = JSON.parse(forCategory)
        
        let newBrand = new Brand({
            name,
            logo: newPath,
            forCategory: c
        })
    
        newBrand = await newBrand.save() as any
       
        if (!newBrand) return errorResponse(next, "Internal error. Please try Again")
        
        successResponse(res, 201, {
            message: "brand added",
            brand: newBrand
        })

    } catch (ex) {
        return errorResponse(next, "Internal error. Please try Again")
    }
}

export const updateBrand = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        
        let result = await Brand.findOne({_id: new ObjectId(req.params.id)})
        if (!result) return errorResponse(next, "Brand Not found")


        let {err, fields, file, fileName} = await fileUpload(req, "logo");

        if (err) return errorResponse(next, "Internal Error. Please try Again")

        const {name, forCategory= '[]', logo = ""} = fields as any
        let newPath = logo;


        if (file) {
            newPath = "upload/" + fileName
            try {
                fs.cpSync(file, staticDir + "/" + newPath)
            } catch (ex) {}
        }

        let c = JSON.parse(forCategory)
        let updatedBrandData = new Brand({})
        if (name) updatedBrandData.name = name
        if (forCategory) updatedBrandData.forCategory = c
        if (logo) updatedBrandData.logo = logo
        updatedBrandData.updatedAt = new Date();

        let doc = await updatedBrandData.updateOne(req.params.id, {
            $set: {
                ...updatedBrandData
            }
        })

        if (!doc) return errorResponse(next, "Brand update fail")

        updatedBrandData._id = req.params.id
        successResponse(res, 201, {
            message: "brand updated",
            brand: updatedBrandData
        })
        
        
    } catch (ex) {
        errorResponse(next, "Brand update fail")
    }
}


export const deleteBrand = async (req: Request, res: Response, next: NextFunction) => {

    const {id} = req.params

    try {
        let isDeleted= await Brand.deleteById(id)
        if (isDeleted.deletedCount) {
            errorResponse(next, "Brand delete fail")
        } else {
            successResponse(res, 201, {message: "Brand deleted", id});
        }

    } catch (ex) {
        next(ex)
    } finally {

    }
}
