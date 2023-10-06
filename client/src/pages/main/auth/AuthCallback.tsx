import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {currentAuthAction} from "actions/authAction";


import useHttpResponse from "src/hooks/useHttpResponse";
import Alert from "UI/Alert/Alert";
import {Button} from "UI/index";
import useAppDispatch from "src/hooks/useAppDispatch";
import Loader from "UI/Loader/Loader";
import {logout} from "reducers/authSlice";

const AuthCallback = () => {

    const [searchParams, setParams] = useSearchParams()
    const params = useParams()

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {httpStatus, setHttpStatus, resetHttpStatus} = useHttpResponse()


    useEffect(() => {
        setHttpStatus({isLoading: true})
        let token = searchParams.get("token")
        if (token) {
            dispatch(currentAuthAction()).unwrap().then(()=>{
                dispatch(logout)
                navigate("/", {replace: true})
                localStorage.setItem("token", token)
            }).catch(ex=>{
                setHttpStatus({isLoading: false, message: "Login Session expire, Please try again"})
            }).finally(() => {
                setHttpStatus({isLoading: false})
            })
        } else {
            setHttpStatus({isLoading: false, message: "Login Session expire, Please try again"})
        }

    }, [params.provider])

    return (
        <div className="my-20">

            {httpStatus.isLoading ? (
                <Loader className="flex justify-center" title="Please wait You are logged"></Loader>
            ) : (
                <div className="max-w-md mx-auto">
                    <div className="text-white font-semibold text-lg md:text-xl md:block">
                        <img className="w-16 mx-auto" src="/static/icons/login-icon.svg" alt=""/>
                        <Alert className="mt-4 text-center text-red-500" message={httpStatus.message}/>
                    </div>
                    <div className="flex items-center justify-center mt-6 gap-x-4">
                        <Link to="/"><Button theme="primary" className="">Back To Home</Button></Link>
                        <Link to="/join/login"><Button theme="primary" className="">Go To Login Page</Button></Link>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AuthCallback;
