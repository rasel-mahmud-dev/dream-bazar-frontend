
import {
  deleteBrand,
  getBrand,
  getBrands,
  getBrandsByIds,
  getBrandsCount,
  saveBrands,
   updateBrand
} from "../controllers/brandController"
import {Router} from "express";


export default function (app: Router){
  
  app.get("/api/brands/count", getBrandsCount)

  // get brands from sqlite database
  app.get("/api/brands", getBrands)

  app.post("/api/brands", getBrandsByIds)

  // get brand from sqlite database
  app.get("/api/brand/:id", getBrand)

  // save brand in sqlite database
  app.post("/api/brand", saveBrands)

  // update brand in sqlite database
  app.patch("/api/brand/:id", updateBrand)

  app.delete("/api/brand/:id", deleteBrand)
}