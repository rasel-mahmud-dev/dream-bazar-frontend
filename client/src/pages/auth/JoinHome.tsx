import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { toggleModal } from "src/store/slices/appSlice"

import { FaTimes } from "react-icons/fa"
import {Link, Outlet} from "react-router-dom";

import "./style.scss"
import {BiHome, CgHome} from "react-icons/all";
import {createContext} from "vm";


// import OTPValidate from './OTPValidate';
// import GetOTP from './GetOTP';
// import ResetPassword from './ResetPassword';
// import RegistrationModal from './RegistrationModal';
// import LoginModal from './LoginModal';



function JoinHome() {
    // const { app, auth } = useSelector(state => state)

    // const { modal } = app

    const dispatch = useDispatch()

    const [state, setState] = useState({
        userData: {
            firstName: { value: "", errorMessage: "" },
            lastName: { value: "", errorMessage: "" },
            email: { value: "", errorMessage: "" },
            password: { value: "", errorMessage: "" },
            confirmPassword: { value: "", errorMessage: "" },
            gender: { value: "", errorMessage: "" },
            otpCode: { value: "", errorMessage: "" },
            result: { value: "", errorMessage: "" }
        },
        verifyFor: "newAccount", // newAcc, resetPassword
        httpResponse: "",
        httpStatus: 200
    })

    function handleResetUserData(resetProps = {}){
        let updateUserData = { ...state.userData }
        for(let key in updateUserData){
            updateUserData[key] = {
                ...updateUserData[key],
                value: "",
                errorMessage: "",
                tauch: false
            }
        }
        setState({
            ...state,
            userData: updateUserData,
            ...resetProps
        })
    }

    // useEffect(() => {
    //     if (app.modal === "verify_modal") {
    //         if (auth.auth) {
    //             setUserData({ ...userData, email: auth.auth.email })
    //         }
    //     }
    // }, [app.modal, auth.auth])

    function handleChange(e) {
        const { name, value } = e.target
        let updateUserData = { ...state.userData }

        updateUserData = {
            ...updateUserData,
            [name]: {
                ...updateUserData[name],
                value: value,
                errorMessage: updateUserData[name] ? "" : updateUserData[name].errorMessage
            }
        }

        setState({
            ...state,
            userData: updateUserData
        })
    }
    
    

    return (
        <div>

            {/* <input type="checkbox" id="my-modal" className="modal-toggle" /> */}
    
                    <div className="auth-card-container">
                        <div className="auth-card">
                            <Outlet context={{parentState: state, setParentState: setState, handleChange}} />
                            <Link className="flex items-center justify-center text-link font-medium" to="/">
                                 <CgHome className="mr-1" />
                                Go Home
                            </Link>
                        </div>
                    </div>

                    {/*<div onClick={() => dispatch(toggleModal(""))} className="bg-neutral text-white absolute right-3 top-3 p-2 rounded-full">*/}
                    {/*    <FaTimes />*/}
                    {/*</div>*/}

                    {/*{modal === "login" && <LoginModal*/}
                    {/*    state={state}*/}
                    {/*    onChange={handleChange}*/}
                    {/*    setState={setState}*/}
                    {/*    app={app}*/}
                    {/*    auth={auth}*/}
                    {/*    onResetUserData={handleResetUserData}*/}
                    {/*    dispatch={dispatch}*/}
                    {/*/>}*/}
                    {/*{modal === "registration" && <RegistrationModal*/}
                    {/*    state={state}*/}
                    {/*    onChange={handleChange}*/}
                    {/*    setState={setState}*/}
                    {/*    app={app}*/}
                    {/*    auth={auth}*/}
                    {/*    onResetUserData={handleResetUserData}*/}
                    {/*    dispatch={dispatch}*/}
                    {/*/>}*/}
                    {/*{modal === "get_otp_modal" && <GetOTP*/}
                    {/*    state={state}*/}
                    {/*    onChange={handleChange}*/}
                    {/*    setState={setState}*/}
                    {/*    app={app}*/}
                    {/*    auth={auth}*/}
                    {/*    onResetUserData={handleResetUserData}*/}
                    {/*    dispatch={dispatch}*/}
                    {/*/>}*/}
                    {/*{modal === "otp_verify_modal" && <OTPValidate*/}
                    {/*    state={state}*/}
                    {/*    setState={setState}*/}
                    {/*    onChange={handleChange}*/}
                    {/*    app={app}*/}
                    {/*    auth={auth}*/}
                    {/*    onResetUserData={handleResetUserData}*/}
                    {/*    dispatch={dispatch}*/}
                    {/*/>}*/}
                    {/*{modal === "reset_password_modal" && <ResetPassword*/}
                    {/*    state={state}*/}
                    {/*    setState={setState}*/}
                    {/*    onChange={handleChange}*/}
                    {/*    app={app}*/}
                    {/*    auth={auth}*/}
                    {/*    onResetUserData={handleResetUserData}*/}
                    {/*    dispatch={dispatch}*/}
                    {/*/>}*/}
                    
   
        </div>
    )
}

export default JoinHome


