import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import "./style.scss";
import { CgHome } from "react-icons/all";
import scrollTo from "src/utills/scrollTo";

function JoinHome() {
	const location = useLocation();

	const [state, setState] = useState({
		userData: {
			firstName: { value: "", errorMessage: "" },
			lastName: { value: "", errorMessage: "" },
			email: { value: "", errorMessage: "" },
			password: { value: "", errorMessage: "" },
			confirmPassword: { value: "", errorMessage: "" },
			gender: { value: "", errorMessage: "" },
			otpCode: { value: "", errorMessage: "" },
			result: { value: "", errorMessage: "" },
		},
		verifyFor: "newAccount", // newAcc, resetPassword
		httpResponse: "",
		httpStatus: 200,
	});

	function handleResetUserData(resetProps = {}) {
		let updateUserData = { ...state.userData };
		for (let key in updateUserData) {
			updateUserData[key] = {
				...updateUserData[key],
				value: "",
				errorMessage: "",
				tauch: false,
			};
		}
		setState({
			...state,
			userData: updateUserData,
			...resetProps,
		});
	}

	function handleChange(e) {
		const { name, value } = e.target;
		let updateUserData = { ...state.userData };

		updateUserData = {
			...updateUserData,
			[name]: {
				...updateUserData[name],
				value: value,
				errorMessage: updateUserData[name] ? "" : updateUserData[name].errorMessage,
			},
		};

		setState({
			...state,
			userData: updateUserData,
		});
	}

	// scroll top for all auth component
	useEffect(() => {
		scrollTo(0);
	}, [location.pathname]);

	return (
		<div>
			<div className="auth-card-container">
				<div className="auth-card">
					<Outlet context={{ parentState: state, setParentState: setState, handleChange }} />
					<Link className="flex items-center justify-center text-link font-medium" to="/">
						<CgHome className="mr-1" />
						Go Home
					</Link>
				</div>
			</div>
		</div>
	);
}

export default JoinHome;
