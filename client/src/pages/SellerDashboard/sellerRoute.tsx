import React, {lazy} from "react";
import NotFoundPage from "components/notFoundPage/NotFoundPage";

const SellerApp  = lazy(() => import("./SellerApp"));

const SellerAuthRequired = lazy(()=>import("pages/sellerDashboard/protectedRoute/SellerAuthRequired"));
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



