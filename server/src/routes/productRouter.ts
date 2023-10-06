import {
    addAttribute,
    deleteAttribute,
    deleteProduct,
    fetchCategoryProducts,
    getAllProductsForAdmin,
    getHomepageSection,
    getHomepageSectionProducts,
    getProduct,
    getProductAttributes,
    getProductCount,
    getProductDetail,
    getProducts,
    getRelevantProducts,
    makeLocalCache,
    productFiltersGetV2,
    productFiltersPost,
    productFiltersPostV2,
    saveProduct,
    saveProductsAsDuplicate,
    updateAttribute,
    updateProduct,
    uploadHandler
} from "../controllers/productController"

import {Response, Router} from "express";
import permission from "../middlewares/permission";
import {Roles} from "../types";
import isAuth from "../middlewares/isAuth";
import Product from "../models/Product";
import {updateProductViaAdmin} from "../controllers/adminController";


const router = Router()


router.get("/products/count", getProductCount)

router.get("/products", (_, res:  Response)=>{
    Product.find({}).then(p=>{
        res.send(p)
    }).catch(ex=>{
        res.status(500).send({message: ex})
    })
})

router.post("/products/filter", productFiltersPost)

// delete product route, action can handle by ["ADMIN", "PRODUCT_MANAGER", "SITE_DESIGNER"]
router.delete("/product/:id", isAuth(), permission([Roles.SELLER, Roles.ADMIN]), deleteProduct)

// this route I use worker_threads
router.post("/products/filter/v2", productFiltersPostV2)

// router.get("/brand/filter/v2", async (req, res, next)=>{
//   let result = await productsFilterGetReq({query: req.query, params: req.params})
//   res.send(result)
// })

router.get("/products/filter/v2", productFiltersGetV2)

router.post("/products/home-section", getHomepageSection)
router.post("/products/home-section-products", getHomepageSectionProducts)


// router.patch("/product/:id", productUpdateForAttributeChange)


// update product for any field admin can change anything
router.patch("/product/:id", isAuth(), permission([Roles.ADMIN, Roles.SELLER]), updateProduct)

router.patch("/product/admin/:id", isAuth(), permission([Roles.ADMIN]), updateProductViaAdmin)

router.get("/products/category-product/:categoryId", fetchCategoryProducts)


router.get("/products", isAuth(), permission([Roles.ADMIN, Roles.SELLER]), getProducts)


//get all product only admin user
router.get("/products/products-list", isAuth(), permission([Roles.ADMIN]), getAllProductsForAdmin)


// add new product route
router.post("/product", isAuth(), permission([Roles.ADMIN, Roles.SELLER]), saveProduct)


router.post("/products/copy", saveProductsAsDuplicate)

router.get("/product", getProduct)


// get relevant brand
router.post("/products/relevant", getRelevantProducts)


router.get("/product/detail/:productId", getProductDetail)


router.post("/upload", uploadHandler)


// router.post("/toggle-wishlist", isAuth, productController)


/*************************** Attribute controller ***************************/

// get all product attributes for only admin
router.get("/product-attributes", isAuth(), permission([Roles.ADMIN]), getProductAttributes)

// update attributes for only admin
router.patch("/product/attribute/:id", isAuth(), permission([Roles.ADMIN]), updateAttribute)


// add attributes for only admin
router.post("/product/attribute", isAuth(), permission([Roles.ADMIN]), addAttribute)

// delete attributes for only admin
router.delete("/product/attribute/:id", isAuth(), permission([Roles.ADMIN]), deleteAttribute)


router.get("/products/make-cache", makeLocalCache)


export default router;

