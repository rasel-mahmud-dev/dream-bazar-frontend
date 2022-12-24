import React, {FC, useEffect, useRef, useState} from 'react';
import {Button} from "UI/index";
import {getApi} from "src/apis";
import {StatusCode} from "store/types";
import {useNavigate} from "react-router-dom";
import InputGroup from "UI/Form/InputGroup";



interface Props{
    categoryId?: string
    categoryDetail: any
}


/** Product Specification input field like this
{
    Body: [
        {specificationName: 'Weight', value: '200gm', required: true}
    ]
}
*/
type Specification = {
    [key: string] : {
        specificationName: string
        value: string
        required: boolean // for input required
    }
}




const ProductSpecification : FC<Props> = ({categoryDetail, categoryId}) => {

    const [specifications, setSpecifications] = useState<Specification[]>()


    const navigate = useNavigate();
    const sectionNameInputRef = useRef<HTMLInputElement>();


    useEffect(()=>{
        if(categoryId){
            handleSelectSpecificationSection()
        }
    }, [categoryId])

    const [editSectionName, setSectionName] = useState({
        value: "",
        backupName: "",
    });


    function handleChangeDescription(name: string, sectionName: string, value: string, index: number) {
        const updateSpecification = { ...specifications};
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


    function handleAddMoreSpecification(sectionName: string) {
        const updateSpecifications = { ...specifications };
        updateSpecifications[sectionName] = [
            ...updateSpecifications[sectionName],
            { specificationName: "", value: "" },
        ];
        setSpecifications(updateSpecifications)
    }

    function handleAddMoreSection() {
        const updateSpecifications = { ...specifications };
        let number = Object.keys(specifications || {}).length
        updateSpecifications["sectionName-" + number] = [{ specificationName: "specification name", value: "" }];
        setSpecifications(updateSpecifications);
    }

    function handleSelectSpecificationSection(){
            getApi()
                .get("/api/category/category-detail?categoryId=" + categoryId)
                .then(({ data, status }) => {
                    if (status === StatusCode.Ok) {
                        setSpecifications((prevState) => {
                            let productDescriptionSectionInput = {};
                            let obj = data.productDescriptionSection;
                            if (obj) {
                                for (let objKey in obj) {
                                    let specifications = obj[objKey];
                                    specifications = specifications.map((spec) => ({ specificationName: spec, value: "", required: true }));
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
                            return {
                                ...prevState,
                                ...productDescriptionSectionInput
                            };
                        });
                    }
                })
                .catch((ex) => {});

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
                            onChange={(e) => setSectionName({ ...editSectionName, value: e.target.value })}
                            defaultValue={editSectionName.backupName}
                            name="sectionName"
                        />
                    ) : (
                        <h4 className="heading-4 hover:text-green-500 cursor-pointer" onClick={() => handleClickSectionName(sectionName)}>
                            {sectionName}
                        </h4>
                    )}
                    <div className="mt-1">
                        {specifications[sectionName]?.map((specification, index) => (
                            <div className="block sm:grid grid-cols-12 gap-x-4" key={index}>
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
                        ))}
                        <Button
                            type="button"
                            onClick={() => handleAddMoreSpecification(sectionName)}
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