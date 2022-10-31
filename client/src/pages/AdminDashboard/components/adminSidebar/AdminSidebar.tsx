import React, {useState} from "react";
import Sidebar from "components/sidebar/Sidebar";
import {toggleLeftSidebarAction} from "actions/appAction";
import {useDispatch} from "react-redux";
import {BiCart, BiNote, BiPlus, FaAngleLeft, FiMail, MdOutlineSpaceDashboard} from "react-icons/all";
import {useNavigate} from "react-router-dom";
import Circle from "UI/Circle/Circle";

import "./adminSideBar.scss";

const AdminSidebar = ({auth, isOpenLeftBar}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const data = [
        {
            name: "Dashboard",
            to: "/seller/products",
            icon: <MdOutlineSpaceDashboard/>,
            iconClassName: "text-xl mr-1",
        },
        {
            section: "ORDER MANAGEMENT",
            items: [
                {
                    name: "Orders",
                    icon: <BiCart/>,
                    subItems: [
                        {label: "All", value: 14},
                        {label: "Pending", value: 14},
                        {label: "Confirmed", value: 0},
                        {label: "Packaging", value: 4},
                        {label: "Out For Delivery", value: 1},
                        {label: "Delivered", value: 1},
                        {label: "Returned", value: 6},
                        {label: "Failed To Deliver", value: 1},
                        {label: "Canceled", value: 1},
                    ],
                },
                {
                    name: "Refund Request List",
                    to: "/",
                    icon: <BiNote/>,
                    subItems: [
                        {label: "Pending", value: 10},
                        {label: "Approved", value: 10},
                        {label: "Refunded", value: 10},
                        {label: "Rejected", value: 10},
                    ],
                },
            ],
        },
        {
            section: "PRODUCT MANAGEMENT",
            items: [
                {name: "Products", to: "/seller/products", icon: <BiCart/>},
                {name: "Add", to: "/seller/product/add", icon: <BiPlus/>},
                {name: "Bulk import", to: "/", icon: <BiNote/>},
            ],
        },
        {
            section: "HELP & SUPPORT SECTION",
            items: [{name: "Messages", icon: <FiMail/>}],
        },
        {
            section: "BUSINESS SECTION",
            items: [
                {name: "Withdraws", to: ""},
                {name: "My Bank Info", to: ""},
                {name: "My Shop", to: "/seller/shop/view"},
            ],
        },
    ];
    const [state, setState] = useState({
        openItem: "",
    });
    
    function toggleSidebar() {
        toggleLeftSidebarAction(dispatch);
    }
    
    function handleClickItem(item) {
        if (item.to) {
            navigate(item.to);
        } else {
            setState((prevState) => ({...prevState, openItem: item.name}));
        }
    }
    
    return (
        <div>
			{auth && (
                <Sidebar className="seller-sidebar" isOpen={isOpenLeftBar} onClickOnBackdrop={toggleSidebar}>
					<div className="">
						{/**** sidebar fixed navigation ******/}
                        <div className="sidebar-fixed-bar top-0 bg-white py-3 px-4 md:hidden">
							<div className="logo flex items-center  ">
								<div className="md:hidden block mr-3 ">
									<Circle onClick={toggleSidebar}>
										<FaAngleLeft className="text-lg"/>
									</Circle>
								</div>
							</div>
						</div>
                        
                        {/**** sidebar content ******/}
                        <div className="mt-20 md:mt-4 px-3">
							{data.map((section) => (
                                <div>
									{section.section ? (
                                        <div key={section.section} className="mt-10">
											<h6 className="heading-6 tracking-widest text-neutral-500">{section.section}</h6>
											<div className="ml-2 mt-2">
												{section?.items?.map((item) => (
                                                    <div onClick={() => handleClickItem(item)}>
														<div
                                                            key={item.name}
                                                            className={`flex items-center gap-x-1 py-2 li-item ${
                                                                state.openItem === item.name ? "li-item-focus" : ""
                                                            }`}
                                                        >
															<div className="text-lg text-neutral-600">{item.icon}</div>
															<li className="text-base text-neutral-600 font-medium">{item.name}</li>
														</div>
                                                        
                                                        {/* *** render sub items *****   */}
                                                        {state.openItem === item.name && (
                                                            <div className="ml-4 p-4">
																{item?.subItems?.map((sub) => (
                                                                    <li className="flex justify-between">
																		<span>{sub.label}</span>
																		<span>{sub.value}</span>
																	</li>
                                                                ))}
															</div>
                                                        )}
													</div>
                                                ))}
											</div>
										</div>
                                    ) : (
                                        <div>
											<li className="text-base text-neutral-600 font-medium flex items-center">
												<span className={section.iconClassName ? section.iconClassName : ""}>{section.icon}</span>
												<div className="text-lg text-neutral-600">{section.name}</div>
											</li>
										</div>
                                    )}
								</div>
                            ))}
						</div>
					</div>
				</Sidebar>
            )}
		</div>
    );
};

export default AdminSidebar;



