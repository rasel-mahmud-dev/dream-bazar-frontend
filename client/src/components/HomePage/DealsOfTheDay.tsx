import React from 'react';
import ProductListView from "components/Product/ProductListView";

const DealsOfTheDay = ({sectionProducts}) => {
    return sectionProducts?.data && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6">
            {sectionProducts && Array.isArray(sectionProducts) && sectionProducts.map((product) => (
                <ProductListView className="product-wide" product={product}/>
            ))}

        </div>
    );
};

export default DealsOfTheDay;