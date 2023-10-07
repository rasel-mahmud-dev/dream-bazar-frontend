import {Router} from "express";
import ProductController from "./product.controller";
import permission from "../../middlewares/permission";
import {Roles} from "../../types";
import {getAllProductsForAdmin, productFiltersPostV2} from "../../controllers/productController";
import authMiddleware from "../../middlewares/auth.middleware";


const router = Router()

router.post("/home-section", ProductController.getHomepageSectionProducts)
// router.get("/api/v1/products/products-list", ProductController.getHomepageSectionProducts)
router.get("/products-list", authMiddleware.requiredAuth,
    // permission([Roles.ADMIN]),
    ProductController.getAllProductsForAdmin)

router.post("/filter/v2", ProductController.productFiltersPostV2)

router.get("/update-info", ProductController.getProductDetailForUpdate)

router.get("/", ProductController.getProductDetailForUpdate)

export default router;

