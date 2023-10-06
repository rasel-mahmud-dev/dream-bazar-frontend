import {ACTION_TYPES, AdminType, AuthType, OrderType, Profile} from "store/types";
import {AuthActionTypes} from "store/types/authActionTypes";
import {ProductType} from "reducers/productSlice";
import {createSlice} from "@reduxjs/toolkit";
import {currentAuthAction, loginAction, registrationAction} from "actions/authAction";

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
    _id?: string
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
    authLoaded: boolean;
    auth: AuthType | null;
    orders: OrderType[];
    shop: Shop | null
    stores?: Shop[]
    shippingAddresses: ShippingAddress[]
    profile: Profile | null
}

export interface ShippingAddress {
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
    authLoaded: false,
    auth: null,
    orders: null as unknown as OrderType[],
    shop: null,
    stores: [],
    shippingAddresses: [],
    profile: null
};

// const authSlice = (state = initialState, action: AuthActionTypes) => {
//     let updatedState = { ...state };
//
//     switch (action.type) {
//
//         case ACTION_TYPES.LOGIN:
//             updatedState.auth = action.payload;
//             updatedState.authLoaded = true;
//             return updatedState;
//
//         case ACTION_TYPES.RESET_AUTH_LOADING:
//             updatedState.authLoaded = false;
//             return updatedState;
//
//
//         case ACTION_TYPES.FETCH_CURRENT_USER_PROFILE:
//             updatedState.profile = action.payload;
//             return updatedState;
//
//         case ACTION_TYPES.UPDATE_CUSTOMER_PROFILE:
//             updatedState.profile = {
//                 ...updatedState.profile,
//                 ...action.payload
//             }
//             return updatedState;
//
//
//         case ACTION_TYPES.FETCH_ORDERS:
//             updatedState.orders = action.payload;
//             return updatedState;
//
//
//
//         case ACTION_TYPES.FETCH_STORES:
//             updatedState.stores = action.payload;
//             return updatedState;
//
//
//
//         case ACTION_TYPES.FETCH_SELLER_SHOP:
//             updatedState.shop = action.payload;
//             return updatedState;
//
//
//         case ACTION_TYPES.FETCH_SHIPPING_ADDRESSES:
//             updatedState.shippingAddresses = action.payload;
//             return updatedState;
//
//         case ACTION_TYPES.ADD_SHIPPING_ADDRESS:
//             updatedState.shippingAddresses = [
//                 ...updatedState.shippingAddresses,
//                 action.payload
//             ]
//             return updatedState;
//
//
//         default:
//             return state;
//     }
// };


const authSlice = createSlice({
    initialState: initialState,
    name: "authSlice",
    reducers: {
        logout(state) {
            state.auth = null;
            localStorage.removeItem("token")
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginAction.fulfilled, (state, action) => {
            state.auth = action.payload
            state.authLoaded = true
        })
        builder.addCase(loginAction.rejected, (state) => {
            state.auth = null
            state.authLoaded = true
        })
        builder.addCase(registrationAction.fulfilled, (state, action) => {
            state.auth = action.payload
            state.authLoaded = true
        })
        builder.addCase(registrationAction.rejected, (state) => {
            state.auth = null
            state.authLoaded = true
        })
        builder.addCase(currentAuthAction.fulfilled, (state, action) => {
            state.auth = action.payload
            state.authLoaded = true
        })
        builder.addCase(currentAuthAction.rejected, (state) => {
            state.auth = null
            state.authLoaded = true
        })
    }
})

export const { logout} = authSlice.actions

export default authSlice