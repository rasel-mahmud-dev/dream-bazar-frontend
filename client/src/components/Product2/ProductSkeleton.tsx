import React from 'react';
import Skeleton from "UI/Skeleton/Skeleton";

const ProductSkeleton = ({imagePlaceholder}) => {
    return (
        <Skeleton>
            <Skeleton.Line className="h-32 flex justify-center items-center w-full x-auto">
                {imagePlaceholder && imagePlaceholder }
            </Skeleton.Line>
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