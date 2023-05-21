import {ACTION_TYPES, AdminType, AuthType, OrderType, Profile} from "store/types";
import {AuthActionTypes} from "store/types/authActionTypes";
import {ProductType} from "reducers/productSlice";

export interface StoreType {
    _id?: string;
    firstName: string;
    lastName?: string;
    email: string;
    phone: string;
    password?: string;
    avatar?: string;
    isActive?: boolean;
    isSuspense?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}



export interface Shop {
    _id?:  string
    sellerId?: string
    shopName: string
    shopEmail: string
    shopAddress: string
    shopLogo: string
    shopBanner?: string
    shopPhone: string
    isActive: boolean
    isSuspense?: boolean
    isApproved: boolean
    createdAt?: Date
    updatedAt?: Date
    products?: ProductType[]


}

interface AuthStateType {
    authChecked: boolean;
    auth: AuthType | null;
    orders: OrderType[];
    shop: Shop | null
    stores?: Shop[]
    shippingAddresses: ShippingAddress[]
    profile: Profile | null
}

export interface ShippingAddress  {
    _id?: string
    customerId: string
    firstName: string,
    lastName: string,
    phone: number
    zipCode: number
    city: string
    state: string
    address: string
    apartmentSuit: string
    country?: string
    email: string
    createdAt?: Date
    isDefault: boolean
}


const initialState: AuthStateType = {
    authChecked: false,
    auth: null,
    orders: null as unknown as OrderType[],
    shop: null,
    stores: [],
    shippingAddresses: [],
    profile: null
};

const authReducer = (state = initialState, action: AuthActionTypes) => {
    let updatedState = { ...state };

    switch (action.type) {

        case ACTION_TYPES.LOGIN:
            updatedState.auth = action.payload;
            updatedState.authChecked = true;
            return updatedState;

        case ACTION_TYPES.RESET_AUTH_LOADING:
            updatedState.authChecked = false;
            return updatedState;


        case ACTION_TYPES.FETCH_CURRENT_USER_PROFILE:
            updatedState.profile = action.payload;
            return updatedState;

        case ACTION_TYPES.UPDATE_CUSTOMER_PROFILE:
            updatedState.profile = {
                ...updatedState.profile,
                ...action.payload
            }
            return updatedState;


        case ACTION_TYPES.FETCH_ORDERS:
            updatedState.orders = action.payload;
            return updatedState;



        case ACTION_TYPES.FETCH_STORES:
            updatedState.stores = action.payload;
            return updatedState;



        case ACTION_TYPES.FETCH_SELLER_SHOP:
            updatedState.shop = action.payload;
            return updatedState;


        case ACTION_TYPES.FETCH_SHIPPING_ADDRESSES:
            updatedState.shippingAddresses = action.payload;
            return updatedState;

        case ACTION_TYPES.ADD_SHIPPING_ADDRESS:
            updatedState.shippingAddresses = [
                ...updatedState.shippingAddresses,
                action.payload
            ]
            return updatedState;


        default:
            return state;
    }
};

export default authReducer