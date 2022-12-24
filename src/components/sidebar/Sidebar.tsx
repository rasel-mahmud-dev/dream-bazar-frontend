import React, { FC, ReactNode } from "react";
import "./sidebar.scss";
import WithWidth from "UI/withWidth/withWidth";
import Backdrop from "UI/Backdrop/Backdrop";

interface Props {
    isOpen: boolean;
    children: ReactNode;
    onClose: () => any;
    className?: string;
    backdropClass?: string;
    position?: "right" | "left";
}

const Sidebar: FC<Props> = (props) => {
    const { isOpen, position = "right", backdropClass="", className = "", onClose, children } = props;

    return (
        <div className={`sidebar-root ${className} sidebar-${position}`}>
            {isOpen && <Backdrop isOpenBackdrop={isOpen} onClose={onClose} className={backdropClass}/>}
            <div className={`sidebar ${isOpen ? "sidebar-mobile_show" : "sidebar-mobile_hide"}`}>{children}</div>
        </div>
    );
};

export default WithWidth(Sidebar);
