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
import { BiCart, BiNote, BiPlus, BsList, FiMail, MdOutlineSpaceDashboard} from "react-icons/all";
import staticImagePath from "src/utills/staticImagePath";
import DashboardNavigation from "pages/shared/Navigation";




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

                        <div className="container">
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
