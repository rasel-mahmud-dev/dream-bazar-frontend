import isAuth from "../middlewares/isAuth"

const productsFilter = require("../workers/productsFilter")

import {
  deleteProduct,
  fetchCategoryProducts,
  getProduct,
  getProductCount, getProducts,
  productFilterHomePage,
  productFilters,
  productFiltersPost,
  productFiltersPostV2,
  saveProductsAsDuplicate,
  productUpdate,
  saveProducts,
  updateProductPutReq,
  uploadHandler, productFiltersGetV2
} from "../controllers/productController"


import {
  getProductDetail,
  getProductDescriptions,
  deleteProductDescription
} from "../controllers/productDescriptionController"

const fetchHomePageSectionProducts = require("../workers/fetchHomePageSectionProducts");



export default function (app){
  
  app.get("/api/products/descriptions", getProductDescriptions)
  app.delete("/api/products/descriptions/:id", deleteProductDescription)
  app.get("/api/products/details/:productId", getProductDetail)
  
  app.get("/api/products/count", getProductCount)
  
  // use worker_threads
  app.get("/api/products/fetch-home-page", async (req, res, next)=>{
    let p = await fetchHomePageSectionProducts(req.query)
    res.send(p)
  })
  // app.get("/api/products/fetch-home-page", productFilterHomePage)
  app.get("/api/products/filter", productFilters)
  app.post("/api/products/filter", productFiltersPost)
  
  // this route i use worker_threads
  app.post("/api/products/filter/v2", async (req, res, next)=>{
    let result = await productsFilter({body: req.body})
    // setTimeout(()=>{
      res.send(result)
    // }, 2000)
  })
  //
  // app.get("/api/products/filter/v2", async (req, res, next)=>{
  //   let result = await productsFilterGetReq({query: req.query, params: req.params})
  //   res.send(result)
  // })

  app.get("/api/products/filter/v2", productFiltersGetV2)

  app.post("/api/products/update/:id", productUpdate)
  app.get("/api/products/category-product/:categoryId", fetchCategoryProducts)
  
  app.get("/api/products", getProducts)
  
  app.post("/api/products", saveProducts)
  app.post("/api/products/copy", saveProductsAsDuplicate)
  app.get("/api/products/:id", getProduct)
  app.put("/api/products/:id", updateProductPutReq)
  app.delete("/api/products/:id", deleteProduct)
  app.post("/api/upload", uploadHandler)
  
  
  // app.post("/api/toggle-wishlist", isAuth, productController)
  
  

  
}

