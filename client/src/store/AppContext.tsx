import {createContext, useReducer, useState} from "react";
import {ACTION_TYPES} from "store/types";
import {Dispatch} from "redux";

// import l from "../../public/locales/en/translation.json"

export enum DeviceType {
	DESKTOP = "DESKTOP",
	MOBILE = "MOBILE",
	TABLET = "TABLET"
}


interface InitialState {
	deviceType: DeviceType,
	translations: Object,
	lang: "en" | "bn",
	theme:  "light" | "dark" | "system",
}

const initialState: InitialState = {
	deviceType: DeviceType.DESKTOP,
	translations: {},
	lang: "en",
	theme: "light"
};



export const AppContext = createContext<{
	contextDispatch: Dispatch<any>,
	contextState: InitialState
}>({contextState: initialState, contextDispatch: null})


interface DeviceActionType {
	type: "SET_DEVICE",
	payload: DeviceType
}

interface LanguageActionType{
	type: ACTION_TYPES.SET_LANGUAGE
	payload: {
		translations: object,
		lang: string
	}
}
interface SetThemeActionType{
	type: ACTION_TYPES.SET_THEME,
	payload: "light" | "dark" | "system",
}

export interface AppContextType {
	contextDispatch: Dispatch<any>,
	contextState: InitialState
}

function reducer(state: InitialState, action: DeviceActionType | LanguageActionType | SetThemeActionType ) {
	switch (action.type) {
        case "SET_DEVICE":
            return { ...state, deviceType: action.payload };
		
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
		
        default:
            return state;
    }
}


	
	const AppContextProvider = (props)=> {
	
	const [contextState, contextDispatch] = useReducer(reducer, initialState);
	
	
		return (
		//@ts-ignore
		<AppContext.Provider value={{contextState: contextState, contextDispatch: contextDispatch}}>
			{props.children}
		</AppContext.Provider>
	)
}


export default AppContextProvider

