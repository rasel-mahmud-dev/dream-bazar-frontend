import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation, useNavigate, useOutletContext } from "react-router-dom";

import { Button, Spin, Popup } from "UI/index";
import { useDispatch, useSelector } from "react-redux";
import errorMessageCatch from "src/utills/errorMessageCatch";
import qs from "query-string";
import { InputGroup } from "UI/Form";
import apis, { backend } from "src/apis";
import { BsFacebook, BsGoogle } from "react-icons/all";
import { RootState } from "src/store";
import { registrationAction } from "actions/authAction";
import { Scope } from "store/types";
import SocialLogin from "components/SocialLogin/SocialLogin";
import ActionModal from "components/ActionModal/ActionModal";
import useHttpResponse from "src/hooks/useHttpResponse";

const Registration = (props) => {
    const {} = useSelector((state: RootState) => state);

    const { parentState, setParentState, handleChange } = useOutletContext<{
        parentState: any;
        setParentState: any;
        handleChange: () => void;
    }>();

    let { httpStatus, setHttpStatus, resetHttpStatus } = useHttpResponse();

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
        setHttpStatus( {isLoading: false, message: "", isSuccess: true});

        let isCompleted = true;
        let updatedUserData = { ...parentState.userData };

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

        setHttpStatus( {isLoading: true, message: ""});

        registrationAction(payload,  dispatch, function (data, errorMessage) {
            if (!errorMessage) {
                if (!errorMessage) {
                    location.state?.redirect && navigate(location.state?.redirect);
                }
            }
            setHttpStatus( {isLoading: false, message: ""});
        });
    }

    const [errorMessage, setErrorMessage] = React.useState({
        message: "",
        phone: "",
    });

    return (
        <div>
            <h1 className="card-title">Create an Account</h1>

            <ActionModal
                onClose={resetHttpStatus}
                className="!overflow-y-hidden"
                message={httpStatus.message}
                loading={httpStatus.isLoading}
                isSuccess={httpStatus.isSuccess}
                loadingTitle="Please wait your registered "
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
                <InputGroup state={parentState.userData} name="email" onChange={handleChange} placeholder="Enter Email" inputClass="input-group" />

                <InputGroup
                    state={parentState.userData}
                    name="password"
                    type="password"
                    onChange={handleChange}
                    placeholder="Enter password"
                    inputClass="input-group"
                />

                <p className="my-5 text-right text-link">
                    Already have an account? <Link to="/auth/join/login">login here</Link>
                </p>
                <button className="w-full bg-green-450 px-4 py-2 border-none text-white font-semibold text-lg rounded-xl">Create</button>
            </form>
            <p className="my-5 text-center text-neutral-600">Or sign in with</p>

            <SocialLogin className="mb-6" />
        </div>
    );
};

export default Registration;
