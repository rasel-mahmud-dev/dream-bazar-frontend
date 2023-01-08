import React, {FC} from 'react';
import Skeleton from "UI/Skeleton/Skeleton";

type Props = {
    numberOfRow?: number
    columns?: string[]
}
const TableSkeleton: FC<Props> = ({numberOfRow = 20, columns}) => {
    return (
        <div>
            <div className="card">

                <Skeleton>
                    <div className="flex py-4 justify-between items-center">
                        <Skeleton.Line className="w-32 h-3"/>
                        <Skeleton.Line className="w-20 h-5"/>
                    </div>
                </Skeleton>

                <div className="flex flex-wrap gap-x-4 mb-2 justify-between font-semibold text-sm">
                    {columns ? columns.map(col => (
                        <span className="">{col}</span>
                    )) : (
                        <>
                            <span>Logo Name</span>
                            <span>CreatedAt</span>
                            <span>UpdatedAt</span>
                            <span>Action</span>
                        </>
                    )}
                </div>


                <Skeleton>
                    { new Array(columns?.length || numberOfRow).fill(0).map(item=>(<div>
                        <div className="flex space-x-2 ">

                            {columns ? columns.map(col => (
                                <Skeleton.Line className="w-full h-4 mt-2" />
                            )) : (
                                <>
                                    <Skeleton.Line className="w-full h-4 mt-2" />
                                    <Skeleton.Line className="w-full h-4 mt-2" />
                                    <Skeleton.Line className="w-full h-4 mt-2" />
                                    <Skeleton.Line className="w-full h-4 mt-2" />
                                </>
                            )}

                        </div>
                    </div>))}

                </Skeleton>

            </div>
        </div>
    );
};

export default TableSkeleton;