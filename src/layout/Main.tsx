import React, { Suspense } from "react";
import Navigation from "../components/Navigation/Navigation";
import { Outlet } from "react-router-dom";
import Footer from "components/Footer/Footer";
import CategoryNavbar from "components/categoryNavbar/CategoryNavbar";
import { TopProgressBar } from "UI/index";


import {  useContext, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";


import { AppContext } from "store/AppContext";
import { setLanguage, toggleTheme } from "actions/appContextActions";
import { currentAuthAction } from "actions/authAction";


import { RootState } from "src/store";


const Main = (props) => {
    const appState = useSelector((state: RootState) => state.appState);

    const [afterNavHeight, setNavHeight] = React.useState(0);

    // const history = useHistory()
    const dispatch = useDispatch();
    const [pathname, setPathname] = React.useState<string>("");

    const { contextState, contextDispatch } = useContext<any>(AppContext);

    useEffect(() => {
        let header = document.querySelector(".navigation") as HTMLDivElement;
        if (header && header.offsetHeight) {
            setNavHeight(header.offsetHeight);
        }
    }, [props.innerWidth]);

    useEffect(() => {
        currentAuthAction(dispatch, ()=>{});
        setLanguage("", contextDispatch);
        toggleTheme("", contextDispatch);
    }, []);

    function showBigCategoryNav(pathName) {
        let p = ["/p/s", "/p", "/p/", "/products/"];
        let isShow: boolean | number = false;

        for (let i = 0; i < p.length; i++) {
            if (pathName.startsWith(p[i])) {
                isShow = true;
                break;
            }
        }
        return isShow;
    }

    return (
        <div className="slot-root">
            <Navigation />
            <div className="app-content">
                {/*{showBigCategoryNav(pathname) && <CategoryNavbar />}*/}
                <CategoryNavbar />
                <Suspense fallback={<TopProgressBar />}>
                    <Outlet />
                </Suspense>
            </div>
            <Footer />
        </div>
    );
};

export default Main;
