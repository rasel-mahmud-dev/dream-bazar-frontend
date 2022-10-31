import {lazy} from "react";

const Dashboard = lazy(()=>import("pages/CustomerDashboard/Dashboard"));
const Wishlist = lazy(()=>import("pages/CustomerDashboard/wishlist/Wishlist"));
const ShoppingCart = lazy(()=>import("pages/CustomerDashboard/cart/ShoppingCart"));


const CustomerDashboardRoute  = {
    path : "/auth/customer/dashboard", element: <Dashboard />,
        children: [
            {path :"wishlist", element: <Wishlist /> },
            {path :"cart", element: <ShoppingCart />}
        ]
}

export default CustomerDashboardRoute;