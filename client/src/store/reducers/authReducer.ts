import {ACTION_TYPES, AuthType} from "src/store/types"


interface AuthStateType {
  authChecked: boolean,
  auth: AuthType | null
}



const initialState: AuthStateType = {
  authChecked: false,
  auth: null
}


const authReducer = (state=initialState, action)=>{
  let updatedState = {...state}
  
  switch(action.type){
    case ACTION_TYPES.LOGIN:
        updatedState.auth = action.payload
  
      updatedState.authChecked = true
      return updatedState
    
    case ACTION_TYPES.FETCH_CURRENT_AUTH:
        updatedState.authChecked = true
      return updatedState
    
    case ACTION_TYPES.LOGOUT:
      updatedState.auth = null;
      return updatedState
      
    default: 
       return state
  }
}

export default authReducer