import React, { lazy, useEffect, useState } from "react";

import {useLocation, useNavigate} from "react-router-dom";

import { Outlet } from "react-router-dom";
import { currentAuthAction } from "actions/authAction";
import { setLanguage, toggleTheme } from "actions/appContextActions";
import {useDispatch, useSelector} from "react-redux";
import Footer from "components/Footer/Footer";

import Navigation from "pages/shared/Navigation";
import AdminSidebar from "pages/adminDashboard/adminSidebar/AdminSidebar";
import {RootState} from "src/store";
import {ACTION_TYPES, Scope} from "store/types";
import SellerNavigation from "pages/sellerDashboard/components/sellerNavigation/SellerNavigation";
import SellerSidebar from "pages/sellerDashboard/components/selllerSidebar/SellerSidebar";
import DashboardSidebar from "pages/shared/DashboardSidebar/DashboardSidebar";
import {BiCart, BiNote, BiPlus, FiMail} from "react-icons/all";
import apis from "src/apis";

const AdminLayout = () => {

    const location = useLocation();

    const dispatch = useDispatch();
    const {
        appState: { isOpenLeftBar },
        authState: { auth },
    } = useSelector((state: RootState) => state);

    const navigate = useNavigate()

    const [isAdmin, setAdmin] = useState(false)

    const [activeItem, setActiveItem] = useState(0);

    const sidebarLinks = [
        {
            section: "ORDER MANAGEMENT",
            items: [
                {name: "Orders", icon: <BiCart />,
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
                {name: "Refund Request List", to: "/", icon: <BiNote />, subItems: [

                        {label: "Pending", value: 10},
                        {label: "Approved", value: 10},
                        {label: "Refunded", value: 10},
                        {label: "Rejected", value: 10},

                    ]},
            ],
        },
        {
            section: "PRODUCT MANAGEMENT",
            items: [
                {name: "Products", to: "/seller/products", icon: <BiCart />},
                {name: "Add", to: "/seller/product/add", icon: <BiPlus />},
                {name: "Bulk import", to: "/", icon: <BiNote />},
            ],
        },
        {
            section: "HELP & SUPPORT SECTION",
            items: [
                {name: "Messages", icon: <FiMail />}
            ]
        },{
            section: "BUSINESS SECTION",
            items: [

                {name: "Withdraws", to: ""},
                {name: "My Bank Info", to: ""},
                {name: "My Shop", to: "/seller/shop/view"},
            ]
        },
    ];

    // const sidebarLinks = [
        // { label: "Dashboard", roles: ["SELLER", "BUYER", "ADMIN"], to: "/dashboard", icon:  <Image imgClass="" className="w-5" src="/icons/dashboard2.svg" />},
    // ];


    // useEffect(() => {
    //     let linkIndex = sidebarLinks.findIndex((link) => location.pathname === link.to);
    //     if (linkIndex !== -1) {
    //         setActiveItem(linkIndex);
    //     }
    // }, [location.pathname]);

    useEffect(()=>{
        if(auth){
            apis.get("/api/seller/shop").then(({ data }) => {
                dispatch({
                    type: ACTION_TYPES.FETCH_SELLER_SHOP,
                    payload: data,
                });
            })
                .catch((ex) => {});
        }
    }, [auth])




    return (
        <div>
            <Navigation auth={auth} />
            <div className="container mx-auto">
                <div className="flex ">
                    {/*<PrivateRoute scope={Scope.SELLER_USER}>*/}
                    <DashboardSidebar data={sidebarLinks} isOpenLeftBar={isOpenLeftBar} auth={auth} />
                    {/*</PrivateRoute>*/}
                    <div className="w-full ml-0 lg:ml-6">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;