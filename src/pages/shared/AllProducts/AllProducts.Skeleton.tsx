import React from 'react';
import TableSkeleton from "UI/Skeleton/Table.Skeleton";

const AllProductsSkeleton = () => {

    const columns = ["ID", "Title", "Image", "Category", "Brand", "Added At", "isApprove", "Actions"]

    return (
        <div>
            <TableSkeleton numberOfRow={40} columns={columns} />

        </div>
    );
};

export default AllProductsSkeleton;