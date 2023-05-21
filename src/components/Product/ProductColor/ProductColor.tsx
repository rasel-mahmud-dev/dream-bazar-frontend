import React from 'react';
import "./product-color.scss"

const colors = {
    white: "#e7e7e7",
    gray: "#949494",
    red: "#ff2121",
    green: "#8e23f6",
    blue: "#2c65ec",
    pineapple: "#b5ff47",
}

const showOnCategory = ["saree", "jeans", "t-shart"]

const ProductColor = ({categoryName}: {categoryName: string}) => {
    return showOnCategory.includes(categoryName) && (
        <div className="product-colors mt-3">
            {Object.keys(colors).map(colorName => (
                <div className={`product-color`} style={{background: colors[colorName]}}>

                </div>
            ))}

        </div>
    );
};

export default ProductColor;