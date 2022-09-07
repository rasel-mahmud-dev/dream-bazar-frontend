
import React, {FC, HTMLAttributes} from 'react';
import {Menu, Popup} from "UI/index";
import {Link} from "react-router-dom";
import {BiUser, FaSignInAlt, GrOrderedList, MdFavorite} from "react-icons/all";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "src/store";


interface Props extends HTMLAttributes<HTMLDivElement> {
	isShow: boolean
}

const MoreDropdown: FC<Props> = (props: {className: string, isShow: boolean}) => {
	
	const dispatch = useDispatch()
	const {authState} = useSelector((state: RootState)=>state)
	
	function handleLogout(){
	
	}
	
	return (
		<Popup
			timeout={500}
			animationClass="nav-popup-menu"
			className={`bg-white dark:bg-neutral-800 !min-w-200 ${props.className}`}
			inProp={props.isShow}>
            <Menu>
                    <Menu.Item key="6" className="text-green-500 hover:bg-green-900/40">
                        <Link to="/store-list">store</Link>
                    </Menu.Item>
                    <Menu.Item key="6" className="text-green-500 hover:bg-green-900/40">
                        <Link to="/store-list">store</Link>
                    </Menu.Item>
                    <Menu.Item key="6" className="text-green-500 hover:bg-green-900/40">
                        <Link to="/store-list">store</Link>
                    </Menu.Item>
                    <Menu.Item key="6" className="text-green-500 hover:bg-green-900/40">
                        <Link to="/store-list">store</Link>
                    </Menu.Item>
                    <Menu.Item key="6" className="text-green-500 hover:bg-green-900/40">
                        <Link to="/store-list">store</Link>
                    </Menu.Item>
                </Menu>
        </Popup>
	);
	
};

export default MoreDropdown;