import {ACTION_TYPES, OrderType, Scope, StatusCode} from "store/types";
import apis, {getApi} from "src/apis";
import errorMessageCatch from "src/utills/errorMessageCatch";
import {Shop} from "reducers/authReducer";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    AddShippingAddressAction,
    FetchAllShippingAddressesAction,
    FetchShopAction,
    FetchStoresAction,
    UpdateShopAction
} from "store/types/userActionTypes";

export const loginHandler = (user, dispatch) => {
    dispatch({
        type: ACTION_TYPES.LOGIN,
        payload: user,
    });
};

function setToken(token) {
    window.localStorage.setItem("token", token);
}


// login action for customer, seller and admin userActionTypes.ts separately
export const loginAction = async (userData, dispatch, cb: (data: object, errorMessage?: string) => void) => {
    try {
        const {status, data} = await apis.post("/api/auth/login", userData);
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
        const {data, status} = await apis.post("/api/auth/registration", userData);
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


export const currentAuthAction = createAsyncThunk("", async function (arg, store) {

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
