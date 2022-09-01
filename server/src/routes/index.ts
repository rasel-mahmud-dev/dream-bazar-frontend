

import productRouter from "./productRouter"
import categoryRouter from "./categoryRouter"
import brandRouter from "./brandRouter"
import authRouter from "./authRouter"
import shippingAddressRouter from "./shippingAddressRouter"
import orderRouter  from "./orderRouter";
import reviewRouter  from "./reviewRouter";
import uiDataRouter  from "./uiDataRouter";
import sellerRouter  from "./sellerRouter";


const routes = (app)=>{
  productRouter(app)
  categoryRouter(app)
  brandRouter(app)
  authRouter(app)
  shippingAddressRouter(app)
  orderRouter(app)
  reviewRouter(app)
  uiDataRouter(app)
  sellerRouter(app)
}

export default routes
