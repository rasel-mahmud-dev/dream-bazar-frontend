import {ObjectId} from "mongodb";

import Order from "../models/Order";
import {successResponse} from "../response";
import {StatusCode} from "../types";
import {NextFunction, Request, Response} from "express";


export const getOrders = async (req: Request, res: Response, next: NextFunction) => {

    try {
        let orders = Order.aggregate([
            {$match: {customer_id: new ObjectId(req.authUser._id)}},
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "product"
                }
            },
            {$unwind: {path: "$product", preserveNullAndEmptyArrays: true}},
            {
                $project: {
                    orderId: 1,
                    quantity: 1,
                    totalPrice: 1,
                    status: 1,
                    paymentType: 1,
                    "product": {coverPhoto: 1, title: 1}
                }
            }
        ])

        successResponse(res, StatusCode.Ok, orders)


    } catch (ex) {
        next(ex)
    }
}

// export const getOrder = async (req, res)=>{
//   const { c: Orders, client} = await dbConnect("orders")
//   const {customer_id, order_id}  = req.params
//   try{
//     let cursor = Orders.aggregate([
//       { $match: {
//           order_id: order_id,
//           customer_id: new ObjectId(customer_id)
//         }
//       },
//       {
//         $lookup: {
//           from: "brand",
//           localField: "product_id",
//           foreignField: "_id",
//           as: "product"
//         }
//       },
//        {$unwind: { path: "$product", preserveNullAndEmptyArrays: true} },
//       {
//         $project: {
//             order_id: 1,
//             quantity: 1,
//             total_price: 1,
//             status: 1,
//             "product": {cover_photo: 1, title: 1}
//         }
//       }
//     ])
//
//     let allOrders = []
//     await cursor.forEach(o=>{
//       allOrders.push(o)
//     })
//     res.json({orders: allOrders})
//
//   } catch(ex){
//     console.log(ex)
//   } finally{
//     client?.close()
//   }
// }
//
//
// export const createOrder = async (req, res)=>{
//
//   const { c: Orders, client} = await dbConnect("orders")
//   let {customer_id, ...otherOrderData}  = req.params
//    otherOrderData.customer_id = new ObjectId(customer_id)
//   console.log(otherOrderData)
// // try{
// //     let result =  await Orders.insertOne(req.body)
// //     if(result.insertedCount >= 1){
// //       res.status(200).json({shipping_address: result.ops[0]})
// //     }
//
// //   } catch(ex){
// //     console.log(ex)
// //   } finally{
// //     client.close()
// //   }
// }
