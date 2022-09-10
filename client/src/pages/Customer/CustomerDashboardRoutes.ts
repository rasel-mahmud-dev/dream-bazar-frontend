
import Dashboard from "pages/Customer/Dashboard";
import Wishlist from "pages/Customer/wishlist/Wishlist";


const CustomerDashboardRoutes  = [
	{path :"/auth/customer/dashboard", element: Dashboard,
		children: [
			{path :"wishlist", element: Wishlist}
		]
	}
]

export default CustomerDashboardRoutes;