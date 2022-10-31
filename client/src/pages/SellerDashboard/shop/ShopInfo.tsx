import React, {useEffect} from "react";
import Card from "UI/Form/Card/Card";
import { Button } from "UI/index";
import staticImagePath from "src/utills/staticImagePath";
import { Link } from "react-router-dom";
import { CiShop } from "react-icons/all";;
import {useDispatch, useSelector} from "react-redux";

import {RootState} from "src/store";

const ShopInfo = () => {
    
    const {shop, seller} = useSelector((state: RootState)=> state.sellerState)
    
    const dispatch = useDispatch()
    
    useEffect(()=>{

    }, [])
    
    
	return (
		<div>
			<h1 className="heading-3 flex items-center gap-x-1">
				<CiShop />
				Shop Info
			</h1>
			<Card>
                   {shop && (
                       <>
                <div className="w-full">
                    <img className="w-full" src={shop.shopBanner} alt=""/>
                </div>
                
				<h3 className="heading-4">My shop Info</h3>
				<div className="flex items-center gap-x-4 mt-4">
             
                    <img src={staticImagePath(shop.shopLogo)} className="rounded-full w-32" alt="" />
					<div>
						<h4 className="heading-5">Name : {shop.shopName}</h4>
						<p>Phone : {seller?.phone}</p>
						<p>Address : {shop.shopAddress}</p>
						<Link to="/seller/shop/edit">
							<Button className="bg-green-450 mt-4">Edit</Button>
						</Link>
					</div>
     
				</div>    </> )}
			</Card>
		</div>
	);
};

export default ShopInfo;