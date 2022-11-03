import {lazy} from "react";
import PrivateRoute from "../../../middleware/PrivateRoute";

const Dashboard = lazy(()=>import("pages/customerDashboard/Dashboard"));
const Wishlist = lazy(()=>import("pages/customerDashboard/wishlist/Wishlist"));
const ShoppingCart = lazy(()=>import("pages/customerDashboard/cart/ShoppingCart"));


const CustomerDashboardRoute  = {
    path : "/auth/customer/dashboard", element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {path :"wishlist", element: <Wishlist /> },
            {path :"cart", element: <ShoppingCart />}
        ]
}

export default CustomerDashboardRoute;