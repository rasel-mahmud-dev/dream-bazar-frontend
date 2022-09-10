  
import dbConnect from "../database"
// import BrandController from "../../src/pages/Admin/Components/BrandController";
import {NextFunction, Request, Response} from "express"

import { ObjectId } from "mongodb"
import {collections} from "../services/mongodb/database.service";
import sqlDatabase from "../database/sqlDatabase";
import {errorResponse, successResponse} from "../response";
import fileUpload from "../utilities/fileUpload"
import fs from "fs";
import dataDir from "../utilities/dataDir";
import staticDir from "../utilities/staticDir";
import uuid from "../utilities/uuid";
import {getSqliteDb} from "../services/sqlite/database.service";
import {findAll, findOne} from "../services/sqlite/database.methods";
const isObjectId = require("../utilities/isObjectId")


export const getBrandsCount = async (req: Request, res: Response, next: NextFunction)=>{
  const { _id } = req.query
  let client;
  try{
    const { c: BrandCollection, client: cc} = await dbConnect("brands")
    client = cc
    
    const doc = await BrandCollection.countDocuments({})
    res.status(200).json({count: doc})
  } catch(ex){
     next()
    console.log(ex)
  } finally{
    client?.close()
  }
} 

export const fetchBrandsWithFilter = async (req: Request, res: Response, next: NextFunction)=>{
  
  let client;
  const { brands=[], forCategoryIds } = req.body
  
  try{
    const {c: brandCollection, client: cc } = await dbConnect("brands") 
    client = cc
    let brandIds = []
    brands.forEach(b=>{
      if(isObjectId(b)){
        brandIds.push(new ObjectId(b))
      }
    })
    
    let cursor;
    if(forCategoryIds){
      let catIds = []
      forCategoryIds.forEach(cat=>{
        catIds.push(new ObjectId(cat))
      })
      cursor = brandCollection.find({ for_category: { $in: catIds } })
      
    } else {
      cursor = brandCollection.find({ _id: { $in: brandIds } })
    }
    let allBrands = []
    await cursor.forEach(brand=>{
      allBrands.push(brand) 
    })
    res.status(200).json({brands: allBrands})
  } catch(ex){
     next()
    console.log(ex)
  } finally{
    client?.close()
  }
}

let ms;






export const getBrands =  async (req: Request, res: Response, next: NextFunction)=>{

  let {perPage=10, pageNumber=1} = req.query


  try {

    let [err, result] = await findAll(`SELECT * FROM brands`)
    if(!err){
      successResponse(res, 200, result)
    } else {
      successResponse(res, 200, [])
    }

  } catch(ex){
     next()

  } finally{

  }
}

export const getBrand =  async (req: Request, res: Response, next: NextFunction)=>{
  const { brandId, brand_name } = req.query as {
    brandId: string,
    brand_name: string
  }
  let client;
  
  try{
    const {c: brandCollection, client: cc } = await dbConnect("brands")
    client = cc
    let brand;
    if(brandId) {
      brand = await brandCollection.findOne({_id: new ObjectId(brandId)})
    } else if(brand_name) {
      brand = await brandCollection.findOne({name: brand_name})
    }
    if(brand){
      res.status(200).json({brand: brand})
    } else {
      res.status(404).json({message: "brand not found"})
    }
  } catch(ex){
     next()
    console.log(ex)
  } finally{
    client?.close()
  }
}

export const getBrandsByIds =  async (req: Request, res: Response, next: NextFunction)=>{
  const { ids } = req.body
  let client;
  try {
    const { c: BrandCollection, client: cc   } = await dbConnect("brands")
    client = cc
    let brandIds = []
    let cursor; 
    ids && ids.forEach(stringId=>{
      brandIds.push( new ObjectId(stringId) )
    })
  
    cursor = BrandCollection.find(
      { _id: { $in: brandIds } }
    )         
    
    let brands = []
    await cursor.forEach(brand=>{
      brands.push(brand)
    }) 
    res.json({brands: brands})
      
  } catch(ex){
     next()
    console.log(ex)
  } finally {
    client?.close()
  }
}

export const saveBrand =  async (data, next, cb)=>{
  const { id, name, logo, forCategory  } = data;
  try {
    let [err, result] = await findOne("SELECT * FROM brands where name = ?", [name])
    if(!err && result){
      errorResponse(next, "Brand already exists", 401)
    } else {
      cb(null, data)
    }

    // let sql = `
    //     INSERT INTO brands('id', 'name', 'logo', 'forCategory') values("${id}", "${name}", "${logo}", '${JSON.stringify(forCategory)}')
    //  `
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

    // db.exec(sql, function (data: any, err: any){
    //   if(err){
    //     cb(err, null)
    //     return;
    //   }
    //   console.log(data)
    //   cb(null, data)
    //   console.log("table has been created")
    // })

  } catch(ex){
    cb(ex, null)
  } finally{

  }
}

export const saveBrands =  async (req: Request, res: Response, next: NextFunction)=>{


  
  try{
    const {err, fields, file, fileName} = await fileUpload(req, "logo");
    if(err){
      return errorResponse(next, "Internal Error. Please try Again")
    }

    const { name, forCategory }  = fields as any


    const newPath =  "upload/" + fileName

    fs.cp(file, staticDir +"/"+ newPath, err1 => {
      if(err){
        return errorResponse(next, "Logo upload error. Please try Again")
      }

      let for_category = []
      if(forCategory){
        try {
          for_category = JSON.parse(forCategory)
        } catch (_) {}
      }

      saveBrand({id: uuid(10), name, forCategory: for_category, newPath}, next, (err, result)=>{
        if(err){
          console.log(err)
          return errorResponse(next, "Internal error. Please try Again")
        }

        console.log(result)
        successResponse(res, 201, result)
      })
    })
  } catch(ex){
    console.log(ex)

  } finally{

  }
}

export const saveBrandsWithImage =  async (req: Request, res: Response, next: NextFunction)=>{
  
  let client;
  
  try{
    const {c: brandCollection, client: cc } = await dbConnect("brands")
    client = cc
    
    let filePath = "upload"
    // fileUpload(req, filePath, "logo", async(result)=>{
    //   let response;
    //   if (result) {
    //     const brands = result.fields
    //     brands.created_at = Date.now()
    //     brands.updated_at = Date.now()
    //     brands.logo = result.files && result.files.logo[0].path
    //     response = await brandCollection.insertOne(brands)
    //
    //     // console.log(response)
    //
    //     if (response.insertedCount) {
    //       res.status(200).json({message: "Brand Save succefull", brands: response.ops})
    //     } else {
    //       res.status(401).json({message: "Brand Save unsuccessfull"})
    //     }
    //
    //     client && client.close()
    //
    //   }
    // })
      
  } catch(ex){
     next()
    console.log(ex)
  } finally{
   client?.close()
  }
}

export const deleteBrand = async(req, res, next)=>{
  const { brandId } = req.params 
  let client;
  try{
  const {c: brandCollection, client: cc } = await dbConnect("brands")
  client = cc
    const response = await brandCollection.deleteOne({_id: new ObjectId(brandId)})
    if(response.deletedCount){
      res.status(200).json({message: "brand successfully deleted"})
    } else{
      res.status(500).json({message: "brand delete unsuccessfully"})
    }
  } catch(ex){
     next()
    console.log(ex)
  } finally{
   client?.close()
  }
}

export const editBrand = async(req, res, next)=>{
  const { brandId } = req.params 
  const brand = req.body  
  let client;
  
  try {

    const {c: brandCollection, client: cc } = await dbConnect("brands")
    client = cc
    

    const { _id, created_at, for_categories, for_category, ...others } = brand

    let c_ids = [] 
    if(for_category){
      for(let i of for_category){
        c_ids.push(new ObjectId(i))
      }
    }
    others.for_category = c_ids // array of mongodb ObjectId
    others.updated_at = new Date()
    
    const response = await brandCollection.updateOne(
      {_id: new ObjectId(brandId)},
      { $set: others }
    )

    
    if(response.modifiedCount > 0){
      res.status(201).json({message: "brand updated", brand: { _id: _id, ...brand } })
    } else{
      res.status(409).json({message: "brand not updated"})
    }

    // let filePath = "upload"
    // fileUpload(req, filePath, "logo", async(result)=>{
    //   if(result){ 
    //     const brand = result.fields
    //     brand.updated_at = Date.now()
    //     console.log(brand);

        // if(result.files && result.files.logo[0].path){
        //   brand.logo = result.files.logo[0].path 
        // }
        // const response = await brandCollection.updateOne(
        //   {_id: new ObjectId(brandId)},
        //   { $set: brand} 
        // ) 
      
        
        // if(response.result.nModified > 0){
        //   res.status(201).json({message: "brand updated", brand: { _id: brandId, ...brand } })
        // } else{
        //   res.json({message: "brand not updated"})
        // }
    
        // client.close()
    //   } else{
    //     console.log("server error")
    //   }
    // })






    
  } catch(ex){
     next()
    console.log(ex)
  } finally{
    client?.close()
  }
}


