import React from 'react';
import Card from "UI/Form/Card/Card";
import {InputGroup} from "UI/Form";
import {Button} from "UI/index";
import {useParams} from "react-router-dom";

const OtherInformation = ({newProductData, handleChange}) => {

    const params = useParams()

    return (
        <div>

            {/******* Product Price and Stock **************/}
            <Card>
                <h5 className="heading-5">Product Price and Stock</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <InputGroup
                        required={newProductData.discount.required}
                        name="discount"
                        label="Discount"
                        type="number"
                        className="!flex-col"
                        inputClass="bg-input-group"
                        labelClass="dark:text-white !mb-2"
                        state={newProductData}
                        placeholder="Discount"
                        onChange={handleChange}
                    />
                    <InputGroup
                        required={newProductData.price.required}
                        name="price"
                        label="Price"
                        type="number"
                        className="!flex-col"
                        inputClass="bg-input-group"
                        labelClass="dark:text-white !mb-2"
                        state={newProductData}
                        placeholder="Price"
                        onChange={handleChange}
                    />
                    <InputGroup
                        name="tax"
                        label="Tax"
                        type="number"
                        required={newProductData.tax.required}
                        className="!flex-col"
                        labelAddition={() => (
                            <span className="badge bg-teal-400/10 text-teal-400 font-medium px-1 py-px rounded text-xs">Percent %</span>
                        )}
                        inputClass="bg-input-group"
                        labelClass="dark:text-white !mb-2"
                        state={newProductData}
                        placeholder="Tax"
                        onChange={handleChange}
                    />

                    <InputGroup
                        name="qty"
                        required={newProductData.qty.required}
                        label="Total Quantity"
                        type="number"
                        className="!flex-col"
                        inputClass="bg-input-group"
                        labelClass="dark:text-white !mb-2"
                        state={newProductData}
                        placeholder="qty"
                        onChange={handleChange}
                    />

                    <InputGroup
                        name="minOrder"
                        required={newProductData.minOrder.required}
                        label="Minimum Order Quantity"
                        type="number"
                        className="!flex-col"
                        inputClass="bg-input-group"
                        labelClass="dark:text-white !mb-2 w-full"
                        state={newProductData}
                        placeholder="Minimum order quantity"
                        onChange={handleChange}
                    />
                    <InputGroup
                        name="shippingCost"
                        required={newProductData.shippingCost.required}
                        label="Shipping Cost"
                        type="number"
                        className="!flex-col"
                        inputClass="bg-input-group"
                        labelClass="dark:text-white !mb-2"
                        state={newProductData}
                        placeholder="Shipping cost"
                        onChange={handleChange}
                    />
                </div>
            </Card>

            <Button type="submit" className="bg-secondary-300 ">
                            {!params.productId ? "Add Product" : "Update Product"}
                        </Button>

        </div>
    );
};

export default OtherInformation;