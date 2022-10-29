import React, {lazy} from "react";


import SellerAuthRequired from "pages/SellerHub/protectedRoute/SellerAuthRequired";
import NotFoundPage from "components/notFoundPage/NotFoundPage";
import AddProduct from "pages/SellerHub/addProduct/AddProduct";
import ShopInfo from "pages/SellerHub/shop/ShopInfo";
import UpdateShopInfo from "pages/SellerHub/shop/UpdateShopInfo";
const SellerLogin  = lazy(()=>import("pages/SellerHub/auth/SellerLogin"));
const SellerRegistration = lazy(()=>import("pages/SellerHub/auth/SellerRegistration"));
const SellerApp  = lazy(() => import("./SellerApp"));
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



