import React, {useEffect, useState} from "react";
import Card from "UI/Form/Card/Card";
import {CiShop} from "react-icons/all";
import FileUpload from "UI/Form/File/FileUpload";
import {InputGroup} from "UI/Form";
import {Button} from "components/UI";
import {RootState} from "src/store";
import {useDispatch, useSelector} from "react-redux";
import apis from "src/apis";
import errorMessageCatch from "src/utills/errorMessageCatch";
import HttpResponse from "components/HttpResponse/HttpResponse";
import {ACTION_TYPES} from "store/types";

const UpdateShopInfo = () => {
    const dispatch = useDispatch()
    
    const {seller, shop} = useSelector((state: RootState)=>state.sellerState)
    
    const [shopInfo, setShopInfo] = useState({
        shopName: {value: "", errorMessage: "", required: true},
        shopLogo: {value: "", errorMessage: "", required: true},
        shopBanner: {value: "", errorMessage: "", required: true},
        shopAddress: {value: "", errorMessage: "", required: true},
        shopContact: {value: "", errorMessage: "", required: true},
    });
    
    const [httpResponse, setHttpResponse] = useState({
        isSuccess: false,
        message: "",
        loading: false,
    });
    
    useEffect(()=>{
        if(shop) {
            let updatedShopInfo = {...shopInfo}
            for (let shopInfoKey in updatedShopInfo) {
                if (shop[shopInfoKey]) {
                    updatedShopInfo[shopInfoKey] = {
                        ...updatedShopInfo[shopInfoKey],
                        value: shop[shopInfoKey],
                    }
                }
            }
            console.log(updatedShopInfo)
            setShopInfo(updatedShopInfo)
        }
    }, [seller, shop])
    
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
            let {data, status} = await apis.post("/api/shop/update", payload);
            if(status === 201){
                dispatch({
                    type: ACTION_TYPES.FETCH_SELLER_SHOP,
                    payload: {
                        ...shop,
                        ...data
                    }
                })
            }
            setHttpResponse({isSuccess: true, message: "ok", loading: false});
        } catch (ex) {
            setHttpResponse({isSuccess: false, message: errorMessageCatch(ex), loading: false});
        }
    }
    
    return (
        <div>
			<h1 className="heading-3 flex items-center gap-x-1">
				<CiShop/>
				Shop Info
			</h1>
            
                    <HttpResponse httpResponse={httpResponse} />
            
			<Card>
				<form onSubmit={handleSubmit}>
                    <h3 className="heading-4">My shop Info</h3>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        label="Address"
                        required={shopInfo.shopAddress.required}
                        className="!flex-col bg-white "
                        inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
                        labelClass="dark:text-white !mb-2"
                        state={shopInfo}
                        onChange={handleChange}
                    />

					<InputGroup
                        name="shopContact"
                        label="Contact"
                        required={shopInfo.shopContact.required}
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
                        name="shopLogo"
                        label="Upload Image"
                        required={shopInfo.shopLogo.required}
                        labelAddition={() => <span className="text-xs font-medium">Ratio (1:1)</span>}
                        inputClass="input-group"
                        placeholder="Choose Cover Photo"
                        onChange={handleChange}
                        defaultValue={shopInfo.shopLogo.value}
                        labelClass="dark:text-white !mb-2"
                        previewImageClass="max-w-sm w-full"
                        className={"!flex-col w-40"}
                    />
                    {/*********** Banner **************/}
                    <FileUpload
                        name="shopBanner"
                        label="Upload Banner"
                        required={shopInfo.shopBanner.required}
                        labelAddition={() => <span className="text-xs font-medium">Ratio (1:1)</span>}
                        inputClass="input-group"
                        placeholder="Choose Cover Photo"
                        onChange={handleChange}
                        defaultValue={shopInfo.shopBanner.value}
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