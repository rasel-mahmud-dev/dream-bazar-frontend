import { StatusCode} from "store/types";
import apis from "src/apis";
import errorMessageCatch from "src/utills/errorMessageCatch";
import {createAsyncThunk} from "@reduxjs/toolkit";

function setToken(token) {
    window.localStorage.setItem("token", token);
}

// login action for customer, seller and admin userActionTypes.ts separately
export const loginAction = createAsyncThunk("auth/login",
    async (payload: { email: string, password: string }, ThunkApi) => {
        try {
            const {status, data} = await apis.post("/api/v1/auth/login", payload);
            if (status === StatusCode.Created) {
                setToken(data.token);
                return data.user
            } else {
                ThunkApi.rejectWithValue("unable to connect with server");
            }
        } catch (ex) {
            return ThunkApi.rejectWithValue(errorMessageCatch(ex))
        }

    })


export const registrationAction = createAsyncThunk("auth/registration",
    async (payload: { email: string, password: string, firstName: string, lastName: string }, ThunkApi) => {
        try {
            const {status, data} = await apis.post("/api/v1/auth/registration", payload);
            if (status === StatusCode.Created) {
                setToken(data.token);
                return data.user
            } else {
                ThunkApi.rejectWithValue("unable to connect with server");
            }
        } catch (ex) {
            return ThunkApi.rejectWithValue(errorMessageCatch(ex))
        }
    })


export const currentAuthAction = createAsyncThunk("auth/verify", async (payload, ThunkApi) => {
    try {
        let {status, data} = await apis.get("/api/v1/auth/verify");
        if (status === StatusCode.Ok) {
            return data.user
        } else {
            ThunkApi.rejectWithValue("unable to connect with server");
        }
    } catch (ex) {
        return ThunkApi.rejectWithValue(errorMessageCatch(ex))
    }

})

