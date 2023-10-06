import {Router} from "express";
import BrandController from "./brand.controller";


const router = Router()

router.get("/", BrandController.getBrands)


export default router;

