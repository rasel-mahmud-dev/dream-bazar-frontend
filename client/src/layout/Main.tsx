import React, {lazy, Suspense} from "react";
import Navigation from "../components/Navigation/Navigation";
import {Outlet} from "react-router-dom";
import Footer from "components/Footer/Footer";

import {TopProgressBar} from "UI/index";
import ExcludeAuthRoute from "src/middleware/ExcludeAuthRoute";
import ProductDetailLite from "pages/main/productDetails/ProductDetailLite";
import {Scope} from "store/types";
import AuthCallback from "pages/main/auth/AuthCallback";
import BottomMobileNav from "components/BottomMobileNav/BottomMobileNav";

const Orders = lazy(() => import( "pages/shared/Orders/Orders"));
const Wishlist = lazy(() => import( "pages/customerDashboard/wishlist/Wishlist"));
const ShoppingCart = lazy(() => import( "pages/customerDashboard/cart/ShoppingCart"));
const AccountDetail = lazy(() => import( "pages/customerDashboard/AccountDetail/AccountDetail"));
const AddressBook = lazy(() => import( "pages/customerDashboard/AddressBook/AddressBook"));
const AddShippingAddress = lazy(() => import( "pages/customerDashboard/AddressBook/AddAddressBook"));
const HomePage = lazy(() => import( "pages/main/homePage/HomePage"));
const ProductFilterPageLite = lazy(() => import( "pages/main/productFilterPage/ProductFilterPageLite"));
const ShopDetail = lazy(() => import( "pages/main/ShopDetail/ShopDetail"));
const JoinHome = lazy(() => import( "pages/main/auth/JoinHome"));
const LoginPage = lazy(() => import( "pages/shared/LoginPage"));
const Registration = lazy(() => import( "pages/shared/Registration"));
const CustomerDashboard = lazy(() => import( "pages/customerDashboard/CustomerDashboard"));
const CustomerDashboardHomePage = lazy(() => import( "pages/customerDashboard/CustomerDashboardHomePage"));

export const mainRoute = [
    {
        path: "/",
        element: <HomePage/>,
    },
    {
        path: "p/:pId",
        element: <ProductFilterPageLite/>,
    },
    {
        path: "shop/:shopName",
        element: <ShopDetail/>,
    },
    {
        path: "/join",
        element: (
            <ExcludeAuthRoute>
                <JoinHome/>
            </ExcludeAuthRoute>
        ),
        children: [
            {path: "login", element: <LoginPage/>},
            {path: "signup", element: <Registration/>},
            // { path: "reset-password", element: <ResetPassword /> },
            // { path: "forget-password", element: <ForgetPassword /> },
            // { path: "opt-validate", element: <OTPValidate /> },
        ],
    },
    {
        path: "/auth/callback/:provider",
        element: <ExcludeAuthRoute scope={Scope.CUSTOMER_USER}><AuthCallback/></ExcludeAuthRoute>
    },
    {
        path: "/dashboard",
        element: <CustomerDashboard/>,
        // errorElement: <ErrorPage />,
        children: [
            // { path: "update-Product/:productId", element: <PrivateRoute roles={["SELLER"]}> <AddProduct /> </PrivateRoute> },
            // { path: "all-transactions", element: <PrivateRoute roles={["ADMIN"]}> <AllTransactions /> </PrivateRoute> },

            {path: "", element: <CustomerDashboardHomePage/>},
            {path: "orders", element: <Orders/>},
            {path: "wishlist", element: <Wishlist/>},
            {path: "cart", element: <ShoppingCart/>},
            {path: "account", element: <AccountDetail/>},
            {path: "address-books", element: <AddressBook/>},
            {path: "address-books/add", element: <AddShippingAddress isOpen={false}/>}
            // {
            //     path: "brand",
            //     element: (
            //         <PrivateRoute scope={Scope.ADMIN_USER}>
            //             <ProductList />
            //         </PrivateRoute>
            //     ),
            // },
        ],
    },
    {path: "cart", element: <ShoppingCart renderOnDashboard={false}/>},
    {path: "m/carts", element: <ShoppingCart renderOnDashboard={false}/>},
    {path: "wishlist", element: <Wishlist renderOnDashboard={false}/>},
    {
        path: "/:slug",
        element: <ProductDetailLite/>,
    },
]

const Main = () => {

    return (
        <>
            <div className="slot-root ">
                <Navigation/>
                <div className="app-content">
                    <Suspense fallback={<TopProgressBar/>}>
                        <Outlet/>
                    </Suspense>
                        <BottomMobileNav/>

                </div>
                <Footer/>


            </div>
        </>
    );
};

export default Main;
