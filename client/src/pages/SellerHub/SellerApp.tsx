import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { currentAuthAction } from "actions/authAction";
import { RootState } from "src/store";
import {ACTION_TYPES, Scope} from "store/types";
import SellerAuthRequired from "pages/SellerHub/protectedRoute/SellerAuthRequired";
import SellerNavigation from "pages/SellerHub/components/sellerNavigation/SellerNavigation";
import SellerSidebar from "pages/SellerHub/components/selllerSidebar/SellerSidebar";
import apis from "src/apis";

const SellerApp = () => {
	const dispatch = useDispatch();
	const {
		appState: { isOpenLeftBar },
		sellerState: { seller },
	} = useSelector((state: RootState) => state);

	useEffect(() => {
		currentAuthAction(dispatch, Scope.SELLER_DASHBOARD);
        
        
        // fetch own shop
        apis.get("/api/shop").then(({data})=>{
            dispatch({
                type: ACTION_TYPES.FETCH_SELLER_SHOP,
                payload: data
            })
        }).catch(ex=>{
        })
        
        
	}, []);

	return (
		<div>
			<SellerNavigation seller={seller} />
			<div className="container mx-auto">
				<div className="flex ">
					<SellerAuthRequired>

					    <SellerSidebar isOpenLeftBar={isOpenLeftBar} auth={seller} />

					</SellerAuthRequired>
					<div className="w-full ml-0 lg:ml-6">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
};

export default SellerApp;