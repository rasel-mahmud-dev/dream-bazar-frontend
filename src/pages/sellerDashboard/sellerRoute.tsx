import React, {lazy} from "react";
import NotFoundPage from "components/notFoundPage/NotFoundPage";
import PrivateRoute from "../../middleware/PrivateRoute";
import {Scope} from "store/types";
import {Outlet} from "react-router-dom";
import ExcludeAuthRoute from "../../middleware/ExcludeAuthRoute";
import CreateShop from "pages/sellerDashboard/shop/CreateShop";

const SellerApp  = lazy(() => import("./SellerApp"));


const AddProduct = lazy(()=>import("pages/sellerDashboard/addProduct/AddProduct"));
const ShopInfo = lazy(()=>import("pages/sellerDashboard/shop/ShopInfo"));
const SellerLogin  = lazy(()=>import("pages/sellerDashboard/auth/SellerLogin"));
const SellerRegistration = lazy(()=>import("pages/sellerDashboard/auth/SellerRegistration"));
const DashboardHome  = lazy(()=> import("./dashboardHome/DashboardHome"));
const SellerProducts  = lazy(()=> import("./sellerProducts/SellerProducts"));

export default {
    path: "/seller",
    element:  <SellerApp />,
    errorElement: <NotFoundPage />,
    children: [
        { path: "", element: <PrivateRoute scope={Scope.SELLER_USER}> <DashboardHome /> </PrivateRoute> },
        { path: "dashboard", element: <PrivateRoute scope={Scope.SELLER_USER}> <DashboardHome /> </PrivateRoute> },
        { path: "products", element: <PrivateRoute scope={Scope.SELLER_USER}><SellerProducts /></PrivateRoute> },
        { path: "product/edit/:productId", element: <PrivateRoute scope={Scope.SELLER_USER}><AddProduct /></PrivateRoute> },
        { path: "product/add", element: <PrivateRoute scope={Scope.SELLER_USER}> <AddProduct /></PrivateRoute> },
        { path: "shop/view", element: <PrivateRoute scope={Scope.SELLER_USER}> <ShopInfo /> </PrivateRoute> },
        { path: "shop/new", element: <PrivateRoute scope={Scope.SELLER_USER}> <CreateShop /> </PrivateRoute> },
        { path: "shop/edit", element: <PrivateRoute scope={Scope.SELLER_USER}><CreateShop /></PrivateRoute> },
        { path: "join",
            element:  <Outlet />,
            children: [
                { path: "", element: <ExcludeAuthRoute scope={Scope.SELLER_USER}><SellerLogin /></ExcludeAuthRoute> },
                { path: "registration", element: <ExcludeAuthRoute scope={Scope.SELLER_USER}><SellerRegistration /> </ExcludeAuthRoute>},
                { path: "login", element: <ExcludeAuthRoute scope={Scope.SELLER_USER}><SellerLogin /></ExcludeAuthRoute> },
            ]
        }
    ]
}



