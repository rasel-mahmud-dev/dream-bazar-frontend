import express from "express";

import { getShippingAddresses, saveShippingAddress } from "../controllers/shippingAddressController"

import getAuth from "../middlewares/isAuth"

const router = express.Router()

router.get("/shipping-addresses", getAuth(), getShippingAddresses)
router.post("/shipping-addresses", getAuth(), saveShippingAddress)

export default router