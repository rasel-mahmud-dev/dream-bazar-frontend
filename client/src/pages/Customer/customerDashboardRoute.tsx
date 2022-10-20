
import Dashboard from "pages/Customer/Dashboard";
import Wishlist from "pages/Customer/wishlist/Wishlist";
import ShoppingCart from "pages/Customer/cart/ShoppingCart";


const CustomerDashboardRoute  = {
    path : "/auth/customer/dashboard", element: <Dashboard />,
        children: [
            {path :"wishlist", element: <Wishlist /> },
            {path :"cart", element: <ShoppingCart />}
        ]
}

export default CustomerDashboardRoute;