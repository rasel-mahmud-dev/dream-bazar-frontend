 

const reviewController = require("../controllers/reviewController")

export default function (app){
  app.get("/api/reviews/:productId", reviewController.getReview)

}