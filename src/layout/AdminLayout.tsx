import React, {lazy, ReactNode, useEffect, useState} from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { Outlet } from "react-router-dom";
import { currentAuthAction } from "actions/authAction";
import { setLanguage, toggleTheme } from "actions/appContextActions";
import { useDispatch, useSelector } from "react-redux";
import Footer from "components/Footer/Footer";

import Navigation from "pages/shared/Navigation";
import { RootState } from "src/store";
import {ACTION_TYPES, AuthType, Scope} from "store/types";
import DashboardSidebar, {SidebarDataType} from "pages/shared/DashboardSidebar/DashboardSidebar";
import {BiCart, BiNote, BiPlus, BsList, FiMail, MdOutlineSpaceDashboard} from "react-icons/all";



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
            to: "/admin/dashboard/dashboard",
            icon: <MdOutlineSpaceDashboard/>,
            iconClassName: "text-xl mr-1",
        },
        {
            section: "ORDER MANAGEMENT",
            items: [
                {
                    name: "Orders",
                    icon: <BiCart/>,
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
                    icon: <BiNote/>,
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
            section: "PRODUCT MANAGEMENT",
            items: [
                {name: "Products", to: "/admin/dashboard/products", icon: <BiCart/>},
                {name: "Add", to: "/admin/dashboard/products/new", icon: <BiPlus/>}
            ],
        },
        {
            section: "CATEGORY MANAGEMENT",
            items: [
                {name: "Categories", to: "/admin/dashboard/categories", icon: <BiCart/>},
                {name: "CategoryDetails", to: "/admin/dashboard/category-details", icon: <BiCart/>}
            ],
        },{
            section: "ATTRIBUTE MANAGEMENT",
            items: [
                {name: "Attributes", to: "/admin/dashboard/Product-attribute", icon: <BsList/>},
                // {name: "Add", to: "/admin/dashboard/Product-attribute/new", icon: <BiPlus/>}
            ],
        },
        {
            section: "BRAND MANAGEMENT",
            items: [
                {name: "Brands", to: "/admin/dashboard/brands", icon: <BiCart/>}
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
                <Navigation auth={auth} />

                <div className="container mx-auto">
                    <div className="flex">
                        <DashboardSidebar sidebarData={sidebarLinks} isOpenLeftBar={isOpenLeftBar} auth={auth} />

                        <div className="w-full ml-0 lg:ml-6">
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
