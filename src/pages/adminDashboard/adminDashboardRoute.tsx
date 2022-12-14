import React, {lazy} from "react";
import PrivateRoute from "../../middleware/PrivateRoute";
import {Scope} from "store/types";
import ExcludeAuthRoute from "../../middleware/ExcludeAuthRoute";
import {Outlet} from "react-router-dom";


const AddCategory = lazy(() => import("pages/adminDashboard/categoryList/AddCategory"));
const AddCategoryDetail = lazy(() => import("pages/adminDashboard/categoryList/AddCategoryDetail"));
const CategoryDetails = lazy(() => import("pages/adminDashboard/categoryList/CategoryDetails"));
const ProductAttribute  = lazy(()=>import("pages/adminDashboard/productAttribute/ProductAttribute"));
const DashboardHomePage = lazy(()=>import("pages/adminDashboard/dashboardHome/DashboardHomePage"));
const AdminLogin =  lazy(()=>import("pages/adminDashboard/auth/AdminLogin"));
const AdminDashboard = lazy(()=>import("pages/adminDashboard/AdminDashboard"));
const ProductList = lazy(()=>import("pages/adminDashboard/productList/ProductList"));
const AddBrand = lazy(()=>import("pages/adminDashboard/brandList/AddBrand"));
const BrandList = lazy(()=>import("pages/adminDashboard/brandList/Brands"));
const AddProduct = lazy(()=>import("pages/adminDashboard/components/AddProduct"));
const CategoryList = lazy(()=>import("pages/adminDashboard/categoryList/Categories"));


const adminDashboardRoute  =  {
    path :"/admin", element:<AdminDashboard/>,
    children: [
      {path : "", element: <PrivateRoute scope={Scope.ADMIN_USER}><DashboardHomePage /></PrivateRoute>},
      {path :"dashboard", element: <PrivateRoute scope={Scope.ADMIN_USER}><DashboardHomePage /></PrivateRoute>},
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
        {path: "join",
            element:  <Outlet />,
            children: [
                { path: "", element: <ExcludeAuthRoute scope={Scope.ADMIN_USER}> <AdminLogin /> </ExcludeAuthRoute>, },
                { path: "login", element: <ExcludeAuthRoute scope={Scope.ADMIN_USER}> <AdminLogin /> </ExcludeAuthRoute> },
            ]
        }
    ]
  }


export default adminDashboardRoute;