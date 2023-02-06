import React, {useEffect, useState} from "react";
import {Button} from "UI/index";
import apis from "src/apis";
import {StatusCode} from "store/types";
import errorMessageCatch from "src/utills/errorMessageCatch";
import {InputGroup} from "UI/Form";
import HttpResponse from "components/HttpResponse/HttpResponse";
import convStringToNumber from "src/utills/convStringToNumber";



type OptionField = {
    name: string,
    value: string | number | [(string | number), (string | number)]
}

const AddAttribute = ({attribute, onCloseForm, onUpdateAttributes}) => {

    const [state, setState] = React.useState<{
        formData: {
            attributeLabel: {value: string, errorMessage: string},
            attributeName: {value: string, errorMessage: string},
            options: {value: string[], errorMessage: string},
            isRange: {value: boolean, errorMessage: string},
        },
        optionsFields: OptionField[]
    }>({
        formData: {
            // _id: { value: [], errorMessage: "" },
            attributeLabel: {value: "", errorMessage: ""},
            attributeName: {value: "", errorMessage: ""},
            options: {value: [], errorMessage: ""},
            isRange: {value: false, errorMessage: ""},
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
            let updatedFormData = {...state.formData};

            for (let formDataKey in state.formData) {
                if (attribute[formDataKey]) {
                    updatedFormData[formDataKey] = {
                        value: attribute[formDataKey],
                    };
                }
            }

            // convert all options value to string. because it uses to html input
            let updateOptionsFields = attribute?.options.map(item=>{
                if(attribute.isRange){
                    return {
                        ...item,
                        value: [String(item.value[0]), String(item.value[1])]
                    }
                } else {
                    return {
                        ...item,
                        value: String(item.value)
                    }
                }
            })
            setState({...state, formData: updatedFormData, optionsFields: updateOptionsFields});
        }

        return ()=> resetState();

    }, [attribute]);



    function resetState(){
        setState({
            formData: {
                attributeLabel: {value: "", errorMessage: ""},
                attributeName: {value: "", errorMessage: ""},
                options: {value: [], errorMessage: ""},
                isRange: {value: false, errorMessage: ""},
            },
            optionsFields: [
                {name: "", value: ""},
                {name: "", value: ""},
                {name: "", value: ""},
                {name: "", value: ""},
            ],
        })
    }

    
    const [httpResponse, setHttpResponse] = useState({
        message: "",
        isSuccess: false,
        loading: false,
    });
    
    const {formData} = state;
    
    function handleChange(e) {
        const {name, value, checked} = e.target;
        let updateFormData = {...state.formData};
        updateFormData = {
            ...updateFormData,
            [name]: {
                ...updateFormData[name],
                value: name === "isRange" ? checked : value.trim(),
                errorMessage: updateFormData[name] ? "" : updateFormData[name].errorMessage,
            },
        };

        if (name === "isRange"){
            if(checked){
                changeOptionFieldType(checked)

            } else {
                changeOptionFieldType(false)
            }
        }

        setState({
            ...state,
            formData: updateFormData,
        });
    }

    function changeOptionFieldType(isRange: boolean) {
            setState((prevState) => {
                let updateOptionsFields = [];

                if (isRange) {
                    // make array tuple instead of string field
                    updateOptionsFields = prevState.optionsFields.map(field => {
                        return {name: field.name, value: []}
                    })
                } else {
                    // make one value instead of range value
                    updateOptionsFields = prevState.optionsFields.map(field => {
                        return {name: field.name, value: ""}
                    })
                }

                return {
                    ...prevState,
                    optionsFields: updateOptionsFields
                }
            })
    }


    function handleOptionValueChange(name: string, value: string, index: number, rangeInputIndex?: any) {
        let updatedOptionsFields = [...state.optionsFields];

        // store value as tuple instead of one value
        if(formData.isRange.value && rangeInputIndex !== undefined){

            if(isNaN(Number(value))){
                alert("Please Provider numeric value")

            } else {

                let prevValue = updatedOptionsFields[index].value as string[]

                if (typeof prevValue === "string") {
                    prevValue = []
                }
                let tupleValue = [...prevValue]
                tupleValue[rangeInputIndex] = value;

                updatedOptionsFields[index] = {
                    ...updatedOptionsFields[index],
                    [name]: tupleValue,
                };
            }

        } else {

            updatedOptionsFields[index] = {
                ...updatedOptionsFields[index],
                [name]: value,
            };
        }

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

            if(fieldKey === "isRange"){
                payload[fieldKey] = formData[fieldKey].value;
                continue;
            };

            if (fieldKey !== "options") {
                if (formData[fieldKey].value) {
                    payload[fieldKey] = formData[fieldKey].value;
                } else {
                    errorMessage = "Please Give " + fieldKey;
                    
                    isComplete = false;
                }
            }
        }


        let options: OptionField[] = []
        state.optionsFields.forEach((field) => {
            if (field.name) {
                if(formData.isRange.value && Array.isArray(field.value)){
                    let fieldValue:  [string | number, string | number] = ["", ""]
                    let tupleArr = field.value;

                    if(tupleArr[0]){
                        fieldValue[0] = convStringToNumber(tupleArr[0] as string)
                    }
                    if(tupleArr[1]){
                        fieldValue[1] = convStringToNumber(tupleArr[1] as string)
                    }

                    field.value = fieldValue;

                } else {
                    if(typeof field.value === "string"){
                        field.value = convStringToNumber(field.value)
                    }

                }
               options.push(field)
            }
        });

        payload.options = options.filter(item=>{
            if(item.name){
                if(formData.isRange.value && item.value && Array.isArray(item.value)){
                    if(item.value.length === 2){
                        return item
                    }
                } else if(item.value || item.value === 0) {
                    return item
                }
            }
        })

        
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
            // add attribute
            apis.post("/api/product/attribute", payload)
            .then(({status, data}) => {
                if (status === StatusCode.Created) {
                    setHttpResponse({
                        message: "Add Successful",
                        loading: false,
                        isSuccess: true,
                    });
                    // onUpdateAttributes(data, null);
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
            if(formData.isRange.value) {
                // @ts-ignore
                updateOptionsFields.push({name: "", value: []});
            } else{
                updateOptionsFields.push({name: "", value: ""});
            }
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


            <div className="flex items-center gap-x-2 mt-4">
                <input onChange={handleChange} type="checkbox" checked={formData.isRange.value} name="isRange" id="range" />
                <label htmlFor="range" className="cursor-pointer">is range value</label>
            </div>

			<h3 className="text-lg font-bold mt-5">Attribute Option values</h3>
            {state.optionsFields.map((field, index) => (
                <div className="mt-2">
					<label className="heading-5 text-gray-600">Option {index + 1}</label>
					<div className="flex gap-x-4">
						<InputGroup
                            className="mt-0 w-full"
                            inputClass="!mt-1"
                            type="text"
                            name="name"
                            value={field.name}
                            placeholder="name"
                            onChange={(e) => handleOptionValueChange("name", e.target.value, index)}
                        />

                        { formData.isRange.value ? (
                            <div className="flex items-center gap-x-2 w-full">
                                <InputGroup
                                    className="mt-0"
                                    inputClass="!mt-1"
                                    type="text"
                                    name="value"
                                    value={formData.isRange.value && field.value[0]}
                                    placeholder="value 1"
                                    onChange={(e) => handleOptionValueChange("value", e.target.value, index, 0)}
                                />
                                <InputGroup
                                    className="mt-0"
                                    inputClass="!mt-1"
                                    type="text"
                                    name="value"
                                    value={formData.isRange.value && field.value[1]}
                                    placeholder="value 2"
                                    onChange={(e) => handleOptionValueChange("value", e.target.value, index, 1)}
                                />
                            </div>
                        ) : (
                            <InputGroup
                                className="mt-0 w-full"
                                inputClass="!mt-1"
                                type="text"
                                name="value"
                                value={field.value}
                                placeholder="value"
                                onChange={(e) => handleOptionValueChange("value", e.target.value, index)}
                            />
                        ) }

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

export default AddAttribute;