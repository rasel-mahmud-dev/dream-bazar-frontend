import React, {useState} from "react";
import {Link, useLocation, useNavigate, useOutletContext, useParams} from "react-router-dom";

import {Button} from "UI/index";
import {useDispatch, useSelector} from "react-redux";
import {InputGroup} from "UI/Form";
import {RootState} from "src/store";
import {loginAction, registrationAction} from "actions/authAction";
import SocialLogin from "components/SocialLogin/SocialLogin";
import ActionModal from "components/ActionModal/ActionModal";
import useHttpResponse from "src/hooks/useHttpResponse";

import "./loginPage.scss"
import useLanguage from "src/hooks/useLanguage";
import Divider from "UI/Divider/Divider";


const Registration = (props) => {
    const {} = useSelector((state: RootState) => state);
    const l = useLanguage();
    const {parentState, setParentState, handleChange} = useOutletContext<{
        parentState: any;
        setParentState: any;
        handleChange: () => void;
    }>();

    let {httpStatus, setHttpStatus, resetHttpStatus} = useHttpResponse();

    let params = useParams();

    const location = useLocation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loadings, setLoading] = React.useState([]);

    const {loadingStates, cartState} = props;

    const [state, setState] = useState({
        httpResponse: "",
        httpStatus: 0,
    });

    async function submitHandler(e) {
        e.preventDefault();
        setHttpStatus({isLoading: false, message: "", isSuccess: true});

        const l = useLanguage()

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

        setHttpStatus({isLoading: true, message: ""});

        dispatch(registrationAction({
            email: loginData.email.value,
            password: loginData.password.value,
            firstName: loginData.firstName.value,
            lastName: loginData.lastName.value,
        })).unwrap().then(() => {
            location.state?.redirect && navigate(location.state?.redirect);
        }).catch(ex => {
            setHttpStatus({isLoading: false, message: ex});
        }).finally(() => {
            setHttpStatus({isLoading: false, message: ""});
        })
    }

    const [errorMessage, setErrorMessage] = React.useState({
        message: "",
        phone: "",
    });

    return (
        <div className="login-page">


            <div className="login-header">
                <img src={"/icons/lock.svg"} alt=""/>
            </div>

            <h1 className=" uppercase text-center text-3xl font-extrabold mt-6 dark:text-dark-10 text-dark-700">Create an Account</h1>


            <ActionModal
                onClose={resetHttpStatus}
                className="!overflow-y-hidden"
                message={httpStatus.message}
                loading={httpStatus.isLoading}
                isSuccess={httpStatus.isSuccess}
                loadingTitle="Please wait your registered "
            />

            <form onSubmit={submitHandler} className="p-4">
                <InputGroup
                    inputClass="bg-input-group"
                    state={parentState.userData}
                    name="firstName"
                    onChange={handleChange}
                    placeholder="Enter firstName"
                />
                <InputGroup
                    inputClass="bg-input-group"
                    state={parentState.userData}
                    name="lastName"
                    onChange={handleChange}
                    placeholder="Enter lastName"
                />
                <InputGroup inputClass="bg-input-group" state={parentState.userData} name="email" onChange={handleChange} placeholder="Enter Email"/>

                <InputGroup
                    state={parentState.userData}
                    inputClass="bg-input-group"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    placeholder="Enter password"
                />

                <p className="my-5 text-right text-link">
                    Already have an account? <Link to="/join/login">login here</Link>
                </p>


                <Button className="w-full !py-2.5 !shadow-xs" color="primary" theme="primary">{l("Register")}</Button>

            </form>

            <div className="px-3">
                <Divider text="OR"/>
            </div>


            <div className="p-3">
                <SocialLogin className="mb-6"/>
            </div>
        </div>
    );
};

export default Registration;
