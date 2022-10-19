import React, {FC, SyntheticEvent} from "react";

import "./styles.scss"


type Props2 = {
    isOpen: boolean
    onCloseModal: () => void
    children: React.ReactNode
    modalClass?: string
    backdropClass?: string
    maxHeight?: number
    maxWidth?: number
}

const ModalWithBackdrop:FC<Props2> = (props) => {
    const { isOpen, maxHeight, maxWidth, backdropClass, modalClass, onCloseModal } = props
    
    function handleCloseModal(e: SyntheticEvent) {
        let el = e.target as HTMLDivElement
        if (el.classList.contains('modal-backdrop')) {
            onCloseModal()
        }
    }
    
    return (
        
        <div
            className={`modal-backdrop ${backdropClass} ${isOpen ? '' : 'modal-backdrop__close'}  `}
            onClick={handleCloseModal}
        >
            <div className={`${modalClass} modal`}
                 style={{maxHeight: maxHeight ? maxHeight: 'auto', maxWidth: maxWidth ? maxWidth : "auto", width: maxWidth ? "100%" : "auto", }}>
                {props.children}</div>
        </div>
    
    )
}


export default ModalWithBackdrop