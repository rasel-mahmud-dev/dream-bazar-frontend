// import { lazy } from "react";
//
// const ResetPassword = lazy(()=>import("pages/publicSite/auth/ResetPassword"));
// const JoinHome = lazy(()=>import("pages/publicSite/auth/JoinHome"));
// const ForgetPassword = lazy(()=>import("pages/publicSite/auth/ForgetPassword"));
// const OTPValidate = lazy(()=>import("pages/publicSite/auth/OTPValidate"));
// const Registration = lazy(()=>import("pages/publicSite/auth/Registration"));
// const Login = lazy(()=>import("pages/publicSite/auth/Login"));
//
// import NotFoundPage from "components/notFoundPage/NotFoundPage";
//
// import App from "src/App";
//
// import customerDashboardRoute from "pages/customerDashboard/customerDashboardRoute";
// import AuthCallback from "pages/publicSite/auth/AuthCallback";
// import ExcludeAuthRoute from "../../middleware/ExcludeAuthRoute";
// import {Scope} from "store/types";
//
// const HomePage = lazy(() => import("pages/publicSite/homePage/HomePage"));
// const ProductFilterPage: any = lazy(() => import("src/pages/publicSite/productFilterPage/ProductFilterPage"));
//
// const publicSiteRoute = {
// 	path: "/",
// 	element: <App />,
// 	errorElement: <NotFoundPage />,
// 	children: [
// 		{
// 			path: "/",
// 			element: <HomePage />,
// 		},
// 		{
// 			path: "p/:pId",
// 			element: <ProductFilterPage />,
// 		},
// 		{
// 			path: "/join",
//             element: <ExcludeAuthRoute><JoinHome /></ExcludeAuthRoute>,
// 			children: [
// 				{ path: "login", element: <Login title="" /> },
// 				{ path: "registration", element: <Registration /> },
// 				{ path: "reset-password", element: <ResetPassword /> },
// 				{ path: "forget-password", element: <ForgetPassword /> },
// 				{ path: "opt-validate", element: <OTPValidate /> },
// 			],
// 		},
//         {
//             path: "/auth/callback/:provider",
//             element:  <ExcludeAuthRoute scope={Scope.CUSTOMER_USER}><AuthCallback /></ExcludeAuthRoute>
//         },
//         customerDashboardRoute,
// 	],
// };
//
// export default publicSiteRoute;

export  {}