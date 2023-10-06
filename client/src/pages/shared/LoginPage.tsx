import React, {FC, useState} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";

import {useDispatch} from "react-redux";
import {loginAction} from "actions/authAction";
// import { toggleAppMask } from "actions/appAction";
import {InputGroup} from "UI/Form";
import useLanguage from "src/hooks/useLanguage";
import SocialLogin from "components/SocialLogin/SocialLogin";
import HttpResponse from "components/HttpResponse/HttpResponse";
import Divider from "UI/Divider/Divider";

import "./loginPage.scss"
import {Button} from "UI/index";

interface LoginPageProps {
    toggleLoader?: any;
    toggleAppMask?: any;
    loadingStates?: any;
    // cartState: any;
    login?: any
}

const LoginPage: FC<LoginPageProps> = (props) => {
    let params = useParams();

    const l = useLanguage();

    const location = useLocation();

    // let history = useHistory()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [httpResponse, setHttpResponse] = useState({
        isSuccess: false,
        message: "",
        loading: false,
    });

    const [state, setState] = useState({
        httpResponse: "",
        httpStatus: 0,
        userData: {
            phone: {value: "", errorMessage: ""},
            email: {value: "rasel.mahmud.dev@gmail.com", errorMessage: ""},
            password: {value: "1", errorMessage: ""},
            remember: {value: "", errorMessage: ""},
        },
    });

    async function loginHandler(e) {

        e.preventDefault();
        setHttpResponse(p => ({...p, loading: false, message: ""}));
        let isCompleted = true;
        let updatedUserData = {...state.userData};

        let loginData = {
            email: updatedUserData.email,
            password: updatedUserData.password,
        };
        let payload = {};

        for (let key in loginData) {
            if (!updatedUserData[key].value) {
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


        setHttpResponse(p => ({...p, loading: true,}));
        loginAction(payload, dispatch, function (data, errorMessage) {
            if (!errorMessage) {
                location.state?.redirect && navigate(location.state?.redirect);
            } else {
                setHttpResponse({loading: false, isSuccess: false, message: errorMessage});
            }
        });

    }

    function handleChange(e) {
        const {name, value} = e.target;
        let updateUserData = {...state.userData};

        updateUserData = {
            ...updateUserData,
            [name]: {
                ...updateUserData[name],
                value: value,
                tauch: true,
                errorMessage: updateUserData[name] ? "" : updateUserData[name].errorMessage,
            },
        };

        setState({
            ...state,
            userData: updateUserData,
        });
    }


    return (
        <div className="login-page">

            <div className="login-header">
                <img src={"/icons/lock.svg"} alt=""/>
            </div>

            <h1 className=" uppercase text-center text-3xl font-extrabold mt-6 dark:text-dark-10 text-dark-700">Login</h1>

            <HttpResponse state={httpResponse}/>

            <form onSubmit={loginHandler} className="p-4">
                <InputGroup
                    state={state.userData}
                    name="email"
                    inputClass="bg-input-group"
                    onChange={handleChange}
                    placeholder={l("Enter Email")}
                />
                <InputGroup
                    inputClass="bg-input-group"
                    state={state.userData}
                    name="password"
                    type="password"
                    onChange={handleChange}
                    placeholder={l("Enter Password")}
                />

                <p className="my-5 text-right text-link">
                    {l("Forget password")} ? <Link to="/customer/join/forget-password?action=reset-password">{l("reset password")}</Link>{" "}
                </p>
                <Button className="w-full !py-2.5 !shadow-xs" color="primary" theme="primary">{l("Login")}</Button>
            </form>

            <div className="px-3">
                <Divider text="OR"/>
            </div>

            <div className="px-3">
                <SocialLogin/>
            </div>

            <p className="text-center  mb-4 mt-6 dark:text-neutral-400">
                {l("Not a member")}?
                <Link to="/join/signup" className="font-medium !text-green-500 text-link ">
                    {l("Sign up now")}
                </Link>
            </p>
        </div>
    );
};

export default LoginPage;
