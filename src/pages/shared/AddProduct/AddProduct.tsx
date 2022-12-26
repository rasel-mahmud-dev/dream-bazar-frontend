import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InputGroup } from "UI/Form";
import SelectGroup from "UI/Form/SelectGroup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";
import { fetchAdminBrandsAction, fetchFlatCategoriesAction } from "actions/adminProductAction";
import Card from "UI/Form/Card/Card";
import FileUpload from "UI/Form/File/FileUpload";
import { Button } from "UI/index";
import MultipleFileChooser from "UI/Form/File/MultipleFileChooser";
import generateSku from "src/utills/generateSku";
import { fetchProductForUpdate } from "actions/productAction";
import { StatusCode } from "store/types";
import errorMessageCatch from "src/utills/errorMessageCatch";

import useToast from "src/hooks/useToast";
import HttpResponse from "components/HttpResponse/HttpResponse";
import { getApi } from "src/apis";
import ProductAttribute from "pages/shared/AddProduct/ProductAttribute";
import ProductSpecification, {Specification} from "pages/shared/AddProduct/ProductSpecification";
import ActionModal from "components/ActionModal/ActionModal";
// import ProductSpecification from "pages/shared/AddProduct/ProductSpecification";

const AddProduct = () => {
    const params = useParams();
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const sectionNameInputRef = useRef<HTMLInputElement>();

    const [toast] = useToast();

    const {
        productState: { flatCategories, adminBrands },
    } = useSelector((state: RootState) => state);

    const [httpResponse, setHttpResponse] = useState({
        message: "",
        isSuccess: false,
        loading: false,
    });

    const [state, setState] = useState({
        productData: {
            title: { value: "", errorMessage: "", required: true },
            coverPhoto: { value: null, errorMessage: "", required: true },
            images: {
                value: [
                    // {blob: "", base64: "", fileName: "", url: ""}
                ],
                errorMessage: "",
                required: true,
            },
            categoryId: { value: "", errorMessage: "", required: true },
            brandId: { value: "", errorMessage: "", required: true },
            price: { value: 0, errorMessage: "", required: true },
            qty: { value: 1, errorMessage: "", required: true },
            shippingCost: { value: 0, errorMessage: "", required: true },
            tax: { value: 0, errorMessage: "", required: false },
            discount: { value: 0, errorMessage: "", required: true },
            videoLink: { value: "", errorMessage: "", required: false },
            sku: { value: "", errorMessage: "", required: true },
            summary: { value: "", errorMessage: "", required: true },
            productType: { value: "Physical", errorMessage: "", required: true },
            minOrder: { value: 0, errorMessage: "", required: false },
        },
        isShowStaticChooser: false,
        staticImages: [],
        attributeValue: {},
        categoryDetail: {
            // _id: "",
            // catId: "",
            // catName: "",
            // defaultExpand: [],
            // filterAttributes: [],
            filterAttributesValues: null,
            productDescriptionSectionInput: {
                // [sectionName]: [
                //     {specificationName: string, value: string, required: boolean},
                //     {specificationName: string, value: string, required: boolean}
                // ]
            },

            // renderProductAttr: []
        },
        specifications: {},
        productDescription: {
            details: {},
        },
    });


    const { productData, categoryDetail, staticImages } = state;

    useEffect(() => {
        fetchAdminBrandsAction(adminBrands, dispatch);
        fetchFlatCategoriesAction(flatCategories, dispatch);
    }, []);

    useEffect(() => {
        if (params.productId && params.productId.length === 24) {
            fetchProductForUpdate(params.productId, function (err, result) {
                if (!err) {
                    let updateProductData = { ...state.productData };
                    for (let updateProductDataKey in updateProductData) {
                        if (updateProductDataKey === "categoryId") {
                            selectFilterValues(result["categoryId"]);
                        }
                        if (result[updateProductDataKey]) {
                            updateProductData[updateProductDataKey].value = result[updateProductDataKey];
                        }
                    }

                    let updateAttributeValue = { ...state.attributeValue };
                    if (result["attributes"]) {
                        for (let attributesKey in result["attributes"]) {
                            updateAttributeValue[attributesKey] = result["attributes"][attributesKey];
                        }
                    }
                    if (result.productDescription) {
                        updateProductData["summary"].value = result.productDescription?.summary;
                    }

                    setState({
                        ...state,
                        productData: updateProductData,
                        attributeValue: updateAttributeValue,
                        productDescription: result["productDescription"],
                    });
                }
            });
        }
    }, [params.productId]);

    // Product details section value fill up when update Product
    useEffect(() => {
        if (params.productId) {
            // from Product description collection
            if (state.productDescription && categoryDetail.productDescriptionSectionInput) {
                let details = state.productDescription.details;
                if (details) {
                    let updatedProductDescriptionSectionInput = categoryDetail.productDescriptionSectionInput;

                    for (let detailsKey in details) {
                        let spec = updatedProductDescriptionSectionInput[detailsKey];
                        if (spec) {
                            updatedProductDescriptionSectionInput[detailsKey] = spec?.map((s) => {
                                let specValue = details[detailsKey][s.specificationName];
                                s.value = specValue;
                                return s;
                            });
                        }
                    }
                    setState((s) => ({
                        ...s,
                        categoryDetail: { ...s.categoryDetail, productDescriptionSectionInput: updatedProductDescriptionSectionInput },
                    }));
                }
            }
        }
    }, [categoryDetail.productDescriptionSectionInput, state.productDescription?.details]);

    function handleChange(e) {
        const { name, value } = e.target;
        let updateProductData = { ...productData };

        if (name === "logo") {
            updateProductData = {
                ...updateProductData,
                [name]: {
                    ...updateProductData[name],
                    value: value,
                    errorMessage: updateProductData[name] ? "" : updateProductData[name].errorMessage,
                },
            };
        } else {
            updateProductData = {
                ...updateProductData,
                [name]: {
                    ...updateProductData[name],
                    value: value,
                    errorMessage: updateProductData[name] ? "" : updateProductData[name].errorMessage,
                },
            };
        }

        setState((prev) => ({
            ...prev,
            productData: updateProductData,
        }));
    }


    function generateNewProductSku() {
        setState((prev) => {
            let updateProductData = { ...prev.productData };
            updateProductData.sku = { value: generateSku(), errorMessage: "", required: true };
            return {
                ...prev,
                productData: updateProductData,
            };
        });
    }

    function selectFilterValues(categoryId) {
        if (!categoryId) return undefined;

        getApi()
            .get("/api/category/category-detail?categoryId=" + categoryId)
            .then(({ data, status }) => {
                if (status === 200) {
                    setState((prevState) => {
                        let productDescriptionSectionInput = {};
                        let obj = data.productDescriptionSection;
                        if (obj) {
                            for (let objKey in obj) {
                                let specifications = obj[objKey];
                                specifications = specifications.map((spec) => ({ specificationName: spec, value: "", required: true }));
                                productDescriptionSectionInput[objKey] = specifications;
                                // if(specifications && specifications.length > 0){
                                //     let s = {}
                                //     specifications = specifications.map(spec=>{
                                //         s[spec] = ""
                                //     })
                                //     productDescriptionSectionInput[objKey] = s
                                // }
                            }
                        }
                        // console.log(productDescriptionSectionInput)
                        // console.log(productDescriptionSectionInput)
                        data.productDescriptionSectionInput = productDescriptionSectionInput;
                        return {
                            ...prevState,
                            categoryDetail: data,
                        };
                    });
                }
            })
            .catch((ex) => {});
    }

    function handleAttributeChange(attributes){
        setState((prevState)=>({
            ...prevState,
            attributeValue: attributes
        }))
    }

    function handleChangeSpecification(specifications: Specification[]){
            setState(prevState => ({...prevState, specifications: specifications}))
    }



    // handle update or add Product
    async function handleSubmit(e) {
        e.preventDefault();
        setHttpResponse((p) => ({ ...p, message: "", isSuccess: false }));

        let isCompleted = true;
        let errorMessage = "";
        let payload = {};
        let formData = new FormData();
        for (let productDataKey in productData) {
            if (productData[productDataKey].required) {
                if (
                    productData[productDataKey].value == 0 &&
                    productDataKey !== "categoryId" &&
                    productDataKey !== "brandId" &&
                    productDataKey !== "price" &&
                    productDataKey !== "qty"
                ) {
                    payload[productDataKey] = productData[productDataKey].value;
                } else if (!productData[productDataKey].value) {
                    isCompleted = false;
                    errorMessage = productDataKey + " required";
                    break;
                } else {
                    payload[productDataKey] = productData[productDataKey].value;
                }
            } else {
                payload[productDataKey] = productData[productDataKey].value;
            }
        }

        if (!isCompleted) {
            toast.error(errorMessage);
            setHttpResponse((p) => ({ ...p, message: errorMessage, isSuccess: false }));
            return;
        }

        const {specifications, attributeValue} = state

        /********** Product attribute value ************/
        if (attributeValue) {
            if (!Object.keys(attributeValue).length) {
                errorMessage = "Please provide attribute fields";
                toast.error(errorMessage);
                setHttpResponse((p) => ({ ...p, message: errorMessage, isSuccess: false }));
                return;
            }
        }
        // add Product details sections
        formData.append("attributes", JSON.stringify(attributeValue));




        /********** deep specification section ************/
        /* make it like and send to server
            { General: {"In The Box" :  "value"}}
        * */
        let isDoneSpecifications = true;
        let specificationValues = {};
        for (let specificationsKey in specifications) {
            if (specifications[specificationsKey] && specifications[specificationsKey].length > 0) {
                let specificationForSection = {};
                specifications[specificationsKey].forEach((specification) => {
                    specificationForSection[specification.specificationName] = specification.value ? specification.value : "";
                });
                specificationValues[specificationsKey] = specificationForSection;
            }
        }

        if (!isDoneSpecifications) {
            let msg = "Please provide description required field";
            toast.error(msg);
            return setHttpResponse((p) => ({ ...p, message: msg, isSuccess: false }));
        }


        // add Product details sections
        formData.append("specification", JSON.stringify(specificationValues));

        for (let payloadKey in payload) {
            if (payloadKey === "images") {
                payload[payloadKey] &&
                    payload[payloadKey].forEach((item, index) => {
                        if (item.blob) {
                            formData.append(payloadKey + "-" + index, item.blob, item.fileName);
                        } else if (item.url) {
                            formData.append(payloadKey, item.url);
                        }
                    });
            } else if (payloadKey === "coverPhoto") {
                if (payload[payloadKey] && typeof payload[payloadKey] === "object") {
                    formData.append(payloadKey, payload[payloadKey], payload[payloadKey]?.name);
                }
            } else {
                if (payload[payloadKey]) {
                    formData.append(payloadKey, payload[payloadKey]);
                }
            }
        }

        try {

            setHttpResponse(p=>({...p, message: "", loading: true }));

            if (params.productId) {
                let { status, data } = await getApi().patch("/api/product/" + params.productId, formData);
                if (status === StatusCode.Created) {

                    setTimeout(()=>{
                        setHttpResponse({ message: data.message, loading: false, isSuccess: true });
                        navigate("/admin/products")
                    }, 300)

                }
            } else {
                let { status, data } = await getApi().post("/api/product", formData);
                if (status === StatusCode.Created) {

                    setTimeout(()=>{
                        setHttpResponse({ message: data.message, loading: false, isSuccess: true });
                        navigate("/admin/products")
                    }, 300)
                }
            }
        } catch (ex) {
            setTimeout(()=> {
                setHttpResponse({message: errorMessageCatch(ex), loading: false, isSuccess: false});
            }, 300)
        } finally {
            setHttpResponse(p=>({...p, message: "", loading: false, isSuccess: true }));
        }
    }

    function handleFilWithFakeData() {
        setState((prevState: any) => ({
            ...prevState,

            productData: {
                ...prevState.productData,
                title: { value: "Iphone 100", errorMessage: "", required: true },
                price: { value: 150000, errorMessage: "", required: true },
                qty: { value: 10, errorMessage: "", required: true },
                shippingCost: { value: 200, errorMessage: "", required: true },
                tax: { value: 10, errorMessage: "", required: false },
                discount: { value: 20, errorMessage: "", required: true },
                videoLink: { value: "", errorMessage: "", required: false },
                sku: { value: 232425, errorMessage: "", required: true },
                summary: { value: "Some dummy post descriptions", errorMessage: "", required: true },
                productType: { value: "Physical", errorMessage: "", required: true },
                minOrder: { value: 1, errorMessage: "", required: false },
            },
        }));
    }


    return (
        <div className="">
            <h1 className="route-title">{params.productId ? "Update Product" : "Add Product"}</h1>

            <ActionModal
                {...httpResponse}
                loadingTitle="Product is Adding..."
                onClose={()=>httpResponse.message !== "" && setHttpResponse((p)=>({...p, message: ""})) }/>

            <form onSubmit={handleSubmit}>
                <Card>
                    <InputGroup
                        name="title"
                        required={productData.title.required}
                        label="Product Title"
                        className="!flex-col bg-white  "
                        inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                        labelClass="dark:text-white !mb-2"
                        state={productData}
                        placeholder="New Product"
                        onChange={handleChange}
                    />
                    <InputGroup
                        name="summary"
                        label="Summary"
                        as="textarea"
                        required={productData.summary.required}
                        className="!flex-col bg-white "
                        inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                        labelClass="dark:text-white !mb-2"
                        state={productData}
                        placeholder="Product summary"
                        onChange={handleChange}
                    />
                </Card>

                {/*********** General Information **********/}
                <Card>
                    <h5 className="heading-5">General Information</h5>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        <SelectGroup
                            required={productData.productType.required}
                            name="categoryId"
                            labelClass="dark:text-white !mb-2"
                            className={"!flex-col"}
                            label="Product Type"
                            inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                            placeholder="categoryId"
                            onChange={handleChange}
                            state={productData}
                            options={() => (
                                <>
                                    <option className="cursor-pointer py-1 menu-item" value="Physical">
                                        Physical
                                    </option>
                                    <option className="cursor-pointer py-1 menu-item" value="digital">
                                        Digital
                                    </option>
                                </>
                            )}
                        />
                        <SelectGroup
                            required={productData.categoryId.required}
                            name="categoryId"
                            labelClass="dark:text-white !mb-2"
                            className={"!flex-col"}
                            label="Category"
                            inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                            placeholder="categoryId"
                            onChange={handleChange}
                            state={productData}
                            options={() => (
                                <>
                                    <option value="">Category</option>
                                    {flatCategories
                                        ?.filter((cat: any) => cat.isProductLevel)
                                        .map((cat: any) => (
                                            <option key={cat._id} className="cursor-pointer py-1 menu-item" value={cat._id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                </>
                            )}
                        />

                        <SelectGroup
                            name="brandId"
                            labelClass="dark:text-white !mb-2"
                            className={"!flex-col"}
                            label="Brand"
                            required={productData.brandId.required}
                            inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                            placeholder="brandId"
                            onChange={handleChange}
                            state={productData}
                            options={() => (
                                <>
                                    <option value="">Brand</option>
                                    {adminBrands.cached &&
                                        adminBrands.cached?.map((cat: any) => (
                                            <option key={cat._id} className="cursor-pointer py-1 menu-item" value={cat._id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                </>
                            )}
                        />

                        <InputGroup
                            name="sku"
                            required={productData.sku.required}
                            label="Product Code Sku"
                            labelAddition={() => (
                                <span className="text-blue-500 cursor-pointer font-medium active:text-blue-400 " onClick={generateNewProductSku}>
                                    Generate Code
                                </span>
                            )}
                            className="!flex-col bg-white "
                            inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                            labelClass="dark:text-white !mb-2"
                            state={productData}
                            placeholder="Code"
                            onChange={handleChange}
                        />
                    </div>
                </Card>

                {/*********** Filter Attributes Information **********/}
                <ProductAttribute
                    onAttributeChange={handleAttributeChange}
                    categoryDetail={state.categoryDetail}
                />

                {/******* Product Price and Stock **************/}
                <Card>
                    <h5 className="heading-5">Product Price and Stock</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <InputGroup
                            required={productData.discount.required}
                            name="discount"
                            label="Discount"
                            type="number"
                            className="!flex-col"
                            inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                            labelClass="dark:text-white !mb-2"
                            state={productData}
                            placeholder="Discount"
                            onChange={handleChange}
                        />
                        <InputGroup
                            required={productData.price.required}
                            name="price"
                            label="Price"
                            type="number"
                            className="!flex-col"
                            inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                            labelClass="dark:text-white !mb-2"
                            state={productData}
                            placeholder="Price"
                            onChange={handleChange}
                        />
                        <InputGroup
                            name="tax"
                            label="Tax"
                            type="number"
                            required={productData.tax.required}
                            className="!flex-col"
                            labelAddition={() => (
                                <span className="badge bg-teal-400/10 text-teal-400 font-medium px-1 py-px rounded text-xs">Percent %</span>
                            )}
                            inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                            labelClass="dark:text-white !mb-2"
                            state={productData}
                            placeholder="Tax"
                            onChange={handleChange}
                        />

                        <InputGroup
                            name="qty"
                            required={productData.qty.required}
                            label="Total Quantity"
                            type="number"
                            className="!flex-col"
                            inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                            labelClass="dark:text-white !mb-2"
                            state={productData}
                            placeholder="qty"
                            onChange={handleChange}
                        />

                        <InputGroup
                            name="minOrder"
                            required={productData.minOrder.required}
                            label="Minimum Order Quantity"
                            type="number"
                            className="!flex-col"
                            inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                            labelClass="dark:text-white !mb-2 w-full"
                            state={productData}
                            placeholder="Minimum order quantity"
                            onChange={handleChange}
                        />
                        <InputGroup
                            name="shippingCost"
                            required={productData.shippingCost.required}
                            label="Shipping Cost"
                            type="number"
                            className="!flex-col"
                            inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                            labelClass="dark:text-white !mb-2"
                            state={productData}
                            placeholder="Shipping cost"
                            onChange={handleChange}
                        />
                    </div>
                </Card>

                {/******** Product Cover and Photos **********/}
                <Card>
                    <h5 className="heading-5">Product Cover and Photos</h5>

                    <InputGroup
                        required={productData.videoLink.required}
                        name="videoLink"
                        label="Youtube Video Link"
                        className="!flex-col"
                        inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                        labelClass="dark:text-white !mb-2"
                        state={productData}
                        placeholder="EX: https://www.youtube.com/embed/5Rdsf45"
                        onChange={handleChange}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <MultipleFileChooser
                            required={productData.images.required}
                            name="images"
                            label="Upload Product Images"
                            labelAddition={() => <span className="text-xs font-medium">Ratio (1:1)</span>}
                            inputClass="input-group"
                            onChange={handleChange}
                            defaultValue={productData.images.value}
                            labelClass="dark:text-white !mb-2"
                            className={"mt-4 col-span-3"}
                        />

                        {/*********** Cover **************/}
                        <FileUpload
                            name="coverPhoto"
                            required={productData.coverPhoto.required}
                            label="Upload Thumbnail"
                            labelAddition={() => <span className="text-xs font-medium">Ratio (1:1)</span>}
                            inputClass="input-group"
                            placeholder="Choose Cover Photo"
                            onChange={handleChange}
                            // defaultValue={productData.coverPhoto.value}
                            labelClass="dark:text-white !mb-2"
                            className={"!flex-col col-span-2 !w-40"}
                        />
                    </div>

                    <h2>
                        <Button
                            // onClick={()=>handleToggleStaticImageChooserModal(!isShowStaticChooser)}
                            type="button"
                            className="btn bg-green-500 !py-1.5 mt-2"
                        >
                            Or Select Static Photos
                        </Button>
                    </h2>
                </Card>


                {/******** Product Description sections **********/}
                <ProductSpecification
                    onChangeSpecifications={handleChangeSpecification}
                    onSetCategoryDetail={(data)=>setState((prevState)=>({...prevState, categoryDetail: data}))}
                    categoryId={state.productData?.categoryId?.value}
                />


                <Card className="mb-10">


                    <div className="flex items-center gap-x-4 mt-6">
                        <Button type="submit" className="bg-secondary-300 ">
                            {!params.productId ? "Add Product" : "Update Product"}
                        </Button>

                        <Button type="button" onClick={handleFilWithFakeData} className="bg-secondary-300 ">
                            Fil-Up Fake Data
                        </Button>
                    </div>
                </Card>
            </form>
        </div>
    );
};

export default AddProduct;
