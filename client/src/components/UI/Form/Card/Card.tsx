import React, {FC, HtmlHTMLAttributes} from 'react';
import {twMerge} from "tailwind-merge";

interface Props extends HtmlHTMLAttributes<HTMLDivElement>{

}

const Card:FC<Props> = ({className, children}) => {
    return (
        <div className={twMerge(`shadow-card rounded-lg bg-white p-4 mt-5`, className)}>
            {children}
    </div>
    );
};

export default Card;