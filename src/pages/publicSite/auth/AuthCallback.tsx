import React, { useEffect } from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import { getApi } from "src/apis";
import {loginHandler, logoutAction} from "actions/authAction";
import { Scope } from "store/types";
import {useDispatch} from "react-redux";
import axios from "axios";
import Loader from "UI/Loader/Loader";

const AuthCallback = () => {
    
    const [searchParams, setParams] = useSearchParams()
    const params = useParams()
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //
    
    useEffect( () => {
        let token = searchParams.get("token")
        if (token) {
            localStorage.removeItem("token")
            getApi( token).get("/api/auth/current-auth").then(({data, status})=>{
                if (status === 200) {
                    logoutAction(dispatch)
                    loginHandler(data,  dispatch)
                    navigate("/", {replace: true})
                    localStorage.setItem("token", token)
                }
            }).catch(ex=>{
                navigate("/auth/join/login", {replace: true})
            })
        
        }
    
    }, [params.provider])
    
    return (
        <div className="my-20">
            <Loader className="flex justify-center" title="Please wait You are logged" />
     </div>
    );
};

export default AuthCallback;
