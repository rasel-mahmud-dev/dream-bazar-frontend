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
    const { auth, authChecked } = useSelector((state: RootState)=>state.authState)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(()=>{

        if(!(auth && authChecked)){
            currentAuthAction(dispatch,  (errorMessage, user)=>{

                if(!user.roles.includes(scope)){
                    navigate("/")
                }

                // if(errorMessage || !user.roles.includes(Scope.ADMIN_USER)){
                //     // if somehow this user not admin or fail fetch current user then redirect home page
                //     navigate("/")
                // } else if(errorMessage || !user.roles.includes(Scope.SELLER_USER)){
                //     // if somehow this user not admin or fail fetch current user then redirect home page
                //     navigate("/")
                // }
            });
        }

    }, [])
    
    if (!authChecked) {
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
