import React, { FC, HTMLAttributes } from "react";
import { createPortal } from "react-dom";
import "./Modal.scss";
import { CSSTransition } from "react-transition-group";
import Backdrop from "UI/Backdrop/Backdrop";

export interface Props extends HTMLAttributes<HTMLDivElement> {
    onClose?: () => void;
    timeout?: number;
    isOpen: boolean;
    modalBaseClass?: string;
    backdropClass?: string;
}

const Modal: FC<Props> = (props) => {
    const {
        style,
        backdropClass = "",
        onClose,
        className,
        isOpen,
        modalBaseClass = "my-modal",
        timeout = 2000,
        ...attributes
    } = props;

    return createPortal(
        <>
            <Backdrop
                isOpenBackdrop={isOpen}
                onClose={onClose}
                className={backdropClass}
            />
            <CSSTransition
                unmountOnExit
                in={isOpen}
                timeout={timeout}
                classNames={modalBaseClass}
            >
                <div
                    className={`modal ${className ? className : ""}`}
                    {...attributes}
                >
                    {props.children}
                </div>
            </CSSTransition>
        </>,
        document.getElementById("modal-root") as HTMLDivElement
    );
};

export default Modal;
