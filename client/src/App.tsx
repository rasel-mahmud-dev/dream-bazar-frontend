import * as React from "react";
import {Suspense, useContext, useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import "./App.scss";
import "./styles/shared.scss";
import {Outlet} from "react-router-dom";
import {TopProgressBar} from "components/UI";

import Navigation from "components/Navigation/Navigation";
import Footer from "components/Footer/Footer";

import actions from "./store/actions";
import CategoryNavbar from "components/categoryNavbar/CategoryNavbar";
import {AppContext} from "store/AppContext";
import {setLanguage, toggleTheme} from "actions/appContextActions";
import {currentAuthAction} from "actions/authAction";
import { Scope} from "store/types";

const {closeNotify} = actions;

function App(props) {
    
    const [afterNavHeight, setNavHeight] = React.useState(0);
    
    // const history = useHistory()
    const dispatch = useDispatch();
    const [pathname, setPathname] = React.useState<string>("");
    
    const {contextState, contextDispatch} = useContext<any>(AppContext);
    
    useEffect(() => {
        let header = document.querySelector(".navigation") as HTMLDivElement;
        if (header && header.offsetHeight) {
            setNavHeight(header.offsetHeight);
        }
    }, [props.innerWidth]);
    
    useEffect(() => {
        currentAuthAction(dispatch, Scope.USER);
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
        <div className="App">
      
                <Navigation/>
                <div className="app-content">
                    {showBigCategoryNav(pathname) && <CategoryNavbar/>}
                    <Suspense fallback={<TopProgressBar/>}>
                        <Outlet/>
                    </Suspense>
                </div>
                <Footer/>
           
		</div>
    );
}

function mapStateToProps(state) {
    return {appState: state.appState};
}

export default connect(mapStateToProps, {closeNotify})(App);

// https://prestashopdemosite.com/theme/at_premiumo/demo/en/
