import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link,  useNavigate} from "react-router-dom";
import { RootState } from "src/store";
import Card from "UI/Form/Card/Card";
import { InputGroup } from "UI/Form";
import { Button } from "UI/index";
import errorMessageCatch from "src/utills/errorMessageCatch";
import { loginAction } from "actions/authAction";
import { Scope } from "store/types";

const SellerLogin = (props) => {
	const sellerState = useSelector((state: RootState) => state.sellerState);

    
    const navigate = useNavigate();
    
    const dispatch = useDispatch();

	const [httpResponse, setHttpResponse] = useState({
		isSuccess: false,
		message: "",
		loading: false,
	});
    
    
    //
    // useEffect(()=>{
    //     if(sellerState.seller){
    //         navigate("/seller/dashboard")
    //     }
    // },[sellerState.seller])
    

	const [shopInfo, setShopInfo] = useState({
		password: { value: "", errorMessage: "", required: true },
		email: { value: "", errorMessage: "", required: true },
	});

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

	async function handleSellerLogin(e) {
		e.preventDefault();

		setHttpResponse({ isSuccess: false, message: "", loading: false });

		let isCompleted = true;
		let payload = {};

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
				payload[shopInfoKey] = updateShopInfo[shopInfoKey].value;
			}
		}

		if (!isCompleted) {
			return setShopInfo(updateShopInfo);
		}
		try {
			setHttpResponse((p) => ({ ...p, message: "", loading: true }));
   
			loginAction(payload, dispatch, Scope.SELLER_USER, (data, errorMessage)=>{
                if(errorMessage) {
                    setHttpResponse({isSuccess: false, message: errorMessage, loading: false});
                } else{
                    setHttpResponse({isSuccess: true, message: "ok", loading: false});
                }
            });
   
		} catch (ex) {
			setHttpResponse({ isSuccess: false, message: errorMessageCatch(ex), loading: false });
		}
	}

	return (
		<div className="max-w-2xl mx-auto py-10">
			<form onSubmit={handleSellerLogin}>
				<h3 className="heading-2 text-center">Seller Login</h3>

				{httpResponse.message && (
					<Card className={`font-semibold ${httpResponse.isSuccess ? "bg-green-500/20 text-green-700 " : "bg-red-500/10 text-red-500"}`}>
						<p>{httpResponse.message}</p>
					</Card>
				)}

				<Card>
					<div className="grid grid-cols-1  gap-x-4">
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
					</div>

					<Button type="submit" className="bg-green-450 mt-6">
						Seller Login
					</Button>

					<p className="my-5  text-link">
						Dont have an account? <Link to="/seller/registration">Create seller account here</Link>
					</p>
				</Card>
			</form>
		</div>
	);
};

export default SellerLogin;