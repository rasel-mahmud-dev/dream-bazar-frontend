import React, { lazy } from "react";
import PrivateRoute from "src/middleware/PrivateRoute";
import HomePage from "pages/publicSite/homePage/HomePage";
import Main from "src/layout/Main";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { Scope } from "store/types";

import NotFoundPage from "components/notFoundPage/NotFoundPage";
import ExcludeAuthRoute from "src/middleware/ExcludeAuthRoute";
import {adminRoute} from "src/layout/AdminLayout";

const ProductFilterPage = lazy(() => import("pages/publicSite/productFilterPage/ProductFilterPage"));
const JoinHome = lazy(() => import("pages/publicSite/auth/JoinHome"));
const Registration = lazy(() => import("pages/shared/Registration"));
const LoginPage = lazy(() => import("pages/shared/LoginPage"));
const AdminLayout = lazy(() => import("src/layout/AdminLayout"));
const AdminDashboardHome = lazy(() => import("pages/adminDashboard/DashboardHomePage"));

const AddCategory = lazy(() => import("pages/adminDashboard/categoryList/AddCategory"));
const AddCategoryDetail = lazy(() => import("pages/adminDashboard/categoryList/AddCategoryDetail"));
const CategoryDetails = lazy(() => import("pages/adminDashboard/categoryList/CategoryDetails"));
const ProductAttribute = lazy(() => import("pages/adminDashboard/productAttribute/ProductAttribute"));
const ProductList = lazy(() => import("pages/adminDashboard/productList/ProductList"));
const AddBrand = lazy(() => import("pages/adminDashboard/brandList/AddBrand"));
const BrandList = lazy(() => import("pages/adminDashboard/brandList/Brands"));
const AddProduct = lazy(() => import("pages/shared/AddProduct/AddProduct"));
const CategoryList = lazy(() => import("pages/adminDashboard/categoryList/Categories"));

const SellerLayout = lazy(() => import("src/layout/SellerLayout"));
const ProductDetails = lazy(() => import("pages/publicSite/productDetails/ProductDetails"));
const CustomerDashboard = lazy(() => import("pages/customerDashboard/CustomerDashboard"));
const CustomerDashboardHomePage = lazy(() => import("pages/customerDashboard/CustomerDashboardHomePage"));

const ShopInfo = lazy(() => import("pages/sellerDashboard/shop/ShopInfo"));
const SellerLogin = lazy(() => import("pages/sellerDashboard/auth/SellerLogin"));
const SellerRegistration = lazy(() => import("pages/sellerDashboard/auth/SellerRegistration"));
const SellerDashboardHome = lazy(() => import("pages/sellerDashboard/dashboardHome/DashboardHome"));
const SellerProducts = lazy(() => import("pages/sellerDashboard/sellerProducts/SellerProducts"));

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
                element: <ProductFilterPage />,
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
                    { path: "registration", element: <Registration /> },
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

                    {
                        path: "products",
                        element: (
                            <PrivateRoute scope={Scope.ADMIN_USER}>
                                <ProductList />
                            </PrivateRoute>
                        ),
                    },
                ],
            },

            {
                path: "/:slug",
                element: <ProductDetails />,
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
        children: [
            {
                path: "",
                element: (
                    <PrivateRoute scope={Scope.SELLER_USER}>
                        {" "}
                        <SellerDashboardHome />{" "}
                    </PrivateRoute>
                ),
            },
            {
                path: "dashboard",
                element: (
                    <PrivateRoute scope={Scope.SELLER_USER}>
                        {" "}
                        <SellerDashboardHome />{" "}
                    </PrivateRoute>
                ),
            },
            {
                path: "products",
                element: (
                    <PrivateRoute scope={Scope.SELLER_USER}>
                        <SellerProducts />
                    </PrivateRoute>
                ),
            },
            // { path: "Product/edit/:productId", element: <PrivateRoute scope={Scope.SELLER_USER}><AddProduct /></PrivateRoute> },
            // { path: "Product/add", element: <PrivateRoute scope={Scope.SELLER_USER}> <AddProduct /></PrivateRoute> },
            // { path: "shop/view", element: <PrivateRoute scope={Scope.SELLER_USER}> <ShopInfo /> </PrivateRoute> },
            // { path: "shop/new", element: <PrivateRoute scope={Scope.SELLER_USER}> <CreateShop /> </PrivateRoute> },
            // { path: "shop/edit", element: <PrivateRoute scope={Scope.SELLER_USER}><CreateShop /></PrivateRoute> },
            // { path: "join",
            //     element:  <Outlet />,
            //     children: [
            //         { path: "", element: <ExcludeAuthRoute scope={Scope.SELLER_USER}><SellerLogin /></ExcludeAuthRoute> },
            //         { path: "registration", element: <ExcludeAuthRoute scope={Scope.SELLER_USER}><SellerRegistration /> </ExcludeAuthRoute>},
            //         { path: "login", element: <ExcludeAuthRoute scope={Scope.SELLER_USER}><SellerLogin /></ExcludeAuthRoute> },
            //     ]
            // }
        ],
    },
]);

export default router;
