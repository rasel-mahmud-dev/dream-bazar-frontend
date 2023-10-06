import React from 'react';
import "./product-size.scss"

const sizes = {}

const ProductSize = () => {
    return (
        <div className="product-sizes mt-3">
            {Object.keys(sizes).map(colorName => (
                <div className={`product-size`} >

                </div>
            ))}

        </div>
    );
};

export default ProductSize;