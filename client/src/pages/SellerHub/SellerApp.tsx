import React from 'react';
import {Outlet} from "react-router-dom";
import SellerNavigation from "pages/SellerHub/components/sellerNavigation/SellerNavigation";

const SellerApp = () => {
    return (
        <div>
            <SellerNavigation />
            <Outlet />
  </div>
    );
};

export default SellerApp;