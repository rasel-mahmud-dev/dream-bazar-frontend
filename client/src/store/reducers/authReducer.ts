import {ACTION_TYPES, AdminType, AuthType} from "src/store/types"
import {SellerType} from "reducers/sellerReducer";


interface AuthStateType {
  authChecked: boolean,
  auth: AuthType | null
  admin: AdminType | null
  seller: SellerType | null
}



const initialState: AuthStateType = {
  authChecked: false,
  auth: null,
  admin: null,
  seller: null
}


const authReducer = (state=initialState, action)=>{
  let updatedState = {...state}
  
  switch(action.type){
    case ACTION_TYPES.LOGIN:
        const {scope, authData} = action.payload
        updatedState[scope] = authData
        updatedState.authChecked = true
        console.log(updatedState)
      return updatedState
      
      
    case ACTION_TYPES.RESET_AUTH_LOADING:
        updatedState.authChecked = false
      return updatedState
    
    case ACTION_TYPES.LOGOUT:
      updatedState[action.payload] = null;
      return updatedState
      
    default: 
       return state
  }
}

export default authReducer