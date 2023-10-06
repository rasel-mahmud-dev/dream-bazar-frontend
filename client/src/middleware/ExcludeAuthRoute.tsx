import React, { FC, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "UI/Loader/Loader";
import { RootState } from "src/store";
import { Scope } from "store/types";

interface Props {
	scope?: Scope;
	children: ReactElement | JSX.Element | any;
}



/***** logged userActionTypes.ts not access these   */
const ExcludeAuthRoute:FC<Props> = (props) => {
    
    // const {scope} = props
    //
	// const {auth, authLoaded} = useSelector((state: RootState)=>state.authState);
    //
	// if (!authLoaded) {
    //     return <Loader className="flex justify-center mt-36"/>;
    // }
    //
    // let homePath =   '/'
    //
	// if (auth) {
	// 	return <Navigate to={homePath}/>;
	// }

	return props.children;
};

export default ExcludeAuthRoute;
