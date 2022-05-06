


const sellerController = require("../controllers/sellerController")

export default function (app){
  
  app.get("/api/seller/:customer_id", sellerController.getSeller)
  // app.get("/api/brands", brandController.getBrands)

  
  
  
}