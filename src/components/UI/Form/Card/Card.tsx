import React, {FC, HtmlHTMLAttributes} from 'react';
import {twMerge} from "tailwind-merge";

import "./card.scss"

interface Props extends HtmlHTMLAttributes<HTMLDivElement>{

}




const Card:FC<Props> = ({className, children}) => {
    return (
        <div className={twMerge(`card rounded-lg  p-4 mt-5`, className)}>
            {children}
    </div>
    );
};

export default Card;