import React, {useEffect, useState} from "react";
import {InputGroup} from "UI/Form";
import SelectGroup from "UI/Form/SelectGroup";
import Checkbox from "../../../components/UI/Form/checkbox/Checkbox";
import {Button} from "UI/index";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "src/store";
import apis from "src/apis";
import {ACTION_TYPES, StatusCode} from "store/types";
import Card from "UI/Form/Card/Card";
import errorMessageCatch from "src/utills/errorMessageCatch";
import HttpResponse from "components/HttpResponse/HttpResponse";

const AddCategory = () => {
    const {id: updateId} = useParams();
    
    const {
        productState: {flatCategories},
    } = useSelector((state: RootState) => state);
    
    const dispatch = useDispatch();
    const navigate  = useNavigate()
    
    const [state, setState] = useState({
        formData: {
            name: {value: "", errorMessage: ""},
            isProductLevel: {value: false, errorMessage: ""},
            parentId: {value: "", errorMessage: ""},
        },
    });
    const {formData} = state;
    
    useEffect(() => {
        apis.get("/api/category?id=" + updateId).then(({data, status}) => {
            if (status === StatusCode.Ok) {
                let updatedFormData = {...formData};
                for (let formDataKey in updatedFormData) {
                    updatedFormData[formDataKey] = {
                        ...updatedFormData[formDataKey],
                        value: data[formDataKey],
                    };
                }
                setState((prev) => ({...prev, formData: updatedFormData}));
            }
        });
    }, [updateId]);
    
    const [httpResponse, setHttpResponse] = useState({
        message: "",
        isSuccess: false,
        loading: false,
    });
    
    function handleChange(e) {
        const {name, value, checked} = e.target;
        let updateFormData = {...state.formData};
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
        let updateState = {...state};
        setHttpResponse({isSuccess: false, message:  "", loading: false})
        e.preventDefault();
        
        let isComplete = true;
        let payload = {};
        
        for (let item in updateState.formData) {
            if (item === "name") {
                if (!updateState.formData[item].value) {
                    isComplete = false;
                    updateState.formData[item].errorMessage = "Please enter " + item;
                }
            }
            
            payload[item] = updateState.formData[item].value;
        }
        
        if (!isComplete) {
            setHttpResponse({isSuccess: false, loading: false, message: "Please fill Input"});
            setState(updateState);
            return;
        }
        
        
        setHttpResponse({isSuccess: false, loading: true, message: ""});
        
        if (updateId) {
            apis.patch("/api/category/" + updateId, payload)
            .then(({ status, data }) => {
                if (status === 201) {
                    dispatch({
                        type: ACTION_TYPES.UPDATE_FLAT_CATEGORY,
                        payload: data.category,
                    });
                    navigate("/admin/categories")
                }
            })
            .catch((ex) => {
                setHttpResponse({isSuccess: false, message:  errorMessageCatch(ex), loading: false})
            })
         
        } else {
            // add as a new brand
            apis.post("/api/category", payload)
            .then(({ status, data }) => {
                if (status === 201) {
                    dispatch({
                        type: ACTION_TYPES.ADD_FLAT_CATEGORY,
                        payload: data.category,
                    });
                    navigate("/admin/categories")
                }
            })
            .catch((ex) => {
                setHttpResponse({isSuccess: false, message:  errorMessageCatch(ex), loading: false})
            })
           
        }
    }
    
    return (
        <Card className="">
			<form onSubmit={handleAdd}>
				<h2 className="heading-3 text-center !font-semibold">{updateId ? "Update category" : "Add new category"}</h2>
			
                <HttpResponse state={httpResponse} />

				<InputGroup
                    name="name"
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
                    label="Select ParentId"
                    inputClass="input-group"
                    placeholder="parentId"
                    onChange={handleChange}
                    state={formData}
                    options={() => (
                        <>
							<option value="0">Select category parent ID</option>
                            {flatCategories?.map((cat) => (
                                <option className="cursor-pointer py-1 menu-item" value={cat._id}>
									{cat.name}
								</option>
                            ))}
						</>
                    )}
                />

				<Checkbox
                    onChange={handleChange}
                    label="is product level"
                    checked={formData.isProductLevel.value}
                    name="isProductLevel"
                    labelClass="ml-2"
                    className="mt-4"
                />

				<div className="flex items-center gap-x-4">
					<Button type="submit" className="bg-secondary-300 mt-4" loaderClass="!border-white" loading={httpResponse.loading}>
						{!updateId ? "Save Category" : "Update Category"}
					</Button>

					<Link to="/admin/categories">
						<Button type="button" className="bg-secondary-300 mt-4">
							Cancel
						</Button>
					</Link>
				</div>
			</form>
		</Card>
    );
};

export default AddCategory;