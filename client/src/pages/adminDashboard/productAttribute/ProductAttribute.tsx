import React, {useEffect, useReducer} from "react";
import {useDispatch} from "react-redux";
import {getApi} from "src/apis";
import {ACTION_TYPES, StatusCode} from "store/types";
import {Button, Modal, Pagination} from "UI/index";
import {FcEmptyTrash} from "react-icons/fc";
import {BsPencilSquare} from "react-icons/bs";
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


    const [paginationState, setPaginationState] = useReducer((prevState, action) => ({
        ...prevState,
        ...action,
    }), {
        perPage: 15,
        currentPage: 1,
        totalItem: 0,
    })


    const dispatch = useDispatch();

    const [state, setState] = React.useState<any>({
        isShowForm: false,
        attribute: null
    });

    const {formData} = state;

    useEffect(() => {
        if (productFilterAttributes.length === 0) {
            fetchProductAttributesAction(dispatch)
        }
    }, []);


    function clearField() {
        let update = {...formData};
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

    function closeModal() {
        setState(p => ({
            ...p,
            isShowForm: false,
            attribute: null
        }))
    }


    // update and create attribute handler
    function handleUpdateAttributes(data, attributeId) {
        if (attributeId) {
            let updatedProductAttributes = [...productFilterAttributes]
            let index = updatedProductAttributes.findIndex(att => att._id === attributeId)
            if (index !== -1) {
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
            if (data) {
                fetchProductAttributesAction(dispatch);
            }
        }
        setState(s => ({...s, isShowForm: false}))
    }

    function handleDeleteItem(attributeId: string) {
        getApi().delete("/api/product/attribute/" + attributeId).then(({status}) => {
            if (status === StatusCode.Ok) {
                dispatch<FetchFilterAttributesAction>({
                    type: ACTION_TYPES.FETCH_FILTER_ATTRIBUTES,
                    payload: productFilterAttributes?.filter(attr => attr._id !== attributeId)
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
                <h1 className="route-title">Attribute</h1>

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


            <div className="dashboard-card">

                <h3 className="card-title px-4 pt-4">
                    Attribute fetch {productFilterAttributes?.length} of {productFilterAttributes?.length}{" "}
                </h3>

                <Table
                    dataSource={productFilterAttributes ? productFilterAttributes.slice(
                            paginationState.perPage * (paginationState.currentPage - 1),
                            paginationState.perPage * (paginationState.currentPage))
                        : []}
                    columns={columns}
                    tbodyClass={{
                        tr: "hover:bg-green-500/10",
                    }}
                />
            </div>

            <Pagination
                className="!justify-end mt-5"
                onChange={(p) => setPaginationState({currentPage: p})}
                totalItem={productFilterAttributes?.length || 0}
                perPage={paginationState.perPage}
                currentPage={paginationState.currentPage}/>
        </div>
    );
};

export default ProductAttribute;



