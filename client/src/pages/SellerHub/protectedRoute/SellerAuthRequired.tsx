import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "src/store";
import {Navigate} from "react-router-dom";
import {Roles} from "store/types";

const SellerAuthRequired = (props) => {
    
    const { auth, authChecked } = useSelector((state: RootState) => state.authState )
    console.log(auth)
    if(!authChecked){
        return <h1>Loading</h1>
    } else if(authChecked && (!auth || !auth.roles.includes(Roles.SELLER))){
        return <Navigate to="/seller/login" />
    }
    
    return (
        <div>
            {props.children}
        </div>
    );
};

export default SellerAuthRequired