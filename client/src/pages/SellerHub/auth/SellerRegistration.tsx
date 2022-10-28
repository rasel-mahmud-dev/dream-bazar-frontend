import React from "react";
import {useSelector} from "react-redux";
import {Link, Navigate} from "react-router-dom";
import {RootState} from "src/store";
import {InputGroup} from "UI/Form";
import FileUpload from "UI/Form/File/FileUpload";
import {Button} from "UI/index";
import Card from "UI/Form/Card/Card";

const SellerLogin = (props) => {
    const {auth} = useSelector((state: RootState) => state.authState);
    
    if (auth) {
        return <Navigate to={"/seller/dashboard"}/>;
    }
    
    const shopInfo = {
        name: {value: "", errorMessage: ""},
        image: {value: "", errorMessage: ""},
        banner: {value: "", errorMessage: ""},
        address: {value: "", errorMessage: ""},
        contact: {value: "", errorMessage: ""},
    };
    
    function handleChange(e) {
    }
    
    function handleSubmit(e) {
        e.preventDefault();
    }
    
    return (
        <div className="max-w-xl mx-auto py-10 container">
			<form onSubmit={handleSubmit}>
				<h3 className="heading-2 text-center">Create a Seller Account</h3>

				<Card>
					<h5 className="heading-5">Seller Information</h5>

					<InputGroup
                        name="name"
                        required={true}
                        label="Seller Name"
                        className="!flex-col bg-white  "
                        inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                        labelClass="dark:text-white !mb-2"
                        state={shopInfo}
                        onChange={handleChange}
                    />

					<InputGroup
                        name="name"
                        required={true}
                        label="Seller Email"
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
				</Card>

				<Card>
					<h5 className="heading-5">Shop information</h5>

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

					<div className="flex gap-x-8">
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
                    
                    
                            <Button type="submit" className="bg-green-450 mt-6">
					Create Seller
				</Button>
                    
                     <p className="my-5  text-link">
                    Already have an seller account?{" "}
                         <Link to="/seller/login">login here</Link>
                </p>
                
                
    
				</Card>

			
			</form>
		</div>
    );
};

export default SellerLogin;