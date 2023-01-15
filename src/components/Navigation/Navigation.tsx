import React, { lazy, Suspense, useContext, useEffect, useRef, useState } from "react";
import "./Navigation.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Button, Image, Menu, OnScroll, Popup, Typography } from "components/UI";
// import ProductCategoryDropdown from "components/ProductCategoryDropdown/ProductCategoryDropdown"
import fullLink from "src/utills/fullLink";

import {
    BiChevronsDown,
    BiSearch,
    BiUser,
    BsGithub,
    FaBars,
    FaFacebook,
    FaHeart,
    FaLanguage,
    FaSignInAlt,
    FiMoon,
    GiShoppingBag,
    GrOrderedList,
    IoLanguageOutline,
    MdFavorite,
} from "react-icons/all";

import { RootState } from "src/store";


import useLanguage from "src/hooks/useLanguage";
import staticImagePath from "src/utills/staticImagePath";
import CartDropdown from "components/Navigation/CartDropdown";
import { ACTION_TYPES, Roles, Scope } from "store/types";
import Circle from "UI/Circle/Circle";
import MobileCartSidebar from "components/Navigation/MobileCartSidebar";
import useWindowResize from "src/hooks/useWindowResize";
import { logoutAction } from "actions/authAction";
import useAppSelector from "src/hooks/useAppSelector";
import {setLanguageAction, toggleThemeAction} from "actions/appAction";
import useAppDispatch from "src/hooks/useAppDispatch";

const AuthDropdown = lazy(() => import("../Dropdown/AuthDropdown"));
const MoreDropdown = lazy(() => import("components/Navigation/MoreDropdown"));

const Title = Typography.Title.default;

function Navigation(props) {
    const {
        authState: { auth },
        appState: {lang, theme},
        cartState,
    } = useAppSelector(state=> state);

    const dispatch = useAppDispatch();

    // const { contextState, contextDispatch } = useContext<any>(AppContext343434);

    const l = useLanguage();
    const windowWidth = useWindowResize();

    const news = "From Yesterday our Online Shop will be Shutdown until Government don't declare next info.";

    const [isFixed, setFixed] = useState(false);

    const [state, setState] = useState({
        openDropdown: "",
        openMobileRightSidebar: false,
    });

    const headerRef = useRef<HTMLDivElement>();

    function handlerWindowResize() {
        // if (window.innerWidth > 600 && window.innerWidth < 1000) {
        //     contextDispatch({
        //         type: ACTION_TYPES.SET_DEVICE_TYPE,
        //         payload: DeviceType.TABLET,
        //     });
        // } else if (window.innerWidth < 600) {
        //     contextDispatch({
        //         type: ACTION_TYPES.SET_DEVICE_TYPE,
        //         payload: DeviceType.MOBILE,
        //     });
        // } else {
        //     contextDispatch({
        //         type: ACTION_TYPES.SET_DEVICE_TYPE,
        //         payload: DeviceType.DESKTOP,
        //     });
        // }
        // contextDispatch({
        //     type: ACTION_TYPES.SET_WINDOW_WIDTH,
        //     payload: window.innerWidth,
        // });
    }

    // observation window resize
    useEffect(() => {
        if (headerRef.current) {
            document.documentElement.style.setProperty(`--header-height`, headerRef.current.offsetHeight + "px");
        }

        handlerWindowResize();
    }, [headerRef.current, windowWidth]);

    React.useEffect(() => {
        //console.log(props.offsetTop)
        if (props.offsetTop > 100) {
            setFixed(true);
        } else {
            setFixed(false);
        }
    }, [props.offsetTop]);

    function handleChangeTheme(e) {
        dispatch(toggleThemeAction(e.target.value));
    }

    function handleChangeLanguage(e) {
        dispatch(setLanguageAction(e.target.value))
    }


    function closeMobileRightSidebar() {
        setState(prev=>({...prev, openMobileRightSidebar: false}));
    }

    function openMobileRightSidebar() {
        if (window.innerWidth < 1024) {
            setState((prevState) => ({
                ...prevState,
                openMobileRightSidebar: true,
            }));
        }
    }


    return (
        <div className="header_space">
            <div ref={headerRef} className={["navigation", isFixed ? "nav_fixed" : ""].join(" ")}>
                {/* top navigation */}
                <div className="bg-white dark:bg-neutral-800 py-1 hidden lg:block">
                    <div className="grid grid-cols-12 justify-between w-full max-w-8xl mx-auto px-4">
                        <div className="col-span-2 flex items-center gap-x-4  dark:text-white">
                            <FaFacebook />
                            <BsGithub />
                            <FaFacebook />
                            <BsGithub />
                            <FaLanguage />
                        </div>

                        <div className="col-span-8">
                            {/* @ts-ignore */}
                            <marquee>
                                <h6 className="dark:text-white">{news}</h6>
                                {/* @ts-ignore */}
                            </marquee>
                        </div>

                        <div className="col-span-2 flex w-full gap-x-4">
                            <li className="flex items-center justify-end dark:text-white">
                                <IoLanguageOutline className="text-md" />
                                <select
                                    onChange={handleChangeLanguage}
                                    name=""
                                    id=""
                                    value={lang}
                                    className="dark:bg-neutral-600 dark:text-white"
                                >
                                    <option value="bn">{l("Bangla")}</option>
                                    <option value="en">{l("English")}</option>
                                </select>
                            </li>
                            <li className="flex items-center justify-end dark:text-white">
                                <FiMoon className="text-md" />
                                <select
                                    onChange={handleChangeTheme}
                                    value={theme}
                                    className="dark:bg-neutral-600 dark:text-white"
                                >
                                    <option value="dark">{l("Dark", "Dark")}</option>
                                    <option value="light">{l("Light", "Light")}</option>
                                    <option value="system">{l("System", "System")}</option>
                                </select>
                            </li>
                            {/*<button onClick={()=>dispatch({type: ACTION_TYPES.CHOOSE_LANGUAGE, payload: "en"})}>EN</button>*/}
                            {/*<button onClick={()=>dispatch({type: ACTION_TYPES.CHOOSE_LANGUAGE, payload: "bn"})}>BN</button>*/}
                        </div>
                    </div>
                </div>

                <div className="main-nav bg-green-450">
                    <div className="max-w-8xl mx-auto px-4 flex items-center">
                        {/*<div className="md:hidden block mr-3 ">*/}
                        {/*    <FaBars className="text-xl text-neutral-100" onClick={handleToggleLeftBar} />*/}
                        {/*</div>*/}

                        <div className="grid grid-cols-12 items-center w-full ">
                            <div className="col-span-2 logo">
                                <Link to="/" className="flex items-center">
                                    <img src="/logo-2.png" alt="" className="w-9 md:w-11" />
                                    <h4 className="text-white font-semibold text-lg md:text-xl   md:block">DreamBajar</h4>
                                </Link>
                            </div>

                            <div className="col-span-6 flex w-full">
                                {/******* <ProductCategoryDropdown /> ********/}

                                {/***** search bar *******/}
                                <div className="hidden items-center  w-full  lg:flex">
                                    <div className="bg-white/30 py-2 px-4 flex justify-between items-center rounded-full w-full">
                                        <div className="flex items-center border-r border-white pr-2">
                                            <select
                                                name=""
                                                id=""
                                                className="bg-transparent text-white outline-none border-none w-auto placeholder-white"
                                            >
                                                <option value="">All</option>
                                                <option value="">Title</option>
                                                <option value="">Brand</option>
                                            </select>
                                            {/*<FaAngleDown className="text-white text-xl" />*/}
                                        </div>
                                        <input
                                            placeholder="Search for products, brand and more"
                                            className="bg-transparent w-full outline-none text-white placeholder-white ml-2 "
                                        />
                                        <BiSearch className="text-white text-xl" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-4 justify-self-end">
                                <div className="flex gap-x-4 items-center ">
                                    {/***** go to seller page **********/}

                                    <Circle
                                        className="relative hover:!bg-gray-100/20 bg-transparent  py-3"
                                        onMouseEnter={() => setState({ ...state, openDropdown: "more" })}
                                        onMouseLeave={() => setState({ ...state, openDropdown: "" })}
                                    >
                                        <BiChevronsDown className="text-neutral-50 text-xl" />
                                        <Suspense fallback={<h1>loading</h1>}>
                                            <MoreDropdown className="left-0 top-8 !shadow-xl rounded-lg" isShow={state.openDropdown === "more"} />
                                        </Suspense>
                                    </Circle>

                                    {/* <li className=" py-5 cursor-pointer">*/}
                                    {/*    <Link className="flex items-center gap-x-2" to="/seller/dashboard">*/}
                                    {/*        <FaStoreAlt className="text-white text-2xl"/>*/}
                                    {/*      <span className="font-medium text-white hidden md:block">*/}
                                    {/*        {l("Seller")}*/}
                                    {/*    </span>*/}
                                    {/*          </Link>*/}
                                    {/*</li>*/}

                                    {/*** mobile search icon *****/}
                                    <li className="md:hidden relative flex items-center gap-x-2">
                                        <div className="flex justify-end ">
                                            <BiSearch className="text-2xl text-white" />
                                        </div>
                                    </li>

                                    <li
                                        className="relative flex items-center gap-x-2 py-5"
                                        onClick={openMobileRightSidebar}
                                        onMouseEnter={() => window.innerWidth > 768 && setState({ ...state, openDropdown: "cart" })}
                                        onMouseLeave={() => window.innerWidth > 768 && setState({ ...state, openDropdown: "" })}
                                    >
                                        <Badge className="bg-blue-500 text-white rounded-full -right-2 px-1.5 absolute top-2">
                                            {cartState.cartProducts.length > 0 ? cartState.cartProducts.length : ""}
                                        </Badge>
                                        <GiShoppingBag className="text-white text-2xl " />

                                        <span className="font-medium text-white hidden md:block">{l("In Cart")}</span>
                                        <Suspense fallback={<h1>loading</h1>}>
                                            <CartDropdown className="right-0 top-14" isShow={state.openDropdown === "cart"} />
                                        </Suspense>
                                    </li>
                                    <MobileCartSidebar isOpen={state.openMobileRightSidebar} handleClose={closeMobileRightSidebar} />


                                    <li className="hidden md:flex items-center gap-x-2 py-5 ">
                                        <FaHeart className="text-white text-2xl" />
                                        <span className="font-medium text-white hidden md:block whitespace-nowrap">{l("Favorite")}</span>
                                    </li>

                                    <li
                                        className="relative flex items-center gap-x-2 py-5  "
                                        onMouseEnter={() => setState({ ...state, openDropdown: "auth" })}
                                        onMouseLeave={() => setState({ ...state, openDropdown: "" })}
                                    >
                                        {auth && auth.avatar ? (
                                            <div className="w-6">
                                                <img className="rounded-full" src={staticImagePath(auth.avatar)} alt="" />
                                            </div>
                                        ) : (
                                            <BiUser className="text-white text-2xl" />
                                        )}

                                        <span className="font-medium text-white hidden md:block">{auth ? auth.firstName : l("Account")}</span>

                                        <Suspense fallback={<h1>loading</h1>}>
                                            <AuthDropdown
                                                auth={auth}
                                                className="right-0 top-10 p-4 !shadow-xl rounded-xl"
                                                isShow={state.openDropdown === "auth"}
                                            >
                                                <Menu>
                                                    {auth ? (
                                                        auth.roles &&
                                                        Array.isArray(auth.roles) && (
                                                            <>
                                                                {auth.roles.includes(Roles.ADMIN) && (
                                                                    <Menu.Item className="flex gap-x-2 items-center text-neutral-700 dark:text-neutral-300 font-normal hover:bg-green-300/20 p-2 cursor-pointer">
                                                                        <BiUser />
                                                                        <Link to={`/admin/dashboard`}>Admin Dashboard</Link>
                                                                    </Menu.Item>
                                                                )}

                                                                {auth.roles.includes(Roles.SELLER) && (
                                                                    <Menu.Item className="flex gap-x-2 items-center text-neutral-700 dark:text-neutral-300 font-normal hover:bg-green-300/20 p-2 cursor-pointer">
                                                                        <BiUser />
                                                                        <Link to={`/seller/dashboard`}>Seller Dashboard</Link>
                                                                    </Menu.Item>
                                                                )}

                                                                {auth.roles.includes(Roles.CUSTOMER) && (
                                                                    <Menu.Item className="flex gap-x-2 items-center text-neutral-700 dark:text-neutral-300 font-normal hover:bg-green-300/20 p-2 cursor-pointer">
                                                                        <BiUser />
                                                                        <Link to={`/dashboard`}>Customer Dashboard</Link>
                                                                    </Menu.Item>
                                                                )}
                                                            </>
                                                        )
                                                    ) : (
                                                        <Menu.Item className="flex gap-x-2 items-center text-neutral-700 dark:text-neutral-300 font-normal hover:bg-green-300/20 p-2 cursor-pointer">
                                                            <BiUser />
                                                            <Link to="/join/login/?redirect=dashboard">My Profile</Link>
                                                        </Menu.Item>
                                                    )}

                                                    <Menu.Item className="flex gap-x-2 items-center text-neutral-700 dark:text-neutral-300 font-normal hover:bg-green-300/20 p-2 cursor-pointer">
                                                        <GrOrderedList />
                                                        <Link to="/auth/customer/dashboard/orders">Order</Link>
                                                    </Menu.Item>
                                                    {/*<Divider lineHeight="1" lineColor="#d1d3d25d"/>*/}

                                                    <Menu.Item className="text-neutral-700 dark:text-neutral-300 font-normal hover:bg-green-300/20 p-2 cursor-pointer">
                                                        <Link to="/auth/customer/dashboard/wishlist" className="flex gap-x-2 items-center ">
                                                            <MdFavorite />
                                                            Wishlist
                                                        </Link>
                                                    </Menu.Item>
                                                    {/*<Divider lineHeight="1" lineColor="#d1d3d25d"/>*/}

                                                    {auth ? (
                                                        <Menu.Item
                                                            onClick={() => logoutAction(dispatch)}
                                                            className="flex gap-x-2 items-center text-neutral-700 dark:text-neutral-300 font-normal hover:bg-green-300/20 p-2 cursor-pointer"
                                                        >
                                                            <FaSignInAlt />
                                                            Logout
                                                        </Menu.Item>
                                                    ) : (
                                                        <Menu.Item className="flex gap-x-2 items-center text-neutral-700 dark:text-neutral-300 font-normal hover:bg-green-300/20 p-2 cursor-pointer">
                                                            <FaSignInAlt />
                                                            <Link to="/join/login/?redirect=home">Login</Link>
                                                        </Menu.Item>
                                                    )}
                                                </Menu>
                                            </AuthDropdown>
                                        </Suspense>
                                    </li>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OnScroll(Navigation, 300, 200);
