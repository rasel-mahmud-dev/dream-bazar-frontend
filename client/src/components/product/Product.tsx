import React, {FC, HTMLAttributes} from 'react';
import {FaHeart} from "react-icons/all";
import {Badge, Tooltip} from "UI/index";
import {Link} from "react-router-dom";
import staticImagePath from "src/utills/staticImagePath";
import Title from "UI/typography/Title";
import calculateDiscount from "src/utills/calculateDiscount";
import RatingStar from "UI/RatingStar";

import "./styles.scss"

interface Props extends HTMLAttributes<HTMLDivElement>{
	product: {
		title: string,
		coverPhoto: string,
		_id: string,
		brand: {name: string},
		discount: number,
		price: number
	},
	handleAddToWishList: any, isWished: any, renderProductAtt: any
}


const Product: FC<Props> = (props) => {
	
	const {product, handleAddToWishList, isWished, renderProductAtt} = props;
	
	return (
	
			<div className="single-product shadow-md rounded-md px-3 py-4" >
	           
	            {/*<FaHeart onClick={()=>handleAddToWishList(product)} className={`add_wish_list_btn  fa fa-heart  ${isWished(product)? 'wish': ''} `} />*/}
	            
				<div className="head p-4">
					<div className="add_wish_list_btn -left-1">
		            <Badge className="!bg-green-450 !rounded-sm !text-xs whitespace-nowrap !py-1">
			            {product.discount !== 0 && <h5 className="product__discount_row">{product.discount}%</h5>}
		            </Badge>
	            </div>
	
	            <Link className="block mx-auto" to={`/products/${product._id}`}>
	              <div className="product_image_div">
	                <div className="product_image_wra">
	                  <img src={staticImagePath(product.coverPhoto)} alt=""/>
	                </div>
	              </div>
	            </Link>
				</div>
	
	            <div className="card-body mt-3">
	              <Title level={5} className="product__brand_name">{product?.brand?.name}</Title>
		            <h4 className="product__title">
	                  <Tooltip theme="simple-white" tooltip={product.title}  placement="top-right"  tooltipClass="w-36">
	                    <Link to={`/products/${product._id}`} className="text-green-500 font-medium">
	                      {product.title.slice(0, 40)}
		                    { product.title && product.title.length > 40 ? "..." : "" }
	                    </Link>
	                  </Tooltip>
	                </h4>
		            
		            <RatingStar rating={{rate: 10}} className="mt-2"/>
		
		            <div className="product__price_row flex items-center mt-1">
		                <h5 className="text-red-500 font-medium">TK {calculateDiscount(product.discount, product.price)}</h5>
				            {product.discount !== 0 && <span className="text-neutral-400 font-medium line-through ml-3">TK{product.price}</span>}
	                 </div>
		
		            { renderProductAtt.indexOf("size") === -1 && (
			            <div className="mt-2 flex items-center gap-x-2">
		                  <h4 className="">Size</h4>
		                  <span className="font-medium">S, M, L, XL, XXL</span>
	                     </div>
		            )}
	            </div>
	          
        </div>
	);
};


export default Product;