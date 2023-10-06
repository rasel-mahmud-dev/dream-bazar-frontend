import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { InputGroup } from "UI/Form";
import { Link } from "react-router-dom";

function OTPValidate(props) {
    const { dispatch, onChange } = props;

    // const { authProfile } = useSelector(state => state.auth)

    const [state, setState] = React.useState({
        userData: {
            optCode: { value: "", errorMessage: "" },
            email: { value: "", errorMessage: "" },
        },
    });

    React.useEffect(() => {
        // if (!authProfile || !authProfile.email ) {
        //     dispatch(toggleModal("get_otp_modal"))
        // } else {
        //     setState({
        //         ...state,
        //         userData: {
        //             ...state.userData,
        //             otpCode: {
        //                 ...state.userData.otpCode,
        //                 errorMessage: "",
        //                 value: "",
        //             }
        //         },
        //         httpResponse: "",
        //         httpStatus: 0,
        //     })
        // }
    }, []);

    // async function handleCheckOTPCode(e) {
    //     e.preventDefault()
    //
    //     setState({
    //         ...state,
    //         httpResponse: "",
    //         httpStatus: 0,
    //     })
    //
    //
    //     if (!state.userData.otpCode.value) {
    //         setState({
    //             ...state,
    //             userData: {
    //                 ...state.userData,
    //                 otpCode: {
    //                     ...state.userData.otpCode,
    //                     errorMessage: "OTP code is required"
    //                 }
    //             }
    //         })
    //         return
    //
    //     } else if (state.userData.otpCode.value.length !== 6) {
    //         setState({
    //             ...state,
    //             userData: {
    //                 ...state.userData,
    //                 otpCode: {
    //                     ...state.userData.otpCode,
    //                     errorMessage: "Invalid OTP code"
    //                 }
    //             }
    //         })
    //         return
    //     }
    //
    //
    //     if (state.userData.email.value) {
    //
    //         try {
    //
    //             setState({ ...state, httpResponse: "pending" })
    //
    //             let response = await api.post("/api/auth/validate-otp-code", {
    //                 email: state.userData.email.value,
    //                 otp: state.userData.otpCode.value
    //             })
    //             let { data, status } = response
    //
    //             if (status === 201) {
    //                 dispatch(toggleModal("reset_password_modal"))
    //             }
    //
    //             setState({ ...state, httpResponse: "" })
    //
    //         } catch (ex) {
    //             setState({
    //                 ...state,
    //                 httpResponse: errorMessage(ex),
    //                 httpStatus: 500,
    //             })
    //         }
    //     } else {
    //         setState({
    //             ...state,
    //             httpResponse: "Please try again. Maybe you reload this form",
    //             httpStatus: 500,
    //         })
    //     }
    // }

    return (
        <div>
            <h1 className="card-title">Verify OTP Code</h1>
            <p className="card-info">
                OTP send your
                <span className="text-gray-100 font-medium">
                    {" "}
                    {state.userData.email.value}{" "}
                </span>
                mail. please copy and paste here to validate your account.
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

            <form>
                <InputGroup
                    className="mt-0 mb-0"
                    type="number"
                    state={state.userData}
                    name="optCode"
                    onChange={onChange}
                    placeholder="Enter Code"
                    inputClass="input-group"
                />

                <div className="my-4">
                    <Link className="text-right text-link" to="/auth/join/forget-password">
                        Didn't get OTP Code {" "}
                    </Link>
                </div>
                <button className="w-full bg-green-450 px-4 py-2 border-none text-white font-semibold text-lg rounded-xl">
                    Send Mail
                </button>
            </form>

            <Link
                to="/auth/join/login"
                className="font-medium !text-green-500 text-link"
            >
                <p className="text-center mb-4 mt-6">Back to login page </p>
            </Link>
        </div>
    );
}

export default OTPValidate