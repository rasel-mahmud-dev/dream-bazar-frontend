import { lazy } from "react";
import ResetPassword from "pages/publicSite/auth/ResetPassword";
import JoinHome from "pages/publicSite/auth/JoinHome";
import ForgetPassword from "pages/publicSite/auth/ForgetPassword";
import OTPValidate from "pages/publicSite/auth/OTPValidate";
import Registration from "pages/publicSite/auth/Registration";
import Login from "pages/publicSite/auth/Login";
import NotFoundPage from "components/notFoundPage/NotFoundPage";
import App from "src/App";

import adminDashboardRoute from "pages/adminDashboard/adminDashboardRoute";
import customerDashboardRoute from "pages/customerDashboard/customerDashboardRoute";

const HomePage = lazy(() => import("pages/publicSite/homePage/HomePage"));
const ProductFilterPage: any = lazy(() => import("src/pages/publicSite/productFilterPage/ProductFilterPage"));

const publicSiteRoute = {
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
				{ path: "login", element: <Login title="" /> },
				{ path: "registration", element: <Registration /> },
				{ path: "reset-password", element: <ResetPassword /> },
				{ path: "forget-password", element: <ForgetPassword /> },
				{ path: "opt-validate", element: <OTPValidate /> },
			],
		},
        customerDashboardRoute,
	],
};

export default publicSiteRoute;
