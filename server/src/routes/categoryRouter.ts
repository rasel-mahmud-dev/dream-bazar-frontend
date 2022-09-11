
  
import {
  deleteCategory,
  fetchCategoryWithFilter,
  filterCategoryFetch,
  getCategories,
  getCategoriesCount,
  getCategory,
  getCategoryExpand,
  getCategoryFilterSection,
  saveCategory,
  updateCategory
} from "../controllers/categoryController"

// const filterItemsController = require("../controllers/filterItemsController")

export default function (app){
  // app.get("/api/categories/count", getCategoriesCount)

  app.get("/api/categories", getCategories)
  // app.get("/api/categories/fetch/", filterCategoryFetch)
  // app.get("/api/categories/:id", getCategory)
  // // app.post("/api/categories", getCategoryByIds)
  // app.post("/api/categories/filter", fetchCategoryWithFilter)

  app.post("/api/category", saveCategory)

  app.patch("/api/category/:id", updateCategory)

  app.get("/api/category", getCategory)

  // app.put("/api/categories/:id", updateCategory)
  // app.delete("/api/categories/:id", deleteCategory)
  // app.get("/api/categories/filter-section/:id", getCategoryFilterSection)
  // app.get("/api/category/expand/:category_id", getCategoryExpand)
  //
}