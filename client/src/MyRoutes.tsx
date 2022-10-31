import {lazy, Suspense} from "react"

import { RouterProvider, createBrowserRouter} from "react-router-dom"

import sellerRoute from "pages/sellerDashboard/sellerRoute";
import publicSiteRoute from "pages/publicSite/publicSiteRoute";
import adminDashboardRoute from "pages/adminDashboard/adminDashboardRoute";

const router = createBrowserRouter([
    publicSiteRoute,
    adminDashboardRoute,
    sellerRoute
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





