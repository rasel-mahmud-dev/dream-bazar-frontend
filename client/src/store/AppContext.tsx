import {createContext, useReducer, useState} from "react";

export const AppContext = createContext({})

export enum DeviceType {
	DESKTOP = "DESKTOP",
	MOBILE = "MOBILE",
	TABLET = "TABLET"
}
interface initialState {
	deviceType: DeviceType
}

const initialState: initialState = {deviceType: "DESKTOP"};

function reducer(state: initialState, action: { type: any; payload: DeviceType }) {
	switch (action.type) {
        case "SET_DEVICE":
            return { ...state, deviceType: action.payload };
        default:
            return state;
    }
}

const AppContextProvider = (props)=>{
	
	const [contextState, contextDispatch] = useReducer(reducer, initialState);
	// const [contextState, contextDispatch] = useState<initialState>({deviceType: DeviceType.MOBILE})
	
	return (
		<AppContext.Provider value={{contextState: contextState, contextDispatch}}>
			{props.children}
		</AppContext.Provider>
	)
	
}

export default AppContextProvider