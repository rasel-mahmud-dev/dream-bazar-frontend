import React from 'react';
import "./cartProduct.scss"
import staticImagePath from "src/utills/staticImagePath";


const CartProduct = ({product}) => {
    return (

            <div className="cart-product-item">
                <div className="img">
                    <img src={staticImagePath(product.thumb)} alt=""/>
                </div>

                <div className="content">
                    <h3>{product.title}</h3>
                    <div className="flex items-center gap-x-2 mt-2">
                        <p className="price">Taka. {product.price}</p>
                        <p className="price !text-primary-400">{product.discount || 20}%Off</p>
                    </div>
                    <div className="flex items-center gap-x-2 mt-3">
                        <p className="p-select">Qty: </p>
                        <p className="p-select">Size: </p>
                    </div>
                </div>
            </div>


    );
};

export default CartProduct;