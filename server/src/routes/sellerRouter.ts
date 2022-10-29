import {Router} from "express";


import {createSeller, getSellerProducts} from "../controllers/sellerController";
import permission from "../middlewares/permission";
import {Roles} from "../types";
import isAuth from "../middlewares/isAuth";


export default function (app: Router){
  
  // app.get("/api/seller/:sellerId", getSeller)
  
  app.post("/api/seller/create", createSeller)
  
    app.get("/api/seller/products", isAuth, permission([Roles.ADMIN, Roles.SELLER]), getSellerProducts)
  
}