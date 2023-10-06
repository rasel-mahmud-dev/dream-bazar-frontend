import React from 'react';

import {useDispatch} from "react-redux";
import {FaBars} from "react-icons/fa";
import {ACTION_TYPES} from "store/types";

const SidebarButton = ({className = "", ...props}) => {
    const dispatch = useDispatch()

    return (
        <div {...props} className={`flex items-center select-none my-6 ${className}`}>
            <FaBars
                onClick={() => dispatch({type: ACTION_TYPES.TOGGLE_LEFT_BAR})}
                className="block lg:hidden text-xl mr-2 cursor-pointer"
            />
            {props.children}
        </div>
    );
};

export default SidebarButton;