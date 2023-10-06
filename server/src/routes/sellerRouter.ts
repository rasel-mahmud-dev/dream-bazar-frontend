import {Router} from "express";
import isAuth from "../middlewares/isAuth";
import permission from "../middlewares/permission";
import {Roles} from "../types";
import {updateProduct} from "../controllers/productController";


import {
    addToFeatureProduct,
    createSeller,
    createShop,
    deleteSellerProduct,
    getSellerProducts,
    getSellerShop, removeFeatureProduct,
    updateShop
} from "../controllers/sellerController";
// import permission from "../middlewares/permission";
// import {Roles, Scope} from "../types";
// import isAuth from "../middlewares/isAuth";


const router = Router()


// update product for any field admin can change anything
router.patch("/product/:id", isAuth(), permission([Roles.ADMIN]), updateProduct)

// router.get("/seller/:sellerId", getSeller)

// router.get("/auth/seller/current-auth", sellerAuthLoading)
//
// router.post("/seller/login", sellerLogin)

router.post("/seller/create", createSeller)

router.post("/seller/create/shop", isAuth(), permission([Roles.ADMIN, Roles.SELLER]), createShop)

router.get("/seller/products", isAuth(), permission([Roles.SELLER]), getSellerProducts)

router.delete("/seller/product/:productId", isAuth(), permission([Roles.ADMIN, Roles.SELLER]), deleteSellerProduct)

router.patch("/seller/shop/:shopId", isAuth(), permission([Roles.SELLER, Roles.ADMIN]), updateShop)

router.get("/seller/shop", isAuth(), permission([Roles.SELLER, Roles.ADMIN]), getSellerShop)


router.post("/seller/add-to-feature-product", isAuth(), permission([Roles.SELLER, Roles.ADMIN]), addToFeatureProduct)

router.post("/seller/remove-from-feature-product", isAuth(), permission([Roles.SELLER, Roles.ADMIN]), removeFeatureProduct)


export default router