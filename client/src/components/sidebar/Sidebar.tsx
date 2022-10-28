import React, {FC, ReactNode} from 'react';
import "./sidebar.scss";
import WithWidth from "UI/withWidth/withWidth";
interface Props {
    isOpen: boolean
    children: ReactNode
    innerWidth: number
    onClickOnBackdrop: ()=> any
    className?: string
}

const Sidebar: FC<Props> = (props) => {
    const {isOpen, className="", innerWidth, onClickOnBackdrop, children} = props;
    
    return (
        <div className={`sidebar-root ${className} `}>
            {isOpen && innerWidth <= 764 && <div onClick={onClickOnBackdrop} className="sidebar-overlay"></div> }
            <div className={`sidebar ${ isOpen ? 'sidebar-mobile_show': 'sidebar-mobile_hide'} ${innerWidth <= 764 ? 'sidebar-mobile' : ''} ` }>
                {/*<div className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-close"}`}>*/}
                {children}
            </div>
      
        </div>
    );
};

export default WithWidth(Sidebar);