import {ACTION_TYPES, AuthType, Brand, OrderType} from "store/types/index";

/**
 Toggle theme action
 */
export interface ToggleThemeAction {
    type: ACTION_TYPES.SET_THEME,
    payload: "light" | "dark" | "system",

}


/**
 language change action type
 */
export interface ChangeLanguageAction {
    type: ACTION_TYPES.SET_LANGUAGE,
    payload: {
        translations: object,
		lang: string
    };

}



/**
 toggle backdrop action
 */
export interface ToggleBackdropAction {
    type: ACTION_TYPES.TOGGLE_BACKDROP,
    payload: boolean;

}




export type AppActions = ToggleThemeAction | ChangeLanguageAction | ToggleBackdropAction

