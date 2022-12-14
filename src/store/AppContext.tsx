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
	windowWidth: number,
	translations: Object,
	lang: "en" | "bn",
	theme:  "light" | "dark" | "system",
}

const initialState: InitialState = {
	deviceType: DeviceType.DESKTOP,
	windowWidth: 0,
	translations: {},
	lang: "en",
	theme: "light"
};



export const AppContext = createContext<{
	contextDispatch: Dispatch<any>,
	contextState: InitialState
}>({contextState: initialState, contextDispatch: null})


interface DeviceActionType {
	type: ACTION_TYPES.SET_DEVICE_TYPE,
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

interface SetWindowWidthActionType{
	type: ACTION_TYPES.SET_WINDOW_WIDTH,
	payload: number
}

export interface AppContextType {
	contextDispatch: Dispatch<any>,
	contextState: InitialState
}

function reducer(state: InitialState, action: DeviceActionType | LanguageActionType | SetThemeActionType | SetWindowWidthActionType ) {
	switch (action.type) {
		
        case ACTION_TYPES.SET_DEVICE_TYPE:
            return { ...state, deviceType: action.payload };
		
		case ACTION_TYPES.SET_LANGUAGE:
            return {
				...state,
	            translations: action.payload.translations,
                lang: action.payload.lang
			}
			
		case ACTION_TYPES.SET_WINDOW_WIDTH:
            return {
				...state,
	            windowWidth: action.payload
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
