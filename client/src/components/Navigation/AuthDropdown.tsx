import React, { FC, HTMLAttributes } from "react";
import { Menu, Popup } from "UI/index";
import { Link } from "react-router-dom";
import {
    BiUser,
    FaSignInAlt,
    GrOrderedList,
    MdFavorite,
} from "react-icons/all";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";
import { logoutAction } from "actions/authAction";
import { Roles } from "store/types";

interface Props extends HTMLAttributes<HTMLDivElement> {
    isShow: boolean;
}

const AuthDropdown: FC<Props> = (props) => {
	
	const dispatch = useDispatch()
	const {authState: {auth}} = useSelector((state: RootState)=>state)
	
	
	function handleLogout() {
		dispatch(logoutAction());
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
	            { auth ? (
             
					<>
						<Menu.Item className="flex gap-x-2 items-center text-neutral-700 dark:text-neutral-300 font-normal hover:bg-green-300/20 p-2 cursor-pointer">
							<BiUser />
							{ auth.roles.length === 1 && auth.roles.includes(Roles.ADMIN) ? (
								<Link to={`/auth/admin/dashboard`}>Admin Dashboard</Link>
							) : (
								<Link to= "/auth/customer/dashboard">Profile</Link>
							) }
						</Menu.Item>
			
			            <Menu.Item className="flex gap-x-2 items-center text-neutral-700 dark:text-neutral-300 font-normal hover:bg-green-300/20 p-2 cursor-pointer">
							<BiUser />
				            <Link to= "/auth/customer/dashboard">Profile</Link>
						</Menu.Item>
					</>
		           
	            ) : (
		            <Menu.Item className="flex gap-x-2 items-center text-neutral-700 dark:text-neutral-300 font-normal hover:bg-green-300/20 p-2 cursor-pointer">
                        <BiUser />
                        <Link to="/auth/join/login/?redirect=dashboard">My Profile</Link>
                      
					</Menu.Item>
		            
                    )}
                
                <Menu.Item className="flex gap-x-2 items-center text-neutral-700 dark:text-neutral-300 font-normal hover:bg-green-300/20 p-2 cursor-pointer">
                       <GrOrderedList />
                        <Link to="/auth/customer/dashboard/orders">Order</Link>
                </Menu.Item>
                {/*<Divider lineHeight="1" lineColor="#d1d3d25d"/>*/}

                <Menu.Item  className="text-neutral-700 dark:text-neutral-300 font-normal hover:bg-green-300/20 p-2 cursor-pointer">
		                <Link to="/auth/customer/dashboard/wishlist" className="flex gap-x-2 items-center ">
		                    <MdFavorite />
		                    Wishlist
		                </Link>
                </Menu.Item>
                {/*<Divider lineHeight="1" lineColor="#d1d3d25d"/>*/}
	
	            
	            
                {auth ? (
	                <Menu.Item onClick={handleLogout} className="flex gap-x-2 items-center text-neutral-700 dark:text-neutral-300 font-normal hover:bg-green-300/20 p-2 cursor-pointer">
		                <FaSignInAlt />
		                Logout
	                </Menu.Item>
	                
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