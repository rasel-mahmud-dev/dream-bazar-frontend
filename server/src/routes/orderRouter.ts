import {createOrder, getOrder, getOrders} from "../controllers/orderController"

export default function (app){
  app.get("/api/orders/:customer_id", getOrders)
  app.get("/api/order/:customer_id/:order_id", getOrder)
  app.post("/api/order", createOrder)
}