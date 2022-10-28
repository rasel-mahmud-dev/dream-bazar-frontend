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
        },
        isShowStaticChooser: false,
        staticImages: [],
    });
    
    const {productData, staticImages, isShowStaticChooser} = state;
    
    useEffect(() => {
        fetchFlatCategoriesAction(flatCategories, dispatch);
        fetchAdminBrandsAction(adminBrands, dispatch);
    }, []);
    
    function handleChange(e) {
    }
    
    
    
    return (
        <div className="p-4">
			<h1 className="heading-4">
				{params.productId ? "Update Product" : "Add Product"}
			</h1>

			<form action="">
				<Card>
					<InputGroup
                        name="title"
                        label="Product Title"
                        className="!flex-col bg-white  "
                        inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                        labelClass="dark:text-white !mb-2"
                        state={productData}
                        placeholder="New Product"
                        onChange={handleChange}
                    />
					<InputGroup
                        name="title"
                        label="Description"
                        className="!flex-col bg-white "
                        inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                        labelClass="dark:text-white !mb-2"
                        state={productData}
                        placeholder="Product Description"
                        onChange={handleChange}
                    />
				</Card>

				<Card>
					<h5 className="heading-5">General Information</h5>

					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
						<SelectGroup
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
										Select category parent ID
									</option>
                                    {flatCategories
                                    ?.filter(
                                        (cat: any) =>
                                            cat.isProductLevel == 1
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
                            inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                            placeholder="brandId"
                            onChange={handleChange}
                            state={productData}
                            options={() => (
                                <>
									<option value="0">Select brandId ID</option>
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
                            name="title"
                            label="Product Code Sku * Generate Code"
                            className="!flex-col bg-white "
                            inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                            labelClass="dark:text-white !mb-2 w-full"
                            state={productData}
                            placeholder="Product Description"
                            onChange={handleChange}
                        />
                        
					</div>
				</Card>

				<Card>
					<h5 className="heading-5">Product Price and Stock</h5>

					<InputGroup
                        name="discount"
                        label="discount"
                        type="number"
                        className="!flex-col"
                        inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                        labelClass="dark:text-white !mb-2"
                        state={productData}
                        placeholder="discount"
                        onChange={handleChange}
                    />
					<InputGroup
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
                        inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                        labelClass="dark:text-white !mb-2"
                        state={productData}
                        placeholder="Tax"
                        onChange={handleChange}
                    />

					<InputGroup
                        name="qty"
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
				</Card>

				<Card>
					<h5 className="heading-5">Product Cover and Photos</h5>

					<MultipleFileChooser
                        name="images"
                        label="Upload Product Images"
                        inputClass="input-group"
                        onChange={handleChange}
                        defaultValue={productData.images.value}
                        labelClass="dark:text-white !mb-2"
                        errorMessage={productData.images.errorMessage}
                        previewImageClass="max-w-sm w-full"
                        className={"!flex-col"}
                    />
                    
                    {/*********** Cover **************/}
                    <FileUpload
                        name="coverPhoto"
                        label="coverPhoto"
                        inputClass="input-group"
                        placeholder="Choose Cover Photo"
                        onChange={handleChange}
                        defaultValue={productData.coverPhoto.value}
                        labelClass="dark:text-white !mb-2"
                        errorMessage={productData.coverPhoto.errorMessage}
                        previewImageClass="max-w-sm w-full"
                        className={"!flex-col"}
                    />
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
			</form>
		</div>
    );
};

export default AddProduct;