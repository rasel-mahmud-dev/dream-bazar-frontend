import React, { FC, ReactElement, useEffect } from "react";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "src/store";
import Loader from "UI/Loader/Loader";
import { Scope } from "store/types";
import {currentAuthAction} from "actions/authAction";

interface Props {
    scope?: Scope;
    children: ReactElement | JSX.Element | any;
}

const PrivateRoute: FC<Props> = (props) => {
    const location = useLocation();
    const {scope} = props
    const { auth, authLoaded } = useSelector((state: RootState)=>state.authState)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(()=>{

        if(!(auth && authLoaded)){
            // currentAuthAction(dispatch,  (errorMessage, user)=>{
            //
            //     if(!user.roles.includes(scope)){
            //         navigate("/")
            //     }
            //
            //     // if(errorMessage || !userActionTypes.ts.roles.includes(Scope.ADMIN_USER)){
            //     //     // if somehow this userActionTypes.ts not admin or fail fetch current userActionTypes.ts then redirect home page
            //     //     navigate("/")
            //     // } else if(errorMessage || !userActionTypes.ts.roles.includes(Scope.SELLER_USER)){
            //     //     // if somehow this userActionTypes.ts not admin or fail fetch current userActionTypes.ts then redirect home page
            //     //     navigate("/")
            //     // }
            // });
        }

    }, [])
    
    if (!authLoaded) {
        return <Loader className="flex justify-center mt-36" />;
    }
    
    if (!auth) {
        return <Navigate to={`/join/login`} state={{ from: location.pathname }} />;
    }
    
    if(!auth?.roles?.includes(scope as any)){
        return <Navigate to={`/join/login`} state={{ from: location.pathname }} />;
    }

    return props.children;
};

export default PrivateRoute;
