import React, {useEffect, useState} from "react";
import {
    useParams,
    Link,
    useLocation,
    useNavigate,
    useOutletContext,
} from "react-router-dom";
import { Button, Spin, Popup } from "UI/index";
import { useDispatch, useSelector } from "react-redux";
import errorMessageCatch from "src/utills/errorMessageCatch";
import qs from "query-string";
import { InputGroup } from "UI/Form";
import apis, { backend } from "src/apis";
import { BsFacebook, BsGoogle } from "react-icons/all";
import { RootState } from "src/store";
import ResponseMessage from "UI/ResponseMessage";
import {registrationAction} from "actions/authAction";
import scrollTo from "src/utills/scrollTo";
import {Scope} from "store/types";

const Registration = (props) => {
    const {} = useSelector((state: RootState) => state);

    const { parentState, setParentState, handleChange } = useOutletContext<{
        parentState: any;
        setParentState: any;
        handleChange: any;
    }>();

    let params = useParams();

    const location = useLocation();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const [loadings, setLoading] = React.useState([]);

    const { loadingStates, cartState } = props;

    const [state, setState] = useState({
        httpResponse: "",
        httpStatus: 0,
    });

    async function submitHandler(e) {
        e.preventDefault();
    
        let isCompleted = true;
        let updatedUserData = {...parentState.userData};
    
        let loginData = {
            firstName: updatedUserData.firstName,
            lastName: updatedUserData.lastName,
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
            setParentState({
                ...parentState,
                userData: updatedUserData,
            });
            return;
        }
        setParentState({...parentState, httpResponse: "pending"});
        registrationAction(dispatch, Scope.USER, payload,  function (data, errorMessage){
            if(!errorMessage) {
                navigate("/")
            }
        })
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

    // function renderLoader(where) {
    //   let loadingState = loadingStates.find((ls) => ls.where === where);
    //   return (
    //       <div className="spin-fixed" style={{ top: "20vh" }}>
    //               {loadingState && loadingState.isLoading && (
    //                   <Spin size={20} borderWidth={4} theme="primary" />
    //               )}
    //           </div>
    //   );
    // }

    return (
        <div>
            <h1 className="card-title">Create an Account</h1>

            {/*{renderLoader("login-user")}*/}

            <ResponseMessage
                className="my-2"
                message={parentState.httpResponse}
                statusCode={parentState.httpStatus}
            />

            <form onSubmit={submitHandler}>
                <InputGroup
                    state={parentState.userData}
                    name="firstName"
                    onChange={handleChange}
                    placeholder="Enter firstName"
                    inputClass="input-group"
                />
                <InputGroup
                    state={parentState.userData}
                    name="lastName"
                    onChange={handleChange}
                    placeholder="Enter lastName"
                    inputClass="input-group"
                />
                <InputGroup
                    state={parentState.userData}
                    name="email"
                    onChange={handleChange}
                    placeholder="Enter Email"
                    inputClass="input-group"
                />

                <InputGroup
                    state={parentState.userData}
                    name="password"
                    type="password"
                    onChange={handleChange}
                    placeholder="Enter password"
                    inputClass="input-group"
                />

                <p className="my-5 text-right text-link">
                    Already have an account?{" "}
                    <Link to="/auth/join/login">login here</Link>
                </p>
                <button className="w-full bg-green-450 px-4 py-2 border-none text-white font-semibold text-lg rounded-xl">
                    Create
                </button>
            </form>
            <p className="my-5 text-center text-neutral-600">Or sign in with</p>

            <div className="flex justify-between items-center gap-x-2 mb-6">
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
        </div>
    );
};

export default Registration;
