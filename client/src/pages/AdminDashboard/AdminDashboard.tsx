import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Dashboard.scss";
import { RootState } from "src/store";
import AdminNavigation from "pages/adminDashboard/components/adminNavigation/AdminNavigation";
import AdminSidebar from "./components/adminSidebar/AdminSidebar";
import { currentAuthAction } from "actions/authAction";
import {ACTION_TYPES, Scope} from "store/types";
import {Outlet, useNavigate} from "react-router-dom";

const AdminDashboard = () => {
	const dispatch = useDispatch();
	const {
		appState: { isOpenLeftBar },
		authState: { auth },
	} = useSelector((state: RootState) => state);
    
    const navigate = useNavigate()
    
    const [isAdmin, setAdmin] = useState(false)
    

	useEffect(() => {
        
        // make auth fetch false because you visit admin dashboard site
        dispatch({
            type: ACTION_TYPES.RESET_AUTH_LOADING
        })
        
        currentAuthAction(dispatch, Scope.ADMIN_USER, (errorMessage, user)=>{
            if(errorMessage || !user.roles.includes(Scope.ADMIN_USER)){
                navigate("/admin/join/login")
                setAdmin(false)
            } else {
                setAdmin(true)
            }
        });
        
	}, []);

	return (
		<div className="">
			<AdminNavigation admin={isAdmin && auth} />
			<div className="container mx-auto">
				<div className="flex">
					<AdminSidebar isOpenLeftBar={isOpenLeftBar} auth={isAdmin && auth} />
					<div className="w-full ml-0 lg:ml-6">
						<Outlet />
					</div>
				</div>
			</div>
			<footer className="bg-green-800 text-center text-white py-10">@Rasel Mahmud</footer>
		</div>
	);
};


export default AdminDashboard
