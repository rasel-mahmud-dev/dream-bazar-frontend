import React, {lazy, ReactNode, useEffect, useState} from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { Outlet } from "react-router-dom";
import { currentAuthAction } from "actions/authAction";
import { setLanguage, toggleTheme } from "actions/appContextActions";
import { useDispatch, useSelector } from "react-redux";
import Footer from "components/Footer/Footer";

import { RootState } from "src/store";
import DashboardSidebar, {SidebarDataType} from "pages/shared/DashboardSidebar/DashboardSidebar";
import { BiCart, BiNote, BiPlus, BsList, FiMail, MdOutlineSpaceDashboard} from "react-icons/all";
import staticImagePath from "src/utills/staticImagePath";
import DashboardNavigation from "pages/shared/Navigation";
import PrivateRoute from "src/middleware/PrivateRoute";
import {Scope} from "store/types";


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




export const adminRoute =   [
    // { path: "update-Product/:productId", element: <PrivateRoute roles={["SELLER"]}> <AddProduct /> </PrivateRoute> },
    // { path: "all-transactions", element: <PrivateRoute roles={["ADMIN"]}> <AllTransactions /> </PrivateRoute> },

    { path: "", element: <AdminDashboardHome /> },
    { path: "dashboard", element: <AdminDashboardHome /> },

    {
        path: "products",
        element: (
            <PrivateRoute scope={Scope.ADMIN_USER}>
                <ProductList />
            </PrivateRoute>
        ),
    },
    {
        path: "product/new",
        element: (
            <PrivateRoute scope={Scope.ADMIN_USER}>
                <AddProduct />
            </PrivateRoute>
        ),
    },
    {
        path: "update-Product/:id",
        element: (
            <PrivateRoute scope={Scope.ADMIN_USER}>
                <AddProduct />
            </PrivateRoute>
        ),
    },
    {
        path: "categories",
        element: (
            <CategoryList />
        ),
    },
    {
        path: "categories/new",
        element: (

            <AddCategory />

        ),
    },
    {
        path: "categories/edit/:id",
        element: (

            <AddCategory />

        ),
    },
    {
        path: "category-details",
        element: (

            <CategoryDetails />

        ),
    },
    {
        path: "category-details/new",
        element: (

            <AddCategoryDetail />

        ),
    },
    {
        path: "category-details/edit/:id",
        element: (

            <AddCategoryDetail />

        ),
    },
    {
        path: "Product-attribute",
        element: (

            <ProductAttribute />

        ),
    },
    {
        path: "brands",
        element: (

            <BrandList />

        ),
    },
    {
        path: "brands/new",
        element: (

            <AddBrand />

        ),
    },
    {
        path: "brands/edit/:id",
        element: (

            <AddBrand />

        ),
    },
    // {path: "join",
    //     element:  <Outlet />,
    //     children: [
    //         { path: "", element: <ExcludeAuthRoute scope={Scope.ADMIN_USER}> <AdminLogin /> </ExcludeAuthRoute>, },
    //         { path: "login", element: <ExcludeAuthRoute scope={Scope.ADMIN_USER}> <AdminLogin /> </ExcludeAuthRoute> },
    //     ]
    // }
]

const AdminLayout = () => {
    const location = useLocation();

    const dispatch = useDispatch();
    const {
        appState: { isOpenLeftBar },
        authState: { auth },
    } = useSelector((state: RootState) => state);

    const navigate = useNavigate();

    const [isAdmin, setAdmin] = useState(false);

    const [activeItem, setActiveItem] = useState(0);


    const sidebarLinks: SidebarDataType[] = [
        {
            name: "Dashboard",
            to: "/admin/dashboard",
            icon: ()=> <img className="w-4" src={staticImagePath("icons/dashboard-3.svg")} />,
            iconClassName: "text-xl mr-1",
        },
        {
            section: "Order Management",
            items: [
                {
                    name: "Orders",
                    icon: ()=> <img className="w-4" src={staticImagePath("icons/orders.svg")} />,
                    subItems: [
                        {label: "All", value: 14},
                        {label: "Pending", value: 14},
                        {label: "Confirmed", value: 0},
                        {label: "Packaging", value: 4},
                        {label: "Out For Delivery", value: 1},
                        {label: "Delivered", value: 1},
                        {label: "Returned", value: 6},
                        {label: "Failed To Deliver", value: 1},
                        {label: "Canceled", value: 1},
                    ],
                },
                {
                    name: "Refund Request List",
                    to: "/",
                    icon: ()=> <img className="w-5" src={staticImagePath("icons/icons----- (6).svg")} />,
                    subItems: [
                        {label: "Pending", value: 10},
                        {label: "Approved", value: 10},
                        {label: "Refunded", value: 10},
                        {label: "Rejected", value: 10},
                    ],
                },
            ],
        },
        {
            section: "Product Management",
            items: [
                {name: "Products", to: "/admin/products",  icon: ()=> <img className="w-5" src={staticImagePath("icons/icons----- (1).svg")} />},
                {name: "Add", to: "/admin/products/new",  icon: ()=> <img className="w-5" src={staticImagePath("icons/icons----- (5).svg")} />}
            ],
        },
        {
            section: "Category Management",
            items: [
                {name: "Categories", to: "/admin/categories",  icon: ()=> <img className="w-5" src={staticImagePath("icons/icons----- (4).svg")} />},
                {name: "CategoryDetails", to: "/admin/category-details",  icon: ()=> <img className="w-5" src={staticImagePath("icons/icons----- (4).svg")} />}
            ],
        },{
            section: "Attribute Management",
            items: [
                {name: "Attributes", to: "/admin/Product-attribute",
                    icon: ()=> <img className="w-5" src={staticImagePath("icons/icons----- (2).svg")} />
                },
                // {name: "Add", to: "/admin/dashboard/Product-attribute/new", icon: <BiPlus/>}
            ],
        },
        {
            section: "Brand Management",
            items: [
                {name: "Brands", to: "/admin/brands",
                    icon: ()=> <img className="w-5" src={staticImagePath("icons/icons----- (3).svg")} />

                }
            ],
        },
        {
            section: "HELP & SUPPORT SECTION",
            items: [{name: "Messages", icon: <FiMail/>}],
        }
    ];
    // const sidebarLinks = [
        // { label: "CustomerDashboard", roles: ["SELLER", "BUYER", "ADMIN"], to: "/dashboard", icon:  <Image imgClass="" className="w-5" src="/icons/dashboard2.svg" />},
    // ];

    // useEffect(() => {
    //     let linkIndex = sidebarLinks.findIndex((link) => location.pathname === link.to);
    //     if (linkIndex !== -1) {
    //         setActiveItem(linkIndex);
    //     }
    // }, [location.pathname]);

    return (
        <div className="">
            <div className="">
                <DashboardNavigation auth={auth} />

                <div className="mx-auto">
                    <div className="flex">
                        <DashboardSidebar sidebarData={sidebarLinks} isOpenLeftBar={isOpenLeftBar} auth={auth} />

                        <div className="container !px-3">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminLayout;
