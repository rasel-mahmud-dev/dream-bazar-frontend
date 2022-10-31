import {lazy} from "react";

const CategoryDetails  = lazy(()=>import("pages/adminDashboard/categoryList/CategoryDetails"));
const ProductAttribute  = lazy(()=>import("pages/adminDashboard/productAttribute/ProductAttribute"));
const DashboardHomePage = lazy(()=>import("pages/adminDashboard/dashboardHome/DashboardHomePage"));
const AdminLogin =  lazy(()=>import("pages/adminDashboard/auth/AdminLogin"));
const AdminDashboard = lazy(()=>import("pages/adminDashboard/AdminDashboard"));
const ProductList = lazy(()=>import("pages/adminDashboard/productList/ProductList"));
const BrandList = lazy(()=>import("pages/adminDashboard/brandList/Brands"));
const AddProduct = lazy(()=>import("pages/adminDashboard/components/AddProduct"));
const CategoryList = lazy(()=>import("pages/adminDashboard/categoryList/Categories"));


const adminDashboardRoute  =  {
    path :"/admin", element: <AdminDashboard/>,
    children: [
      {path :"", element: <DashboardHomePage />},
      {path :"dashboard", element: <DashboardHomePage />},
      {path :"products", element: <ProductList />},
      {path :"add-product", element: <AddProduct/>},
      {path :"update-product/:id", element: <AddProduct/>},
      {path :"categories", element: <CategoryList/>},
      {path :"category-details", element: <CategoryDetails/>},
      {path :"product-attribute", element: <ProductAttribute/>},
      {path :"brands", element: <BrandList/>},
      {path :"login", element: <AdminLogin/>}
    ]
  }


export default adminDashboardRoute;