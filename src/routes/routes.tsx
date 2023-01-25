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
import {sellerRoute} from "src/layout/SellerLayout";

const JoinHome = lazy(() => import("pages/publicSite/auth/JoinHome"));
const Registration = lazy(() => import("pages/shared/Registration"));
const LoginPage = lazy(() => import("pages/shared/LoginPage"));
const AdminLayout = lazy(() => import("src/layout/AdminLayout"));


import SellerLayout from "src/layout/SellerLayout"
import ShopDetail from "pages/publicSite/ShopDetail/ShopDetail";
import Wishlist from "pages/customerDashboard/wishlist/Wishlist";
import ShoppingCart from "pages/customerDashboard/cart/ShoppingCart";
import Orders from "pages/shared/Orders/Orders";
import AccountDetail from "pages/customerDashboard/AccountDetail/AccountDetail";
import AddressBook from "pages/customerDashboard/AddressBook/AddressBook";
import AddShippingAddress from "pages/customerDashboard/AddressBook/AddAddressBook";

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

                    {path: "", element: <CustomerDashboardHomePage /> },
                    {path: "orders", element: <Orders/>},
                    {path: "wishlist", element: <Wishlist/>},
                    {path: "cart", element: <ShoppingCart/>},
                    {path: "account", element: <AccountDetail/>},
                    {path: "address-books", element: <AddressBook/>},
                    {path: "address-books/add", element: <AddShippingAddress isOpen={false}/>}
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
