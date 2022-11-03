import React from "react";
import { Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Loader from "src/components/UI/Loader/Loader";
import {RootState} from "src/store";

/***** logged user not access these   */
const ExcludeAuthRoute = (props) => {

	const { auth, authChecked } = useSelector((state: RootState)=>state.authState);
 
	if (!authChecked) {
		return <Loader />;
	}
	
	if (auth) {
		return <Navigate to={`/`}/>;
	}
	
	return props.children;
};

export default ExcludeAuthRoute;
