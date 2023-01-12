import React, {Suspense, useEffect, useRef} from "react";
import {BiBell, BiChevronsDown, BiMoon, BiSearch, BiSun, BsBell, FaBars, FaBell, FaUser} from "react-icons/all";
import {Link, useLocation} from "react-router-dom";
import {toggleLeftSidebarAction, toggleThemeAction} from "actions/appAction";
import {useDispatch} from "react-redux";
import staticImagePath from "src/utills/staticImagePath";
import Circle from "UI/Circle/Circle";

import AuthDropdown from "components/Dropdown/AuthDropdown";
import MoreDropdown from "./MoreDropdown";
import Dropdown from "components/Dropdown/Dropdown";
import {Badge} from "UI/index";
import {logoutAction} from "actions/authAction";
import useAppSelector from "src/hooks/useAppSelector";


import "./styles.scss"

const DashboardNavigation = ({auth}) => {

    const location = useLocation();
    const dispatch = useDispatch();

    const {theme} = useAppSelector(state => state.appState)

    const [state, setState] = React.useState({
        openDropdown: "",
    });

    const headerRef = useRef<HTMLDivElement>(null)

    function handleToggleLeftBar() {
        toggleLeftSidebarAction(dispatch);
    }

    useEffect(() => {
        if (headerRef.current) {
            document.documentElement.style.setProperty(`--header-height`, headerRef.current.offsetHeight + "px")
        }
    }, [headerRef.current])

    function changeChangeTheme() {
        dispatch(toggleThemeAction(theme === "dark" ? "light" : "dark"))
    }


    return (
        <div>
            <div ref={headerRef} className="admin-navigation">
                <header className="container flex items-center justify-between">
                    <div className="logo flex items-center">
                        <Circle className="lg:hidden block  mr-3" onClick={handleToggleLeftBar}>
                            <FaBars className="text-sm"/>
                        </Circle>

                        <Link to="/admin/dashboard" className="flex items-center">
                            <img src="/public/logo-2.png" alt="" className="w-9 md:w-11"/>
                            <h4 className="font-semibold text-lg md:text-xl   md:block">Dream Bazar</h4>
                        </Link>
                    </div>

                    <div className="hidden lg:flex items-center border px-2 py-2.5 w-4/12 mx-auto rounded-lg text-neutral-400 ">
                        <BiSearch className="mr-1 text-lg"/>
                        <input type="text" placeholder="Search" className="w-full outline-none"/>
                    </div>

                    <div className="flex items-center gap-x-1">
                        <Circle><BiSearch className="text-xl  "/></Circle>

                        <Circle onClick={changeChangeTheme}>
                            {theme === "dark" ? <BiSun className="text-xl "/> :
                            <BiMoon className="text-xl "/>}
                        </Circle>
                    </div>

                    <div className="flex items-center gap-x-1">
                        <Circle
                            className="relative py-3"
                            onMouseEnter={() => setState({...state, openDropdown: "notification"})}
                            onMouseLeave={() => setState({...state, openDropdown: ""})}
                        >
                            <Badge
                                className="absolute -top-2 -right-1  rounded-full bg-green-450 px-1 text-white"
                            >
                                10
                            </Badge>
                            <FaBell className="text-neutral-600 text-lg"/>
                            <Suspense fallback={<h1>loading</h1>}>
                                <Dropdown
                                    className="right-0 top-9 !shadow-xl rounded-xl"
                                    isShow={state.openDropdown === "notification"}
                                >
                                    <div className="p-4">
                                        <h1>dfsssssssssss</h1>
                                        <h1>dfsssssssssss</h1>
                                        <h1>dfsssssssssss</h1>
                                        <h1>dfsssssssssss</h1>
                                        <h1>dfsssssssssss</h1>
                                        <h1>dfsssssssssss</h1>
                                        <h1>dfsssssssssss</h1>
                                    </div>
                                </Dropdown>
                            </Suspense>
                        </Circle>


                        <Circle
                            className="relative  py-3"
                            onMouseEnter={() => setState({...state, openDropdown: "more"})}
                            onMouseLeave={() => setState({...state, openDropdown: ""})}
                        >
                            <BiChevronsDown className="text-neutral-600 text-xl"/>
                            <Suspense fallback={<h1>loading</h1>}>
                                <MoreDropdown
                                    className="right-0 top-9 !shadow-xl rounded-xl"
                                    isShow={state.openDropdown === "more"}
                                />
                            </Suspense>
                        </Circle>
                        <li
                            className="relative py-3"
                            onMouseEnter={() => setState({...state, openDropdown: "admin"})}
                            onMouseLeave={() => setState({...state, openDropdown: ""})}
                        >
                            <div className="">
                                {auth && auth.avatar ? (
                                    <div className="w-9">
                                        <img className="rounded-full" src={staticImagePath(auth.avatar)} alt=""/>
                                    </div>
                                ) : (
                                    <Circle>
                                        <FaUser className="text-lg"></FaUser>
                                    </Circle>
                                )}
                            </div>

                            <Suspense fallback={<h1>loading</h1>}>
                                <AuthDropdown
                                    auth={auth}
                                    className="right-0 top-12 p-4 !shadow-xl rounded-xl"
                                    isShow={state.openDropdown === "admin"}
                                >
                                    <div>
                                        {auth ? (
                                            <>
                                                <li className="text-xs pb-2">
                                                    <Link to="/settings">Settings</Link>
                                                </li>
                                                <li className="text-xs pb-2" onClick={() => logoutAction(dispatch)}>Sign out</li>
                                            </>
                                        ) : (
                                            <>
                                                <li className="text-xs">
                                                    <Link to="/join/login" state={{redirect: location.pathname}}>Sign In</Link>
                                                </li>
                                            </>
                                        )}
                                    </div>
                                </AuthDropdown>
                            </Suspense>
                        </li>
                    </div>
                </header>
            </div>
            <div className="header-height"></div>
        </div>
    );
};

export default DashboardNavigation;
