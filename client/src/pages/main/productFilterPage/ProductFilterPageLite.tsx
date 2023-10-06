import React, {lazy, Suspense} from 'react';
import CategoryNavbar from "components/categoryNavbar/CategoryNavbar";
import ProductFilterPageSkeleton from "pages/main/productFilterPage/ProductFilterPage.Skeleton";

const ProductFilterPage  = lazy(()=>import("./ProductFilterPage"))

const ProductFilterPageLite = () => {
    return (
        <div>
            <CategoryNavbar />
            <Suspense fallback={
                <ProductFilterPageSkeleton />

            }>
                <ProductFilterPage />
            </Suspense>
        </div>
    );
};

export default ProductFilterPageLite;