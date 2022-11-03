
import React, {FC, HTMLAttributes} from 'react';
import {Menu, Popup} from "UI/index";
import {Link} from "react-router-dom";
import Dropdown from "components/Dropdown/Dropdown";

interface Props extends HTMLAttributes<HTMLDivElement> {
	isShow: boolean
}

const MoreDropdown: FC<Props> = (props: {className: string, isShow: boolean}) => {
    return (
		<Dropdown isShow={props.isShow} className={props.className ?? ""}>
            <div className="p-4">
                <h4 className="heading-5 py-2"><Link to="/seller/join/registration">Became a seller</Link></h4>
            <Menu>
                <Menu.Item key="6" className="text-green-500 hover:bg-green-900/40">
                    <Link to="/seller/join/registration">Create a Seller</Link>
                </Menu.Item>
                <Menu.Item key="6" className="text-green-500 hover:bg-green-900/40">
                    <Link to="/admin/join/login">Admin Login</Link>
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
            </div>
        </Dropdown>
	);
	
};

export default MoreDropdown;