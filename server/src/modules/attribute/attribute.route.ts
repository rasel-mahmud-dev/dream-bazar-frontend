import {Router} from "express";
import AttributeController from "./attribute.controller";


const router = Router()

// get all product attributes for only admin
router.get("/",   AttributeController.getProductAttributes)

// add attributes for only admin
router.post("/",  AttributeController.addAttribute)


// update attributes for only admin
router.patch("/:id", AttributeController.updateAttribute)



export default router;

