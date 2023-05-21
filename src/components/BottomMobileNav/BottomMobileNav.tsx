import React from 'react';
import {Link} from "react-router-dom";
import {HiOutlineHeart, HiOutlineHome} from "react-icons/hi2";
import {AiOutlineAppstore, BiUser, CiShoppingCart} from "react-icons/all";

import "./bottomMobileNav.scss"

const BottomMobileNav = () => {
    return (
        <div>
            <div className="bottom-nav home-nav">
                <div className="nav-items ">
                    <Link to="/">
                        <li className="h-nav-item">
                            <HiOutlineHome />
                            <label htmlFor="">Home</label>
                        </li>
                    </Link>
                    <Link to="/stores">
                        <li className="h-nav-item">
                            <AiOutlineAppstore />
                            <label htmlFor="">Store</label>
                        </li>
                    </Link>
                    <Link to="/m/carts">
                        <li className="h-nav-item">
                            <CiShoppingCart />
                            <label htmlFor="">My Cart</label>
                        </li>
                    </Link>
                    <li className="h-nav-item">
                        <HiOutlineHeart />
                        <label htmlFor="">Wishlist</label>
                    </li>

                    <li className="h-nav-item">
                        <BiUser />
                        <label htmlFor="">Account</label>
                    </li>
                </div>
            </div>
        </div>
    );
};

export default BottomMobileNav;