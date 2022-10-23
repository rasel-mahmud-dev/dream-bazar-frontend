import {ObjectId} from "mongodb";
import { successResponse } from "../response";
import Product from "../models/Product";
import User from "../models/User";


export const getSeller = async (req, res, next)=>{
  const { sellerId } = req.params
  try{
    // let seller = await User.findOne({_id: new ObjectId(sellerId)})
    // successResponse(res, 200, {seller})
  } catch(ex){
    next(ex)
  }
}


export const getSellerProducts = async (req, res, next)=>{
    try{
      let products = await Product.find({sellerId: new ObjectId(req.authUser._id)})
        successResponse(res, 200, {products: products})
    } catch(ex){
      next(ex)
    }
}