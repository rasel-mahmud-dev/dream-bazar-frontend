import {
    deleteBrand,
    getBrand,
    getBrands,
    getBrandsCount,
    getBrandsForCategory, getBrandsInfo,
    saveBrands,
    updateBrand
} from "../controllers/brandController"
import {Router} from "express";
import isAuth from "../middlewares/isAuth";
import permission from "../middlewares/permission";
import {Roles} from "../types";


const router = Router()

router.get("/brands/count", getBrandsCount)

// get brand from collection
router.get("/brands", getBrands)

// get brand from collection
router.get("/brand/:id", getBrand)    // get brand from collection

router.get("/brands/info/:brandName", getBrandsInfo)

// save brand in collection
router.post("/brand", isAuth(), permission([Roles.ADMIN]), saveBrands)

// get brand for category
router.post("/brands-category", getBrandsForCategory)

// update brand in collection
router.patch("/brand/:id", isAuth(), permission([Roles.ADMIN]), updateBrand)

router.delete("/brand/:id", isAuth(), permission([Roles.ADMIN]), deleteBrand)

export default router;