import {ACTION_TYPES} from "store/types"
import {AppActions} from "store/types/appActionType";
import {createSlice} from "@reduxjs/toolkit";
import app from "src/App";


interface AppStateType {
    notificationMsg?: string,
    isNotify?: false,
    notificationType: string,
    backdrop: {
        isOpen: boolean,
        scope: "app" | "global"
    },
    openLeftSidebar: "dashboard" | "home" | ""
    translations: Object,
    lang: "en" | "bn",
    theme: "light" | "dark" | "system",
}


const initialState = {
    isNotify: false,
    notificationType: "",
    notificationMsg: "",
    backdrop: {
        isOpen: false,
        scope: "global"
    },
    openLeftSidebar: "",
    translations: {},
    lang: "en",
    theme: "light",
}



const appSlice = createSlice({
    initialState: initialState,
    name: "appState",
    reducers: {
        setOpenLeftSidebar: (state, action)=>{
            state.openLeftSidebar = action.payload
        },
        setLanguage(state, action){
            state.translations = action.payload.translations
            state.lang = action.payload.lang
        },

        setTheme(state, action){
            state.theme = action.payload
        }
    }
})

export const {
    setOpenLeftSidebar,
    setLanguage,
    setTheme} = appSlice.actions

export default appSlice
