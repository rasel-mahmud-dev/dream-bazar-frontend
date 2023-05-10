import React, {lazy} from "react";
import PrivateRoute from "src/middleware/PrivateRoute";
import Main, {mainRoute} from "src/layout/Main";
import {createBrowserRouter, Outlet} from "react-router-dom";
import {Scope} from "store/types";

import NotFoundPage from "components/notFoundPage/NotFoundPage";

import {adminRoute} from "src/layout/AdminLayout";

import {sellerRoute} from "src/layout/SellerLayout";

const AdminLayout = lazy(() => import("src/layout/AdminLayout"));

import SellerLayout from "src/layout/SellerLayout"


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        // errorElement: <ErrorPage />,
        children: mainRoute,
    },
    {
        path: "/admin",
        element: (
            <PrivateRoute scope={Scope.ADMIN_USER}>
                <AdminLayout/>
            </PrivateRoute>
        ),
        // errorElement: <ErrorPage />,
        children: adminRoute,
    },
    {
        path: "/seller",
        element: <SellerLayout/>,
        errorElement: <NotFoundPage/>,
        children: sellerRoute
    },
]);

export default router;
