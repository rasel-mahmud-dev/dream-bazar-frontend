import React, { FC, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import qs from "query-string";
import apis, { backend } from "src/apis";

import { Button, Popup, Spin } from "components/UI";

import { connect, useDispatch } from "react-redux";
import { login } from "actions/authAction";

import { toggleLoader } from "actions/productAction";
import { toggleAppMask } from "actions/appAction";

import { InputGroup } from "UI/Form";
import errorMessageCatch from "src/utills/errorMessageCatch";
import { BsFacebook, BsGoogle } from "react-icons/all";
import useLanguage from "src/hooks/useLanguage";
import {AppContext} from "store/AppContext";

interface LoginPageProps {
    toggleLoader?: any;
    toggleAppMask?: any;
    loadingStates: any;
    cartState: any;
    login: any;
}

const Login: FC<LoginPageProps> = (props) => {
    let params = useParams();
    
    const [l] = useLanguage(AppContext)

    const location = useLocation();

    // let history = useHistory()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loadings, setLoading] = React.useState([]);

    const { loadingStates, cartState } = props;

    const [state, setState] = useState({
        httpResponse: "",
        httpStatus: 0,
        userData: {
            phone: { value: "", errorMessage: "" },
            email: { value: "", errorMessage: "" },
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
    
            let res = await apis.post("/api/auth/login", payload)
            if (res.status === 201) {
            	if (!res.data.auth) {
              
            		// return dispatch(toggleModal("get_otp_modal"))
              
            	} else {
            		// dispatch(toggleModal(""))
            		// dispatch(setAuth(res.data))
            	}
            }
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

    function getQs() {
        return qs.parse(location.search);
    }

    function handlePushBack() {
        // history.back()
        // history.goBack()
    }

    function handleProductAction(type, prod) {}

    // function handleSave(e) {
    // 	e.preventDefault()
    // 	let isNumber = Number(userData.email)
    // 	let state: any = {...userData}
    // 	let passDataBase = {}
    // 	if (isNumber) {
    // 		state = {
    // 			...state,
    // 			isNumber: true
    // 		}
    // 		passDataBase = {phone: state.email, password: state.password}
    // 	} else {
    // 		state = {
    // 			...state,
    // 			isNumber: false
    // 		}
    // 		passDataBase = {email: state.email, password: state.password}
    // 	}
    //
    //
    // 	setUserData({...state})
    //
    // 	props.toggleLoader("login-user", true)
    // 	props.toggleAppMask()
    //
    // 	props.login && props.login(passDataBase, (auth, error) => {
    // 		if (auth && auth._id) {
    // 			props.toggleLoader("login-user", false)
    // 			props.toggleAppMask(false)
    //
    // 			let redirectQs = getQs().redirect;
    //
    // 			if (redirectQs === "dashboard") {
    // 				let toPath = auth.role === "customer"
    // 					? `/customer/${auth.username}`
    // 					: `/auth/admin/dashboard`
    // 				navigate(toPath)
    // 			}
    // 		}
    //
    // 		// if(auth){
    // 		//   redirect(history, (redirectQs, done)=>{
    // 		//     // history.push(redirectQs)
    // 		//     // console.log(redirectQs, done)
    // 		//     // if(redirectQs === "dashboard"){
    // 		//     //   let toPath = auth.role === "customer"
    // 		//     //     ? `/customer/${auth.username}`
    // 		//     //     : `/auth/admin/dashboard`
    // 		//     //
    // 		//     //   done(toPath)
    // 		//     // } else if(redirectQs === "checkout"){
    // 		//     //   done(`/cart/checkout`)
    // 		//     // } else {
    // 		//     //   done(redirectQs)
    // 		//     // }
    // 		//   })
    // 		// } else {
    // 		//   console.log(error)
    // 		//   setErrorMessage({...error})
    // 		// }
    // 	})
    // }

    // function loadigHandler(){
    //   setLoading([true, true])
    //   setTimeout(()=>{
    //     setLoading([false, false])
    //   }, 2000)
    // }

    function onFinish() {}

    function onFinishFailed() {}

    function renderLoader(where) {
        let loadingState = loadingStates.find((ls) => ls.where === where);
        return (
            <div className="spin-fixed" style={{ top: "20vh" }}>
                {loadingState && loadingState.isLoading && (
                    <Spin size={20} borderWidth={4} theme="primary" />
                )}
            </div>
        );
    }

    return (
        <div>
            <h1 className="card-title">Login Here</h1>

            {renderLoader("login-user")}

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
                            type="text"
                            icon="fa fa-times"
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

            <div className="flex justify-between items-center gap-x-2">
                <button className="bg-red-500 px-4 py-2 border-none text-white font-semibold text-md rounded-xl">
                    <a
                        href={`${backend}/api/auth/google`}
                        className="flex items-center"
                    >
                        <BsGoogle className="mr-2 text-md" />
                        Login With Google
                    </a>
                </button>

                <button className="bg-facebook px-4 py-2 border-none text-white font-semibold text-md rounded-xl">
                    <a
                        href={`${backend}/api/auth/facebook`}
                        className="flex items-center"
                    >
                        <BsFacebook className="mr-2 text-md" />
                        Login With Facebook
                    </a>
                </button>
            </div>

            <p className="text-center mb-4 mt-6 dark:text-neutral-400">
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

function mapStateToProps(state) {
    return {
        authState: state.authState,
        loadingStates: state.productState.loadingStates,
    };
}

export default connect(mapStateToProps, {
    login,
    toggleLoader,
    toggleAppMask,
})(Login);
