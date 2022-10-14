import {Router} from "express";


const sellerController = require("../controllers/sellerController")

export default function (app: Router){
  
  app.get("/api/seller/:customer_id", sellerController.getSeller)
  // app.get("/api/brands", brandController.getBrands)

  
  
  
}