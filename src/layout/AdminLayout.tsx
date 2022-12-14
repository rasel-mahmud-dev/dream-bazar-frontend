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

const AdminLayout = () => {

    const location = useLocation();

    const dispatch = useDispatch();
    const {
        appState: { isOpenLeftBar },
        authState: { auth },
    } = useSelector((state: RootState) => state);

    const navigate = useNavigate()

    const [isAdmin, setAdmin] = useState(true)


    useEffect(() => {

        // make auth fetch false because you visit admin dashboard site
        dispatch({
            type: ACTION_TYPES.RESET_AUTH_LOADING
        })

        currentAuthAction(dispatch,  (errorMessage, user)=>{
            if(errorMessage || !user.roles.includes(Scope.ADMIN_USER)){
                // navigate("/admin/join/login")
                // setAdmin(false)
            } else {
                // setAdmin(true)
            }
        });

    }, []);



    const [activeItem, setActiveItem] = useState(0);

    const sidebarLinks = [
        // { label: "Dashboard", roles: ["SELLER", "BUYER", "ADMIN"], to: "/dashboard", icon:  <Image imgClass="" className="w-5" src="/icons/dashboard2.svg" />},
    ];

    // useEffect(() => {
    //     let linkIndex = sidebarLinks.findIndex((link) => location.pathname === link.to);
    //     if (linkIndex !== -1) {
    //         setActiveItem(linkIndex);
    //     }
    // }, [location.pathname]);



    return (
        <div className="">
            <div className="">
                <Navigation admin={null} />

                <div className="container mx-auto">
                    <div className="flex">
                        <AdminSidebar isOpenLeftBar={isOpenLeftBar} auth={isAdmin && auth} />

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