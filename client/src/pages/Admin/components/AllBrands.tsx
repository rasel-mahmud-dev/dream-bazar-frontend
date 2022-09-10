import React, {} from "react";
import { Button, File, Popup, Modal, Tabs } from "components/UI";
import fullLink from "src/utills/fullLink";
import apis from "src/apis";
import Table from "UI/table/Table";
import staticImagePath from "src/utills/staticImagePath";

import {
    BsPencilSquare,
    FcEmptyTrash,
} from "react-icons/all";
import {useDispatch, useSelector} from "react-redux";
import { toggleBackdrop} from "actions/appAction";
import {RootState} from "src/store";
import {InputGroup} from "UI/Form";
import FileUpload from "UI/Form/File/FileUpload";
import {useParams} from "react-router-dom";

const { TabPane } = Tabs;

let files: string | any[] = [];

const AllBrands = (props) => {
    const [totalBrands, setTotalBrands] = React.useState<number>(0);
    const [brands, setBrands] = React.useState<any[]>([]);
    const [staticImages, setStaticImages] = React.useState([]);
    
    const {appState} = useSelector((state: RootState)=>state)

 
    const dispatch = useDispatch();

    const [state, setState] = React.useState<any>({
        isShowForm: true,
        updateId: "",
        formData: {
            name: {value: "", errorMessage: ""},
            logo: {value: null, blob: null, errorMessage: ""},
        }
    });

    const {formData, isShowForm, updateId} = state
    
    
    const d = [
        {
            name: "name",
            label: "Brand Name",
            required: true,
        },
        {
            name: "logo",
            type: "image",
            fileName: "",
            label: "Brand Logo",
            required: false,
        },
    ];

    React.useEffect(() => {
        (async function () {
            const { data } = await apis.get("/api/brands/count");
            setTotalBrands(data.count);

            const dd = await apis.get("/api/brands");
            setBrands(dd.data);
        })();
    }, []);

    function brandFetchForUpdate(brand) {
        setShowForm("update");
        let updatedBrandData = { ...brandData };
        for (let i = 0; i < d.length; i++) {
            if (brand[d[i].name]) {
                updatedBrandData[d[i].name] = brand[d[i].name];
            }
        }

        setBrandData(updatedBrandData);
        setUpdateBrandCopy(brand);
    }

    function deleteItem(id: any) {
        apis.delete(`/api/brands/${id}`).then((response) => {
            setBrands(brands.filter((b) => b._id !== id));
        });
    }
    
    
    function handleChange(e) {
        const { name, value } = e.target
        let updateFormData = { ...state.formData }

        if(name === "logo") {
            updateFormData = {
                ...updateFormData,
                [name]: {
                    ...updateFormData[name],
                    value: value,
                    errorMessage: updateFormData[name] ? "" : updateFormData[name].errorMessage
                }
            }
        } else {
            updateFormData = {
                ...updateFormData,
                [name]: {
                    ...updateFormData[name],
                    value: value,
                    errorMessage: updateFormData[name] ? "" : updateFormData[name].errorMessage
                }
            }
        }
        setState({
            ...state,
            formData: updateFormData
        })
    }

    async function handleAdd(e) {
        e.preventDefault();
    
        let isComplete = true
        let payload = new FormData();
        for (let item in formData) {
            if(!formData[item].value){
                isComplete = false
            }
            
            if(item === "logo"){
                if(typeof formData[item].value === "string"){
                    payload.append(item, formData[item].value)
                } else {
                    payload.append(item, formData[item].value, formData[item].value.name)
                }
            } else {
                payload.append(item, formData[item].value)
            }
        }
        
        if(updateId){
            apis.patch("/api/brand/"+updateId, payload).then(response=>{
                console.log(response)
            }).catch(ex=>{
                console.log(ex)
            })
        
        } else {
            apis.post("/api/brand", payload).then(response=>{
                console.log(response)
            }).catch(ex=>{
                console.log(ex)
            })
        }
        
        // if (isShowForm === "new") {
            // let { data } = await api.post("/api/brands", {...brandData})
            // setBrands([...brands, data.brands[0]])
        //     if (brandData.logo) {
        //         // need form data to send blob to backend
        //         let formData = new FormData();
        //         for (const key in brandData) {
        //             formData.append(key, brandData[key]);
        //         }
        //         let { data } = await apis.post(
        //             "/api/brands/with-image-upload",
        //             formData
        //         );
        //         setBrands([...brands, ...data.brands]);
        //     }
        //
        //     // console.log(brandData)
        // } else {
        //     let updatedBrands = [...brands];
        //     let { _id, ...otherProperties } = updatedBrandCopy;
        //     let formData = new FormData();
        //
        //     let b = { ...otherProperties, ...brandData };
        //     // upload with string logo path
        //     for (let key in b) {
        //         if (key !== "fileName") {
        //             formData.append(key, b[key]);
        //         }
        //     }
        //     // console.log(b)
        //     let { data } = await apis.put(`/api/brands/${_id}`, formData);
        //
        //     // if(updatedBrands.logo){
        //     // let { data } = await api.put(`/api/brands/${_id}`, {...otherProperties, ...brandData})
        //     // let index = updatedBrands.findIndex(b=>b._id === _id )
        //     // updatedBrands[index] = data.brand
        //     // setBrands(updatedBrands)
        // }
    }
    
    //  load all static files...
    function fetchStaticFiles() {
        apis.get("/api/static-file").then((response) => {
            setStaticImages(response.data);
        });
    }

    
    // click static file from static images
    function chooseImageFromStatic(url) {
        setBrandData({
            ...brandData,
            logo: "upload/" + url,
        });
    }
    
    
    function clearField(){
        let update = {...formData}
        for (let updateKey in update) {
            if (update[updateKey] && update[updateKey].value) {
                update[updateKey].value = ""
            }
        }
            return  update
    }
    
    function handleShowAddForm(isOpen=false) {
        setState({
            ...state,
            updateId: "",
            isShowForm: isOpen,
            formData: clearField()
        })
        dispatch(
            toggleBackdrop({
                isOpen: isOpen,
                scope: "custom"
            })
        );
    }
    
    function setUpdateBrandHandler(brand){
    
        let updateFormData = { ...state.formData }
        if(brand.name) {
            updateFormData.name = {value: brand.name, errorMessage: ""}
        }
        if(brand.logo){
            updateFormData.logo= {value: brand.logo, errorMessage: ""}
        }
        
        setState({
            ...state,
            isShowForm: true,
            updateId: brand.id,
            formData: updateFormData
        })
        dispatch(
            toggleBackdrop({
                isOpen: true,
                scope: "custom"
            })
        );
        
    }
    
    // render photo handler modal that an image can upload or get cdn link
    function showPhotoHandler() {
        // key ===  2 contains all static image files
        function handleTabChange(key) {
            if (key === "2") fetchStaticFiles();
        }

        return (
            <Modal>
                <Tabs defaultActiveKey="1" onChange={handleTabChange}>
                    <TabPane tab="Upload a new image" key="1">
                        <Input
                            name="logo"
                            label="Logo image cdn link"
                            onChange={handleChangeLogo}
                        />
                        <span>or</span>
                        <File
                            type="file"
                            name="logo"
                            onChange={handleChangeLogo}
                            label="Choose a photo"
                        />
                    </TabPane>

                    <TabPane tab="Images Gallery" key="2">
                        <div className="d-flex">
                            {staticImages.map((path) => (
                                <div className="static-image-thumbs">
                                    <img
                                        onClick={() =>
                                            chooseImageFromStatic(path)
                                        }
                                        src={fullLink(path)}
                                    />
                                </div>
                            ))}
                        </div>
                    </TabPane>
                </Tabs>

                <Button onClick={() => setShowLogoHandler(false)}>
                    Cancel
                </Button>
                <Button>Save</Button>
            </Modal>
        );
    }

    function addProduct() {
        return (
            <form onSubmit={handleAdd}>
                <h2 className="text-white text-center font-medium text-lg">
                    {updateId  ?  "Update Brand" : "Add New Brand"}
                </h2>

                <InputGroup
                    name={"name"}
                    label="Brand Name"
                    className="!flex-col"
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
                    className={"!flex-col"}
                />

                <div className="flex items-center gap-x-4" >
                    <Button type="submit" className="bg-secondary-300 mt-4">
                    {!updateId ? "Save Brand" : "Update Brand"}
                </Button>

                <Button
                    type="button"
                    className="bg-secondary-300 mt-4"
                    onClick={() => handleShowAddForm(false)}
                >
                    Cancel
                </Button>
                </div>
            </form>
        );
    }
    


    const columns = [
        {
            title: "Logo",
            dataIndex: "logo",
            render: (item) => (
                <div className="w-8">
                    <img src={staticImagePath(item.logo)} alt="" />
                </div>
            ),
        },
        { title: "Name", dataIndex: "name" },
        { title: "CreatedAt", dataIndex: "createdAt" },
        {
            title: "Action",
            dataIndex: "",
            className: "text-center",
            render: (item) => (
                <div className="flex justify-center items-center gap-x-2">
                    <BsPencilSquare className="text-md cursor-pointer" onClick={()=>setUpdateBrandHandler(item)} />
                    <FcEmptyTrash className="text-xl cursor-pointer" />
                </div>
            ),
        },
    ];



    return (
        <div className="pr-4">
            
            {appState.backdrop.isOpen && <div className={`backdrop ${isShowForm ? "backdrop--show" : ""}`}>
                <div className="modal-box auth-card">
                    {addProduct()}
                </div>
            </div>}
            
            <div className="flex items-center justify-between">
                <h1 className="h2">Brands</h1>

                {!updateId ? (
                    <Button
                        className="mt-4 bg-secondary-300"
                        onClick={()=>handleShowAddForm(true)}
                    >
                        Add New Brand
                    </Button>
                ) : (
                    <Button onClick={() => handleShowAddForm(false)}>Cancel</Button>
                )}
            </div>
            

            <h3 className="p">
                Brands fetch {brands?.length} of {totalBrands}{" "}
            </h3>

            <div className="card">
                <Table dataSource={brands ? brands : []} columns={columns} tbodyClass={{td: "py-2 px-2", tr: "hover:bg-green-500/10"}} />
            </div>
        </div>
    );
};

export default AllBrands