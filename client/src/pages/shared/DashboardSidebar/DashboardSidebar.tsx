import React, {FC, useState} from "react";
import Sidebar from "components/sidebar/Sidebar";
import {useDispatch} from "react-redux";
import {FaAngleDown, FaAngleRight} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";


import "./dashboardSideBar.scss";
import {AuthType} from "store/types";
import {setOpenLeftSidebar} from "reducers/appSlice";


export type SidebarDataType = {
    name?: string,
    to?: string,
    icon?: React.ReactNode | any,
    iconClassName?: string,
    section?: string,
    items?: { name: string, to?: string, icon?: React.ReactNode | any, subItems?: any }[]
}

interface Props {
    isOpen: boolean
    auth: AuthType | null
    sidebarData: SidebarDataType[]
}


const DashboardSidebar: FC<Props> = ({auth, isOpen, sidebarData}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [state, setState] = useState({
        openItem: ""
    })

    function handleCloseSidebar() {
        dispatch(setOpenLeftSidebar(""));
    }

    function handleClickItem(item) {
        if (item.to) {
            navigate(item.to)
        } else {
            setState(prevState => ({...prevState, openItem: prevState.openItem === item.name ? "" : item.name}))
        }
    }


    return (
        <div>
            {auth && (
                <Sidebar
                    className="dashboard-sidebar"
                    backdropClass="!bg-dark-900/40 dashboard-backdrop"
                    isOpen={isOpen}
                    onClose={handleCloseSidebar}
                >
                    <div className="">

                        {/**** sidebar content ******/}
                        <div className="mt-20 lg:mt-2 px-3">
                            {sidebarData?.map((section, idx) => (
                                <div className="mt-2 first:mt-2" key={idx}>
                                    {section.name && <div className="">
                                        <div className="sidebar-list-item">

                                            <span className="flex items-center  gap-x-2">
                                                {section.icon && typeof section.icon === "function" ? section.icon() : section.icon}

                                                {section.to ? (
                                                    <Link className="text-sm" to={section.to}>{section.name}</Link>
                                                ) : (
                                                    <p className="text-sm">{section.name}</p>
                                                )}
                                            </span>
                                            <span></span>
                                        </div>
                                    </div>
                                    }
                                    <div key={section.section} className="sidebar-list-section">

                                        <p className="text-dark-100 text-sm  px-2">{section.section}</p>

                                        <div className="mt-1">
                                            {section?.items?.map((item, index) => (
                                                <>
                                                    <div
                                                        onClick={() => handleClickItem(item)}
                                                        key={item.name}
                                                        className={`sidebar-list-item ${state.openItem === item.name ? 'li-item-focuse' : ''}`}>
                                                        <div className="flex items-center gap-x-2">

                                                            {item.icon && typeof item.icon === "function" ? item.icon() : item.icon}
                                                            <p className="text-sm ">{item.name}</p>

                                                        </div>
                                                        {!item.to && <div className="item-icon">
                                                            {state.openItem === item.name ? <FaAngleDown/> : <FaAngleRight/>}
                                                        </div>}
                                                    </div>

                                                    {/* *** render sub items *****   */}
                                                    {state.openItem === item.name && <ul className="ml-4 p-2">
                                                        {item?.subItems?.map(sub => (
                                                            <li key={sub.label} className="flex justify-between">
                                                                <span>{sub.label}</span>
                                                                <span>{sub.value}</span>
                                                            </li>
                                                        ))}
                                                    </ul>}

                                                </>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            ))}

                        </div>
                    </div>
                </Sidebar>
            )}
        </div>
    );
};

export default DashboardSidebar;