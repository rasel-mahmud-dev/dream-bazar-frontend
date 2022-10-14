import {Router} from "express";


const reviewController = require("../controllers/reviewController")

export default function (app: Router){
  app.get("/api/reviews/:productId", reviewController.getReview)

}