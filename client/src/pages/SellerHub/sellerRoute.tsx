import React, {lazy} from "react";
import SellerLogin from "pages/SellerHub/auth/login/SellerLogin";
import SellerAuthRequired from "pages/SellerHub/protectedRoute/SellerAuthRequired";

const SellerApp  = lazy(() => import("./SellerApp"));
const DashboardHome  = lazy(()=> import("./dashboardHome/DashboardHome"));

export default {
    path: "/seller",
    element:  <SellerApp />,
    children: [
        { path: "dashboard", element: <SellerAuthRequired> <DashboardHome /> </SellerAuthRequired> },
        { path: "login", element: <SellerLogin /> }
    ]
}



