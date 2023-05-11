import React from 'react';
import {IoIosArrowBack} from "react-icons/all";

const WithBack = ({className = "", title = "Go back", ...attr}) => {
    return (
        <div className={`flex items-center gap-x-1 ${className}`} {...attr}>
            <IoIosArrowBack className="text-lg text-dark-700 dark:text-dark-10"/>
            <h1 className="heading-3">{title}</h1>

        </div>
    );
};

export default WithBack;