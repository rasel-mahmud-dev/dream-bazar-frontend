import { combineReducers } from "redux";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import authReducer from "./authReducer";
import appReducer from "./appReducer";
import sellerReducer from "reducers/sellerReducer";
import adminReducer from "reducers/adminReducer";

export default combineReducers({
	productState: productReducer,
	cartState: cartReducer,
	authState: authReducer,
	appState: appReducer,
	sellerState: sellerReducer,
	adminState: adminReducer,
});
