import React, {lazy, Suspense} from 'react';
import AllProductsSkeleton from "pages/shared/AllProducts/AllProducts.Skeleton";
const AllProducts =  lazy(()=>import("pages/shared/AllProducts/AllProducts")) ;

const AllProductsLite = (props) => {
    return (
        <div>
            <Suspense fallback={<AllProductsSkeleton />}>
                <AllProducts {...props} />
            </Suspense>
        </div>
    );
};

export default AllProductsLite;