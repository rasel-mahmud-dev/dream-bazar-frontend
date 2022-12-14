import PrivateRoute from "src/middleware/PrivateRoute";
import Registration from "pages/shared/Registration";
import HomePage from "pages/publicSite/homePage/HomePage";
import Main from "src/layout/Main";
import {createBrowserRouter, Outlet} from "react-router-dom";
import { Scope } from "store/types";

import ProductFilterPage from "pages/publicSite/productFilterPage/ProductFilterPage";

import ExcludeAuthRoute from "src/middleware/ExcludeAuthRoute";
import JoinHome from "pages/publicSite/auth/JoinHome";
import LoginPage from "pages/shared/LoginPage";
import React, {lazy} from "react";
import AdminLayout from "src/layout/AdminLayout";
import AdminDashboardHome from "pages/adminDashboard/DashboardHomePage";




const AddCategory = lazy(() => import("pages/adminDashboard/categoryList/AddCategory"));
const AddCategoryDetail = lazy(() => import("pages/adminDashboard/categoryList/AddCategoryDetail"));
const CategoryDetails = lazy(() => import("pages/adminDashboard/categoryList/CategoryDetails"));
const ProductAttribute  = lazy(()=>import("pages/adminDashboard/productAttribute/ProductAttribute"));
const ProductList = lazy(()=>import("pages/adminDashboard/productList/ProductList"));
const AddBrand = lazy(()=>import("pages/adminDashboard/brandList/AddBrand"));
const BrandList = lazy(()=>import("pages/adminDashboard/brandList/Brands"));
const AddProduct = lazy(()=>import("pages/adminDashboard/components/AddProduct"));
const CategoryList = lazy(()=>import("pages/adminDashboard/categoryList/Categories"));


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
                element: <ExcludeAuthRoute><JoinHome /></ExcludeAuthRoute>,
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

        ],
    },
    {
        path: "/admin/dashboard",
        element: <AdminLayout/> ,
        // errorElement: <ErrorPage />,
        children: [

            // { path: "update-product/:productId", element: <PrivateRoute roles={["SELLER"]}> <AddProduct /> </PrivateRoute> },
            // { path: "all-transactions", element: <PrivateRoute roles={["ADMIN"]}> <AllTransactions /> </PrivateRoute> },

            {path : "", element: <AdminDashboardHome />},

            {path :"products", element: <PrivateRoute scope={Scope.ADMIN_USER}><ProductList /></PrivateRoute>},
            {path :"add-product", element: <PrivateRoute scope={Scope.ADMIN_USER}><AddProduct/></PrivateRoute>},
            {path :"update-product/:id", element: <PrivateRoute scope={Scope.ADMIN_USER}><AddProduct/></PrivateRoute>},
            {path :"categories", element: <PrivateRoute scope={Scope.ADMIN_USER}><CategoryList/></PrivateRoute>},
            {path :"categories/new", element: <PrivateRoute scope={Scope.ADMIN_USER}><AddCategory/></PrivateRoute>},
            {path :"categories/edit/:id", element: <PrivateRoute scope={Scope.ADMIN_USER}><AddCategory/></PrivateRoute>},
            {path :"category-details", element: <PrivateRoute scope={Scope.ADMIN_USER}><CategoryDetails/></PrivateRoute>},
            {path :"category-details/new", element: <PrivateRoute scope={Scope.ADMIN_USER}><AddCategoryDetail/></PrivateRoute>},
            {path :"category-details/edit/:id", element: <PrivateRoute scope={Scope.ADMIN_USER}><AddCategoryDetail/></PrivateRoute>},
            {path :"product-attribute", element: <PrivateRoute scope={Scope.ADMIN_USER}><ProductAttribute/></PrivateRoute>},
            {path :"brands", element: <PrivateRoute scope={Scope.ADMIN_USER}><BrandList/></PrivateRoute>},
            {path :"brands/new", element: <PrivateRoute scope={Scope.ADMIN_USER}><AddBrand/></PrivateRoute>},
            {path :"brands/edit/:id", element: <PrivateRoute scope={Scope.ADMIN_USER}><AddBrand/></PrivateRoute>},
            // {path: "join",
            //     element:  <Outlet />,
            //     children: [
            //         { path: "", element: <ExcludeAuthRoute scope={Scope.ADMIN_USER}> <AdminLogin /> </ExcludeAuthRoute>, },
            //         { path: "login", element: <ExcludeAuthRoute scope={Scope.ADMIN_USER}> <AdminLogin /> </ExcludeAuthRoute> },
            //     ]
            // }

        ],
    },
]);

export default router

