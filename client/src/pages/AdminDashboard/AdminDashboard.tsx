import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Dashboard.scss";
import { RootState } from "src/store";
import AdminNavigation from "pages/adminDashboard/components/adminNavigation/AdminNavigation";
import AdminSidebar from "./components/adminSidebar/AdminSidebar";
import { currentAuthAction } from "actions/authAction";
import { Scope } from "store/types";
import { Outlet } from "react-router-dom";

const AdminDashboard = (props) => {
	const dispatch = useDispatch();
	const {
		appState: { isOpenLeftBar },
		adminState: { admin },
	} = useSelector((state: RootState) => state);

	useEffect(() => {
		currentAuthAction(dispatch, Scope.ADMIN_DASHBOARD);
	}, []);

	return (
		<div className="">
			<AdminNavigation admin={admin} />
			<div className="container mx-auto">
				<div className="flex">
					<AdminSidebar isOpenLeftBar={isOpenLeftBar} auth={admin} />
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
