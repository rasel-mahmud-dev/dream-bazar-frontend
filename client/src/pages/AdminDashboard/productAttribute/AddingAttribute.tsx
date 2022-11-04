import React, { useEffect, useState } from "react";
import { Button } from "UI/index";
import { useDispatch } from "react-redux";
import { getApi } from "src/apis";
import { Scope } from "store/types";
import errorMessageCatch from "src/utills/errorMessageCatch";
import ResponseMessage from "UI/ResponseMessage";
import { InputGroup } from "UI/Form";

const AddingAttribute = ({ attribute, onCloseForm }) => {
	const dispatch = useDispatch();

	const [state, setState] = React.useState<any>({
		formData: {
			// _id: { value: [], errorMessage: "" },
			attributeLabel: { value: "", errorMessage: "" },
			attributeName: { value: "", errorMessage: "" },
			options: { value: [], errorMessage: "" },
		},
		optionsFields: [
			{ name: "", value: "" },
			{ name: "", value: "" },
			{ name: "", value: "" },
			{ name: "", value: "" }
		],
	});

	useEffect(() => {
		if (attribute) {
			let updatedFormData = {};
			for (let formDataKey in state.formData) {
				if (attribute[formDataKey]) {
					updatedFormData[formDataKey] = {
						value: attribute[formDataKey],
					};
				}
			}
			setState({ ...state, formData: updatedFormData });
		}
	}, [attribute]);

	const [httpResponse, setHttpResponse] = useState({
		message: "",
		isSuccess: false,
		loading: false,
	});

	const { formData } = state;

	function handleChange(e) {
		const { name, value } = e.target;
		let updateFormData = { ...state.formData };
		updateFormData = {
			...updateFormData,
			[name]: {
				...updateFormData[name],
				value:  value,
				errorMessage: updateFormData[name] ? "" : updateFormData[name].errorMessage,
			},
		};
		setState({
			...state,
			formData: updateFormData,
		});
	}
    function handleOptionValueChange(name, value, index){
        let updatedOptionsFields = [...state.optionsFields]
        updatedOptionsFields[index] = {
            ...updatedOptionsFields[index],
            [name]: value
        }
        setState((p)=>({...p, optionsFields: updatedOptionsFields}))
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

		setHttpResponse({
			message: "",
			loading: true,
			isSuccess: false,
		});

		if (attribute) {
			getApi(Scope.ADMIN_USER)
				.patch("/api/category/detail/" + attribute._id, payload)
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
				});
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

	function handleAddMoreOption() {
		setState((prevState) => {
			let updateOptionsFields = [...prevState.optionsFields];
			updateOptionsFields.push({ name: "", value: "", valueType: "string" });
			return {
				...prevState,
				optionsFields: updateOptionsFields,
			};
		});
	}
 

	return (
		<form onSubmit={handleAdd}>
			<h2 className="heading-3 py-4 text-center ">{attribute ? "Update Attribute" : "Add Attribute"}</h2>

			<ResponseMessage state={httpResponse} />

			<InputGroup
				name="attributeName"
				labelClass="dark:text-white !mb-2"
				className={"!flex-col"}
				label="Attribute Name"
				placeholder="Attribute Name"
				onChange={handleChange}
				state={formData}
			/>

			<InputGroup
				name="attributeLabel"
				labelClass="dark:text-white !mb-2"
				className={"!flex-col"}
				label="Attribute Label"
				placeholder="Attribute Label"
				onChange={handleChange}
				state={formData}
			/>

			<h3 className="text-lg font-bold mt-5">Attribute Option values</h3>
			{state.optionsFields.map((field, index) => (
				<div className="mt-2">
					<label className="heading-5 !font-medium text-gray-600">Option {index + 1}</label>
					<div className="flex gap-x-4">
						<InputGroup
                            className="mt-0"
                            inputClass="!mt-1"
                            type="text"
                            name="name"
                            value={field.name}
                            placeholder="name"
                            onChange={(e)=>handleOptionValueChange("name", e.target.value, index)}/>
						<InputGroup
                            className="mt-0"
                            inputClass="!mt-1"
                            type="text"
                            name="value"
                            value={field.value}
                            placeholder="value"
                            onChange={(e)=>handleOptionValueChange("value",e.target.value, index)}/>
					</div>
				</div>
			))}

			<Button type="button" onClick={handleAddMoreOption} className="bg-secondary-400 !py-2.5 mt-4">
				Add More
			</Button>

			<div className="flex items-center gap-x-4">
				<Button type="submit" className="bg-green-450 mt-4" loaderClass="!border-white" loading={state.httpResponse === "pending"}>
					{!attribute ? "Save" : "Update"}
				</Button>

				<Button type="button" className="bg-green-450 mt-4" onClick={onCloseForm}>
					Cancel
				</Button>
			</div>
		</form>
	);
};

export default AddingAttribute;