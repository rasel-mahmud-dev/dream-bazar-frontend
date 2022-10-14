import {createOrder, getOrder, getOrders} from "../controllers/orderController"
import {Router} from "express";

export default function (app: Router){
  app.get("/api/orders/:customer_id", getOrders)
  app.get("/api/order/:customer_id/:order_id", getOrder)
  app.post("/api/order", createOrder)
}