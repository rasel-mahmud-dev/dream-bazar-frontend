import React, {FC, HTMLAttributes} from 'react';
import {Button} from "UI/index";
import {FiShoppingCart} from "react-icons/fi";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "src/store";
import staticImagePath from "src/utills/staticImagePath";
import ButtonGroup from "UI/Button/ButtonGroup";
import Table from "UI/table/Table";
import Dropdown from "components/Dropdown/Dropdown";


interface Props extends HTMLAttributes<HTMLDivElement> {
	isShow: boolean
}

const CartDropdown: FC<Props> = (props) => {
 
	const {cartState} = useSelector((state: RootState) => state)
 
	
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
		<Dropdown
			className={`${props.className}`}
			    isShow={props.isShow}>
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
			            <Button to="/cart" className="bg-green-450 mr-4 mt-4">Go to Cart Page</Button>
		            </div>
		            
	            </div>
			
	        </Dropdown>
	);
	
}

export default CartDropdown;