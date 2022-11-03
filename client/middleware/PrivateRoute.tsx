import React  from "react";
import { Navigate, useLocation } from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "src/store";
import Loader from "src/components/UI/Loader/Loader";



const PrivateRoute = (props) => {
    const location = useLocation();
    const { auth, authChecked } = useSelector((state: RootState)=>state.authState)
    
    if (!authChecked) {
        return <Loader />;
    }
    
    if (!auth) {
        return <Navigate to="/auth/join/login" state={{ from: location.pathname }} />;
    }
    
    return props.children;
};

export default PrivateRoute;
