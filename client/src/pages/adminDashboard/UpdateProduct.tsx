import React, {lazy} from 'react';

const AddProductShared = lazy(() => import("components/AddProduct/AddProduct"));


const UpdateProduct = () => {
    return (
        <div>
            <AddProductShared roleFor="Admin"/>
        </div>
    );
};

export default UpdateProduct;