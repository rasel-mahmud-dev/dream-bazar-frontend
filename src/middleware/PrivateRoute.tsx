import React, {Component, FC, ReactElement, ReactNode} from "react";
import { Navigate, useLocation } from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "src/store";
import Loader from "UI/Loader/Loader";
import { Scope} from "store/types";


interface Props {
    scope?: Scope
    children: ReactElement | JSX.Element | any
}

const PrivateRoute: FC<Props> = (props) => {
    const location = useLocation();
    const {scope} = props
    
    const { auth, authChecked } = useSelector((state: RootState)=>state.authState)
    
    
    if (!authChecked) {
        return <Loader className="flex justify-center mt-36" />;
    }
    
    if (!auth) {
        return <Navigate to={`/${scope.toLowerCase()}/join/login`} state={{ from: location.pathname }} />;
    }
    
    
    if(!auth?.roles?.includes(scope as any)){
        return <Navigate to={`/${scope.toLowerCase()}/join/login`} state={{ from: location.pathname }} />;
    }

    return props.children;
};

export default PrivateRoute;
