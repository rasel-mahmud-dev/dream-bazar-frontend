import React from "react";
import Sidebar from "components/sidebar/Sidebar";
import {toggleLeftSidebarAction} from "actions/appAction";
import {useDispatch} from "react-redux";
import {FaAngleLeft, FaBars} from "react-icons/all";
import {Link} from "react-router-dom";
import Circle from "UI/Circle/Circle";

const SellerSidebar = ({auth, isOpenLeftBar}) => {
    const dispatch = useDispatch();
    
    const data = [
        {
            section: "ORDER MANAGEMENT",
            items: [
                {name: "Orders", to: "/"},
                {name: "Refund Request List", to: "/"},
            ],
        },
        {
            section: "PRODUCT MANAGEMENT",
            items: [
                {name: "Orders", to: "/"},
                {name: "Refund Request List", to: "/"},
            ],
        },
    ];
    
    function toggleSidebar() {
        toggleLeftSidebarAction(dispatch);
    }
    
    
    return (
        <div>
			{auth && (
                <Sidebar
                    isOpen={isOpenLeftBar}
                    onClickOnBackdrop={toggleSidebar}
                >
					<div className="">
                        {/**** sidebar fixed navigation ******/}
						<div className="sidebar-fixed-bar top-0 bg-white py-3 px-4">
                            <div className="logo flex items-center  ">
							<div className="md:hidden block mr-3 ">
								<Circle onClick={toggleSidebar}>
                                    <FaAngleLeft
                                        className="text-lg"

                                    />
                                </Circle>
							</div>

							<Link
                                to="/seller/dashboard"
                                className="flex items-center"
                            >
								<img
                                    src="/logo-2.png"
                                    alt=""
                                    className="w-9 md:w-11"
                                />
								<h4 className="text-neutral-900 font-semibold text-lg md:text-xl   md:block">
									Dream Bazar
								</h4>
							</Link>
						</div>
                        </div>
                        
                        {/**** sidebar content ******/}
						<div className="mt-10">
							<p className="">
								Lorem ipsum dolor sit amet, consectetur
								adipisicing elit. Accusamus aliquid corporis
								deserunt dignissimos dolorem dolorum eius facere
								fugit impedit ipsam natus placeat, quod
								recusandae sed similique veniam, voluptas!
								Adipisci aliquid aperiam architecto atque autem,
								commodi cupiditate dolore dolores expedita fuga
								harum hic, libero modi quia ratione, sunt
								voluptatem. Enim eum quia repudiandae sit ullam!
								Autem consequatur, debitis deserunt dolor
								dolorem enim fuga, libero mollitia nihil
								praesentium ratione, sunt voluptas voluptatum.
								Beatae delectus eveniet fuga iure laboriosam
								neque non, omnis pariatur provident quam qui
								reiciendis, similique sunt temporibus vel!
								Beatae consectetur dolore fuga incidunt nemo
								quidem, quis repellendus ut velit voluptatum.
							</p><p className="mt-5">
								Lorem ipsum dolor sit amet, consectetur
								adipisicing elit. Accusamus aliquid corporis
								deserunt dignissimos dolorem dolorum eius facere
								fugit impedit ipsam natus placeat, quod
								recusandae sed similique veniam, voluptas!
								Adipisci aliquid aperiam architecto atque autem,
								commodi cupiditate dolore dolores expedita fuga
								harum hic, libero modi quia ratione, sunt
								voluptatem. Enim eum quia repudiandae sit ullam!
								Autem consequatur, debitis deserunt dolor
								dolorem enim fuga, libero mollitia nihil
								praesentium ratione, sunt voluptas voluptatum.
								Beatae delectus eveniet fuga iure laboriosam
								neque non, omnis pariatur provident quam qui
								reiciendis, similique sunt temporibus vel!
								Beatae consectetur dolore fuga incidunt nemo
								quidem, quis repellendus ut velit voluptatum.
							</p>
                            <p className="mt-5 mb-10">
								Lorem ipsum dolor sit amet, consectetur
								adipisicing elit. Accusamus aliquid corporis
								deserunt dignissimos dolorem dolorum eius facere
								fugit impedit ipsam natus placeat, quod
								recusandae sed similique veniam, voluptas!
								Adipisci aliquid aperiam architecto atque autem,
								commodi cupiditate dolore dolores expedita fuga
								harum hic, libero modi quia ratione, sunt
								voluptatem. Enim eum quia repudiandae sit ullam!
								Autem consequatur, debitis deserunt dolor
								dolorem enim fuga, libero mollitia nihil
								praesentium ratione, sunt voluptas voluptatum.
								Beatae delectus eveniet fuga iure laboriosam
								neque non, omnis pariatur provident quam qui
								reiciendis, similique sunt temporibus vel!
								Beatae consectetur dolore fuga incidunt nemo
								quidem, quis repellendus ut velit voluptatum.
                            Rasel Mahmud dev
							</p>
						</div>
					</div>
				</Sidebar>
            )}
		</div>
    );
};

export default SellerSidebar;