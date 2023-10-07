import {Router} from "express";
import BrandController from "./brand.controller";


const router = Router()

router.get("/", BrandController.getBrands)
router.get("/:brandId", BrandController.getBrand)
router.post("/", BrandController.addBrand)
router.patch("/:brandId", BrandController.updateBrand)
router.post("/category", BrandController.getCategoryBrands)


export default router;

