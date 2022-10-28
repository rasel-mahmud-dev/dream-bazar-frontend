import React from "react";
import Card from "UI/Form/Card/Card";
import {CiShop} from "react-icons/all";
import FileUpload from "UI/Form/File/FileUpload";
import {InputGroup} from "UI/Form";
import {Button} from "components/UI";

const UpdateShopInfo = () => {
    const shopInfo = {
        name: {value: "", errorMessage: ""},
        image: {value: "", errorMessage: ""},
        banner: {value: "", errorMessage: ""},
        address: {value: "", errorMessage: ""},
        contact: {value: "", errorMessage: ""},
    };
    
    function handleChange(e) {
    }
    
    function handleSubmit(e){
        e.preventDefault();
        
    }
    
    return (
        <div>
			<h1 className="heading-3 flex items-center gap-x-1">
				<CiShop/>
				Shop Info
			</h1>
			<Card>
				<form onSubmit={handleSubmit}>
                    <h3 className="heading-4">My shop Info</h3>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<InputGroup
                        name="name"
                        required={true}
                        label="Shop Name"
                        className="!flex-col bg-white  "
                        inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                        labelClass="dark:text-white !mb-2"
                        state={shopInfo}
                        onChange={handleChange}
                    />

					<InputGroup
                        name="address"
                        label="Address"
                        required={true}
                        className="!flex-col bg-white "
                        inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                        labelClass="dark:text-white !mb-2"
                        state={shopInfo}
                        onChange={handleChange}
                    />

					<InputGroup
                        name="contact"
                        label="Contact"
                        labelAddition={() => <span>(Country Code Is Must Like For BD 880)</span>}
                        className="!flex-col"
                        inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                        labelClass="dark:text-white !mb-2"
                        state={shopInfo}
                        onChange={handleChange}
                    />
				</div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                    {/*********** Image **************/}
                    <FileUpload
                        name="image"
                        label="Upload Image"
                        required={true}
                        labelAddition={() => <span className="text-xs font-medium">Ratio (1:1)</span>}
                        inputClass="input-group"
                        placeholder="Choose Cover Photo"
                        onChange={handleChange}
                        defaultValue={shopInfo.image.value}
                        labelClass="dark:text-white !mb-2"
                        previewImageClass="max-w-sm w-full"
                        className={"!flex-col w-40"}
                    />
                    {/*********** Banner **************/}
                    <FileUpload
                        name="banner"
                        label="Upload Banner"
                        required={true}
                        labelAddition={() => <span className="text-xs font-medium">Ratio (1:1)</span>}
                        inputClass="input-group"
                        placeholder="Choose Cover Photo"
                        onChange={handleChange}
                        defaultValue={shopInfo.banner.value}
                        labelClass="dark:text-white !mb-2"
                        previewImageClass="max-w-sm w-full"
                        className={"!flex-col w-40"}
                    />
                </div>
                
                <Button type="submit" className="bg-green-450 mt-6">Update Info</Button>
                </form>
                
                
			</Card>
		</div>
    );
};

export default UpdateShopInfo;