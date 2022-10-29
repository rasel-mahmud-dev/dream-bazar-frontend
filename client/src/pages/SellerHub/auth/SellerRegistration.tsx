import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Link, Navigate} from "react-router-dom";
import {RootState} from "src/store";
import {InputGroup} from "UI/Form";
import FileUpload from "UI/Form/File/FileUpload";
import {Button} from "UI/index";
import Card from "UI/Form/Card/Card";
import apis from "src/apis";
import errorMessageCatch from "src/utills/errorMessageCatch";

const SellerRegistration = (props) => {
    const {auth} = useSelector((state: RootState) => state.authState);
    
    const [httpResponse, setHttpResponse] = useState({
        isSuccess: false,
        message: "",
        loading: false,
    });
    
    if (auth) {
        return <Navigate to={"/seller/dashboard"}/>;
    }
    
    const [shopInfo, setShopInfo] = useState({
        firstName: {value: "", errorMessage: "", required: true},
        lastName: {value: "", errorMessage: "", required: false},
        password: {value: "", errorMessage: "", required: true},
        confirmPassword: {value: "", errorMessage: "", required: true},
        email: {value: "", errorMessage: "", required: true},
        phone: {value: "", errorMessage: "", required: true},
        shopName: {value: "", errorMessage: "", required: true},
        avatar: {value: null, errorMessage: "", required: true},
        shopLogo: {value: null, errorMessage: "", required: false},
        shopBanner: {value: null, errorMessage: "", required: false},
        shopAddress: {value: "", errorMessage: "", required: true},
    });
    
    function handleChange(e) {
        const {name, value} = e.target;
        setShopInfo((prevState) => {
            let updateState = {...prevState};
            updateState[name] = {
                ...updateState[name],
                value,
                errorMessage: "",
            };
            return updateState;
        });
    }
    
    async function handleSubmit(e) {
        e.preventDefault();
        
        setHttpResponse({isSuccess: false, message: "", loading: false});
        
        let isCompleted = true;
        let payload = new FormData();
        
        let updateShopInfo = {...shopInfo};

        for (let shopInfoKey in updateShopInfo) {
            
            if (updateShopInfo[shopInfoKey].required && !updateShopInfo[shopInfoKey].value) {
                updateShopInfo[shopInfoKey] = {
                    ...updateShopInfo[shopInfoKey],
                    errorMessage: `${shopInfoKey} is required`
                };
                isCompleted = false
            }
            if (isCompleted) {
                payload.append(shopInfoKey, updateShopInfo[shopInfoKey].value);
            }
        }
        
        if(!isCompleted) {
            return setShopInfo(updateShopInfo);
        }
        try {
            setHttpResponse(p=>({...p, message: "", loading: true}));
            let {data, status} = await apis.post("/api/seller/create", payload);
            setHttpResponse({isSuccess: true, message: "ok", loading: false});
        } catch (ex) {
            setHttpResponse({isSuccess: false, message: errorMessageCatch(ex), loading: false});
        }
    }
    
    return (
        <div className="max-w-3xl mx-auto py-10">
			<form onSubmit={handleSubmit}>
				<h3 className="heading-2 text-center">Create a Seller Account</h3>
                
                {httpResponse.message && <Card
                    className={`font-semibold ${httpResponse.isSuccess ? "bg-green-500/20 text-green-700 " : "bg-red-500/10 text-red-500"}`}>
                    <p>{httpResponse.message }</p>
                </Card> }
                

				<Card>
					<h5 className="heading-5">Seller Information</h5>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
						<InputGroup
                            name="firstName"
                            required={shopInfo.firstName.required}
                            label="First Name"
                            className="!flex-col bg-white  "
                            inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                            labelClass="dark:text-white !mb-2"
                            state={shopInfo}
                            onChange={handleChange}
                        />
						<InputGroup
                            name="lastName"
                            required={shopInfo.lastName.required}
                            label="Last Name"
                            className="!flex-col bg-white  "
                            inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                            labelClass="dark:text-white !mb-2"
                            state={shopInfo}
                            onChange={handleChange}
                        />
						<InputGroup
                            name="phone"
                            required={shopInfo.phone.required}
                            label="Last Name"
                            className="!flex-col bg-white  "
                            inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                            labelClass="dark:text-white !mb-2"
                            state={shopInfo}
                            onChange={handleChange}
                        />
                        
                        {/*********** Seller image **************/}
                        <FileUpload
                            name="avatar"
                            label="Seller Avatar"
                            required={shopInfo.avatar.required}
                            labelAddition={() => <span className="text-xs font-medium">Ratio (1:1)</span>}
                            inputClass="input-group"
                            placeholder="Choose Cover Photo"
                            onChange={handleChange}
                            defaultValue={shopInfo.avatar.value}
                            labelClass="dark:text-white !mb-2"
                            previewImageClass="max-w-sm w-full"
                            errorMessage={shopInfo.avatar.errorMessage}
                            className={"!flex-col w-40"}
                        />
					</div>
				</Card>

				<Card>
					<h5 className="heading-5">Account Information </h5>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
						<InputGroup
                            name="email"
                            required={shopInfo.email.required}
                            label="Seller Email"
                            className="!flex-col bg-white  "
                            inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                            labelClass="dark:text-white !mb-2"
                            state={shopInfo}
                            onChange={handleChange}
                        />

						<InputGroup
                            name="password"
                            required={shopInfo.password.required}
                            label="Password"
                            type="password"
                            className="!flex-col bg-white  "
                            inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                            labelClass="dark:text-white !mb-2"
                            state={shopInfo}
                            onChange={handleChange}
                        />

						<InputGroup
                            name="confirmPassword"
                            required={shopInfo.confirmPassword.required}
                            label="Confirm Password"
                            type="password"
                            className="!flex-col bg-white  "
                            inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                            labelClass="dark:text-white !mb-2"
                            state={shopInfo}
                            onChange={handleChange}
                        />
					</div>
				</Card>

				<Card>
					<h5 className="heading-5">Shop information</h5>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
						<InputGroup
                            name="shopName"
                            required={shopInfo.shopName.required}
                            label="Shop Name"
                            className="!flex-col bg-white  "
                            inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                            labelClass="dark:text-white !mb-2"
                            state={shopInfo}
                            onChange={handleChange}
                        />
						<InputGroup
                            name="shopAddress"
                            label="Shop Address"
                            required={shopInfo.shopAddress.required}
                            className="!flex-col bg-white "
                            inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                            labelClass="dark:text-white !mb-2"
                            state={shopInfo}
                            onChange={handleChange}
                        />

						<div className="flex gap-x-8">
							{/*********** shopLogo **************/}
                            <FileUpload
                                name="shopLogo"
                                label="Shop logo"
                                required={shopInfo.shopLogo.required}
                                labelAddition={() => <span className="text-xs font-medium">Ratio (1:1)</span>}
                                inputClass="input-group"
                                placeholder="Choose Cover Photo"
                                onChange={handleChange}
                                defaultValue={shopInfo.shopLogo.value}
                                labelClass="dark:text-white !mb-2"
                                previewImageClass="max-w-sm w-full"
                                errorMessage={shopInfo.shopLogo.errorMessage}
                                className={"!flex-col w-40"}
                            />
                            {/*********** shopBanner **************/}
                            <FileUpload
                                name="shopBanner"
                                label="Shop banner"
                                required={shopInfo.shopBanner.required}
                                labelAddition={() => <span className="text-xs font-medium">Ratio (3:1)</span>}
                                inputClass="input-group"
                                placeholder="Choose Cover Photo"
                                onChange={handleChange}
                                defaultValue={shopInfo.shopBanner.value}
                                errorMessage={shopInfo.shopBanner.errorMessage}
                                labelClass="dark:text-white !mb-2"
                                previewImageClass="max-w-sm w-full"
                                className={"!flex-col w-40"}
                            />
						</div>
					</div>

					<Button type="submit" className="bg-green-450 mt-6">
						Create Seller
					</Button>

					<p className="my-5  text-link">
						Already have an seller account? <Link to="/seller/login">login here</Link>
					</p>
				</Card>
			</form>
		</div>
    );
};

export default SellerRegistration;