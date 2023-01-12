import React, { Suspense } from "react";
import Navigation from "../components/Navigation/Navigation";
import { Outlet } from "react-router-dom";
import Footer from "components/Footer/Footer";

import { TopProgressBar } from "UI/index";


import {  useContext, useEffect, useState } from "react";


const Main = (props) => {


    const [afterNavHeight, setNavHeight] = React.useState(0);


    useEffect(() => {
        let header = document.querySelector(".navigation") as HTMLDivElement;
        if (header && header.offsetHeight) {
            setNavHeight(header.offsetHeight);
        }
    }, [props.innerWidth]);


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
                <Suspense fallback={<TopProgressBar />}>
                    <Outlet />
                </Suspense>
            </div>
            <Footer />
        </div>
    );
};

export default Main;
