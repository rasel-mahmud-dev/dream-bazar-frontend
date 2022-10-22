import {lazy} from "react";

const Dashboard = lazy(()=>import("pages/Customer/Dashboard"));
const Wishlist = lazy(()=>import("pages/Customer/wishlist/Wishlist"));
const ShoppingCart = lazy(()=>import("pages/Customer/cart/ShoppingCart"));


const CustomerDashboardRoute  = {
    path : "/auth/customer/dashboard", element: <Dashboard />,
        children: [
            {path :"wishlist", element: <Wishlist /> },
            {path :"cart", element: <ShoppingCart />}
        ]
}

export default CustomerDashboardRoute;