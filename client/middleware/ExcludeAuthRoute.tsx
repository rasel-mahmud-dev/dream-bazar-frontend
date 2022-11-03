import React, { FC, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "src/components/UI/Loader/Loader";
import { RootState } from "src/store";
import { Scope } from "store/types";

interface Props {
	scope?: Scope;
	children: ReactElement | JSX.Element | any;
}



/***** logged user not access these   */
const ExcludeAuthRoute:FC<Props> = (props) => {
    
    const {scope} = props

	const authState = useSelector((state: RootState)=>state.authState);
 
	if (!authState.authChecked) {
		return <Loader />;
	}
	
    let homePath = scope === Scope.USER  ? '/' :  '/' + scope
    
	if (authState[scope]) {
		return <Navigate to={homePath}/>;
	}
	
	return props.children;
};

export default ExcludeAuthRoute;
