import React, {CSSProperties, FC, HTMLAttributes} from 'react'
import ReactDOM from 'react-dom'

import './Backdrop.scss'

interface BackdropPROPS extends HTMLAttributes<HTMLDivElement> {
    isOpenBackdrop?: boolean
    bg?: any
    style?: CSSProperties,
    onClose?: () => void
    transparent?: boolean
    children?: React.ReactElement
    as?: "appMask" | "contentMask" | "global"
}

const Backdrop: FC<BackdropPROPS> = (props) => {
    const {
        isOpenBackdrop,
        className = "",
        onClose,
        transparent,
        children,
    } = props

    const handleBackdrop = (e: React.MouseEvent) => {
        if ((e.target as HTMLDivElement).classList.contains("backdrop")) {
            onClose && onClose()
        }
    }


    return ReactDOM.createPortal(
        <div onClick={handleBackdrop}
             className={`backdrop ${className}  ${isOpenBackdrop ? 'open' : 'close'} ${transparent ? 'bg-transparent' : ""}`}>
            {children}
        </div>,
        document.querySelector("#backdrop-root") as HTMLDivElement
    )
}

export default Backdrop