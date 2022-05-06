import { combineReducers } from "redux"
import productReducer from "./productReducer"
import cartReducer from "./cartReducer"
import authReducer from "./authReducer"
import appReducer from "./appReducer"

export default combineReducers({
  productState: productReducer,
  cartState: cartReducer,
  authState: authReducer,
  appState: appReducer
})
