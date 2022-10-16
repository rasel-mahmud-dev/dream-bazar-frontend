import express from "express"

import productRouter from "./productRouter"
import categoryRouter from "./categoryRouter"
import brandRouter from "./brandRouter"
import authRouter from "./authRouter"
import shippingAddressRouter from "./shippingAddressRouter"
import orderRouter  from "./orderRouter";
import reviewRouter  from "./reviewRouter";
import uiDataRouter  from "./uiDataRouter";
import sellerRouter  from "./sellerRouter";
import filesRouter  from "./filesRouter";

const router = express.Router()

productRouter(router)
categoryRouter(router)
brandRouter(router)
authRouter(router)
shippingAddressRouter(router)
orderRouter(router)
reviewRouter(router)
uiDataRouter(router)
sellerRouter(router)
filesRouter(router)


export default router
