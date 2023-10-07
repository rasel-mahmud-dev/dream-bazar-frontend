import React, {useEffect, useState} from 'react';
import {Button} from "UI/index";
import {AxiosResponse} from "axios";
import {toast} from "react-toastify";
import apis from "src/apis";
import useAppDispatch from "src/hooks/useAppDispatch";
import {BiCamera, BiTrash} from "react-icons/bi";
import {useSearchParams} from "react-router-dom";
import "./variant-form.scss"
import {fetchAttributesAction} from "actions/categoryAction";
import MultipleFileChooser from "UI/Form/File/MultipleFileChooser";

type VariantKey = number


type Attribute = {}

type Variant = {
    variant_id?: string // for update
    sku: string
    attributes: Attribute[]
}

type Variants = {
    [key: VariantKey]: Variant
}

type AttributeId = string


type AttributeValue = {
    attribute_value_id: string,
    attribute_id: string,
    variant_attribute_id?: string
    value: string
    label?: string
}

interface EditProductData {

    "product_id": string,
    "title": string,
    "description": string,
    "price": null,
    "variants": [
        {
            "variant_id": 10,
            "sku": "SKU90001",
            "attributes": [
                {
                    "attribute_id": 1,
                    "attribute_value_id": 10
                },
                {
                    "attribute_id": 2,
                    "attribute_value_id": 16
                },
                {
                    "attribute_id": 1,
                    "attribute_value_id": 12
                }
            ]
        }
    ]
}

const finalVariants = [
    {
        sku: "1000",
        variant_id: "",
        tempId: Date.now(),
        attributes: [
            {
                attribute_id: "433333333333333333",
                attribute_value: "Red",
                image: "",
                variant_base: true
            },
            {
                attribute_id: "111111111111111",
                attribute_value: "XS",
                image: "",
                variant_base: false
            },
            {
                attribute_id: "111111111111111",
                attribute_value: "XL",
                image: "",
                variant_base: false
            }
        ],
        images: [
            {  },
            {  },
            {  },
            {  },
        ]
    }
]


const VariantForm = ({onNext}) => {

    const [basicData, setBasicData] = useState<{
        imageBlob?: File,
        title: string,
        description: string,
        brandId: number
        categoryId: number
        price: number
        image?: string
        stock: number
    }>({
        title: "",
        price: 0,
        stock: 1,
        brandId: 0,
        categoryId: 0,
        imageBlob: undefined,
        image: "",
        description: ""
    })

    const [editProductData, setEditProductData] = useState({})

    const [variants, setVariants] = useState([{
        sku: "",
        variant_id: "",
        tempId: Date.now(),
        attributes: [{
            variant_base: false,
            attribute_id: "",
            attribute_value: "",
            image: "",
        }]
    }
    ])

    console.log(variants)

    const [searchParams] = useSearchParams()

    const productSlug = searchParams.get('productSlug')

    // const data = apis.get<Attribute[]>("/attributes").then(res => res.data)

    const [vData, setVData] = useState([])

    useEffect(() => {
        dispatch(fetchAttributesAction()).unwrap().then(data=>{
            setVData(data)
        })
    }, []);


    const attributeValuesRes = () => {
        return apis.get<Array<Attribute & {
            values: {
                attribute_value_id: string;
                value: string;
                label?: string;
            } | undefined
        }>>("/attributes/attribute-value?group_by=attribute_id").then(res => res.data)
    }

    const [attributeValue, setAttributeValue] = useState<{
        [key: AttributeId]: AttributeValue[]
    }>({})

    function fetchAttributeValue(attributeId: Pick<Attribute, "attribute_id">['attribute_id']) {
        apis.get("/products-service/api/attribute-value/" + attributeId).then(({data, status}) => {
            if (status === 200) {
                setAttributeValue(prev => ({
                    ...prev,
                    [attributeId]: data
                }))
            }
        })
    }

    function handleAddMoreVariant() {
        setVariants(prev => {
            let updatedState = [...prev]
            updatedState.push({
                sku: "",
                variant_id: "",
                tempId: Date.now(),
                attributes: [{
                    attribute_id: "",
                    attribute_value: "",
                    image: "",
                }]
            })
            return updatedState
        })
    }

    function handleAddMoreAttribute(variantTempId: number) {
        setVariants(prev => {
            let variantIndex = prev.findIndex(variant => variant.tempId == variantTempId)
            if (variantIndex !== -1) {
                prev[variantIndex].attributes.push({
                    attribute_id: "",
                    attribute_value: "",
                    image: "",
                })
            }
            return [...prev]
        })
    }

    function removeVariantItem(tempId: number) {
        setVariants(variants.filter(variant => variant.tempId !== tempId))
    }

    function removeVariantAttributeItem(tempId: number, attributeIndex: number) {
        setVariants((prev => {
            const updatedState = [...prev]
            const index = updatedState.findIndex(variant => variant.tempId === tempId)
            if (index !== -1) {
                updatedState[index].attributes.splice(attributeIndex, 1)
            }
            return updatedState
        }))
    }


    useEffect(() => {
        if (productSlug) {
            apis.get(`/products/${productSlug}`).then(({data, status}) => {
                if (status === 200) {
                    setEditProductData(data)
                    setBasicData(prev => ({
                        ...prev,
                        title: data?.title || "",
                        price: data?.price || 0,
                        image: data?.image || "",
                        description: data?.description || "",
                    }))

                    if (data?.variants) {
                        let updateVariants = []
                        for (let variant of data.variants) {

                            let attribures = variant.attribute.map(attr => ({
                                variant_attribute_id: attr.variant_attribute_id,
                                attribute_id: attr.attribute_id,
                                attribute_value: attr.attribute_value,
                                image: attr?.image,
                            }))

                            updateVariants.push({
                                variant_id: variant.variant_id,
                                tempId: variant.variant_id,
                                sku: variant.sku,
                                attributes: attribures,
                            })
                        }

                        setVariants(updateVariants)
                    }

                }
            }).catch(ex => {
            })
        }
    }, [productSlug])


    const dispatch = useAppDispatch()

    async function handleSubmit(e: any) {
        e.preventDefault();
        try {
            let image = basicData.image
            let response: AxiosResponse<{
                url: string
            }> | undefined

            if (basicData.imageBlob) {
                const formData = new FormData()
                formData.append("image", basicData.imageBlob, basicData.imageBlob.name)
                formData.append("folder", "product")
                response = await apis.post("upload/upload-image", formData)
                if (response?.data && response?.data.url) {
                    image = response?.data.url as string
                }
            }


            if (productSlug) {
                dispatch(updateProductAction({
                    slug: productSlug,
                    title: basicData.title,
                    description: basicData.description,
                    image: image,
                    price: basicData.price,
                    stock: basicData.stock,
                    variants: variants,
                })).unwrap().then(()=>{
                    toast.success("Product updated")
                })
            } else {

                dispatch(addProductAction({
                    title: basicData.title,
                    description: basicData.description,
                    image: image,
                    price: basicData.price,
                    stock: basicData.stock,
                    variants: variants,
                })).then(()=>{
                    toast.success("Product added")
                })
            }

            // if (productId) {
            //     response = await apis.patch("/products-service/api/products/" + productId, {
            //         variants: [],
            //         title: basicData.title,
            //         image: image,
            //         price: basicData.price,
            //         description: basicData.description,
            //     })
            //     console.log(response)
            // } else {
            //     response = await apis.post("/products-service/api/products", {
            //         variants: [],
            //         price: basicData.price,
            //         title: basicData.title,
            //         image: image,
            //         description: basicData.description,
            //     })
            //     console.log(response)
            // }

        } catch (ex) {
            console.log(ex)
        }
    }


    function handleChange(e: any, variantTempId: number, variantAttrIndex: number | undefined) {

        const {name, value} = e.target

        if (variantTempId && variantAttrIndex === undefined) {
            setVariants(prevState => {
                let findUpdateVariantIndex = prevState.findIndex(variant => variant.tempId == variantTempId)
                if (findUpdateVariantIndex !== -1) {
                    prevState[findUpdateVariantIndex] = {
                        ...prevState[findUpdateVariantIndex],
                        sku: e.target.value
                    }
                }
                return [...prevState];
            })
        } else if (variantTempId && variantAttrIndex !== undefined) {
            setVariants(prevState => {
                let findUpdateVariantIndex = prevState.findIndex(variant => variant.tempId == variantTempId)
                if (findUpdateVariantIndex !== -1) {
                    if (prevState[findUpdateVariantIndex].attributes[variantAttrIndex]) {
                        prevState[findUpdateVariantIndex].attributes[variantAttrIndex][name] = value
                    } else {
                        // prevState[variantkey].attributes[variantAttrIndex].attribute_id = value
                    }
                }
                return [...prevState]
            })
        } else {
            setBasicData(prevState => ({
                ...prevState,
                [name]: value
            }))

        }

    }


    function getAttributeValues(attributeId: string) {
        let a = vData.find(att => att._id == attributeId)
        return a?.options ?? []
    }


    return (
        <div>
            <div className="card">
                <div className="">
                    <div className="flex justify-between items-center">

                        <h2 className="text-lg font-semibold text-color-2">Create Variant</h2>
                        <button
                            className="btn-navy"
                            type="button"
                            onClick={handleAddMoreVariant}>
                            Add More Variant
                        </button>
                    </div>

                    {variants.map((variant, variantIndex) => (
                        <div className="mt-2">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <label className="text-color-3">Variant SKU</label>
                                    <button onClick={() => removeVariantItem(variant.tempId)}
                                            className="btn-navy !bg-red-400"><BiTrash/></button>
                                </div>
                                <input
                                    name="sku"
                                    className="rs-input"
                                    onChange={(e) => handleChange(e, variant.tempId, undefined)}
                                    type="text"
                                    value={variant.sku}
                                    placeholder="Variant SKU"
                                />
                            </div>

                            <div className="">
                                {variant.attributes.map((variantAttribute, index) => (
                                    <div className="flex items-center gap-x-2 mt-4">
                                        <div>
                                            <label className="text-color-3">Attribute</label>
                                            <select  className="rs-input" value={variantAttribute.attribute_id} name="attribute_id"
                                                    onChange={(e) => handleChange(e, variant.tempId, index)}>
                                                <option value="">Select Attribute</option>
                                                {vData?.map((attr) => (
                                                    <option key={attr._id}
                                                            value={attr._id}>{attr.attributeName}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="">
                                            <label className="text-color-3">Attribute Value</label>
                                            <select
                                                className="rs-input"
                                                value={variantAttribute.attribute_value}
                                                name="attribute_value"
                                                onChange={(e) => handleChange(e, variant.tempId, index)}
                                            >
                                                <option value="">Select value</option>

                                                {getAttributeValues(variantAttribute.attribute_id).map((attrValue) => (
                                                    <option key={attrValue.value}
                                                            value={attrValue.value}>{attrValue.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <button className="btn-navy bg-red-400">
                                            <BiCamera/>
                                        </button>

                                        <button       type="button" onClick={() => removeVariantAttributeItem(variant.tempId, index)}
                                                      className="btn-navy !bg-red-400"><BiTrash/></button>
                                    </div>
                                ))}

                                <MultipleFileChooser
                                    required={true}
                                    name="images"
                                    label="Variant Images"
                                    labelAddition={() => <span className="text-xs font-medium">Ratio (1:1)</span>}
                                    inputClass="bg-input-group"
                                    // onChange={handleChange}
                                    labelClass="dark:text-white !mb-2"
                                    className={"mt-4 col-span-3"}
                                />

                            </div>
                            <button
                                className="btn-navy mt-4"
                                type="button"
                                onClick={() => handleAddMoreAttribute(variant.tempId)}>
                                More Attribute
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <Button className="ml-auto block" theme="primary" onClick={onNext}>Next</Button>
        </div>
    );
};

export default VariantForm;



