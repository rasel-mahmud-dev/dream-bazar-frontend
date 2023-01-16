import React, { useState } from "react";
import { Button, Popup } from "UI/index";
import { InputGroup } from "UI/Form";
import { Link } from "react-router-dom";
import { backend } from "src/apis";
import { BsFacebook, BsGoogle } from "react-icons/all";
import errorMessageCatch from "src/utills/errorMessageCatch";

const ForgetPassword = () => {
    const [state, setState] = useState({
        httpResponse: "",
        httpStatus: 0,
        userData: {
            phone: { value: "", errorMessage: "" },
            email: { value: "", errorMessage: "" },
            result: { value: "", errorMessage: "" },
            password: { value: "", errorMessage: "" },
            remember: { value: "", errorMessage: "" },
        },
    });

    async function loginHandler(e) {
        e.preventDefault();

        let isCompleted = true;
        let updatedUserData = { ...state.userData };

        let loginData = {
            email: updatedUserData.email,
            password: updatedUserData.password,
        };
        let payload = {};

        for (let key in loginData) {
            if (!updatedUserData[key].tauch || !updatedUserData[key].value) {
                updatedUserData[key].errorMessage = `${key} is required`;
                isCompleted = false;
            } else {
                payload[key] = updatedUserData[key].value;
            }
        }

        if (!isCompleted) {
            setState({
                ...state,
                userData: updatedUserData,
            });
            return;
        }

        try {
            setState({ ...state, httpResponse: "pending" });

            // let res = await api.post("/api/login", payload)
            // if (res.status === 201) {
            // 	if (!res.data.auth.verify) {
            // 		return dispatch(toggleModal("get_otp_modal"))
            // 	} else {
            // 		dispatch(toggleModal(""))
            // 		dispatch(setAuth(res.data))
            // 	}
            // }
        } catch (ex) {
            setState({
                ...state,
                httpResponse: errorMessageCatch(ex),
                httpStatus: 500,
            });
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        let updateUserData = { ...state.userData };

        updateUserData = {
            ...updateUserData,
            [name]: {
                ...updateUserData[name],
                value: value,
                tauch: true,
                errorMessage: updateUserData[name]
                    ? ""
                    : updateUserData[name].errorMessage,
            },
        };

        setState({
            ...state,
            userData: updateUserData,
        });
    }

    return (
        <div>
            <div>
                <h1 className="card-title">Forget Password</h1>

                <p className="card-info ">
                    We will send you a mail with a otp code and link. This link
                    or otp code make your account verifiyed.
                </p>

                {/*{renderLoader("login-userActionTypes.ts")}*/}
                {/*{errorMessage.message && (*/}
                {/*	<Popup className="error_popup p-5" style={{width: "max-content"}} inProp={true}>*/}
                {/*  <div className="d-flex">*/}
                {/*    <Button onClick={() => setErrorMessage({phone: "", message: ""})} type="text"*/}
                {/*            icon="fa fa-times"/>*/}
                {/*    <h4>{errorMessage.message}</h4>*/}
                {/*  </div>*/}
                {/*</Popup>*/}
                {/*)}*/}

                <form onSubmit={loginHandler}>
                    <InputGroup
                        state={state.userData}
                        name="email"
                        onChange={handleChange}
                        placeholder="Enter Email"
                        inputClass="bg-neutral-100 rounded-lg border border-transparent focus:border focus:border-green-400 !py-3 !px-4"
                    />
                    <div className="flex justify-between items-stretch mt-4 gap-x-4">
                        <InputGroup
                            className="mt-0 mb-0"
                            type="number"
                            state={state.userData}
                            name="result"
                            onChange={handleChange}
                            placeholder="Sum result"
                            inputClass="bg-neutral-100 rounded-lg border border-transparent focus:border focus:border-green-400 !py-3 !px-4"
                        />
                        <div className="bg-green-500/10 flex rounded-md justify-center items-center gap-x-1">
                            <p className="text-xl font-semibold text-red-500">
                                4
                            </p>
                            <p className="text-xl font-semibold text-blue-500">
                                2
                            </p>
                            <p className="text-xl font-semibold text-fuchsia-500">
                                1
                            </p>
                            <p className="text-xl font-semibold text-pink-500">
                                3
                            </p>
                        </div>
                    </div>

                    {/*<Checkbox*/}
                    {/*    label="Remember me"*/}
                    {/*    name="remember"*/}
                    {/*    checked={userData.remember}*/}
                    {/*    onChange={handleChange}*/}
                    {/*/>*/}

                    <div className="my-4">
                        <Link
                            className="text-right text-link"
                            to="/auth/join/opt-validate"
                        >
                            Have a OTP code{" "}
                        </Link>
                    </div>
                    <button className="w-full bg-green-450 px-4 py-2 border-none text-white font-semibold text-lg rounded-xl">
                        Send Mail
                    </button>
                </form>
                <Link
                    to="/auth/join/login"
                    className="font-medium !text-green-500 text-link "
                >
                    <p className="text-center mb-4 mt-6">Back to login page </p>{" "}
                </Link>
            </div>
        </div>
    );
};

export default ForgetPassword;