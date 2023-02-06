import React, {lazy, Suspense} from 'react';
import ProductDetailsSkeleton from "pages/publicSite/productDetails/ProductDetails.Skeleton";
import CategoryNavbar from "components/categoryNavbar/CategoryNavbar";

const ProductDetails  = lazy(()=>import("./ProductDetails"))

const ProductDetailLite = () => {
    return (
        <div>
            <CategoryNavbar />
            <Suspense fallback={<div className="container">
                <ProductDetailsSkeleton />
            </div>
            }>
                <ProductDetails />
            </Suspense>
        </div>
    );
};

export default ProductDetailLite;