import {Router} from "express";

import CategoryController from "./category.controller";


const router = Router()

router.get("/", CategoryController.getCategories)
router.get("/detail", CategoryController.getCategoryDetail)
router.post("/", CategoryController.createNewCategory)
router.patch("/", CategoryController.updateCategory)


export default router;

