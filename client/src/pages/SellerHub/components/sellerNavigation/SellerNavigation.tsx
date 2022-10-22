import React from 'react';
import {FaUser} from "react-icons/all";

const SellerNavigation = () => {
    return (
        <div className="px-5 shadow-card bg-white">
            <header className="flex items-center justify-between py-4">
                <div className="logo">
                    <div className="heading-5">
                        Seller
                    </div>
                </div>
                <div>
                    <li>
                        <FaUser className="text-lg" ></FaUser>
                    </li>
                </div>
            </header>
        </div>
    );
};

export default SellerNavigation;