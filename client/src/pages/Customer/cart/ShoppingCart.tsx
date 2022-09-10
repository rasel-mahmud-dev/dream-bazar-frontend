import React, { Component } from "react";
import staticImagePath from "src/utills/staticImagePath";
import {BiTrash, FiDelete} from "react-icons/all";
import {Button} from "UI/index";
import ButtonGroup from "UI/Button/ButtonGroup";

const ShoppingCart = () => {
    
    const headers = [
        {name: "Product"},
        {name: "Details"},
        {name: "No. Of Products"},
        {name: "Total"},
        {name: "Action"},
    ]
    
    const data = [
        {title: "Iphone 11", id:1, total: 123, color: "red", size: "big", qty: 10 , img: "/images/products/free-new-more-kanjivaram-fashion-anusuya-saree-original-imafjpaae2mdwzhu.jpeg"},
        {title: "Jeans 11", id:1, total: 123, color: "red", size: "big", qty: 10, img: "/images/products/free-new-more-kanjivaram-fashion-anusuya-saree-original-imafjpaae2mdwzhu.jpeg" },
        {title: "Laptop 11", id:1, total: 123, color: "red", size: "big", qty: 10 , img: "/images/products/free-new-more-kanjivaram-fashion-anusuya-saree-original-imafjpaae2mdwzhu.jpeg"},
        {title: "Mufti T-shart", id:11, total: 13, color: "green", size: "sm", qty: 10 , img: "/images/products/free-new-more-kanjivaram-fashion-anusuya-saree-original-imafjpaae2mdwzhu.jpeg"},
    ]
    
    return <div className="mt-4">
        <h1 className="font-medium text-2xl text-neutral-800">Shopping Cart</h1>
        
        <div className="card bg-white p-5">
            <table className="w-full">
                <thead>
                    <tr>
                        {headers.map(head=>(
                            <th className="text-start">{head.name}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    { data.map((item)=>(
                        <tr>
                            <td className="">
                                <div className="w-20 h-20 bg-neutral-100 flex items-center justify-center">
                                    <img className="w-10" src={staticImagePath(item.img)} alt=""/>
                                </div>
                            </td>
                            <td>{item.title}</td>
                            <td>
                                <ButtonGroup>
                                    <Button className="bg-green-450 text-white rounded-r-none !px-4">-</Button>
                                        <div><h1 className="px-3 font-medium ">{item.qty}</h1></div>
                                     <Button className="bg-green-450 text-white !px-4 rounded-l-none">+</Button>
                                </ButtonGroup>
                                
                            </td>
                            <td className="text-neutral-500">{item.total}</td>
                            <td><BiTrash /></td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
        
    </div>;
};

export default ShoppingCart;