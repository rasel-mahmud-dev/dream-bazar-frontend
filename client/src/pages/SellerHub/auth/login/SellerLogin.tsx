import React from 'react';
import Login from "pages/auth/Login";
import {useParams} from "react-router-dom";

const SellerLogin = (props) => {
    
    const params = useParams();
    
    console.log(params, props)
    
    return (
        <div className="max-w-xl mx-auto py-10 container">
           <Login title="Seller Login" />
        </div>
    );
};

export default SellerLogin;