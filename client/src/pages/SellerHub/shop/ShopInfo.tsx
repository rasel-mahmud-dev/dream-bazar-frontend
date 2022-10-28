import React from "react";
import Card from "UI/Form/Card/Card";
import { Button } from "components/UI";
import staticImagePath from "src/utills/staticImagePath";
import { Link } from "react-router-dom";
import { CiShop } from "react-icons/all";

const ShopInfo = () => {
	return (
		<div>
			<h1 className="heading-3 flex items-center gap-x-1">
				<CiShop />
				Shop Info
			</h1>
			<Card>
				<h3 className="heading-4">My shop Info</h3>
				<div className="flex items-center gap-x-4 mt-4">
					<img src={staticImagePath("seller1-shop-image.png")} className="rounded-full w-32" alt="" />
					<div>
						<h4 className="heading-5">Name : Mart Morning</h4>
						<p>Phone : 01632381820</p>
						<p>Address : House-09, Road-02, Section-15, Block-D, Mirpur-13</p>
						<Link to="/seller/shop/edit">
							<Button className="bg-green-450 mt-4">Edit</Button>
						</Link>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default ShopInfo;