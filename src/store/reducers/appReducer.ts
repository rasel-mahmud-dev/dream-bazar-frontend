import {ACTION_TYPES} from "src/store/types"
import {AppActions} from "store/types/appActionType";


interface AppStateType {
    notificationMsg?: string,
    isNotify?: false,
    notificationType: string,
    backdrop: {
        isOpen: boolean,
        scope: "app" | "global"
    },
    isOpenLeftBar: boolean
    translations: Object,
    lang: "en" | "bn",
    theme: "light" | "dark" | "system",
}


const initialState: AppStateType = {
    isNotify: false,
    notificationType: "",
    notificationMsg: "",
    backdrop: {
        isOpen: false,
        scope: "global"
    },
    isOpenLeftBar: false,
    translations: {},
    lang: "en",
    theme: "light",
}


const appReducer = (state: any = initialState, action: AppActions) => {

    let updatedState = {
        notificationMsg: undefined,
        selectedLang: undefined,
        lang: undefined,
        isNotify: undefined,
        ...state
    }

    switch (action.type) {
        case ACTION_TYPES.SET_LANGUAGE:
            return {
                ...state,
                translations: action.payload.translations,
                lang: action.payload.lang
            }

        case ACTION_TYPES.SET_THEME:
            return {
                ...state,
                theme: action.payload
            }

        // case ACTION_TYPES.TOGGLE_NOTIFY :
        //     updatedState.isNotify = action.payload.isNotify
        //     updatedState.notificationMsg = action.payload.message
        //     updatedState.notificationType = action.payload.notificationType
        //     return updatedState

        // case ACTION_TYPES.TOGGLE_BACKDROP:
        //
        //     updatedState.backdrop = {
        //         ...updatedState.backdrop,
        //         isOpen: action.payload,
        //     }
        //
        //     return updatedState;

        // case ACTION_TYPES.TOGGLE_LEFT_BAR:
        //     updatedState.isOpenLeftBar = !updatedState.isOpenLeftBar
        //     return updatedState;


        default:
            return state
    }
}

export default appReducer
