import React, {lazy, Suspense, useEffect, useState} from "react";

import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {fetchShopInfo} from "actions/userAction";
import {useSelector} from "react-redux";
import {RootState} from "src/store";
import DashboardSidebar from "pages/shared/DashboardSidebar/DashboardSidebar";

import useAppDispatch from "src/hooks/useAppDispatch";
import {BiCart, BiNote, BiPlus, FiMail} from "react-icons/all";
import DashboardNavigation from "pages/shared/DashboardNavigation/DashboardNavigation";
import Footer from "components/Footer/Footer";
import PrivateRoute from "src/middleware/PrivateRoute";
import {Roles, Scope} from "store/types";
import CreateShop from "pages/shared/Shop/CreateShop";
import AddProduct from "pages/shared/AddProduct/AddProduct";
import AllProductsLite from "pages/shared/AllProducts/AllProductsLite";
import SellerProducts from "pages/sellerDashboard/sellerProducts/SellerProducts";


const ShopInfo = lazy(() => import("pages/shared/Shop/ShopInfo"));
const SellerDashboardHome = lazy(() => import("pages/sellerDashboard/dashboardHome/DashboardHome"));


export const sellerRoute = [
    {
        path: "",
        element: (
            <PrivateRoute scope={Scope.SELLER_USER}>
                <SellerDashboardHome/>
            </PrivateRoute>
        ),
    },
    {
        path: "dashboard",
        element: <PrivateRoute scope={Scope.SELLER_USER}><SellerDashboardHome/> </PrivateRoute>

    },
    {
        path: "products",
        element: (
            <PrivateRoute scope={Scope.SELLER_USER}>
                <SellerProducts scope={Scope.SELLER_USER}/>
            </PrivateRoute>
        ),
    },
    {
        path: "products/new",
        element: (
            <PrivateRoute scope={Scope.SELLER_USER}>
                <AddProduct roleFor={Roles.SELLER} />
            </PrivateRoute>
        ),
    },
    {
        path: "products/edit/:productId",
        element: (
            <PrivateRoute scope={Scope.SELLER_USER}>
                <AddProduct roleFor={Roles.SELLER}  />
            </PrivateRoute>
        ),
    },
    {
        path: "shop",
        element: (
            <PrivateRoute scope={Scope.SELLER_USER}>
                <ShopInfo/>
            </PrivateRoute>
        ),
    },
    {
        path: "shop/new",
        element: (
            <PrivateRoute scope={Scope.SELLER_USER}>
                <CreateShop/>
            </PrivateRoute>
        ),
    },
    {
        path: "shop/edit",
        element: (
            <PrivateRoute scope={Scope.SELLER_USER}>
                <CreateShop isUpdate={true}/>
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

]


const SellerLayout = () => {

    const location = useLocation();

    const dispatch = useAppDispatch();
    const {
        appState: {isOpenLeftBar},
        authState: {auth},
    } = useSelector((state: RootState) => state);

    const navigate = useNavigate()

    const [isAdmin, setAdmin] = useState(false)

    const [activeItem, setActiveItem] = useState(0);

    const sidebarLinks = [
        {
            section: "ORDER MANAGEMENT",
            items: [
                {
                    name: "Orders", icon: <BiCart/>,
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
                    name: "Refund Request List", to: "/", icon: <BiNote/>, subItems: [

                        {label: "Pending", value: 10},
                        {label: "Approved", value: 10},
                        {label: "Refunded", value: 10},
                        {label: "Rejected", value: 10},

                    ]
                },
            ],
        },
        {
            section: "PRODUCT MANAGEMENT",
            items: [
                {name: "Products", to: "/seller/products", icon: <BiCart/>},
                {name: "Add", to: "/seller/products/new", icon: <BiPlus/>},
                {name: "Bulk import", to: "/", icon: <BiNote/>},
            ],
        },
        {
            section: "HELP & SUPPORT SECTION",
            items: [
                {name: "Messages", icon: <FiMail/>}
            ]
        }, {
            section: "BUSINESS SECTION",
            items: [

                {name: "Withdraws", to: ""},
                {name: "My Bank Info", to: ""},
                {name: "My Shop", to: "/seller/shop"},
            ]
        },
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

    useEffect(() => {
        if (auth) {
            dispatch(fetchShopInfo())
        } else {


        }
    }, [auth])


    return (
        <div className="">
            <div className="">
                <DashboardNavigation auth={auth}/>

                <div className="mx-auto">
                    <div className="flex">
                        <DashboardSidebar sidebarData={sidebarLinks} isOpenLeftBar={isOpenLeftBar} auth={auth}/>

                        <div className="container !px-3">
                            <Suspense fallback={<h1>Hi loading</h1>}>
                                <Outlet/>
                            </Suspense>

                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default SellerLayout;