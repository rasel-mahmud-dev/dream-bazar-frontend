import React, {FC, HTMLAttributes} from 'react';
import {Menu, Popup} from "UI/index";
import {Link} from "react-router-dom";
import {BiUser, FaSignInAlt, GrOrderedList, MdFavorite} from "react-icons/all";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "src/store";
import {ACTION_TYPES} from "store/types";


interface Props extends HTMLAttributes<HTMLDivElement> {
	isShow: boolean
}

const AuthDropdown: FC<Props> = (props) => {
	
	const dispatch = useDispatch()
	const {authState} = useSelector((state: RootState)=>state)
	
	function handleLogout() {
		window.localStorage.setItem("token", "");
		dispatch({
			type: ACTION_TYPES.LOGIN,
			payload: { _id: null },
		});
	}
	
	
	return (
		<Popup
			timeout={500}
			animationClass="nav-popup-menu"
			className={`bg-white dark:bg-neutral-800 !min-w-200 ${props.className}`}
			inProp={props.isShow}>
            <div
                className="text-neutral-700 dark:text-neutral-50 flex items-center my-3 ml-2 font-medium ">
                <span>New Customer?</span>
                <Link
                    to={`/auth/join/registration?redirect=/`}
                    style={{ marginLeft: "10px" }}
                >
                    Sign Up
                </Link>
            </div>

            <Menu>
                <Menu.Item className="flex gap-x-2 items-center text-neutral-700 dark:text-neutral-300 font-normal hover:bg-green-300/20 p-2 cursor-pointer">
                    {authState._id ? (
                        <>
                         <BiUser />
                            <Link
                                to={`${
	                                authState.role === "customer"
		                                ? "/customer/" + authState.username
		                                : "/auth/admin/dashboard"
                                }`}
                            >
                                My Profile
                            </Link>
                         </>
                    ) : (
                        <>
                            <BiUser />
                            <Link to="/auth/login/?redirect=dashboard">
                                My Profile
                            </Link>
                        </>
                    )}
                </Menu.Item>
                
                <Menu.Item className="flex gap-x-2 items-center text-neutral-700 dark:text-neutral-300 font-normal hover:bg-green-300/20 p-2 cursor-pointer">
                       <GrOrderedList />
                    <Link
                        to={`/customer/${
	                        authState.username
		                        ? authState.username
		                        : "Guest"
                        }/my-orders`}
                    >
                        Order
                    </Link>
                </Menu.Item>
                {/*<Divider lineHeight="1" lineColor="#d1d3d25d"/>*/}

                <Menu.Item  className="flex gap-x-2 items-center text-neutral-700 dark:text-neutral-300 font-normal hover:bg-green-300/20 p-2 cursor-pointer">
                    <MdFavorite />
                    Wishlist
                </Menu.Item>
                {/*<Divider lineHeight="1" lineColor="#d1d3d25d"/>*/}

                {authState._id ? (
	                <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
                ) : (
	                <Menu.Item className="flex gap-x-2 items-center text-neutral-700 dark:text-neutral-300 font-normal hover:bg-green-300/20 p-2 cursor-pointer">
                        <FaSignInAlt />
                        <Link to="/auth/join/login/?redirect=home">Login</Link>
                    </Menu.Item>
                )}
            </Menu>
        </Popup>
	);

};

export default AuthDropdown;