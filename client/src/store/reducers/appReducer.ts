import { ACTION_TYPES } from "src/store/types"


interface AppStateType {
  notificationMsg?: string,
  isNotify?: false,
  notificationType: string,
  backdrop: {
    isOpen: boolean,
    scope: "app" | "global"
  }
}


const initialState: AppStateType = {
  isNotify: false,
  notificationType: "",
  notificationMsg: "",
  backdrop: {
    isOpen: false,
    scope: "global"
  }
}


const appReducer = (state: any=initialState, action)=>{
  
  let updatedState = {
    notificationMsg: undefined,
    selectedLang: undefined,
    lang: undefined,
    isNotify: undefined,
    ...state
  }
  
  switch(action.type){
    
    case ACTION_TYPES.TOGGLE_NOTIFY :
      updatedState.isNotify = action.payload.isNotify
      updatedState.notificationMsg = action.payload.message 
      updatedState.notificationType = action.payload.notificationType
      return updatedState
    
    case ACTION_TYPES.TOGGLE_BACKDROP:
      updatedState.backdrop = {
        ...updatedState.backdrop,
        isOpen: action.payload.isOpen,
        scope: action.payload.scope
      }
      return  updatedState;
      
    
    default: 
       return state
  }
}

export default appReducer
