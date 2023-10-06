import {Router} from "express";
import ProductController from "./product.controller";


const router = Router()

router.post("/home-section", ProductController.getHomepageSectionProducts)


export default router;

