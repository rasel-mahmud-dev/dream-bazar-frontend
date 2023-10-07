import React, {FC, useEffect, useState} from 'react';
import Card from "UI/Form/Card/Card";
import {ProductDescriptionType} from "store/types";
import {Button} from "UI/index";


interface Props {
    productDetail: ProductDescriptionType
    categoryDetail: any,
    onAttributeChange: (args: any) => void
    defaultAttribute: {}
    onNext: Function
}


const ProductAttribute: FC<Props> = ({productDetail,onNext, categoryDetail, onAttributeChange, defaultAttribute}) => {

    const [attributes, setAttributes ] = useState({})


    function handleChangeAttribute(e) {
        const { name, value } = e.target;
        let updateAttributeValue = { ...attributes };
        if (isNaN(Number(value))) {
            updateAttributeValue[name] = value;
        } else {
            updateAttributeValue[name] = Number(value);
        }
        setAttributes(updateAttributeValue );
        onAttributeChange && onAttributeChange(updateAttributeValue)
    }

    useEffect(()=>{

        if(defaultAttribute && typeof defaultAttribute === "object") {
            setAttributes(defaultAttribute)
            onAttributeChange && onAttributeChange(defaultAttribute)
        }

    }, [defaultAttribute])



    /**
        whitelist product attribute when adding product.
     */
    let whitelist = ["customerRate"]

    return (
        <div>
            {/*********** Filter Attributes Information **********/}
            <Card>
                <h5 className="heading-5">Filter Attributes</h5>
                {!categoryDetail?.filterAttributesValues && <h1 className="text-red-500 text-sm">Please select a Category</h1>}
                <div className="mt-4 grid grid-cols-2 gap-4">
                    {categoryDetail?.filterAttributesValues?.map((attribute, idx) => !whitelist.includes(attribute.attributeName) && (
                        <div key={idx}>
                            {attribute.options && (
                                <div>
                                    <h4 className="heading-5 !font-normal">{attribute.attributeLabel}</h4>
                                    <select
                                        value={attributes[attribute.attributeName]}
                                        onChange={handleChangeAttribute}
                                        name={attribute.attributeName}
                                        className="border px-4 py-2 rounded-md w-full outline-none hover:border-primary-500"
                                    >
                                        <option value="">Select {attribute.attributeLabel}</option>
                                        {attribute.options?.map((option, idx) => (
                                            <option key={idx} value={option.value}>{option.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Card>
            <Button className="ml-auto block" theme="primary" onClick={onNext}>Next</Button>
        </div>
    );
};

export default ProductAttribute;