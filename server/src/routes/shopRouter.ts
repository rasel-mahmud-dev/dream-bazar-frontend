import {Router} from "express";
import isAuth from "../middlewares/isAuth"
import permission from "../middlewares/permission";
import {Roles} from "../types";


import * as shopController from "../controllers/shopController"
import {getShopDetail} from "../controllers/shopController";

const router = Router()



// get shop detail for customer visit shop
router.get("/shop/detail", shopController.getShopDetail)

// only admin call see all shops
router.get("/shops", isAuth(), permission([Roles.ADMIN]), shopController.getAllShops)



// get shop brand with pagination
router.get("/shop/products/:sellerId",  shopController.getShopProducts)


// normal user can see shop detail
router.get("/shops/shopId",  shopController.getShop)


// admin and seller can create shop
router.post("/shop/create", isAuth(), permission([Roles.ADMIN, Roles.SELLER]), shopController.createShop)


// update shop  status for seller
router.patch("/shop/update-active", isAuth(), permission([Roles.SELLER, Roles.ADMIN]), shopController.updateShopStatus)


// update shop for admin and seller
router.patch("/shop/:shopId", isAuth(), permission([Roles.ADMIN]), shopController.updateShop)



// admin and seller can create shop get their shop info
router.get("/shop/info", isAuth(), permission([Roles.ADMIN, Roles.SELLER]), shopController.getShopInfo)




// update shop data by seller
router.patch("/shop", isAuth(), permission([Roles.ADMIN, Roles.SELLER]), shopController.updateShopInfo)


export default router;

