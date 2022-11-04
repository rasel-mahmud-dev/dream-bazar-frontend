import React, { useEffect, useState } from "react";
import SelectGroup from "UI/Form/SelectGroup";
import { Button } from "UI/index";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryDetailsAction, fetchFlatCategoriesAction, fetchProductAttributesAction } from "actions/adminProductAction";
import MultiSelect from "UI/Form/multiSelect/MultiSelect";
import apis from "src/apis";
import errorMessageCatch from "src/utills/errorMessageCatch";
import ResponseMessage from "UI/ResponseMessage";
import {Link, useNavigate, useParams} from "react-router-dom";
import { RootState } from "src/store";
import { StatusCode } from "store/types";
import { InputGroup } from "UI/Form";
import {BiPlus} from "react-icons/all";
import Card from "UI/Form/Card/Card";

interface props {
	// flatCategories, productAttributes, categoryDetail, onCloseForm, updateId, onUpdate
}

const AddCategoryDetail = (props) => {
	const { id: updateId } = useParams();
    
    const navigate = useNavigate();

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
        
        sections: [
			{
                sectionName: "",
                specification: [""]
            }
		],
		categoryDetail: null,
	});

	const { formData } = state;
    
    let a = {
        "General": [
            "Sales Package",
            "Model Number",
            "Part Number",
            "Series",
            "Color",
            "Type",
            "Suitable For",
            "Battery Backup",
            "Power Supply",
            "Battery Cell"
        ],
        "Processor And Memory Features": [
            "Dedicated Graphic Memory Type",
            "Dedicated Graphic Memory Capacity",
            "Processor Brand",
            "Processor Name",
            "Processor Model",
            "Processor Generation",
            "Processor Frequency",
            "Processor Cors",
            "Processor Thread",
            "Cache Memory",
            "RAM",
            "RAM Type",
            "Clock Speed",
            "Expandable Memory",
            "Graphic Processor"
        ],
        "Storage": [
            "Storage Interface",
            "Reading speed",
            "Hard Drive",
            "SSD",
            "SSD Capacity"
        ],
        "Webcam": [
            "Built-in Webcam"
        ],
        "Operating System": [
            "OS Architecture",
            "Operating System",
            "System Architecture"
        ],
        "Port And Slot Features": [
            "Mic In",
            "RJ45",
            "USB Port",
            "Microphone Jack",
            "HDMI Port",
            "Hardware Interface",
            "Other Ports"
        ],
        "Display And Audio Features": [
            "Touchscreen",
            "Screen Size",
            "Screen Resolution",
            "Screen Type",
            "Speakers",
            "Internal Mic"
        ],
        "Audio": [
            "Built-in Microphone",
            "Other Audio features",
            "Remote control",
            "Speaker Output"
        ],
        "Connectivity Features": [
            "Wireless LAN",
            "Bluetooth",
            "Ethernet",
            "Wireless"
        ],
        "Additional Features": [
            "Disk Drive",
            "Web Camera",
            "Finger Print Sensor",
            "Lock Port",
            "Keyboard",
            "Backlit Keyboard",
            "Pointer Device",
            "Included Software"
        ],
        "Dimensions": [
            "Dimensions",
            "Weight"
        ],
        "Warranty": [
            "Warranty Summary",
            "Warranty Service Type",
            "Covered in Warranty",
            "Not Covered in Warranty",
            "Domestic Warranty",
            "International Warranty"
        ]
    }
    
    function makeSections(productDescriptionSection: {}){
        let sections =  []
        for (let productDescriptionSectionKey in productDescriptionSection) {
            sections.push({
                sectionName: productDescriptionSectionKey,
                specification: productDescriptionSection[productDescriptionSectionKey]
            })
        }
        return sections
    }
    
	useEffect(() => {
		if (updateId) {
			handleFetchAttributes();
			handleFetchFlatCategories();

			apis.get(`/api/category/category-detail?id=${updateId}`)
				.then(({ status, data }) => {
					if (status === StatusCode.Ok) {
                        let sections;
                        if(data.productDescriptionSection) {
                            sections = makeSections(a)
                        }
                        console.log(sections)
						setState((p) => ({ ...p, categoryDetail: data, sections: sections ? sections : p.sections}));
					}
				})
				.catch((ex) => {});
		}
	}, [updateId]);

	useEffect(() => {
		if (state.categoryDetail && productAttributes) {
			let catDetail: any = state.categoryDetail;

			setState((p) => {
				let filterAttributes = [];
				catDetail.filterAttributes.forEach((attName) => {
					let att = productAttributes.find((pAtt) => pAtt.attributeName === attName);
					if (att) {
						filterAttributes.push(att);
					}
				});
				let defaultExpandAttr = [];
				catDetail.defaultExpand.forEach((attName) => {
					let att = productAttributes.find((pAtt) => pAtt.attributeName === attName);
					if (att) {
						defaultExpandAttr.push(att);
					}
				});

				return {
					...p,
					formData: {
						...p.formData,
						filterAttributes: {
							value: filterAttributes,
							errorMessage: "",
						},
						defaultExpand: {
							value: defaultExpandAttr,
							errorMessage: "",
						},
						catId: {
							value: catDetail.catId,
						},
					},
				};
			});
		}
	}, [productAttributes, state.categoryDetail]);

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

        
        /** make product description section data like from sections array of object
         Display: ["Display Size", "Resolution", "Resolution Type", "GPU", "Display Type", "Other Display Features"]
         Features:["Sensors", "Mobile Tracker", "Removable Battery", "GPS Type"]
         General:["In The Box", "Model Number", "Model Name", "Color", "Browse Type", "SIM Type", "Hybrid Sim Slot",…]
         Lunch:["Announced"]
        **/
        let descriptionSection = {}
        state.sections.forEach((section)=>{
            descriptionSection[section.sectionName] = section.specification
        })
        
        payload.productDescriptionSection = descriptionSection
        
        // check if one of field data missing or not
		if (!isComplete) {
			setHttpResponse({
				message: errorMessage,
				loading: false,
				isSuccess: false,
			});
			return;
		}

        // pick category name
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
        navigate("/admin/category-details")
	}
    
    function specificationValueChange(value, sectionIndex, specificationIndex){
        setState((prev)=>{
            let sections = [...prev.sections]
            if(sections[sectionIndex]){
                if(sections[sectionIndex].specification){
                    sections[sectionIndex].specification[specificationIndex] = value
                }
            }
            return {
                ...prev,
                sections
            }
        })
    }
    function sectionNameChange(value, sectionIndex){
        setState((prev)=>{
            let sections = [...prev.sections]
            if(sections[sectionIndex]){
                sections[sectionIndex].sectionName = value
            }
            return {
                ...prev,
                sections
            }
        })
    }
    
    // add more product description section specification
    function addMoreSpecification(sectionIndex){
        setState((prev)=>{
            let sections = [...prev.sections]
            if(sections[sectionIndex]){
                sections[sectionIndex].specification = [
                    ...sections[sectionIndex].specification,
                    ""
                ]
            }
            return {
                ...prev,
                sections
            }
        })
        
    }
    
    // add more product description section
    function addMoreSection(){
        setState((prev)=>({...prev, sections: [...prev.sections, {
            sectionName: "",
            specification: [""]
        }]}))
    }
    
    /*** fill up some dummy data for product description section */
    function handleFillTextData(){
        const data = [
            { sectionName: "NETWORK",
              specification: [
                  "Technology",
                  "2G bands",
                  "3G bands",
                  "4G bands",
                  "Speed",
              ]
            },
           {
                sectionName: "LAUNCH",
                specification: [
                    "Announced",
                    "Status"
                ]
            },{
                sectionName: "DISPLAY",
                specification: [
                    "Type",
                    "Size",
                    "Resolution"
                ]
            }, {
                sectionName: "PLATFORM",
                specification: [
                    "OS",
                    "Chipset",
                    "CPU",
                    "GPU"
                ]
            },{
                sectionName: "MEMORY",
                specification: [
                    "Card slot",
                    "Internal"
                ]
            }
        ]
        setState((p)=>({...p, sections: data}))
    }
    

	return (
        <Card className="">
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

            <div className="flex items-center justify-between  mt-5">
			<h3 className="text-lg font-bold">Product Description Section</h3>
            
            </div>
            
            
			<div>
                <Button onClick={addMoreSection} type="button" className="mt-1 bg-green-450 !py-1.5 !px-1 !w-full justify-center flex">
                    <span className="flex "><BiPlus className="text-lg" /> Add More Section</span>
                </Button>
                {state.sections.map((section, index) => (
                    <div className="mt-2">
					<div>
                        <InputGroup
                            className="mt-0"
                            inputClass="!mt-1 font-medium !text-sm"
                            type="text"
                            name="name"
                            value={section.sectionName}
                            placeholder="Section name"
                            onChange={(e) => sectionNameChange(e.target.value, index)}
                        />
                    </div>
                    <div className="ml-4">
                        {section.specification?.map((spec, specificationIndex)=>(
                            <div className="flex items-center justify-between">
                                <span>{specificationIndex + 1}</span>
                                <InputGroup
                                    className="mt-0 w-full ml-4"
                                    inputClass="!mt-1 font-medium !text-xs"
                                    type="text"
                                    value={section.specification[specificationIndex]}
                                    name="name"
                                    placeholder="Specification "
                                    onChange={(e) => specificationValueChange(e.target.value, index, specificationIndex)}
                                />
                            </div>
                        ))}
                        <div className="ml-6">
                            <Button onClick={()=>addMoreSpecification(index)} type="button" className="mt-1 bg-secondary-300 !py-1.5 !px-1 !w-full box-border justify-center flex">
                                 <span className="flex "><BiPlus className="text-lg" /> Add Specification</span>
                            </Button>
                        </div>
                    </div>
				</div>
                ))}
            </div>
            
   

			<div className="flex items-center gap-x-4 flex-wrap py-4">
				<Button loading={httpResponse.loading} type="submit" className="bg-green-450 mt-4" loaderClass="!border-white">
					{!updateId ? "Save Category Detail" : "Update Category Detail"}
				</Button>
                <Button type="button" className="bg-green-450 mt-4" loaderClass="!border-white" onClick={handleFillTextData}>
					FilUp With Example Data
				</Button>
				<Link to="/admin/category-details">
					<Button type="button" className="bg-green-450 mt-4">
						Cancel
					</Button>
				</Link>
			</div>
		</form>
        </Card>
	);
};

export default AddCategoryDetail;
