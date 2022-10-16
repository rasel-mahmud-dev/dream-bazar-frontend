import {NextFunction, Request, Response} from "express"

import {errorResponse, successResponse} from "../response";
import fileUpload from "../utilities/fileUpload"
import fs from "fs";

import staticDir from "../utilities/staticDir";
import uuid from "../utilities/uuid";


import Brand from "../models/Brand";
import sqlDatabase from "../services/sqlite/database.service";
import dataDir from "../utilities/dataDir";

export const getBrandsCount = async (req: Request, res: Response, next: NextFunction) => {
    let [err, doc] = await Brand.get(`SELECT COUNT(*) as count from brands`)
    if(!err && doc){
        successResponse(res, 200, doc.count)
    } else {
        errorResponse(next, "brands row count fail")
    }
}


export const getBrands = async (req: Request, res: Response, next: NextFunction) => {
    
    let { perPage = 10, pageNumber = 1 } = req.query

    try {
        // let Skip = (perPage as number) * (pageNumber as number - 1)
        let [err, result] = await Brand.findAll<Brand[]>(`SELECT * FROM brands LIMIT 100`)
        if (!err) {
            successResponse(res, 200, result)
        } else {
            errorResponse(next, err, 500)
        }

    } catch (ex) {

        next(ex)

    } finally {

    }
    
}

export const getBrand = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let [err, result] = await Brand.findOne<Brand>("SELECT * FROM brands where id = ?", [req.params.id])
        if (!err && result) {
            successResponse(res, 200, result)
        } else {
            errorResponse(next, "not found", 404)
        }

    } catch (ex) {
        next(ex)
    }
    
   
}

export const getBrandsByIds = async (req: Request, res: Response, next: NextFunction) => {
    const {ids} = req.body
  
    try {
    

    } catch (ex) {
        next()
        console.log(ex)
    } finally {
    
    }
}

// save brand controller
export const saveBrands = async (req: Request, res: Response, next: NextFunction) => {

    // let sql = `
    //      DROP TABLE if EXISTS "brands";
    //      CREATE TABLE "brands" (
    //       id TEXT NOT NULL,
    //       name text(200) NOT NULL,
    //       logo text(500) NOT NULL,
    //       forCategory JSON,
    //       CONSTRAINT "brands_pk" PRIMARY KEY("name", "id")
    // )
    //  `
    
    
    // let id = uuid(10)
    // let newBrand = new Brand({
    //     id: id,
    //     name: "ASD",
    //     logo: "ASDDDD",
    //     forCategory: JSON.stringify([])
    // })
    //
    // await newBrand.insertOne()
    //
    // console.log(newBrand)
    // let [err2] = await newBrand.insertOne(
    //     "INSERT INTO brands (id, name, logo, forCategory) Values(?, ?, ?, ?)",
    //     [id, name, newPath, JSON.stringify(for_category)]
    // )
    //
    // if (err2) {
    //     return errorResponse(next, "Internal error. Please try Again")
    // }
    
    // return res.send(newBrand)
    
    
    try {
        // parse formdata
        let {err, fields, file, fileName} = await fileUpload(req, "logo");
        if (err) {
            return errorResponse(next, "Internal Error. Please try Again")
        }
        

        const {name, forCategory} = fields as any

        // check it this brand already exists or not
        let [findErr, result] = await Brand.findOne("SELECT * FROM brands where name = ?", [name])
        if (!findErr && result) {
            return errorResponse(next, "Brand already exists", 401)
        }
        

        let newPath = ""

        // move file to our static dir
        if (file) {
            newPath = "upload/" + fileName
            try {
                fs.cpSync(file, staticDir + "/" + newPath)
            } catch (ex) {
            }
        }

        let for_category = []
        if (forCategory) {
            try {
                for_category = JSON.parse(forCategory)
            } catch (_) {
            }
        }

        let id = uuid(10)
        let newBrand = new Brand({
            id: id,
            name,
            logo: newPath,
            forCategory: JSON.stringify(for_category)
        })
        
        let [err2, doc] = await newBrand.insertOne()
       
        if (err2) {
            return errorResponse(next, "Internal error. Please try Again")
        }

        successResponse(res, 201, {
            message: "brand added",
            brand: {
                id,
                name,
                logo: newPath,
                forCategory: for_category
            }
        })

    } catch (ex) {
        return errorResponse(next, "Internal error. Please try Again")

    } finally {

    }
}

export const updateBrand = async (req: Request, res: Response, next: NextFunction) => {

    try {

        let [findErr, result] = await Brand.findOne('select * from brands where id = ?', [req.params.id])
        if (findErr || !result) {
            return errorResponse(next, "Brand Not found")
        }

        let {err, fields, file, fileName} = await fileUpload(req, "logo");
        if (err) {
            return errorResponse(next, "Internal Error. Please try Again")
        }

        const {name, forCategory, logo = ""} = fields as any


        let newPath = logo;


        if (file) {
            newPath = "upload/" + fileName
            try {
                fs.cpSync(file, staticDir + "/" + newPath)
            } catch (ex) {
            }
        }

        let for_category = []
        if (forCategory) {
            try {
                for_category = JSON.parse(forCategory)
            } catch (_) {
            }
        }

        let sql = ''
        let updatedDate =  new Date().toISOString();
        let data = []
        let a = {
            logo: newPath,
            name,
            updatedAt: updatedDate,
            forCategory
        };
        
        for (const key in a) {
            // @ts-ignore
            if (a[key]) {
                sql += `${key} = ?, `
                // @ts-ignore
                data.push(a[key])
            }
        }
        sql = sql.slice(0, sql.lastIndexOf(","))

        sql = "UPDATE brands SET " + sql + " WHERE id = ?"

        let [errRes] = await Brand.update(sql, [...data, req.params.id])

        if (errRes) {
            errorResponse(next, "Brand update fail")
        } else {
            successResponse(res, 201, {
                message: "brand updated",
                brand: {
                    id: req.params.id,
                    logo: newPath,
                    updatedAt: updatedDate,
                    name,
                    forCategory: for_category
                }
            })
        }

    } catch (ex) {
        errorResponse(next, "Brand update fail")


    } finally {

    }
}


export const deleteBrand = async (req: Request, res: Response, next: NextFunction) => {

    const {id} = req.params

    try {

        let [err, result] = await Brand.deleteOne<string>({id})
        if (err) {
            errorResponse(next, "Brand delete fail")
        } else {
            successResponse(res, 201, {message: "Brand deleted", id});
        }

    } catch (ex) {
        next(ex)
    } finally {

    }
}
