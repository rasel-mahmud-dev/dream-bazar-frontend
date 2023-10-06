// import {createOrder, getOrder, getOrders} from "../controllers/orderController"
import {Router} from "express";
import permission from "../middlewares/permission";
import {Roles} from "../types";
import {getOrders} from "../controllers/orderController";
import isAuth from "../middlewares/isAuth";


export default function (app: Router){
  app.get("/api/orders", isAuth(), permission([Roles.CUSTOMER, Roles.ADMIN, Roles.SELLER]), getOrders)

//   app.get("/api/order/:customer_id/:order_id", getOrder)
//   app.post("/api/order", createOrder)
}