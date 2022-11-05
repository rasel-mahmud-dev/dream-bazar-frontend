import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "src/store";
import { InputGroup } from "UI/Form";
import FileUpload from "UI/Form/File/FileUpload";
import { Button } from "UI/index";
import Card from "UI/Form/Card/Card";
import apis from "src/apis";
import errorMessageCatch from "src/utills/errorMessageCatch";
import HttpResponse from "components/HttpResponse/HttpResponse";
import {ACTION_TYPES, StatusCode} from "store/types";

const CreateShop = (props) => {
	const {
		authState: { auth },
		sellerState: { shop },
	} = useSelector((state: RootState) => state);

	const location = useLocation();
	const dispatch = useDispatch();

	const [httpResponse, setHttpResponse] = useState({
		isSuccess: false,
		message: "",
		loading: false,
	});

	let isUpdate = location.pathname === "/seller/shop/edit";

	const [shopInfo, setShopInfo] = useState({
		shopPhone: { value: "", errorMessage: "", required: true },
		shopName: { value: "", errorMessage: "", required: true },
		shopLogo: { value: null, errorMessage: "", required: false },
		shopBanner: { value: null, errorMessage: "", required: false },
		shopAddress: { value: "", errorMessage: "", required: true },
	});

	useEffect(() => {
		if (shop) {
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
	}, [auth, shop]);

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
			if (updateShopInfo[shopInfoKey].required && !updateShopInfo[shopInfoKey].value) {
				updateShopInfo[shopInfoKey] = {
					...updateShopInfo[shopInfoKey],
					errorMessage: `${shopInfoKey} is required`,
				};
				isCompleted = false;
			}
			if (isCompleted) {
				payload.append(shopInfoKey, updateShopInfo[shopInfoKey].value);
			}
		}

		if (!isCompleted) {
			return setShopInfo(updateShopInfo);
		}
		try {
			setHttpResponse((p) => ({ ...p, message: "", loading: true }));
			if (isUpdate) {
                let {data, status} = await apis.patch("/api/seller/shop", payload);
                if(status === StatusCode.Created){
                    dispatch({
                        type: ACTION_TYPES.FETCH_SELLER_SHOP,
                        payload: {
                            ...shop,
                            ...data
                        }
                    })
                }
			} else {
				let { data, status } = await apis.post("/api/seller/create/shop", payload);
			}
			setHttpResponse({ isSuccess: true, message: "ok", loading: false });
		} catch (ex) {
			setHttpResponse({ isSuccess: false, message: errorMessageCatch(ex), loading: false });
		}
	}

	return (
		<div className="max-w-3xl mx-auto py-10">
			<form onSubmit={handleSubmit}>
				<h3 className="heading-2 text-center">{isUpdate ? "Update Shop " : "Create A Shop"}</h3>

				<HttpResponse httpResponse={httpResponse} />

				<Card>
					<h5 className="heading-5">Shop information</h5>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
						<InputGroup
							name="shopPhone"
							required={shopInfo.shopPhone.required}
							label="Phone Number"
							className="!flex-col bg-white  "
							inputClass="bg-white focus:border-gray-100 border focus:border-green-450 !placeholder:text-neutral-200"
							labelClass="dark:text-white !mb-2"
							state={shopInfo}
							onChange={handleChange}
						/>

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
						Create Shop
					</Button>
				</Card>
			</form>
		</div>
	);
};

export default CreateShop;