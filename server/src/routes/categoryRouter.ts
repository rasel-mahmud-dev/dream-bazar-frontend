
  
import {
    addCategoryCache,
    deleteCategory,
    fetchCategoryWithFilter,
    filterCategoryFetch,
    getCategories,
    getCategoriesCount,
    getCategory, getCategoryCache,
    getCategoryExpand,
    getCategoryFilterSection,
    saveCategory,
    updateCategory
} from "../controllers/categoryController"
import {Router} from "express";

// const filterItemsController = require("../controllers/filterItemsController")

export default function (app: Router){
  // app.get("/api/categories/count", getCategoriesCount)

  app.get("/api/categories", getCategories)
  // app.get("/api/categories/fetch/", filterCategoryFetch)
  // app.get("/api/categories/:id", getCategory)
  // // app.post("/api/categories", getCategoryByIds)
  // app.post("/api/categories/filter", fetchCategoryWithFilter)

  app.post("/api/category", saveCategory)
  app.post("/api/category/add-cache", addCategoryCache)
  
  app.get("/api/category/cache/:rootId", getCategoryCache)

  app.patch("/api/category/:id", updateCategory)

  app.get("/api/category", getCategory)

  app.delete("/api/category/:id", deleteCategory)

  // app.put("/api/categories/:id", updateCategory)
  // app.get("/api/categories/filter-section/:id", getCategoryFilterSection)
  // app.get("/api/category/expand/:category_id", getCategoryExpand)
  //
}