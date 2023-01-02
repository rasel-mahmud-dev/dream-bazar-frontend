import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";
import apis from "src/apis";
// import { deleteFlatCategoryAction } from "actions/productAction";
import {ACTION_TYPES, StatusCode} from "store/types";
import errorMessageCatch from "src/utills/errorMessageCatch";
import { toggleBackdrop } from "actions/appAction";
// import ActionInfo from "components/ActionInfo/ActionInfo";
// import { InputGroup } from "UI/Form";
import {Button, Modal} from "UI/index";
import {BsPencilSquare, FaPenAlt, FaTimes, FcEmptyTrash} from "react-icons/all";
// import Table, { Column } from "UI/table/Table";
// import SelectGroup from "UI/Form/SelectGroup";
// import Checkbox from "UI/Form/checkbox/Checkbox";
// import isoStringToDate from "src/utills/isoStringToDate";
// import {fetchCategoryDetailsAction, fetchFlatCategoriesAction, fetchProductAttributesAction} from "actions/adminProductAction";
import Card from "UI/Form/Card/Card";
import Circle from "UI/Circle/Circle";
// import AddCategoryDetail from "pages/adminDashboard/CategoryList/AddCategoryDetail";
import AddingAttribute from "pages/adminDashboard/productAttribute/AddingAttribute";
import {fetchProductAttributesAction} from "actions/adminProductAction";


const ProductAttribute = (props) => {
    const {
        appState,
        productState: { flatCategories },
        adminState: { productAttributes, categoryDetails }
    } = useSelector((state: RootState) => state);
    
    const dispatch = useDispatch();
    
    const [state, setState] = React.useState<any>({
        isShowForm: false,
        attribute: null
    });
    
    const { formData, isShowForm, updateId } = state;
    
    useEffect(() => {
        fetchProductAttributesAction(productAttributes, dispatch);
    }, []);
    
    
    function handleChange(e) {
        const { name, value, checked } = e.target;
        let updateFormData = { ...state.formData };
        updateFormData = {
            ...updateFormData,
            [name]: {
                ...updateFormData[name],
                value: name === "isProductLevel" ? checked : value,
                errorMessage: updateFormData[name] ? "" : updateFormData[name].errorMessage,
            },
        };
        setState({
            ...state,
            formData: updateFormData,
        });
    }
    
    async function handleAdd(e) {
        let updateState = { ...state };
        
        e.preventDefault();
        
        let isComplete = true;
        let payload = {};
        
        for (let item in formData) {
            if (item === "name") {
                if (!formData[item].value) {
                    isComplete = false;
                    formData[item].errorMessage = "Please enter " + item;
                }
            }
            
            payload[item] = formData[item].value;
        }
        
        if (!isComplete) {
            updateState.httpStatus = 500;
            updateState.httpResponse = "Please fill Input";
            setState(updateState);
            return;
        }
        
        updateState.httpStatus = 200;
        updateState.httpResponse = "pending";
        
        // setState(updateState);
        
        updateState = { ...state };
        
        if (updateId) {
            apis.patch("/api/category/" + updateId, payload)
            .then(({ status, data }) => {
                if (status === 201) {
                    updateState.httpResponse = data.message;
                    updateState.httpStatus = 200;
                    
                    dispatch({
                        type: ACTION_TYPES.UPDATE_FLAT_CATEGORY,
                        payload: data.category,
                    });
                }
            })
            .catch((ex) => {
                updateState.httpResponse = errorMessageCatch(ex);
                updateState.httpStatus = 500;
            })
            .finally(() => {
                setState(updateState);
            });
        } else {
            // add as a new brand
            apis.post("/api/category", payload)
            .then(({ status, data }) => {
                if (status === 201) {
                    updateState.httpResponse = data.message;
                    updateState.httpStatus = 200;
                    dispatch({
                        type: ACTION_TYPES.ADD_FLAT_CATEGORY,
                        payload: data.category,
                    });
                }
            })
            .catch((ex) => {
                updateState.httpResponse = errorMessageCatch(ex);
                updateState.httpStatus = 500;
            })
            .finally(() => {
                setState(updateState);
            });
        }
    }
    
    function clearField() {
        let update = { ...formData };
        for (let updateKey in update) {
            if (update[updateKey] && update[updateKey].value) {
                update[updateKey].value = "";
            }
        }
        return update;
    }
    
    function handleShowAddForm(isOpen = false) {
        setState({
            ...state,
            updateId: "",
            httpResponse: "",
            isShowForm: isOpen,
            formData: clearField(),
        });
        dispatch(
            toggleBackdrop({
                isOpen: isOpen,
                scope: "custom",
            })
        );
    }
    
    function setUpdateHandler(attr) {
        setState({
            ...state,
            isShowForm: true,
            attribute: attr
        });
        dispatch(
            toggleBackdrop({
                isOpen: true,
                scope: "custom",
            })
        );
    }
    
    function closeModal(){
        setState(p=>({
            ...p,
            isShowForm: false,
            attribute: null
        }))
        dispatch(
            toggleBackdrop({
                isOpen: false,
                scope: "custom",
            })
        );
    }
    
    
    // update and create attribute handler
    function handleUpdateAttributes(data, attributeId){
        if(attributeId){
            let updatedProductAttributes = [...productAttributes]
            let index = updatedProductAttributes.findIndex(att=>att._id === attributeId)
            if(index !== -1){
                updatedProductAttributes[index] = {
                    ...updatedProductAttributes[index],
                    ...data
                }
            }
            fetchProductAttributesAction(updatedProductAttributes, dispatch);
        } else {
            if(data) {
                fetchProductAttributesAction([data, ...productAttributes], dispatch);
            }
        }
        
        setState(s=>({...s, isShowForm: false}))
    }
    
    
    // deleted attribute handler
    function handleDeleteAttributes(attributeId){
        if(attributeId){
            fetchProductAttributesAction(productAttributes.filter(attr=>attr._id !== attributeId), dispatch);
        }
        setState(s=>({...s, isShowForm: false}))
    }
    
    function deleteItem(attributeId: string) {
        apis.delete("/api/product/attribute/"+attributeId).then(({status})=>{
            if(status === StatusCode.Ok){
                fetchProductAttributesAction(productAttributes.filter(attr=>attr._id !== attributeId), dispatch);
            }
        })
    }
    
    
    return (
        <div className="pr-4">
            <div className="flex items-center justify-between mt-4">
				<h1 className="heading-2">Attribute</h1>
                {!state.attribute ? (
                    <Button className="bg-secondary-300" onClick={() => handleShowAddForm(true)}>
						New Attribute
					</Button>
                ) : (
                    <Button className="bg-secondary-400" onClick={closeModal}>Cancel</Button>
                )}
			</div>
            
            
            <Modal isOpen={state.isShowForm} className="bg-red-500 !max-w-md !top-10" backdropClass="!bg-dark-900/80" onClose={closeModal}>
				<AddingAttribute
                    onUpdateAttributes={handleUpdateAttributes}
                    attribute={state.attribute}
                    onCloseForm={closeModal}
                />
			</Modal>
    
    
    
            <Card className={`${!state.isShowForm ? 'block' : 'hidden'}`}>
				<h3 className="heading-5">
					Attribute fetch {productAttributes?.length} of {productAttributes?.length}{" "}
				</h3>
                
                {productAttributes?.map((attr, index) => (
                    <div className="border my-10 rounded-md relative p-5">
						<div className="absolute right-2  top-2 flex gap-x-2">
							<Circle className=" !h-6 !w-6 hover:bg-green-450 hover:text-white" onClick={() => setUpdateHandler(attr)}>
								<FaPenAlt className="text-xs" />
							</Circle>

							<Circle className=" !h-6 !w-6 hover:bg-red-400 hover:text-white" onClick={() => deleteItem(attr._id)}>
								<FaTimes className="text-xs" />
							</Circle>
						</div>
                        <span>SL: {index + 1}</span>
						<code className="whitespace-pre-line ">
							<pre className="overflow-x-auto">{JSON.stringify(attr, undefined, 2)}</pre>
						</code>
					</div>
                ))}
                
			</Card>
		</div>
    );
};

export default ProductAttribute;



