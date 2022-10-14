// const productsFilter = require("../workers/productsFilter")

import {
  deleteProduct,
  fetchCategoryProducts,
  getHomepageSectionProducts,
  getProduct,
  getProductCount,
  getProducts,
  productFilters,
  productFiltersGetV2,
  productFiltersPost,
  productFiltersPostV2,
  saveProduct,
  saveProductsAsDuplicate,
  updateProduct,
  updateProductPutReq,
  uploadHandler
} from "../controllers/productController"


import {
  deleteProductDescription,
  getProductDescriptions,
  getProductDetail
} from "../controllers/productDescriptionController"
import permission from "../middlewares/permission";
import {Roles} from "../models/User";
import isAuth from "../middlewares/isAuth";
import {Router} from "express";


export default function (app: Router){
  
  app.get("/api/products/descriptions", getProductDescriptions)
  app.delete("/api/products/descriptions/:id", deleteProductDescription)
  app.get("/api/products/details/:productId", getProductDetail)
  
  app.get("/api/products/count", getProductCount)
  
  // use worker_threads
  // app.get("/api/products/fetch-home-page", async (req, res, next)=>{
  //   let p = await fetchHomePageSectionProducts(req.query)
  //   res.send(p)
  // })

  // app.get("/api/products/fetch-home-page", productFilterHomePage)

  app.get("/api/products/filter", productFilters)
  app.post("/api/products/filter", productFiltersPost)

  // delete product route, action can handle by ["ADMIN", "PRODUCT_MANAGER", "SITE_DESIGNER"]
  app.delete("/api/product/:id", deleteProduct)
  
  // this route i use worker_threads
  app.post("/api/products/filter/v2", productFiltersPostV2)
  //
  // app.get("/api/products/filter/v2", async (req, res, next)=>{
  //   let result = await productsFilterGetReq({query: req.query, params: req.params})
  //   res.send(result)
  // })

  app.get("/api/products/filter/v2", productFiltersGetV2)

  app.post("/api/products/home-section", getHomepageSectionProducts)

  // app.patch("/api/product/:id", productUpdateForAttributeChange)

  app.patch("/api/product/:id", updateProduct)

  app.get("/api/products/category-product/:categoryId", fetchCategoryProducts)
  
  app.get("/api/products",  permission([Roles.ADMIN, Roles.PRODUCT_MANAGER, Roles.SITE_DESIGNER]),  getProducts)


  // add new product route
  app.post("/api/product", saveProduct)



  app.post("/api/products/copy", saveProductsAsDuplicate)

  app.get("/api/product/:id", getProduct)

  app.put("/api/products/:id", updateProductPutReq)
  app.post("/api/upload", uploadHandler)
  
  
  // app.post("/api/toggle-wishlist", isAuth, productController)
  
  

  
}

