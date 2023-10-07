import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {InputGroup} from "UI/Form";
import SelectGroup from "UI/Form/SelectGroup";
import Card from "UI/Form/Card/Card";
import FileUpload from "UI/Form/File/FileUpload";
import {Button} from "UI/index";
import MultipleFileChooser from "UI/Form/File/MultipleFileChooser";
import generateSku from "src/utills/generateSku";
import {ProductDescriptionType, Roles, StatusCode} from "store/types";
import errorMessageCatch from "src/utills/errorMessageCatch";

import useToast from "src/hooks/useToast";

import apis from "src/apis";
import ProductAttribute from "components/AddProduct/ProductAttribute";
import ProductSpecification, {Specification} from "components/AddProduct/ProductSpecification";
import ActionModal from "components/ActionModal/ActionModal";
import {fetchBrands} from "actions/brandAction";
import useAppDispatch from "src/hooks/useAppDispatch";
import useAppSelector from "src/hooks/useAppSelector";
import {CategoryDetail} from "reducers/categoryReducer";
import {fetchCategoryDetail, fetchFlatCategoriesAction} from "actions/categoryAction";
import useScrollTop from "src/hooks/useScrollTop";
import {ProductType} from "reducers/productSlice";
import VariantForm from "components/AddProduct/VariantForm";
import Tab from "UI/Tab/Tab";
import GeneralInformation from "components/AddProduct/GeneralInformation";
import OtherInformation from "components/AddProduct/OtherInformation";


const AddProduct = ({roleFor}) => {
    const params = useParams();
    const dispatch = useAppDispatch();

    useScrollTop()

    const {productId} = params

    console.log(productId)

    const navigate = useNavigate();


    const [toast] = useToast();

    const {
        categoryState: {flatCategories},
        brandState: {allBrands}
    } = useAppSelector(state => state);

    const [httpResponse, setHttpResponse] = useState({
        message: "",
        isSuccess: false,
        loading: false,
    });

    const [state, setState] = useState({
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


    const [newProductData, setNewProductData] = useState({
        title: {value: "", errorMessage: "", required: true},
        coverPhoto: {value: null, errorMessage: "", required: true},
        images: {
            value: [
                // {blob: "", base64: "", fileName: "", url: ""}
            ],
            errorMessage: "",
            required: true,
        },
        categoryId: {value: "", errorMessage: "", required: true},
        brandId: {value: "", errorMessage: "", required: true},
        price: {value: 0, errorMessage: "", required: true},
        qty: {value: 1, errorMessage: "", required: true},
        shippingCost: {value: 0, errorMessage: "", required: true},
        tax: {value: 0, errorMessage: "", required: false},
        discount: {value: 0, errorMessage: "", required: true},
        videoLink: {value: "", errorMessage: "", required: false},
        sku: {value: "", errorMessage: "", required: true},
        summary: {value: "", errorMessage: "", required: true},
        productType: {value: "Physical", errorMessage: "", required: true},
        minOrder: {value: 0, errorMessage: "", required: false},
    })

    const [productDetail, setProductDetail] = useState<ProductDescriptionType>({})
    const [product, setProduct] = useState<ProductType>({} as ProductType)

    const [categoryDetail, setCategoryDetail] = useState<CategoryDetail>({} as CategoryDetail)

    useEffect(() => {
        if (!allBrands || allBrands?.length === 0) {
            dispatch(fetchBrands())
        }

        fetchFlatCategoriesAction(flatCategories, dispatch);

    }, []);


    function fetchProductDetail(productId: string) {
        return new Promise<[any, any]>(async (resolve) => {
            try {
                let {status, data} = await apis.get(`/api/product/detail/${productId}`)
                if (status === StatusCode.Ok) {
                    resolve([data, null])
                }

            } catch (ex) {
                resolve([null, errorMessageCatch(ex)])
            }
        })
    }

    function fetchProduct(productId: string) {
        return new Promise<[any, any]>(async (resolve) => {
            try {
                let {status, data} = await apis.get(`/api/v1/products/update-info?id=${productId}`)
                if (status === StatusCode.Ok) {
                    resolve([data, null])
                }

            } catch (ex) {
                resolve([null, errorMessageCatch(ex)])
            }
        })
    }


    // fetch product data that need to update
    useEffect(() => {
        (async function () {
            if (!(productId && productId.length === 24)) return

            let [data] = await fetchProduct(productId)
            // if(data.product) {
            //     let updateProductData = {...newProductData};
            //
            //     for (let updateProductDataKey in updateProductData) {
            //         if (product[updateProductDataKey]) {
            //             updateProductData[updateProductDataKey].value = data.product[updateProductDataKey];
            //         }
            //     }
            //
            //     if(data.productDetail){
            //         if(data.productDetail.summary){
            //             updateProductData["summary"].value = data.productDetail.summary;
            //         }
            //         setProductDetail(data.productDetail)
            //     }
            //     setNewProductData(updateProductData)
            //     setProduct(data.product)
            // }
        }())
    }, [productId]);


    // fetch category detail when change product category id
    useEffect(() => {
        if (newProductData.categoryId.value) {
            fetchCategoryDetail(newProductData.categoryId.value).then(([data]) => {
                if (data) {
                    setCategoryDetail(data)
                }
            })
        }
    }, [newProductData.categoryId.value])


    function handleChange(e) {
        const {name, value} = e.target;
        let updateProductData = {...newProductData};

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

        setNewProductData(updateProductData);
    }


    function generateNewProductSku() {
        setNewProductData((prev) => {
            return {
                ...prev,
                sku: {value: generateSku(), errorMessage: "", required: true}
            };
        });
    }


    function handleAttributeChange(attributes) {
        setState((prevState) => ({
            ...prevState,
            attributeValue: attributes
        }))
    }

    function handleChangeSpecification(specifications: Specification) {
        setState(prevState => ({...prevState, specifications: specifications}))
    }


    // handle update or add Product
    async function handleSubmit(e) {
        e.preventDefault();
        setHttpResponse((p) => ({...p, message: "", isSuccess: false}));

        let isCompleted = true;
        let errorMessage = "";
        let payload = {};
        let formData = new FormData();
        for (let newProductDataKey in newProductData) {
            if (newProductData[newProductDataKey].required) {
                if (
                    newProductData[newProductDataKey].value == 0 &&
                    newProductDataKey !== "categoryId" &&
                    newProductDataKey !== "brandId" &&
                    newProductDataKey !== "price" &&
                    newProductDataKey !== "qty"
                ) {
                    payload[newProductDataKey] = newProductData[newProductDataKey].value;
                } else if (!newProductData[newProductDataKey].value) {
                    isCompleted = false;
                    errorMessage = newProductDataKey + " required";
                    break;
                } else {
                    payload[newProductDataKey] = newProductData[newProductDataKey].value;
                }
            } else {
                payload[newProductDataKey] = newProductData[newProductDataKey].value;
            }
        }

        if (!isCompleted) {
            setHttpResponse((p) => ({...p, message: errorMessage, isSuccess: false}));
            return;
        }

        const {specifications, attributeValue} = state

        /********** Product attribute value ************/
        if (attributeValue) {
            // if (!Object.keys(attributeValue).length) {
            //     errorMessage = "Please provide attribute fields";
            //     setHttpResponse((p) => ({...p, message: errorMessage, isSuccess: false}));
            //     return;
            // }
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
            return setHttpResponse((p) => ({...p, message: msg, isSuccess: false}));
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

            setHttpResponse(p => ({...p, message: "", loading: true}));
            let redirectPath = roleFor === Roles.ADMIN ? "admin" : "seller"

            if (productId) {
                formData.append("_id", params.productId)
                let {status, data} = await apis.patch("/api/product/" + params.productId, formData);
                if (status === StatusCode.Created) {

                    setTimeout(() => {
                        setHttpResponse({message: data.message, loading: false, isSuccess: true});
                        navigate(`/${redirectPath}/products`)
                    }, 300)

                }
            } else {
                let {status, data} = await apis.post("/api/product", formData);
                if (status === StatusCode.Created) {

                    setTimeout(() => {
                        setHttpResponse({message: data.message, loading: false, isSuccess: true});
                        navigate(`/${redirectPath}/products`)
                    }, 300)
                }
            }
        } catch (ex) {
            setTimeout(() => {
                setHttpResponse({message: errorMessageCatch(ex), loading: false, isSuccess: false});
            }, 300)
        } finally {
            setHttpResponse(p => ({...p, message: "", loading: false, isSuccess: true}));
        }
    }

    function handleFilWithFakeData() {
        setNewProductData((prevState: any) => ({
            ...prevState,
            title: {value: "Iphone 100", errorMessage: "", required: true},
            price: {value: 150000, errorMessage: "", required: true},
            qty: {value: 10, errorMessage: "", required: true},
            shippingCost: {value: 200, errorMessage: "", required: true},
            tax: {value: 10, errorMessage: "", required: false},
            discount: {value: 20, errorMessage: "", required: true},
            videoLink: {value: "", errorMessage: "", required: false},
            sku: {value: 232425, errorMessage: "", required: true},
            summary: {value: "Some dummy post descriptions", errorMessage: "", required: true},
            productType: {value: "Physical", errorMessage: "", required: true},
            minOrder: {value: 1, errorMessage: "", required: false},
        }))

        setCategoryDetail(null as unknown as CategoryDetail)
    }

    const tabComponents = {
        1: () => <GeneralInformation
            newProductData={newProductData}
            handleChange={handleChange}
            flatCategories={flatCategories}
            allBrands={allBrands}
            generateNewProductSku={generateNewProductSku}
            onNext={() => setActiveTab(2)}
        />,
        2: () => <VariantForm onNext={() => setActiveTab(3)}/>,
        3: () => <ProductAttribute
            onNext={() => setActiveTab(4)}
            productDetail={productDetail}
            defaultAttribute={product.attributes}
            onAttributeChange={handleAttributeChange}
            categoryDetail={categoryDetail}
        />,
        4: () => <ProductSpecification
            categoryDetail={categoryDetail}
            defaultValue={productDetail.specification}
            onChangeSpecifications={handleChangeSpecification}
            onNext={() => setActiveTab(5)}
        />,
        5: () => <OtherInformation
            newProductData={newProductData}
            handleChange={handleChange}
        />

    }

    const tabHeader = {
        1: {
            title: "General Information ",
        },
        2: {
            title: "Product Variant "
        },
        3: {
            title: "Product Attributes"
        },
        4: {
            title: "Product Specification"
        },
        5: {
            title: "Other Information"
        }
    }
    const [activeTab, setActiveTab] = useState(1)


    return (
        <div className="">
            <h1 className="route-title">{productId ? "Update Product" : "Add Product"}</h1>

            <ActionModal
                {...httpResponse}
                loadingTitle={`Product is  ${productId ? "Updating" : "Adding"}...`}
                onClose={() => httpResponse.message !== "" && setHttpResponse((p) => ({...p, message: ""}))}/>


            <div className="mt-2">
                <Tab
                    onTabChange={(i) => setActiveTab(i as number)}
                    tabComponents={tabComponents}
                    openTabIndex={activeTab}
                    tabHeader={tabHeader}
                />
            </div>

            <form onSubmit={handleSubmit}>

                {/*********** Filter Attributes Information **********/}


                {/******** Product Cover and Photos **********/}
                {/*<Card>*/}
                {/*    <h5 className="heading-5">Product Cover and Photos</h5>*/}

                {/*    <InputGroup*/}
                {/*        required={newProductData.videoLink.required}*/}
                {/*        name="videoLink"*/}
                {/*        label="Youtube Video Link"*/}
                {/*        className="!flex-col"*/}
                {/*        inputClass="bg-input-group"*/}
                {/*        labelClass="dark:text-white !mb-2"*/}
                {/*        state={newProductData}*/}
                {/*        placeholder="EX: https://www.youtube.com/embed/5Rdsf45"*/}
                {/*        onChange={handleChange}*/}
                {/*    />*/}

                {/*    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">*/}
                {/*        <MultipleFileChooser*/}
                {/*            required={newProductData.images.required}*/}
                {/*            name="images"*/}
                {/*            label="Upload Product Images"*/}
                {/*            labelAddition={() => <span className="text-xs font-medium">Ratio (1:1)</span>}*/}
                {/*            inputClass="bg-input-group"*/}
                {/*            onChange={handleChange}*/}
                {/*            defaultValue={newProductData.images.value}*/}
                {/*            labelClass="dark:text-white !mb-2"*/}
                {/*            className={"mt-4 col-span-3"}*/}
                {/*        />*/}

                {/*        /!*********** Cover **************!/*/}
                {/*        <FileUpload*/}
                {/*            name="coverPhoto"*/}
                {/*            required={newProductData.coverPhoto.required}*/}
                {/*            label="Upload Thumbnail"*/}
                {/*            labelAddition={() => <span className="text-xs font-medium">Ratio (1:1)</span>}*/}
                {/*            inputClass="bg-input-group"*/}
                {/*            placeholder="Choose Cover Photo"*/}
                {/*            onChange={handleChange}*/}
                {/*            defaultValue={newProductData.coverPhoto.value}*/}
                {/*            labelClass="dark:text-white !mb-2"*/}
                {/*            className={"!flex-col col-span-2 !w-40"}*/}
                {/*        />*/}
                {/*    </div>*/}

                {/*    <h2>*/}
                {/*        <Button*/}
                {/*            // onClick={()=>handleToggleStaticImageChooserModal(!isShowStaticChooser)}*/}
                {/*            type="button"*/}
                {/*            className="btn bg-green-500 !py-1.5 mt-2"*/}
                {/*        >*/}
                {/*            Or Select Static Photos*/}
                {/*        </Button>*/}
                {/*    </h2>*/}
                {/*</Card>*/}


                {/******** Product Description sections **********/}


                {/*<Card className="mb-10">*/}
                {/*    */}
                {/*    <div className="flex items-center gap-x-4 mt-6">*/}
                {/*        <Button type="submit" className="bg-secondary-300 ">*/}
                {/*            {!params.productId ? "Add Product" : "Update Product"}*/}
                {/*        </Button>*/}

                {/*        <Button type="button" onClick={handleFilWithFakeData}*/}
                {/*                className="bg-secondary-300 ">*/}
                {/*            Fil-Up Fake Data*/}
                {/*        </Button>*/}
                {/*    </div>*/}
                {/*</Card>*/}
            </form>
        </div>
    );
};

export default AddProduct;
