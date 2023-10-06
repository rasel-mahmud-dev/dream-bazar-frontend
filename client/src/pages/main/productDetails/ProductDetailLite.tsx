import React, {lazy, Suspense} from 'react';
import ProductDetailsSkeleton from "pages/main/productDetails/ProductDetails.Skeleton";

const CategoryNavbar = lazy(() => import("components/categoryNavbar/CategoryNavbar"));
const ProductDetails = lazy(() => import("./ProductDetails"))

const ProductDetailLite = () => {
    return (
        <Suspense fallback={<div className="container">
            <ProductDetailsSkeleton/>
        </div>
        }>
            <CategoryNavbar/>
            <ProductDetails/>
        </Suspense>

    );
};



export default ProductDetailLite;