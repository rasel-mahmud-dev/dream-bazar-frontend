import React, {lazy} from "react";

const SellerApp  = lazy(() => import("./SellerApp"));
const DashboardHome  = lazy(()=> import("./dashboardHome/DashboardHome"));

export default {
    path: "/seller",
    element:  <SellerApp />,
    children: [
        { path: "dashboard", element: <DashboardHome /> }
    ]
}



