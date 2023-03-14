import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import  {getApi} from "src/apis";
import {ACTION_TYPES, StatusCode} from "store/types";
import {Button, Modal} from "UI/index";
import {BsPencilSquare, FcEmptyTrash} from "react-icons/all";
import Card from "UI/Form/Card/Card";
import AddAttribute from "pages/adminDashboard/productAttribute/AddAttribute";

import Table, {Column} from "UI/table/Table";
import {fetchProductAttributesAction} from "actions/categoryAction";
import useAppSelector from "src/hooks/useAppSelector";
import {FetchFilterAttributesAction} from "store/types/categoryActionTypes";
import usePrompt from "src/hooks/usePrompt";



const ProductAttribute = (props) => {
    const {
        categoryState: {productFilterAttributes}
    } = useAppSelector((state) => state);

    let prompt = usePrompt({
        title: "Are You sure to delete this Attribute?",
        deleteBtn: {
            onClick: handleDeleteItem
        }
    })



    const dispatch = useDispatch();
    
    const [state, setState] = React.useState<any>({
        isShowForm: false,
        attribute: null
    });
    
    const { formData  } = state;
    
    useEffect(() => {
        if(productFilterAttributes.length === 0) {
            fetchProductAttributesAction(dispatch)
        }
    }, []);


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
        })
    }
    
    function setUpdateHandler(attr) {
        setState({
            ...state,
            isShowForm: true,
            attribute: attr
        })
    }
    
    function closeModal(){
        setState(p=>({
            ...p,
            isShowForm: false,
            attribute: null
        }))
    }
    
    
    // update and create attribute handler
    function handleUpdateAttributes(data, attributeId){
        if(attributeId){
            let updatedProductAttributes = [...productFilterAttributes]
            let index = updatedProductAttributes.findIndex(att=>att._id === attributeId)
            if(index !== -1){
                updatedProductAttributes[index] = {
                    ...updatedProductAttributes[index],
                    ...data
                }
            }
            dispatch<FetchFilterAttributesAction>({
                type: ACTION_TYPES.FETCH_FILTER_ATTRIBUTES,
                payload: updatedProductAttributes
            })
        } else {
            if(data) {
                fetchProductAttributesAction(dispatch);
            }
        }
        
        setState(s=>({...s, isShowForm: false}))
    }

    
    function handleDeleteItem(attributeId: string) {
        getApi().delete("/api/product/attribute/"+attributeId).then(({status})=>{
            if(status === StatusCode.Ok){
                dispatch<FetchFilterAttributesAction>({
                    type: ACTION_TYPES.FETCH_FILTER_ATTRIBUTES,
                    payload: productFilterAttributes?.filter(attr=>attr._id !== attributeId)
                })
            }
        })
    }

    const columns: Column[] = [
        {title: "ID", dataIndex: "_id", sorter: (a: string, b: string) => (a > b ? 1 : a < b ? -1 : 0)},
        {title: "Attribute Label", dataIndex: "attributeLabel", sorter: (a: string, b: string) => (a > b ? 1 : a < b ? -1 : 0)},
        {title: "Attribute Name", dataIndex: "attributeName", sorter: (a: string, b: string) => (a > b ? 1 : a < b ? -1 : 0)},
        {
            title: "Action",
            dataIndex: "",
            className: "text-center",
            render: (_, item: any) => (
                <div className="flex justify-center items-center gap-x-2">
                    <BsPencilSquare className="text-md cursor-pointer" onClick={() => setUpdateHandler(item)}/>
                    <FcEmptyTrash className="text-xl cursor-pointer" onClick={() => prompt.open(item._id)}/>
                </div>
            ),
        },
    ];
    
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
            
            
            <Modal isOpen={state.isShowForm} className="bg-red-500 !max-w-xl !top-10" backdropClass="!bg-dark-900/80" onClose={closeModal}>
				<AddAttribute
                    onUpdateAttributes={handleUpdateAttributes}
                    attribute={state.attribute}
                    onCloseForm={closeModal}
                />
			</Modal>
    
    
    
            <Card>
				<h3 className="heading-5">
					Attribute fetch {productFilterAttributes?.length} of {productFilterAttributes?.length}{" "}
				</h3>



                <Table
                    className=""
                    dataSource={productFilterAttributes ? productFilterAttributes : []}
                    columns={columns}
                    tbodyClass={{
                        tr: "hover:bg-green-500/10",
                    }}
                    fixed={true}
                    scroll={{x: 1000, y: 600}}
                />

                
			</Card>
		</div>
    );
};

export default ProductAttribute;



