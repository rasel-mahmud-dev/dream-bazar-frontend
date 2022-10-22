import React from 'react';
import {FaUser} from "react-icons/all";
import {Link, useLocation} from "react-router-dom";


const SellerNavigation = () => {
    const location = useLocation();
    
    return (
        <div className="px-5 shadow-card bg-white">
            <header className="flex items-center justify-between py-4">
                <div className="logo">
                    <div className="heading-5">
                        <Link to="/seller/dashboard">Seller</Link>
                    </div>
                </div>
                <div>
                    <li>
                        <Link to="/seller/login?redirect=/seller/" state="DASSSSSSSSS">
                            <FaUser className="text-lg" >
                        </FaUser>
                        </Link>
                    </li>
                </div>
            </header>
        </div>
    );
};

export default SellerNavigation;