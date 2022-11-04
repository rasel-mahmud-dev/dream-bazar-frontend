import React, {useEffect, useState} from "react";
import SelectGroup from "UI/Form/SelectGroup";
import { Button } from "UI/index";
import HttpResponse from "components/HttpResponse/HttpResponse";
import { useDispatch } from "react-redux";
import { fetchFlatCategoriesAction, fetchProductAttributesAction } from "actions/adminProductAction";
import MultiSelect from "UI/Form/multiSelect/MultiSelect";
import { getApi } from "src/apis";
import { Scope } from "store/types";
import errorMessageCatch from "src/utills/errorMessageCatch";
import ResponseMessage from "UI/ResponseMessage";

const AddCategoryDetailForm = ({ flatCategories, productAttributes, categoryDetail, onCloseForm, updateId }) => {
	const dispatch = useDispatch();

	const [state, setState] = React.useState<any>({
		formData: {
			filterAttributes: { value: [], errorMessage: "" },
			defaultExpand: { value: [], errorMessage: "" },
			catId: { value: "", errorMessage: "" },
		},
	});
    
    
    useEffect(()=>{
    
        if(updateId){
            handleFetchAttributes()
            handleFetchFlatCategories()
        }
        
        if(categoryDetail && productAttributes){
            setState(p=>{
    
                let filterAttributes = []
                categoryDetail.filterAttributes.forEach(attName=>{
                    let att = productAttributes.find(pAtt=>pAtt.attributeName === attName);
                    if(att){
                        filterAttributes.push(att)
                    }
                })
                let defaultExpandAttr = []
                categoryDetail.defaultExpand.forEach(attName=>{
                    let att = productAttributes.find(pAtt=>pAtt.attributeName === attName);
                    if(att){
                        defaultExpandAttr.push(att)
                    }
                })
              
                return ({
                    ...p,
                    formData: {
                        ...p.formData,
                        filterAttributes: {
                            value: filterAttributes,
                            errorMessage: ""
                        },
                        defaultExpand: {
                            value: defaultExpandAttr,
                            errorMessage: ""
                        },
                        catId: {
                            value: categoryDetail.catId
                        }
                    }
                })
            })
        }
        
    }, [updateId, categoryDetail, productAttributes])
    

	const [httpResponse, setHttpResponse] = useState({
		message: "",
		isSuccess: false,
		loading: false,
	});

	function handleFetchAttributes() {
		fetchProductAttributesAction(productAttributes, dispatch);
	}

	function handleFetchFlatCategories() {
		fetchFlatCategoriesAction(flatCategories, dispatch);
	}

	const { formData } = state;

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
		setHttpResponse({
			message: "",
			loading: false,
			isSuccess: false,
		});
		e.preventDefault();

		let isComplete = true;
		let payload: any = {};
		let errorMessage = "";
		for (let fieldKey in formData) {
			if (fieldKey === "filterAttributes") {
				if (formData[fieldKey].value.length === 0) {
					errorMessage = "Please select " + fieldKey;
					isComplete = false;
				} else {
					payload[fieldKey] = formData[fieldKey].value.map((att) => att.attributeName);
				}
			} else if (fieldKey === "defaultExpand") {
				if (formData[fieldKey].value && formData[fieldKey].value.length > 0) {
					payload[fieldKey] = formData[fieldKey].value.map((att) => att.attributeName);
				} else {
					payload[fieldKey] = [];
				}
			} else {
				if (formData[fieldKey].value) {
					payload[fieldKey] = formData[fieldKey].value;
				} else {
					errorMessage = "Please select " + fieldKey;

					isComplete = false;
				}
			}
		}

		if (!isComplete) {
			setHttpResponse({
				message: errorMessage,
				loading: false,
				isSuccess: false,
			});
			return;
		}

		if (payload.catId) {
			let cat = flatCategories.find((fc) => fc._id === payload.catId);
			if (cat) {
				payload["catName"] = cat.name;
			}
		}
        
        setHttpResponse({
            message: "",
            loading: true,
            isSuccess: false,
        });
        
		if (updateId) {
			getApi(Scope.ADMIN_USER)
				.patch("/api/category/detail/" + updateId, payload)
				.then(({ status, data }) => {
					if (status === 201) {
                        setHttpResponse({
                            message: "Updated Successful",
                            loading: false,
                            isSuccess: true,
                        });
					}
				})
				.catch((ex) => {
                    setHttpResponse({
                        message: errorMessageCatch(ex),
                        loading: false,
                        isSuccess: false,
                    });
				})

		} else {
			// add as a category detail
			getApi(Scope.ADMIN_USER)
				.post("/api/category/detail", payload)
				.then(({ status, data }) => {
					if (status === 201) {
                        setHttpResponse({
                            message: "Add Successful",
                            loading: false,
                            isSuccess: true,
                        });
					}
				})
				.catch((ex) => {
                    setHttpResponse({
                        message: errorMessageCatch(ex),
                        loading: false,
                        isSuccess: false,
                    });
				});
		}
  
	}
    
	return (
		<form onSubmit={handleAdd}>
			<h2 className="heading-3 py-4 text-center ">{updateId ? "Update category detail" : "Add new category detail"}</h2>

            
            <ResponseMessage state={httpResponse} />

			<SelectGroup
				name="catId"
				labelClass="dark:text-white !mb-2"
				className={"!flex-col"}
				label="Category Name"
				inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
				placeholder="category Name"
				onClick={handleFetchFlatCategories}
				onChange={handleChange}
				state={formData}
				options={() => (
					<>
						<option value="0">Select Category</option>
						{flatCategories?.map((cat) => (
							<option className="cursor-pointer py-1 menu-item" value={cat._id}>
								{cat.name}
							</option>
						))}
					</>
				)}
			/>

			<MultiSelect
				name="filterAttributes"
				onClick={handleFetchAttributes}
				labelClass="dark:text-white !mb-2"
				className={"!flex-col"}
				label="Filter Attributes"
                defaultValue={state.formData.filterAttributes.value}
				inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
				placeholder="Attributes Name"
				onChange={handleChange}
				state={formData}
				options={(click) => (
					<>
						<li value="0">Select Attribute</li>
						{productAttributes?.map((attr) => (
							<li onClick={() => click(attr)} className="cursor-pointer py-1 menu-item">
								{attr.attributeName}
							</li>
						))}
					</>
				)}
				dataKey={{ title: "attributeName", key: "attributeName" }}
			/>

			<MultiSelect
				name="defaultExpand"
				inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
				labelClass="dark:text-white !mb-2"
				onClick={handleFetchAttributes}
				className={"!flex-col"}
				label="DefaultExpand Attributes"
				placeholder="DefaultExpand Attribute Name"
				onChange={handleChange}
				state={formData}
				options={(click) => (
					<>
						<li value="0">Select Attribute</li>
						{productAttributes?.map((attr) => (
							<li onClick={() => click(attr)} className="cursor-pointer py-1 menu-item" value={attr._id}>
								{attr.attributeName}
							</li>
						))}
					</>
				)}
				dataKey={{ title: "attributeName", key: "attributeName" }}
			/>

			<div className="flex items-center gap-x-4">
				<Button type="submit" className="bg-green-450 mt-4" loaderClass="!border-white" loading={state.httpResponse === "pending"}>
					{!updateId ? "Save Category Detail" : "Update Category Detail"}
				</Button>

				<Button type="button" className="bg-green-450 mt-4" onClick={() => onCloseForm()}>
					Cancel
				</Button>
			</div>
		</form>
	);
};

export default AddCategoryDetailForm;