import React, {useEffect} from "react";
import Card from "UI/Form/Card/Card";
import { Button } from "UI/index";
import staticImagePath from "src/utills/staticImagePath";
import { Link } from "react-router-dom";
import { CiShop } from "react-icons/all";
import {useDispatch, useSelector} from "react-redux";

import {RootState} from "src/store";
import apis from "src/apis";
import {ACTION_TYPES, StatusCode} from "store/types";

const ShopInfo = () => {
    
    const {shop} = useSelector((state: RootState)=> state.sellerState)
    
    const dispatch = useDispatch()
    
    useEffect(()=>{
        // apis.get("/api/seller/shop").then(({data, status})=>{
        //     if(status === StatusCode.Ok){
        //         dispatch({
        //             type: ACTION_TYPES.FETCH_SELLER_SHOP,
        //             payload: data
        //         })
        //     }
        // })
    }, [])
    
    console.log(shop)
    
	return (
		<div>
			<div className="my-6 flex items-center justify-between">
				<h1 className="heading-2 flex items-center gap-x-1">
					<CiShop />
					Shop Info
				</h1>

				{!shop && (
					<Link to="/seller/shop/new">
						{" "}
						<Button className="bg-green-450 ">Create a Shop</Button>
					</Link>
				)}
			</div>

			{shop && (
				<Card>
					<>
						<div className="w-full">
							<img className="w-full" src={shop.shopBanner} alt="" />
						</div>
						<h3 className="heading-4">My shop Info</h3>
						<div className="flex items-center gap-x-4 mt-4">
							<img src={staticImagePath(shop.shopLogo)} className="rounded-full w-32" alt="" />
							<div>
								<h4 className="heading-5">Name : {shop.shopName}</h4>
								<p>Phone : {shop?.shopPhone}</p>
								<p>Address : {shop.shopAddress}</p>
								<Link to="/seller/shop/edit">
									<Button className="bg-green-450 mt-4">Edit</Button>
								</Link>
							</div>
						</div>{" "}
					</>
				</Card>
			)}
		</div>
	);
};

export default ShopInfo;