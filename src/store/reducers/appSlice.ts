import {ACTION_TYPES} from "store/types"
import {AppActions} from "store/types/appActionType";
import {createSlice} from "@reduxjs/toolkit";
import app from "src/App";
import {setLanguageAction} from "actions/appAction";


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
            // state.translations = action.payload.translations
            state.lang = action.payload.lang
        },

        setTheme(state, action){
            let theme = action.payload;
            if(theme) {
                localStorage.setItem("theme", theme)
            } else {
                theme = localStorage.getItem("theme") || ""
            }

            let html  = document.documentElement
            html.className = theme

            state.theme = theme
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(setLanguageAction.fulfilled, (state, action)=>{
            if(action.payload?.translations)
                state.translations = action.payload.translations

            if(action.payload?.lang)
                state.lang = action.payload.lang
        })
    }
})

export const {
    setOpenLeftSidebar,
    setLanguage,
    setTheme} = appSlice.actions

export default appSlice
