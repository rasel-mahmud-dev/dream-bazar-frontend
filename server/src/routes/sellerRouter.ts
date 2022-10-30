import {Router} from "express";


import {createSeller, getSellerProducts, getSellerShop, sellerAuthLoading, sellerLogin, updateShop} from "../controllers/sellerController";
import permission from "../middlewares/permission";
import {Roles, Scope} from "../types";
import isAuth from "../middlewares/isAuth";


export default function (app: Router) {
    
    // app.get("/api/seller/:sellerId", getSeller)
    
    app.get("/api/auth/seller/current-auth", sellerAuthLoading)
    
    app.post("/api/seller/login", sellerLogin)
    app.post("/api/seller/create", createSeller)
    
    app.get("/api/seller/products", isAuth(Scope.SELLER_DASHBOARD), permission([Roles.ADMIN, Roles.SELLER]), getSellerProducts)
    
    
    app.post("/api/shop/update",isAuth(Scope.SELLER_DASHBOARD), permission([Roles.SELLER]),  updateShop)
    app.get("/api/shop", isAuth(Scope.SELLER_DASHBOARD), permission([Roles.SELLER]), getSellerShop)
}