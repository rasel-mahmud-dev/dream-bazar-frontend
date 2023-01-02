import React from 'react';
import ProductSkeleton from 'src/components/Product/ProductSkeleton';
import Skeleton from "UI/Skeleton/Skeleton";

const ProductFilterPageSkeleton = () => {
    return (
        <div>

            <Skeleton className="flex gap-x-5 mt-8"  >

                <div className="card w-96 !m-0">

                    { new Array(20).fill(0).map((_, ii)=>(
                        <div className="my-10 first:my-0" key={ii}>
                            <Skeleton.Line className="h-6 w-11/12" />
                            { new Array(10).fill(0).map((_, i)=>(
                                <Skeleton.Line className="h-2 w-9/12 mt-4" key={i} />
                            )) }
                        </div>
                    )) }

                </div>

                <div className="w-full">
                    <div>
                        <Skeleton.Line className="h-6 w-11/12 " />
                        <Skeleton.Line className="h-4 w-20 mt-2 " />
                    </div>

                    <div className="card grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        { new Array(20).fill(0).map((_, i)=>(
                            <ProductSkeleton key={i} />
                        )) }
                    </div>


                </div>


            </Skeleton>


        </div>
    );
};

export default ProductFilterPageSkeleton;