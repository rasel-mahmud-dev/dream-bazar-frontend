import React, {useEffect, useState} from "react";
import {InputGroup} from "UI/Form";
import FileUpload from "UI/Form/File/FileUpload";
import MultiSelect from "UI/Form/multiSelect/MultiSelect";
import {Button} from "UI/index";
import apis from "src/apis";
import errorMessageCatch from "src/utills/errorMessageCatch";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "src/store";
import {Link, useNavigate, useParams} from "react-router-dom";

import Card from "UI/Form/Card/Card";
import {ACTION_TYPES, Brand, StatusCode} from "store/types";
import {fetchBrands} from "actions/brandAction";
import {fetchFlatCategoriesAction} from "actions/categoryAction";
import HttpResponse from "components/HttpResponse/HttpResponse";
import useAppDispatch from "src/hooks/useAppDispatch";

const AddBrand = () => {
    const {
        categoryState: {flatCategories},
        brandState: {allBrands}
    } = useSelector((state: RootState) => state);

    const {id: updateId} = useParams();

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState<any>({
        name: {value: "", errorMessage: ""},
        logo: {value: null, blob: null, errorMessage: ""},
        forCategory: {value: [], errorMessage: ""},
    });

    const [categoryDetail, setCategoryDetail] = useState(null)

    const [httpResponse, setHttpResponse] = useState({
        loading: false,
        message: "",
        isSuccess: false,
    });

    useEffect(() => {
        if (allBrands.length === 0) {
            dispatch(fetchBrands());
        }
    }, []);

    useEffect(() => {

        if (!updateId) return;

        handleCollapseCategory();

        apis.get("/api/v1/brands/" + updateId)
            .then(({data, status}) => {
                if (status === StatusCode.Ok) {
                    setCategoryDetail(data)
                }
            })
            .catch((ex) => {
            });

    }, [updateId]);


    useEffect(() => {

        if (flatCategories && categoryDetail) {
            setFormData(prev => {
                let updateFormData = {...prev};
                for (let formDataKey in updateFormData) {
                    updateFormData[formDataKey] = {
                        ...updateFormData[formDataKey],
                        value: categoryDetail[formDataKey],
                    };
                }

                let updateForCategory = []
                updateFormData.forCategory.value?.forEach(catId => {
                    let c = flatCategories.find(fc => fc._id === catId)
                    if (c) {
                        updateForCategory.push(c)
                    }
                })
                return {
                    ...updateFormData,
                    forCategory: {value: updateForCategory, errorMessage: ""}
                }
            })
        }
    }, [flatCategories, categoryDetail]);


    function handleCollapseCategory() {
        fetchFlatCategoriesAction(flatCategories, dispatch)
    }

    function handleChange(e) {
        const {name, value} = e.target;

        let updateFormData = {...formData};

        if (name === "logo") {
            updateFormData = {
                ...updateFormData,
                [name]: {
                    ...updateFormData[name],
                    value: value,
                    errorMessage: updateFormData[name] ? "" : updateFormData[name].errorMessage,
                },
            };
        } else {
            updateFormData = {
                ...updateFormData,
                [name]: {
                    ...updateFormData[name],
                    value: value,
                    errorMessage: updateFormData[name] ? "" : updateFormData[name].errorMessage,
                },
            };
        }
        setFormData(updateFormData);
    }

    async function handleAdd(e) {
        let updateState = {...formData};

        // reset response state
        setHttpResponse({
            message: "",
            loading: false,
            isSuccess: false,
        });

        e.preventDefault();

        let isComplete = true;
        let payload = new FormData();

        for (let item in formData) {
            if (item === "logo") {
                if (formData[item].value) {
                    if (typeof formData[item].value === "string") {
                        payload.append(item, formData[item].value);
                    } else {
                        payload.append(item, formData[item].value, formData[item].value.name);
                    }
                }
            } else if (item === "forCategory") {
                let categoryIds = [];
                if (formData[item].value && Array.isArray(formData[item].value) && formData[item].value.length) {
                    for (let cat of formData[item].value) {
                        categoryIds.push(cat._id);
                    }
                } else {
                    formData[item].errorMessage = "Please select brand for category ";
                }

                payload.append(item, JSON.stringify(categoryIds));
            } else {
                if (!formData[item].value) {
                    isComplete = false;
                    formData[item].errorMessage = "Please enter " + item;
                }
                payload.append(item, formData[item].value);
            }
        }

        if (!isComplete) {
            setHttpResponse({isSuccess: false, loading: false, message: "Please fill Input"});
            formData(updateState);
            return;
        }

        setHttpResponse({
            message: "",
            loading: true,
            isSuccess: false,
        });

        if (updateId) {
            apis.patch("/api/v1/brands/" + updateId, payload)
                .then(({status, data}) => {
                    if (status === 201) {
                        setHttpResponse({isSuccess: true, message: data.message, loading: false});
                        onUpdate(updateId, data.brand);
                    }
                })
                .catch((ex) => {
                    setHttpResponse({isSuccess: false, message: errorMessageCatch(ex), loading: false});
                });
        } else {
            // add as a new brand
            apis.post("/api/v1/brands", payload)
                .then(({status, data}) => {
                    if (status === 201) {
                        setHttpResponse({isSuccess: true, message: data.message, loading: false});
                        onUpdate(null, data.brand);
                    }
                })
                .catch((ex) => {
                    setHttpResponse({isSuccess: false, message: errorMessageCatch(ex), loading: false});
                });
        }
    }

    // update and create handler
    function onUpdate(id: string, data: Brand) {
        if (id) {
            let updatedData = [...allBrands];
            let index = updatedData.findIndex((brand) => brand._id === id);
            if (index !== -1) {
                updatedData[index] = {
                    ...updatedData[index],
                    ...data,
                };
            }
            dispatch({
                type: ACTION_TYPES.FETCH_BRANDS,
                payload: updatedData,
            })

        } else {
            if (data) {
                dispatch({
                    type: ACTION_TYPES.FETCH_BRANDS,
                    payload: [...allBrands, data],
                })

            }
        }
        navigate("/admin/brands");
    }


    return (
        <Card>
            <form onSubmit={handleAdd}>
                <h2 className="heading-2">{updateId ? "Update Brand" : "Add New Brand"}</h2>

                <HttpResponse state={httpResponse}/>

                <InputGroup
                    name={"name"}
                    label="Brand Name"
                    className="!flex-col"
                    inputClass="input-group"
                    labelClass="dark:text-white !mb-2"
                    state={formData}
                    placeholder="Enter Brand Name"
                    onChange={handleChange}
                />
                {/*********** Cover **************/}

                <FileUpload
                    name="logo"
                    label="Logo"
                    inputClass="input-group"
                    placeholder="Choose Cover Photo"
                    onChange={handleChange}
                    defaultValue={formData.logo.value}
                    labelClass="dark:text-white !mb-2"
                    errorMessage={formData.logo.errorMessage}
                    className={"!flex-col max-w-xs"}
                />

                <MultiSelect
                    name="forCategory"
                    labelClass="dark:text-white !mb-2"
                    dataKey={{title: "name", key: "_id"}}
                    className={"!flex-col"}
                    defaultValue={formData.forCategory.value}
                    label="Select for Category"
                    inputClass="input-group"
                    placeholder="for category"
                    onChange={handleChange}
                    onClick={handleCollapseCategory}
                    state={formData}
                    options={(onClick) => (
                        <div className="bg-neutral-100 px-2 absolute top-0 left-0 w-full">
                            {flatCategories?.map((cat) => (
                                <li onClick={() => onClick(cat)} className="cursor-pointer py-1 menu-item">
                                    {cat.name}
                                </li>
                            ))}
                        </div>
                    )}
                />

                <div className="flex items-center gap-x-4">
                    <Button type="submit" className="bg-secondary-300 mt-4" loaderClass="!border-white" loading={httpResponse.loading}>
                        {!updateId ? "Save Brand" : "Update Brand"}
                    </Button>

                    <Link to="/admin/brands">
                        <Button type="button" className="bg-secondary-300 mt-4">
                            Cancel
                        </Button>
                    </Link>
                </div>
            </form>
        </Card>
    );
};

export default AddBrand;
