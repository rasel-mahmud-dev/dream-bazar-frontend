import React, {lazy} from "react";
import SellerAuthRequired from "pages/SellerHub/protectedRoute/SellerAuthRequired";
import NotFoundPage from "components/notFoundPage/NotFoundPage";

const SellerLogin  = lazy(()=>import("pages/SellerHub/auth/SellerLogin"));
const SellerRegistration = lazy(()=>import("pages/SellerHub/auth/SellerRegistration"));
const SellerApp  = lazy(() => import("./SellerApp"));
const DashboardHome  = lazy(()=> import("./dashboardHome/DashboardHome"));
const SellerProducts  = lazy(()=> import("./sellerProducts/SellerProducts"));

export default {
    path: "/seller",
    element:  <SellerApp />,
    errorElement: <NotFoundPage />,
    children: [
        { path: "dashboard", element: <SellerAuthRequired> <DashboardHome /> </SellerAuthRequired> },
        { path: "login", element: <SellerLogin /> },
        { path: "registration", element: <SellerRegistration /> },
        { path: "products", element: <SellerProducts /> }
    ]
}



