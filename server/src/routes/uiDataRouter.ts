
import {
  getStaticPhotos,
  getUiCategory,
  getFilterItemFilter,
  updateUiCategory,
  uploadPhotos,
  doHeavyTask,
  getUISingleCategory, getUICategoryInfo, getMultipleCategoryInfo
} from "../controllers/uiDataController"


const getStaticPhotosWorker = require("../workers/getStaticPhotosWorker")

export default function (app){
  app.get("/api/ui-data/:filename", getUiCategory)
  // app.post("/api/ui-data/:filename", updateUiCategory)
  
  
  app.get("/api/ui-data/category/:category_id", getUISingleCategory)
  
  app.post("/api/ui-data/filter-items", getFilterItemFilter)
  
  
  app.get("/api/ui-data/category-info/:category_id", getUICategoryInfo)
  app.post("/api/ui-data/category-info", getMultipleCategoryInfo)
  
  
  // app.get("/api/photos", getStaticPhotos)
  
  // for heavy cpu expensive job........ control over worker_threads
  app.get("/api/photos", async (req, res)=>{
    let files = await getStaticPhotosWorker()
    res.setHeader("Content-Type", "application/json")
    res.send(files)
  })

  app.post("/api/static-file-upload", uploadPhotos)
  app.get("/api/heavy-task", doHeavyTask)
}