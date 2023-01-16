import {ACTION_TYPES, OrderType, Profile} from "store/types/index";
import {ShippingAddress, Shop} from "reducers/authReducer";

/**
 Fetch Current User profile
 */
export interface FetchCurrentUserProfileAction {
    type: ACTION_TYPES.FETCH_CURRENT_USER_PROFILE,
    payload: Profile
}


/**
 Update customer profile
 */
export interface UpdateCustomerProfileAction {
    type: ACTION_TYPES.UPDATE_CUSTOMER_PROFILE,
    payload: Profile
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
 Fetch all stores for admin userActionTypes.ts
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




/**
 Fetch all shipping addresses
 */
export interface FetchAllShippingAddressesAction {
    type: ACTION_TYPES.FETCH_SHIPPING_ADDRESSES,
    payload: ShippingAddress[]
}

/**
 Add new Shipping address
 */
export interface AddShippingAddressAction {
    type: ACTION_TYPES.ADD_SHIPPING_ADDRESS,
    payload: ShippingAddress
}



export type UserActionTypes  =  FetchCurrentUserProfileAction| UpdateCustomerProfileAction | FetchShopAction | FetchOrdersAction | FetchStoresAction | UpdateShopAction | FetchAllShippingAddressesAction |  AddShippingAddressAction

