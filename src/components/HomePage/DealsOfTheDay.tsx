import React from 'react';
import ProductListView from "components/Product/ProductListView";
import {Link} from "react-router-dom";
const DealsOfTheDay = ({sectionProduct}) => {
    return sectionProduct?.data && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6">
            {sectionProduct?.data && Array.isArray(sectionProduct.data) && sectionProduct.data.map((product) => (
                <ProductListView className="product-wide" product={product}/>
            ))}

        </div>
    );
};

export default DealsOfTheDay;