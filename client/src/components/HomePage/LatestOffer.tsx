import React from 'react';

import "./latest-offer.scss"
import ProductColor from "components/Product/ProductColor/ProductColor";
import staticImagePath from "src/utills/staticImagePath";
import subStr from "src/utills/subStr";
import {Link} from "react-router-dom";
import ProductSkeleton from "components/Product2/ProductSkeleton";
import Loader from "UI/Loader/Loader";


const LatestOffer = ({sectionProducts, isLoaded}) => {
    // const product = {
    //     _id: 1,
    //     title: "Men tiger black jeans",
    //     thumb: "/static/32-blss21jn03-billion-original-imag2zynsbyp3jb7.jpeg",
    //     price: 100,
    //     discount: 20,
    //     stock: 40,
    // }


    return (
        <div className="latest-product">

            {!isLoaded && Array.from({length: 6}).map((_, i) => (
                <ProductSkeleton key={i} imagePlaceholder={<Loader size="xs"/>}/>
            ))}

            {sectionProducts && Array.isArray(sectionProducts) && sectionProducts.map((product) => (
                <div className="product-item">
                    <div className="product-item-img">
                        <img src={staticImagePath(product.coverPhoto)} alt=""/>
                    </div>
                    <div className="product-item-content">
                        <Link to={`/${product.slug}`}><h4>{subStr(product.title, 50)}</h4></Link>
                        <div className="price-row flex items-center gap-x-2">
                            <span className="price">{product.price} Taka</span>
                            <span className="discount">{product.discount}% off</span>
                        </div>

                        <ProductColor categoryName={product.categoryName}/>

                    </div>
                </div>
            ))}

            {isLoaded && !sectionProducts.length && (
                <div>
                    <h4>No item found.</h4>
                </div>
            )}


        </div>
    );
};

export default LatestOffer;