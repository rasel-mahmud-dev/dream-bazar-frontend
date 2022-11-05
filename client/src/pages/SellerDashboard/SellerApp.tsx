import React, {useEffect, useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { currentAuthAction } from "actions/authAction";
import { RootState } from "src/store";
import { ACTION_TYPES, Scope } from "store/types";
import SellerNavigation from "pages/sellerDashboard/components/sellerNavigation/SellerNavigation";
import SellerSidebar from "pages/sellerDashboard/components/selllerSidebar/SellerSidebar";
import apis from "src/apis";
import PrivateRoute from "../../middleware/PrivateRoute";

const SellerApp = () => {
	const dispatch = useDispatch();
	const {
		appState: { isOpenLeftBar },
		authState: { auth },
	} = useSelector((state: RootState) => state);
    
    const navigate = useNavigate()
    
    const [isSeller, setSeller] = useState(false)
    

	useEffect(() => {
		// make auth fetch false because you visit seller dashboard site
		dispatch({
			type: ACTION_TYPES.RESET_AUTH_LOADING,
		});

		currentAuthAction(dispatch, Scope.SELLER_USER, (errorMessage, user)=>{
            if(errorMessage || !user.roles.includes(Scope.SELLER_USER)){
                navigate("/seller/join/login")
                setSeller(false)
            } else {
                setSeller(true)
            }
        })
	}, []);
 
    useEffect(()=>{
        // fetch own shop
        if (auth) {
            apis.get("/api/seller/shop")
            .then(({ data }) => {
                dispatch({
                    type: ACTION_TYPES.FETCH_SELLER_SHOP,
                    payload: data,
                });
            })
            .catch((ex) => {});
        }
    }, [auth])
    
 
	return (
		<div>
			<SellerNavigation seller={isSeller && auth} />
			<div className="container mx-auto">
				<div className="flex ">
					{/*<PrivateRoute scope={Scope.SELLER_USER}>*/}
						<SellerSidebar isOpenLeftBar={isOpenLeftBar} auth={isSeller && auth} />
					{/*</PrivateRoute>*/}
					<div className="w-full ml-0 lg:ml-6">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
};

export default SellerApp;