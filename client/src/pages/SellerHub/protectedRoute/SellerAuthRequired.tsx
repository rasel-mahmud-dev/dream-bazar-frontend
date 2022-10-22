import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import {Navigate, useLocation} from "react-router-dom";
import { Roles } from "store/types";

const SellerAuthRequired = (props) => {
	const { auth, authChecked } = useSelector(
		(state: RootState) => state.authState
	);
    
    const location = useLocation();
    
	if (!authChecked) {
		return <h1>Loading</h1>;
	} else if (authChecked && (!auth || !auth.roles.includes(Roles.SELLER))) {
		return <Navigate to="/seller/login" state={{redirect: location.pathname}} />;
	}

	return <div>{props.children}</div>;
};

export default SellerAuthRequired;
