import React, {lazy, Suspense, useContext, useState} from 'react'
import {useParams, Link, Route, Outlet, useLocation,} from "react-router-dom"
import {nonInitialEffect} from "src/reactTools"

import {useDispatch, useSelector} from "react-redux"
import "./Dashboard.scss"
import {
    BiStar,
    BiUser,
    BsGear, FaAddressBook, FaIcons,
    FaQuestionCircle, FaSignOutAlt, FiMail, FiShoppingCart, GiCancel,
    GiHelp, GiReturnArrow, GoReport,
    GrOrderedList,
    MdDashboard,
    MdFavorite, MdManageAccounts, MdPayment
} from "react-icons/all";


import staticImagePath from "src/utills/staticImagePath";
import DashboardSidebar, {SidebarDataType} from "pages/shared/DashboardSidebar/DashboardSidebar";
import useAppSelector from "src/hooks/useAppSelector";


// const AddressBook = lazy(()=> import("./AddressBook/AddressBook"))
// const Orders = lazy(()=> import("./Orders/Orders"))
// const OrderDetails = lazy(()=> import("./OrderDetails/OrderDetails"))
// const AccountDetail = lazy(()=> import("./AccountDetail/AccountDetail"))
// const CustomerDashboard = lazy(()=> import("./CustomerDashboard"))
// const CreateSellerAccount = lazy(()=>import("../SellerHub/createSellerAccount/CreateSellerAccount"))


const sidebarLinks: SidebarDataType[] = [
    {
        name: "Dashboard",
        to: "/dashboard",
        icon: () => <img className="w-4" src={staticImagePath("icons/dashboard-3.svg")}/>,
        iconClassName: "text-xl mr-1",
    },
    {
        section: "My Account",
        icon: <BiUser/>,
        items: [
            {name: "Account Information", to: `/dashboard/account`, icon: <MdManageAccounts/>},
            {name: "Address Book", to: `/dashboard/address-books`, icon: <FaAddressBook/>},
            {name: "Vouchers", to: "/dashboard/vouchers", icon: <GoReport/>},
        ],
    },
    {
        section: "Order Management",
        items: [
            {name: "My Orders", to: `/dashboard/orders`, icon: <FaIcons/>, },
            {name: "My Returns", to: "/dashboard/orders", icon: <GiReturnArrow/>, },
            {name: "My Cancellations", to: "/dashboard/orders", icon: <GiCancel/>, },
        ],
    },
    {
        name: "My Shopping Cart",
        to: "/dashboard/cart",
        icon: <FiShoppingCart/>,
    },
    {
        name: "My Reviews",
        to: "",
        icon: <BiStar/>,
    },
    {
        name: "My Wishlist & Followed Stores",
        to: "/dashboard/wishlist",
        icon: <MdFavorite/>,
    },
    {
        name: "Setting",
        to: "",
        icon: <BsGear/>,
    },
    {
        name: "Policies",
        to: "",
        icon: <FaQuestionCircle/>,
    },
    {
        name: "Help",
        to: "",
        icon: <GiHelp/>,
    },
    {
        name: "Sign Out",
        to: "",
        icon: <FaSignOutAlt/>,
    },
];



const CustomerDashboard = (props) => {

    let params = useParams()

    const location = useLocation();
    // let history = useHistory()
    const dispatch = useDispatch()

    const {authState: {auth}, appState: {isOpenLeftBar}} = useAppSelector(state => state)


    // React.useEffect(() => {
    //     let a: any = location.pathname.lastIndexOf("/");
    //     if (a !== -1) {
    //         a = location.pathname.slice(a)
    //     }
    //     let isFound = false
    //     sidebarLinks.forEach(item => {
    //
    //         if (item.to) {
    //             let index = item.to.indexOf(a)
    //
    //             if (index !== -1) {
    //                 setCurrentPage(item.id.toString())
    //                 isFound = true
    //                 return;
    //
    //             } else {
    //
    //                 if (!isFound && item.items) {
    //                     item.items.forEach(subItem => {
    //                         if (subItem.to && subItem.to.indexOf(a) !== -1) {
    //                             if (subItem.name) {
    //                                 setCurrentPage(subItem.name.toString())
    //                                 return;
    //                             }
    //                         }
    //                     })
    //                 }
    //             }
    //         }
    //     })
    //
    //
    // }, [location.pathname])

    // React.useEffect(()=>{
    //   if(contextState.windowWidth > 800){
    //     setInline(false)
    //   } else {
    //     setInline(true)
    //   }
    // }, [contextState.windowWidth])


    nonInitialEffect(() => {
        if (!auth) {
            // history.push("/auth/login?redirect=dashboard")
        }
    }, [auth])


    return (
        <div className="">
            <div className="mx-auto">
                <div className="flex">
                    <DashboardSidebar sidebarData={sidebarLinks} isOpenLeftBar={isOpenLeftBar} auth={auth}/>

                    <div className="container !px-3">
                        <Suspense fallback={<h1>Hi loading</h1>}>
                            <Outlet/>
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CustomerDashboard
