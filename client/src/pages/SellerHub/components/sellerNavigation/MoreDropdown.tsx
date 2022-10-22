import React, { FC, HTMLAttributes } from "react";
import { Menu, Popup } from "UI/index";
import { Link } from "react-router-dom";
import {
    BiUser,
    FaSignInAlt,
    GrOrderedList,
    MdFavorite,
} from "react-icons/all";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";
import { logoutAction } from "actions/authAction";
import { Roles } from "store/types";


interface Props extends HTMLAttributes<HTMLDivElement> {
    isShow: boolean;
}

const MoreDropdown: FC<Props> = (props) => {
    
    const dispatch = useDispatch()
    const {authState: {auth}} = useSelector((state: RootState)=>state)
    
    
    function handleLogout() {
        dispatch(logoutAction());
    }
    
    
    
    return (
        <Popup
            timeout={500}
            animationClass="nav-popup-menu"
            className={`bg-white dark:bg-neutral-800 !min-w-200 ${props.className}`}
            inProp={props.isShow}>
            <div
                className="text-neutral-700 dark:text-neutral-50 p-4 font-medium ">
                <li className="pb-2"><span>New Customer?</span></li>
                <li className="py-2"><span>New Customer?</span></li>
                <li className="py-2"><span>New Customer?</span></li>
                <li className="py-2"><span>New Customer?</span></li>
                <li className="py-2"><span>New Customer?</span></li>
                <li className="py-2"><span>New Customer?</span></li>
            </div>
        </Popup>
    );
    
};


export default MoreDropdown;