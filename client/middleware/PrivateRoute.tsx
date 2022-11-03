import React, {Component, FC, ReactElement, ReactNode} from "react";
import { Navigate, useLocation } from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "src/store";
import Loader from "src/components/UI/Loader/Loader";
import {Scope} from "store/types";


interface Props {
    scope?: Scope
    children: ReactElement | JSX.Element | any
}

const PrivateRoute: FC<Props> = (props) => {
    const location = useLocation();
    const {scope} = props
    
    
    const { authState } = useSelector((state: RootState)=>state)
    
    if (!authState.authChecked) {
        return <Loader className="flex justify-center mt-20" />;
    }
    if (!authState[scope]) {
        return <Navigate to={`/${scope}/join/login`} state={{ from: location.pathname }} />;
    }
    
    return props.children;
};

export default PrivateRoute;
