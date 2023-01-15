import React, {FC, ReactNode, useState} from "react";
import Sidebar from "components/sidebar/Sidebar";
import {toggleLeftSidebarAction} from "actions/appAction";
import {useDispatch} from "react-redux";
import {FaAngleDown, FaAngleLeft, FaAngleRight} from "react-icons/all";
import {Link, useNavigate} from "react-router-dom";
import Circle from "UI/Circle/Circle";

import "./dashboardSideBar.scss";
import {AuthType} from "store/types";


export type SidebarDataType = {
    name?: string,
    to?: string,
    icon?: React.ReactNode | any,
    iconClassName?: string,
    section?: string,
    items?: { name: string, to?: string, icon?: React.ReactNode | any, subItems?: any }[]
}

interface Props {
    isOpenLeftBar: boolean
    auth: AuthType | null
    sidebarData: SidebarDataType[]
}


const DashboardSidebar: FC<Props> = ({auth, isOpenLeftBar, sidebarData}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()


    const [state, setState] = useState({
        openItem: ""
    })

    function toggleSidebar() {
        toggleLeftSidebarAction(dispatch);
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
                    isOpen={isOpenLeftBar}
                    onClose={toggleSidebar}
                >
                    <div className="">

                        {/**** sidebar fixed navigation ******/}
                        {/*<div className="sidebar-fixed-bar top-0 py-3 px-4 lg:hidden">*/}
                        {/*    <div className="flex items-center  ">*/}
                        {/*        <div className="mr-3 ">*/}
                        {/*            <Circle onClick={toggleSidebar}>*/}
                        {/*                <FaAngleLeft*/}
                        {/*                    className="text-lg"*/}

                        {/*                />*/}
                        {/*            </Circle>*/}
                        {/*        </div>*/}

                        {/*        <Link*/}
                        {/*            to="/seller/dashboard"*/}
                        {/*            className="flex items-center"*/}
                        {/*        >*/}
                        {/*            <img*/}
                        {/*                src="/logo-2.png"*/}
                        {/*                alt=""*/}
                        {/*                className="w-9 md:w-11"*/}
                        {/*            />*/}
                        {/*            <h4 className="text-neutral-900 font-semibold text-lg md:text-xl   md:block">*/}
                        {/*                Dream Bazar*/}
                        {/*            </h4>*/}
                        {/*        </Link>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/**** sidebar content ******/}
                        <div className="mt-20 lg:mt-2 px-3">
                            {sidebarData?.map((section, idx) => (
                                <div className="mt-8 first:mt-2" key={idx}>
                                    {section.name && <div className="">
                                        <div className="flex items-center gap-x-2  p-2 rounded">
                                            {section.icon && typeof section.icon === "function" ? section.icon() : section.icon}

                                            {section.to ? (
                                                <Link className="text-sm font-semibold" to={section.to}>{section.name}</Link>
                                            ) : (
                                                <h5 className="text-sm font-semibold">{section.name}</h5>
                                            )}
                                        </div>
                                    </div>
                                    }
                                    <div key={section.section} className="">

                                        <h6 className="heading-6 text-dark-600 px-2">{section.section}</h6>
                                        <div className="mt-2">
                                            {section?.items?.map((item, index) => (
                                                <li onClick={() => handleClickItem(item)} className="" key={index}>
                                                    <div
                                                        key={item.name}
                                                        className={`flex items-center justify-between text-dark-300 py-2 px-2 rounded-md gap-x-1 li ${state.openItem === item.name ? 'li-item-focuse' : ''}`}>
                                                        <div className="flex items-center gap-x-2">

                                                            {item.icon && typeof item.icon === "function" ? item.icon() : item.icon}
                                                            <h5 className="text-sm font-medium">{item.name}</h5>

                                                        </div>
                                                        {!item.to && <div>
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

                                                </li>
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