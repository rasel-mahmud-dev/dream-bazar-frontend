import React, {lazy, Suspense} from 'react';
import AllProductsSkeleton from "pages/shared/AllProducts/AllProducts.Skeleton";
const AllProducts =  lazy(()=>import("pages/shared/AllProducts/AllProducts")) ;

const AllProductsLite = () => {
    return (
        <div>
            <Suspense fallback={<AllProductsSkeleton />}>
                <AllProducts />
            </Suspense>
        </div>
    );
};

export default AllProductsLite;