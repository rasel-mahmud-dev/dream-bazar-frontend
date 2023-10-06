import {ACTION_TYPES, OrderType, Profile, StatusCode} from "store/types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    AddShippingAddressAction,
    FetchAllShippingAddressesAction,
    FetchCurrentUserProfileAction,
    FetchShopAction, UpdateCustomerProfileAction,
    UpdateShopAction
} from "store/types/userActionTypes";
import apis from "src/apis";

export const fetchCustomerProfileAction = createAsyncThunk("", async (payload, state) => {
    try {
        const response = await apis.get<Profile>(`/api/auth/profile`);
        if (response.status === StatusCode.Ok && response.data) {
            state.dispatch<FetchCurrentUserProfileAction>({
                type: ACTION_TYPES.FETCH_CURRENT_USER_PROFILE,
                payload: response.data,
            });
        } else {
        }
    } catch (ex) {
    }
})

export const fetchOrdersAction = async (dispatch) => {
    try {
        const response = await apis.get<OrderType[]>(`/api/orders`);
        if (response.status === 200 && response.data) {
            dispatch({
                type: ACTION_TYPES.FETCH_ORDERS,
                payload: response.data,
            });
        } else {
        }
    } catch (ex) {
    }
};


export const fetchShopInfo = createAsyncThunk("", async (payload, state) => {
    try {
        const response = await apis.get(`/api/shop/info`);
        if (response.status === StatusCode.Ok) {
            state.dispatch<FetchShopAction>({
                type: ACTION_TYPES.FETCH_SELLER_SHOP,
                payload: response.data,
            });
        }
    } catch (ex) {
    }

})


export const updateSellerShopInfoAction = createAsyncThunk("", async ([payload, cb]: [object, (args: any)=>void], state) => {
    try {
        const response = await apis.patch(`/api/shop`, payload);
        if (response.status === StatusCode.Ok) {
            state.dispatch<UpdateShopAction>({
                type: ACTION_TYPES.UPDATE_SHOP_INFO,
                payload: response.data,
            });
        }
    } catch (ex) {
        cb(ex)
    }

})


export const fetchAllStores = createAsyncThunk("", async (_, state) => {
    try {
        const response = await apis.get(`/api/shops`);
        if (response.status === StatusCode.Ok) {
            state.dispatch({
                type: ACTION_TYPES.FETCH_STORES,
                payload: response.data,
            });
        }
    } catch (ex) {

    }

})

export const updateStoreAction = createAsyncThunk("", async ({shopId, update = {}}: { shopId: string, update: object }, state) => {
    try {
        const response = await apis.patch(`/api/shop/` + shopId, {update});
        if (response.status === StatusCode.Ok) {
            state.dispatch({
                type: ACTION_TYPES.FETCH_STORES,
                payload: response.data,
            });
        }
    } catch (ex) {

    }

})

export const updateStoreActiveStatusAction = createAsyncThunk("", async (isActive: boolean, state) => {
    try {
        const response = await apis.patch(`/api/shop/update-active`, {isActive});
        if (response.status === StatusCode.Ok) {
            state.dispatch({
                type: ACTION_TYPES.FETCH_STORES,
                payload: response.data,
            });
        }
    } catch (ex) {

    }

})

export const getShippingAddresses = createAsyncThunk("", async (_, state) => {
    try {
        const response = await apis.get(`/api/shipping-addresses`);
        if (response.status === StatusCode.Ok) {
            state.dispatch<FetchAllShippingAddressesAction>({
                type: ACTION_TYPES.FETCH_SHIPPING_ADDRESSES,
                payload: response.data,
            });
        }
    } catch (ex) {

    }

})

export const addShippingAddress = (shippingAddress): AddShippingAddressAction => {
    return {
        type: ACTION_TYPES.ADD_SHIPPING_ADDRESS,
        payload: shippingAddress,

    }
}


export const updateCustomerProfileAction = createAsyncThunk("", async ([payload, cb]: [any, (args?: any)=> void] , thunkAPI) => {
    try {
        const response = await apis.post(`/api/auth/profile`, payload);
        if (response.status === StatusCode.Created) {
            thunkAPI.dispatch<UpdateCustomerProfileAction>({
                type: ACTION_TYPES.UPDATE_CUSTOMER_PROFILE,
                payload: response.data,
            });
        }
        cb(null)
    } catch (ex) {
        cb(ex)
    }
})