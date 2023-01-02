import React from 'react';
import Skeleton from "UI/Skeleton/Skeleton";

const BrandListSkeleton = () => {
    return (
        <div>
            <div className="card">


                <Skeleton className="dark">
                    <div className="flex py-4 justify-between items-center">
                        <Skeleton.Line className="w-32 h-3" />
                        <Skeleton.Line className="w-20 h-5" />
                    </div>

                </Skeleton>

                <div className="grid grid-cols-4 gap-x-4 mb-2 justify-between">

                <span>Logo Name</span>

                <span>CreatedAt</span>
                <span>UpdatedAt</span>
                <span>Action</span>
                </div>


                    <Skeleton className="dark">
                  <div className="grid grid-cols-4 gap-x-4 mb-2 justify-between">
                      <Skeleton.Line className="w-20 h-2" />
                      <Skeleton.Line className="w-20 h-2" />
                      <Skeleton.Line className="w-20 h-2" />
                      <Skeleton.Line className="w-20 h-2" />
                  </div>

                    { new Array(40).fill(0).map(item=>(<div>
                        <div className="flex space-x-2 space-y-2">
                            <Skeleton.Line className="w-full h-2 mt-2" />
                            <Skeleton.Line className="w-full h-2" />
                            <Skeleton.Line className="w-full h-2" />
                            <Skeleton.Line className="w-full h-2" />
                        </div>
                    </div>))}

                </Skeleton>

            </div>
        </div>
    );
};

export default BrandListSkeleton;