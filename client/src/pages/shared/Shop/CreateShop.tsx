import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import InputGroup from "UI/Form/InputGroup";
import FileUpload from "UI/Form/File/FileUpload";
import {Button} from "UI/index";
import Card from "UI/Form/Card/Card";
import apis, {getApi} from "src/apis";
import {ACTION_TYPES, Roles, StatusCode} from "store/types";
import useAppSelector from "src/hooks/useAppSelector";
import ActionModal from "components/ActionModal/ActionModal";


const CreateShop = ({isUpdate = false}) => {
    const { authState: { auth, shop }   } = useAppSelector(state => state);

    const navigate = useNavigate()

    const location = useLocation();
    const dispatch = useDispatch();

    const [httpResponse, setHttpResponse] = useState({
        isSuccess: false,
        message: "",
        loading: false,
    });


    const [shopInfo, setShopInfo] = useState({
        shopEmail: { value: "", errorMessage: "", required: true },
        shopPhone: { value: "", errorMessage: "", required: true },
        shopName: { value: "", errorMessage: "", required: true },
        shopLogo: { value: undefined, errorMessage: "", required: true },
        shopBanner: { value: undefined, errorMessage: "", required: false },
        shopAddress: { value: "", errorMessage: "", required: true },
        _id: { value: "", errorMessage: "", required: true }, // only for update
    });


    useEffect(() => {
        if (shop && isUpdate) {
            let updatedShopInfo = { ...shopInfo };
            for (let shopInfoKey in updatedShopInfo) {
                if (shop[shopInfoKey]) {
                    updatedShopInfo[shopInfoKey] = {
                        ...updatedShopInfo[shopInfoKey],
                        value: shop[shopInfoKey],
                    };
                }
            }
            setShopInfo(updatedShopInfo);
        }
    }, [auth, shop, isUpdate]);


    function handleChange(e) {
        const { name, value } = e.target;
        setShopInfo((prevState) => {
            let updateState = { ...prevState };
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

        setHttpResponse({ isSuccess: false, message: "", loading: false });

        let isCompleted = true;
        let payload = new FormData();

        let updateShopInfo = { ...shopInfo };

        for (let shopInfoKey in updateShopInfo) {
            if(shopInfoKey === "_id") continue;
            if (updateShopInfo[shopInfoKey].required) {
                if(!updateShopInfo[shopInfoKey].value) {
                    updateShopInfo[shopInfoKey] = {
                        ...updateShopInfo[shopInfoKey],
                        errorMessage: `${shopInfoKey} is required`,
                    };
                    isCompleted = false;
                } else{
                    payload.append(shopInfoKey, updateShopInfo[shopInfoKey].value)
                }

            } else {
                // optional fields
                if(updateShopInfo[shopInfoKey].value) {
                    payload.append(shopInfoKey, updateShopInfo[shopInfoKey].value)
                }
            }
        }

        if(!isCompleted){
            return setShopInfo(updateShopInfo)
        }

        try {
            setHttpResponse(p => ({...p, message: "", loading: true}));
            if (isUpdate) {
                let {data, status} = await getApi().patch("/api/shop", payload);
                if(status === StatusCode.Created){
                    dispatch({
                        type: ACTION_TYPES.FETCH_SELLER_SHOP,
                        payload: {
                            ...shop,
                            ...data
                        }
                    })
                    setTimeout(() => {
                        setHttpResponse({message: "Shop is updated", loading: false, isSuccess: false});
                        navigate(`/${auth?.roles?.includes(Roles.ADMIN) ? "admin": "seller"}/shop`)
                    }, 300)
                }
            } else {
                let { data, status } = await getApi().post("/api/shop/create", payload);
                if(status === StatusCode.Created){
                    dispatch({
                        type: ACTION_TYPES.FETCH_SELLER_SHOP,
                        payload: data
                    })
                    setTimeout(() => {
                        setHttpResponse({message: "Shop is created", loading: false, isSuccess: false});
                        navigate(`/${auth?.roles?.includes(Roles.ADMIN) ? "admin": "seller"}/shop`)
                    }, 300)

                }
            }

        } catch (ex: any) {
            setTimeout(() => {
                setHttpResponse({message: ex.message, loading: false, isSuccess: false});
            }, 300)
        } finally {
            setHttpResponse(p => ({...p, message: "", loading: false, isSuccess: true}));
        }
    }

    return (
        <div className="py-10">
            <form onSubmit={handleSubmit}>
                <h3 className="page-label">{isUpdate ? "Update Shop " : "Create A Shop"}</h3>

                <ActionModal
                    {...httpResponse}
                    loadingTitle={isUpdate ? "Updating Shop" : "Creating Store..."}
                    onClose={() => httpResponse.message !== "" && setHttpResponse((p) => ({...p, message: ""}))}
                />

                <Card>
                    <h5 className="heading-5">Shop information</h5>
                    <div className="flex gap-x-4">
                        <div className="flex-1">
                            <InputGroup
                                name="shopEmail"
                                required={shopInfo.shopPhone.required}
                                label="Email"
                                className="flex !flex-col"
                                state={shopInfo}
                                onChange={handleChange}
                            />
                            <InputGroup
                                name="shopPhone"
                                required={shopInfo.shopPhone.required}
                                label="Phone Number"
                                className="flex !flex-col"
                                state={shopInfo}
                                onChange={handleChange}
                            />

                            <InputGroup
                                name="shopName"
                                className="flex !flex-col"
                                required={shopInfo.shopName.required}
                                label="Shop Name"
                                state={shopInfo}
                                onChange={handleChange}
                            />

                            <InputGroup
                                className="flex !flex-col"
                                name="shopAddress"
                                as="textarea"
                                label="Shop Address"
                                required={shopInfo.shopAddress.required}
                                state={shopInfo}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex-1 flex gap-x-4">

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

                    <Button type="submit" className="mt-6" theme="primary">
                        {isUpdate ? "Update" : "Create"}
                    </Button>
                </Card>
            </form>
        </div>
    );
};

export default CreateShop;