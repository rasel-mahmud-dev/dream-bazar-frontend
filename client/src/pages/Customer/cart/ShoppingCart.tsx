import React, { Component } from "react";
import staticImagePath from "src/utills/staticImagePath";
import {BiTrash, FiDelete} from "react-icons/all";
import {Button} from "UI/index";
import ButtonGroup from "UI/Button/ButtonGroup";
import InputGroup from "UI/Form/InputGroup";
import Table from "UI/table/Table";

const ShoppingCart = () => {
    
    const columns = [
        {title: "Image", dataIndex: "img",  render: (item) => (
            <div className="w-20 h-20 bg-neutral-300/20 flex justify-center items-center">
                <img className="" src={staticImagePath(item.img)}/>
            </div>
            )},
        {title: "Details", dataIndex: "title"},
        {title: "No of Products", dataIndex: "qty"},
        {title: "Total", dataIndex: "total"},
        {
            title: "Action", dataIndex: "", className: "text-center", render: (item) => (
                <ButtonGroup className="m-auto">
                    <Button className="bg-green-450 text-white rounded-r-none !px-4">-</Button>
                        <div><h1 className="px-3 font-medium ">{item.qty}</h1></div>
                     <Button className="bg-green-450 text-white !px-4 rounded-l-none">+</Button>
                </ButtonGroup>
            )
        },
    ]
    
    const data = [
        {title: "Iphone 11", id:1, total: 123, color: "red", size: "big", qty: 10 , img: "/images/products/free-new-more-kanjivaram-fashion-anusuya-saree-original-imafjpaae2mdwzhu.jpeg"},
        {title: "Jeans 11", id:1, total: 123, color: "red", size: "big", qty: 10, img: "/images/products/free-new-more-kanjivaram-fashion-anusuya-saree-original-imafjpaae2mdwzhu.jpeg" },
        {title: "Laptop 11", id:1, total: 123, color: "red", size: "big", qty: 10 , img: "/images/products/free-new-more-kanjivaram-fashion-anusuya-saree-original-imafjpaae2mdwzhu.jpeg"},
        {title: "Mufti T-shart", id:11, total: 13, color: "green", size: "sm", qty: 10 , img: "/images/products/free-new-more-kanjivaram-fashion-anusuya-saree-original-imafjpaae2mdwzhu.jpeg"},
    ]
    
    return <div className="mt-4">
        <h1 className="font-medium text-2xl text-neutral-800">Shopping Cart</h1>
        
        <div className="card p-5">
            <Table
                theadClass={{th: "pt-2 px-4 pb-10"}}
                tbodyClass={{tr: "hover:bg-green-100/50 cursor-pointer", td: "px-4 py-1"}}
                dataSource={data} columns={columns}/>
        </div>
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 justify-between gap-8" >
           <div className="card  p-5 w-full">
                <h1 className="font-medium text-neutral-800">Price Details</h1>
                <form action="" className="mt-8">
                    <label htmlFor="">Enter your coupon code if you have one!</label>
                    <InputGroup placeholder="Enter coupon code" inputClass="!text-neutral-100 !bg-blue-100/50" name="coupon" state={{coupon: {value: ""}}} onChange={()=>{}} />
                    <Button className="ml-auto bg-green-450 mt-10">Apply Code</Button>
                </form>
            </div>
            <div className="card  p-5 w-full">
                <h1 className="font-medium  text-neutral-800">Apply Coupon</h1>
                <div  className="mt-8">
                    <li className="flex justify-between my-1">
                        <span>Price (4 items)</span>
                        <span className="text-neutral-800 font-medium">$32424</span>
                    </li>
                    <li className="flex justify-between my-1">
                        <span>Delivery Charges</span>
                        <span className="text-neutral-800 font-medium">$32424</span>
                    </li>
                    
                      <li className="flex justify-between my-1">
                        <span>TAX / VAT</span>
                        <span className="text-neutral-800 font-medium">$32424</span>
                    </li>
                    <div className="border border-gray-100 my-6"></div>
                    
                      <li className="flex justify-between my-1">
                        <span>Payable Amount</span>
                        <span className="text-neutral-800 font-medium">$32424</span>
                    </li>
                    
                    <p className="text-green-500 font-medium">Your Total Savings on this order $550</p>
                    
                </div>
            </div>
        </div>
        
        <div className="card p-5 w-full flex justify-end gap-x-8">
            <Button className="bg-green-450 text-white">Continue Shopping</Button>
            <Button className="bg-green-450">Place Order</Button>
        </div>
        
    </div>;
};

export default ShoppingCart;