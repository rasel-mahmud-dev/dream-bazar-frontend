import {ACTION_TYPES, OrderType, Scope, StatusCode} from "store/types";
import apis, { getApi } from "src/apis";
import errorMessageCatch from "src/utills/errorMessageCatch";
import {Shop} from "reducers/authReducer";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {FetchShopAction, FetchStoresAction} from "store/types/authActionTypes";

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



export const currentAuthAction = async (dispatch, cb) => {
    try {
        let response = await getApi().get("/api/auth/current-auth");
        if (response.status === StatusCode.Ok) {
            loginHandler(response.data, dispatch);
        } else {
            loginHandler(null, dispatch);
        }
    } catch (ex) {
        loginHandler(null, dispatch);
    }
};



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
        if (response.status === StatusCode.Created) {
            state.dispatch<FetchShopAction>({
                type: ACTION_TYPES.FETCH_SELLER_SHOP,
                payload: response.data,
            });
        }
    } catch (ex) {}

})



export const fetchAllStores = createAsyncThunk( ACTION_TYPES.FETCH_STORES, async (payload, state)=>{
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
