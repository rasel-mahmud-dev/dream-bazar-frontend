import React, { CSSProperties, FC, HTMLAttributes } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./Backdrop.scss";
import backdrop from "UI/Backdrop/Backdrop";

interface BackdropPROPS extends HTMLAttributes<HTMLDivElement> {
    isOpenBackdrop?: boolean;
    bg?: any;
    timeout?: number;
    backdropBaseClass?: string;
    style?: CSSProperties;
    onClose?: () => void;
    transparent?: boolean;
    children?: React.ReactElement;
    as?: "appMask" | "contentMask" | "global";
}

const Backdrop: FC<BackdropPROPS> = (props) => {
    const { isOpenBackdrop, className = "", timeout = 500, backdropBaseClass = "backdrop-base", onClose, transparent, children } = props;

    const handleBackdrop = (e: React.MouseEvent) => {
        if ((e.target as HTMLDivElement).classList.contains("backdrop")) {
            onClose && onClose();
        }
    };

    return ReactDOM.createPortal(
        <CSSTransition unmountOnExit in={isOpenBackdrop} timeout={timeout} classNames={backdropBaseClass}>
            <div onClick={handleBackdrop} className={`backdrop ${className} ${transparent ? "bg-transparent" : ""}`}>
                {children}
            </div>
        </CSSTransition>,
        document.querySelector("#backdrop-root") as HTMLDivElement
    );
};

export default Backdrop;
