import React, {useEffect, useState} from "react";
import {Button} from "UI/index";
import apis from "src/apis";
import {StatusCode} from "store/types";
import errorMessageCatch from "src/utills/errorMessageCatch";
import {InputGroup} from "UI/Form";
import HttpResponse from "components/HttpResponse/HttpResponse";

const AddingAttribute = ({attribute, onCloseForm, onUpdateAttributes}) => {
    const [state, setState] = React.useState<any>({
        formData: {
            // _id: { value: [], errorMessage: "" },
            attributeLabel: {value: "", errorMessage: ""},
            attributeName: {value: "", errorMessage: ""},
            options: {value: [], errorMessage: ""},
        },
        optionsFields: [
            {name: "", value: ""},
            {name: "", value: ""},
            {name: "", value: ""},
            {name: "", value: ""},
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
            setState({...state, formData: updatedFormData, optionsFields: attribute.options});
        }
    }, [attribute]);
    
    const [httpResponse, setHttpResponse] = useState({
        message: "",
        isSuccess: false,
        loading: false,
    });
    
    const {formData} = state;
    
    function handleChange(e) {
        const {name, value} = e.target;
        let updateFormData = {...state.formData};
        updateFormData = {
            ...updateFormData,
            [name]: {
                ...updateFormData[name],
                value: value,
                errorMessage: updateFormData[name] ? "" : updateFormData[name].errorMessage,
            },
        };
        setState({
            ...state,
            formData: updateFormData,
        });
    }
    
    function handleOptionValueChange(name, value, index) {
        let updatedOptionsFields = [...state.optionsFields];
        updatedOptionsFields[index] = {
            ...updatedOptionsFields[index],
            [name]: value,
        };
        setState((p) => ({...p, optionsFields: updatedOptionsFields}));
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
            if (fieldKey !== "options") {
                if (formData[fieldKey].value) {
                    payload[fieldKey] = formData[fieldKey].value;
                } else {
                    errorMessage = "Please Give " + fieldKey;
                    
                    isComplete = false;
                }
            }
        }
        
        if (state.optionsFields) {
            let options = []
            state.optionsFields.forEach((field) => {
                if (field.name) {
                    let convertValue = Number(field.value);
                    if (!isNaN(convertValue)) {
                        field.value = convertValue;
                    }
                   options.push(field)
                }
            });
            
            payload.options = options
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
            apis.patch("/api/product/attribute/" + attribute._id, payload)
            .then(({status, data}) => {
                if (status === StatusCode.Created) {
                    setHttpResponse({
                        message: "Updated Successful",
                        loading: false,
                        isSuccess: true,
                    });
                    onUpdateAttributes(data, attribute._id);
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
            apis.post("/api/product/attribute", payload)
            .then(({status, data}) => {
                if (status === StatusCode.Created) {
                    setHttpResponse({
                        message: "Add Successful",
                        loading: false,
                        isSuccess: true,
                    });
                    onUpdateAttributes(data, null);
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
            updateOptionsFields.push({name: "", value: "", valueType: "string"});
            return {
                ...prevState,
                optionsFields: updateOptionsFields,
            };
        });
    }
    
    return (
        <form onSubmit={handleAdd}>
			<h2 className="heading-3 py-4 text-center ">{attribute ? "Update Attribute" : "Add Attribute"}</h2>

			<HttpResponse state={httpResponse}/>

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
					<label className="heading-5 text-gray-600">Option {index + 1}</label>
					<div className="flex gap-x-4">
						<InputGroup
                            className="mt-0"
                            inputClass="!mt-1"
                            type="text"
                            name="name"
                            value={field.name}
                            placeholder="name"
                            onChange={(e) => handleOptionValueChange("name", e.target.value, index)}
                        />
						<InputGroup
                            className="mt-0"
                            inputClass="!mt-1"
                            type="text"
                            name="value"
                            value={field.value}
                            placeholder="value"
                            onChange={(e) => handleOptionValueChange("value", e.target.value, index)}
                        />
					</div>
				</div>
            ))}
            
            <Button type="button" onClick={handleAddMoreOption} className="bg-secondary-400 !py-2.5 mt-4">
				Add More
			</Button>

			<div className="flex items-center gap-x-4">
				<Button loading={httpResponse.loading} type="submit" className="bg-green-450 mt-4" loaderClass="!border-white">
					{!attribute ? "Save" : "Update"}
				</Button>

				<Button  type="button" className="bg-green-450 mt-4" onClick={onCloseForm}>
					Cancel
				</Button>
			</div>
		</form>
    );
};

export default AddingAttribute;