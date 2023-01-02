import React, {lazy, Suspense} from 'react';
import CategoryNavbar from "components/categoryNavbar/CategoryNavbar";
import ProductFilterPageSkeleton from "pages/publicSite/productFilterPage/ProductFilterPage.Skeleton";

const ProductFilterPage  = lazy(()=>import("./ProductFilterPage"))

const ProductFilterPageLite = () => {
    return (
        <div>
            <CategoryNavbar />
            <Suspense fallback={
                <ProductFilterPageSkeleton />

            }>
                <ProductFilterPageSkeleton />
                <ProductFilterPage />
            </Suspense>
        </div>
    );
};

export default ProductFilterPageLite;