import React, {lazy, Suspense} from 'react';
const Brands = lazy(()=> import("./Brands"));
import BrandListSkeleton from "pages/adminDashboard/brandList/BrandList.Skeleton";

const BrandListLite = () => {
    return (
        <div>
            <Suspense fallback={<BrandListSkeleton /> }>
                <Brands />
            </Suspense>

        </div>
    );
};

export default BrandListLite;