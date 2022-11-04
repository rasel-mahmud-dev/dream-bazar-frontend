import React, {useEffect, useRef, useState} from "react";
import SelectGroup from "UI/Form/SelectGroup";
import { Button } from "UI/index";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryDetailsAction, fetchFlatCategoriesAction, fetchProductAttributesAction } from "actions/adminProductAction";
import MultiSelect from "UI/Form/multiSelect/MultiSelect";
import apis from "src/apis";
import errorMessageCatch from "src/utills/errorMessageCatch";
import ResponseMessage from "UI/ResponseMessage";
import { Link, useParams } from "react-router-dom";
import { RootState } from "src/store";
import {StatusCode} from "store/types";

interface props {
	// flatCategories, productAttributes, categoryDetail, onCloseForm, updateId, onUpdate
}

const AddCategoryDetail = (props) => {
	const { id: updateId } = useParams();

	const {
		productState: { flatCategories },
		adminState: { productAttributes, categoryDetails },
	} = useSelector((state: RootState) => state);

	const dispatch = useDispatch();
    
 
	const [state, setState] = useState<any>({
		formData: {
			filterAttributes: { value: [], errorMessage: "" },
			defaultExpand: { value: [], errorMessage: "" },
			catId: { value: "", errorMessage: "" },
		},
        
        
        categoryDetail: null
	});

	const { formData } = state;

	useEffect(()=>{
	    if(updateId) {
            handleFetchAttributes()
            handleFetchFlatCategories()
        
            apis.get(`/api/category/category-detail?id=${updateId}`).then(({status, data}) => {
                if (status === StatusCode.Ok) {
                    setState(p=>({...p, categoryDetail: data}))
                }
                
            }).catch(ex => {
            
            })
        }
       
	}, [updateId])
    
    
    useEffect(()=>{
        if(state.categoryDetail && productAttributes){
            let catDetail: any = state.categoryDetail
            
            setState(p =>{
                let filterAttributes = []
                catDetail.filterAttributes.forEach(attName=>{
                    let att = productAttributes.find(pAtt=>pAtt.attributeName === attName);
                    if(att){
                        filterAttributes.push(att)
                    }
                })
                let defaultExpandAttr = []
                catDetail.defaultExpand.forEach(attName=>{
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
                            value: catDetail.catId
                        }
                    }
                })
            })
        }
    }, [productAttributes,  state.categoryDetail])
    

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
			apis.patch("/api/category/detail/" + updateId, payload)
				.then(({ status, data }) => {
					if (status === 201) {
						onUpdate(data, updateId);
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
				});
		} else {
			// add as a category detail
			apis.post("/api/category/detail", payload)
				.then(({ status, data }) => {
					if (status === 201) {
						onUpdate(data, null);
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

	// update and create handler
	function onUpdate(data, id) {
		if (id) {
			let updatedData = [...categoryDetails];
			let index = updatedData.findIndex((att) => att._id === id);
			if (index !== -1) {
				updatedData[index] = {
					...updatedData[index],
					...data,
				};
			}
			fetchCategoryDetailsAction(updatedData, dispatch);
		} else {
			if (data) {
				fetchCategoryDetailsAction([data, ...categoryDetails], dispatch);
			}
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
				<Button loading={httpResponse.loading} type="submit" className="bg-green-450 mt-4" loaderClass="!border-white">
					{!updateId ? "Save Category Detail" : "Update Category Detail"}
				</Button>
				<Link to="/admin/category-details">
					<Button type="button" className="bg-green-450 mt-4">
						Cancel
					</Button>
				</Link>
			</div>
		</form>
	);
};

export default AddCategoryDetail;
