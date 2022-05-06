  
import dbConnect from "../database"
// import BrandController from "../../src/pages/Admin/Components/BrandController";

import { ObjectId } from "mongodb"
const fileUpload = require("../utilities/fileUpload")
const isObjectId = require("../utilities/isObjectId")


export const getBrandsCount = async (req, res, next)=>{
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

export const fetchBrandsWithFilter = async (req, res, next)=>{
  
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

export const getBrands =  async (req, res, next)=>{
  

  let client; 

  let {perPage=10, pageNumber=1} = req.query  
  
  let startTime = Date.now()
  
  try{
    const {c: brandCollection, client: cc } = await dbConnect("brands") 
    client = cc

    const cursor = brandCollection.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "for_category",
          foreignField: "_id",
          as: "for_categories"
        }
      },
      // { $skip: perPage * (pageNumber - 1) },
      // { $limit: Number(perPage) },
      {
        $project: {
          name: 1,
          logo: 1,
          created_at: 1,
          updated_at: 1,
          for_category: 1,
          for_categories: {
            _id: 1,
            name: 1,
            logo: 1,
          },
        }
      }
    ])   

    let brands = []
    await cursor.forEach(brand=>{
      if(brand){
        brands.push(brand) 
      }
    })


    
    res.status(200).json({brands: brands})
    // res.status(200).json({brands: brands, ms: s})

  } catch(ex){
     next()
    console.log(ex)

  } finally{
    client?.close()
  }
}

export const getBrand =  async (req, res, next)=>{
  const { brandId, brand_name } = req.query
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

export const getBrandsByIds =  async (req, res, next)=>{
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

export const saveBrands =  async (req, res, next)=>{

  const { name, for_category, logo }  = req.body 

  let client;
  
  
  try{
    const {c: brandCollection, client: cc } = await dbConnect("brands")
    client = cc
    
    let response;
    let oids = []
    if(for_category && for_category.length > 0){
      for_category.forEach(c=>{
        oids.push(new ObjectId(c))
      })
    }    
    
    let newB = {
      name: name,
      for_category: oids && oids.length > 0 ? oids : [],
      created_at: new Date(),
      updated_at:  new Date()
    }
    
    response = await brandCollection.insertOne({
      name: name,
      for_category: oids && oids.length > 0 ? oids : [],
      created_at: new Date(),
      updated_at:  new Date()
    })
    
    if(response.insertedId){
      res.status(201).json({message: "Brand Save successful", brand: newB})
    } else{
      res.status(401).json({message: "Brand Save unsuccessful"})
    }

  } catch(ex){
     next()
    console.log(ex)

  } finally{
    client?.close()
  }
}

export const saveBrandsWithImage =  async (req, res, next)=>{
  
  let client;
  
  try{
    const {c: brandCollection, client: cc } = await dbConnect("brands")
    client = cc
    
    let filePath = "upload"
    fileUpload(req, filePath, "logo", async(result)=>{
      let response;
      if (result) {
        const brands = result.fields
        brands.created_at = Date.now()
        brands.updated_at = Date.now()
        brands.logo = result.files && result.files.logo[0].path
        response = await brandCollection.insertOne(brands)
    
        // console.log(response)
    
        if (response.insertedCount) {
          res.status(200).json({message: "Brand Save succefull", brands: response.ops})
        } else {
          res.status(401).json({message: "Brand Save unsuccessfull"})
        }
    
        client && client.close()
    
      }
    })
      
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


