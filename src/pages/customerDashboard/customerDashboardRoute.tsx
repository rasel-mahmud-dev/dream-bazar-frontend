import {lazy} from "react";
import PrivateRoute from "../../middleware/PrivateRoute";
import {Scope} from "store/types";

const Dashboard = lazy(()=>import("pages/customerDashboard/CustomerDashboard"));
const Wishlist = lazy(()=>import("pages/customerDashboard/wishlist/Wishlist"));
const ShoppingCart = lazy(()=>import("pages/customerDashboard/cart/ShoppingCart"));


const CustomerDashboardRoute  = {
    path : "/auth/customer/dashboard", element: <PrivateRoute scope={Scope.CUSTOMER_USER}><Dashboard /></PrivateRoute>,
        children: [
            {path :"wishlist", element: <Wishlist /> },
            {path :"cart", element: <ShoppingCart />}
        ]
}

export default CustomerDashboardRoute;