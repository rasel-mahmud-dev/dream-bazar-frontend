import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";
import apis from "src/apis";
import {deleteBrandAction, deleteFlatCategoryAction, fetchFlatCategories} from "actions/productAction";
import { ACTION_TYPES } from "store/types";
import errorMessageCatch from "src/utills/errorMessageCatch";
import { toggleBackdrop } from "actions/appAction";
import ActionInfo from "components/ActionInfo/ActionInfo";
import { InputGroup } from "UI/Form";
import FileUpload from "UI/Form/File/FileUpload";
import MultiSelect from "UI/Form/multiSelect/MultiSelect";
import { Button } from "UI/index";
import staticImagePath from "src/utills/staticImagePath";
import { BsPencilSquare, FcEmptyTrash } from "react-icons/all";
import Table from "UI/table/Table";
import SelectGroup from "UI/Form/SelectGroup";
import Checkbox from "UI/Form/checkbox/Checkbox";

const AllCategory = (props) => {
    const {
        appState,
        productState: { flatCategories },
    } = useSelector((state: RootState) => state);

    const [totalBrands, setTotalBrands] = React.useState<number>(0);

    const [brands, setBrands] = React.useState<any[]>([]);

    const dispatch = useDispatch();

    const [state, setState] = React.useState<any>({
        isShowForm: true,
        updateId: "",
        httpResponse: "",
        httpStatus: 200,
        formData: {
            name: { value: "", errorMessage: "" },
            isProductLevel: { value: false,  errorMessage: "" },
            parentId: { value: 0, errorMessage: "" }
        },
    });

    const { formData, isShowForm, updateId } = state;

    React.useEffect(() => {
        (async function () {
            try {
                let a = await fetchFlatCategories();
                if (!flatCategories) {
                    dispatch({
                        type: ACTION_TYPES.FETCH_CATEGORIES,
                        payload: a,
                    });
                }
            } catch (ex) {}
        })();
    }, []);

    function deleteItem(id: any) {
        deleteFlatCategoryAction(dispatch, id, function (err, data) {
            if (!err) {
                dispatch({
                    type: ACTION_TYPES.DELETE_FLAT_CATEGORY,
                    payload: id
                })
            } else {
                console.log(err);
            }
        });
    }

    function handleChange(e) {
        const { name, value, checked } = e.target;
        let updateFormData = { ...state.formData };
            updateFormData = {
                ...updateFormData,
                [name]: {
                    ...updateFormData[name],
                    value: name === "isProductLevel" ? checked : value,
                    errorMessage: updateFormData[name]
                        ? ""
                        : updateFormData[name].errorMessage,
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
        let payload = {}

        for (let item in formData) {
            if(item === "name") {
                if (!formData[item].value) {
                    isComplete = false;
                    formData[item].errorMessage = "Please enter " + item;
                }
            }
            payload[item] = formData[item].value
          
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
                            payload:  data.category
                        })
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
                            payload:  data.category
                        })
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

    function setUpdateBrandHandler(cat) {
        let updateFormData = { ...state.formData };
        if (cat.name) {
            updateFormData.name = { value: cat.name, errorMessage: "" };
        }
        if (cat.parentId) {
            updateFormData.parentId = { value: cat.parentId, errorMessage: "" };
        }
        if (cat.isProductLevel) {
            updateFormData.isProductLevel = { value: cat.isProductLevel === 1, errorMessage: "" };
        }
        
        setState({
            ...state,
            isShowForm: true,
            updateId: cat.id,
            formData: updateFormData,
        });
        dispatch(
            toggleBackdrop({
                isOpen: true,
                scope: "custom",
            })
        );
    }

    function addCategoryForm() {
        return (
            <form onSubmit={handleAdd}>
                <h2 className="h2 text-center !font-semibold">
                    {updateId ? "Update category" : "Add new category"}
                </h2>

                <ActionInfo
                    message={state.httpResponse}
                    statusCode={state.httpStatus}
                    className="mt-4"
                />

                <InputGroup
                    name={"name"}
                    label="Category Name"
                    className="!flex-col"
                    inputClass="input-group"
                    labelClass="dark:text-white !mb-2"
                    state={formData}
                    placeholder="enter category name"
                    onChange={handleChange}
                />
                {/*********** Cover **************/}

                
                <SelectGroup
                    name="parentId"
                    labelClass="dark:text-white !mb-2"
                    className={"!flex-col"}
                    value={formData.parentId.value}
                    label="Select ParentId"
                    inputClass="input-group"
                    placeholder="parentId"
                    onChange={handleChange}
                    state={formData}
                    options={() => (
                        <>
                            <option value="0">Select category parent ID</option>
                            {flatCategories.map((cat) => (
                                <option className="cursor-pointer py-1 menu-item"  value={cat.id}>{cat.name}</option>
                            ))}
                        </>
                    )}
                />
                
                <Checkbox
                    onChange={handleChange}
                    label="is product level"
                    checked={formData.isProductLevel.value}
                    name="isProductLevel"
                    labelClass="ml-2" className="mt-4" />
                
                <div className="flex items-center gap-x-4">
                    <Button
                        type="submit"
                        className="bg-secondary-300 mt-4"
                        loaderClass="!border-white"
                        loading={state.httpResponse === "pending"}
                    >
                        {!updateId ? "Save Category" : "Update Category"}
                    </Button>

                    <Button
                        type="button"
                        className="bg-secondary-300 mt-4"
                        onClick={() => handleShowAddForm(false)}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        );
    }

    const columns = [
        {
            title: "Logo",
            dataIndex: "logo",
            render: (item) => (
                <div className="w-8">
                    <img src={staticImagePath(item?.logo)} alt="" />
                </div>
            ),
        },
        { title: "Name", dataIndex: "name" },
        { title: "CreatedAt", dataIndex: "createdAt" },
        {
            title: "Action",
            dataIndex: "",
            className: "text-center",
            render: (item) => (
                <div className="flex justify-center items-center gap-x-2">
                    <BsPencilSquare
                        className="text-md cursor-pointer"
                        onClick={() => setUpdateBrandHandler(item)}
                    />
                    <FcEmptyTrash
                        className="text-xl cursor-pointer"
                        onClick={() => deleteItem(item.id)}
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="pr-4">
            {/* add brand modal and backdrop */}
            {appState.backdrop.isOpen && (
                <div
                    className={`backdrop ${isShowForm ? "backdrop--show" : ""}`}
                >
                    <div className="modal-box auth-card">
                        {addCategoryForm()}
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between mt-4">
                <h1 className="h2">Product Categories</h1>
                {!updateId ? (
                    <Button
                        className="mt-4 bg-secondary-300"
                        onClick={() => handleShowAddForm(true)}
                    >
                        Add New Categories
                    </Button>
                ) : (
                    <Button onClick={() => handleShowAddForm(false)}>
                        Cancel
                    </Button>
                )}
            </div>

            <h3 className="p">
                {/*Category fetch {flatCategories?.length} of{" "}*/}
                {/*{flatCategories.length}{" "}*/}
            </h3>

            <div className="card">
                <div className='table-wrapper'>
                    <Table
                        className="table-fixed "
                        dataSource={flatCategories ? flatCategories : []}
                        columns={columns}
                        tbodyClass={{
                            tbody: "!max-h-96",
                            td: "py-2 px-2",
                            tr: "hover:bg-green-500/10",
                        }}
                        theadClass={{th: "p-2"}}
                    />
                </div>
            </div>
        </div>
    );
};

export default AllCategory