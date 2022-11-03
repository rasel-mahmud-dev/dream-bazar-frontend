import React, { FC, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import qs from "query-string";
import { backend } from "src/apis";

import { Button, Popup } from "UI/index";

import { useDispatch } from "react-redux";
import { loginAction } from "actions/authAction";
// import { toggleAppMask } from "actions/appAction";
//
import { InputGroup } from "UI/Form";
import errorMessageCatch from "src/utills/errorMessageCatch";
import { BsFacebook, BsGoogle } from "react-icons/all";
import useLanguage from "src/hooks/useLanguage";
import { Scope } from "store/types";
import SocialLogin from "components/SocialLogin/SocialLogin";

interface LoginPageProps {
	toggleLoader?: any;
	toggleAppMask?: any;
	loadingStates?: any;
	// cartState: any;
	login?: any;
	title: string;
}

const Login: FC<LoginPageProps> = (props) => {
    let params = useParams();
    
    const l = useLanguage()

    const location = useLocation();

    // let history = useHistory()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loadings, setLoading] = React.useState([]);

    const { title } = props;

    const [state, setState] = useState({
        httpResponse: "",
        httpStatus: 0,
        userData: {
            phone: { value: "", errorMessage: "" },
            email: { value: "rasel.mahmud.dev@gmail.com", errorMessage: "" },
            password: { value: "1", errorMessage: "" },
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
        
        
        try {
            setState({ ...state, httpResponse: "pending" });
            loginAction(payload, dispatch, Scope.USER, function (data, errorMessage){
                if(!errorMessage) {
                    location.state?.redirect && navigate(location.state?.redirect)
                }
            })
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

    const [errorMessage, setErrorMessage] = React.useState({
        message: "",
        phone: "",
    });
    
    return (
        <div>
            <h1 className="card-title">{title}</h1>

            {/*{renderLoader("login-user")}*/}

            {errorMessage.message && (
                <Popup
                    className="error_popup p-5"
                    style={{ width: "max-content" }}
                    inProp={true}
                >
                    <div className="d-flex">
                        <Button
                            onClick={() =>
                                setErrorMessage({ phone: "", message: "" })
                            }
     
                        />
                        <h4>{errorMessage.message}</h4>
                    </div>
                </Popup>
            )}

            <form onSubmit={loginHandler}>
                <InputGroup
                    state={state.userData}
                    name="email"
                    onChange={handleChange}
                    placeholder={l('Enter Email')}
                    inputClass="input-group"
                />
                
                <InputGroup
                    state={state.userData}
                    name="password"
                    type="password"
                    onChange={handleChange}
                    placeholder={l('Enter Password')}
                    inputClass="input-group"
                />

                <p className="my-5 text-right text-link">
                    {l('Forget password')} ?{" "}
                    <Link to="/auth/join/forget-password?action=reset-password">
                        {l('reset password')}
                    </Link>{" "}
                </p>
                <button className="w-full bg-green-450 px-4 py-2 border-none text-white font-semibold text-lg rounded-xl">
                    {l('Login')}
                </button>
            </form>
            <p className="my-5 text-center text-neutral-600">Or sign in with</p>

            <SocialLogin />

            <p className="text-center  mb-4 mt-6 dark:text-neutral-400">
                {l('Not a member')}?
                <Link
                    to="/auth/join/registration"
                    className="font-medium !text-green-500 text-link "
                >
                    { l('Sign up now')}
                </Link>
            </p>
        </div>
    );
};


export default Login
