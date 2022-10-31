import React, {lazy} from "react";
import NotFoundPage from "components/notFoundPage/NotFoundPage";

const SellerApp  = lazy(() => import("./SellerApp"));

import SellerAuthRequired from "pages/sellerDashboard/protectedRoute/SellerAuthRequired";
import AddProduct from "pages/sellerDashboard/addProduct/AddProduct";
import ShopInfo from "pages/sellerDashboard/shop/ShopInfo";
import UpdateShopInfo from "pages/sellerDashboard/shop/UpdateShopInfo";
const SellerLogin  = lazy(()=>import("pages/sellerDashboard/auth/SellerLogin"));
const SellerRegistration = lazy(()=>import("pages/sellerDashboard/auth/SellerRegistration"));
const DashboardHome  = lazy(()=> import("./dashboardHome/DashboardHome"));
const SellerProducts  = lazy(()=> import("./sellerProducts/SellerProducts"));

export default {
    path: "/seller",
    element:  <SellerApp />,
    errorElement: <NotFoundPage />,
    children: [
        { path: "dashboard", element: <SellerAuthRequired> <DashboardHome /> </SellerAuthRequired> },
        { path: "login", element: <SellerLogin /> },
        { path: "registration", element: <SellerRegistration /> },
        { path: "products", element: <SellerAuthRequired><SellerProducts /></SellerAuthRequired> },
        { path: "product/edit/:productId", element: <SellerAuthRequired><AddProduct /></SellerAuthRequired> },
        { path: "product/add", element:<SellerAuthRequired> <AddProduct /></SellerAuthRequired> },
        { path: "shop/view", element:<SellerAuthRequired> <ShopInfo /> </SellerAuthRequired> },
        { path: "shop/edit", element: <SellerAuthRequired><UpdateShopInfo /></SellerAuthRequired> }
    ]
}



