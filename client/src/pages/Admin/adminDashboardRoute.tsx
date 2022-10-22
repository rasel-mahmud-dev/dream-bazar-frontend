import {lazy} from "react";

const AdminDashboard = lazy(()=>import("pages/Admin/AdminDashboard"));
const AllProducts = lazy(()=>import("pages/Admin/components/AllProducts"));
const AllBrands = lazy(()=>import("pages/Admin/components/AllBrands"));
const AddProduct = lazy(()=>import("pages/Admin/components/AddProduct"));
const AllCategory = lazy(()=>import("pages/Admin/components/AllCategory"));


const adminDashboardRoute  =  {
    path :"/auth/admin/dashboard", element: <AdminDashboard/>,
    children: [
      {path :"products", element: <AllProducts />},
      {path :"add-product", element: <AddProduct/>},
      {path :"update-product/:id", element: <AddProduct/>},
      {path :"categories", element: <AllCategory/>},
      {path :"brands", element: <AllBrands/>}
    ]
  }


export default adminDashboardRoute;