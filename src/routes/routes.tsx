import React, { lazy } from "react";
import PrivateRoute from "src/middleware/PrivateRoute";
import HomePage from "pages/publicSite/homePage/HomePage";
import Main from "src/layout/Main";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { Scope } from "store/types";

import NotFoundPage from "components/notFoundPage/NotFoundPage";
import ExcludeAuthRoute from "src/middleware/ExcludeAuthRoute";
import {adminRoute} from "src/layout/AdminLayout";
import ProductDetailLite from "pages/publicSite/productDetails/ProductDetailLite";
import ProductFilterPageLite from "pages/publicSite/productFilterPage/ProductFilterPageLite";
import StoreList from "pages/shared/Shop/StoreList";
import CreateShop from "pages/shared/Shop/CreateShop";
import {sellerRoute} from "src/layout/SellerLayout";

const ProductFilterPage = lazy(() => import("pages/publicSite/productFilterPage/ProductFilterPage"));
const JoinHome = lazy(() => import("pages/publicSite/auth/JoinHome"));
const Registration = lazy(() => import("pages/shared/Registration"));
const LoginPage = lazy(() => import("pages/shared/LoginPage"));
const AdminLayout = lazy(() => import("src/layout/AdminLayout"));
const AdminDashboardHome = lazy(() => import("pages/adminDashboard/DashboardHomePage"));

const AddCategory = lazy(() => import("pages/adminDashboard/categoryList/AddCategory"));

const ProductAttribute = lazy(() => import("pages/adminDashboard/productAttribute/ProductAttribute"));
const ProductList = lazy(() => import("pages/adminDashboard/productList/ProductList"));
const AddBrand = lazy(() => import("pages/adminDashboard/brandList/AddBrand"));
const BrandList = lazy(() => import("pages/adminDashboard/brandList/Brands"));
const AddProduct = lazy(() => import("pages/shared/AddProduct/AddProduct"));
const CategoryList = lazy(() => import("pages/adminDashboard/categoryList/Categories"));

import SellerLayout from "src/layout/SellerLayout"
import ShopDetail from "pages/publicSite/ShopDetail/ShopDetail";
import Wishlist from "pages/customerDashboard/wishlist/Wishlist";
import ShoppingCart from "pages/customerDashboard/cart/ShoppingCart";
import Orders from "pages/shared/Orders/Orders";

// const ProductDetailLite = lazy(() => import("pages/publicSite/productDetails/ProductDetails"));
const CustomerDashboard = lazy(() => import("pages/customerDashboard/CustomerDashboard"));
const CustomerDashboardHomePage = lazy(() => import("pages/customerDashboard/CustomerDashboardHomePage"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        // errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "p/:pId",
                element: <ProductFilterPageLite />,
            },
            {
                path: "shop/:shopName",
                element: <ShopDetail />,
            },
            {
                path: "/join",
                element: (
                    <ExcludeAuthRoute>
                        <JoinHome />
                    </ExcludeAuthRoute>
                ),
                children: [
                    { path: "login", element: <LoginPage /> },
                    { path: "signup", element: <Registration /> },
                    // { path: "reset-password", element: <ResetPassword /> },
                    // { path: "forget-password", element: <ForgetPassword /> },
                    // { path: "opt-validate", element: <OTPValidate /> },
                ],
            },
            // {
            //     path: "/auth/callback/:provider",
            //     element:  <ExcludeAuthRoute scope={Scope.CUSTOMER_USER}><AuthCallback /></ExcludeAuthRoute>
            // },
            {
                path: "/dashboard",
                element: <CustomerDashboard />,
                // errorElement: <ErrorPage />,
                children: [
                    // { path: "update-Product/:productId", element: <PrivateRoute roles={["SELLER"]}> <AddProduct /> </PrivateRoute> },
                    // { path: "all-transactions", element: <PrivateRoute roles={["ADMIN"]}> <AllTransactions /> </PrivateRoute> },

                    { path: "", element: <CustomerDashboardHomePage /> },
                    {path: "orders", element: <Orders/>},
                    {path: "wishlist", element: <Wishlist/>},
                    {path: "cart", element: <ShoppingCart/>}
                    // {
                    //     path: "products",
                    //     element: (
                    //         <PrivateRoute scope={Scope.ADMIN_USER}>
                    //             <ProductList />
                    //         </PrivateRoute>
                    //     ),
                    // },
                ],
            },

            {
                path: "/:slug",
                element: <ProductDetailLite />,
            },
        ],
    },
    {
        path: "/admin",
        element: (
            <PrivateRoute scope={Scope.ADMIN_USER}>
                <AdminLayout />
            </PrivateRoute>
        ),
        // errorElement: <ErrorPage />,
        children: adminRoute,
    },
    {
        path: "/seller",
        element: <SellerLayout />,
        errorElement: <NotFoundPage />,
        children: sellerRoute
    },
]);

export default router;
