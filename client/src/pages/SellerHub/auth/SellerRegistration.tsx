import React from 'react';
import Login from "pages/auth/Login";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {RootState} from "src/store";

const SellerLogin = (props) => {
    
    const {auth} = useSelector((state: RootState)=>state.authState)
    
    if(auth){
        return  <Navigate to={"/seller/dashboard"} />
    }
    
    return (
        <div className="max-w-xl mx-auto py-10 container">
           <Login title="Seller Login" />
        </div>
    );
};

export default SellerLogin;