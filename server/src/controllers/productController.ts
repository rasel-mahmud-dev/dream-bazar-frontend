import Product, {ProductType} from "../models/Product";
import Validator from "../utilities/validator";
import ProductDescription, {ProductDescriptionType} from "../models/ProductDescription";

import { ObjectId }  from "mongodb"
const isObjectId = require("../utilities/isObjectId")

import dbConnect from "../database/index"


import fileUploadHandler from "../utilities/fileUpload";
import {parentPort} from "worker_threads";


export const getProductCount = async (req, res, next)=>{
  const {category_id} = req.query
  let client;
  try{
      const { c: ProductCollection, client: cc} = await dbConnect("products")
    client = cc
    let r;
    if(category_id){
      r = await ProductCollection.countDocuments({category_id: new ObjectId(category_id)})
      
    } else {
      r = await ProductCollection.countDocuments({})
      
    }
    res.status(200).json({count:r})
    

  } catch(ex){
    console.log(ex)
    next(ex)
  } finally{
    client?.close()
  }
} 


export const getProducts = async (req, res, next)=>{
  
  const { pageNumber=1, perPage=10 } = req.query
  
  try {

    let docs: any = await Product.aggregate([
      {
          $lookup: {
            from: "categories",
            localField: "category_id",
            foreignField: "_id",
            as: "category"
          }
        },
        { $unwind: {path: "$category", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: "brands",
            localField: "brand_id",
            foreignField: "_id",
            as: "brand"
          }
        },
        { $unwind: {path: "$brand", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            title: 1,
            created_at: 1,
            price: 1,
            cover_photo: 1,
            category_id: 1,
            category: {
              title: 1,
              logo: 1,
              name: 1
            },
            brand_id: 1,
            brand: {
              _id: 1,
              name: 1,
            }
          }
        },
        {$skip: perPage * (pageNumber - 1)},
        {$limit: Number(perPage)}
    ])
    
    // let docs = await  Product.findOne({ qty: 5 })
    
    res.json({products: docs})

    // let cursor;
      // cursor = ProductCollection.aggregate([
      //   {
      //     $lookup: {
      //       from: "categories",
      //       localField: "category_id",
      //       foreignField: "_id",
      //       as: "category"
      //     }
      //   },
      //   {$unwind: {path: "$category", preserveNullAndEmptyArrays: true}},
      //   {
      //     $lookup: {
      //       from: "brands",
      //       localField: "brand_id",
      //       foreignField: "_id",
      //       as: "brand"
      //     }
      //   },
      //   {$unwind: {path: "$brand", preserveNullAndEmptyArrays: true}},
      //   {$skip: perPage * (pageNumber - 1)},
      //   {$limit: Number(perPage)},
      //   {$project: {'category.filters': 0}}
      // ])
    
  } catch (ex){
    console.log(ex)
    
    next(ex)

  } finally {
    // client?.close()
  }
}


export const getProduct = async (req, res, next)=>{
  if(!isObjectId(req.params.id)){
    return res.send('please send product id')
  }
 

  // let client;

  try {
    
    
    let p: ProductType = await Product.aggregate([
      { $match: { _id: new ObjectId(req.params.id) } },
      {
        $lookup: {
          from: "categories",
          localField: "category_id",
          foreignField: "_id",
          as: "category"
        }
      },
      {
        $lookup: {
          from: "brands",
          localField: "brand_id",
          foreignField: "_id",
          as: "brand"
        }
      },
      {
        $lookup: {
          from: "sellers",
          localField: "seller_id",
          foreignField: "_id",
          as: "seller"
        }
      },
      { $unwind: { path: "$seller", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "users",
          localField: "seller.customer_id",
          foreignField: "_id",
          as: "seller.seller_desc"
        }
      },
      { $unwind: { path: "$seller.seller_desc", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          title: 1,
          seller_id: 1,
          seller: {
            customer_id: 1,
            shop_name: 1,
            seller_info: {
              username: 1,
              email: 1
            }
          },
          qty: 1,
          sold: 1,
          views: 1,
          "category_id": 1,
          "price": 1,
          "brand_id": 1,
          "created_at": 1,
          "attributes": 1,
          "cover_photo": 1,
          "discount": 10,
          "images": 1,
          "updated_at": 1
        }
      }
    ])
    
    
    // const { c: ProductCollection, client: cc} = await dbConnect("products")
    // client = cc
    //
    // let cursor =  ProductCollection.aggregate([
    //   { $match: { _id: new ObjectId(req.params.id) } },
    //   {
    //     $lookup: {
    //       from: "categories",
    //       localField: "category_id",
    //       foreignField: "_id",
    //       as: "category"
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: "brands",
    //       localField: "brand_id",
    //       foreignField: "_id",
    //       as: "brand"
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: "sellers",
    //       localField: "seller_id",
    //       foreignField: "_id",
    //       as: "seller"
    //     }
    //   },
    //   { $unwind: { path: "$seller", preserveNullAndEmptyArrays: true } },
    //   {
    //     $lookup: {
    //       from: "users",
    //       localField: "seller.customer_id",
    //       foreignField: "_id",
    //       as: "seller.seller_desc"
    //     }
    //   },
    //   { $unwind: { path: "$seller.seller_desc", preserveNullAndEmptyArrays: true } },
    //   {
    //     $project: {
    //       title: 1,
    //       seller_id: 1,
    //       seller: {
    //         customer_id: 1,
    //         shop_name: 1,
    //         seller_info: {
    //           username: 1,
    //           email: 1
    //         }
    //       },
    //       qty: 1,
    //       sold: 1,
    //       views: 1,
    //       "category_id": 1,
    //       "price": 1,
    //       "brand_id": 1,
    //       "created_at": 1,
    //       "attributes": 1,
    //       "cover_photo": 1,
    //       "discount": 10,
    //       "images": 1,
    //       "updated_at": 1
    //     }
    //   }
    // ])
    //
    // let product = {}
    //
    // await cursor.forEach(p=>{
    //   product = p
    // })
    //
    // if(product){
    //   return res.json({product: product})
    //
    // } else {
    //   res.status(404).json({message: "Product Not Found"})
    // }
  
    return res.json({product: p[0]})
    
  } catch (ex){
    console.log("-================");
    next(ex)
  } finally {
    // client?.close()
  }

}


export const productUpdate = async (req, res, next)=>{
  const { id } = req.params
  const { type, quantity } = req.body
  let client;
  try {
    const { c: ProductCollection, client: cc} = await dbConnect("products")
    client = cc
    let response;
    if(type === "product_view_increase"){
      response = await ProductCollection.findOneAndUpdate(
        {_id: new ObjectId(id) },
        { $inc: { views: 1 } },
        // { returnDocument: true}
      ) 
    } else if(type === "product_stock_increase"){
       response = await ProductCollection.findOneAndUpdate(
        {_id: new ObjectId(id) },
        { $inc: { qty: quantity ? Number(quantity) : 1 } },
        // { returnNewDocument: true}
      ) 
    } else if(type === "product_stock_decrease"){
      response = await ProductCollection.findOneAndUpdate(
        {_id: new ObjectId(id) },
        { $inc: { qty: quantity ? Number(quantity) : -1 } },
        // { returnNewDocument: true}
      ) 
    }
    
    res.status(201).json({product: response.value})
  }catch (ex){
    next(ex)
  } finally {
    client?.close()
  }
}


export const updateProductPutReq = async (req, res, next)=>{
  const { id } = req.params
 
  
  let client;
  try {
    const { db, client: cc,} = await dbConnect()
    client = cc

    const ProductCollection  = db.collection("products")
    const ProductDescriptionCollection = db.collection("product_descriptions")
    
    
    
    fileUploadHandler(req, "src/static/upload", "image", async (err, ctx)=>{
      if(err){
        throw new Error(err.message)
      }
	  
	  
	  let uploadedImages: string[] = []

      if(ctx?.files?.image){
        for (let i = 0; i < ctx.files.image.length; i++) {
          const link = ctx.files.image[i];
          uploadedImages.push(link.path)
        }
      }
      

      let { images, removePhoto, cover_photo, details, highlight,  seller_rules, description, attributes, ...other } = ctx.fields
  
      let updatedProduct : ProductType = {
        title: other.title,
        price: Number(other.price),
        qty: Number(other.qty),
        sold: Number(other.sold),
        views: Number(other.views),
        discount: Number(other.discount),
        cover_photo: "",
        category_id: new ObjectId(other.category_id),
        brand_id: new ObjectId(other.brand_id),
        updated_at: new Date(),
        seller_id: new ObjectId(other.seller_id),
        images: []
      }
      if(attributes){
        updatedProduct.attributes = JSON.parse(attributes)
      }
   
      if(images && typeof images === "string"){
        uploadedImages.push(...JSON.parse(images))
      }
      
      if(cover_photo) {
        // if not cover photo an blob image name.......
        if (cover_photo.indexOf("/") !== -1) {
          updatedProduct.cover_photo = cover_photo
        } else {
          // if cover photo an blob image name. now search upload photo with blob name and make it as a cover photo
          uploadedImages.forEach(i => {
            if (i.indexOf(cover_photo) !== -1) {
              updatedProduct.cover_photo = i
            }
          })
        }
      } else {
        updatedProduct.cover_photo = uploadedImages[0]
      }

      updatedProduct.images = uploadedImages
      let doc = await ProductCollection.findOneAndUpdate({
        _id: new ObjectId(id)
      }, {
        $set: updatedProduct
      })
      
      let updated: ProductDescriptionType = {
        description: description,
        updated_at: new Date()
      }

      if(highlight && typeof highlight === "string" && highlight !== "{}"){
        updated.highlight =  JSON.parse(highlight)
      }
      if(seller_rules && typeof seller_rules === "string" && seller_rules !== "{}"){
        updated.seller_rules = JSON.parse(seller_rules)
      }
     
      if(details && typeof details === "string"){
        updated.details = JSON.parse(details)
      }


      let doc2: any = await ProductDescriptionCollection.updateOne(
        { product_id: new ObjectId(id) },
        { $set: updated }
      )

      if(doc2.modifiedCount === 0){
        let {_id, ...otherUpdated} = updated
        doc2 = await ProductDescriptionCollection.insertOne({
          ...otherUpdated,
          updated_at: new Date(),
          created_at: new Date(),
          product_id: new ObjectId(id)
        })
      }

      res.send(doc)
     
      client?.close()

    })


  }catch (ex){
    console.log(ex)
    next(ex)
  } finally {
    // client?.close()
  }
}



// add new product
export const saveProducts = async (req, res, next)=>{

  let client;
  
  try{
    fileUploadHandler(req, "src/static/upload", "image", async (err, ctx)=> {
      
      if (err) {
        console.log(err.message)
        throw new Error(err.message)
      }
  
      let {
        title,
        price,
        discount,
        brand_id,
        category_id,
        seller_id,
        qty,
        sold,
        views,
        attributes,
        cover_photo,
        images,
        removePhoto
      } = ctx.fields
      
      try {
  
        let validate = new Validator({
          title: {type: "text", required: true},
          price: {type: "number", required: true},
          discount: {type: "number", required: true},
          brand_id: {type: "text", required: true},
          category_id: {type: "text", required: true},
          seller_id: {type: "text", required: true},
          updated_at: {type: "text", required: true},
          created_at: {type: "text", required: true},
          qty: {type: "number", required: true},
          sold: {type: "number", required: true},
          views: {type: "number", required: true},
          attributes: {type: "object", required: true},
          cover_photo: {type: "text", required: true, errorMessage: "not allowed"},
          image: {type: "text", required: true}
        }, {abortEarly: true})
  
        let errors = validate.validate({
          title,
          price,
          discount,
          brand_id,
          category_id,
          seller_id,
          qty,
          sold,
          views,
          attributes: attributes !== "" ? JSON.parse(attributes) : {}
        })
  
        // if(errors){
        //   res.status(409).json({message: errors})
        //   return
        // }
  
        let newProduct: any = {
          title,
          price: Number(price),
          discount: Number(discount),
          brand_id: new ObjectId(brand_id),
          category_id: new ObjectId(category_id),
          seller_id: new ObjectId("6165b0ecd28d389c0a4dbc57"),
          updated_at: new Date(),
          created_at: new Date(),
          qty: Number(qty),
          sold: Number(sold),
          views: Number(views),
          attributes: JSON.parse(attributes)
        }
  
        let uploadedImages: string[] = []
  
        if (ctx.files.image) {
          ctx.files.image.forEach(link => {
            uploadedImages.push(link.path)
          })
        }
  
        if (images && typeof images === "string") {
          uploadedImages.push(...JSON.parse(images))
        }
  
  
        newProduct.images = uploadedImages
        if (cover_photo) {
          if (cover_photo.indexOf("/") !== -1) {
            newProduct.cover_photo = cover_photo
          } else {
            newProduct.images.forEach(i => {
              if (i.indexOf(cover_photo)) {
                newProduct.cover_photo = i
              }
            })
          }
        } else {
          newProduct.cover_photo = uploadedImages[0]
        }
  
        let r = await Product.insertInto(newProduct)
        let product_id = r.insertedId
  
  
        const {
          description,
          seller_rules,
          highlight,
          details
        } = ctx.fields
  
        let productDescriptionValidator = new Validator({
          description: {type: "text", required: true},
          seller_rules: {type: "object", required: true},
          highlight: {type: "object", required: false},
          details: {type: "object", required: false},
          product_id: {type: "object", required: false}
        })
  
        let e = productDescriptionValidator.validate({
          description,
          seller_rules: JSON.parse(seller_rules),
          highlight: JSON.parse(highlight),
          details: JSON.parse(details),
          product_id: product_id
        })
        if (e) {
          return res.send("product adding fail")
        }
  
        let des = await ProductDescription.insertInto({
          description,
          seller_rules: JSON.parse(seller_rules),
          highlight: JSON.parse(highlight),
          details: JSON.parse(details),
          product_id: product_id
        })
  
        res.status(200).json({message: "Product Successfully Added"})
  
      } catch (ex){
        await client?.close()
        
        res.json({ message: ex.message + ' not save product' })
      } finally {
        await client?.close()
      }
    })
    
    
    // const {  db, client: cc} = await dbConnect()
    // client = cc
    //
    // const ProductCollection  = db.collection("products")
    // const ProductDescriptionCollection = db.collection("product_descriptions")
    //
    //
    //
    // let imagesLink = []
    // let cover_photo = ""
    //
    // fileUploadHandler(req, "upload", "image", async (err, ctx)=>{
    //   if(err){
    //     throw new Error(r)
    //   }
    //
    //
    //   if(ctx?.files?.image){
    //     for (let i = 0; i < ctx.files.image.length; i++) {
    //       const link = ctx.files.image[i];
    //       imagesLink.push(link.path)
    //       if(ctx?.fields?.cover_photo){
    //         let match = link.path.lastIndexOf(ctx.fields.cover_photo)
    //         if(match !== -1){
    //           cover_photo = link.path
    //         }
    //       }
    //     }
    //   }
    //
    //
    //   const { _id, details, highlight, description, attributes, ...other } = ctx.fields
    //
    //   // console.log(other);
    //   // console.log(details, highlight, description);
    //
    //   let newProduct = {}
    //   newProduct.title = other.title
    //   newProduct.price = Number(other.price)
    //   newProduct.qty = Number(other.qty)
    //   newProduct.sold = Number(other.sold)
    //   newProduct.views = Number(other.views)
    //   newProduct.discount = Number(other.discount)
    //   newProduct.images = imagesLink
    //   newProduct.cover_photo = cover_photo
    //   if(attributes && JSON.parse(attributes)){
    //     newProduct.attributes = JSON.parse(attributes)
    //   }
    //
    //   newProduct.category_id =  new ObjectId(other.category_id)
    //   newProduct.brand_id =  new ObjectId(other.brand_id)
    //   newProduct.created_at = new Date()
    //   newProduct.updated_at = new Date()
    //
    //
    //   let resposnse = await ProductCollection.insertOne(newProduct)
    //   if(resposnse.acknowledged){
    //     let respons = await ProductDescriptionCollection.insertOne({
    //       details: JSON.parse(details),
    //       highlight: JSON.parse(highlight),
    //       description: description,
    //       product_id: resposnse.insertedId
    //     })
    //
    //     if(respons.acknowledged){
    //       // let product = {...respons.ops[0] }
    //       console.log(respons);
    //     }
    //   }


      // if(response.insertedCount > 0){
        
      //   let product = {...response.ops[0] }
        
      //   let brandData = await BrandCollection.findOne(
      //     {_id: new ObjectId(product.brand_id)})
        
      //   let categoryData = await CategoryCollection.findOne(
      //     {_id: new ObjectId(product.category_id)})
      
      //   product = {
      //     ...product,
      //     brand: {name: brandData.name },
      //     category: { name: categoryData.name  }
      //   }
      
      
        
      //   res.json({ product: product })
      // }
      
      
      // if(insertedCount > 0){
      //   let cta = await CategoryCollection.findOne(
      //     {_id: new ObjectId(cursor.ops[0].category_id)},
      //     {name: 1}
      //   )
      //   res.json({ products: cursor.ops }) 
      // } else{
      //   res.json({ message: 'not save product' }) 
      // }

      
    // })

  } catch(ex){
    console.log(ex.message)
    next(ex)
  } finally {
    // client?.close()
  }
}



// make duplicate product
export const saveProductsAsDuplicate = async (req, res, next)=>{

  let client;
  
  try{
    fileUploadHandler(req, "src/static/upload", "image", async (err, ctx)=> {
      
      if (err) {
        console.log(err.message)
        throw new Error(err.message)
      }
  
      let {
        title,
        price,
        discount,
        brand_id,
        category_id,
        seller_id,
        qty,
        sold,
        views,
        attributes,
        cover_photo,
        images,
        removePhoto
      } = ctx.fields
      
      try {
  
        let validate = new Validator({
          title: {type: "text", required: true},
          price: {type: "number", required: true},
          discount: {type: "number", required: true},
          brand_id: {type: "text", required: true},
          category_id: {type: "text", required: true},
          seller_id: {type: "text", required: true},
          updated_at: {type: "text", required: true},
          created_at: {type: "text", required: true},
          qty: {type: "number", required: true},
          sold: {type: "number", required: true},
          views: {type: "number", required: true},
          attributes: {type: "object", required: true},
          cover_photo: {type: "text", required: true, errorMessage: "not allowed"},
          image: {type: "text", required: true}
        }, {abortEarly: true})
        
        let errors = validate.validate({
          title,
          price,
          discount,
          brand_id,
          category_id,
          seller_id,
          qty,
          sold,
          views,
          attributes: attributes && attributes !== "" ? JSON.parse(attributes) : {}
        })
    
  
        // if(errors){
        //   res.status(409).json({message: errors})
        //   return
        // }
  
        let newProduct: any = {
          title,
          price: Number(price),
          discount: Number(discount),
          brand_id: new ObjectId(brand_id),
          category_id: new ObjectId(category_id),
          seller_id: new ObjectId("6165b0ecd28d389c0a4dbc57"),
          updated_at: new Date(),
          created_at: new Date(),
          qty: Number(qty),
          sold: Number(sold),
          views: Number(views),
          attributes: attributes && attributes !== "" ? JSON.parse(attributes) : {}
        }
  
        let uploadedImages: string[] = []
  
        if (ctx.files.image) {
          ctx.files.image.forEach(link => {
            uploadedImages.push(link.path)
          })
        }
  
        if (images && typeof images === "string") {
          uploadedImages.push(...JSON.parse(images))
        }
  
  
        newProduct.images = uploadedImages
        if (cover_photo) {
          if (cover_photo.indexOf("/") !== -1) {
            newProduct.cover_photo = cover_photo
          } else {
            newProduct.images.forEach(i => {
              if (i.indexOf(cover_photo)) {
                newProduct.cover_photo = i
              }
            })
          }
        } else {
          newProduct.cover_photo = uploadedImages[0]
        }
  
        let r = await Product.insertInto(newProduct)
        let product_id = r.insertedId
  
  
        const {
          description,
          seller_rules,
          highlight,
          details
        } = ctx.fields
  
        let productDescriptionValidator = new Validator({
          description: {type: "text", required: true},
          seller_rules: {type: "object", required: true},
          highlight: {type: "object", required: false},
          details: {type: "object", required: false},
          product_id: {type: "object", required: false}
        })
  
        let e = productDescriptionValidator.validate({
          description,
          seller_rules: JSON.parse(seller_rules),
          highlight: JSON.parse(highlight),
          details: JSON.parse(details),
          product_id: product_id
        })
        if (e) {
          return res.send("product adding fail")
        }
  
        let des = await ProductDescription.insertInto({
          description,
          seller_rules: JSON.parse(seller_rules),
          highlight: JSON.parse(highlight),
          details: JSON.parse(details),
          product_id: product_id
        })
  
        res.status(200).json({message: "Product Successfully Added"})
  
      } catch (ex){
        await client?.close()
        console.log(ex)
        res.json({ message: ex.message + ' not save product' })
      } finally {
        await client?.close()
      }
    })
    
    
    // const {  db, client: cc} = await dbConnect()
    // client = cc
    //
    // const ProductCollection  = db.collection("products")
    // const ProductDescriptionCollection = db.collection("product_descriptions")
    //
    //
    //
    // let imagesLink = []
    // let cover_photo = ""
    //
    // fileUploadHandler(req, "upload", "image", async (err, ctx)=>{
    //   if(err){
    //     throw new Error(r)
    //   }
    //
    //
    //   if(ctx?.files?.image){
    //     for (let i = 0; i < ctx.files.image.length; i++) {
    //       const link = ctx.files.image[i];
    //       imagesLink.push(link.path)
    //       if(ctx?.fields?.cover_photo){
    //         let match = link.path.lastIndexOf(ctx.fields.cover_photo)
    //         if(match !== -1){
    //           cover_photo = link.path
    //         }
    //       }
    //     }
    //   }
    //
    //
    //   const { _id, details, highlight, description, attributes, ...other } = ctx.fields
    //
    //   // console.log(other);
    //   // console.log(details, highlight, description);
    //
    //   let newProduct = {}
    //   newProduct.title = other.title
    //   newProduct.price = Number(other.price)
    //   newProduct.qty = Number(other.qty)
    //   newProduct.sold = Number(other.sold)
    //   newProduct.views = Number(other.views)
    //   newProduct.discount = Number(other.discount)
    //   newProduct.images = imagesLink
    //   newProduct.cover_photo = cover_photo
    //   if(attributes && JSON.parse(attributes)){
    //     newProduct.attributes = JSON.parse(attributes)
    //   }
    //
    //   newProduct.category_id =  new ObjectId(other.category_id)
    //   newProduct.brand_id =  new ObjectId(other.brand_id)
    //   newProduct.created_at = new Date()
    //   newProduct.updated_at = new Date()
    //
    //
    //   let resposnse = await ProductCollection.insertOne(newProduct)
    //   if(resposnse.acknowledged){
    //     let respons = await ProductDescriptionCollection.insertOne({
    //       details: JSON.parse(details),
    //       highlight: JSON.parse(highlight),
    //       description: description,
    //       product_id: resposnse.insertedId
    //     })
    //
    //     if(respons.acknowledged){
    //       // let product = {...respons.ops[0] }
    //       console.log(respons);
    //     }
    //   }


      // if(response.insertedCount > 0){
      
      //   let product = {...response.ops[0] }
      
      //   let brandData = await BrandCollection.findOne(
      //     {_id: new ObjectId(product.brand_id)})
      
      //   let categoryData = await CategoryCollection.findOne(
      //     {_id: new ObjectId(product.category_id)})
      
      //   product = {
      //     ...product,
      //     brand: {name: brandData.name },
      //     category: { name: categoryData.name  }
      //   }
      
      
      
      //   res.json({ product: product })
      // }
      
      
      // if(insertedCount > 0){
      //   let cta = await CategoryCollection.findOne(
      //     {_id: new ObjectId(cursor.ops[0].category_id)},
      //     {name: 1}
      //   )
      //   res.json({ products: cursor.ops })
      // } else{
      //   res.json({ message: 'not save product' })
      // }

      
    // })

  } catch(ex){
    console.log(ex.message)
    next(ex)
  } finally {
    // client?.close()
  }
}


export const fetchCategoryProducts = async (req, res, next)=>{
 
  const { categoryId } = req.params   
  const fetchEachSectionItems = 10;

  let client;

    try{
        const {db, client: cc} = await dbConnect()
      client = cc
      const CategoryCollection = db.collection("categories")
      const ProductCollection =  db.collection("products")
      
      // find category that cliked in frontend.  and see it last level category, or not.
      // last level category must have property filters array required 
      let findCategory = await CategoryCollection.findOne({_id: new ObjectId(categoryId)})
      
      // when this category under more categor.... 
      if(!findCategory.filters){ 
  
        // get child categories....
        let categoryCursor = CategoryCollection.find({ parent_id: new ObjectId(categoryId)  })
        
        let childCategoriesObj = {}  // { "32423432" : "Motherboard", "4234324": "Ram"}  
        // /
        // let cat = {} 
      function r(){
          return new Promise(async(re, s)=>{
            let cat = {}
              await categoryCursor.forEach( (item)=>{
                (async function(){
                  // now find Products where category id === each childCategory
                  let productsCursors = ProductCollection.find({ category_id: new ObjectId(item._id)}).limit(2)
  
  
                  await productsCursors.forEach( (p)=>{
                    if(cat[item.name]){
                      cat[item.name].push(p)
      
                    } else{
                      cat[item.name] = [p]
                    }
                  })
                  re(cat)
                }())
              })
        })
          
       }
        
        r().then(y=>{
         // console.log(y)
          if(Object.keys(y).length > 0 ){
            
            // this return only frist loop of category
           res.json({categoryProduct: y})
          }
          
        })
          
          // childCategoriesObj[item._id] = item.name
          // productFilterArray.push(item._id)
      
        // console.log(cat)
        // res.send(cat)
        
        // now find Products where category id === each childCategory 
        // let productsCursors = ProductCollection.find({ category_id: { $in: [...productFilterArray]}})
        // let productsWithChildCategory = []  // all product that category_id === each childCategory
        // await productsCursors.forEach(p=>{
        //   productsWithChildCategory.push(p)
        // })
       
      // console.log(childCategories)
       
       // make category key and products array like  {"Motherboard": [{product}]} 
      // let o = {} 
       
      // productsWithChildCategory.forEach(prod=>{
      //   for(let catId in childCategoriesObj){ 
        
      //       if(catId == prod.category_id ){
      //       if(o[childCategoriesObj[catId]]){
      //         o[childCategoriesObj[catId]].push(prod)
      //       } else{
      //         o[childCategoriesObj[catId]] = [prod] 
      //       }
      //     } 
      //   }
      // })
       
      // res.send({ categoryProduct: o })
        
      } else {
        const cursor = ProductCollection.find({ category_id: new ObjectId(categoryId) })
        let pp = []
        await cursor.forEach(p=>{
          pp.push(p)
        }) 
        return res.json({ products: pp })
      }
    } catch(ex){
      console.error(ex)
      next(ex)
    } finally{
     client?.close()
    }
}


// product filter for client Frontend Home Page
export const productFilterHomePage = async (req, res, next)=>{
  
  const { pageNumber=1, perPage=10, type } = req.query 

  let client;

  try {
    const {c:ProductCollection, client: cc} = await dbConnect("products")
    client = cc
    // console.log(type)
    let cursor;
   
      if(type === "most-popular"){
        // sort by views and pick 5 to 10 frist item from database 
        cursor = ProductCollection.aggregate([
          { $sort: {  views : -1 } },
          { $skip: perPage * (pageNumber - 1) }, 
          { $limit: Number(perPage) } 
      ])
      
    } else if(type === "most-updated") {
      cursor = ProductCollection.aggregate([
        { $sort: { created_at : -1 } },
        { $skip: perPage * (pageNumber - 1) }, 
        { $limit: Number(perPage) } 
      ])  
      
    } else if(type === "top-selling") {  
      cursor = ProductCollection.aggregate([
        { $sort: { sold: -1 } },
        { $skip: perPage * (pageNumber - 1) }, 
        { $limit: Number(perPage) } 
      ])
    
    } else if(type === "top-views") {
      cursor = ProductCollection.aggregate([
        { $sort: { views : -1 } },
        { $skip: perPage * (pageNumber - 1) }, 
        { $limit: Number(perPage) } 
      ])
      
    } else if (type === "top-views-length"){
      cursor = ProductCollection.aggregate([ 
        { $sort: { views: -1 }}, // sort deasce order,
        { $limit: 100 },  // choose 1 to 100 item 
        {                 /// count document
          $group : {
             _id : null,
             count: { $sum: 1 }
          }
        }
      ]) 
      
      let ppp = [] 
      await cursor.forEach(p=>{
        ppp.push(p)
      }) 
      return res.send(ppp[0])
      
    } else if (type === "top-selling-length"){
      cursor = ProductCollection.aggregate([ 
        { $sort: { sold: -1 }}, // sort deasce order,
        { $limit: 100 },      // choose 1 to 100 item 
        {                     /// count document
          $group : {
             _id : null,
             count: { $sum: 1 }
          }
        }
      ]) 
      
      let ppp = [] 
      await cursor.forEach(p=>{
        ppp.push(p)
      }) 
      return res.send(ppp[0])
    
    }
    
    let pp = [] 
    await cursor.forEach(p=>{
      pp.push(p)
    })

    res.json({products: pp})
      
  } catch(ex){
    console.log(ex)
    next(ex)
  } finally{
    client?.close()
  }
}


export const productFiltersPost = async (req, res, next)=>{
  
  const { pageNumber, perPage, type, ids } = req.body 

  let client;

  try {

    const {db, client: cc} = await dbConnect()
    client = cc

    const ProductCollection = db.collection("products")
    const CategoryCollection = db.collection("categories")


    if (type === "category") {
      let categoryIds = []
      ids && ids.forEach(id => {
        categoryIds.push(new ObjectId(id))
      })

      const c = ProductCollection.find({
        category_id: {$in: categoryIds}

      })
      let pp = []
      await c.forEach(p => {
        pp.push(p)
      })
      res.send(pp)
    }
  }catch (ex){
    next(ex)
  } finally{
    client?.close()
  }
}


async function findEntryLevel_Cat(category_id) {
  let client;
  try {
    const {c: CategoryCollection, client: cc} = await dbConnect("categories")
    client = cc
   
    let cursor = await CategoryCollection.aggregate([
      {
        $match: {_id: new ObjectId(category_id)}
      },
      {
        $lookup: {
          from: "categories",
          let: {categoryId: "$_id"},  // it first query doc _id ..
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {$eq: ["$parent_id", "$$categoryId"]} // $parent_id from sub_category
                  ]
                }
              }
            },
            {
              $lookup: {
                from: "categories",
                let: {subCatId: "$_id"},
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          {$eq: ["$parent_id", "$$subCatId"]}
                        ]
                      }
                    }
                  },
                  {
                    $lookup: {
                      from: "categories",
                      let: {subSubCatId: "$_id"},
                      pipeline: [
                        {
                          $match: {
                            $expr: {
                              $and: [
                                {$eq: ["$parent_id", "$$subSubCatId"]}
                              ]
                            }
                          }
                        }
                      ],
                      as: "sub_cat"
                    }
                  }
                ],
                as: "sub_cat"
              }
            }
          ],
          as: "sub_cat"
        }
      },
      {   // reduce unnecessary field
        $project: {
          _id: 1,
          is_product_level: 1,
          sub_cat: {
            _id: 1,
            is_product_level: 1,
            sub_cat: {
              _id: 1,
              is_product_level: 1,
              sub_cat: {
                _id: 1,
                is_product_level: 1
              }
            }
          },
        }
      }
    ])
    
    let c = []
    await  cursor.forEach(cat => {
      c.push(cat)
    })
    
    client?.close()
    return c
    
  } catch (ex) {
    console.log("-------", ex.message)
    
  } finally {
    client?.close()
  }
}

function mapCategoryProductLevel(categoryList){
  let categories = []
  categoryList
  && categoryList.length > 0
  && categoryList.map(c=>{
      if(c.is_product_level){
        categories.push(c._id)
      }
      if(c.sub_cat && c.sub_cat.length > 0) {
        c.sub_cat.map(cc => {
          if(cc.is_product_level){
            categories.push(cc._id)
          }
          if(cc.sub_cat && cc.sub_cat.length > 0) {
            cc.sub_cat.map(ccc => {
              if(ccc.is_product_level){
                categories.push(ccc._id)
              }
              if(ccc.sub_cat && ccc.sub_cat.length > 0){
                ccc.sub_cat.map(cccc => {
                  if(cccc.is_product_level){
                    categories.push(cccc._id)
                  }
                })
              }
            })
          }
        })
      }
    })
  
  return categories
}


const getNestedCategoryIds = async (req, res)=>{
  let client;
  // any of category id
  const { category_id, category_ids } = req.body
  
  try {
    // const {c: CategoryCollection, client: cc} = dbConnect("categories")
    // client = cc
    
    let allCategory = []

    let categoryIds = []

    
    if(category_id) {
      let c = await findEntryLevel_Cat(category_id)
      allCategory.push(...c)
      
    } else if(category_ids){
      for (let item of category_ids) {
        let c = await findEntryLevel_Cat(item)
        if(c) {
          allCategory.push(...c)
        }
      }
    }
  
    categoryIds = mapCategoryProductLevel(allCategory)
    
    client?.close()
    return categoryIds
    
  } catch (ex){
    console.log("message", ex.message)
    return null
  } finally {
    client?.close()
  }
}


export const productFiltersGetV2 = async (req, res, next)=>{
  let client;

  try{

    const { c: ProductCollection, client: cc } = await dbConnect("products")

    let query = req.query
    let { pagePage, perPage, ...other } = query

    let cursor;

    if(other.sold){
      cursor = ProductCollection.aggregate([
        { $sort: { sold: Number(other.sold) } },
        { $limit: 20 }
      ])
    } else if(other.discount){
      cursor = ProductCollection.aggregate([
        { $sort: { discount: Number(other.discount) } },
        { $limit: 20 }
      ])
    } else if(other.views){
      cursor = ProductCollection.aggregate([
        { $sort: { views: Number(other.views) } },
        { $limit: 20 }
      ])
    } else if(other.updated_at){
      cursor = ProductCollection.aggregate([
        { $sort: { updated_at: Number(other.updated_at) } },
        { $limit: 20 }
      ])
    }
    let p = []
    await cursor.forEach(c=>{
      p.push(c)
    })


    res.send(p)



  } catch(ex){
    console.log(ex)
    res.send([])
  } finally{
    client?.close()
  }

}


export const productFiltersPostV2 = async (req, res, next)=>{

  //   {
  //       "product_ids": ["60df5e546419f56b97610633"]
  //       "category_ids": ["60df5e546419f56b97610608"],
  //       "category_id": "60df5e546419f56b97610608",
  // 	     "sort_by": [{"field": "created_at", "order": 1}],
  //       "attributes": {
  //         "form_factor": ["mini_itx", "df"],
  // 	       "generation": [1]
  //       }
  // }

  const {
    sort_by,
    category_ids,
    product_ids,
    category_id,
    brand_ids,
    attributes,
    pageNumber=1,
    perPage=10,
    count
  } = req.body

  let client;

  console.log(req.body)

  try{

    const { db, client: cc } = await dbConnect() 
    client = cc    


    const ProductCollection = db.collection("products")
    const CategoryCollection = db.collection("categories")

    let pipe = []
    let categoryIds = []
    let categoryId : ObjectId;
    let brandIds = []
    let productIds = []
    // let idealForIds = []

    if(category_id){
      categoryId = new ObjectId(category_id)
    }

    if(category_ids && category_ids.length > 0){
      category_ids.forEach(id=>{
        categoryIds.push(new ObjectId(id))
      })
    }
    if(brand_ids && brand_ids.length > 0){
      brand_ids.forEach(id=>{
        brandIds.push(new ObjectId(id))
      })
    }
    if(product_ids && product_ids){
      product_ids.forEach(id=>{
        productIds.push(new ObjectId(id))
      })
    }


    let attributesValues = {}
    if(attributes && Object.keys(attributes).length > 0 ){
       for(let attr in attributes){

        if(attributes[attr] && attributes[attr].length > 0){
          attributesValues[`attributes.${attr}`] = { $in: attributes[attr] }
        }

       }
    }
        
    // console.log(req.body)
    // { $match: { "attributes.form_factor": { $in: ["mini_itx"]  }} }
    // categoryIds && categoryIds.length > 0 ? category_id: { $in: [...categoryIds] } } : [{}]

    pipe = [
      ...pipe,
      {$match: productIds.length > 0 ? { _id: { $in: productIds } } : {}},
      // {$match: categoryId ? { category_id: categoryId} : {}},
      { $match : {
          $and: [
            categoryIds && categoryIds.length > 0 ? {
              category_id: { $in: [...categoryIds] }
            } : {},
            brandIds && brandIds.length > 0 ? {
              brand_id: { $in: [...brandIds] }
            } : {}
          ],
          $or: [
            Object.keys(attributesValues).length > 0 ? {
              ...attributesValues,
            } : {}
          ]
        }
      }

    ]

    if(count){
      pipe = [
        ...pipe,
        { $group: {
          _id: null, total: { $sum: 1 } }
        }
      ]
    }

    let sortingStage = { $sort: {} }
    let sortBy = {}
    if(sort_by && sort_by.length > 0){
      sort_by.map(sort=>{
        sortingStage["$sort"][sort.field] = sort.order
      })
      pipe = [
        ...pipe,
        {...sortingStage},
      ]
    }

    // {                                                                                           attributes: {
    //   generation: [ 9, 1 ],                                                                     processor_type: [ 'intel' ],
    //   form_factor: [ 'mini_itx' ]                                                             },
    // category_ids: [ '60df5e546419f56b97610608' ]                                            }

    // [
    //     {
    //       $match: {
    //         $or: [
    //             {"attributes.generation": {$in: [ 9, 1 ]} } ,
    //             {"attributes.form_factor": {$in: [ 'mini_itx' ]}},
    //           ],
    //         "category_id": {$in: [ new ObjectId("60df5e546419f56b97610608") ]}
    //       }
    //     }
    //   ]

    //let cursor = ProductCollection.aggregate(pipe)
  
  
    let categories = await getNestedCategoryIds(req, res)
    let cursor = ProductCollection.aggregate([
      ...pipe,
      {
        $match: {
          category_id: { $in: categories} // category id
        }
      },
      { $skip: perPage * (pageNumber - 1) },
      { $limit: Number(perPage) },
    ])


    let products = []

    await cursor.forEach(p=>{
      products.push(p)
    })

    console.log(categories, "Fetch with these category")

    setTimeout(()=>{
      res.send(products)
    }, 1000)


    
    // let cursor;
    // if(category_id){
    //   cursor = ProductCollection.aggregate([
    //     ...pipe,
    //     {
    //       $match: {
    //         category_id: { $in: [...categories]} // category id
    //       }
    //     },
    //     { $skip: perPage * (pageNumber - 1) },
    //     { $limit: Number(perPage) },
    //   ])
    // }
    //
    // let products = []
    //
    // if(cursor){
    //   await cursor.forEach(p=>{
    //     products.push(p)
    //   })
    //   res.send(products)
    // } else {
    //   console.log("hiiiiiiii");
    // }
    //

    // getNestedCategoryIds(req, res, async (categories)=>{
            

    //   if(categories.length > 0) {
    //     pipe = [
    //       ...pipe,
    //       {
    //         $match: {
    //           category_id: { $in: categories } // here we got array of entry level category ids
    //         }
    //       }
    //     ]
    //   }

    //   let cursor = ProductCollection.aggregate([
    //     ...pipe,
    //     { $skip: perPage * (pageNumber - 1) },
    //     { $limit: Number(perPage) },
    //   ])

    //   // cursor = await ProductCollection.aggregate([
    //   //   { $match: { category_id: { $in: categories } }}
    //   // ])

    //   let products = []

    //   await cursor.forEach(p=>{
    //     products.push(p)
    //   })

    //   res.send(products)
      
      
    // })
    
    


    // ***************** if it not last level category (END) ******************

    

  } catch(ex){
    next(ex)
  } finally{
    client?.close()
  }
}



export const productFilters = async (req, res, next)=>{
  

  const { type, id, pageNumber=1, perPage=10 } = req.query 

  let client;
  
  
  try {
    const { db, client: cc } = await dbConnect() 
    client = cc
    
    const ProductCollection = db.collection("products")
    const CategoryCollection = db.collection("categories")

    if(type === "category"){ 
      
      // const products = ProductCollection.aggregate([
      //   { $match: {} },
      //   { $lookup: {
      //     from: "categories",
      //     localField: "category_id",
      //     foreignField: "_id",
      //     as: "category"
      //   }},
      //   { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
      //   { $lookup: {
      //     from: "categories",
      //     localField: "category.parent_id",
      //     foreignField: "_id",
      //     as: "category.category"
      //   }},
      //   { $unwind: { path: "$category.category", preserveNullAndEmptyArrays: true } },
      //   { $lookup: {
      //     from: "categories",
      //     localField: "category.category.parent_id",
      //     foreignField: "_id",
      //     as: "category.category.category"
      //   }},
      //   { $unwind: { path: "$category.category.category", preserveNullAndEmptyArrays: true } },
        
      //   { $lookup: {
      //     from: "categories",
      //     localField: "category.category.category.parent_id",
      //     foreignField: "_id",
      //     as: "category.category.category.category"
      //   }},
      //   { $unwind: { path: "$category.category.category.category", preserveNullAndEmptyArrays: true } },
      //   { $match: { 'category.category.category.category._id': new ObjectId(id) } },
      //   {$limit: 20},
      //   {$sort: {views: 1}},
      //   { $project: {
      //       category: 0
      //     } 
      //   } 
      // ])  
      
      // sort by views and pick 5 to 10 frist item from database 
        
      // let category = await CategoryCollection.findOne({_id: new ObjectId(id)})
      // if(!category.parent_id){
      //   let c = CategoryCollection.find({parent_id: new ObjectId(id)})
      //   await c.forEach(p=>{
      //     console.log(p)
      //   })
      // }
      
      if(!isObjectId(id)){
        return res.send('please provide object id')
      }
      const category  = await CategoryCollection.findOne({_id: new ObjectId(id)})
      
      
      if(category.is_product_level){
        const products = ProductCollection.aggregate([
            { $match: {category_id: new ObjectId(id) } },
            { $sort: {  views : -1 } },
            { $skip: perPage * (pageNumber - 1) }, 
            { $limit: Number(perPage) }
        ])  
        let pp = []
        await products.forEach(p=>{
          pp.push(p)
        })
        return res.json({products: pp, is_product_level: true})
      } else {
        return res.json({products: [], is_product_level: false})
        
        
      }
    } 
  
    res.send("not type")
  } catch(ex){
    next(ex)
  } finally{
   client?.close()
  }
}


export const deleteProduct = async(req, res, next)=>{
  
  const { id } = req.params 
  let client;
  try {
    let { db, client: cc } =  await dbConnect()
    client = cc
    
    let ProductCollection = db.collection("products")
    let ProductDescriptionCollection = db.collection("product_descriptions")
    
    let doc = await  ProductCollection.deleteOne({_id: new ObjectId(id)})
    if(doc.deletedCount >= 1){
      await ProductDescriptionCollection.deleteOne({product_id: new ObjectId(id)})
      res.status(201).send("product deleted")
    } else{
      res.status(422).send("product not deleted")
    }
    
  } catch(ex){
    next(ex)
  } finally{
    client?.close()
  }
    
}


export const toggleWishList = async(req, res, next)=>{
  const { id } = req.params 
  let client;
  const {productId} = req.body
  try{
      const {db, client: cc} = await dbConnect()   
    client = cc
    const UsersCollection = db.collection("users")
    const ProductCollection =  db.collection("products")
    
    if(req.user_id){
      
      let user: any = await UsersCollection.findOne({_id: new ObjectId(req.user_id)})
      let exist= false
      await user.wishlist.forEach(w=>{
        exist = w === productId
      })
     // console.log(exist)
      let u: any = {result: {nModified: 0}}
      if(!exist){
        u = await UsersCollection.updateOne(
          {_id: new ObjectId(req.user_id)},
          {$push: { wishlist: new ObjectId(productId)}}
        )
      } else {
        u = await UsersCollection.updateOne(
          {_id: new ObjectId(req.user_id)},
          {$pull: {wishlist: new ObjectId(productId)}}
        )
      }
      
      if(u.result.nModified > 0){
          
      }
      
       
      res.send(u)
    } else{
      res.status(403).send("Please login first")
      // send unauthorize response
    }
  } catch(ex){
    next(ex)
  } finally{
    client?.close()
  }
    
}


export const uploadHandler = async(req, res, next)=>{

  try{

    fileUploadHandler(req, "upload", "image", (err, r)=>{
      
      if(err){
        throw new Error(err)
      }

      let imagesLink = [] 
      let cover_photo = ""

      if(r?.files?.image){
        for (let i = 0; i < r.files.image.length; i++) {
          const link = r.files.image[i];
          imagesLink.push(link.path) 
          if(r?.fields?.cover_photo){
            let match = link.path.lastIndexOf(r.fields.cover_photo)   
            if(match !== -1){
              cover_photo = link.path
            }
          }
        }
      }
      
      console.log(r);

    })

  } catch(ex){
    console.log(ex);
  }
}