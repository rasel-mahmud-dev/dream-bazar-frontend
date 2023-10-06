import React from 'react';
import {HiOutlineHeart} from "react-icons/hi2";
import staticImagePath from "src/utills/staticImagePath";

import "./product.scss"


const ProductListView = (props) => {

    const {product, className = ""} = props

    return (

            <div className={`product-list-view ${className}`}>

                <div className="fav-icon">
                    <HiOutlineHeart/>
                </div>


                <div className="img-root">
                    <img src={staticImagePath(product.coverPhoto)} alt=""/>
                </div>
                <div className="product-meta">
                    <h3 className="p-title">{product.title}</h3>
                    <p className="p-seller">{product?.seller?.shopName}</p>

                    <div className="p-price-row">
                        <h4 className="p-price">{product.price}</h4>
                        <h4 className="p-discount">SAVE {product.discount}% </h4>
                    </div>

                </div>
            </div>


    );
};

export default ProductListView;