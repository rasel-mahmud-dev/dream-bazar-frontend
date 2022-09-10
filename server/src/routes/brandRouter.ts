
import {
  deleteBrand,
  editBrand, fetchBrandsWithFilter,
  getBrand,
  getBrands,
  getBrandsByIds,
  getBrandsCount,
  saveBrands,
  saveBrandsWithImage
} from "../controllers/brandController"

export default function (app){
  
  app.get("/api/brands/count", getBrandsCount)
  
  // app.get("/api/brands", getBrands)
  
  app.get("/api/brands", getBrands)

  
  app.post("/api/brands", getBrandsByIds)
  
  app.get("/api/brand", getBrand)
  
  app.post("/api/brand", saveBrands)
  
  app.post("/api/brands/with-image-upload", saveBrandsWithImage)
  app.put("/api/brands/:brandId", editBrand)
  app.delete("/api/brands/:brandId", deleteBrand)

  app.post("/api/fetch-brands", fetchBrandsWithFilter)
}