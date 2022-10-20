import {deleteBrand, getBrand, getBrands, getBrandsCount, saveBrands, updateBrand} from "../controllers/brandController"
import {Router} from "express";


export default function (app: Router) {
    
    app.get("/api/brands/count", getBrandsCount)

    // get brands from collection
    app.get("/api/brands", getBrands)
    
    // get brand from collection
    app.get("/api/brand/:id", getBrand)
    
    // save brand in collection
    app.post("/api/brand", saveBrands)
    
    // update brand in collection
    app.patch("/api/brand/:id", updateBrand)
    
    app.delete("/api/brand/:id", deleteBrand)
}