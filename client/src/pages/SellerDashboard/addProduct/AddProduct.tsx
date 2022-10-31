import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {InputGroup} from "UI/Form";
import SelectGroup from "UI/Form/SelectGroup";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "src/store";
import {
    fetchAdminBrandsAction,
    fetchFlatCategoriesAction,
} from "actions/adminProductAction";
import Card from "UI/Form/Card/Card";
import FileUpload from "UI/Form/File/FileUpload";
import {Button} from "UI/index";
import MultipleFileChooser from "UI/Form/File/MultipleFileChooser";
import generateSku from "src/utills/generateSku";
import {fetchProductForUpdate} from "actions/productAction";
import apis from "src/apis";

const AddProduct = () => {
    const params = useParams();
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    
    const {
        productState: {
            flatCategories,
            adminBrands,
            adminProducts,
            adminCategories,
            adminStaticFiles,
        },
    } = useSelector((state: RootState) => state);
    
    const [state, setState] = useState({
        httpResponse: "",
        httpStatus: 200,
        productData: {
            title: {value: "", errorMessage: ""},
            coverPhoto: {value: "", errorMessage: ""},
            images: {value: "", errorMessage: ""},
            categoryId: {value: "", errorMessage: ""},
            brandId: {value: "", errorMessage: ""},
            price: {value: "", errorMessage: ""},
            qty: {value: "", errorMessage: ""},
            discount: {value: "", errorMessage: ""},
            videoLink: {value: "", errorMessage: ""},
            sku: {value: "", errorMessage: ""},
        },
        isShowStaticChooser: false,
        staticImages: [],
        categoryDetail: {
            // _id: "",
            // catId: "",
            // catName: "",
            // defaultExpand: [],
            // filterAttributes: [],
            filterAttributesValues: null,
            // renderProductAttr: []
        },
    });

    const {productData,staticImages } = state;
    
    useEffect(()=>{
        fetchAdminBrandsAction(adminBrands, dispatch)
        fetchFlatCategoriesAction(flatCategories, dispatch)
    }, [])
    
    
    useEffect(()=>{
        if(params.productId && params.productId.length === 24) {
            fetchProductForUpdate(params.productId, function (err, result){
                if(!err){
                    let updateProductData = {...state.productData};
                    for (let updateProductDataKey in updateProductData) {
                        if(result[updateProductDataKey]) {
                            updateProductData[updateProductDataKey].value = result[updateProductDataKey]
                        }
                    }
                    
                    setState({
                        ...state,
                        productData: updateProductData
                    })
                }
            })
        }
    }, [params.productId])
    
    function handleChange(e) {
        const { name, value } = e.target
        let updateProductData = { ...productData}
        
        if(name === "logo") {
            updateProductData = {
                ...updateProductData,
                [name]: {
                    ...updateProductData[name],
                    value: value,
                    errorMessage: updateProductData[name] ? "" : updateProductData[name].errorMessage
                }
            }
        } else {
            updateProductData = {
                ...updateProductData,
                [name]: {
                    ...updateProductData[name],
                    value: value,
                    errorMessage: updateProductData[name] ? "" : updateProductData[name].errorMessage
                }
            }
        }
        

        if(name === "categoryId"){
            selectFilterValues(value)
        }
    
        setState(prev=>({
            ...prev,
            productData: updateProductData
        }))
    }
    
    function handleSubmit(e){
        e.preventDefault();
    }
    
    function generateNewProductSku(){
        setState(prev=>{
            let updateProductData = {...prev.productData}
            updateProductData.sku = {value: generateSku(), errorMessage: ""}
            return {
                ...prev,
                productData: updateProductData
            }
        })
    }
    
    
    
    function selectFilterValues(categoryId){
        if(!categoryId) return undefined;
        
        apis.get("/api/category/category-detail?categoryId="+categoryId).then(({data, status})=>{
            
            if(status === 200){
                setState(prevState => ({
                    ...prevState,
                    categoryDetail: data
                }))
            }
            
        }).catch(ex=>{
        
        })
    }

    return (
        <div className="">
			<h1 className="heading-4">
				{params.productId ? "Update Product" : "Add Product"}
			</h1>

			<form onSubmit={handleSubmit}>
				<Card>
					<InputGroup
                        name="title"
                        required={true}
                        label="Product Title"
                        className="!flex-col bg-white  "
                        inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                        labelClass="dark:text-white !mb-2"
                        state={productData}
                        placeholder="New Product"
                        onChange={handleChange}
                    />
					<InputGroup
                        name="Description"
                        label="Description"
                        required={true}
                        className="!flex-col bg-white "
                        inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                        labelClass="dark:text-white !mb-2"
                        state={productData}
                        placeholder="Product Description"
                        onChange={handleChange}
                    />
				</Card>

                {/*********** General Information **********/}
				<Card>
					<h5 className="heading-5">General Information</h5>

					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
						<SelectGroup
                            required={true}
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
                            required={true}
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
									<option value="0">
										Category
									</option>
                                    {flatCategories
                                    ?.filter(
                                        (cat: any) =>
                                            cat.isProductLevel
                                    )
                                    .map((cat: any) => (
                                        <option
                                            className="cursor-pointer py-1 menu-item"
                                            value={cat._id}
                                        >
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
                            required={true}
                            inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                            placeholder="brandId"
                            onChange={handleChange}
                            state={productData}
                            options={() => (
                                <>
									<option value="0">Brand</option>
                                    {adminBrands.cached &&
                                        adminBrands.cached?.map((cat: any) => (
                                            <option
                                                className="cursor-pointer py-1 menu-item"
                                                value={cat._id}
                                            >
												{cat.name}
											</option>
                                        ))}
								</>
                            )}
                        />
                        
                        <InputGroup
                            name="sku"
                            label="Product Code Sku"
                            labelAddition={()=> (
                                <span className="text-blue-500 cursor-pointer font-medium active:text-blue-400 " onClick={generateNewProductSku}>Generate Code</span>
                            )}
                            required={true}
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
                <Card>
					<h5 className="heading-5">Filter Attributes</h5>
                    {!state.categoryDetail?.filterAttributesValues && (
                        <h1>Please select a Category</h1>
                    ) }
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        {state.categoryDetail?.filterAttributesValues?.map(attribute=>(
                              <div>
                                  {attribute.options && (
                                      <div>
                                        <h4 className="heading-5">{attribute.attributeLabel}</h4>
                                         <select className="border px-4 py-2" >
                                                    <option value="">Select {attribute.attributeLabel}</option>
                                              {attribute.options?.map((option)=>(
                                                    <option value={option.value}>{option.name}</option>
                                              ))}
                                         </select>
                                      </div>
                                  )}
                            </div>
                        ))}
                    </div>
					
				</Card>

                {/******* Product Price and Stock **************/}
				<Card>
					<h5 className="heading-5">Product Price and Stock</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <InputGroup
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
                            required={true}
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
                            className="!flex-col"
                            labelAddition={()=><span className="badge bg-teal-400/10 text-teal-400 font-medium px-1 py-px rounded text-xs">Percent %</span>}
                            inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                            labelClass="dark:text-white !mb-2"
                            state={productData}
                            placeholder="Tax"
                            onChange={handleChange}
                        />
    
                        <InputGroup
                            name="qty"
                            required={true}
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
                            name="qty"
                            required={true}
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
                            name="qty"
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
                            name="images"
                            label="Upload Product Images"
                            labelAddition={()=><span className="text-xs font-medium">Ratio (1:1)</span>}
                            inputClass="input-group"
                            onChange={handleChange}
                            defaultValue={productData.images.value}
                            labelClass="dark:text-white !mb-2"
                            className={"mt-4 col-span-3"}
                        />
    
                        {/*********** Cover **************/}
                        <FileUpload
                            name="coverPhoto"
                            label="Upload Thumbnail"
                            required={true}
                            labelAddition={()=><span className="text-xs font-medium">Ratio (1:1)</span>}
                            inputClass="input-group"
                            placeholder="Choose Cover Photo"
                            onChange={handleChange}
                            defaultValue={productData.coverPhoto.value}
                            labelClass="dark:text-white !mb-2"
                            className={"!flex-col col-span-2"}
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
                    
                    
                    <Button type="submit" className="bg-secondary-300 mt-4" loaderClass="!border-white" loading={state.httpResponse === "pending"}>
                        {!params.productId ? "Add Product" : "Update Product"}
                    </Button>
                    
				</Card>
    
			</form>
		</div>
    );
};

export default AddProduct;