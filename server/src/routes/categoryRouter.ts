import {Router} from "express";

import {
    addCategoryDetail,
    deleteCategory,
    deleteCategoryDetail,
    getAllCategoryDetails,
    getCategories,
    getCategoriesCount,
    getCategory,
    getCategoryDetail,
    saveCategory,
    updateCategory,
    updateCategoryDetail
} from "../controllers/categoryController"
import permission from "../middlewares/permission";
import {Roles, Scope} from "../types";
import isAuth from "../middlewares/isAuth";


export default function (app: Router){
  
  app.get("/api/categories/count", getCategoriesCount)

  app.get("/api/categories", getCategories)
  
  app.post("/api/category", saveCategory)
  
  app.patch("/api/category/:id", updateCategory)

  app.get("/api/category", getCategory)

  app.delete("/api/category/:id", deleteCategory)
  
  app.get("/api/category/category-details", isAuth(Scope.ADMIN_DASHBOARD), permission([Roles.ADMIN]), getAllCategoryDetails)
  
  app.get("/api/category/category-detail", getCategoryDetail)
  
  app.patch("/api/category/detail/:detailId", isAuth(Scope.ADMIN_DASHBOARD), permission([Roles.ADMIN]), updateCategoryDetail)
  
    app.post("/api/category/detail", isAuth(Scope.ADMIN_DASHBOARD), permission([Roles.ADMIN]), addCategoryDetail)
  
  app.delete("/api/category/detail/:detailId",isAuth(Scope.ADMIN_DASHBOARD), permission([Roles.ADMIN]), deleteCategoryDetail)
}