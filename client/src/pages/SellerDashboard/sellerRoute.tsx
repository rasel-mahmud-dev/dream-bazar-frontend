import React, {lazy} from "react";
import NotFoundPage from "components/notFoundPage/NotFoundPage";
import PrivateRoute from "../../../middleware/PrivateRoute";
import {Scope} from "store/types";
import {Outlet} from "react-router-dom";
import ExcludeAuthRoute from "../../../middleware/ExcludeAuthRoute";

const SellerApp  = lazy(() => import("./SellerApp"));


const AddProduct = lazy(()=>import("pages/sellerDashboard/addProduct/AddProduct"));
const ShopInfo = lazy(()=>import("pages/sellerDashboard/shop/ShopInfo"));
const UpdateShopInfo = lazy(()=>import("pages/sellerDashboard/shop/UpdateShopInfo"));
const SellerLogin  = lazy(()=>import("pages/sellerDashboard/auth/SellerLogin"));
const SellerRegistration = lazy(()=>import("pages/sellerDashboard/auth/SellerRegistration"));
const DashboardHome  = lazy(()=> import("./dashboardHome/DashboardHome"));
const SellerProducts  = lazy(()=> import("./sellerProducts/SellerProducts"));

export default {
    path: "/seller",
    element:  <SellerApp />,
    errorElement: <NotFoundPage />,
    children: [
        { path: "", element: <PrivateRoute scope={Scope.SELLER_DASHBOARD}> <DashboardHome /> </PrivateRoute> },
        { path: "dashboard", element: <PrivateRoute scope={Scope.SELLER_DASHBOARD}> <DashboardHome /> </PrivateRoute> },
        { path: "products", element: <PrivateRoute scope={Scope.SELLER_DASHBOARD}><SellerProducts /></PrivateRoute> },
        { path: "product/edit/:productId", element: <PrivateRoute scope={Scope.SELLER_DASHBOARD}><AddProduct /></PrivateRoute> },
        { path: "product/add", element: <PrivateRoute scope={Scope.SELLER_DASHBOARD}> <AddProduct /></PrivateRoute> },
        { path: "shop/view", element: <PrivateRoute scope={Scope.SELLER_DASHBOARD}> <ShopInfo /> </PrivateRoute> },
        { path: "shop/edit", element: <PrivateRoute scope={Scope.SELLER_DASHBOARD}><UpdateShopInfo /></PrivateRoute> },
        { path: "join",
            element:  <Outlet />,
            children: [
                { path: "", element: <ExcludeAuthRoute scope={Scope.SELLER_DASHBOARD}><SellerLogin /></ExcludeAuthRoute> },
                { path: "login", element: <ExcludeAuthRoute scope={Scope.SELLER_DASHBOARD}><SellerLogin /></ExcludeAuthRoute> },
                { path: "registration", element: <ExcludeAuthRoute scope={Scope.SELLER_DASHBOARD}><SellerRegistration /> </ExcludeAuthRoute>},
            ]
        }
    ]
}



