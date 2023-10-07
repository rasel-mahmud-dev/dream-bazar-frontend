import React from 'react';
import Card from "UI/Form/Card/Card";
import SelectGroup from "UI/Form/SelectGroup";
import {InputGroup} from "UI/Form";
import {Button} from "components/UI";

const GeneralInformation = ({newProductData, handleChange, flatCategories, allBrands, generateNewProductSku, onNext}) => {
    return (
        <div>

            <Card>
                {/*<InputGroup*/}
                {/*    state={state.userData}*/}
                {/*    name="email"*/}
                {/*    inputClass="bg-input-group"*/}
                {/*    onChange={handleChange}*/}
                {/*    placeholder={l("Enter Email")}*/}
                {/*/>*/}

                <InputGroup
                    name="title"
                    required={newProductData.title.required}
                    label="Product Title"
                    className="!flex-col   "
                    state={newProductData}
                    placeholder="New Product"
                    onChange={handleChange}
                />
                <InputGroup
                    name="summary"
                    label="Summary"
                    as="textarea"
                    className="!flex-col   "
                    required={newProductData.summary.required}
                    state={newProductData}
                    placeholder="Product summary"
                    onChange={handleChange}
                />
            </Card>

            {/*********** General Information **********/}
            <Card>
                <h5 className="heading-5">General Information</h5>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    <SelectGroup
                        required={newProductData.productType.required}
                        name="categoryId"
                        className={"!flex-col"}
                        label="Product Type"
                        placeholder="categoryId"
                        onChange={handleChange}
                        state={newProductData}
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
                        required={newProductData.categoryId.required}
                        name="categoryId"
                        labelClass="dark:text-white !mb-2"
                        className={"!flex-col"}
                        label="Category"
                        inputClass="bg-input-group"
                        placeholder="categoryId"
                        onChange={handleChange}
                        state={newProductData}
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
                        className={"!flex-col"}
                        label="Brand"
                        required={newProductData.brandId.required}
                        placeholder="brandId"
                        onChange={handleChange}
                        state={newProductData}
                        options={() => (
                            <>
                                <option value="">Brand</option>
                                <option className="cursor-pointer py-1 menu-item" value="63c063e7310ae08eea4d6929">
                                    Other
                                </option>
                                {allBrands?.map((cat: any) => (
                                    <option key={cat._id} className="cursor-pointer py-1 menu-item" value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </>
                        )}
                    />

                    <InputGroup
                        name="sku"
                        required={newProductData.sku.required}
                        label="Product Code Sku"
                        labelAddition={() => (
                            <span className="text-blue-500 cursor-pointer font-medium active:text-blue-400 " onClick={generateNewProductSku}>
                                    Generate Code
                                </span>
                        )}
                        className="!flex-col "
                        state={newProductData}
                        placeholder="Code"
                        onChange={handleChange}
                    />
                </div>
            </Card>

            <Button className="ml-auto block" theme="primary" onClick={onNext}>Next</Button>
        </div>
    );
};

export default GeneralInformation;