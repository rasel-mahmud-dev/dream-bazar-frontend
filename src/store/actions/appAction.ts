import {ACTION_TYPES} from "../types"
import {createAsyncThunk} from "@reduxjs/toolkit";


export const toggleNotify = (status, notificationType, message) => {
    return {
        type: ACTION_TYPES.TOGGLE_NOTIFY,
        payload: {message: message, isNotify: status, notificationType}
    }
}


export const closeNotify = () => {
    return {
        type: ACTION_TYPES.TOGGLE_NOTIFY,
        payload: {message: "", isNotify: false, notificationType: ""}
    }
}


export const toggleLeftSidebarAction = (dispatch) => {
    dispatch({
        type: ACTION_TYPES.TOGGLE_LEFT_BAR
    })
}


export const toggleBackdrop = (data: { isOpen: boolean, scope: "app" | "global" | "custom" }) => {
    if (data.isOpen) {
        document.body.classList.add("block-page")
    } else {
        document.body.classList.remove("block-page")
    }
    return {
        type: ACTION_TYPES.TOGGLE_BACKDROP,
        payload: data
    }
}


export const setLanguageAction = createAsyncThunk("", async (lang: string = "", store) => {
    let locales = lang;
    let whitelist = ["en", "bn"]

    if (!locales) {
        let lang = localStorage.getItem("lang");
        if (!lang) {
            locales = "en"
        } else {
            locales = lang;
        }
    }

    if (!whitelist.includes(locales)) {
        return;
    }

    try {
        let response = await fetch(`/locales/${locales}/translation.json`)
        let translations = await response.json();
        localStorage.setItem("lang", locales)
        return {lang: locales, translations}
    } catch (ex) {

    }

})


export const toggleThemeAction = (theme = "") => {
    console.log(theme)


}