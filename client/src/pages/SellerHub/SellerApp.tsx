import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import SellerNavigation from "pages/SellerHub/components/sellerNavigation/SellerNavigation";
import { useDispatch, useSelector } from "react-redux";
import { currentAuthAction } from "actions/authAction";
import { RootState } from "src/store";
import SellerSidebar from "pages/SellerHub/components/selllerSidebar/SellerSidebar";

const SellerApp = () => {
	const dispatch = useDispatch();
	const {
		appState: { isOpenLeftBar },
		authState: { auth },
	} = useSelector((state: RootState) => state);

	useEffect(() => {
		currentAuthAction(dispatch);
	}, []);

	return (
		<div>
			<SellerNavigation auth={auth} />
			<div className="container mx-auto">
				<div className="flex ">
					{/*<SellerAuthRequired>*/}

					<SellerSidebar isOpenLeftBar={isOpenLeftBar} auth={auth} />

					{/*</SellerAuthRequired>*/}
					<div className="w-full ml-0 lg:ml-6">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
};

export default SellerApp;