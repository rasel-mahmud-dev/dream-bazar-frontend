import {lazy} from "react";

import DashboardHomePage from "pages/adminDashboard/dashboardHome/DashboardHomePage";
import AdminLogin from "pages/adminDashboard/auth/AdminLogin";
const AdminDashboard = lazy(()=>import("pages/adminDashboard/AdminDashboard"));
const AllProducts = lazy(()=>import("pages/adminDashboard/components/AllProducts"));
const AllBrands = lazy(()=>import("pages/adminDashboard/components/AllBrands"));
const AddProduct = lazy(()=>import("pages/adminDashboard/components/AddProduct"));
const AllCategory = lazy(()=>import("pages/adminDashboard/components/AllCategory"));


const adminDashboardRoute  =  {
    path :"/admin", element: <AdminDashboard/>,
    children: [
      {path :"", element: <DashboardHomePage />},
      {path :"dashboard", element: <DashboardHomePage />},
      {path :"products", element: <AllProducts />},
      {path :"add-product", element: <AddProduct/>},
      {path :"update-product/:id", element: <AddProduct/>},
      {path :"categories", element: <AllCategory/>},
      {path :"brands", element: <AllBrands/>},
      {path :"login", element: <AdminLogin/>}
    ]
  }


export default adminDashboardRoute;