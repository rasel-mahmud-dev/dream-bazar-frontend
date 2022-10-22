import React, {useEffect} from 'react';
import {Outlet} from "react-router-dom";
import SellerNavigation from "pages/SellerHub/components/sellerNavigation/SellerNavigation";
import {useDispatch, useSelector} from "react-redux";
import {currentAuthAction} from "actions/authAction";
import Sidebar from "components/sidebar/Sidebar";
import {toggleLeftSidebarAction} from "actions/appAction";
import {RootState} from "src/store";

const SellerApp = () => {
    
    const dispatch  = useDispatch();
    const { isOpenLeftBar }  = useSelector((state: RootState)=>state.appState)
    
    useEffect(()=>{
        currentAuthAction(dispatch)
    }, [])
    
    function toggleSidebar(){
        toggleLeftSidebarAction(dispatch)
    }
    
    return (
        <div>
            <SellerNavigation />
            <div className="flex ">
                <Sidebar isOpen={isOpenLeftBar} onClickOnBackdrop={toggleSidebar}>
                    <div>
                        <h1 className="heading-3">Dashboard</h1>
                    </div>
                    
                </Sidebar>
                <div className="w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default SellerApp;