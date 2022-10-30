import {lazy, Suspense} from "react"

import {Routes, Route, RouterProvider, createBrowserRouter} from "react-router-dom"
import ResetPassword from "pages/auth/ResetPassword";
import JoinHome from "pages/auth/JoinHome";
import ForgetPassword from "pages/auth/ForgetPassword";
import OTPValidate from "pages/auth/OTPValidate";
import Registration from "pages/auth/Registration";
import Login from "pages/auth/Login";


import adminDashboardRoutes from "pages/Admin/adminDashboardRoute";
import customerDashboardRoutes from "pages/Customer/customerDashboardRoute";
import NotFoundPage from "components/notFoundPage/NotFoundPage";
import App from "src/App";

import adminDashboardRoute  from "pages/Admin/adminDashboardRoute"
import customerDashboardRoute from "pages/Customer/customerDashboardRoute";
import sellerRoute from "pages/SellerHub/sellerRoute";

const HomePage = lazy(() => import("pages/homePage/HomePage"))
const Products = lazy(() => import("src/pages/products/Products"))
const ProductDetails = lazy(() => import("src/pages/productDetails/ProductDetails"))
const OneTypeProducts = lazy(() => import("src/pages/oneTypeProducts/OneTypeProducts"))
const Dashboard = lazy(() => import("pages/Admin/AdminDashboard"))
const CartPage = lazy(() => import("src/pages/CartPages/Index"))
const CheckoutPage = lazy(() => import("src/pages/CartPages/CheckoutPage"))
const PaymentPage = lazy(() => import("src/pages/CartPages/PaymentPage"))

const RegistrationPage = lazy(() => import("pages/auth/Registration"))
const CustomerDashboard = lazy(() => import("src/pages/Customer/Dashboard"))
const TestPage = lazy(() => import("src/pages/Test/Test"))

const SellerHub = lazy(() => import("src/pages/SellerHub/Index"))
const StoreList = lazy(() => import("src/pages/SellerHub/StoreList/StoreList"))

const EmailAndPhoneVerification = lazy(() => import("src/pages/auth/EmailVerification"))
const ProductFilterPage: any = lazy(() => import("src/pages/productFilterPage/ProductFilterPage"))
const StorePage = lazy(() => import("src/pages/storePage/StorePage"))



const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "p/:pId",
                element: <ProductFilterPage />,
            },
            {
                path: "/auth/join",
                element: <JoinHome />,
                children: [
                    {path: "login", element: <Login  title=""/>},
                    {path: "registration", element: <Registration/>},
                    {path: "reset-password", element: <ResetPassword/>},
                    {path: "forget-password", element: <ForgetPassword/>},
                    {path: "opt-validate", element: <OTPValidate/>},
                ]
            },
            adminDashboardRoute,
            customerDashboardRoute,
        ],
    },
    {
        ...sellerRoute
    }
]);




const MyRoutes = () => {
	return (
        <Suspense fallback={<h1 className="text-center mt-10">Loading</h1>}>
            <RouterProvider router={router} />
        </Suspense>
		// <Routes>
      //       <Route path="/" element={<HomePage/>}>
      //       </Route>
      //       <Route path="/p/:pId" element={<ProductFilterPage/>}/>
		//
      //         <Route path="/auth/join" element={<JoinHome/>}>
      //             {/* @ts-ignore */}
      //             <Route path="login" element={<Login/>}/>
      //             <Route path="registration" element={<Registration/>}/>
      //             <Route path="reset-password" element={<ResetPassword/>}/>
      //             <Route path="forget-password" element={<ForgetPassword/>}/>
      //             <Route path="opt-validate" element={<OTPValidate/>}/>
      //         </Route>
      //
		// 	{ customerDashboardRoutes.map(route=>(
		// 		<Route path={route.path} element={<route.element />}>
		// 			{ route.children?.map(ch=>(
		// 				<Route path={ch.path} element={<ch.element />} />
		// 			)) }
		// 		</Route>
		// 	)) }
		//
		// 	{ adminDashboardRoutes.map(route=>(
		// 		<Route path={route.path} element={<route.element />}>
		// 			{ route.children?.map(ch=>(
		// 				<Route path={ch.path} element={<ch.element />} />
		// 			)) }
		// 		</Route>
		// 	)) }
		//
		// 	{/*<Route path="/auth/customer/dashboard" element={} />*/}
		// 	{/*<CustomerDashboardRoutes />*/}
		//
		// 	<Route path="*" element={<NotFoundPage />} />
      //
      // </Routes>
	)
}

export default MyRoutes

// const routes = [
//   { path: "/", exact: true, element: <HomePage/> },
//   { path: "/p", exact: true, element: <ProductFilterPage/> },
//   { path: "/t", exact: true, element: <T/> },
//   { path: "/p/s", exact: true, element: <StorePage/> },
//   { path: "/prod/:name", exact: true, element: <OneTypeProducts/> },
//   { path: "/auth/admin/dashboard", exact: false, element: <Dashboard/> },
//   { path: "/products/:productId", exact: true, element: <productDetails/> },
//   { path: "/products", exact: true, element: <products/> },
//   { path: "/shopping/cart", exact: true, element: <CartPage/> },
//   { path: "/shopping/cart/checkout", exact: true, element: <CheckoutPage/> },
//   { path: "/shopping/cart/payment", exact: true, element: <PaymentPage/> },
//   { path: "/auth/registration", exact: true, element: <RegistrationPage/> },
//   { path: "/auth/registration/phone-verification", exact: true, element: <EmailAndPhoneVerification/> },
//   { path: "/auth/registration/email-verification", exact: true, element: <EmailAndPhoneVerification/> },
//   { path: "/auth/login", exact: true, element: <LoginPage/> },
//   { path: "/customer/:name", exact: false, element: <CustomerDashboard/> },
//   { path: "/seller", exact: false, element: <SellerHub/> },
//   { path: "/store-list", exact: false, element: <StoreList/> },
//   { path: "/auth/callback/:authService", exact: false, element: <TestPage/> },
//   { path: "/d", exact: false, element: <D/> },
// ]





