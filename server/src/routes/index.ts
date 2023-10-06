import express from "express"

// import productRouter from "./productRouter"
// import categoryRouter from "./categoryRouter"
// import brandRouter from "./brandRouter"
// import shopRouter from "./shopRouter";
// import shippingAddressRouter from "./shippingAddressRouter";
// import sellerRouter from "./sellerRouter";

import authRouter from "../modules/auth/auth.route";




const router = express.Router()

// router.use("/api/", productRouter)
// router.use("/api/", categoryRouter)
router.use("/api/v1/auth", authRouter)
// router.use("/api/", brandRouter)
// router.use("/api/", shopRouter)
// router.use("/api/", shippingAddressRouter)
// router.use("/api/", sellerRouter)


// sellerRouter(router)
// shippingAddressRouter(router)
// orderRouter(router)
// reviewRouter(router)
// uiDataRouter(router)
//
// filesRouter(router)


router.get("/health", (req, res)=>{
    res.send("success")
})



export default router
