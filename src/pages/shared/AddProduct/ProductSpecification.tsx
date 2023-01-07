import React, {FC, useEffect, useRef, useState} from 'react';
import {Button} from "UI/index";
import {getApi} from "src/apis";
import {StatusCode} from "store/types";
import {useNavigate} from "react-router-dom";
import InputGroup from "UI/Form/InputGroup";
import {BsTrash} from "react-icons/all";
import {CategoryDetail} from "reducers/categoryReducer";


interface Props {
    categoryDetail: CategoryDetail
    onChangeSpecifications: (data: Specification[]) => void
}


/** Product Specification input field like this
 {
    Body: [
        {specificationName: 'Weight', value: '200gm', required: true}
    ]
}
 */
export type Specification = {
    [key: string]: {
        specificationName: string
        value: string
        required: boolean // for input required
    }
}


let fakeSpecificationData = {
    "General": [
        "Sales Package",
        "Model Number",
        "Part Number",

    ],
    "Processor And Memory Features": [
        "Dedicated Graphic Memory Type",
        "Dedicated Graphic Memory Capacity",

        "Clock Speed",
        "Expandable Memory",
        "Graphic Processor"
    ],
    "Storage": [
        "Storage Interface",

        "SSD Capacity"
    ],
    "Webcam": [
        "Built-in Webcam"
    ],
    "Operating System": [
        "OS Architecture",
        "Operating System",
    ],
    "Port And Slot Features": [
        "Mic In",
        "Hardware Interface",
        "Other Ports"
    ],
    "Display And Audio Features": [

        "Speakers",
        "Internal Mic"
    ],
    "Audio": [
        "Speaker Output"
    ],
    "Connectivity Features": [
        "Wireless LAN",
        "Wireless"
    ],
    "Additional Features": [
        "Disk Drive",
        "Web Camera",
        "Included Software"
    ],
    "Dimensions": [
        "Dimensions",
        "Weight"
    ],
    "Warranty": [
        "Warranty Summary",
        "Domestic Warranty",
        "International Warranty"
    ]
}

const ProductSpecification: FC<Props> = ({categoryDetail, onChangeSpecifications}) => {




    const [specifications, setSpecifications] = useState<Specification[]>()


    const navigate = useNavigate();
    const sectionNameInputRef = useRef<HTMLInputElement>();


    useEffect(() => {
        if (categoryDetail?._id) {
            handleSelectSpecificationSection(categoryDetail)
        } else if(categoryDetail === null){
            handleSelectSpecificationSection(categoryDetail, true)

        }




    }, [categoryDetail, categoryDetail?._id])



    const [editSectionName, setSectionName] = useState({
        value: "",
        backupName: "",
    });


    function handleChangeDescription(name: string, sectionName: string, value: string, index: number) {
        const updateSpecification = {...specifications};
        let specificationSection = updateSpecification[sectionName][index];
        if (specificationSection) {
            if (name === "name") {
                specificationSection.specificationName = value;
            } else {
                specificationSection.value = value;
            }
        }
        setSpecifications(updateSpecification);
    }

    function handleClickSectionName(sectionName) {
        setSectionName({
            backupName: sectionName,
            value: "",
        });
    }


    // delete individual specification section
    function handleRemoveSection(sectionName) {
        let updateSpecification = {...specifications}
        if (updateSpecification[sectionName]) {
            delete updateSpecification[sectionName]
        }
        setSpecifications(updateSpecification)
    }

    // delete specification field
    function removeSpecificationField(sectionName: string, fieldIndex: number) {
        let updateSpecifications = {...specifications}
        if (updateSpecifications[sectionName]) {
            updateSpecifications[sectionName].splice(fieldIndex, 1)
            setSpecifications(updateSpecifications)
        }
    }


    // section name input blur action
    function sectionNameInputBlur() {
        if (editSectionName.value) {
            if (editSectionName.backupName !== editSectionName.value) {
                const updateSpecifications = {...specifications}
                // backup value but change key name
                updateSpecifications[editSectionName.value] = [...updateSpecifications[editSectionName.backupName]]
                // delete old one
                delete updateSpecifications[editSectionName.backupName]
                setSpecifications(updateSpecifications)
            }
        }
        setSectionName({
            backupName: "",
            value: "",
        });
    }

    useEffect(() => {
        onChangeSpecifications(specifications)
    }, [specifications])


    useEffect(() => {
        if (editSectionName.backupName && sectionNameInputRef.current) {
            sectionNameInputRef.current.focus();
        }
    }, [editSectionName.backupName]);


    // add new specification section field
    function addNewSpecificationField(sectionName: string) {
        const updateSpecifications = {...specifications};
        updateSpecifications[sectionName] = [
            ...updateSpecifications[sectionName],
            {specificationName: "", value: ""},
        ];
        setSpecifications(updateSpecifications)
    }

    // add new specification section
    function handleAddMoreSection() {
        const updateSpecifications = {...specifications};
        let number = Object.keys(specifications || {}).length
        updateSpecifications["sectionName-" + number] = [{specificationName: "specification name", value: ""}];
        setSpecifications(updateSpecifications);
    }


    function handleSelectSpecificationSection(categoryDetail: CategoryDetail, isFake: boolean = false) {

        let productDescriptionSectionInput = {};
        let obj = categoryDetail?.productDescriptionSection;
        if(isFake){
            obj = fakeSpecificationData
        }
        if (obj) {
            for (let objKey in obj) {
                let specifications = obj[objKey];
                specifications = specifications.map((spec) => ({specificationName: spec, value: "", required: true}));
                productDescriptionSectionInput[objKey] = specifications;
                // if(specifications && specifications.length > 0){
                //     let s = {}
                //     specifications = specifications.map(spec=>{
                //         s[spec] = ""
                //     })
                //     productDescriptionSectionInput[objKey] = s
                // }
            }
        }

        setSpecifications(productDescriptionSectionInput)


    }

    return (
        <div className="card">
            <h5 className="heading-5">Product Description</h5>

            {specifications && Object.keys(specifications).map((sectionName) => (
                <div className="mt-6" key={sectionName}>
                    {editSectionName.backupName && editSectionName.backupName === sectionName ? (
                        <InputGroup
                            ref={sectionNameInputRef}
                            className="w-full col-span-4 mt-1 text-xs font-medium"
                            required={true}
                            placeholder="section name"
                            onBlur={sectionNameInputBlur}
                            onChange={(e) => setSectionName({...editSectionName, value: e.target.value})}
                            defaultValue={editSectionName.backupName}
                            name="sectionName"
                        />
                    ) : (
                        <div onClick={() => handleClickSectionName(sectionName)} className="flex items-center gap-x-2 cursor-pointer">
                            <h4 className="heading-4 hover:text-green-500">
                                {sectionName}
                            </h4>
                            <BsTrash onClick={() => handleRemoveSection(sectionName)}/>
                        </div>
                    )}
                    <div className="mt-1">
                        {specifications[sectionName]?.map((specification, index) => (
                            <div key={index} className="flex items-center gap-x-2">
                                <div className="block sm:grid grid-cols-12 gap-x-4 flex-1">
                                    <InputGroup
                                        className="w-full col-span-4 mt-1 text-xs font-medium"
                                        value={specification.specificationName}
                                        name={specification.specificationName}
                                        onChange={(e) => handleChangeDescription("name", sectionName, e.target.value, index)}
                                        placeholder="specification name"
                                    />
                                    <InputGroup
                                        className="w-full col-span-8 mt-1 text-xs font-medium"
                                        name="value"
                                        onChange={(e) => handleChangeDescription("value", sectionName, e.target.value, index)}
                                        value={specification.value}
                                        placeholder="value"
                                    />
                                </div>
                                <BsTrash className="cursor-pointer" onClick={() => removeSpecificationField(sectionName, index)}/>
                            </div>
                        ))}
                        <Button
                            type="button"
                            onClick={() => addNewSpecificationField(sectionName)}
                            className="text-xs bg-secondary-400 !py-1 !px-2 mt-1"
                        >
                            +
                        </Button>
                    </div>
                </div>
            ))}

            <Button type="button" onClick={handleAddMoreSection} className="text-sm bg-secondary-400 !py-1.5  mt-1">
                Add More Section
            </Button>

        </div>
    );
};

export default ProductSpecification;