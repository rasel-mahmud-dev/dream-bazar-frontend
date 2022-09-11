
import {
  deleteBrand,
  editBrand, fetchBrandsWithFilter,
  getBrand,
  getBrands,
  getBrandsByIds,
  getBrandsCount,
  saveBrands,
  saveBrandsWithImage, updateBrand
} from "../controllers/brandController"

export default function (app){
  
  app.get("/api/brands/count", getBrandsCount)
  
  // app.get("/api/brands", getBrands)
  
  app.get("/api/brands", getBrands)

  
  app.post("/api/brands", getBrandsByIds)
  
  app.get("/api/brand", getBrand)
  
  app.post("/api/brand", saveBrands)

  app.patch("/api/brand/:id", updateBrand)

  app.post("/api/brands/with-image-upload", saveBrandsWithImage)
  app.put("/api/brands/:brandId", editBrand)
  app.delete("/api/brand/:brandId", deleteBrand)

  app.post("/api/fetch-brands", fetchBrandsWithFilter)
}