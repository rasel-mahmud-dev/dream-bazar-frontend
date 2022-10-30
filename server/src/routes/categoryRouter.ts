import {Router} from "express";
  
import {
    deleteCategory,
    getCategories,
    getCategoriesCount,
    getCategory, getCategoryDetail,
    saveCategory,
    updateCategory
} from "../controllers/categoryController"



export default function (app: Router){
  
  app.get("/api/categories/count", getCategoriesCount)

  app.get("/api/categories", getCategories)
  
  app.post("/api/category", saveCategory)
  
  app.patch("/api/category/:id", updateCategory)

  app.get("/api/category", getCategory)

  app.delete("/api/category/:id", deleteCategory)
  
  app.get("/api/category/category-detail", getCategoryDetail)
}