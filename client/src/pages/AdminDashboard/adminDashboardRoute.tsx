import React, {lazy} from "react";
import PrivateRoute from "../../../middleware/PrivateRoute";
import {Scope} from "store/types";
import ExcludeAuthRoute from "../../../middleware/ExcludeAuthRoute";
import {Outlet} from "react-router-dom";

const CategoryDetails = lazy(() => import("pages/adminDashboard/categoryList/CategoryDetails"));
const ProductAttribute  = lazy(()=>import("pages/adminDashboard/productAttribute/ProductAttribute"));
const DashboardHomePage = lazy(()=>import("pages/adminDashboard/dashboardHome/DashboardHomePage"));
const AdminLogin =  lazy(()=>import("pages/adminDashboard/auth/AdminLogin"));
const AdminDashboard = lazy(()=>import("pages/adminDashboard/AdminDashboard"));
const ProductList = lazy(()=>import("pages/adminDashboard/productList/ProductList"));
const BrandList = lazy(()=>import("pages/adminDashboard/brandList/Brands"));
const AddProduct = lazy(()=>import("pages/adminDashboard/components/AddProduct"));
const CategoryList = lazy(()=>import("pages/adminDashboard/categoryList/Categories"));


const adminDashboardRoute  =  {
    path :"/admin", element:<AdminDashboard/>,
    children: [
      {path : "", element: <PrivateRoute scope={Scope.ADMIN_DASHBOARD}><DashboardHomePage /></PrivateRoute>},
      {path :"dashboard", element: <PrivateRoute scope={Scope.ADMIN_DASHBOARD}><DashboardHomePage /></PrivateRoute>},
        {path :"products", element: <PrivateRoute scope={Scope.ADMIN_DASHBOARD}><ProductList /></PrivateRoute>},
        {path :"add-product", element: <PrivateRoute scope={Scope.ADMIN_DASHBOARD}><AddProduct/></PrivateRoute>},
        {path :"update-product/:id", element: <PrivateRoute scope={Scope.ADMIN_DASHBOARD}><AddProduct/></PrivateRoute>},
        {path :"categories", element: <PrivateRoute scope={Scope.ADMIN_DASHBOARD}><CategoryList/></PrivateRoute>},
        {path :"category-details", element: <PrivateRoute scope={Scope.ADMIN_DASHBOARD}><CategoryDetails/></PrivateRoute>},
        {path :"product-attribute", element: <PrivateRoute scope={Scope.ADMIN_DASHBOARD}><ProductAttribute/></PrivateRoute>},
        {path :"brands", element: <PrivateRoute scope={Scope.ADMIN_DASHBOARD}><BrandList/></PrivateRoute>},
        {path: "join",
            element:  <Outlet />,
            children: [
                { path: "", element: <ExcludeAuthRoute scope={Scope.ADMIN_DASHBOARD}> <AdminLogin /> </ExcludeAuthRoute>, },
                { path: "login", element: <ExcludeAuthRoute scope={Scope.ADMIN_DASHBOARD}> <AdminLogin /> </ExcludeAuthRoute> },
            ]
        }
    ]
  }


export default adminDashboardRoute;