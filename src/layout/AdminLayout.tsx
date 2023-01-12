import React, {lazy, ReactNode, useEffect, useState, Suspense} from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Footer from "components/Footer/Footer";

import { RootState } from "src/store";
import DashboardSidebar, {SidebarDataType} from "pages/shared/DashboardSidebar/DashboardSidebar";
import { BiCart, BiNote, BiPlus, BsList, FiMail, MdOutlineSpaceDashboard} from "react-icons/all";
import staticImagePath from "src/utills/staticImagePath";
import DashboardNavigation from "pages/shared/DashboardNavigation/DashboardNavigation";
import PrivateRoute from "src/middleware/PrivateRoute";
import {Scope} from "store/types";
import BrandListSkeleton from "pages/adminDashboard/brandList/BrandList.Skeleton";
import BrandListLite from "pages/adminDashboard/brandList/BrandListLite";
import CategoryDetail from "pages/adminDashboard/categoryList/CategoryDetail";
import useAppSelector from "src/hooks/useAppSelector";
import AllProductsLite from "pages/shared/AllProducts/AllProductsLite";
import ShopInfo from "pages/shared/Shop/ShopInfo";
import CreateShop from "pages/shared/Shop/CreateShop";
import StoreList from "pages/shared/Shop/StoreList";
import useAppDispatch from "src/hooks/useAppDispatch";
import {fetchShopInfo} from "actions/authAction";

const AdminDashboardHome = lazy(() => import("pages/adminDashboard/DashboardHomePage"));

const AddCategory = lazy(() => import("pages/adminDashboard/categoryList/AddCategory"));

const ProductAttribute = lazy(() => import("pages/adminDashboard/productAttribute/ProductAttribute"));
const AllProducts = lazy(() => import("pages/shared/AllProducts/AllProducts"));
const AddBrand = lazy(() => import("pages/adminDashboard/brandList/AddBrand"));
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
                <AllProductsLite />
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
        path: "product/edit/:productId",
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
        path: "categories/:id",
        element: (
            <CategoryDetail />
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

            <>
                <BrandListLite />

            </>

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
    {
        path: "shop",
        element: (

            <ShopInfo />

        ),
    },
    {
        path: "store-list",
        element: (

            <StoreList />

        ),
    },
    {
        path: "shop/new",
        element: (

            <CreateShop />

        ),
    },
    {
        path: "shop/edit",
        element: (

            <CreateShop isUpdate={true} />

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

    const dispatch = useAppDispatch();
    const {
        appState: { isOpenLeftBar },
        authState: { auth },
    } = useAppSelector(state => state);

    const navigate = useNavigate();

    const [isAdmin, setAdmin] = useState(false);

    const [activeItem, setActiveItem] = useState(0);



    useEffect(()=>{
        if(auth){
            dispatch(fetchShopInfo())
        }else{

        }
    }, [auth])



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
                {name: "Add", to: "/admin/product/new",  icon: ()=> <img className="w-5" src={staticImagePath("icons/icons----- (5).svg")} />}
            ],
        },
        {
            section: "Category Management",
            items: [
                {name: "Categories", to: "/admin/categories",  icon: ()=> <img className="w-5" src={staticImagePath("icons/icons----- (4).svg")} />},
                {name: "Add Category", to: "/admin/categories/new",  icon: ()=> <img className="w-5" src={staticImagePath("icons/icons----- (4).svg")} />}
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
            section: "Store Management",
            items: [
                {name: "All Store", to: "/admin/store-list",
                    icon: ()=> <img className="w-5" src={staticImagePath("icons/icons----- (3).svg")} />

                },
                {name: "Dream Store", to: "/admin/shop",
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
                        <DashboardSidebar sidebarData={sidebarLinks} isOpenLeftBar={isOpenLeftBar}  auth={auth}/>

                        <div className="container !px-3">
                            <Suspense fallback={<h1>Hi loading</h1>}>
                                <Outlet />
                            </Suspense>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminLayout;
