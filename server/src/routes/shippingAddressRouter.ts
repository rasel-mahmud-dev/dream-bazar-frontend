
const shippingAddressController = require("../controllers/shippingAddressController")

export default function (app){
  app.get("/api/shipping-addresses/:user_id", shippingAddressController.getShippingAddresses)
  app.post("/api/shipping-address", shippingAddressController.saveShippingAddress)
}