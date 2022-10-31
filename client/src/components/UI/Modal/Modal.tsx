import React, {FC, HTMLAttributes, SyntheticEvent} from "react";

import "./Modal.scss";
import {CSSTransition} from "react-transition-group";

interface Props extends HTMLAttributes<HTMLDivElement> {
    isOpen: boolean;
    onCloseModal?: () => void;
    children: React.ReactNode;
    modalClass?: string;
    backdropClass?: string;
    contentSpaceY?: number
}

const Modal: FC<Props> = (props) => {
    
    const {isOpen, contentSpaceY= 10, backdropClass, modalClass, onCloseModal} = props
    
    function handleCloseModal(e: SyntheticEvent) {
        let el = e.target as HTMLDivElement
        if (el.classList.contains('modal-backdrop')) {
            onCloseModal && onCloseModal()
        }
    }
    
    return (
        <CSSTransition unmountOnExit in={isOpen} timeout={1000} classNames="my-modal">
            <div
                className={`modal-backdrop ${backdropClass} ${isOpen ? '' : 'modal-backdrop__close'}  `}
                onClick={handleCloseModal}
            >
                <div className={`${modalClass} modal`} style={{maxHeight: `calc(100vh - ${contentSpaceY}px)`}}>
                    {props.children}
             
                </div>
            </div>
            
        </CSSTransition>
    )
}


export default Modal
