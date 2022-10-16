import React, {FC, HTMLAttributes} from 'react';
import {Button, Menu, Popup} from "UI/index";
import {Link} from "react-router-dom";
import {BiTrash, BiUser, FaSignInAlt, FiShoppingCart, GrOrderedList, MdFavorite} from "react-icons/all";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "src/store";
import {logoutAction} from "actions/authAction";
import {Roles} from "store/types";
import staticImagePath from "src/utills/staticImagePath";
import ButtonGroup from "UI/Button/ButtonGroup";
import Table from "UI/table/Table";


interface Props extends HTMLAttributes<HTMLDivElement> {
	isShow: boolean
}

const CartDropdown: FC<Props> = (props) => {
	
	const dispatch = useDispatch()
	const {cartState} = useSelector((state: RootState) => state)
	
	
	function handleLogout() {
		dispatch(logoutAction());
	}
	
	const headers = [
		{title: "Image", dataIndex: "img", render: (img) => <img className="w-5" src={staticImagePath(img)}/>},
		{title: "Details", dataIndex: "title"},
		{title: "Quantity", dataIndex: "qty"},
		{title: "Total", dataIndex: "total"},
		{
			title: "Action", dataIndex: "", className: "text-center", render: (_, item) => (
				<ButtonGroup className="m-auto">
                    <Button className="bg-green-450 text-white rounded-r-none !px-4">-</Button>
                        <div><h1 className="px-3 font-medium ">{item.qty}</h1></div>
                     <Button className="bg-green-450 text-white !px-4 rounded-l-none">+</Button>
                </ButtonGroup>
			)
		},
	]

	return (
		<Popup
			timeout={500}
			animationClass="nav-popup-menu"
			className={`bg-white dark:bg-neutral-800 w-[700px] ${props.className}`}
			inProp={props.isShow}>
				
	            <div className="text-neutral-700 dark:text-neutral-50 flex flex-col my-3 ml-2 font-medium ">
		            
		            <div className="px-4 flex items-center justify-between mb-3">
			            <div className="flex items-center">
				            <FiShoppingCart className="text-lg mr-2" />
		                    <h2 className="h4">Your cart items</h2>
			            </div>
		                <h3 className="h4">Total ({cartState.cartProducts.length})</h3>
		            </div>
		            
		            <Table
			            className=""
			            // theadClass={{th: "py-2 px-4"}}
			            tbodyClass={{tr: "hover:bg-green-100/50 cursor-pointer", td: "px-4 py-0"}}
			            dataSource={cartState.cartProducts ? cartState.cartProducts : []} columns={headers}/>
		            
		            <div className="ml-auto ">
			            <Button to="/auth/customer/dashboard/cart" className="bg-green-450 mr-4 mt-4">Go to Cart Page</Button>
		            </div>
		            
	            </div>
			
	        </Popup>
	);
	
}

export default CartDropdown;