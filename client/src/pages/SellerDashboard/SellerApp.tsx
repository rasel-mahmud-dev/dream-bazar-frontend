import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { currentAuthAction } from "actions/authAction";
import { RootState } from "src/store";
import { ACTION_TYPES, Scope } from "store/types";
import SellerNavigation from "pages/sellerDashboard/components/sellerNavigation/SellerNavigation";
import SellerSidebar from "pages/sellerDashboard/components/selllerSidebar/SellerSidebar";
import apis from "src/apis";
import PrivateRoute from "../../../middleware/PrivateRoute";

const SellerApp = () => {
	const dispatch = useDispatch();
	const {
		appState: { isOpenLeftBar },
		authState: { seller },
	} = useSelector((state: RootState) => state);

	useEffect(() => {
		// make auth fetch false because you visit seller dashboard site
		dispatch({
			type: ACTION_TYPES.RESET_AUTH_LOADING,
		});

		currentAuthAction(dispatch, Scope.SELLER_DASHBOARD);

		// fetch own shop
		if (seller) {
			apis.get("/api/shop")
				.then(({ data }) => {
					dispatch({
						type: ACTION_TYPES.FETCH_SELLER_SHOP,
						payload: data,
					});
				})
				.catch((ex) => {});
		}
	}, []);

	return (
		<div>
			<SellerNavigation seller={seller} />
			<div className="container mx-auto">
				<div className="flex ">
					<PrivateRoute scope={Scope.SELLER_DASHBOARD}>
						<SellerSidebar isOpenLeftBar={isOpenLeftBar} auth={seller} />
					</PrivateRoute>
					<div className="w-full ml-0 lg:ml-6">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
};

export default SellerApp;