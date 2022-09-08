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
 
      if(action.payload){
        updatedState.auth = action.payload
      }
      return updatedState
    
    case ACTION_TYPES.FETCH_CURRENT_AUTH: 
      return updatedState
    
    case ACTION_TYPES.LOGOUT:
      return updatedState
      
    default: 
       return state
  }
}

export default authReducer