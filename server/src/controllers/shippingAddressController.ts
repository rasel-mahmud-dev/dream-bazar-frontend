// const dbConnect = require("../database")
// const {ObjectId} = require("mongodb")
// const formidable = require('formidable');
// const path = require("path")
// const { copyFile, mkdir, rm, slats } = require('fs/promises');
// const fileUpload = require("../utilities/fileUpload")
//
// const {createToken, getToken, parseToken} = require("../jwt")
//
//
// export const getShippingAddresses = async (req, res)=>{
//
//   const { c: ShippingAddress, client} = await dbConnect("shipping_addresses")
//   const {user_id}  = req.params
//   try{
//     let cursor = ShippingAddress.find({user_id})
//     let shippingAddresses = []
//     await cursor.forEach(sa=>{
//       shippingAddresses.push(sa)
//     })
//
//     res.json({shippingAddresses})
//
//   } catch(ex){
//     console.log(ex)
//   } finally{
//     client.close()
//   }
// }
//
// export const saveShippingAddress = async (req, res)=>{
//
//   const { c: ShippingAddress, client} = await dbConnect("shipping_addresses")
//   try{
//     let result =  await ShippingAddress.insertOne(req.body)
//     if(result.insertedCount >= 1){
//       res.status(200).json({shipping_address: result.ops[0]})
//     }
//
//   } catch(ex){
//     console.log(ex)
//   } finally{
//     client.close()
//   }
// }
