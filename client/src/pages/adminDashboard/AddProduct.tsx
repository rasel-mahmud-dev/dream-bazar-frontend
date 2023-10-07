import React, {lazy} from 'react';
const AddProductShared = lazy(() => import("components/AddProduct/AddProduct"));

const AddProduct = () => {
    return (
        <div>
            <AddProductShared roleFor="Admin" />
        </div>
    );
};

export default AddProduct;