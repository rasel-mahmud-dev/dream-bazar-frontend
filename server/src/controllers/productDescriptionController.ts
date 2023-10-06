// import ProductDescription, {ProductDescriptionType} from "../models/ProductDescription";
//
//
// const isObjectId = require("../utilities/isObjectId")
//
// import dbConnect from "../database";
// import {ObjectId} from "mongodb";
//
// // const fileUploadHandler = require("../utilities/fileUpload")
//
//
// export const getProductDescriptions = async (req, res, next)=>{
//
//   try{
//     let docs = await ProductDescription.aggregate([
//       {
//         $lookup: {
//           from: "products",
//           localField: "product_id",
//           foreignField: "_id",
//           as: "product"
//         }
//       },
//       // { $unwind: { path: "$product" } },
//       {
//         $project: {
//           _id: 1,
//           product_id: 1,
//           product: {title: 1},
//           // product: {
//           //   title: 1
//           //   // attributes: -1,
//           //   // brand_id: -1,
//           //   // category_id: -1,
//           //   // cover_photo: -1,
//           //   // created_at: -1,
//           //   // discount: -1,
//           //   // images: -1,
//           //   // price: -1,
//           //   // qty: -1,
//           //   // seller_id: -1,
//           //   // sold: -1,
//           //   // title: 1,
//           //   // updated_at: -1,
//           //   // views: -1,
//           //   // _id: -1,
//           // }
//         }
//       }
//     ])
//     res.send(docs)
//   } catch(ex){
//     console.log(ex)
//   }
//
// }
//
// export const getProductDetail = async (req, res, next)=>{
//   const { productId } = req.params
//   let client;
//   try{
//     let doc = await ProductDescription.findOne({product_id: new ObjectId(productId)})
//     res.status(200).send(doc)
//   } catch(ex){
//
//     console.log(ex)
//     next(ex)
//
//   } finally{
//     client?.close()
//   }
// }
//
//
// export const deleteProductDescription = async (req, res, next)=>{
//   const { id } = req.params
//   try{
//    if(id) {
//      let deleted = await ProductDescription.deleteById(id)
//      if(deleted.deletedCount > 0){
//        res.status(201).send("deleted")
//      } else {
//        next({status: 301, message: "deleted Fail"})
//      }
//    } else {
//      next({status: 301, message: "deleted Fail"})
//    }
//   } catch(ex){
//     next(ex)
//   } finally{
//
//   }
//
// }
//
//
//
//
//
