import {lazy} from "react";

const Dashboard = lazy(()=>import("pages/customerDashboard/Dashboard"));
const Wishlist = lazy(()=>import("pages/customerDashboard/wishlist/Wishlist"));
const ShoppingCart = lazy(()=>import("pages/customerDashboard/cart/ShoppingCart"));


const CustomerDashboardRoute  = {
    path : "/auth/customer/dashboard", element: <Dashboard />,
        children: [
            {path :"wishlist", element: <Wishlist /> },
            {path :"cart", element: <ShoppingCart />}
        ]
}

export default CustomerDashboardRoute;