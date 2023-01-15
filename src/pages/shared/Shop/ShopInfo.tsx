import React, {useEffect} from "react";
import Card from "UI/Form/Card/Card";
import {Button} from "UI/index";
import staticImagePath from "src/utills/staticImagePath";
import {Link} from "react-router-dom";
import {CiShop} from "react-icons/all";
import {Roles} from "store/types";
import useAppSelector from "src/hooks/useAppSelector";
import {fetchShopInfo, updateStoreActiveStatusAction} from "actions/authAction";
import useAppDispatch from "src/hooks/useAppDispatch";
import Switch from "UI/Form/switch/Switch";
import "./style.scss";
import useScrollTop from "src/hooks/useScrollTop";

const ShopInfo = () => {
    useScrollTop()
    
    const {authState: { auth, shop }} = useAppSelector(state=> state)
    
    const dispatch = useAppDispatch()
    
    useEffect(()=>{
        dispatch(fetchShopInfo())
    }, [])


    function handleToggleStoreStatus() {
        dispatch(updateStoreActiveStatusAction(!shop?.isActive))
    }

    return (
		<div>
			<div className="my-6 flex items-center justify-between">
				<h1 className="heading-2 flex items-center gap-x-1">
					<CiShop />
					Shop Info
				</h1>

			</div>

			{shop ? (
				<Card>
					<>
						<div className="shop-banner">
							<img className="w-full" src={shop.shopBanner} alt="" />
                            <img src={staticImagePath(shop.shopLogo)} className="shop-logo rounded-full w-32" alt="" />
						</div>
						<h3 className="heading-4">My shop Info</h3>
						<div className="flex items-center gap-x-4 mt-4">

							<div className="flex flex-col gap-y-2">
								<h4 className="heading-5">Name : {shop.shopName}</h4>
								<p>Phone : {shop?.shopPhone}</p>
								<p>Address : <span className="break-all">{shop.shopAddress}</span></p>

                                <div className="flex  gap-x-2">
                                    <p>Status:</p>
                                    <Switch name="isActive" on={shop.isActive} onChange={handleToggleStoreStatus} />
                                </div>
                                <div className="flex  gap-x-2">
                                    <p>Admin Approve:</p>
                                    <Switch name="isApproved" on={shop.isApproved}  />
                                </div>

                                <div className="flex  gap-x-2">
                                    <p>Suspense By Admin:</p>
                                    <Switch name="isSuspense" on={shop.isSuspense} />
                                </div>

								<Link to={`/${ auth?.roles?.includes(Roles.ADMIN) ?  "admin" : "seller" }/shop/edit`}>
									<Button className="bg-green-450 mt-4">Edit</Button>
								</Link>
							</div>
						</div>{" "}
					</>
				</Card>
			): (
                <div className="flex items-center justify-center pt-32">
                    <div>
                        <h4 className="heading-3">No Store Create You </h4>
                        <Link to={`${auth?.roles?.includes(Roles.ADMIN) ? "/admin/shop/new" : "/seller/shop/new"}`}>
                            <Button className="mx-auto mt-4" theme="primary">Create a Shop</Button>
                        </Link>
                    </div>
                </div>
            )}
		</div>
	);
};

export default ShopInfo;