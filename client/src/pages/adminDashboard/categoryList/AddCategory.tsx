import React, {useEffect, useState} from "react";
import SelectGroup from "UI/Form/SelectGroup";
import {Button} from "UI/index";
import {addFlatCategory, fetchCategoryDetailAction, fetchFlatCategoriesAction, fetchProductAttributesAction} from "actions/categoryAction";
import MultiSelect from "UI/Form/multiSelect/MultiSelect";
import apis from "src/apis";
import errorMessageCatch from "src/utills/errorMessageCatch";
import {Link, useNavigate, useParams} from "react-router-dom";

import {StatusCode} from "store/types";
import {InputGroup} from "UI/Form";
import {BiPlus} from "react-icons/bi";
import Card from "UI/Form/Card/Card";

import Checkbox from "../../../components/UI/Form/checkbox/Checkbox";
import useAppDispatch from "src/hooks/useAppDispatch";
import useAppSelector from "src/hooks/useAppSelector";
import ActionModal from "components/ActionModal/ActionModal";
import {Attribute} from "reducers/categoryReducer";
import FileUpload from "UI/Form/File/FileUpload";


interface props {
    // flatCategories, productAttributes, categoryDetail, onCloseForm, updateId, onUpdate
}


const AddCategory = (props) => {
    const {id: updateId} = useParams();

    const navigate = useNavigate();

    const {
        categoryState: {flatCategories, productFilterAttributes}
    } = useAppSelector(state => state);

    const dispatch = useAppDispatch();

    const [state, setState] = useState<any>({
        formData: {
            filterAttributes: {value: [], errorMessage: ""},
            defaultExpand: {value: [], errorMessage: ""},
            name: {value: "", errorMessage: ""},
            isProductLevel: {value: false, errorMessage: ""},
            parentId: {value: null, errorMessage: ""},
            logo: {value: null, errorMessage: ""}
        },

        sections: [
            {
                sectionName: "",
                specification: []
            }
        ],
        categoryDetail: null,
    });

    const {formData} = state;

    function makeSections(productDescriptionSection: {}) {
        let sections: {
            sectionName: string,
            specification: any[]
        }[] = []
        for (let productDescriptionSectionKey in productDescriptionSection) {
            sections.push({
                sectionName: productDescriptionSectionKey,
                specification: productDescriptionSection[productDescriptionSectionKey]
            })
        }
        return sections
    }

    useEffect(() => {
        fetchFlatCategoriesAction(flatCategories, dispatch);
        fetchProductAttributesAction(dispatch);
    }, [])


    useEffect(() => {
        if (updateId) {
            handleFetchAttributes();

            fetchCategoryDetailAction(dispatch, updateId)

            apis.get(`/api/v1/categories/detail?id=${updateId}`)
                .then(({status, data}) => {
                    if (status === StatusCode.Ok) {
                        let sections;
                        if (data.productDescriptionSection) {
                            sections = makeSections(data.productDescriptionSection)
                        }
                        setState((p) => ({...p, categoryDetail: data, sections: sections ? sections : p.sections}));
                    }
                })
                .catch((ex) => {
                });
        }
    }, [updateId]);


    useEffect(() => {
        if (state.categoryDetail && productFilterAttributes) {
            let catDetail: any = state.categoryDetail;

            setState((p) => {
                let filterAttributes: Attribute[] = [];

                catDetail.filterAttributes?.forEach((attName) => {
                    let att = productFilterAttributes.find((pAtt) => pAtt.attributeName === attName);
                    if (att) {
                        filterAttributes.push(att);
                    }
                });
                let defaultExpandAttr: Attribute[] = [];
                catDetail.defaultExpand?.forEach((attName) => {
                    let att = productFilterAttributes.find((pAtt) => pAtt.attributeName === attName);
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
                        name: {
                            value: catDetail.name,
                        },
                        parentId: {
                            value: catDetail.parentId,
                        },
                        isProductLevel: {
                            value: catDetail.isProductLevel,
                        },
                    },
                };
            });
        }
    }, [productFilterAttributes, state.categoryDetail]);

    const [httpResponse, setHttpResponse] = useState({
        message: "",
        isSuccess: false,
        loading: false,
    });

    function handleFetchAttributes() {
        if (!productFilterAttributes) {
            fetchProductAttributesAction(dispatch);
        }
    }


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
        if (name === "parentId" && updateFormData.parentId.value === "null") {
            updateFormData.parentId.value = null
        }


        setState({
            ...state,
            formData: updateFormData,
        });
    }


    async function handleAdd(e) {
        e.preventDefault();
        setHttpResponse((p) => ({...p, message: "", isSuccess: false}));

        let isComplete = true;
        let payload: any = {};
        let errorMessage = "";

        for (let fieldKey in formData) {
            if (fieldKey === "filterAttributes") {
                payload[fieldKey] = formData[fieldKey]?.value?.map((att) => att.attributeName) || []

            } else if (fieldKey === "defaultExpand") {
                payload[fieldKey] = formData[fieldKey]?.value?.map((att) => att.attributeName) || []

            } else if (fieldKey === "isProductLevel") {
                payload[fieldKey] = formData[fieldKey].value;

            } else if (fieldKey === "parentId") {
                payload[fieldKey] = formData[fieldKey].value

            } else {
                if (formData[fieldKey].value) {
                    payload[fieldKey] = formData[fieldKey].value;
                } else {
                    errorMessage = "Please select " + fieldKey;
                    isComplete = false;
                }
            }
        }


        /** make Product description section data like from sections array of object
         General:["In The Box", "Model Number", "Model Name", "Color", "Browse Type", "SIM Type", "Hybrid Sim Slot",…]
         Display: ["Display Size", "Resolution", "Resolution Type", "GPU", "Display Type", "Other Display Features"]
         Features:["Sensors", "Mobile Tracker", "Removable Battery", "GPS Type"]
         Lunch:["Announced"]
         */
        let descriptionSection = {}
        state.sections.forEach((section) => {
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


        try {

            let formData1 = convObjectToFormDate(payload, {
                logo: handleProcessLogo
            })

            // setHttpResponse(p => ({...p, message: "", loading: true}));

            if (updateId) {
                let {data, status} = await apis.patch("/api/categories/" + updateId, formData1)
                if (status === StatusCode.Created) {
                    setTimeout(() => {
                        setHttpResponse({message: data.message, loading: false, isSuccess: true});
                    }, 300)
                }

            } else {
                // add as a category
                let {data, status} = await apis.post("/api/v1/categories", formData1)
                if (status === StatusCode.Created) {
                    dispatch(addFlatCategory(data.category))
                    setTimeout(() => {
                        setHttpResponse({message: data.message, loading: false, isSuccess: true});
                    }, 300)

                }
            }
        } catch (ex) {
            setTimeout(() => {
                setHttpResponse({message: errorMessageCatch(ex), loading: false, isSuccess: false});
            }, 300)
        } finally {
            setHttpResponse(p => ({...p, message: "", loading: false, isSuccess: true}));
        }

        setHttpResponse({isSuccess: false, message: "", loading: false})

    }


    function specificationValueChange(value, sectionIndex, specificationIndex) {
        setState((prev) => {
            let sections = [...prev.sections]
            if (sections[sectionIndex]) {
                if (sections[sectionIndex].specification) {
                    sections[sectionIndex].specification[specificationIndex] = value
                }
            }
            return {
                ...prev,
                sections
            }
        })
    }

    function sectionNameChange(value, sectionIndex) {
        setState((prev) => {
            let sections = [...prev.sections]
            if (sections[sectionIndex]) {
                sections[sectionIndex].sectionName = value
            }
            return {
                ...prev,
                sections
            }
        })
    }

    // add more Product description section specification
    function addMoreSpecification(sectionIndex) {
        setState((prev) => {
            let sections = [...prev.sections]
            if (sections[sectionIndex]) {
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

    // add more Product description section
    function addMoreSection() {
        setState((prev) => ({
            ...prev, sections: [...prev.sections, {
                sectionName: "",
                specification: [""]
            }]
        }))
    }

    /*** fill up some dummy data for Product description section */
    function handleFillTextData() {
        const data = [
            {
                sectionName: "NETWORK",
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
            }, {
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
            }, {
                sectionName: "MEMORY",
                specification: [
                    "Card slot",
                    "Internal"
                ]
            }
        ]
        setState((p) => ({...p, sections: data}))
    }

    function convObjectToFormDate(obj, handle) {
        let formData = new FormData()
        for (let objKey in obj) {
            if (handle && handle[objKey]) {
                let item = handle[objKey](objKey, obj[objKey], formData)
                if (item) {
                    formData.append(objKey, item);
                }
            } else {
                formData.append(objKey, JSON.stringify(obj[objKey]))
            }
        }
        return formData;
    }

    // let f = convObjectToFormDate({
    //     name: "sdfsdf",
    //     age: 23432,
    //     items: [2, 34],
    //     logo: new Blob()
    // }, {
    //     logo: handleProcessLogo
    // })

    function handleProcessLogo(name, value, formData) {
        if (value instanceof Blob) {
            formData.append(name, value, value.name)
        }
    }


    return (
        <Card className="">
            <form onSubmit={handleAdd}>
                <h2 className="heading-3 py-4 text-center ">{updateId ? "Update Category" : "Add New Category"}</h2>


                <ActionModal
                    {...httpResponse}
                    loadingTitle={`Product is  ${updateId ? "Updating" : "Adding"}...`}
                    onClose={() => httpResponse.message !== "" && setHttpResponse((p) => ({...p, message: ""}))}/>

                <InputGroup
                    name="name"
                    label="Category Name"
                    className="!flex-col"
                    labelClass=""
                    state={formData}
                    placeholder="enter category name"
                    onChange={handleChange}
                />


                {/*********** Logo **************/}

                <FileUpload
                    name="logo"
                    label="Logo"
                    maxSize={200000} // allow 200kb max size
                    inputClass=""
                    previewImageClass="w-20 h-20 object-contain"
                    placeholder="Choose Cover Photo"
                    onChange={handleChange}
                    defaultValue={formData.logo.value}
                    labelClass="dark:text-white !mb-2"
                    // errorMessage={formData.logo.errorMessage}
                    className={"!flex-col max-w-xs"}
                />


                <SelectGroup
                    name="parentId"
                    className={"!flex-col mt-4"}
                    label="Select ParentId"
                    placeholder="parentId"
                    onChange={handleChange}
                    state={formData}
                    options={() => (
                        <>
                            <option value="0">Select category parent ID</option>
                            <option className="cursor-pointer py-1 menu-item" value={"null"}>
                                {"null"}
                            </option>
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


                <MultiSelect
                    name="filterAttributes"
                    onClick={handleFetchAttributes}
                    labelClass="dark:text-white !mb-2"
                    className={"!flex-col"}
                    label="Filter Attributes"
                    defaultValue={state.formData.filterAttributes.value}
                    placeholder="Attributes Name"
                    onChange={handleChange}
                    state={formData}
                    options={(click) => (
                        <>
                            <li value="0">Select Attribute</li>
                            {productFilterAttributes?.map((attr) => (
                                <li onClick={() => click(attr)} className="cursor-pointer py-1 menu-item">
                                    {attr.attributeName}
                                </li>
                            ))}
                        </>
                    )}
                    dataKey={{title: "attributeName", key: "attributeName"}}
                />

                <MultiSelect
                    name="defaultExpand"
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
                            {productFilterAttributes?.map((attr) => (
                                <li onClick={() => click(attr)} className="cursor-pointer py-1 menu-item" value={attr._id}>
                                    {attr.attributeName}
                                </li>
                            ))}
                        </>
                    )}
                    dataKey={{title: "attributeName", key: "attributeName"}}
                />

                <div className="flex items-center justify-between  mt-5">
                    <h3 className="text-lg font-bold">Product Description Section</h3>

                </div>


                <div>
                    <Button onClick={addMoreSection} type="button" className="mt-1 bg-green-450 !py-1.5 !px-1 !w-full justify-center flex">
                        <span className="flex "><BiPlus className="text-lg"/> Add More Section</span>
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
                                {section.specification?.map((spec, specificationIndex) => (
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
                                    <Button onClick={() => addMoreSpecification(index)} type="button"
                                            className="mt-1 bg-secondary-300 !py-1.5 !px-1 !w-full box-border justify-center flex">
                                        <span className="flex "><BiPlus className="text-lg"/> Add Specification</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                <div className="flex items-center gap-x-4 flex-wrap py-4">
                    <Button loading={httpResponse.loading} type="submit" className="bg-green-450 mt-4" loaderClass="!border-white">
                        {!updateId ? "Save Category" : "Update Category"}
                    </Button>
                    <Button type="button" className="bg-green-450 mt-4" loaderClass="!border-white" onClick={handleFillTextData}>
                        FilUp With Example Data
                    </Button>
                    <Link to="/admin/categories">
                        <Button type="button" className="bg-green-450 mt-4">
                            Cancel
                        </Button>
                    </Link>
                </div>
            </form>
        </Card>
    );
};

export default AddCategory;
