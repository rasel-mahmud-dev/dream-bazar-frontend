import {ACTION_TYPES, AuthType, Brand, OrderType} from "store/types";
import {Shop} from "reducers/authReducer";

/**
     Login user action type
 */
export interface LoginAction {
    type: ACTION_TYPES.LOGIN,
    payload: AuthType

}

/**
 Reset auth loading state
 */
export interface ResetAuthLoadingAction {
    type: ACTION_TYPES.RESET_AUTH_LOADING,
}


/**
 Fetch all seller orders
 */
export interface FetchOrdersAction {
    type: ACTION_TYPES.FETCH_ORDERS,
    payload: OrderType[]
}



/**
 Toggle product attribute section in product filter page on sidebar,
 */
export interface FetchShopAction {
    type: ACTION_TYPES.FETCH_SELLER_SHOP,
    payload: Shop
}




/**
 Fetch all stores for admin user
 */
export interface FetchStoresAction {
    type: ACTION_TYPES.FETCH_STORES,
    payload: Shop[]
}




/**
 Update shop info by seller
 */
export interface UpdateShopAction {
    type: ACTION_TYPES.UPDATE_SHOP_INFO,
    payload: Shop
}




export type AuthActionTypes = FetchShopAction | LoginAction | ResetAuthLoadingAction | FetchOrdersAction | FetchStoresAction | UpdateShopAction

