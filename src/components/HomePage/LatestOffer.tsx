import React from 'react';

import "./latest-offer.scss"
import ProductColor from "components/Product/ProductColor/ProductColor";
import staticImagePath from "src/utills/staticImagePath";


const LatestOffer = ({sectionProduct}) => {

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
            { sectionProduct?.data && Array.isArray(sectionProduct.data) && sectionProduct.data.map((product)=>(
                <div className="product-item">
                    <div className="product-item-img">
                        <img src={staticImagePath(product.coverPhoto)} alt=""/>
                    </div>
                    <div className="product-item-content">
                        <h4>{product.title}</h4>
                        <div className="price-row flex items-center gap-x-2">
                            <span className="price">{product.price} Taka</span>
                            <span className="discount">{product.discount}% off</span>
                        </div>

                        <ProductColor categoryName={product.categoryName} />

                    </div>
                </div>
            ))}
        </div>
    );
};

export default LatestOffer;