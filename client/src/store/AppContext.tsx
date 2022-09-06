import {createContext, useReducer, useState} from "react";
import {ACTION_TYPES} from "store/types";

import l from "../../public/locales/en/translation.json"


export const AppContext = createContext({})

export enum DeviceType {
	DESKTOP = "DESKTOP",
	MOBILE = "MOBILE",
	TABLET = "TABLET"
}
interface initialState {
	deviceType: DeviceType,
	translations: Object,
	lang: "en" | "bn"
}

const initialState: initialState = {
	deviceType: DeviceType.DESKTOP,
	translations: l,
	lang: "en"
};


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

function reducer(state: initialState, action: DeviceActionType | LanguageActionType ) {
	switch (action.type) {
        case "SET_DEVICE":
            return { ...state, deviceType: action.payload };
		
		case ACTION_TYPES.SET_LANGUAGE:
            return {
				...state,
	            translations: action.payload.translations,
                lang: action.payload.lang
			}
			
        default:
            return state;
    }
}


const AppContextProvider = (props)=> {
	
	const [contextState, contextDispatch] = useReducer(reducer, initialState);
	// const [contextState, contextDispatch] = useState<initialState>({deviceType: DeviceType.MOBILE})
	
	return (
		<AppContext.Provider value={{contextState: contextState, contextDispatch}}>
			{props.children}
		</AppContext.Provider>
	)
}

export default AppContextProvider