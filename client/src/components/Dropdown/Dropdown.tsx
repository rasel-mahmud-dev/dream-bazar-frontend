import React, {FC, HTMLAttributes, ReactNode} from "react";
import { Popup } from "UI/index";
interface Props extends HTMLAttributes<HTMLDivElement> {
    isShow: boolean;
    children?: ReactNode
}

const Dropdown: FC<Props> = (props) => {
    return (
        <Popup
            timeout={500}
            animationClass="nav-popup-menu"
            className={`bg-white dark:bg-neutral-800 ${props.className}`}
            inProp={props.isShow}
        >
            {props.children}
           
            
		</Popup>
    );
};

export default Dropdown;