import React from 'react';
import Skeleton from "UI/Skeleton/Skeleton";

const ProductSkeleton = () => {
    return (
        <Skeleton>
            <Skeleton.Line className="h-32 w-full x-auto"/>
            <div className="">
                <Skeleton.Line className="h-6 w-10/12 mt-2 "/>
                <Skeleton.Line className="h-2 w-9/12 mt-2 "/>
                <Skeleton.Line className="h-2 w-8/12 mt-2 "/>
                <Skeleton.Line className="h-2 w-7/12 mt-2 "/>

            </div>
        </Skeleton>
    );
};

export default ProductSkeleton;