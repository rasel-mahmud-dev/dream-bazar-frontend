import React, {FC, SyntheticEvent, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import api from "src/apis";
import ActionInfo from "components/ActionInfo/ActionInfo";
import {File, InputGroup} from "UI/Form";
import FileUpload from "UI/Form/File/FileUpload";
import SelectGroup from "UI/Form/SelectGroup";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "src/store";
import apis from "src/apis";
import { fetchProduct, fetchProductForUpdate} from "actions/productAction";
import {ACTION_TYPES} from "store/types";
import {Button, Modal, Tabs} from "UI/index";
import errorMessageCatch from "src/utills/errorMessageCatch";
import fullLink from "src/utills/fullLink";
import staticImagePath from "src/utills/staticImagePath";
import {Popup} from "UI/index";
import ModalWithBackdrop from "components/ModalWithBackdrop/ModalWithBackdrop";
import {
    fetchAdminBrandsAction,
    fetchAdminProductsAction,
    fetchAdminStaticFilesAction, fetchFlatCategoriesAction, updateProductAction
} from "actions/adminProductAction";



interface Props {

}


const AddProduct: FC<Props> = (props) => {
    
    const params = useParams();
    const dispatch = useDispatch();
    
    const navigate = useNavigate()
    
    const {productState: { flatCategories, adminBrands, adminProducts, adminCategories, adminStaticFiles } } = useSelector((state: RootState)=>state)
    
    
    useEffect(()=>{
        (async function () {
            fetchAdminBrandsAction(adminBrands, dispatch)
            fetchFlatCategoriesAction( flatCategories, dispatch)
        })();
    }, [])
    
    useEffect(()=>{
        if(params.id && params.id.length === 24) {
            fetchProductForUpdate(params.id, function (err, result){
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
    }, [params.id])
    
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
        },
        isShowStaticChooser: false,
        staticImages: []
    })
    
    const {productData, staticImages, isShowStaticChooser } = state
    
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
        setState(prev=>({
            ...prev,
            productData: updateProductData
        }))
        
    }
    
    
    async function handleSave(e) {
        let updateState = {...state}
    
        e.preventDefault();
    
        let isComplete = true
        let payload = new FormData();
    
        for (let item in productData) {
        
            if (item === "coverPhoto") {
                if (productData[item].value) {
                    if (typeof productData[item].value === "string") {
                        payload.append(item, productData[item].value)
                    } else {
                        // when value is blob image
                        let blobName  = ""
                        if(productData[item].value){
                            blobName = (productData[item].value as any).name
                        }
                        payload.append(item, productData[item].value, blobName)
                    }
                }
            } else {
                if (!productData[item].value) {
                    isComplete = false;
                    productData[item].errorMessage = "Please enter " + item
                }
                payload.append(item, productData[item].value)
            }
        }
    
        if (!isComplete) {
            updateState.httpStatus = 500
            updateState.httpResponse = "Please fill Input"
            setState(updateState)
            return;
        }
    
        updateState.httpStatus = 200
        updateState.httpResponse = "pending"
    
    
        setState(updateState)
    
        updateState = {...state}
    
        if (params.id) {
            try {
                let [status, data] = await updateProductAction<any>(adminProducts, params.id, payload, dispatch)
                if (status === 201) {
                    updateState.httpResponse = data.message
                    updateState.httpStatus = 200
                    navigate(-1)
                }
            }catch (ex){
                updateState.httpResponse = errorMessageCatch(ex);
                updateState.httpStatus = 500
            } finally {
                setState(updateState)
            }
            
        } else {
            // add as a new Product
            apis.post("/api/product", payload).then(({status, data}) => {
                if (status === 201) {
                    updateState.httpResponse = data.message
                    updateState.httpStatus = 200
                    navigate(-1)
                }
            }).catch(ex => {
                updateState.httpResponse = errorMessageCatch(ex);
                updateState.httpStatus = 500
            }).finally(() => {
                setState(updateState)
            })
        }
    }
    
    
    function handleToggleStaticImageChooserModal(isOpen: boolean){
         //  load all static files...
        fetchAdminStaticFilesAction(adminStaticFiles, dispatch)
        setState(prev=>({
            ...prev,
            isShowStaticChooser: !prev.isShowStaticChooser,
        }));
    }
    
    function handleChooseImage(imagePath: string){
        let updateProductData = { ...productData}
        updateProductData.coverPhoto = {
            value: imagePath,
            errorMessage: ""
        }
        setState(prev=>({
            ...prev,
            productData: updateProductData,
            isShowStaticChooser: false
        }))
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
                        statusCode={state.httpStatus as any}
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
                        previewImageClass="max-w-sm"
                        className={"!flex-col"}
                    />
                    <h2>
                        <Button
                            onClick={()=>handleToggleStaticImageChooserModal(!isShowStaticChooser)}
                            type="button"
                            className="btn bg-green-500 !py-1.5 mt-2">Or Select Static Photos</Button>
                    </h2>
                  
                    <StaticPhotoChooser
                        staticImages={adminStaticFiles ? adminStaticFiles : []}
                        onChooseImage={handleChooseImage}
                        isShowStaticChooser={isShowStaticChooser}
                        onClose={()=>handleToggleStaticImageChooserModal(false)}
                    />
                    
                    <SelectGroup
                        name="categoryId"
                        labelClass="dark:text-white !mb-2"
                        className={"!flex-col"}
                        label="Select categoryId"
                        inputClass="input-group"
                        placeholder="categoryId"
                        onChange={handleChange}
                        state={productData}
                        options={() => (
                            <>
                            <option value="0">Select category parent ID</option>
                                {flatCategories?.filter((cat: any)=>cat.isProductLevel == 1).map((cat: any) => (
                                    <option className="cursor-pointer py-1 menu-item"  value={cat._id}>{cat.name}</option>
                                ))}
                        </>
                        )}
                    />
                    
                    <SelectGroup
                        name="brandId"
                        labelClass="dark:text-white !mb-2"
                        className={"!flex-col"}
                        label="Select brandId"
                        inputClass="input-group"
                        placeholder="brandId"
                        onChange={handleChange}
                        state={productData}
                        options={() => (
                            <>
                            <option value="0">Select brandId ID</option>
                                {adminBrands.cached && adminBrands.cached?.map((cat: any) => (
                                    <option className="cursor-pointer py-1 menu-item"  value={cat._id}>{cat.name}</option>
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


const StaticPhotoChooser = ({onClose, onChooseImage, staticImages, isShowStaticChooser})=>{
    return (
        <div>
            <ModalWithBackdrop isOpen={isShowStaticChooser} onCloseModal={onClose} maxHeight={600} maxWidth={900}>
                    <div>
                         <div className="flex flex-wrap gap-2">
                            {staticImages.map((path) => (
                                <div className="cursor-pointer">
                                    <img
                                        className="w-20"
                                        onClick={()=>onChooseImage(path)}
                                        src={staticImagePath(path)}
                                        alt=""/>
                                </div>
                            ))}
                        </div>
                </div>
                
           </ModalWithBackdrop>
        </div>
    )
}




export default AddProduct;