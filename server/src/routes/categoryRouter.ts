
  
import {
  deleteCategory,
  fetchCategoryWithFilter,
  filterCategoryFetch,
  getCategories,
  getCategoriesCount,
  getCategory,
  getCategoryExpand,
  getCategoryFilterSection,
  saveCategories,
  updateCategory
} from "../controllers/categoryController"

// const filterItemsController = require("../controllers/filterItemsController")

export default function (app){
  app.get("/api/categories/count", getCategoriesCount)
  app.get("/api/categories", getCategories)
  app.get("/api/categories/fetch/", filterCategoryFetch)
  app.get("/api/categories/:id", getCategory)
  // app.post("/api/categories", getCategoryByIds)
  app.post("/api/categories/filter", fetchCategoryWithFilter)
  app.post("/api/categories", saveCategories)
  app.put("/api/categories/:id", updateCategory)
  app.delete("/api/categories/:id", deleteCategory)
  app.get("/api/categories/filter-section/:id", getCategoryFilterSection)
  app.get("/api/category/expand/:category_id", getCategoryExpand)
  
  
  // app.get("/api/filter_items", filterItemsController.getFilterItems)
  // app.get("/api/filter_items/:id", filterItemsController.getFilterItem)
  // app.post("/api/filter_items", filterItemsController.saveFilterItems)
  // app.put("/api/filter_items/:id", filterItemsController.updateFilterItems)
  // app.delete("/api/filter_items/:id", filterItemsController.deleteFilterItems)
      
}