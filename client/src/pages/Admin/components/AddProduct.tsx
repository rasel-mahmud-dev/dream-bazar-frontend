import React, {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import api from "src/apis";
import ActionInfo from "components/ActionInfo/ActionInfo";
import {InputGroup} from "UI/Form";
import FileUpload from "UI/Form/File/FileUpload";
import SelectGroup from "UI/Form/SelectGroup";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "src/store";
import apis from "src/apis";
import {fetchFlatCategories} from "actions/productAction";
import {ACTION_TYPES} from "store/types";
import {Button} from "UI/index";



interface Props {

}


const AddProduct: FC<Props> = (props) => {
    
    const params = useParams();
    const dispatch = useDispatch();
    
    const {productState: { flatCategories } } = useSelector((state: RootState)=>state)
    
    const [brands, setBrands] = useState([])
    
    useEffect(()=>{
        (async function () {
            const dd = await apis.get("/api/brands");
            setBrands(dd.data);
        
            try{
                let a = await fetchFlatCategories();
                if(!flatCategories) {
                    dispatch({
                        type: ACTION_TYPES.FETCH_CATEGORIES,
                        payload: a
                    })
                }
            } catch (ex){}
        
        })();
    }, [])
    
    const [state, setState] = useState({
        httpResponse: "",
        httpStatus: 200,
        productData: {
            title: { value: "", errorMessage: "" },
            coverPhoto: { value: "", errorMessage: "" },
            categoryId: { value: "", errorMessage: "" },
            brandId: { value: "", errorMessage: "" },
            price: { value: "", errorMessage: "" },
            qty: { value: "", errorMessage: "" },
            discount: { value: "", errorMessage: "" }
        }
    })
    
    const {productData } = state
    
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
        setState({
            ...state,
            productData: updateProductData
        })
    }
    
    
    async function handleSave(e){
        let updateState = {...state}
        
        e.preventDefault();
    
        let isComplete = true
        let payload = new FormData();
    
        for (let item in productData) {
        
            if(item === "coverPhoto"){
                if(productData[item].value) {
                    if (typeof productData[item].value === "string") {
                        payload.append(item, productData[item].value)
                    } else {
                        payload.append(item, productData[item].value, productData[item].value.name)
                    }
                }
            } else if(item === "forCategory"){
                let categoryIds = []
                if(productData[item].value && Array.isArray(productData[item].value) && productData[item].value.length){
                    for(let cat of productData[item].value){
                        categoryIds.push(cat.id)
                    }
                } else {
                    productData[item].errorMessage = "Please select brand for category "
                }
            
                payload.append(item, JSON.stringify(categoryIds))
            
            } else {
                if(!productData[item].value){
                    isComplete = false;
                    productData[item].errorMessage = "Please enter " + item
                }
                payload.append(item, productData[item].value)
            }
        }
    
        if(!isComplete){
            updateState.httpStatus = 500
            updateState.httpResponse = "Please fill Input"
            setState(updateState)
            return;
        }
    
        updateState.httpStatus = 200
        updateState.httpResponse = "pending"
    
        // setState(updateState)
    
        let response = await api.post("/api/productss", payload)
        
        // updateState = {...state}
        
        // if(isShowForm === "new"){
        //     let g = {
        //         ...productData,
        //         sold: 0,
        //         views: 0
        //     }
        //     let response = await api.post("/api/products", {...g})
        //     let returnProduct: any = response.data
        //     setProducts([returnProduct])
        //
        // } else if(isShowForm === "update"){
        //     let g: any = {
        //         ...updatedProductCopy,
        //         ...productData,
        //     }
        //     const {brand, category, _id, ...rest} = g
        //
        //     let { data } = await api.put(`/api/products/${updatedProductCopy._id}`, {...rest})
        //     let index = oldProducts.findIndex(p=>p._id === updatedProductCopy._id )
        //     oldProducts[index] = data.product
        //     setProducts(oldProducts)
        // }
        
    }
    
    
    
    return (
        <div className="container">
            <div className="pr-4 card">
                
                <div className="flex items-center justify-between">
                    <h1 className="h2">{ params.id ? "Update Product" : "Add Product"}</h1>
                </div>
                
                <form onSubmit={handleSave}>
                    
                    <ActionInfo
                        message={state.httpResponse}
                        statusCode={state.httpStatus}
                        className="mt-4"
                    />
                    
                    <InputGroup
                        name="title"
                        label="Title"
                        className="!flex-col"
                        inputClass="input-group"
                        labelClass="dark:text-white !mb-2"
                        state={productData}
                        placeholder="Enter Title"
                        onChange={handleChange}
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
                        className={"!flex-col"}
                    />
                    
                    <SelectGroup
                        name="categoryId"
                        labelClass="dark:text-white !mb-2"
                        className={"!flex-col"}
                        // value={productData.categoryId.value}
                        label="Select categoryId"
                        inputClass="input-group"
                        placeholder="categoryId"
                        onChange={handleChange}
                        state={productData}
                        options={() => (
                            <>
                            <option value="0">Select category parent ID</option>
                                {flatCategories?.filter(cat=>cat.isProductLevel == 1).map((cat) => (
                                    <option className="cursor-pointer py-1 menu-item"  value={cat.id}>{cat.name}</option>
                                ))}
                        </>
                        )}
                    />
                    
                    <SelectGroup
                        name="brandId"
                        labelClass="dark:text-white !mb-2"
                        className={"!flex-col"}
                        // value={productData.parentId.value}
                        label="Select brandId"
                        inputClass="input-group"
                        placeholder="brandId"
                        onChange={handleChange}
                        state={productData}
                        options={() => (
                            <>
                            <option value="0">Select brandId ID</option>
                                {brands?.map((cat) => (
                                    <option className="cursor-pointer py-1 menu-item"  value={cat.id}>{cat.name}</option>
                                ))}
                        </>
                        )}
                    />
                    
                    <InputGroup
                        name="discount"
                        label="discount"
                        type="number"
                        className="!flex-col"
                        inputClass="input-group"
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
                        inputClass="input-group"
                        labelClass="dark:text-white !mb-2"
                        state={productData}
                        placeholder="Price"
                        onChange={handleChange}
                    />
                    
                    <InputGroup
                        name="qty"
                        label="qty"
                        type="number"
                        className="!flex-col"
                        inputClass="input-group"
                        labelClass="dark:text-white !mb-2"
                        state={productData}
                        placeholder="qty"
                        onChange={handleChange}
                    />
                    
                    <div className="flex items-center gap-x-4" >
                        <Button type="submit" className="bg-secondary-300 mt-4" loaderClass="!border-white" loading={state.httpResponse === "pending"}>
                            {!params.id ? "Add Product" : "Update Product"}
                            </Button>
                        </div>
                    
                </form>
                
                
            </div>
        </div>
    );
};

export default AddProduct;