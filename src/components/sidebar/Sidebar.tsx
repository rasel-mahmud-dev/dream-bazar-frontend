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
    const { isOpen, backdropClass = "", position="left", className = "", onClose, children } = props;

    return (
        <>
            {/*{isOpen && <Backdrop isOpenBackdrop={isOpen} onClose={onClose} className={backdropClass} />}*/}

                <div className={`backdrop-overlay ${backdropClass} ${isOpen ? "backdrop-overlay-open" : ""}`}>

                </div>

            <div className={`sidebar ${className} sidebar-${position} ${isOpen ? "sidebar-mobile_show" : "sidebar-mobile_hide"}`}>{children}</div>
        </>
    );
};

export default WithWidth(Sidebar);

