import {ACTION_TYPES, OrderType, Scope, StatusCode} from "store/types";
import apis, { getApi } from "src/apis";
import errorMessageCatch from "src/utills/errorMessageCatch";
import {Shop} from "reducers/authReducer";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {FetchShopAction, FetchStoresAction, UpdateShopAction} from "store/types/authActionTypes";

export const loginHandler = (user, dispatch) => {
    dispatch({
        type: ACTION_TYPES.LOGIN,
        payload: user,
    });
};

function setToken(token) {
    window.localStorage.setItem("token", token);
}


// login action for customer, seller and admin user separately
export const loginAction = async (userData, dispatch, cb: (data: object, errorMessage?: string) => void) => {
    try {
        const { status, data } = await apis.post("/api/auth/login", userData);
        if (status === 201) {
            loginHandler(data.user, dispatch);
            setToken(data.token);
            cb && cb(data.user, "");
        } else {
            loginHandler(null, dispatch);
            cb && cb({}, "unable to connect with server");
        }
    } catch (ex) {
        cb && cb({}, errorMessageCatch(ex));
        loginHandler(null, dispatch);
    }
};


export const registrationAction = async (userData, dispatch, cb: (data: object, errorMessage?: string) => void) => {
    try {
        const { data, status } = await apis.post("/api/auth/registration", userData);
        if (status === 201) {
            loginHandler(data.user, dispatch);
            cb && cb(data.user, "");
        } else {
            cb && cb({}, "Error");
        }
    } catch (ex) {
        cb && cb({}, errorMessageCatch(ex));
    }
};



export const currentAuthAction = createAsyncThunk("" , async function (arg, store){

    try {
        let response = await getApi().get("/api/auth/current-auth");
        if (response.status === StatusCode.Ok) {
            loginHandler(response.data, store.dispatch);
        } else {
            loginHandler(null, store.dispatch);
        }
    } catch (ex) {
        loginHandler(null, store.dispatch);
    }

})



export const logoutAction = (dispatch) => {
    window.localStorage.removeItem("token");
    loginHandler(null, dispatch);
};

export const fetchOrdersAction = async (dispatch) =>{
    try {
        const response = await getApi().get<OrderType[]>(`/api/orders`);
        if (response.status === 200 && response.data) {
            dispatch({
                type: ACTION_TYPES.FETCH_ORDERS,
                payload: response.data,
            });
        } else {
        }
    } catch (ex) {}
};



export const fetchShopInfo = createAsyncThunk("", async (payload, state)=>{
    try {
        const response = await getApi().get(`/api/shop/info`);
        if (response.status === StatusCode.Ok){
            state.dispatch<FetchShopAction>({
                type: ACTION_TYPES.FETCH_SELLER_SHOP,
                payload: response.data,
            });
        }
    } catch (ex) {}

})


export const updateSellerShopInfoAction = createAsyncThunk("", async ({payload, cb}, state)=>{
    try {
        const response = await getApi().patch(`/api/shop`, payload);
        if (response.status === StatusCode.Ok){
            state.dispatch<UpdateShopAction>({
                type: ACTION_TYPES.UPDATE_SHOP_INFO,
                payload: response.data,
            });
        }
    } catch (ex) {
        cb(ex)
    }

})



export const fetchAllStores = createAsyncThunk( "", async (_, state)=>{
    try {
        const response = await getApi().get(`/api/shops`);
        if (response.status === StatusCode.Ok) {
            state.dispatch({
                type: ACTION_TYPES.FETCH_STORES,
                payload: response.data,
            });
        }
    } catch (ex) {

    }

})

export const updateStoreAction = createAsyncThunk( "", async ({shopId, update = {}}: { shopId: string, update: object }, state)=>{
    try {
        const response = await getApi().patch(`/api/shop/`+shopId, {update});
        if (response.status === StatusCode.Ok) {
            state.dispatch({
                type: ACTION_TYPES.FETCH_STORES,
                payload: response.data,
            });
        }
    } catch (ex) {

    }

})

export const updateStoreActiveStatusAction = createAsyncThunk( "", async (isActive: boolean, state)=>{
    try {
        const response = await getApi().patch(`/api/shop/update-active`, {isActive});
        if (response.status === StatusCode.Ok) {
            state.dispatch({
                type: ACTION_TYPES.FETCH_STORES,
                payload: response.data,
            });
        }
    } catch (ex) {

    }

})
